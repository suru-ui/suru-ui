import * as path from "node:path";
import lightVivid from "../theme/light-vivid.ts";
import { defineLayers, distDir, Writer, writeStyle } from "./_tools.ts";

const w = new Writer();

defineLayers(w);

w.writeln("@layer sui.theme {");

w.writeln("  @media (prefers-color-scheme: light) {");
w.writeln("    :root:not([data-theme]) {");
writeStyle(w, lightVivid, { indent: "  ".repeat(3) });
w.writeln("    }");
w.writeln("  }");

w.writeln("  [data-theme=light-vivid] {");
writeStyle(w, lightVivid, { indent: "  ".repeat(2) });
w.writeln("  }");

w.writeln("}");

w.output(path.join(distDir, "light-vivid.css"));
