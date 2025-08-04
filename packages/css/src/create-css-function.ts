import stringify, { type CssValue } from "./stringify";

/**
 * CSS プロパティーと CSS のシンタックスハイライトを提供するためのヘルパー関数型です。
 * この型は、CSS のプロパティーを型安全に扱いつつ、テンプレートリテラルによるCSS記述を可能にします。
 *
 * @template P CSS プロパティーの型です。この型によって、CSS 関数が持つ追加のプロパティーが定義されます。
 */
export type CssFunction<P = {}> = Readonly<Omit<P, keyof Function>> & {
  /**
   * タグ付きテンプレートリテラルを使用して、CSS の値を文字列に変換します。
   * これにより、JavaScript の変数を CSS の値として埋め込みながら、CSS の文字列を構築できます。
   *
   * @param pieces テンプレートリテラルの文字列リテラルの部分です。
   * @param values テンプレートリテラルに埋め込まれた `CssValue` 型の式（変数）の配列です。
   * @returns 構築された CSS の値を表す文字列です。
   */
  (pieces: TemplateStringsArray, ...values: readonly CssValue[]): string;
};

/**
 * CSS プロパティーと CSS のシンタックスハイライトを提供するためのヘルパー関数を作成します。
 * この関数は、CSS in JS ライブラリにおいて、CSS の記述を補助する主要なユーティリティです。
 *
 * @param css オプションのオブジェクトで、`CssFunction` に追加したい CSS プロパティーを含みます。
 * 例えば、CSS のカスタムプロパティーなどを追加する際に使用できます。
 * @returns CSS プロパティーと CSS のシンタックスハイライトを提供するためのヘルパー関数です。
 * この関数自体が呼び出し可能であり、追加のプロパティーも持ちます。
 */
export default function createCssFunction(css: {} | undefined): CssFunction {
  function cssFunction(pieces: TemplateStringsArray, ...values: readonly CssValue[]): string {
    let s = pieces[0]!;
    for (let i = 1, n = pieces.length; i < n; i++) {
      s += stringify(values[i - 1]) + pieces[i];
    }

    return s;
  }

  if (!css) {
    return cssFunction;
  }

  if (__DEV__) {
    const keys = Object.keys(css).filter(k => k in cssFunction);
    if (keys.length) {
      console.error("suru-ui(cssinjs): CSS の値に関数のプロパティーが含まれています:", keys);

      css = { ...css };
      for (const key of keys) {
        // @ts-expect-error
        delete css[key];
      }
    }
  }

  return Object.assign(cssFunction, css);
}
