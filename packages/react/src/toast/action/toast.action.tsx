import { Toast } from "@base-ui/react/toast";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Button from "../../button/button.parts.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { ToastActionContext } from "./toast.action.context.js";

/** 通知のアクションの配色です。 */
export type ToastActionColor = Button.Root.Color;

/** 通知のアクションの角丸の大きさです。 */
export type ToastActionRadius = Button.Root.Radius;

/** 通知のアクションの大きさです。 */
export type ToastActionSize = Button.Root.Size;

/** 通知のアクションの主な外観です。 */
export type ToastActionVariant = Button.Root.Variant;

/**
 * {@link ToastAction} が持つ状態です。
 */
export type ToastActionState = ToastActionContext;

export namespace ToastActionProps {
  export type Render = RenderProps<ToastActionState>;

  export type SuruUI = Omit<Button.Root.Props.SuruUI, "item" | "pending">;

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Omit<
      Pick<
        React.ComponentProps<typeof Toast.Action>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // ToastActionProps より :
        never
      >,
      keyof Render | keyof SuruUI
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

export type IToastAction = IComponent<ToastActionProps>;

/** 通知に設定されたアクションを実行するボタン要素です。 */
export const ToastAction: IToastAction = (props) => {
  const {
    size,
    thin,
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
          thin,
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
              proxyRenderProps<Button.Root.State, ToastActionState>(
                (buttonState) => ({
                  ...toastState,
                  ...buttonState,
                }),
                {
                  style,
                  render: (currentHtmlProps, state) => (
                    <ToastActionContext value={state}>
                      <RenderElement
                        state={state}
                        render={render}
                        htmlProps={currentHtmlProps}
                        defaultTagName="button"
                      />
                    </ToastActionContext>
                  ),
                  className: cn<ToastActionState>(
                    className,
                    "sui_toast_action",
                    (state) => `sui_toast_action-size_${state.size}`,
                    (state) => `sui_toast_action-color_${state.color}`,
                    (state) => `sui_toast_action-radius_${state.radius}`,
                    (state) => `sui_toast_action-variant_${state.variant}`,
                    (state) => state.item && "sui_toast_action-item",
                    (state) => state.muted && "sui_toast_action-muted",
                    (state) => state.outlined && "sui_toast_action-outlined",
                    (state) => state.pending && "sui_toast_action-pending",
                    (state) => state.squared && "sui_toast_action-squared",
                    (state) => state.disabled && !state.pending && "sui_toast_action-disabled",
                    (state) => state.type !== undefined && `sui_toast_action-type_${state.type}`,
                  ),
                },
              ),
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
