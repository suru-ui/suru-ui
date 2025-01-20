import * as fs from "node:fs/promises";
import * as os from "node:os";

export class Writer {
  text: string = "";

  clear(): void {
    this.text = "";
  }

  write(text: string): void {
    this.text += text;
  }

  writeln(text: string): void {
    this.text += text + os.EOL;
  }

  async output(file: string): Promise<void> {
    await fs.writeFile(file, this.text, "utf-8");
  }
}

export interface GenerateOptions {
  readonly indent?: string | undefined;
}

export function generate(
  w: Writer,
  def: any,
  opts: GenerateOptions | undefined = {},
): void {
  const {
    indent = "",
  } = opts;
  inner(w, def, []);

  function inner(w: Writer, def: any, path: readonly string[]): void {
    if (typeof def === "string" || typeof def === "number") {
      w.write(indent);
      w.write("--");
      w.write(path.join("-"));
      w.write(": ");
      w.write(def.toString(10));
      w.writeln(";");
    } else if (def.$kind === Symbol.for("ref")) {
      w.write(indent);
      w.write("--");
      w.write(path.join("-"));
      w.write(": ");
      w.write("var(");
      w.write("--");
      w.write(def.value.replaceAll(".", "-"));
      w.writeln(");");
    } else if (Array.isArray(def)) {
      def.forEach((d, i) => {
        inner(w, d, [...path, `${i}`]);
      });
    } else {
      Object.entries(def).forEach(([p, d]) => {
        inner(w, d, [...path, p]);
      });
    }
  }
}
