import * as path from "node:path";
import base from "../theme/base.ts";
import darkStandard from "../theme/dark-standard.ts";
import darkSoft from "../theme/dark-vivid.ts";
import lightStandard from "../theme/light-standard.ts";
import lightSoft from "../theme/light-vivid.ts";
import { defineLayers, distDir, Writer, writeStyle } from "./_tools.ts";

const w = new Writer();

defineLayers(w);

w.writeln("@layer sui.theme {");

w.writeln("  :root {");
writeStyle(w, base, { indent: "  ".repeat(2) });
w.writeln("  }");

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

w.writeln("  @media (prefers-color-scheme: light) {");
w.writeln("    :root:not([data-theme]) {");
writeStyle(w, lightStandard, { indent: "  ".repeat(3) });
w.writeln("    }");
w.writeln("  }");

w.writeln("  [data-theme=light],");
w.writeln("  [data-theme=light-standard] {");
writeStyle(w, lightStandard, { indent: "  ".repeat(2) });
w.writeln("  }");

w.writeln("  [data-theme=light-vivid] {");
writeStyle(w, lightSoft, { indent: "  ".repeat(2) });
w.writeln("  }");

w.writeln("}");

w.output(path.join(distDir, "all.css"));
