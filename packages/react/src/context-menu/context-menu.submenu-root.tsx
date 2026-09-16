import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import type { IComponent } from "../types.js";
import { ContextMenuContext, useContextMenuContext } from "./context-menu.context.js";

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
  export type Render = {};

  export type SuruUI<TItem = any> = {
    /**
     * コンテキストメニューの項目です。
     */
    items?: readonly TItem[] | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.SubmenuRoot>,
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
    React.ComponentProps<typeof ContextMenu.SubmenuRoot>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuSubmenuRoot} に渡す props です。
 */
export type ContextMenuSubmenuRootProps<TItem = any> = ContextMenuSubmenuRootProps.Render &
  ContextMenuSubmenuRootProps.SuruUI<TItem> &
  ContextMenuSubmenuRootProps.BaseUI &
  ContextMenuSubmenuRootProps.HTML;

interface IContextMenuSubmenuRoot extends IComponent<ContextMenuSubmenuRootProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: ContextMenuSubmenuRootProps<TItem>): IComponent.Return;
}

/**
 * サブメニューのルートです。
 *
 * それ自身は HTML 要素をレンダリングしません。
 */
export const ContextMenuSubmenuRoot: IContextMenuSubmenuRoot = function SuiContextMenuSubmenuRoot(
  props: ContextMenuSubmenuRootProps,
) {
  const parentCtx = useContextMenuContext();
  const { items = parentCtx.items, ...otherProps } = props;
  const ctx = React.useMemo<ContextMenuContext>(() => {
    if (Object.is(items, parentCtx.items)) {
      return parentCtx;
    }

    return {
      ...parentCtx,
      depth: parentCtx.depth + 1,
      items,
    };
  }, [items, parentCtx]);

  return (
    <ContextMenuContext value={ctx}>
      <ContextMenu.SubmenuRoot {...otherProps} />
    </ContextMenuContext>
  );
};

export { ContextMenuSubmenuRoot as SubmenuRoot };

export namespace SubmenuRoot {
  export type State = ContextMenuSubmenuRootState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuSubmenuRootProps.Render;

    export type SuruUI<TItem = any> = ContextMenuSubmenuRootProps.SuruUI<TItem>;

    export type BaseUI = ContextMenuSubmenuRootProps.BaseUI;

    export type HTML = ContextMenuSubmenuRootProps.HTML;
  }

  export type ChangeEventDetails = ContextMenuSubmenuRootChangeEventDetails;

  export type ChangeEventReason = ContextMenuSubmenuRootChangeEventReason;
}
