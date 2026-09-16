import { ContextMenu } from "@base-ui/react/context-menu";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ContextMenuTrigger} が持つ状態です。
 */
export type ContextMenuTriggerState = ContextMenu.Trigger.State;

export namespace ContextMenuTriggerProps {
  export type Render = RenderProps<ContextMenuTriggerState>;

  export type SuruUI = {
    /**
     * トリガーとしてレンダリングする要素です。
     *
     * {@link ContextMenu.Trigger} の `render` props と同じ型で、そのまま `render` に渡されます。
     */
    children: NonNullable<ContextMenu.Trigger.Props["render"]>;
  };

  export type BaseUI = Pick<
    ContextMenu.Trigger.Props,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuTriggerProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<ContextMenu.Trigger.Props, keyof Render | keyof SuruUI | keyof BaseUI>;
}

/**
 * {@link ContextMenuTrigger} に渡す props です。
 */
export type ContextMenuTriggerProps = ContextMenuTriggerProps.Render &
  ContextMenuTriggerProps.SuruUI &
  ContextMenuTriggerProps.BaseUI &
  ContextMenuTriggerProps.HTML;

/**
 * 右クリックまたは長押しでコンテキストメニューを開く対象です。
 *
 * 子要素は追加のラッパーなしで `div` 要素に表示されます。
 */
export const ContextMenuTrigger: IComponent<ContextMenuTriggerProps> =
  function SuiContextMenuTrigger(props) {
    const { children, className, ...otherProps } = props;

    return (
      <ContextMenu.Trigger
        {...otherProps}
        render={children}
        className={cn(
          className,
          "sui_context_menu_trigger",
          (state) => state.open && "sui_context_menu_trigger-open",
        )}
      />
    );
  };

export { ContextMenuTrigger as Trigger };

export namespace Trigger {
  export type State = ContextMenuTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuTriggerProps.Render;

    export type SuruUI = ContextMenuTriggerProps.SuruUI;

    export type BaseUI = ContextMenuTriggerProps.BaseUI;

    export type HTML = ContextMenuTriggerProps.HTML;
  }
}
