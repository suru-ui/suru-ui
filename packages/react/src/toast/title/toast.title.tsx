import { Toast } from "@base-ui/react/toast";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Alert from "../../alert/alert.parts.js";
import type { Override, IComponent } from "../../types.js";
import { ToastTitleContext } from "./toast.title.context.js";

/**
 * {@link ToastTitle} が持つ状態です。
 */
export type ToastTitleState = Override<Alert.Title.State, Toast.Title.State>;

export namespace ToastTitleProps {
  export type Render = RenderProps<ToastTitleState>;

  export type SuruUI = Alert.Title.Props.SuruUI;

  export type BaseUI = Override<
    Alert.Title.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Toast.Title>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // ToastTitleProps:
        never,
        keyof Render | keyof SuruUI
      >
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
            proxyRenderProps(toastState, {
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
              className,
            }),
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
