import { Combobox } from "@base-ui/react/combobox";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type ComboboxContext, useComboboxContext } from "../root/combobox.root.context.js";
import { ComboboxTriggerContext } from "./combobox.trigger.context.js";

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
          render: (htmlProps, state) => (
            <ComboboxTriggerContext value={state}>
              <RenderElement
                state={state}
                render={children}
                htmlProps={htmlProps}
                defaultTagName="button"
              />
            </ComboboxTriggerContext>
          ),
          className: cn<ComboboxTriggerState>(
            className,
            "sui_combobox_trigger",
            (state) => `sui_combobox_trigger-size_${state.size}`,
            (state) => `sui_combobox_trigger-color_${state.color}`,
            (state) => `sui_combobox_trigger-radius_${state.radius}`,
            (state) => `sui_combobox_trigger-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_trigger-outlined",
            (state) => state.multiple && "sui_combobox_trigger-multiple",
            (state) => state.disabled && "sui_combobox_trigger-disabled",
            (state) => state.open && "sui_combobox_trigger-open",
            (state) => state.placeholder && "sui_combobox_trigger-placeholder",
            (state) => state.listEmpty && "sui_combobox_trigger-listempty",
            (state) => state.touched && "sui_combobox_trigger-touched",
            (state) => state.dirty && "sui_combobox_trigger-dirty",
            (state) => state.filled && "sui_combobox_trigger-filled",
            (state) => state.focused && "sui_combobox_trigger-focused",
            (state) => state.valid === false && "sui_combobox_trigger-invalid",
            (state) => state.valid === true && "sui_combobox_trigger-valid",
            (state) => state.valid === null && "sui_combobox_trigger-unverified",
            (state) =>
              state.popupSide !== null &&
              `sui_combobox_trigger-popupside_${state.popupSide.replaceAll("-", "_")}`,
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
