import * as React from "react";

import { getItemKey } from "../_item.js";
import mergeProps from "../_merge-props.js";
import { Menu } from "../menu/menu.jsx";
import type { IComponent } from "../types.js";
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
   *
   * `items` と `trigger` は項目ごとに指定するため、ここでは指定できません。
   */
  readonly menu?: Omit<Menu.Props, "items" | "trigger"> | undefined;
};

namespace MenubarProps {
  export type Menubar = {
    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: MenubarSlotProps | undefined;
  };

  export type Root<TItem = any> = Omit<MenubarRootProps<TItem>, keyof Menubar>;
}

/**
 * {@link Menubar} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type MenubarProps<TItem = any> = MenubarProps.Menubar & MenubarProps.Root<TItem>;

// API
// ---

/**
 * {@link Menubar} を構成する各パーツの props などを作成するための API です。
 *
 * @template TItem 項目の型です。
 */
export class MenubarAPI<TItem = any> {
  private readonly rootProps: MenubarProps.Root<TItem>;

  private readonly slotProps: MenubarSlotProps;

  /**
   * @param props {@link Menubar} の props です。
   * @internal
   */
  public constructor(props: MenubarProps<TItem>) {
    const { slotProps = {}, ...rootProps } = props;
    this.rootProps = rootProps;
    this.slotProps = slotProps;
  }

  private readonly defaultItemRenderer: IMenubarItemRenderer = (item, index) => {
    switch (true) {
      case isItemObject(item):
        return <Menu {...this.getMenuProps(item)} key={getItemKey(item) ?? index} />;

      default:
        return <React.Fragment key={getItemKey(item) ?? index}>{item}</React.Fragment>;
    }
  };

  /**
   * {@link Menu} に渡す props を取得します。
   */
  public getMenuProps(): Omit<Menu.Props, "items" | "trigger">;
  /**
   * {@link Menu} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getMenuProps(item: MenubarItemObject): Menu.Props<Menu.ItemObject>;
  public getMenuProps(
    item?: MenubarItemObject,
  ): Omit<Menu.Props, "items" | "trigger"> | Menu.Props<Menu.ItemObject> {
    const { menu: props = {} } = this.slotProps;

    if (!item) {
      return props;
    }

    return mergeProps([props, item]);
  }

  /**
   * {@link MenubarRoot} に渡す props を取得します。
   */
  public getRootProps(): MenubarRootProps<TItem> {
    const { children = this.defaultItemRenderer, ...otherProps } = this.rootProps;

    return {
      ...otherProps,
      children,
    };
  }
}

export interface IUseMenubarAPI {
  /**
   * {@link MenubarAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @param props {@link Menubar} の props です。
   * @returns メニューバーの API です。
   */
  <TItem = never>(props: MenubarProps<TItem>): MenubarAPI<TItem>;
}

/**
 * {@link MenubarAPI} を作成するフックです。
 */
export const useMenubarAPI: IUseMenubarAPI = function useSuiMenubarAPI(props) {
  return new MenubarAPI(props);
};

export { MenubarAPI as API, useMenubarAPI as useAPI };

// Component
// ---------

export interface IMenubar extends IComponent<MenubarProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = never>(props: MenubarProps<TItem>): IComponent.Return;
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

  export type IItemRenderer<TItem = any> = IMenubarItemRenderer<TItem>;

  export type ItemObject = MenubarItemObject;

  export type Orientation = MenubarOrientation;
}
