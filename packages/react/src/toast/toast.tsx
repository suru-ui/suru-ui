import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type ToastRootProps,
  type ToastCloseProps,
  type ToastTitleProps,
  type ToastActionProps,
  type ToastPortalProps,
  type ToastContentProps,
  type ToastProviderProps,
  type ToastProviderState,
  type ToastViewportProps,
  type ToastRootToastObject,
  type ToastDescriptionProps,
  ToastRoot,
  ToastClose,
  ToastTitle,
  ToastAction,
  ToastPortal,
  ToastContent,
  ToastProvider,
  ToastViewport,
  useToastManager,
  ToastDescription,
} from "./toast.parts.jsx";

// Types
// -----

/**
 * {@link ToastRootToastObject}
 */
export type ToastToastObject<TData extends object = object> = ToastRootToastObject<TData>;

/**
 * {@link Toast} の各パーツに渡す props です。
 */
export type ToastSlotProps = {
  /**
   * {@link ToastAction} に渡す props です。
   */
  readonly action?: ToastActionProps | undefined;

  /**
   * {@link ToastClose} に渡す props です。
   */
  readonly close?: ToastCloseProps | undefined;

  /**
   * {@link ToastContent} に渡す props です。
   */
  readonly content?: Omit<ToastContentProps, "children"> | undefined;

  /**
   * {@link ToastDescription} に渡す props です。
   */
  readonly description?: ToastDescriptionProps | undefined;

  /**
   * {@link ToastPortal} に渡す props です。
   */
  readonly portal?: Omit<ToastPortalProps, "children"> | undefined;

  /**
   * {@link ToastRoot} に渡す props です。
   */
  readonly root?: Omit<ToastRootProps, "toast" | "children"> | undefined;

  /**
   * {@link ToastTitle} に渡す props です。
   */
  readonly title?: ToastTitleProps | undefined;

  /**
   * {@link ToastViewport} に渡す props です。
   */
  readonly viewport?: Omit<ToastViewportProps, "children"> | undefined;
};

/**
 * {@link Toast} の状態です。
 */
export type ToastState = ToastProviderState;

/**
 * {@link Toast} コンポーネントの props です。
 */
export type ToastProps = ToastProviderProps & {
  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  slotProps?: ToastSlotProps | undefined;
};

// API
// ---

/**
 * {@link Toast} を構成する各パーツの props を作成するための API です。
 */
export interface ToastAPI {
  /**
   * {@link ToastAction} に渡す props を取得します。
   */
  getActionProps(): ToastActionProps;

  /**
   * {@link ToastClose} に渡す props を取得します。
   */
  getCloseProps(): ToastCloseProps;

  /**
   * {@link ToastContent} に渡す props を取得します。
   */
  getContentProps(): Omit<ToastContentProps, "children">;

  /**
   * {@link ToastDescription} に渡す props を取得します。
   */
  getDescriptionProps(): ToastDescriptionProps;

  /**
   * {@link ToastPortal} に渡す props を取得します。
   */
  getPortalProps(): Omit<ToastPortalProps, "children">;

  /**
   * {@link ToastProvider} に渡す props を取得します。
   */
  getProviderProps(): Omit<ToastProviderProps, "children"> & {
    children: React.ReactNode;
  };

  /**
   * {@link ToastRoot} に渡す props を取得します。
   *
   * @param toast 表示する通知オブジェクトです。
   */
  getRootProps(toast: ToastToastObject): Omit<ToastRootProps, "children">;

  /**
   * {@link ToastTitle} に渡す props を取得します。
   */
  getTitleProps(): ToastTitleProps;

  /**
   * {@link ToastViewport} に渡す props を取得します。
   */
  getViewportProps(): Omit<ToastViewportProps, "children">;
}

interface IUseToastAPI {
  /**
   * {@link ToastAPI} を作成します。
   *
   * @param props {@link Toast} の props です。
   * @returns トーストの API です
   */
  (props: ToastProps): ToastAPI;
}

/**
 * {@link ToastAPI} を作成するフックです。
 */
export const useToastAPI: IUseToastAPI = function useSuiToastAPI(props) {
  const {
    children,
    slotProps: {
      root: rootProps = {},
      close: closeProps = {},
      title: titleProps = {},
      action: actionProps = {},
      portal: portalProps = {},
      content: contentProps = {},
      viewport: viewportProps = {},
      description: descriptionProps = {},
    } = {},
    ...otherProviderProps
  } = props;

  return {
    getRootProps(toast) {
      return { ...rootProps, toast };
    },
    getCloseProps() {
      return { children: "閉じる", ...closeProps };
    },
    getTitleProps() {
      return titleProps;
    },
    getActionProps() {
      return actionProps;
    },
    getPortalProps() {
      return portalProps;
    },
    getContentProps() {
      return contentProps;
    },
    getProviderProps() {
      return { ...otherProviderProps, children };
    },
    getViewportProps() {
      return viewportProps;
    },
    getDescriptionProps() {
      return descriptionProps;
    },
  };
};

export { type ToastAPI as API, useToastAPI as useAPI };

// Component
// ---------

/**
 * 通知を管理する Provider と、通知一覧を組み立てるコンポーネントです。
 *
 * 子コンポーネントから {@link useToastManager} を呼び出して通知を追加します。
 * 複雑なレイアウトやアンカー付き通知を使う場合は、{@link ToastProvider|Provider} と各パーツを直接組み立てます。
 */
export const Toast: IComponent<ToastProps> = function SuiToast(props) {
  const api = useToastAPI(props);
  const { children, ...otherProviderProps } = api.getProviderProps();

  return (
    <ToastProvider {...otherProviderProps}>
      {children}
      <ToastList api={api} />
    </ToastProvider>
  );
};

/**
 * {@link Toast} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Toast {
  /**
   * {@link ToastState}
   */
  export type State = ToastState;

  /**
   * {@link ToastProps}
   */
  export type Props = ToastProps;

  /**
   * {@link ToastSlotProps}
   */
  export type SlotProps = ToastSlotProps;

  /**
   * {@link ToastToastObject}
   */
  export type ToastObject<TData extends object = object> = ToastToastObject<TData>;
}

type ToastListProps = {
  readonly api: ToastAPI;
};

function ToastList(props: ToastListProps): React.ReactElement {
  const { api } = props;
  const { toasts } = useToastManager();

  return (
    <ToastPortal {...api.getPortalProps()}>
      <ToastViewport {...api.getViewportProps()}>
        {toasts.map((toast) => (
          <ToastRoot key={toast.id} {...api.getRootProps(toast)}>
            <ToastContent {...api.getContentProps()}>
              <div className="sui_toast_text">
                <ToastTitle {...api.getTitleProps()} />
                <ToastDescription {...api.getDescriptionProps()} />
              </div>
              <ToastAction {...api.getActionProps()} />
              <ToastClose {...api.getCloseProps()} />
            </ToastContent>
          </ToastRoot>
        ))}
      </ToastViewport>
    </ToastPortal>
  );
}
