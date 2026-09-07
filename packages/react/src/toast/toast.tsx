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
 * {@link ToastRootToastObject} です。
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
  readonly content?: ToastContentProps | undefined;

  /**
   * {@link ToastDescription} に渡す props です。
   */
  readonly description?: ToastDescriptionProps | undefined;

  /**
   * {@link ToastPortal} に渡す props です。
   */
  readonly portal?: ToastPortalProps | undefined;

  /**
   * {@link ToastRoot} に渡す props です。
   */
  readonly root?: Omit<ToastRootProps, "toast"> | undefined;

  /**
   * {@link ToastTitle} に渡す props です。
   */
  readonly title?: ToastTitleProps | undefined;

  /**
   * {@link ToastViewport} に渡す props です。
   */
  readonly viewport?: ToastViewportProps | undefined;
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
   *
   * 各パーツの props が優先されます。
   */
  slotProps?: ToastSlotProps | undefined;
};

// Component
// ---------

/**
 * 通知を管理する Provider と、通知一覧を組み立てるコンポーネントです。
 *
 * 子コンポーネントから {@link useToastManager} を呼び出して通知を追加します。
 * 複雑なレイアウトやアンカー付き通知を使う場合は、{@link ToastProvider|Provider} と各パーツを直接組み立てます。
 */
export const Toast: IComponent<ToastProps> = function SuiToast(props) {
  const { children, slotProps, ...providerProps } = props;

  return (
    <ToastProvider {...providerProps}>
      {children}
      <ToastList {...slotProps} />
    </ToastProvider>
  );
};

/**
 * {@link Toast} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Toast {
  /**
   * {@link ToastState} です。
   */
  export type State = ToastState;

  /**
   * {@link ToastProps} です。
   */
  export type Props = ToastProps;

  /**
   * {@link ToastSlotProps} です。
   */
  export type SlotProps = ToastSlotProps;

  /**
   * {@link ToastToastObject} です。
   */
  export type ToastObject<TData extends object = object> = ToastToastObject<TData>;
}

type ToastListProps = ToastSlotProps;

function ToastList(props: ToastListProps): React.ReactElement {
  const {
    root: rootProps,
    close: closeProps,
    title: titleProps,
    action: actionProps,
    portal: portalProps,
    content: contentProps,
    viewport: viewportProps,
    description: descriptionProps,
  } = props;
  const { toasts } = useToastManager();

  return (
    <ToastPortal {...portalProps}>
      <ToastViewport {...viewportProps}>
        {toasts.map((toast) => (
          <ToastRoot key={toast.id} {...rootProps} toast={toast}>
            <ToastContent {...contentProps}>
              <div className="sui_toast_text">
                <ToastTitle {...titleProps} />
                <ToastDescription {...descriptionProps} />
              </div>
              <ToastAction {...actionProps} />
              <ToastClose {...closeProps}>{closeProps?.children ?? "閉じる"}</ToastClose>
            </ToastContent>
          </ToastRoot>
        ))}
      </ToastViewport>
    </ToastPortal>
  );
}
