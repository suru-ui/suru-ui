import { Toast } from "@base-ui/react/toast";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Alert from "../../alert/alert.parts.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { ToastContentContext } from "./toast.content.context.js";

/**
 * 通知の配色です。
 */
export type ToastContentColor = Alert.Root.Color;

/**
 * 通知の角丸の大きさです。
 */
export type ToastContentRadius = Alert.Root.Radius;

/**
 * 通知の大きさです。
 */
export type ToastContentSize = Alert.Root.Size;

/**
 * 通知の主な外観です。
 */
export type ToastContentVariant = Alert.Root.Variant;

/**
 * {@link ToastContent} が持つ状態です。
 */
export type ToastContentState = ToastContentContext;

export namespace ToastContentProps {
  export type Render = RenderProps<ToastContentState>;

  export type SuruUI = Alert.Root.Props.SuruUI;

  export type BaseUI = Override<
    Alert.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Toast.Content>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // ToastContentProps:
        never,
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Toast.Content>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ToastContent} に渡す props です。
 */
export type ToastContentProps = ToastContentProps.Render &
  ToastContentProps.SuruUI &
  ToastContentProps.BaseUI &
  ToastContentProps.HTML;

export type IToastContent = IComponent<ToastContentProps>;

/**
 * 通知の内容をまとめるコンテナー要素です。
 *
 * 見た目はアラートとして描画され、大きさや配色は最上位の見た目として集約します。
 */
export const ToastContent: IToastContent = function SuiToastContent(props) {
  const {
    size,
    color,
    style,
    radius,
    render,
    variant,
    outlined,
    className,
    actionsPosition,
    descriptionPosition,
    ...otherProps
  } = props;

  return (
    <Toast.Content
      {...otherProps}
      render={(htmlProps: {}, toastState) => {
        const alertRootProps: Required<Alert.Root.Props.SuruUI> = {
          size,
          color,
          radius,
          variant,
          outlined,
          actionsPosition,
          descriptionPosition,
        };

        return (
          <Alert.Root
            {...mergeProps<typeof Alert.Root>([
              htmlProps,
              alertRootProps,
              proxyRenderProps(toastState, {
                style,
                render: (htmlProps, state) => (
                  <ToastContentContext value={state}>
                    <RenderElement
                      state={state}
                      render={render}
                      htmlProps={htmlProps}
                      defaultTagName="div"
                    />
                  </ToastContentContext>
                ),
                className: cn(
                  className,
                  "sui_toast_content",
                  (state) => state.behind && "sui_toast_content-behind",
                  (state) => state.expanded && "sui_toast_content-expanded",
                ),
              }),
            ])}
          />
        );
      }}
    />
  );
};

export { ToastContent as Content };

export namespace Content {
  export type State = ToastContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastContentProps.Render;

    export type SuruUI = ToastContentProps.SuruUI;

    export type BaseUI = ToastContentProps.BaseUI;

    export type HTML = ToastContentProps.HTML;
  }

  export type Color = ToastContentColor;

  export type Radius = ToastContentRadius;

  export type Size = ToastContentSize;

  export type Variant = ToastContentVariant;
}
