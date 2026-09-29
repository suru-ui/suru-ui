import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ContextMenuRadioItemIndicator} が持つ状態です。
 */
export type ContextMenuRadioItemIndicatorState = ContextMenu.RadioItemIndicator.State;

export namespace ContextMenuRadioItemIndicatorProps {
  export type Render = RenderProps<ContextMenuRadioItemIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.RadioItemIndicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuRadioItemIndicatorProps:
      "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.RadioItemIndicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuRadioItemIndicator} に渡す props です。
 */
export type ContextMenuRadioItemIndicatorProps = ContextMenuRadioItemIndicatorProps.Render &
  ContextMenuRadioItemIndicatorProps.SuruUI &
  ContextMenuRadioItemIndicatorProps.BaseUI &
  ContextMenuRadioItemIndicatorProps.HTML;

export type IContextMenuRadioItemIndicator = IComponent<ContextMenuRadioItemIndicatorProps>;

/**
 * 選択されたラジオ項目を示す要素です。
 */
export const ContextMenuRadioItemIndicator: IContextMenuRadioItemIndicator =
  function SuiContextMenuRadioItemIndicator(props) {
    const { className, keepMounted = true, ...otherProps } = props;

    return (
      <ContextMenu.RadioItemIndicator
        {...otherProps}
        className={cn(
          className,
          "sui_context_menu_item_indicator",
          "sui_context_menu_radio_item_indicator",
          (state) => !state.checked && "sui_context_menu_item_indicator-unchecked",
        )}
        keepMounted={keepMounted}
      />
    );
  };

export { ContextMenuRadioItemIndicator as RadioItemIndicator };

export namespace RadioItemIndicator {
  export type State = ContextMenuRadioItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuRadioItemIndicatorProps.Render;

    export type SuruUI = ContextMenuRadioItemIndicatorProps.SuruUI;

    export type BaseUI = ContextMenuRadioItemIndicatorProps.BaseUI;

    export type HTML = ContextMenuRadioItemIndicatorProps.HTML;
  }
}
