import { getLogger } from "@logtape/logtape";
import type { Ref } from "./theme/_tools.ts";
import type base from "./theme/base.ts";
import type theme from "./theme/dark-standard.ts";
import type { CssCustomProperties } from "./types.ts";

/**
 * オブジェクト型 TEntries のキーのうち、値が TWhere 型に適合するもののみを抽出したユニオン型を返します。
 *
 * @template TEntries 処理対象のオブジェクト型です。
 * @template TWhere 値が一致すべき型です。
 * @example
 * // $Keyof<{ a: number, b: string }, string> は "b" になります。
 */
type $Keyof<TEntries, TWhere> = {
  [P in keyof TEntries]: TEntries[P] extends TWhere ? P : never;
}[keyof TEntries];

// // dprint-ignore
// type $Indexes<Tuple> =
//     Extract<keyof Tuple, `${number}`> extends `${infer I extends number}`
//   ? I
//   : never;

/**
 * ベーステーマの定義型を表すエイリアスです。
 */
type B = typeof base;

/**
 * 特定のテーマ（dark-standard）の定義型を表すエイリアスです。
 */
type T = typeof theme;

/**
 * コンポーネントの高さに関するバリエーションのユニオン型です。
 */
export type Height = keyof B["sui"]["height"];

/**
 * スペーシングやサイズ設定に使用される数値型のユニオン型です。
 */
export type Size = Extract<keyof B["sui"]["size"], number>;

/**
 * CSS 変数参照で使用される、基本的な色の名前（原色）のユニオン型です。
 */
type ColorOrign =
  | "grey"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "magenta";

/**
 * テーマ定義において、`ColorOrign` への参照として定義されている色名のエイリアス（別名）のユニオン型です。
 */
type ColorAlias = $Keyof<T["sui"], Ref<`$.sui.${ColorOrign}`>>;

/**
 * すべての色を表すユニオン型です。基本的な色（原色）と、原色を参照するエイリアス色を含みます。
 */
export type Color = ColorOrign | ColorAlias;

/**
 * 色のスケール（明度や彩度）を表す数値のユニオン型です。テーマ定義内の基本色（`ColorOrign`）のプロパティーから数値のみを抽出します。
 */
export type ColorScale = Extract<keyof T["sui"][ColorOrign], number>;

/**
 * 色のバリアント（スタイル）を表す文字列のユニオン型です。テーマ定義内の基本色（`ColorOrign`）のプロパティーから数値以外のキーを抽出します。
 */
export type ColorVariant = Exclude<keyof T["sui"][ColorOrign], ColorScale>;

// export type ShadowElevation = $Indexes<T["sui"]["shadow"]>;

/**
 * タイポグラフィーのバリエーションを表す文字列のユニオン型です。
 */
export type TypographyVariant = keyof B["_digital_go_jp"]["typography"];

/**
 * 利用可能なすべての高さ（`Height`）バリエーションを含む読み取り専用の配列です。
 */
export const HEIGHT_LIST: readonly Height[] = [
  "sm",
  "md",
  "lg",
];

/**
 * 利用可能なすべてのサイズ（`Size`）の値を含む読み取り専用の配列です。
 */
export const SIZE_LIST: readonly Size[] = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
];

/**
 * 利用可能なすべての色（`Color`）を含む読み取り専用の配列です。
 */
export const COLOR_LIST: readonly Color[] = [
  "grey",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "magenta",
  "accent",
  "note",
  "info",
  "warn",
  "error",
  "success",
];

/**
 * 利用可能なすべてのカラースケール（`ColorScale`）の値を含む読み取り専用の配列です。
 */
export const COLOR_SCALE_LIST: readonly ColorScale[] = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
];

/**
 * 利用可能なすべての色バリアント（`ColorVariant`）を含む読み取り専用の配列です。
 */
export const COLOR_VARIANT_LIST: readonly ColorVariant[] = [
  "solid",
  "naked",
  "liquid",
];

// export const SHADOW_ELEVATION_LIST: readonly ShadowElevation[] = [
//   0,
//   1,
//   2,
//   3,
//   4,
//   5,
//   6,
//   7,
//   8,
// ];

/**
 * 高速なルックアップのために `HEIGHT_LIST` から生成された `ReadonlySet` です。
 */
export const heightSet: ReadonlySet<Height> = /*#__PURE__*/ new Set(HEIGHT_LIST);

/**
 * 高速なルックアップのために `SIZE_LIST` から生成された `ReadonlySet` です。
 */
export const sizeSet: ReadonlySet<Size> = /*#__PURE__*/ new Set(SIZE_LIST);

/**
 * 高速なルックアップのために `COLOR_LIST` から生成された `ReadonlySet` です。
 */
export const colorSet: ReadonlySet<Color> = /*#__PURE__*/ new Set(COLOR_LIST);

/**
 * 高速なルックアップのために `COLOR_SCALE_LIST` から生成された `ReadonlySet` です。
 */
export const colorScaleSet: ReadonlySet<ColorScale> = /*#__PURE__*/ new Set(COLOR_SCALE_LIST);

/**
 * 高速なルックアップのために `COLOR_VARIANT_LIST` から生成された `ReadonlySet` です。
 */
export const colorVariantSet: ReadonlySet<ColorVariant> = /*#__PURE__*/ new Set(
  COLOR_VARIANT_LIST,
);

// export const shadowElevationSet: ReadonlySet<ShadowElevation> = new Set(
//   SHADOW_ELEVATION_LIST,
// );

/**
 * 与えられた値が有効な `Height` のバリエーションであるかどうかを判定します。
 *
 * @param value 判定する値です。
 * @returns 値が `Height` 型であれば `true` を返します。
 */
export function isHeight(value: any): value is Height {
  return heightSet.has(value);
}

/**
 * 与えられた値が有効な `Size` の値であるかどうかを判定します。
 *
 * @param value 判定する値です。
 * @returns 値が `Size` 型であれば `true` を返します。
 */
export function isSize(value: any): value is Size {
  return sizeSet.has(value);
}

/**
 * 与えられた値が有効な `Color` の値であるかどうかを判定します。
 *
 * @param value 判定する値です。
 * @returns 値が `Color` 型であれば `true` を返します。
 */
export function isColor(value: any): value is Color {
  return colorSet.has(value);
}

/**
 * 与えられた値が有効な `ColorScale` の値であるかどうかを判定します。
 *
 * @param value 判定する値です。
 * @returns 値が `ColorScale` 型であれば `true` を返します。
 */
export function isColorScale(value: any): value is ColorScale {
  return colorScaleSet.has(value);
}

/**
 * 与えられた値が有効な `ColorVariant` の値であるかどうかを判定します。
 *
 * @param value 判定する値です。
 * @returns 値が `ColorVariant` 型であれば `true` を返します。
 */
export function isColorVariant(value: any): value is ColorVariant {
  return colorVariantSet.has(value);
}

// export function isShadowElevation(value: any): value is ShadowElevation {
//   return shadowElevationSet.has(value);
// }

/**
 * 再帰プロキシーのベースとして使用される空の関数オブジェクトです。
 */
let proxy: () => void;

/**
 * オブジェクトチェーンアクセスをトラップし、テーマパスを構築するための再帰的な `Proxy` オブジェクトを作成します。
 *
 * 最終的に `.toString()`、`.$name`、または `.$keys` が呼び出されたときに、`get` コールバックが実行されます。
 *
 * @param get 終端のメソッドとパス配列を受け取り、戻り値を決定するコールバック関数です。
 * @param stack 現在までにアクセスされたプロパティー名（パス）の配列です。
 * @returns 新しい `Proxy` オブジェクトです。
 */
function createRecursiveProxy(
  get: (method: string, path: string[]) => any,
  stack: string[] = [],
): any {
  if (!proxy) {
    // `proxy` がまだ初期化されていない場合、初期化を行います。

    proxy = () => {};
    const OWN_KEYS = ["toString", "$name", "$keys"];
    for (const k of OWN_KEYS) {
      // @ts-expect-error
      proxy[k] = null;
    }
  }

  return new Proxy(proxy, {
    /**
     * プロパティーがアクセスされたときに実行されるトラップです。
     *
     * @param target ターゲットオブジェクトです（ここでは `proxy` 関数）。
     * @param prop アクセスされたプロパティー名です。
     * @param receiver プロキシー自体です。
     * @returns 再帰プロキシーまたは組み込みプロパティーの値です。
     */
    get(target, prop, receiver) {
      switch (prop) {
        // `toString` がアクセスされた場合もパスの一部として扱います。
        case "toString":
          return createRecursiveProxy(get, stack.concat(prop));
        // `.$name` がアクセスされた場合、`get` コールバックを呼び出し、`"name"` メソッドでパスを渡します。
        case "$name":
          return get("name", stack);
        // `.$keys` がアクセスされた場合、`get` コールバックを呼び出し、`"keys"` メソッドでパスを渡します。
        case "$keys":
          return get("keys", stack);
        default:
          // 文字列プロパティーの場合、パスに追加して新しい再帰プロキシーを返します。
          return typeof prop === "string"
            ? createRecursiveProxy(get, stack.concat(prop))
            // それ以外の場合（Symbol など）は通常の動作をします。
            : Reflect.get(target, prop, receiver);
      }
    },

    /**
     * プロキシーが関数として呼び出されたときに実行されるトラップです。
     *
     * このシステムでは、終端のメソッド呼び出し（`.toString()` のみ）を処理します。
     *
     * @returns 戻り値または空の文字列です。
     */
    apply() {
      // 最後の要素をスタックからポップし、呼び出されたメソッド名と見なします。
      const method = stack.pop();
      if (method === "toString") {
        // `toString()` が呼び出された場合、`get` コールバックを実行して戻り値を取得します。
        return get(method!, stack);
      }

      // `toString()` 以外の呼び出しはエラーとしてログに記録します。
      getLogger(["suru-ui", "theme"]).error(".toString() と 以外を呼び出すことはできません。", {
        stack,
      });

      return "";
    },
  });
}

/**
 * CSS カスタムプロパティー参照のためのプロキシーオブジェクトです。
 *
 * 例: `$.sui.red[1]` は `var(--sui-red-1)` に解決されます。
 */
export const $ = /*#__PURE__*/ createRecursiveProxy(
  /**
   * プロキシーの終端で呼び出され、パスに基づいた戻り値を生成します。
   *
   * @param method 呼び出された終端メソッド（"toString", "name", "keys"）です。
   * @param path アクセスされたプロパティー名の配列です。
   * @returns 対応する CSS 変数文字列、変数名、またはパス配列です。
   */
  function toReturnValue(method, path): any {
    switch (method) {
      case "toString":
        // CSS の `var(...)` 関数形式の文字列を返します。
        return "var(" + toReturnValue("name", path) + ")";
      case "name":
        // CSS 変数名（ハイフン区切り、接頭辞 `--` 付き）を返します。
        return "--" + path.join("-");
      case "keys":
        // パス配列そのものを返します。
        return path;
    }
  },
) as CssCustomProperties;
