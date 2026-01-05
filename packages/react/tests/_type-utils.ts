import type * as React from "react";

/**
 * Base UI コンポーネントに渡すべきプロパティーを抽出する型定義です。
 *
 * React の標準的な属性のうち、`RefAttributes` や大半の `HTMLAttributes` を除外します。
 *
 * @template TProps 元となるプロパティーの型です。
 * @template TInclude 含めるプロパティーの型です。
 */
export type $PickBaseUiProps<TProps, TInclude extends string = never> = Omit<
  TProps,
  | keyof React.RefAttributes<unknown>
  | Exclude<
    keyof React.HTMLAttributes<unknown>,
    | "className"
    | "style"
    | TInclude
  >
>;

/**
 * HTML 要素の標準的な属性に `ref` プロパティーを加えた型定義です。
 *
 * @template TElement 対象となる HTML 要素の型です。デフォルトは `any` です。
 */
export type HtmlProps<TElement = any> = React.HTMLAttributes<TElement> & {
  /**
   * コンポーネントの背後にある DOM 要素への参照です。
   */
  ref?: React.Ref<TElement> | undefined;
};
