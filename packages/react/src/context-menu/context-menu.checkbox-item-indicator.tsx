import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ContextMenuCheckboxItemIndicator} が持つ状態です。
 */
export type ContextMenuCheckboxItemIndicatorState = ContextMenu.CheckboxItemIndicator.State;

export namespace ContextMenuCheckboxItemIndicatorProps {
  export type Render = RenderProps<ContextMenuCheckboxItemIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.CheckboxItemIndicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuCheckboxItemIndicatorProps:
      "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.CheckboxItemIndicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuCheckboxItemIndicator} に渡す props です。
 */
export type ContextMenuCheckboxItemIndicatorProps = ContextMenuCheckboxItemIndicatorProps.Render &
  ContextMenuCheckboxItemIndicatorProps.SuruUI &
  ContextMenuCheckboxItemIndicatorProps.BaseUI &
  ContextMenuCheckboxItemIndicatorProps.HTML;

/**
 * チェックされた項目を示す要素です。
 */
export const ContextMenuCheckboxItemIndicator: IComponent<ContextMenuCheckboxItemIndicatorProps> =
  function SuiContextMenuCheckboxItemIndicator(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.CheckboxItemIndicator
        {...otherProps}
        className={cn(
          className,
          "sui_context_menu_item_indicator",
          "sui_context_menu_checkbox_item_indicator",
          (state) => !state.checked && "sui_context_menu_item_indicator-unchecked",
        )}
      />
    );
  };

export { ContextMenuCheckboxItemIndicator as CheckboxItemIndicator };

export namespace CheckboxItemIndicator {
  export type State = ContextMenuCheckboxItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuCheckboxItemIndicatorProps.Render;

    export type SuruUI = ContextMenuCheckboxItemIndicatorProps.SuruUI;

    export type BaseUI = ContextMenuCheckboxItemIndicatorProps.BaseUI;

    export type HTML = ContextMenuCheckboxItemIndicatorProps.HTML;
  }
}
