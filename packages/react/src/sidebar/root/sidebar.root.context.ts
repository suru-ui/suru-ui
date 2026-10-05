import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type {
  SidebarRootSide,
  SidebarRootVariant,
  SidebarRootCollapsible,
} from "./sidebar.root.jsx";

/**
 * サイドバーの開閉状態です。
 *
 * - `"expanded"`: 展開しています。
 * - `"collapsed"`: 折りたたまれています。
 */
export type SidebarOpenState = "expanded" | "collapsed";

/**
 * {@link SidebarProvider} が子パーツへ提供する状態です。
 */
export type SidebarContextState = {
  /**
   * サイドバーが開いているかどうかです。
   */
  readonly open: boolean;

  /**
   * サイドバーの開閉状態です。
   */
  readonly state: SidebarOpenState;

  /**
   * 折りたたみの方法です。
   *
   * {@link SidebarRoot} の内側ではその値が入ります。外側では `undefined` です。
   */
  readonly collapsible?: SidebarRootCollapsible | undefined;

  /**
   * サイドバーを配置する辺です。
   *
   * {@link SidebarRoot} の内側ではその値が入ります。外側では `undefined` です。
   */
  readonly side?: SidebarRootSide | undefined;

  /**
   * サイドバーの外観バリアントです。
   *
   * {@link SidebarRoot} の内側ではその値が入ります。外側では `undefined` です。
   */
  readonly variant?: SidebarRootVariant | undefined;
};

/**
 * {@link SidebarProvider} が子パーツへ提供するコンテキストの型です。
 */
export type SidebarContext = Readonly<
  Override<
    SidebarContextState,
    {
      /**
       * サイドバーの開閉状態を設定します。
       */
      readonly setOpen: (open: boolean) => void;

      /**
       * サイドバーの開閉状態を切り替えます。
       */
      readonly toggle: () => void;
    }
  >
>;

/**
 * {@link SidebarProvider} が子パーツへ提供するコンテキストです。
 */
export const SidebarContext: React.Context<SidebarContext | null> =
  React.createContext<SidebarContext | null>(null);

export type IUseSidebarContext = IUseContext<SidebarContext>;

/**
 * {@link SidebarContext} を読み取るフックです。
 */
export const useSidebarContext: IUseSidebarContext = function useSuiSidebarContext(
  optional?: boolean,
): any {
  const ctx = React.use(SidebarContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SidebarContext",
      providerName: "SidebarProvider",
    });
  }

  return ctx;
};

export { SidebarContext as Context, useSidebarContext as useContext };

export namespace Context {
  export type Collapsible = SidebarRootCollapsible;

  export type OpenState = SidebarOpenState;

  export type Side = SidebarRootSide;

  export type Variant = SidebarRootVariant;
}
