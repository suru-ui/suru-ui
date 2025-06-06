import dependencyTree from "dependency-tree";
import * as fs from "node:fs";
import * as fsp from "node:fs/promises";
import * as path from "node:path";

const src = path.join(process.cwd(), "src");
const dst = path.join(process.cwd(), "dist", "suru.css");

// main
{
  const dirs = fs.globSync("*", {
    cwd: src,
    withFileTypes: true,
  });
  const sequences: string[][] = [];
  for (const dir of dirs) {
    if (dir.isDirectory() && fs.existsSync(path.join(src, dir.name, "index.ts"))) {
      sequences.push(getDependencies(dir.name));
    }
  }

  const dependencies = resolveDependencies(sequences).reverse();
  const cssFiles = await Promise.all(dependencies.map(async fullpath => {
    const comment = "/* " + path.relative(src, fullpath) + " */";
    const cssFile = await fsp.readFile(fullpath, "utf-8");
    return comment + "\n" + cssFile;
  }));
  const comment = "/* components */";
  const cssFile = comment + "\n\n" + cssFiles.join("\n");
  fs.appendFileSync(dst, cssFile, "utf-8");
}

function getDependencies(dirname: string): string[] {
  return dependencyTree.toList({
    filename: path.join("src", dirname, "index.ts"),
    directory: "src",
    filter: fullpath => fullpath.startsWith(src + path.sep),
  }).filter(fullpath => fullpath.endsWith(".css"));
}

function resolveDependencies(sequences: string[][]): string[] {
  // ノードの追加とエッジの構築
  const graph = new Map<string, Set<string>>();
  const inDegree = new Map<string, number>();
  for (const seq of sequences) {
    for (let i = 0; i < seq.length; i++) {
      if (!graph.has(seq[i]!)) {
        graph.set(seq[i]!, new Set());
        inDegree.set(seq[i]!, 0);
      }
      if (i > 0) {
        const prev = seq[i - 1]!;
        if (!graph.get(prev)!.has(seq[i]!)) {
          graph.get(prev)!.add(seq[i]!);
          inDegree.set(seq[i]!, (inDegree.get(seq[i]!) || 0) + 1);
        }
      }
    }
  }

  // 入次数が0のノードをキューに入れる。
  const queue: string[] = [];
  for (const [node, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(node);
    }
  }

  // トポロジカルソート
  const result: string[] = [];
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    for (const neighbor of graph.get(node) || []) {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result;
}
