import { Toast } from "@base-ui/react/toast";
import * as React from "react";

import type { IComponent } from "../types.js";

/**
 * {@link ToastProvider} が持つ状態です。
 */
export type ToastProviderState = Toast.Provider.State;

export namespace ToastProviderProps {
  export type Render = {};

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Toast.Provider>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ToastProviderProps:
      "children" | "timeout" | "limit" | "toastManager",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Toast.Provider>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ToastProvider} に渡す props です。
 */
export type ToastProviderProps = ToastProviderProps.Render &
  ToastProviderProps.SuruUI &
  ToastProviderProps.BaseUI &
  ToastProviderProps.HTML;

export type IToastProvider = IComponent<ToastProviderProps>;

/**
 * 通知の作成と管理を行うコンテキストを提供します。
 *
 * それ自身は HTML 要素をレンダリングしません。
 */
export const ToastProvider: IToastProvider = function SuiToastProvider(props) {
  return <Toast.Provider {...props} />;
};

export { ToastProvider as Provider };

export namespace Provider {
  export type State = ToastProviderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastProviderProps.Render;

    export type SuruUI = ToastProviderProps.SuruUI;

    export type BaseUI = ToastProviderProps.BaseUI;

    export type HTML = ToastProviderProps.HTML;
  }
}
