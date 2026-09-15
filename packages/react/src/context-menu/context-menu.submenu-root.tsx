import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link ContextMenuSubmenuRoot} の開閉状態を変更されるイベントの詳細です。
 */
export type ContextMenuSubmenuRootChangeEventDetails = ContextMenu.SubmenuRoot.ChangeEventDetails;

/**
 * {@link ContextMenuSubmenuRoot} の開閉状態が変更される理由です。
 */
export type ContextMenuSubmenuRootChangeEventReason = ContextMenu.SubmenuRoot.ChangeEventReason;

/**
 * {@link ContextMenuSubmenuRoot} が持つ状態です。
 */
export type ContextMenuSubmenuRootState = ContextMenu.SubmenuRoot.State;

export namespace ContextMenuSubmenuRootProps {
  export type Render = RenderProps<ContextMenuSubmenuRootState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.SubmenuRoot>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuSubmenuRootProps:
      | "open"
      | "defaultOpen"
      | "disabled"
      | "loopFocus"
      | "highlightItemOnHover"
      | "orientation"
      | "closeParentOnEsc"
      | "actionsRef"
      | "onOpenChange"
      | "onOpenChangeComplete",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.SubmenuRoot>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuSubmenuRoot} に渡す props です。
 */
export type ContextMenuSubmenuRootProps = ContextMenuSubmenuRootProps.Render &
  ContextMenuSubmenuRootProps.SuruUI &
  ContextMenuSubmenuRootProps.BaseUI &
  ContextMenuSubmenuRootProps.HTML;

/**
 * サブメニューのルートです。
 *
 * それ自身は HTML 要素をレンダリングしません。
 */
export const ContextMenuSubmenuRoot: IComponent<ContextMenuSubmenuRootProps> =
  function SuiContextMenuSubmenuRoot(props) {
    return <ContextMenu.SubmenuRoot {...props} />;
  };

export { ContextMenuSubmenuRoot as SubmenuRoot };

export namespace SubmenuRoot {
  export type State = ContextMenuSubmenuRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuSubmenuRootProps.Render;

    export type SuruUI = ContextMenuSubmenuRootProps.SuruUI;

    export type BaseUI = ContextMenuSubmenuRootProps.BaseUI;

    export type HTML = ContextMenuSubmenuRootProps.HTML;
  }

  export type ChangeEventDetails = ContextMenuSubmenuRootChangeEventDetails;

  export type ChangeEventReason = ContextMenuSubmenuRootChangeEventReason;
}
