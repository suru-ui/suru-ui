import { Combobox } from "@base-ui/react/combobox";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type ComboboxContext, useComboboxContext } from "./combobox.context.js";

/**
 * {@link ComboboxTrigger} の状態です。
 */
export type ComboboxTriggerState = Override<ComboboxContext, Combobox.Trigger.State>;

export namespace ComboboxTriggerProps {
  export type Render = Omit<RenderProps<ComboboxTriggerState>, "render">;

  export type SuruUI = {
    children: NonNullable<RenderProps<ComboboxTriggerState>["render"]>;
  };

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

export type IComboboxTrigger = IComponent<ComboboxTriggerProps>;

/**
 * 候補リストを開閉するボタン要素です。
 */
export const ComboboxTrigger: IComboboxTrigger = function SuiComboboxTrigger(props) {
  const ctx = useComboboxContext();
  const {
    style,
    children,
    className,
    nativeButton = false,
    "aria-label": ariaLabel = "候補リストを開閉",
    ...otherProps
  } = props;

  return (
    <Combobox.Trigger
      {...otherProps}
      {...proxyRenderProps<Combobox.Trigger.State, ComboboxTriggerState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: children,
          className: cn<ComboboxTriggerState>(
            className,
            "sui_combobox_trigger",
            (state) => `sui_combobox_trigger-size_${state.size}`,
            (state) => `sui_combobox_trigger-color_${state.color}`,
            (state) => `sui_combobox_trigger-radius_${state.radius}`,
            (state) => `sui_combobox_trigger-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_trigger-outlined",
            (state) => state.multiple && "sui_combobox_trigger-multiple",
          ),
        },
      )}
      nativeButton={nativeButton}
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
