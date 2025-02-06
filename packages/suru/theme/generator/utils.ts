import * as fs from "node:fs/promises";
import * as os from "node:os";

export class Writer {
  private text: string = "";

  clear(): void {
    this.text = "";
  }

  write(text: string): void {
    this.text += text;
  }

  writeln(text: string): void {
    this.text += text + os.EOL;
  }

  string(): string {
    return this.text;
  }

  async output(file: string): Promise<void> {
    await fs.writeFile(file, this.text, "utf-8");
  }
}

export type GenerateOptions = {
  readonly indent?: string | undefined;
};

export function generate(w: Writer, def: any, opts: GenerateOptions | undefined = {}): void {
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
      Object.entries(def)
        .sort(([a], [b]) => {
          const na = toNumber(a);
          const nb = toNumber(b);

          switch (true) {
            case na === null && nb === null:
              return a.localeCompare(b);
            case na === null:
              return +1;
            case nb === null:
              return -1;
            default:
              return na - nb;
          }
        })
        .forEach(([p, d]) => {
          inner(w, d, [...path, p]);
        });
    }
  }
}

function toNumber(s: string): number | null {
  let n = Number(s);

  if (!Number.isNaN(n)) {
    return n;
  }

  switch (s) {
    case "xs":
      return 0.8;
    case "sm":
      return 0.9;
    case "md":
      return 1.0;
    case "lg":
      return 1.1;
    case "xl":
      return 1.2;
  }

  return null;
}
