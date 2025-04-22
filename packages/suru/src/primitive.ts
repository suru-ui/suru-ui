interface ToString {
  readonly toString: () => string;
}

interface ToPrimitive {
  readonly [Symbol.toPrimitive]: (hint?: string | undefined) => string | number;
}

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

export default <T>(v: T): ProcessPrimitiveObject<string | number, T> => toPrimitive(v, "default");
export const string = <T>(v: T): ProcessPrimitiveObject<string, T> => toPrimitive(v, "string");
export const number = <T>(v: T): ProcessPrimitiveObject<number, T> => toPrimitive(v, "number");

function toPrimitive(v: any, hint: "default" | "string" | "number"): any {
  if (typeof v === "function" || typeof v === "object" && !!v) {
    if (typeof v[Symbol.toPrimitive] === "function") {
      return v[Symbol.toPrimitive](hint);
    }

    return v.toString();
  }

  return v;
}
