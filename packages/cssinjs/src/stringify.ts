import type { CssValue } from "./types";

export default function stringify(value: CssValue): string {
  if (value == null) {
    return "";
  }

  switch (typeof value) {
    case "number":
      switch (value) {
        case Infinity:
          return "infinity";

        case -Infinity:
          return "-infinity";

        case value:
          return "" + value;
      }
      break;

    case "string":
      return value;

    case "object":
      switch (true) {
        case Object.hasOwn(value, "toPrimitive"):
          // @ts-expect-error
          return stringify(value.toPrimitive());

        case Object.hasOwn(value, "toString"):
          return value.toString();

        case Array.isArray(value): {
          let acc = "";

          for (let i = 0, n = value.length; i < n; i++) {
            acc += value[i];
            (i + 1 < n) && (acc += " ");
          }

          return acc;
        }
      }
      break;

    case "boolean":
      return value && "true" || "false";

    case "bigint":
      return "" + value;
  }

  if (__DEV__) {
    console.error("suru-ui(cssinjs): CSS の値に変換できない値が含まれています:", value);
  }

  return "";
}
