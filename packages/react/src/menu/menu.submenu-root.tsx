import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

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
export type MenuSubmenuRootState = Menu.SubmenuRoot.State;

export namespace MenuSubmenuRootProps {
  export type Render = RenderProps<MenuSubmenuRootState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.SubmenuRoot>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuSubmenuRootProps:
      | "defaultOpen"
      | "loopFocus"
      | "highlightItemOnHover"
      | "onOpenChangeComplete"
      | "open"
      | "orientation"
      | "disabled"
      | "closeParentOnEsc"
      | "actionsRef"
      | "onOpenChange",
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
export type MenuSubmenuRootProps = MenuSubmenuRootProps.Render &
  MenuSubmenuRootProps.SuruUI &
  MenuSubmenuRootProps.BaseUI &
  MenuSubmenuRootProps.HTML;

/**
 * サブメニューのルートです。
 *
 * それ自身は HTML 要素をレンダリングしません。
 */
export const MenuSubmenuRoot: IComponent<MenuSubmenuRootProps> = function SuiMenuSubmenuRoot(
  props,
) {
  return <Menu.SubmenuRoot {...props} />;
};

export { MenuSubmenuRoot as SubmenuRoot };

export namespace SubmenuRoot {
  export type State = MenuSubmenuRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuSubmenuRootProps.Render;

    export type SuruUI = MenuSubmenuRootProps.SuruUI;

    export type BaseUI = MenuSubmenuRootProps.BaseUI;

    export type HTML = MenuSubmenuRootProps.HTML;
  }

  export type ChangeEventDetails = MenuSubmenuRootChangeEventDetails;

  export type ChangeEventReason = MenuSubmenuRootChangeEventReason;
}
