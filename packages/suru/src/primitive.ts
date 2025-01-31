type ToString = { readonly toString: () => string };

type ToPrimitive = {
  readonly [Symbol.toPrimitive]: (hint: "default" | "string" | "number") => string | number;
};

type ProcessPrimitiveObject<T extends string | number, U> =
  // dprint-ignore
  U extends T
    ? U
    : U extends ToPrimitive
      ? T
      : U extends ToString
        ? string
        : U;

export type PrimitiveObject = ToString | ToPrimitive;

export default <T>(v: T): ProcessPrimitiveObject<string | number, T> =>
  processPrimitiveObject(v, "default");

export const string = <T>(v: T): ProcessPrimitiveObject<string, T> =>
  processPrimitiveObject(v, "string");

export const number = <T>(v: T): ProcessPrimitiveObject<number, T> =>
  processPrimitiveObject(v, "number");

function processPrimitiveObject(v: any, hint: "default" | "string" | "number"): any {
  if (typeof v === "function" || typeof v === "object" && !!v) {
    if (typeof v[Symbol.toPrimitive] === "function") {
      return v[Symbol.toPrimitive](hint);
    }

    return v.toString();
  }

  return v;
}
