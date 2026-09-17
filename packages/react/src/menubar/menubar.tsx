import * as React from "react";

import mergeProps from "../_merge-props.js";
import { Menu } from "../menu/menu.jsx";
import type { Override, IComponent } from "../types.js";
import { isItemObject } from "./_menubar.jsx";
import {
  type MenubarRootProps,
  type MenubarRootState,
  type MenubarRootItemObject,
  type MenubarRootOrientation,
  type IMenubarRootItemRenderer,
  MenubarRoot,
} from "./menubar.parts.js";

// Types
// -----

export type MenubarItemObject = MenubarRootItemObject;

export interface IMenubarItemRenderer<TItem = any> extends IMenubarRootItemRenderer<TItem> {}

export type MenubarOrientation = MenubarRootOrientation;

/**
 * {@link Menubar} が持つ状態です。
 */
export type MenubarState = MenubarRootState;

/**
 * {@link Menubar} の各パーツに渡す props です。
 */
export type MenubarSlotProps = {
  /**
   * すべての {@link Menu} に渡す props です。
   */
  // items を除外しているので、Menu.Props に型引数は不要です。
  readonly menu?: Omit<Menu.Props, "items" | "trigger"> | undefined;
};

/**
 * {@link Menubar} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type MenubarProps<TItem = any> = Override<
  MenubarRootProps<TItem>,
  {
    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: MenubarSlotProps | undefined;
  }
>;

// API
// ---

/**
 * {@link Menubar} を構成する各パーツの props などを作成するための API です。
 *
 * @template TItem 項目の型です。
 */
export interface MenubarAPI<TItem = any> {
  /**
   * {@link Menu} に渡す props を取得します。
   */
  getMenuProps(): Omit<Menu.Props, "items" | "trigger">;
  /**
   * {@link Menu} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getMenuProps(item: MenubarItemObject): Menu.Props<Menu.ItemObject>;
  getMenuProps(
    item?: MenubarItemObject,
  ): Omit<Menu.Props, "items" | "trigger"> | Menu.Props<Menu.ItemObject>;

  /**
   * {@link MenubarRoot} に渡す props を取得します。
   */
  getRootProps(): MenubarRootProps<TItem>;
}

interface IUseMenubarAPI {
  /**
   * {@link MenubarAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @param props {@link Menubar} の props です。
   * @returns メニューバーの API です。
   */
  <TItem = any>(props: MenubarProps<TItem>): MenubarAPI<TItem>;
}

/**
 * {@link MenubarAPI} を作成するフックです。
 */
export const useMenubarAPI: IUseMenubarAPI = function useSuiMenubarAPI(props) {
  const { slotProps: { menu: menuProps = {} } = {}, ...rootProps } = props;

  return {
    getMenuProps(item?: MenubarItemObject): any {
      return ((): ReturnType<MenubarAPI["getMenuProps"]> => {
        if (!item) {
          return menuProps;
        }

        return mergeProps([menuProps, item]);
      })();
    },
    getRootProps() {
      const defaultItemRenderer: IMenubarRootItemRenderer = (item, index) => {
        switch (true) {
          case isItemObject(item):
            return <Menu {...this.getMenuProps(item)} key={index} />;

          default:
            return item;
        }
      };

      const { children = defaultItemRenderer, ...otherRootProps } = rootProps;

      return {
        ...otherRootProps,
        children,
      };
    },
  };
};

export { type MenubarAPI as API, useMenubarAPI as useAPI };

// Component
// ---------

interface IMenubar extends IComponent<MenubarProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: MenubarProps<TItem>): IComponent.Return;
}

/**
 * メニューを横または縦に並べるコンポーネントです。
 */
export const Menubar: IMenubar = function SuiMenubar(props: MenubarProps) {
  const api = useMenubarAPI(props);

  return <MenubarRoot {...api.getRootProps()} />;
};

export namespace Menubar {
  export type State = MenubarState;

  export type Props<TItem = any> = MenubarProps<TItem>;

  export type SlotProps = MenubarSlotProps;

  export type ItemObject = MenubarItemObject;

  export interface IItemRenderer<TItem = any> extends IMenubarItemRenderer<TItem> {}

  export type Orientation = MenubarOrientation;
}
