import * as React from "react";

import type { Component } from "../../types.js";
import * as ToastParts from "./toast.parts.jsx";

/**
 * {@link Toast} の各パーツに渡すプロパティーです。
 */
export type ToastSlotProps = {
  /**
   * {@link ToastParts.Portal|Portal} に渡すプロパティーです。
   */
  readonly portal?: ToastParts.Portal.Props | undefined;

  /**
   * {@link ToastParts.Viewport|Viewport} に渡すプロパティーです。
   */
  readonly viewport?: ToastParts.Viewport.Props | undefined;

  /**
   * {@link ToastParts.Root|Root} に渡すプロパティーです。
   */
  readonly root?: Omit<ToastParts.Root.Props, "toast"> | undefined;

  /**
   * {@link ToastParts.Content|Content} に渡すプロパティーです。
   */
  readonly content?: ToastParts.Content.Props | undefined;

  /**
   * {@link ToastParts.Title|Title} に渡すプロパティーです。
   */
  readonly title?: ToastParts.Title.Props | undefined;

  /**
   * {@link ToastParts.Description|Description} に渡すプロパティーです。
   */
  readonly description?: ToastParts.Description.Props | undefined;

  /**
   * {@link ToastParts.Action|Action} に渡すプロパティーです。
   */
  readonly action?: ToastParts.Action.Props | undefined;

  /**
   * {@link ToastParts.Close|Close} に渡すプロパティーです。
   */
  readonly close?: ToastParts.Close.Props | undefined;
};

/**
 * {@link Toast} コンポーネントのプロパティーです。
 */
export type ToastProps = Omit<ToastParts.Provider.Props, "children"> & {
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
  const { toasts } = ToastParts.useToastManager();

  return (
    <ToastParts.Portal {...portalProps}>
      <ToastParts.Viewport {...viewportProps}>
        {toasts.map((toast) => (
          <ToastParts.Root key={toast.id} {...rootProps} toast={toast}>
            <ToastParts.Content {...contentProps}>
              <div className="sui_toast_text">
                <ToastParts.Title {...titleProps} />
                <ToastParts.Description {...descriptionProps} />
              </div>
              <ToastParts.Action {...actionProps} />
              <ToastParts.Close {...closeProps}>
                {closeProps?.children ?? "閉じる"}
              </ToastParts.Close>
            </ToastParts.Content>
          </ToastParts.Root>
        ))}
      </ToastParts.Viewport>
    </ToastParts.Portal>
  );
}

/**
 * 通知を管理する Provider と、通知一覧を組み立てるコンポーネントです。
 *
 * 子コンポーネントから {@link ToastParts.useToastManager|useToastManager} を呼び出して通知を追加します。
 * 複雑なレイアウトやアンカー付き通知を使う場合は、{@link ToastParts.Provider|Provider} と各パーツを直接組み立てます。
 *
 * @example 基本
 * ```tsx
 * import { Toast, useToastManager } from "@suru-ui/react/toast";
 *
 * function SaveButton() {
 *   const toastManager = useToastManager();
 *
 *   return (
 *     <button type="button" onClick={() => toastManager.add({ description: "保存しました。" })}>
 *       保存
 *     </button>
 *   );
 * }
 *
 * <Toast>
 *   <SaveButton />
 * </Toast>
 * ```
 */
export const Toast: Component<ToastProps> = function SuiToast(props) {
  const { children, slotProps, ...providerProps } = props;

  return (
    <ToastParts.Provider {...providerProps}>
      {children}
      <ToastList {...slotProps} />
    </ToastParts.Provider>
  );
};
