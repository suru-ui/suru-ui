import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import type { Override, IComponent } from "../../types.js";
import { ContextMenuContext, useContextMenuContext } from "../root/context-menu.root.context.js";

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
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuSubmenuRootState<TItem = any> = Override<
  ContextMenuContext<TItem>,
  ContextMenu.SubmenuRoot.State
>;

export namespace ContextMenuSubmenuRootProps {
  export type Render = {};

  export type SuruUI<TItem = any> = {
    /**
     * サブメニューに表示する項目の一覧です。
     *
     * 省略時は親の項目を引き継ぎます。
     */
    items?: readonly TItem[] | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof ContextMenu.SubmenuRoot>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。

      // MenuSubmenuRootProps より:
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

      // MenuSubmenuRootProps より:
      | "onOpenChange"
      | "closeParentOnEsc"
      | "children"
    >,
    keyof Render | keyof SuruUI
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

export interface IContextMenuSubmenuRoot extends IComponent<ContextMenuSubmenuRootProps> {
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
  const ctx = React.useMemo<ContextMenuContext>(
    () => ({
      ...parentCtx,
      depth: parentCtx.depth + 1,
      items,
    }),
    [items, parentCtx],
  );

  return (
    <ContextMenuContext value={ctx}>
      <ContextMenu.SubmenuRoot {...otherProps} />
    </ContextMenuContext>
  );
};

export { ContextMenuSubmenuRoot as SubmenuRoot };

export namespace SubmenuRoot {
  export type State<TItem = any> = ContextMenuSubmenuRootState<TItem>;

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
