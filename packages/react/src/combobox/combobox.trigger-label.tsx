import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxTriggerLabel} が持つ状態です。
 */
export type ComboboxTriggerLabelState = Combobox.Label.State;

export namespace ComboboxTriggerLabelProps {
  export type Render = RenderProps<ComboboxTriggerLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Label>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxTriggerLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Label>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxTriggerLabel} に渡す props です。
 */
export type ComboboxTriggerLabelProps = ComboboxTriggerLabelProps.Render &
  ComboboxTriggerLabelProps.SuruUI &
  ComboboxTriggerLabelProps.BaseUI &
  ComboboxTriggerLabelProps.HTML;

export type IComboboxTriggerLabel = IComponent<ComboboxTriggerLabelProps>;

/**
 * トリガーに対応する表示ラベルです。
 */
export const ComboboxTriggerLabel: IComboboxTriggerLabel = function SuiComboboxTriggerLabel(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Label {...otherProps} className={cn(className, "sui_combobox_trigger_label")} />;
};

export { ComboboxTriggerLabel as TriggerLabel };

export namespace TriggerLabel {
  export type State = ComboboxTriggerLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxTriggerLabelProps.Render;

    export type SuruUI = ComboboxTriggerLabelProps.SuruUI;

    export type BaseUI = ComboboxTriggerLabelProps.BaseUI;

    export type HTML = ComboboxTriggerLabelProps.HTML;
  }
}
