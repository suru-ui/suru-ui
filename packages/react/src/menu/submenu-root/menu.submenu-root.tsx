import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import type { Override, IComponent } from "../../types.js";
import { MenuContext, useMenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuSubmenuRoot} の開閉状態を変更されるイベントの詳細です。
 */
export type MenuSubmenuRootChangeEventDetails = Menu.SubmenuRoot.ChangeEventDetails;

/**
 * {@link MenuSubmenuRoot} の開閉状態が変更される理由です。
 */
export type MenuSubmenuRootChangeEventReason = Menu.SubmenuRoot.ChangeEventReason;

/**
 * {@link MenuSubmenuRoot} が持つ状態です。
 */
export type MenuSubmenuRootState = Override<MenuContext, Menu.SubmenuRoot.State>;

export namespace MenuSubmenuRootProps {
  export type Render = {};

  export type SuruUI<TItem = any> = {
    /**
     * サブメニューに表示する項目の一覧です。
     *
     * 省略時は親の項目を引き継ぎます。
     */
    items?: readonly TItem[] | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.SubmenuRoot>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuSubmenuRootProps:
      | "defaultOpen"
      | "loopFocus"
      | "highlightItemOnHover"
      // | "modal"
      // | "onOpenChange"
      | "onOpenChangeComplete"
      | "open"
      | "orientation"
      | "disabled"
      | "closeParentOnEsc"
      | "actionsRef"
      // | "triggerId"
      // | "defaultTriggerId"
      // | "handle"
      // | "children"

      // MenuSubmenuRootProps:
      | "onOpenChange"
      | "closeParentOnEsc"
      | "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.SubmenuRoot>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuSubmenuRoot} に渡す props です。
 */
export type MenuSubmenuRootProps<TItem = any> = MenuSubmenuRootProps.Render &
  MenuSubmenuRootProps.SuruUI<TItem> &
  MenuSubmenuRootProps.BaseUI &
  MenuSubmenuRootProps.HTML;

export interface IMenuSubmenuRoot extends IComponent<MenuSubmenuRootProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: MenuSubmenuRootProps<TItem>): IComponent.Return;
}

/**
 * サブメニューのルートです。
 *
 * それ自身は HTML 要素をレンダリングしません。
 */
export const MenuSubmenuRoot: IMenuSubmenuRoot = function SuiMenuSubmenuRoot(
  props: MenuSubmenuRootProps,
) {
  const parentCtx = useMenuContext();
  const { items = parentCtx.items, ...otherProps } = props;
  const ctx = React.useMemo<MenuContext>(
    () => ({
      ...parentCtx,
      depth: parentCtx.depth + 1,
      items,
    }),
    [items, parentCtx],
  );

  return (
    <MenuContext value={ctx}>
      <Menu.SubmenuRoot {...otherProps} />
    </MenuContext>
  );
};

export { MenuSubmenuRoot as SubmenuRoot };

export namespace SubmenuRoot {
  export type State = MenuSubmenuRootState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuSubmenuRootProps.Render;

    export type SuruUI<TItem = any> = MenuSubmenuRootProps.SuruUI<TItem>;

    export type BaseUI = MenuSubmenuRootProps.BaseUI;

    export type HTML = MenuSubmenuRootProps.HTML;
  }

  export type ChangeEventDetails = MenuSubmenuRootChangeEventDetails;

  export type ChangeEventReason = MenuSubmenuRootChangeEventReason;
}
