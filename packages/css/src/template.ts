import { Hash } from "@suru-ui/hash";
import createCssFunction, { type CssFunction } from "./create-css-function";
import stringify, { type CssValue } from "./stringify";

/**
 * CSS 値を生成するための関数型です。
 * この関数は、CSS プロパティーのコンテキスト内で動的に CSS 値を生成するために使用されます。
 *
 * @template P CSS プロパティーの型です。この型は、`CssFunction` に渡される追加のプロパティーを定義します。
 */
export interface CssValueFactory<P = {}> {
  /**
   * CSS の値を返す関数です。
   * この関数は、CSS のコンテキスト（`CssFunction`）を受け取り、それに基づいて `CssValue` を返します。
   *
   * @param css CSS プロパティーとシンタックスハイライト機能を提供する `CssFunction` です。
   * @returns 生成された CSS の値です。
   */
  (css: CssFunction<P>): CssValue;
}

/**
 * テンプレートから作成された CSS テキストと、パラメーターのハッシュ文字列を格納する型です。
 */
export type TemplateBuildResult = {
  /**
   * 最終的に構築された CSS テキストです。
   */
  cssText: string;

  /**
   * テンプレートに埋め込まれた動的なパラメーター（`CssValueFactory` によって生成された値）のハッシュ文字列です。
   * これにより、同じテンプレートでもパラメーターが異なる場合に、異なるハッシュを生成できます。
   */
  paramsHashString: string;
};

/**
 * CSS テキストを構築するためのテンプレートクラスです。
 * このクラスは、タグ付きテンプレートリテラルで定義された CSS を解析し、
 * 動的な値を解決して最終的な CSS テキストを生成する機能を提供します。
 */
export default class Template {
  /**
   * CSS テキストの静的な文字列部分の配列です。テンプレートリテラルの `pieces` に相当します。
   */
  private readonly pieces: readonly [string, ...string[]];

  /**
   * テンプレートに埋め込まれた `CssValueFactory` 関数の配列です。
   * これらの関数は、CSS テキストを構築する際に動的な値を生成します。
   */
  private readonly params: readonly CssValueFactory[];

  /**
   * テンプレート自身のハッシュ文字列です。テンプレートの静的な構造に基づいて生成されます。
   */
  public readonly hashString: string;

  /**
   * CSS テキストを構築するためのテンプレートクラスを構築します。
   * このコンストラクタは、タグ付きテンプレートリテラルから渡される `pieces` と `values` を処理し、
   * テンプレートの静的な部分と動的な部分（ファクトリー関数）を分離して格納します。
   *
   * @param pieces CSS テキストの文字列群です。タグ付きテンプレートリテラルの最初の引数に相当します。
   * @param values 各 CSS テキストのパラメーターを埋める値です。`CssValue` または `CssValueFactory` のいずれかです。
   */
  public constructor(
    pieces: TemplateStringsArray,
    values: readonly (CssValue | CssValueFactory)[],
  ) {
    const hash = new Hash();
    let template: [string, ...string[]] = [pieces[0]!];
    let factories: CssValueFactory[] = [];
    for (
      let i = 0,
        n = values.length,
        j = 0,
        v: CssValue | CssValueFactory;
      i < n;
      i++
    ) {
      v = values[i];
      if (typeof v === "function") {
        // 独自の `.toString()` メソッドを持つ関数（例: スタイル付きコンポーネント）は、
        // CSS の値を返すファクトリー関数ではなく、文字列として扱われます。
        if (Object.hasOwn(v, "toString")) {
          template[j] += v.toString() + pieces[i + 1];
        } else {
          j += 1;
          template[j] = pieces[i + 1]!;
          factories.push(v as CssValueFactory);
        }
      } else {
        template[j] += stringify(v) + pieces[i + 1];
      }

      hash.update(template[j]);
    }

    this.pieces = template;
    this.params = factories;
    this.hashString = hash.digest().toString(36);
  }

  /**
   * テンプレートから CSS テキストと、パラメーターのハッシュ文字列を作成します。
   * このメソッドは、テンプレートに埋め込まれた `CssValueFactory` 関数を実行し、
   * 動的な値を解決して最終的な CSS テキストを生成します。
   *
   * @param css オプションのオブジェクトで、`CssFunction` に追加したい CSS プロパティーを含みます。
   * @returns テンプレートから作成された CSS テキストと、パラメーターのハッシュ文字列です。
   */
  public build(css: {} | undefined): TemplateBuildResult {
    let i = 0;
    let cssText = this.pieces[i++]!;
    let cssFuntion = createCssFunction(css);
    const hash = new Hash();
    for (
      let n = this.pieces.length,
        f: CssValueFactory,
        v: CssValue,
        s: string;
      i < n;
      i++
    ) {
      f = this.params[i - 1]!;
      v = f(cssFuntion);
      s = stringify(v);
      hash.update(s);
      cssText += s + this.pieces[i];
    }

    return {
      cssText,
      paramsHashString: hash.digest().toString(36),
    };
  }
}
