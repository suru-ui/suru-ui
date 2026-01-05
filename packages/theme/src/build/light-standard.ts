import * as path from "node:path";
import lightStandard from "../theme/light-standard.ts";
import { defineLayers, distDir, Writer, writeStyle } from "./_tools.ts";

const w = new Writer();

defineLayers(w);

w.writeln("@layer sui.theme {");

w.writeln("  @media (prefers-color-scheme: light) {");
w.writeln("    :root:not([data-theme]) {");
writeStyle(w, lightStandard, { indent: "  ".repeat(3) });
w.writeln("    }");
w.writeln("  }");

w.writeln("  [data-theme=light],");
w.writeln("  [data-theme=light-standard] {");
writeStyle(w, lightStandard, { indent: "  ".repeat(2) });
w.writeln("  }");

w.writeln("}");

w.output(path.join(distDir, "light-standard.css"));
