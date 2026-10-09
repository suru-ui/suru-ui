import { Toast } from "@base-ui/react/toast";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Alert from "../../alert/alert.parts.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { ToastTitleContext } from "./toast.title.context.js";

/**
 * {@link ToastTitle} が持つ状態です。
 */
export type ToastTitleState = ToastTitleContext;

export namespace ToastTitleProps {
  export type Render = RenderProps<ToastTitleState>;

  export type SuruUI = Alert.Title.Props.SuruUI;

  export type BaseUI = Override<
    Alert.Title.Props.BaseUI,
    Omit<
      Pick<
        React.ComponentProps<typeof Toast.Title>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // ToastTitleProps より:
        never
      >,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Toast.Title>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ToastTitle} に渡す props です。
 */
export type ToastTitleProps = ToastTitleProps.Render &
  ToastTitleProps.SuruUI &
  ToastTitleProps.BaseUI &
  ToastTitleProps.HTML;

export type IToastTitle = IComponent<ToastTitleProps>;

/**
 * 通知のタイトルを表示する見出し要素です。
 */
export const ToastTitle: IToastTitle = function SuiToastTitle(props) {
  const {
    style,
    // oxlint-disable-next-line jsx-a11y/heading-has-content
    render = <h2 />,
    className,
    ...otherProps
  } = props;

  return (
    <Toast.Title
      {...otherProps}
      render={(htmlProps: {}, toastState) => (
        <Alert.Title
          {...mergeProps<typeof Alert.Title>([
            htmlProps,
            proxyRenderProps<Alert.Title.State, ToastTitleState>(
              (alertState) => ({ ...toastState, ...alertState }),
              {
                style,
                render: (htmlProps, state) => (
                  <ToastTitleContext value={state}>
                    <RenderElement
                      state={state}
                      render={render}
                      htmlProps={htmlProps}
                      defaultTagName="h2"
                    />
                  </ToastTitleContext>
                ),
                className: cn<ToastTitleState>(
                  className,
                  "sui_toast_title",
                  (state) => `sui_toast_title-actions_position_${state.actionsPosition}`,
                  (state) =>
                    `sui_toast_title-description_position_${state.descriptionPosition.replaceAll("-", "_")}`,
                  (state) => `sui_toast_title-size_${state.size}`,
                  (state) => `sui_toast_title-color_${state.color}`,
                  (state) => `sui_toast_title-radius_${state.radius}`,
                  (state) => `sui_toast_title-variant_${state.variant}`,
                  (state) => state.outlined && "sui_toast_title-outlined",
                  (state) => state.type !== undefined && `sui_toast_title-type_${state.type}`,
                ),
              },
            ),
          ])}
        />
      )}
    />
  );
};

export { ToastTitle as Title };

export namespace Title {
  export type State = ToastTitleState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastTitleProps.Render;

    export type SuruUI = ToastTitleProps.SuruUI;

    export type BaseUI = ToastTitleProps.BaseUI;

    export type HTML = ToastTitleProps.HTML;
  }
}
