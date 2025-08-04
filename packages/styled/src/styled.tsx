import { type CssValue, type CssValueFactory, Template } from "@suru-ui/css";
import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import type * as React from "react";
import HTML_TAGS, { type HtmlTag } from "./html-tags";
import { STYLED_SELECTOR } from "./utils";

// スタイルの優先順位を定義する定数です。
const STYLE_PRECEDENCE = "sui-styled";
// スタイルクラス名のプレフィックスを定義する定数です。
const STYLE_CLASSNAME_PREFIX = "sui-s-";
// コンポーネントクラス名のプレフィックスを定義する定数です。
const COMPONENT_CLASSNAME_PREFIX = "sui-c-";

/**
 * スタイル付きのコンポーネントのプロパティーを表す型です。
 *
 * @template T HTML 要素のタグ名です。
 */
export type StyledComponentProps<T extends HtmlTag> = Readonly<
  React.JSX.IntrinsicElements[T] & {
    /**
     * 子要素としてレンダリングするかどうかを示すプロパティーです。
     * `true` の場合、要素自体はレンダリングされず、子要素のみがレンダリングされます。
     */
    asChild?: boolean | undefined;

    /**
     * コンポーネントに適用する CSS プロパティーです。
     */
    css?: undefined;
  }
>;

/**
 * CSS プロパティーを持つスタイル付きのコンポーネントのプロパティーを表す型です。
 *
 * @template T HTML 要素のタグ名です。
 * @template P CSS プロパティーの型です。
 */
export type StyledComponentPropsWithCss<T extends HtmlTag, P> = Readonly<
  React.JSX.IntrinsicElements[T] & {
    /**
     * 子要素としてレンダリングするかどうかを示すプロパティーです。
     * `true` の場合、要素自体はレンダリングされず、子要素のみがレンダリングされます。
     */
    asChild?: boolean | undefined;

    /**
     * コンポーネントに適用する CSS プロパティーです。
     */
    css: P;
  }
>;

/**
 * スタイル付きの関数コンポーネントのメタデータを定義する型です。
 *
 * @template T HTML 要素のタグ名です。
 */
type StyledFunctionComponentAttributes<T extends HtmlTag> = {
  /**
   * HTML タグ名です。
   */
  readonly tagName: T;

  /**
   * スタイルテンプレートのハッシュ値です。
   * これにより、同じスタイルでも内容が異なれば異なるハッシュ値になります。
   */
  readonly templateHash: string;

  /**
   * コンポーネント名です。
   *
   * @default `${tagName}-${templateHash}` の形式で設定されます。
   */
  componentName: string;

  /**
   * コンポーネントのクラス名です。
   */
  readonly className: string;

  /**
   * コンポーネントのセレクターを生成する関数です。
   */
  readonly toString: {
    /**
     * コンポーネントの CSS セレクターを返します。
     *
     * @returns `.${className()}` の形式の文字列を返します。
     */
    (): string;
  };
};

/**
 * スタイル付きの関数コンポーネントを表すインターフェースです。
 * React の関数コンポーネントの機能に加え、スタイルに関するメタデータも持ちます。
 *
 * @template T HTML 要素のタグ名です。
 * @template P プロパティーの型です。
 */
export interface StyledFunctionComponent<T extends HtmlTag, P>
  extends React.FunctionComponent<P>, StyledFunctionComponentAttributes<T>
{}

/**
 * 特定の HTML 要素に対するスタイル付きコンポーネントを表すインターフェースです。
 * CSS プロパティーを持たない基本的なスタイル付きコンポーネントです。
 *
 * @template T HTML 要素のタグ名です。
 */
export interface StyledComponent<T extends HtmlTag>
  extends StyledFunctionComponent<T, StyledComponentProps<T>>
{}

/**
 * CSS プロパティーを持つスタイル付きコンポーネントを表すインターフェースです。
 *
 * @template T HTML 要素のタグ名です。
 * @template P CSS プロパティーの型です。
 */
export interface StyledComponentWithCss<T extends HtmlTag, P>
  extends StyledFunctionComponent<T, StyledComponentPropsWithCss<T, P>>
{}

/**
 * スタイル付きのコンポーネントを作成する関数のインターフェースです。
 * オーバーロードにより、CSS プロパティーの型を指定するかどうかで異なる振る舞いをします。
 *
 * @template T HTML 要素のタグ名です。
 */
export interface CreateStyledComponent<T extends HtmlTag> {
  /**
   * スタイル付きのコンポーネントを作成します。
   * CSS プロパティーを動的に変更しない場合に利用します。
   *
   * @param pieces テンプレートリテラルの文字列部分です。
   * @param values テンプレートリテラルの埋め込み式（CSS 値）です。
   * @returns スタイル付きのコンポーネントを返します。
   */
  (pieces: TemplateStringsArray, ...values: readonly CssValue[]): StyledComponent<T>;

  /**
   * 動的な CSS プロパティーを持つスタイル付きのコンポーネントを作成します。
   * `css` プロパティーを介して CSS を動的に変更する場合に利用します。
   *
   * @template P CSS プロパティーの型です。
   * @param pieces テンプレートリテラルの文字列部分です。
   * @param values テンプレートリテラルの埋め込み式（CSS 値または CSS 値ファクトリー）です。
   * @returns スタイル付きのコンポーネントを返します。
   */
  <P>(
    pieces: TemplateStringsArray,
    ...values: readonly (CssValue | CssValueFactory<P>)[]
  ): StyledComponentWithCss<T, P>;

  /**
   * 動的な CSS プロパティーを持つスタイル付きのコンポーネントを作成します。
   * `css` プロパティーを介して CSS を動的に変更する場合に利用します。
   *
   * @template P CSS プロパティーの型です。
   * @param factory CSS 値を生成するための関数型です。
   * @returns スタイル付きのコンポーネントを返します。
   */
  <P>(factory: CssValueFactory<P>): StyledComponentWithCss<T, P>;
}

const LAYERS = [
  "@layer sui;",
  "@layer sui.reset;", // 現在未使用
  "@layer sui.theme;",
  "@layer sui.component;",
  "@layer sui.utilities;", // 現在未使用
  "@layer sui.overwrite;",
].join("");

const styled = {} as {
  readonly [
    // SVG 関連の要素には React の `style` の巻き上げが効かないため、ここでは HTML 要素のみを対象としています。
    T in HtmlTag
  ]: CreateStyledComponent<T>;
};

for (const tagName of HTML_TAGS) {
  function createStyledComponent(
    arg0: TemplateStringsArray | CssValueFactory,
    ...values: readonly (CssValue | CssValueFactory)[]
  ) {
    let pieces: TemplateStringsArray;
    if (typeof arg0 !== "function") {
      pieces = arg0;
    } else {
      pieces = Object.assign(["", ""], { raw: ["", ""] });
      values = [arg0];
    }

    const template = new Template(pieces, values);
    const templateHash = template.hashString;

    function StyledComponent(props: StyledComponentPropsWithCss<HtmlTag, {} | undefined>) {
      const {
        css, // {} | undefined
        asChild,
        children,
        className: classNameProp,
        ...otherProps
      } = props;
      const Comp: any = asChild ? Slot : tagName;
      const result = template.build(css);
      const styleId = templateHash + "-" + result.paramsHashString;
      const styleClassName = STYLE_CLASSNAME_PREFIX + styleId;
      const styledSelector = "." + styleClassName;
      const styleInnerHtml = result.cssText.includes(STYLED_SELECTOR)
        ? result.cssText.replaceAll(STYLED_SELECTOR, styledSelector)
        : styledSelector + "{" + result.cssText + "}";

      return (
        <>
          {/* スタイルの優先順位を決めるためにレイヤーを定義します。 */}
          <style
            href="layer"
            precedence={STYLE_PRECEDENCE}
            dangerouslySetInnerHTML={{ __html: LAYERS }}
          />
          {/* 子要素のスタイルが親要素のスタイルよりも後に適用されるように、<style> タグをコンポーネントよりも前に定義します。 */}
          <style
            href={styleId}
            precedence={STYLE_PRECEDENCE}
            dangerouslySetInnerHTML={{ __html: styleInnerHtml }}
          />
          <Comp
            {...otherProps}
            className={clsx(classNameProp, Component.className, styleClassName)}
          >
            {children}
          </Comp>
        </>
      );
    }

    const Component = StyledComponent as StyledFunctionComponent<HtmlTag, {} | undefined>;
    const attributes: Omit<StyledFunctionComponentAttributes<HtmlTag>, "className"> = {
      tagName,
      templateHash,
      componentName: tagName + "-" + templateHash, // デフォルトのコンポーネント名です。
      toString() {
        return "." + Component.className;
      },
    };
    Object.assign(Component, attributes);
    Object.defineProperty(Component, "className", {
      get() {
        return COMPONENT_CLASSNAME_PREFIX + Component.componentName;
      },
    });

    return Component;
  }

  // @ts-expect-error
  styled[tagName] = createStyledComponent;
}

export default styled;
