import * as fsp from "node:fs/promises";
import { createRequire } from "node:module";
import * as path from "node:path";

import dependencyTree from "dependency-tree";

const require = createRequire(import.meta.url);

const src = path.join(process.cwd(), "src");
const dst = path.join(process.cwd(), "dist", "suru.css");

/** テーマ層 (`@suru-ui/theme/suru.css`) の絶対パスです。 */
const themeCss = require.resolve("@suru-ui/theme/suru.css");

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
  const ordered = collectCssFiles().toReversed();

  const cssFiles = await Promise.all(
    ordered.map(async (fullpath) => {
      const comment = `/* ${path.relative(src, fullpath)} */`;
      const css = await fsp.readFile(fullpath, "utf-8");

      return `${comment}\n${css}`;
    }),
  );

  // テーマ層を先頭に含め、追記ではなく上書きで書き出す。
  const theme = await fsp.readFile(themeCss, "utf-8");
  const content = `/* theme */\n\n${theme}\n\n/* components */\n\n${cssFiles.join("\n")}\n`;
  await fsp.writeFile(dst, content, "utf-8");
}

void main();
