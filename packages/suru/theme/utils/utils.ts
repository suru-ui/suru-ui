import { globalId } from "../gen/utils";

type Val<T> = T[keyof T];

type Ref<T extends string = string> = symbol & { ref: T };

type Key = string | number;

type Obj = { readonly [p: Key]: unknown };

type Arr = readonly unknown[];

type Idx = `${number}`;

// dprint-ignore
type Chain<T> =
    T extends string | number | Ref ? ""
  : T extends Obj ? Val<{ [P in keyof T]: P extends Key ? `.${P}${Chain<T[P]> | ""}` : never }>
  : T extends Arr ? Val<{ [I in Extract<keyof T, Idx>]: `.${I}${Chain<T[I]> | ""}` }>
  : never;

// dprint-ignore
type Def<T, R, K extends keyof T = keyof T> = {
  [P in K]:
      T[P] extends Key ? T[P]
    : T[P] extends Obj ? Def<T[P], R>
    : T[P] extends Arr ? Def<T[P], R, Extract<keyof T[P], Idx>>
    : R;
};

export type { Ref };

export function $<const T extends string>(ref: T): Ref<`$.${T}`> {
  return { [Symbol.for("$")]: ref } as any;
}

export function global<const T extends Def<T, Ref<`$${Chain<T>}`>>>(def: T): T {
  return { [Symbol.for(`global-${globalId.current++}`)]: def } as any;
}

export function define<const T extends Def<T, Ref<`$${Chain<T>}`>>>(def: T): T {
  return def;
}
