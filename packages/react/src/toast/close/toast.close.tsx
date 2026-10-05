import { Toast } from "@base-ui/react/toast";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import * as Button from "../../button/button.parts.js";
import type { Override, IComponent } from "../../types.js";

/**
 * 通知を閉じるボタンの配色です。
 */
export type ToastCloseColor = Button.Root.Color;

/**
 * 通知を閉じるボタンの角丸の大きさです。
 */
export type ToastCloseRadius = Button.Root.Radius;

/**
 * 通知を閉じるボタンの大きさです。
 */
export type ToastCloseSize = Button.Root.Size;

/**
 * 通知を閉じるボタンの主な外観です。
 */
export type ToastCloseVariant = Button.Root.Variant;

/**
 * {@link ToastClose} が持つ状態です。
 */
export type ToastCloseState = Override<Button.Root.State, Toast.Close.State>;

export namespace ToastCloseProps {
  export type Render = RenderProps<ToastCloseState>;

  export type SuruUI = Omit<Button.Root.Props.SuruUI, "item" | "pending">;

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Toast.Close>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // ToastCloseProps:
        never,
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Toast.Close>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ToastClose} に渡す props です。
 */
export type ToastCloseProps = ToastCloseProps.Render &
  ToastCloseProps.SuruUI &
  ToastCloseProps.BaseUI &
  ToastCloseProps.HTML;

export type IToastClose = IComponent<ToastCloseProps>;

/**
 * 通知を閉じるボタン要素です。
 */
export const ToastClose: IToastClose = function SuiToastClose(props) {
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
  const baseuiProps: Required<ToastCloseProps.BaseUI> = {
    nativeButton,
    focusableWhenDisabled,
  };

  return (
    <Toast.Close
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

export { ToastClose as Close };

export namespace Close {
  export type State = ToastCloseState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastCloseProps.Render;

    export type SuruUI = ToastCloseProps.SuruUI;

    export type BaseUI = ToastCloseProps.BaseUI;

    export type HTML = ToastCloseProps.HTML;
  }

  export type Color = ToastCloseColor;

  export type Radius = ToastCloseRadius;

  export type Size = ToastCloseSize;

  export type Variant = ToastCloseVariant;
}
