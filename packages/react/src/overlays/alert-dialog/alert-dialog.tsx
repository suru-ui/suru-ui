import { makeEventPreventable } from "@base-ui/react";
import * as React from "react";

import { Button } from "../../buttons/button/index.js";
import type { IComponent } from "../../types.js";
import {
  type AlertDialogRootProps,
  type AlertDialogRootState,
  type AlertDialogCloseProps,
  type AlertDialogPopupProps,
  type AlertDialogTitleProps,
  type AlertDialogPortalProps,
  type AlertDialogTriggerProps,
  type AlertDialogBackdropProps,
  type AlertDialogViewportProps,
  type AlertDialogDescriptionProps,
  createHandle,
  AlertDialogRoot,
  AlertDialogClose,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogPortal,
  AlertDialogTrigger,
  AlertDialogBackdrop,
  AlertDialogViewport,
  AlertDialogDescription,
} from "./alert-dialog.parts.jsx";

/**
 * {@link AlertDialog} の各パーツに渡すプロパティーです。
 */
export type AlertDialogSlotProps = {
  /**
   * {@link AlertDialogClose|Close} (承諾ボタン) に渡すプロパティーです。
   */
  readonly accept?: Omit<AlertDialogCloseProps, "children"> | undefined;

  /**
   * {@link AlertDialogBackdrop|Backdrop} に渡すプロパティーです。
   */
  readonly backdrop?: AlertDialogBackdropProps | undefined;

  /**
   * {@link AlertDialogDescription|Description} に渡すプロパティーです。
   */
  readonly description?: AlertDialogDescriptionProps | undefined;

  /**
   * {@link AlertDialogPopup|Popup} に渡すプロパティーです。
   */
  readonly popup?: AlertDialogPopupProps | undefined;

  /**
   * {@link AlertDialogPortal|Portal} に渡すプロパティーです。
   */
  readonly portal?: AlertDialogPortalProps | undefined;

  /**
   * {@link AlertDialogClose|Close} (拒否ボタン) に渡すプロパティーです。
   */
  readonly reject?: Omit<AlertDialogCloseProps, "children"> | undefined;

  /**
   * {@link AlertDialogTitle|Title} に渡すプロパティーです。
   */
  readonly title?: AlertDialogTitleProps | undefined;

  /**
   * {@link AlertDialogTrigger|Trigger} に渡すプロパティーです。
   */
  readonly trigger?: Omit<AlertDialogTriggerProps, "handle"> | undefined;

  /**
   * {@link AlertDialogViewport|Viewport} に渡すプロパティーです。
   */
  readonly viewport?: AlertDialogViewportProps | undefined;
};

/**
 * {@link AlertDialog} の状態です。
 */
export type AlertDialogState = AlertDialogRootState;

/**
 * {@link AlertDialog} コンポーネントのプロパティーです。
 *
 * {@link AlertDialogRoot|Root} から継承した `open` を指定すると開閉状態を制御でき、`defaultOpen` は初期状態だけを指定します。`open` を指定した場合は `defaultOpen` より優先されます。
 * いずれも省略した場合の初期状態は閉じています。
 */
export type AlertDialogProps = Omit<AlertDialogRootProps, "children" | "handle"> & {
  /**
   * 承諾してダイアログを閉じるボタンに表示するコンテンツです。
   *
   * {@link AlertDialogClose|Close} の子要素として直接渡されます。
   * 省略した場合、承諾ボタンはレンダリングされません。
   */
  accept?: AlertDialogCloseProps["children"] | undefined;

  /**
   * ダイアログの本文に表示するコンテンツです。
   * `title` と `description` の後、アクションボタンの前に表示されます。
   */
  children?: React.ReactNode | undefined;

  /**
   * ダイアログの説明文です。
   * 省略した場合、説明要素はレンダリングされません。
   */
  description?: React.ReactNode | undefined;

  /**
   * 承諾ボタンがクリックされたときに呼ばれるコールバックです。
   * {@link slotProps} の `accept.onClick` が先に実行され、`preventBaseUIHandler()` が呼ばれていない場合だけ呼ばれます。
   * クリックイベントを引数として受け取ります。
   */
  onAccept?: ((event: CloseClickEvent) => void) | undefined;

  /**
   * 拒否ボタンがクリックされたときに呼ばれるコールバックです。
   * {@link slotProps} の `reject.onClick` が先に実行され、`preventBaseUIHandler()` が呼ばれていない場合だけ呼ばれます。
   * クリックイベントを引数として受け取ります。
   */
  onReject?: ((event: CloseClickEvent) => void) | undefined;

  /**
   * 承諾せずにダイアログを閉じるボタンに表示するコンテンツです。
   *
   * {@link AlertDialogClose|Close} の子要素として直接渡されます。
   * 省略した場合、拒否ボタンはレンダリングされません。
   */
  reject?: AlertDialogCloseProps["children"] | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   * クラス名は既定のクラス名と結合され、拒否・承諾ボタンの `onClick` はこのオブジェクトのハンドラーが先に実行されます。
   */
  slotProps?: AlertDialogSlotProps | undefined;

  /**
   * ダイアログのタイトルです。
   * 省略した場合、タイトル要素はレンダリングされません。
   */
  title?: React.ReactNode | undefined;

  /**
   * ダイアログを開くトリガーに表示するコンテンツです。
   *
   * {@link AlertDialogTrigger|Trigger} の子要素として直接渡されます。
   * 省略した場合、トリガーはレンダリングされません。
   * `trigger` 未指定で `slotProps.trigger` のみ指定した場合も、トリガーは描画されません。
   */
  trigger?: AlertDialogTriggerProps["children"] | undefined;
};

type CloseClickHandler = AlertDialogCloseProps["onClick"];
type CloseClickEvent = Parameters<NonNullable<CloseClickHandler>>[0];

interface AlertDialogComponentType extends IComponent<AlertDialogProps> {
  /**
   * アラートダイアログを制御するハンドルを新しく作成します。
   *
   * 作成したハンドルは {@link AlertDialogRoot} と {@link AlertDialogTrigger} の `handle` プロパティーに渡します。
   */
  readonly createHandle: typeof createHandle;
}

function createCloseClickHandler(
  onClick: CloseClickHandler | undefined,
  callback: ((event: CloseClickEvent) => void) | undefined,
): CloseClickHandler {
  if (onClick === undefined && callback === undefined) {
    return undefined;
  }

  return (event) => {
    if (typeof event.preventBaseUIHandler !== "function") {
      makeEventPreventable(event);
    }
    onClick?.(event);
    if (!event.baseUIHandlerPrevented) {
      callback?.(event);
    }
  };
}

/**
 * アラートダイアログを表示するコンポーネントです。
 *
 * タイトル（`title`）と説明文（`description`）、本文（`children`）、拒否（`reject`）と承諾（`accept`）のボタンから、確認を求めるダイアログを組み立てます。
 * ボタンのクリックはそれぞれ `onReject` と `onAccept` で受け取れます。
 * 右上の閉じるボタンのクリックは `onReject` で受け取れます。
 * 構成を細かく制御したい場合は、{@link AlertDialogRoot|Root} を直接組み立てます。
 */
export const AlertDialog: AlertDialogComponentType = /*#__PURE__*/ Object.assign(
  function SuiAlertDialog(props: AlertDialogProps) {
    const [handle] = React.useState(AlertDialog.createHandle);
    const {
      title,
      accept,
      reject,
      trigger,
      children,
      onAccept,
      onReject,
      slotProps: {
        popup: popupProps,
        title: titleProps,
        accept: acceptProps,
        portal: portalProps,
        reject: rejectProps,
        trigger: triggerProps,
        backdrop: backdropProps,
        viewport: viewportProps,
        description: descriptionProps,
      } = {},
      description,
      ...rootProps
    } = props;

    return (
      <AlertDialogRoot {...rootProps} handle={handle}>
        {trigger !== undefined && (
          <AlertDialogTrigger handle={handle} children={trigger} {...triggerProps} />
        )}
        <AlertDialogPortal {...portalProps}>
          <AlertDialogBackdrop {...backdropProps} />
          <AlertDialogViewport {...viewportProps}>
            <AlertDialogPopup {...popupProps}>
              <AlertDialogClose
                onClick={createCloseClickHandler(undefined, onReject)}
                className="sui_alert_dialog_close_button"
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
              </AlertDialogClose>
              {("title" in props || !!titleProps) && (
                <AlertDialogTitle children={title} {...titleProps} />
              )}
              {("description" in props || !!descriptionProps) && (
                <AlertDialogDescription children={description} {...descriptionProps} />
              )}
              {children}
              {(reject !== undefined || accept !== undefined) && (
                <div className="sui_alert_dialog_actions">
                  {reject !== undefined && (
                    <AlertDialogClose
                      onClick={createCloseClickHandler(rejectProps?.onClick, onReject)}
                      children={reject}
                      {...rejectProps}
                    />
                  )}
                  {accept !== undefined && (
                    <AlertDialogClose
                      onClick={createCloseClickHandler(acceptProps?.onClick, onAccept)}
                      children={accept}
                      {...acceptProps}
                    />
                  )}
                </div>
              )}
            </AlertDialogPopup>
          </AlertDialogViewport>
        </AlertDialogPortal>
      </AlertDialogRoot>
    );
  },
  { createHandle },
);

/**
 * {@link AlertDialog} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace AlertDialog {
  /**
   * {@link AlertDialogState} です。
   */
  export type State = AlertDialogState;

  /**
   * {@link AlertDialogProps} です。
   */
  export type Props = AlertDialogProps;

  /**
   * {@link AlertDialogSlotProps} です。
   */
  export type SlotProps = AlertDialogSlotProps;
}
