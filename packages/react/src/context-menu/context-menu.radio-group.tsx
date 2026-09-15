import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ContextMenuRadioGroup} の選択状態を変更されるイベントの詳細です。
 */
export type ContextMenuRadioGroupChangeEventDetails = ContextMenu.RadioGroup.ChangeEventDetails;

/**
 * {@link ContextMenuRadioGroup} の選択状態が変更される理由です。
 */
export type ContextMenuRadioGroupChangeEventReason = ContextMenu.RadioGroup.ChangeEventReason;

/**
 * {@link ContextMenuRadioGroup} が持つ状態です。
 */
export type ContextMenuRadioGroupState = ContextMenu.RadioGroup.State;

export namespace ContextMenuRadioGroupProps {
  export type Render = RenderProps<ContextMenuRadioGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.RadioGroup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuRadioGroupProps:
      "value" | "defaultValue" | "onValueChange" | "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.RadioGroup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuRadioGroup} に渡す props です。
 */
export type ContextMenuRadioGroupProps = ContextMenuRadioGroupProps.Render &
  ContextMenuRadioGroupProps.SuruUI &
  ContextMenuRadioGroupProps.BaseUI &
  ContextMenuRadioGroupProps.HTML;

/**
 * ラジオ項目をまとめるグループ要素です。
 */
export const ContextMenuRadioGroup: IComponent<ContextMenuRadioGroupProps> =
  function SuiContextMenuRadioGroup(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.RadioGroup
        {...otherProps}
        className={cn(
          className,
          "sui_context_menu_radio_group",
          (state) => state.disabled && "sui_context_menu_radio_group-disabled",
        )}
      />
    );
  };

export { ContextMenuRadioGroup as RadioGroup };

export namespace RadioGroup {
  export type State = ContextMenuRadioGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuRadioGroupProps.Render;

    export type SuruUI = ContextMenuRadioGroupProps.SuruUI;

    export type BaseUI = ContextMenuRadioGroupProps.BaseUI;

    export type HTML = ContextMenuRadioGroupProps.HTML;
  }

  export type ChangeEventDetails = ContextMenuRadioGroupChangeEventDetails;

  export type ChangeEventReason = ContextMenuRadioGroupChangeEventReason;
}
