import * as path from "node:path";
import darkStandard from "../theme/dark-standard.ts";
import darkSoft from "../theme/dark-vivid.ts";
import { defineLayers, distDir, Writer, writeStyle } from "./_tools.ts";

const w = new Writer();

defineLayers(w);

w.writeln("@layer sui.theme {");

w.writeln("  @media (prefers-color-scheme: dark) {");
w.writeln("    :root:not([data-theme]) {");
writeStyle(w, darkStandard, { indent: "  ".repeat(3) });
w.writeln("    }");
w.writeln("  }");

w.writeln("  [data-theme=dark],");
w.writeln("  [data-theme=dark-standard] {");
writeStyle(w, darkStandard, { indent: "  ".repeat(2) });
w.writeln("  }");

w.writeln("  [data-theme=dark-vivid] {");
writeStyle(w, darkSoft, { indent: "  ".repeat(2) });
w.writeln("  }");

w.writeln("}");

w.output(path.join(distDir, "dark.css"));
