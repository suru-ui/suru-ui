import { mergeProps } from "@base-ui/react";
import * as React from "react";

import { Button } from "../../buttons/button/index.js";
import type { IComponent } from "../../types.js";
import {
  type DialogRootProps,
  type DialogRootState,
  type DialogCloseProps,
  type DialogPopupProps,
  type DialogTitleProps,
  type DialogPortalProps,
  type DialogTriggerProps,
  type DialogBackdropProps,
  type DialogViewportProps,
  type DialogDescriptionProps,
  DialogRoot,
  DialogClose,
  DialogPopup,
  DialogTitle,
  DialogPortal,
  createHandle,
  DialogTrigger,
  DialogBackdrop,
  DialogViewport,
  DialogDescription,
} from "./dialog.parts.jsx";

/**
 * {@link Dialog} の各パーツに渡すプロパティーです。
 */
export type DialogSlotProps = {
  /**
   * {@link DialogBackdrop} に渡すプロパティーです。
   */
  readonly backdrop?: DialogBackdropProps | undefined;

  /**
   * {@link DialogClose} に渡すプロパティーです。
   */
  readonly close?: Omit<DialogCloseProps, "children"> | undefined;

  /**
   * {@link DialogDescription} に渡すプロパティーです。
   */
  readonly description?: DialogDescriptionProps | undefined;

  /**
   * {@link DialogPopup} に渡すプロパティーです。
   */
  readonly popup?: DialogPopupProps | undefined;

  /**
   * {@link DialogPortal} に渡すプロパティーです。
   */
  readonly portal?: DialogPortalProps | undefined;

  /**
   * {@link DialogTitle} に渡すプロパティーです。
   */
  readonly title?: DialogTitleProps | undefined;

  /**
   * {@link DialogTrigger} に渡すプロパティーです。
   */
  readonly trigger?: Omit<DialogTriggerProps, "handle"> | undefined;

  /**
   * {@link DialogViewport} に渡すプロパティーです。
   */
  readonly viewport?: DialogViewportProps | undefined;
};

/**
 * {@link Dialog} の状態です。
 */
export type DialogState = DialogRootState;

/**
 * {@link Dialog} コンポーネントのプロパティーです。
 *
 * {@link DialogRoot|Root} から継承した `open` を指定すると開閉状態を制御でき、`defaultOpen` は初期状態だけを指定します。
 */
export type DialogProps = Omit<DialogRootProps, "children" | "handle"> & {
  /**
   * ダイアログの本文に表示するコンテンツです。
   */
  children?: React.ReactNode | undefined;

  /**
   * フッターに表示する閉じるボタンのコンテンツです。
   */
  close?: DialogCloseProps["children"] | undefined;

  /**
   * ダイアログの説明文です。
   */
  description?: React.ReactNode | undefined;

  /**
   * いずれかの閉じるボタンがクリックされたときに呼ばれるコールバックです。
   *
   * `slotProps.close` の `onClick` が先に実行され、`preventBaseUIHandler()` が呼ばれていない場合に呼ばれます。
   */
  onClose?: ((event: CloseClickEvent) => void) | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   */
  slotProps?: DialogSlotProps | undefined;

  /**
   * ダイアログのタイトルです。
   */
  title?: React.ReactNode | undefined;

  /**
   * ダイアログを開くトリガーに表示するコンテンツです。
   *
   * {@link DialogTrigger|Trigger} の子要素として直接渡され、`render` に設定されます。
   * `trigger` 未指定で `slotProps.trigger` のみ指定した場合は、トリガーは描画されません。
   */
  trigger?: DialogTriggerProps["children"] | undefined;
};

type CloseClickHandler = DialogCloseProps["onClick"];
type CloseClickEvent = Parameters<NonNullable<CloseClickHandler>>[0];

interface DialogComponentType extends IComponent<DialogProps> {
  /**
   * ダイアログを制御するハンドルを新しく作成します。
   *
   * 作成したハンドルは {@link DialogRoot} と {@link DialogTrigger} の `handle` プロパティーに渡します。
   */
  readonly createHandle: typeof createHandle;
}

/**
 * ダイアログを表示するコンポーネントです。
 *
 * トリガー、タイトル、説明文、本文、閉じる操作からダイアログを組み立てます。
 * 構成を細かく制御したい場合は、{@link DialogRoot|Root} を直接組み立てます。
 */
export const Dialog: DialogComponentType = /*#__PURE__*/ Object.assign(
  function SuiDialog(props: DialogProps) {
    const [handle] = React.useState(createHandle);
    const {
      close,
      title,
      onClose,
      trigger,
      children,
      slotProps: {
        close: closeProps,
        popup: popupProps,
        title: titleProps,
        portal: portalProps,
        trigger: triggerProps,
        backdrop: backdropProps,
        viewport: viewportProps,
        description: descriptionProps,
      } = {},
      description,
      ...rootProps
    } = props;

    return (
      <DialogRoot {...rootProps} handle={handle}>
        {trigger !== undefined && (
          <DialogTrigger handle={handle} children={trigger} {...triggerProps} />
        )}
        <DialogPortal {...portalProps}>
          <DialogBackdrop {...backdropProps} />
          <DialogViewport {...viewportProps}>
            <DialogPopup {...popupProps}>
              <DialogClose
                {...mergeProps(
                  { onClick: onClose, className: "sui_dialog_close_button" },
                  closeProps,
                )}
              >
                <Button color="grey" squared variant="naked" aria-label="閉じる">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    focusable="false"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
              </DialogClose>
              {("title" in props || !!titleProps) && (
                <DialogTitle children={title} {...titleProps} />
              )}
              {("description" in props || !!descriptionProps) && (
                <DialogDescription children={description} {...descriptionProps} />
              )}
              {children}
              {("close" in props || !!closeProps) && (
                <div className="sui_dialog_actions">
                  <DialogClose
                    children={close!}
                    {...mergeProps({ onClick: onClose }, closeProps)}
                  />
                </div>
              )}
            </DialogPopup>
          </DialogViewport>
        </DialogPortal>
      </DialogRoot>
    );
  },
  { createHandle },
);

/**
 * {@link Dialog} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Dialog {
  /**
   * {@link DialogState} です。
   */
  export type State = DialogState;

  /**
   * {@link DialogProps} です。
   */
  export type Props = DialogProps;

  /**
   * {@link DialogSlotProps} です。
   */
  export type SlotProps = DialogSlotProps;
}
