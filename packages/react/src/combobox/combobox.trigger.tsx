import { Combobox } from "@base-ui/react/combobox";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxTrigger} が持つ状態です。
 */
export type ComboboxTriggerState = Combobox.Trigger.State;

export namespace ComboboxTriggerProps {
  export type Render = RenderProps<ComboboxTriggerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Trigger>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // ComboboxTriggerProps:
      | "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Trigger>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxTrigger} に渡す props です。
 */
export type ComboboxTriggerProps = ComboboxTriggerProps.Render &
  ComboboxTriggerProps.SuruUI &
  ComboboxTriggerProps.BaseUI &
  ComboboxTriggerProps.HTML;

/**
 * 候補リストを開閉するボタン要素です。
 */
export const ComboboxTrigger: IComponent<ComboboxTriggerProps> = function SuiComboboxTrigger(
  props,
) {
  const { className, "aria-label": ariaLabel = "候補リストを開閉", ...otherProps } = props;

  return (
    <Combobox.Trigger
      {...otherProps}
      className={cn(className, "sui_combobox_trigger")}
      aria-label={ariaLabel}
    />
  );
};

export { ComboboxTrigger as Trigger };

export namespace Trigger {
  export type State = ComboboxTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxTriggerProps.Render;

    export type SuruUI = ComboboxTriggerProps.SuruUI;

    export type BaseUI = ComboboxTriggerProps.BaseUI;

    export type HTML = ComboboxTriggerProps.HTML;
  }
}
