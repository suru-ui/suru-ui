import * as fs from "node:fs/promises";
import * as path from "node:path";
import { generate, Writer } from "./_tools.ts";
import base from "./base.ts";
import common from "./common.ts";
import dark from "./dark.ts";
import light from "./light.ts";

function layer(w: Writer): void {
  w.writeln("@layer sui;");
  // w.writeln("@layer sui.reset;");
  w.writeln("@layer sui.tokens;");
  w.writeln("@layer sui.components;");
}

// function reset(w: Writer): void {
//   w.writeln("@layer sui.reset {");
//   w.writeln("  .sui-reset {");
//   w.writeln("    &, &::after, &::before {");
//   w.writeln("      all: unset;");
//   w.writeln("      margin: 0;");
//   w.writeln("      display: revert;");
//   w.writeln("      padding: 0;");
//   w.writeln("      box-sizing: border-box;");
//   w.writeln("    }");
//   w.writeln("  }");
//   w.writeln("}");
// }

const root = path.join(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const src = path.join(root, "src");
await fs.mkdir(dist, { recursive: true });
await Promise.all([
  (async () => {
    const w = new Writer();
    layer(w);
    // reset(w);
    w.writeln("@layer sui.tokens {");
    w.writeln("  /* base */");
    w.writeln("  :root {");
    generate(w, base, { indent: "  ".repeat(2) });
    w.writeln("  }");
    w.writeln("}");
    await w.output(path.join(dist, "base.css"));
  })(),
  (async () => {
    const w = new Writer();
    layer(w);
    // reset(w);
    w.writeln("@layer sui.tokens {");
    w.writeln("  :root {");
    w.writeln("    /* base */");
    generate(w, base, { indent: "  ".repeat(2) });
    w.writeln("    /* common */");
    generate(w, common, { indent: "  ".repeat(2) });
    w.writeln("  }");
    w.writeln("  /* light */");
    w.writeln("  :root:not(:is(.dark, .dark-theme, .theme-dark, [data-theme=dark])) {");
    generate(w, light, { indent: "  ".repeat(2) });
    w.writeln("  }");
    w.writeln("  /* dark */");
    w.writeln("  @media (prefers-color-scheme: dark) {");
    w.writeln("    :root:not(:is(.light, .light-theme, .theme-light, [data-theme=light])) {");
    generate(w, dark, { indent: "  ".repeat(3) });
    w.writeln("    }");
    w.writeln("  }");
    w.writeln("  /* light */");
    w.writeln("  .light,");
    w.writeln("  .light-theme,");
    w.writeln("  .theme-light,");
    w.writeln("  [data-theme=light] {");
    generate(w, light, { indent: "  ".repeat(2) });
    w.writeln("  }");
    w.writeln("  /* dark */");
    w.writeln("  .dark,");
    w.writeln("  .dark-theme,");
    w.writeln("  .theme-dark,");
    w.writeln("  [data-theme=dark] {");
    generate(w, dark, { indent: "  ".repeat(2) });
    w.writeln("  }");
    w.writeln("}");
    await w.output(path.join(dist, "suru.css"));
    const properties: Record<string, any> = {};

    for (const [, match] of w.text.matchAll(/--([0-9A-Za-z-]+)/g)) {
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

    w.clear();
    w.writeln("export type CssCustomProperties = {");
    (function inner(properties, indent, path: readonly string[]): void {
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
    })(properties, "  ", []);
    w.writeln("};");
    await w.output(path.join(src, "theme", "types.ts"));
  })(),
]);
