import type { CssValue, CssValueFactory, HtmlTag } from "@suru-ui/cssinjs";
import * as cssinjs from "@suru-ui/cssinjs";
import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import type * as React from "react";
import { COMPONENT_CLASSNAME_PREFIX, STYLE_CLASSNAME_PREFIX, STYLE_PRECEDENCE } from "./const";
import htmltags from "./htmltags";

/**
 * スタイル付きのコンポーネントのプロパティ
 *
 * @template T HTML 要素のタグ名
 */
export type StyledComponentProps<T extends HtmlTag> = Readonly<
  React.JSX.IntrinsicElements[T] & {
    asChild?: boolean | undefined;
  }
>;

/**
 * スタイル付きのコンポーネントのプロパティ
 *
 * @template T HTML 要素のタグ名
 * @template P CSS プロパティ
 */
export type StyledComponentPropsWithCss<T extends HtmlTag, P> = Readonly<
  StyledComponentProps<T> & {
    css: P;
  }
>;

type StyledFunctionComponentMeta<T extends HtmlTag, P> = {
  /**
   * HTML タグ名
   */
  readonly tagName: T;
  /**
   * スタイルテンプレートのハッシュ値
   */
  readonly templateHash: string;
  /**
   * コンポーネント名
   *
   * @default `${tagName}-${templateHash}`
   */
  componentName: string;
  readonly className: {
    /**
     * @returns `sui-c-${componentName}`
     */
    (this: StyledFunctionComponent<T, P>): string;
  };
  readonly toString: {
    /**
     * @returns `.${className()}`
     */
    (this: StyledFunctionComponent<T, P>): string;
  };
};

/**
 * スタイル付きのコンポーネント
 *
 * @template P プロパティ
 */
export interface StyledFunctionComponent<T extends HtmlTag, P>
  extends React.FunctionComponent<P>, StyledFunctionComponentMeta<T, P>
{}

/**
 * スタイル付きのコンポーネント
 *
 * @template T HTML 要素のタグ名
 */
export interface StyledComponent<T extends HtmlTag>
  extends StyledFunctionComponent<T, StyledComponentProps<T>>
{}

/**
 * スタイル付きのコンポーネント
 *
 * @template T HTML 要素のタグ名
 * @template P CSS プロパティ
 */
export interface StyledComponentWithCss<T extends HtmlTag, P>
  extends StyledFunctionComponent<T, StyledComponentPropsWithCss<T, P>>
{}

/**
 * スタイル付きのコンポーネントを作成する関数
 *
 * @template T HTML 要素のタグ名
 */
export interface CreateStyledComponent<T extends HtmlTag> {
  /**
   * スタイル付きのコンポーネントを作成する。
   *
   * @returns スタイル付きのコンポーネント
   */
  (pieces: TemplateStringsArray, ...values: readonly CssValue[]): StyledComponent<T>;
  /**
   * スタイル付きのコンポーネントを作成する。
   *
   * @template P CSS プロパティ
   * @returns スタイル付きのコンポーネント
   */
  <P>(
    pieces: TemplateStringsArray,
    ...values: readonly (CssValue | CssValueFactory<P>)[]
  ): StyledComponentWithCss<T, P>;
}

const styled = {} as {
  readonly [
    // SVG 関連の要素には React の style の巻き上げが効かないので、HTML 要素のみを対象にする。
    T in HtmlTag
  ]: CreateStyledComponent<T>;
};

for (const tagName of htmltags) {
  function createStyledComponent(
    pieces: TemplateStringsArray,
    ...values: readonly (CssValue | CssValueFactory)[]
  ) {
    const {
      hash: templateHash,
      template,
      factories,
    } = cssinjs.build(pieces, values);
    const Comp: StyledFunctionComponent<HtmlTag, any> = Object.assign<
      React.FunctionComponent<StyledComponentPropsWithCss<HtmlTag, {}>>,
      StyledFunctionComponentMeta<HtmlTag, {}>
    >(
      function StyledComponent(props) {
        const {
          css, // {} | undefined
          asChild,
          children,
          className: classNameProp,
          ...otherProps
        } = props;
        const Component: any = asChild ? Slot : Comp.tagName;
        const {
          hash: cssHash,
          cssText,
        } = cssinjs.compile(css, template, factories);
        const styleHash = Comp.templateHash + "-" + cssHash;
        const styleClassName = STYLE_CLASSNAME_PREFIX + styleHash;
        const styleText = "." + styleClassName + "{" + cssText + "}";
        const className = clsx(classNameProp, Comp.className(), styleClassName);

        // 子要素のスタイルを親要素のスタイルより後に来るようにするために、コンポーネントよりも先にスタイルを定義する。
        return (
          <>
            <style
              href={styleHash}
              precedence={STYLE_PRECEDENCE}
            >
              {styleText}
            </style>
            <Component
              {...otherProps}
              className={className}
            >
              {children}
            </Component>
          </>
        );
      },
      {
        tagName,
        templateHash,
        componentName: tagName + "-" + templateHash,
        className: function toStyledComponentClassName() {
          return COMPONENT_CLASSNAME_PREFIX + this.componentName;
        },
        toString: function toStyledComponentSelector() {
          return "." + this.className();
        },
      },
    );

    return Comp;
  }

  // @ts-expect-error
  styled[tagName] = createStyledComponent;
}

export default styled;
