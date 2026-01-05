import * as fs from "node:fs";
import * as path from "node:path";
import { distDir, srcDir, Writer } from "./_tools.ts";

const cssText = fs.readFileSync(path.join(distDir, "all.css"), "utf-8");

const properties: Record<string, any> = {};
for (const [, match] of cssText.matchAll(/--([0-9a-z-]+)/g)) {
  let tmp = properties;
  const keys = match!.split("-");
  for (let i = 0, n = keys.length; i < n; i++) {
    if (i !== n - 1) {
      tmp = tmp[keys[i]!] ||= {};
    } else {
      tmp[keys[i]!] = 1;
    }
  }
}

const w = new Writer();

w.writeln("export type CssCustomProperties = {");

(function inner(properties, indent: string = "  ", path: readonly string[] = []): void {
  for (const p in properties) {
    const property = /^[0-9]/.test(p) && !/^[0-9]+$/.test(p)
      ? JSON.stringify(p)
      : p;
    if (typeof properties[p] === "object") {
      w.writeln(indent + `readonly ${property}: {`);
      inner(properties[p], indent + "  ", [...path, p]);
      w.writeln(indent + "};");
    } else {
      const name = [...path, p].join("-");
      const keys = `[${[...path, p].map(p => JSON.stringify(p))}]`;
      w.writeln(indent + `readonly ${property}: {`);
      w.writeln(indent + `  readonly $name: "--${name}";`);
      w.writeln(indent + `  readonly $keys: ${keys};`);
      w.writeln(indent + `  readonly toString: () => "var(--${name})";`);
      w.writeln(indent + "};");
    }
  }
})(properties);

w.writeln("};");

w.output(path.join(srcDir, "types.ts"));
