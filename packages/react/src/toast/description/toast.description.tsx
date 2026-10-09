import { Toast } from "@base-ui/react/toast";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Alert from "../../alert/alert.parts.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { ToastDescriptionContext } from "./toast.description.context.js";

/**
 * {@link ToastDescription} が持つ状態です。
 */
export type ToastDescriptionState = ToastDescriptionContext;

export namespace ToastDescriptionProps {
  export type Render = RenderProps<ToastDescriptionState>;

  export type SuruUI = Alert.Description.Props.SuruUI;

  export type BaseUI = Override<
    Alert.Description.Props.BaseUI,
    Omit<
      Pick<
        React.ComponentProps<typeof Toast.Description>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // ToastDescriptionProps より:
        never
      >,
      keyof Render | keyof SuruUI
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

export type IToastDescription = IComponent<ToastDescriptionProps>;

/**
 * 通知の説明文を表示する段落要素です。
 */
export const ToastDescription: IToastDescription = function SuiToastDescription(props) {
  const { style, render, className, ...otherProps } = props;

  return (
    <Toast.Description
      {...otherProps}
      render={(htmlProps: {}, toastState) => (
        <Alert.Description
          {...mergeProps<typeof Alert.Description>([
            htmlProps,
            proxyRenderProps<Alert.Description.State, ToastDescriptionState>(
              (alertState) => ({ ...toastState, ...alertState }),
              {
                style,
                render: (htmlProps, state) => (
                  <ToastDescriptionContext value={state}>
                    <RenderElement
                      state={state}
                      render={render}
                      htmlProps={htmlProps}
                      defaultTagName="p"
                    />
                  </ToastDescriptionContext>
                ),
                className: cn<ToastDescriptionState>(
                  className,
                  "sui_toast_description",
                  (state) => `sui_toast_description-actions_position_${state.actionsPosition}`,
                  (state) =>
                    `sui_toast_description-description_position_${state.descriptionPosition.replaceAll("-", "_")}`,
                  (state) => `sui_toast_description-size_${state.size}`,
                  (state) => `sui_toast_description-color_${state.color}`,
                  (state) => `sui_toast_description-radius_${state.radius}`,
                  (state) => `sui_toast_description-variant_${state.variant}`,
                  (state) => state.outlined && "sui_toast_description-outlined",
                  (state) => state.type !== undefined && `sui_toast_description-type_${state.type}`,
                ),
              },
            ),
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
