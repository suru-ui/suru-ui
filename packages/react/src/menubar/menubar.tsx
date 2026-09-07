import * as React from "react";

import type { LikelyVisibleNode } from "../_is-likely-visible-node.js";
import toReactNode from "../_to-react-node.js";
import { Button } from "../button/button.jsx";
import { type MenuProps, Menu } from "../menu/menu.jsx";
import type { IComponent } from "../types.js";
import {
  type MenubarRootProps,
  type MenubarRootState,
  type MenubarRootItemObject,
  type MenubarRootOrientation,
  type IMenubarRootItemRenderer,
  MenubarRoot,
} from "./menubar.parts.jsx";

// Types
// -----

/**
 * {@link MenubarRootItemObject}
 */
export type MenubarItemObject = MenubarRootItemObject;

/**
 * {@link IMenubarRootItemRenderer}
 */
export interface IMenubarItemRenderer<TItem = any> extends IMenubarRootItemRenderer<TItem> {}

/**
 * {@link MenubarRootOrientation}
 */
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
   * `children` と `trigger` は項目から決まるため指定できません。
   */
  readonly menu?: Omit<MenuProps, "children" | "trigger"> | undefined;
};

/**
 * {@link Menubar} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type MenubarProps<TItem = any> = MenubarRootProps<TItem> & {
  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   *
   * 各パーツの props が優先されます。
   */
  slotProps?: MenubarSlotProps | undefined;
};

// API
// ---

/**
 * {@link Menubar} を構成する各パーツの props などを作成するための API です。
 *
 * @template TItem 項目の型です。
 */
export interface MenubarAPI<TItem = any> {
  /**
   * 項目のラベルを取得します。
   *
   * @param item 項目です。
   */
  getLabel(item: TItem): React.ReactNode;

  /**
   * {@link Menu} に渡す props を取得します。
   *
   * @param item 項目です。
   * @param index 項目のインデックスです。
   */
  getMenuProps(item: TItem, index: number): MenuProps;

  /**
   * {@link MenubarRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<MenubarRootProps, "children"> & {
    children: LikelyVisibleNode | null;
  };
}

interface IUseMenubarAPI {
  /**
   * {@link MenubarAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @param props {@link Menubar} の props です。
   * @returns メニューバーの API です
   */
  <TItem = any>(props: MenubarProps<TItem>): MenubarAPI<TItem>;
}

/**
 * {@link MenubarAPI} を作成するフックです。
 */
export const useMenubarAPI: IUseMenubarAPI = function useSuiMenubarAPI(props) {
  const {
    items = [],
    children,
    slotProps: { menu: menuProps = {} } = {},
    ...otherRootProps
  } = props;

  return {
    getLabel(item) {
      return isItemObject(item) ? toReactNode(item.label) : null;
    },
    getMenuProps(item, _index) {
      if (!isItemObject(item)) {
        return {
          ...menuProps,
          children: toReactNode(item),
        };
      }

      const { label, children: popupChildren, trigger, ...otherItemProps } = item;

      return {
        ...otherItemProps,
        ...menuProps,
        trigger: trigger ?? <Button variant="naked">{toReactNode(label)}</Button>,
        children: toReactNode(popupChildren),
      };
    },
    getRootProps() {
      return {
        ...otherRootProps,
        items,
        children: typeof children === "function" ? items.map(children) : toReactNode(children),
      };
    },
  };
};

function isItemObject(item: unknown): item is MenubarItemObject {
  return typeof item === "object" && item !== null && "label" in item;
}

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
 *
 * {@link MenubarProps.items|items} に指定した順にメニューを並べます。
 * メニュー項目の構成を細かく制御する場合は、{@link MenubarRoot|Root} と {@link Menu} を直接組み立てます。
 */
export const Menubar: IMenubar = function SuiMenubar(props: MenubarProps) {
  const api = useMenubarAPI(props);
  const { children, ...otherRootProps } = api.getRootProps();

  return (
    <MenubarRoot {...otherRootProps}>
      {children ?? ((item, index) => <Menu key={index} {...api.getMenuProps(item, index)} />)}
    </MenubarRoot>
  );
};

export namespace Menubar {
  /**
   * {@link MenubarState}
   */
  export type State = MenubarState;

  /**
   * {@link MenubarProps}
   */
  export type Props<TItem = any> = MenubarProps<TItem>;

  /**
   * {@link MenubarSlotProps}
   */
  export type SlotProps = MenubarSlotProps;

  /**
   * {@link MenubarItemObject}
   */
  export type ItemObject = MenubarItemObject;

  /**
   * {@link IMenubarItemRenderer}
   */
  export interface IItemRenderer<TItem = any> extends IMenubarItemRenderer<TItem> {}

  /**
   * {@link MenubarOrientation}
   */
  export type Orientation = MenubarOrientation;
}
