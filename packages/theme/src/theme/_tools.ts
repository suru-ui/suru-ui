/**
 * 型 T のすべてのプロパティーの値のユニオン型を返します。
 *
 * @template T オブジェクトの型です。
 * @example
 * // Val<{ a: number, b: string }> は number | string になります。
 */
type Val<T> = T[keyof T];

/**
 * CSS 変数への参照を表す型です。シンボルとして扱われますが、参照先の文字列 T を保持しています。
 *
 * @template T 参照先の文字列の型です。デフォルトは string です。
 * @example
 * // Ref<"$.color">
 */
type Ref<T extends string = string> = symbol & { ref: T };

/**
 * オブジェクトのキーとして使用可能な型です。
 */
type Key = string | number;

/**
 * 任意のオブジェクト型を定義します。プロパティーは読み取り専用です。
 */
type Obj = { readonly [p: Key]: unknown };

/**
 * 任意の配列型を定義します。配列要素は読み取り専用です。
 */
type Arr = readonly unknown[];

/**
 * 配列のインデックスを表す文字列リテラル型です。
 */
type Idx = `${number}`;

/**
 * 型 T の入れ子になった構造に基づき、ドット区切りのパス文字列のユニオン型を生成します。
 *
 * @template T パスを生成する基となる型です。
 * @example
 * // Chain<{ a: number, b: { c: string } }> は ".a" | ".b" | ".b.c" になります。
 * // Ref 型やプリミティブ型 (string, number) に到達するとパスの連鎖を終了します。
 */
// dprint-ignore
type Chain<T> =
    T extends string | number | Ref ? ""
  : T extends Obj ? Val<{ [P in keyof T]: P extends Key ? `.${P}${Chain<T[P]> | ""}` : never }>
  : T extends Arr ? Val<{ [I in Extract<keyof T, Idx>]: `.${I}${Chain<T[I]> | ""}` }>
  : never;

/**
 * オブジェクトの定義型 T を再帰的に走査し、終端のプロパティーの型を R に置き換える型です。ここでは主にテーマ定義の構造を維持しつつ、値の部分を Ref 型に制限するために使用されます。
 *
 * @template T 変換する元のオブジェクト型です。
 * @template R 終端のプロパティーに適用される型です (通常は Ref 型)。
 * @template K T のキーの型です。内部で再帰のために使用されます。
 * @example
 * // Def<{ color: string, size: { s: number } }, Ref<string>> は { color: string | Ref<string>, size: { s: number | Ref<string> } } のような構造になります。
 * // 実際にはプリミティブ型 (Key 型) はその型を維持し、終端のオブジェクトや配列の要素が R になります。
 */
// dprint-ignore
type Def<T, R, K extends keyof T = keyof T> = {
  [P in K]:
      T[P] extends Key ? T[P]
    : T[P] extends Obj ? Def<T[P], R>
    : T[P] extends Arr ? Def<T[P], R, Extract<keyof T[P], Idx>>
    : R;
};

/**
 * CSS 変数への参照型 `Ref` をエクスポートします。
 */
export type { Ref };

/**
 * CSS 変数参照関数の内部で使用されるグローバルなシンボルです。このシンボルをプロパティーとして持つことで、オブジェクトが CSS 変数参照であることを識別します。
 */
export const CSS_VARIABLE_REFERENCE_SYMBOL = Symbol.for("sui/theme/css-variable-reference");

/**
 * 指定された文字列 T を元に、CSS 変数への参照を表す `Ref` オブジェクトを生成します。
 *
 * @template T 参照する CSS 変数の名前の型 (ドット表記を含まない名前) です。
 * @param ref 参照する CSS 変数の名前です。
 * @returns CSS 変数への参照オブジェクトです。形式は `$.<ref>` となります。
 */
export const $ = Object.assign(function $<const T extends string>(ref: T): Ref<`$.${T}`> {
  // @ts-expect-error
  return { [CSS_VARIABLE_REFERENCE_SYMBOL]: ref };
}, {
  /**
   * 指定された文字列 T を元に、CSS 変数への参照を表す文字列を生成します。型は `Ref` オブジェクトですが、文字列を返します。
   *
   * @template T 参照する CSS 変数の名前の型 (ドット表記を含まない名前) です。
   * @param ref 参照する CSS 変数の名前です。
   * @returns CSS 変数です。
   */
  string<const T extends string>(ref: T): Ref<`$.${T}`> {
    // @ts-expect-error
    return `var(--${ref.split(".").join("-")})`;
  },
});

/**
 * テーマの参照に使用される一意のシンボルを生成します。
 *
 * @param id 参照 ID です。
 * @returns 参照を表すシンボルです。
 */
export function getThemeReferenceSymbol(id: number): symbol {
  return Symbol.for(`sui/theme/theme-reference-${id}`);
}

/**
 * 参照 ID を管理するためのカウンター変数です。
 */
let extendId = 0;

/**
 * 現在の参照 ID の値を取得します。
 *
 * @returns 現在の参照 ID です。
 */
export function getCurrentThemeReferenceId(): number {
  return extendId;
}

/**
 * テーマ定義を参照するための関数です。内部で参照 ID をインクリメントし、参照シンボルを付与したテーマ定義オブジェクトを返します。
 *
 * @template TDef テーマ定義オブジェクトの型です。
 * @param def 参照するテーマ定義オブジェクトです。
 * @returns 参照シンボルが付与されたテーマ定義オブジェクトです。
 */
export function reference<const TDef extends Def<TDef, Ref<`$${Chain<TDef>}`>>>(def: TDef): TDef {
  // @ts-expect-error
  return { [getThemeReferenceSymbol(extendId++)]: def };
}

/**
 * 新しいテーマ定義を作成するための関数です。主に型推論のために使用され、渡されたテーマ定義オブジェクトをそのまま返します。
 *
 * @template TDef テーマ定義オブジェクトの型です。
 * @param def 作成するテーマ定義オブジェクトです。
 * @returns 渡されたテーマ定義オブジェクトです。
 */
export function create<const TDef extends Def<TDef, Ref<`$${Chain<TDef>}`>>>(def: TDef): TDef {
  return def;
}
