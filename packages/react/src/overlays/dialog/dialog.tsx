import * as React from "react";

import { Button } from "../../buttons/button/index.js";
import type { Component } from "../../types.js";
import * as DialogParts from "./dialog.parts.jsx";

/**
 * {@link Dialog} コンポーネントのプロパティーです。
 *
 * {@link DialogParts.Root|Root} から継承した `open` を指定すると開閉状態を制御でき、
 * `defaultOpen` は初期状態だけを指定します。
 */
export type DialogProps = Omit<DialogParts.Root.Props, "children" | "handle"> & {
  /**
   * ダイアログを開くトリガーに表示するコンテンツです。
   *
   * {@link DialogParts.Trigger|Trigger} の子要素として直接渡され、`render` に設定されます。
   */
  trigger?: DialogParts.Trigger.Props["children"] | undefined;

  /**
   * ダイアログのタイトルです。
   */
  title?: React.ReactNode | undefined;

  /**
   * ダイアログの説明文です。
   */
  description?: React.ReactNode | undefined;

  /**
   * ダイアログの本文に表示するコンテンツです。
   */
  children?: React.ReactNode | undefined;

  /**
   * フッターに表示する閉じるボタンのコンテンツです。
   */
  close?: DialogParts.Close.Props["children"] | undefined;

  /**
   * いずれかの閉じるボタンがクリックされたときに呼ばれるコールバックです。
   *
   * `slotProps.close` の `onClick` が先に実行され、イベントが `preventDefault` されていない場合に呼ばれます。
   */
  onClose?: ((event: CloseClickEvent) => void) | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?:
    | {
        /**
         * {@link DialogParts.Trigger|Trigger} に渡すプロパティーです。
         */
        readonly trigger?:
          | Omit<DialogParts.Trigger.Props, "handle" | "children" | "render">
          | undefined;

        /**
         * {@link DialogParts.Portal|Portal} に渡すプロパティーです。
         */
        readonly portal?: DialogParts.Portal.Props | undefined;

        /**
         * {@link DialogParts.Backdrop|Backdrop} に渡すプロパティーです。
         */
        readonly backdrop?: DialogParts.Backdrop.Props | undefined;

        /**
         * {@link DialogParts.Viewport|Viewport} に渡すプロパティーです。
         */
        readonly viewport?: DialogParts.Viewport.Props | undefined;

        /**
         * {@link DialogParts.Popup|Popup} に渡すプロパティーです。
         */
        readonly popup?: DialogParts.Popup.Props | undefined;

        /**
         * {@link DialogParts.Title|Title} に渡すプロパティーです。
         */
        readonly title?: DialogParts.Title.Props | undefined;

        /**
         * {@link DialogParts.Description|Description} に渡すプロパティーです。
         */
        readonly description?: DialogParts.Description.Props | undefined;

        /**
         * {@link DialogParts.Close|Close}（フッターの閉じるボタン）に渡すプロパティーです。
         */
        readonly close?: Omit<DialogParts.Close.Props, "children"> | undefined;

        /**
         * {@link DialogParts.Close|Close}（右上の閉じるボタン）に渡すプロパティーです。
         */
      }
    | undefined;
};

type CloseClickHandler = DialogParts.Close.Props["onClick"];
type CloseClickEvent = Parameters<NonNullable<CloseClickHandler>>[0];

interface DialogComponentType extends Component<DialogProps> {
  /**
   * ダイアログを制御するハンドルを新しく作成します。
   *
   * 作成したハンドルは {@link DialogParts.Root} と {@link DialogParts.Trigger} の `handle` プロパティーに渡します。
   */
  readonly createHandle: typeof DialogParts.createHandle;
}

function createCloseClickHandler(
  onClick: CloseClickHandler | undefined,
  callback: ((event: CloseClickEvent) => void) | undefined,
): CloseClickHandler {
  if (onClick === undefined && callback === undefined) {
    return undefined;
  }

  return (event) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      callback?.(event);
    }
  };
}

/**
 * ダイアログを表示するコンポーネントです。
 *
 * トリガー、タイトル、説明文、本文、閉じる操作からダイアログを組み立てます。
 * 構成を細かく制御したい場合は、{@link DialogParts.Root|Root} を直接組み立てます。
 *
 * @example 基本
 * ```tsx
 * import { Dialog } from "@suru-ui/react/dialog";
 * import { Button } from "@suru-ui/react/button";
 *
 * <Dialog
 *   trigger={<Button>通知を見る</Button>}
 *   title="通知"
 *   description="新しい通知はありません。"
 *   close={<Button variant="naked">閉じる</Button>}
 * />
 * ```
 */
export const Dialog: DialogComponentType = /*#__PURE__*/ Object.assign(
  function SuiDialog(props: DialogProps) {
    const [handle] = React.useState(DialogParts.createHandle);
    const {
      trigger,
      title,
      description,
      close,
      onClose,
      children,
      slotProps: {
        trigger: triggerProps,
        portal: portalProps,
        backdrop: backdropProps,
        viewport: viewportProps,
        popup: popupProps,
        title: titleProps,
        description: descriptionProps,
        close: closeProps,
      } = {},
      ...rootProps
    } = props;

    return (
      <DialogParts.Root {...rootProps} handle={handle}>
        {trigger !== undefined && (
          <DialogParts.Trigger {...triggerProps} handle={handle}>
            {trigger}
          </DialogParts.Trigger>
        )}
        <DialogParts.Portal {...portalProps}>
          <DialogParts.Backdrop {...backdropProps} />
          <DialogParts.Viewport {...viewportProps}>
            <DialogParts.Popup {...popupProps}>
              <DialogParts.Close
                className="sui_dialog_close_button"
                onClick={createCloseClickHandler(undefined, onClose)}
              >
                <Button variant="naked" color="grey" squared aria-label="閉じる">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
              </DialogParts.Close>
              {title !== undefined && (
                <DialogParts.Title {...titleProps}>{title}</DialogParts.Title>
              )}
              {description !== undefined && (
                <DialogParts.Description {...descriptionProps}>
                  {description}
                </DialogParts.Description>
              )}
              {children}
              {close !== undefined && (
                <div className="sui_dialog_actions">
                  <DialogParts.Close
                    {...closeProps}
                    onClick={createCloseClickHandler(closeProps?.onClick, onClose)}
                  >
                    {close}
                  </DialogParts.Close>
                </div>
              )}
            </DialogParts.Popup>
          </DialogParts.Viewport>
        </DialogParts.Portal>
      </DialogParts.Root>
    );
  },
  { createHandle: DialogParts.createHandle },
);
