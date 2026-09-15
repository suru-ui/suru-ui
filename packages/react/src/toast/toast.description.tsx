import { Toast } from "@base-ui/react/toast";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Alert from "../alert/alert.parts.js";
import type { Override, IComponent } from "../types.js";

/**
 * {@link ToastDescription} が持つ状態です。
 */
export type ToastDescriptionState = Override<Alert.Content.State, Toast.Description.State>;

export namespace ToastDescriptionProps {
  export type Render = RenderProps<ToastDescriptionState>;

  export type SuruUI = Alert.Content.Props.SuruUI;

  export type BaseUI = Override<
    Alert.Content.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Toast.Description>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // ToastDescriptionProps:
        never,
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Toast.Description>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ToastDescription} に渡す props です。
 */
export type ToastDescriptionProps = ToastDescriptionProps.Render &
  ToastDescriptionProps.SuruUI &
  ToastDescriptionProps.BaseUI &
  ToastDescriptionProps.HTML;

/**
 * 通知の説明文を表示する段落要素です。
 */
export const ToastDescription: IComponent<ToastDescriptionProps> = function SuiToastDescription(
  props,
) {
  const { style, render, className, ...otherProps } = props;

  return (
    <Toast.Description
      {...otherProps}
      render={(htmlProps: {}, toastState) => (
        <Alert.Content
          {...mergeProps<typeof Alert.Content>([
            htmlProps,
            proxyRenderProps(toastState, {
              style,
              render,
              className,
            }),
          ])}
        />
      )}
    />
  );
};

export { ToastDescription as Description };

export namespace Description {
  export type State = ToastDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastDescriptionProps.Render;

    export type SuruUI = ToastDescriptionProps.SuruUI;

    export type BaseUI = ToastDescriptionProps.BaseUI;

    export type HTML = ToastDescriptionProps.HTML;
  }
}
