export function isBool(x: unknown): x is boolean {
  return typeof x === "boolean";
}
