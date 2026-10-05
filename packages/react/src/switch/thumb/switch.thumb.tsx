import { Switch } from "@base-ui/react/switch";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type SwitchContext, useSwitchContext } from "../root/switch.root.context.js";

/**
 * {@link SwitchThumb} が持つ状態です。
 */
export type SwitchThumbState = Override<SwitchContext, Switch.Thumb.State>;

export namespace SwitchThumbProps {
  export type Render = RenderProps<SwitchThumbState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Switch.Thumb>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SwitchThumbProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Switch.Thumb>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SwitchThumb} に渡す props です。
 */
export type SwitchThumbProps = SwitchThumbProps.Render &
  SwitchThumbProps.SuruUI &
  SwitchThumbProps.BaseUI &
  SwitchThumbProps.HTML;

export type ISwitchThumb = IComponent<SwitchThumbProps>;

/**
 * スイッチのつまみコンポーネントです。
 *
 * オンとオフの状態を示し、選択状態に応じて移動します。
 */
export const SwitchThumb: ISwitchThumb = function SuiSwitchThumb(props) {
  const ctx = useSwitchContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Switch.Thumb
      {...otherProps}
      {...proxyRenderProps<Switch.Thumb.State, SwitchThumbState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<SwitchThumbState>(
            className,
            "sui_switch_thumb",
            (state) => `sui_switch_thumb-size_${state.size}`,
            (state) => `sui_switch_thumb-color_${state.color}`,
            (state) => `sui_switch_thumb-radius_${state.radius}`,
            (state) => `sui_switch_thumb-variant_${state.variant}`,
            (state) => state.outlined && "sui_switch_thumb-outlined",
            (state) => state.disabled && "sui_switch_thumb-disabled",
            (state) => state.readOnly && "sui_switch_thumb-readonly",
            (state) => state.required && "sui_switch_thumb-required",
            (state) => state.checked && "sui_switch_thumb-checked",
            (state) => state.touched && "sui_switch_thumb-touched",
            (state) => state.dirty && "sui_switch_thumb-dirty",
            (state) => state.filled && "sui_switch_thumb-filled",
            (state) => state.focused && "sui_switch_thumb-focused",
            (state) => state.valid === false && "sui_switch_thumb-invalid",
            (state) => state.valid === true && "sui_switch_thumb-valid",
            (state) => state.valid === null && "sui_switch_thumb-unverified",
          ),
        },
      )}
    />
  );
};

export { SwitchThumb as Thumb };

export namespace Thumb {
  export type State = SwitchThumbState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SwitchThumbProps.Render;

    export type SuruUI = SwitchThumbProps.SuruUI;

    export type BaseUI = SwitchThumbProps.BaseUI;

    export type HTML = SwitchThumbProps.HTML;
  }
}
