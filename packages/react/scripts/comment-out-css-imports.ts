import * as fs from "node:fs";
import * as path from "node:path";

const dist = path.join(process.cwd(), "dist", "src");

/** 対象ファイルの拡張子 (`.map` は含めない)。 */
const TARGET_EXTENSIONS = [
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
  ".d.ts",
  ".d.mts",
  ".d.cts",
];

const isTargetFile = (fullpath: string): boolean => {
  if (fullpath.endsWith(".map")) {
    return false;
  }
  return TARGET_EXTENSIONS.includes(path.extname(fullpath));
};

/** CSS モジュールを import/export している文 (単一行) に一致する正規表現。 */
const CSS_IMPORT_RE = /^(?:import|export)\b[^;\n]*?["'][^"']*\.css["']/;

/**
 * `import "./foo.css";` のような文をコメントアウトする。
 *
 * CSS は `suru.css` にバンドルされるため、ビルド後のコードから
 * CSS ファイルへの import を削除して実行時エラーを防ぐ。
 */
function commentOutCssImports(source: string): string {
  const lines = source.split("\n");
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    if (line.trimStart().startsWith("//")) {
      continue;
    }
    if (CSS_IMPORT_RE.test(line)) {
      lines[i] = `// ${line}`;
      changed = true;
    }
  }

  return changed ? lines.join("\n") : source;
}

async function main(): Promise<void> {
  const files = fs.globSync("**/*", { cwd: dist }).filter(isTargetFile);

  for (const fullpath of files) {
    const filePath = path.join(dist, fullpath);
    const source = fs.readFileSync(filePath, "utf-8");
    const result = commentOutCssImports(source);
    if (result !== source) {
      fs.writeFileSync(filePath, result, "utf-8");
      // console.log(fullpath);
    }
  }
}

void main();
