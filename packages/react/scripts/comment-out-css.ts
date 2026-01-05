import * as fs from "node:fs";
import * as path from "node:path";

const dst = path.join(process.cwd(), "dist");

// - 行頭から始まり、import の後に引用符で囲まれた .css パスが続く行にマッチ
// - 'g' フラグで全箇所、'm' フラグで行単位で判定
const cssImportRegex = /^(import\s+['"].*\.css['"];?)$/gm;

// main
{
  const items = fs.globSync("**/*", {
    cwd: dst,
    withFileTypes: true,
  });
  for (const item of items) {
    const isTsFile = item.isFile() && (item.name.endsWith(".jsx") || item.name.endsWith(".js"));
    if (!isTsFile) {
      continue;
    }

    const fullpath = path.join(item.parentPath, item.name);
    let content = fs.readFileSync(fullpath, "utf-8");
    if (cssImportRegex.test(content)) {
      const updatedContent = content.replace(cssImportRegex, "// $1");
      fs.writeFileSync(fullpath, updatedContent, "utf8");
    }
  }
}
