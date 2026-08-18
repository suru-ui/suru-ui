import * as React from "react";

import type { IComponent } from "../../types.js";
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

/**
 * {@link Toast} の各パーツに渡すプロパティーです。
 */
export type ToastSlotProps = {
  /**
   * {@link ToastPortal} に渡すプロパティーです。
   */
  readonly portal?: ToastPortalProps | undefined;

  /**
   * {@link ToastViewport} に渡すプロパティーです。
   */
  readonly viewport?: ToastViewportProps | undefined;

  /**
   * {@link ToastRoot} に渡すプロパティーです。
   */
  readonly root?: Omit<ToastRootProps, "toast"> | undefined;

  /**
   * {@link ToastContent} に渡すプロパティーです。
   */
  readonly content?: ToastContentProps | undefined;

  /**
   * {@link ToastTitle} に渡すプロパティーです。
   */
  readonly title?: ToastTitleProps | undefined;

  /**
   * {@link ToastDescription} に渡すプロパティーです。
   */
  readonly description?: ToastDescriptionProps | undefined;

  /**
   * {@link ToastAction} に渡すプロパティーです。
   */
  readonly action?: ToastActionProps | undefined;

  /**
   * {@link ToastClose} に渡すプロパティーです。
   */
  readonly close?: ToastCloseProps | undefined;
};

/**
 * {@link Toast} の状態です。
 */
export type ToastState = ToastProviderState;

/**
 * {@link Toast} コンポーネントのプロパティーです。
 */
export type ToastProps = Omit<ToastProviderProps, "children"> & {
  /**
   * 通知を作成する画面のコンテンツです。
   */
  children?: React.ReactNode | undefined;

  /**
   * 通知一覧の各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?: ToastSlotProps | undefined;
};

type ToastListProps = ToastSlotProps;

function ToastList({
  portal: portalProps,
  viewport: viewportProps,
  root: rootProps,
  content: contentProps,
  title: titleProps,
  description: descriptionProps,
  action: actionProps,
  close: closeProps,
}: ToastListProps): React.ReactElement {
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
}
