import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";
import type { BreadcrumbRootItemObject } from "./breadcrumb.root.jsx";

/**
 * パンくずリストの配色です。
 */
export type BreadcrumbContextColor = Color;

/**
 * パンくずリストの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type BreadcrumbContextSize = Size;

/**
 * {@link BreadcrumbRoot} が子パーツへ提供するコンテキストです。
 */
export type BreadcrumbContext = {
  /**
   * パンくずリストの配色です。
   *
   * 配色は現在のページのリンクに適用されます。
   */
  readonly color: BreadcrumbContextColor;

  /**
   * パンくずリストの項目です。
   */
  readonly items: readonly BreadcrumbRootItemObject[];

  /**
   * パンくずリストの大きさです。
   */
  readonly size: BreadcrumbContextSize;
};

/**
 * {@link BreadcrumbRoot} が子パーツへ提供するコンテキストです。
 */
export const BreadcrumbContext: React.Context<BreadcrumbContext | null> =
  React.createContext<BreadcrumbContext | null>(null);

function useSuiBreadcrumbContext(optional?: false): BreadcrumbContext;
function useSuiBreadcrumbContext(optional?: boolean): BreadcrumbContext | null;
function useSuiBreadcrumbContext(optional?: boolean): BreadcrumbContext | null {
  const ctx = React.use(BreadcrumbContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "BreadcrumbContext",
      providerName: "BreadcrumbRoot",
    });
  }

  return ctx;
}

/**
 * {@link BreadcrumbContext} を読み取るフックです。
 */
export const useBreadcrumbContext: IUseContext<BreadcrumbContext> = useSuiBreadcrumbContext;

export { BreadcrumbContext as Context, useBreadcrumbContext as useContext };

export namespace Context {
  export type Color = BreadcrumbContextColor;

  export type Size = BreadcrumbContextSize;
}
