import * as fsp from "node:fs/promises";
import * as path from "node:path";

import dependencyTree from "dependency-tree";

const src = path.join(process.cwd(), "src");
const dst = path.join(process.cwd(), "dist", "suru.css");

/** `src/index.ts` から依存関係を辿り、参照される CSS ファイルの絶対パスを返す。 */
function collectCssFiles(): string[] {
  return dependencyTree
    .toList({
      filter: (fullpath) => fullpath.startsWith(src + path.sep),
      filename: path.join(src, "index.ts"),
      directory: src,
    })
    .filter((fullpath) => fullpath.endsWith(".css"));
}

async function main(): Promise<void> {
  // src/index.ts をエントリーポイントに、依存関係を再帰的に解決して CSS ファイルを集める。
  const cssFiles = await Promise.all(
    collectCssFiles().map(async (fullpath) => {
      const comment = `/* ${path.relative(src, fullpath)} */`;
      const css = await fsp.readFile(fullpath, "utf-8");

      return `${comment}\n${css}`;
    }),
  );
  await fsp.writeFile(dst, cssFiles.join("\n"), "utf-8");
}

void main();
