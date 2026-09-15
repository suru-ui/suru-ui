import { Toast } from "@base-ui/react/toast";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import type { Override, IComponent } from "../types.js";

export type ToastActionColor = Button.Root.Color;

export type ToastActionRadius = Button.Root.Radius;

export type ToastActionSize = Button.Root.Size;

export type ToastActionVariant = Button.Root.Variant;

/**
 * {@link ToastAction} が持つ状態です。
 */
export type ToastActionState = Override<Button.Root.State, Toast.Action.State>;

export namespace ToastActionProps {
  export type Render = RenderProps<ToastActionState>;

  export type SuruUI = Omit<Button.Root.Props.SuruUI, "item" | "pending">;

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Toast.Action>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // ToastActionProps:
        never,
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Toast.Action>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ToastAction} に渡す props です。
 */
export type ToastActionProps = ToastActionProps.Render &
  ToastActionProps.SuruUI &
  ToastActionProps.BaseUI &
  ToastActionProps.HTML;

/**
 * 通知に設定されたアクションを実行するボタン要素です。
 */
export const ToastAction: IComponent<ToastActionProps> = function SuiToastAction(props) {
  const {
    size,
    color = "grey",
    muted,
    style,
    radius,
    render,
    squared,
    variant = "naked",
    outlined,
    className,
    nativeButton,
    focusableWhenDisabled,
    ...otherProps
  } = props;
  const baseuiProps: Required<ToastActionProps.BaseUI> = {
    nativeButton,
    focusableWhenDisabled,
  };

  return (
    <Toast.Action
      {...otherProps}
      {...baseuiProps}
      render={(htmlProps: {}, toastState) => {
        const buttonRootProps: Required<Button.Root.Props.SuruUI & Button.Root.Props.BaseUI> = {
          item: false,
          size,
          color,
          muted,
          radius,
          pending: false,
          squared,
          variant,
          outlined,
          nativeButton,
          focusableWhenDisabled,
        };

        return (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              buttonRootProps,
              proxyRenderProps(toastState, {
                style,
                render,
                className,
              }),
            ])}
          />
        );
      }}
    />
  );
};

export { ToastAction as Action };

export namespace Action {
  export type State = ToastActionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastActionProps.Render;

    export type SuruUI = ToastActionProps.SuruUI;

    export type BaseUI = ToastActionProps.BaseUI;

    export type HTML = ToastActionProps.HTML;
  }

  export type Color = ToastActionColor;

  export type Radius = ToastActionRadius;

  export type Size = ToastActionSize;

  export type Variant = ToastActionVariant;
}
