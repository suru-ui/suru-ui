import { Toast } from "@base-ui/react/toast";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ToastViewport} が持つ状態です。
 */
export type ToastViewportState = Toast.Viewport.State;

export namespace ToastViewportProps {
  export type Render = RenderProps<ToastViewportState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Toast.Viewport>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ToastViewportProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Toast.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ToastViewport} に渡す props です。
 */
export type ToastViewportProps = ToastViewportProps.Render &
  ToastViewportProps.SuruUI &
  ToastViewportProps.BaseUI &
  ToastViewportProps.HTML;

/**
 * 通知を表示するビューポートコンポーネントです。
 */
export const ToastViewport: IComponent<ToastViewportProps> = function SuiToastViewport(props) {
  const { className, ...otherProps } = props;

  return (
    <Toast.Viewport
      {...otherProps}
      className={cn(
        className,
        "sui_toast_viewport",
        (state) => state.expanded && "sui_toast_viewport-expanded",
      )}
    />
  );
};

export { ToastViewport as Viewport };

export namespace Viewport {
  export type State = ToastViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastViewportProps.Render;

    export type SuruUI = ToastViewportProps.SuruUI;

    export type BaseUI = ToastViewportProps.BaseUI;

    export type HTML = ToastViewportProps.HTML;
  }
}
