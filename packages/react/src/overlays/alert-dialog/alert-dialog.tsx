import * as React from "react";

import { Button } from "../../buttons/button/index.js";
import type { Component } from "../../types.js";
import * as AlertDialogParts from "./alert-dialog.parts.jsx";

/**
 * {@link AlertDialog} コンポーネントのプロパティーです。
 *
 * {@link AlertDialogParts.Root|Root} から継承した `open` を指定すると開閉状態を制御でき、
 * `defaultOpen` は初期状態だけを指定します。`open` を指定した場合は `defaultOpen` より優先されます。
 * いずれも省略した場合の初期状態は閉じています。
 */
export type AlertDialogProps = Omit<AlertDialogParts.Root.Props, "children" | "handle"> & {
  /**
   * ダイアログを開くトリガーに表示するコンテンツです。
   *
   * {@link AlertDialogParts.Trigger|Trigger} の子要素として直接渡されます。
   * 省略した場合、トリガーはレンダリングされません。
   */
  trigger?: AlertDialogParts.Trigger.Props["children"] | undefined;

  /**
   * ダイアログのタイトルです。
   * 省略した場合、タイトル要素はレンダリングされません。
   */
  title?: React.ReactNode | undefined;

  /**
   * ダイアログの説明文です。
   * 省略した場合、説明要素はレンダリングされません。
   */
  description?: React.ReactNode | undefined;

  /**
   * ダイアログの本文に表示するコンテンツです。
   * `title` と `description` の後、アクションボタンの前に表示されます。
   */
  children?: React.ReactNode | undefined;

  /**
   * 承諾せずにダイアログを閉じるボタンに表示するコンテンツです。
   *
   * {@link AlertDialogParts.Close|Close} の子要素として直接渡されます。
   * 省略した場合、拒否ボタンはレンダリングされません。
   */
  reject?: AlertDialogParts.Close.Props["children"] | undefined;

  /**
   * 承諾してダイアログを閉じるボタンに表示するコンテンツです。
   *
   * {@link AlertDialogParts.Close|Close} の子要素として直接渡されます。
   * 省略した場合、承諾ボタンはレンダリングされません。
   */
  accept?: AlertDialogParts.Close.Props["children"] | undefined;

  /**
   * 拒否ボタンがクリックされたときに呼ばれるコールバックです。
   * {@link slotProps} の `reject.onClick` が先に実行され、イベントが `preventDefault` されていない場合だけ呼ばれます。
   * クリックイベントを引数として受け取ります。
   */
  onReject?: ((event: CloseClickEvent) => void) | undefined;

  /**
   * 承諾ボタンがクリックされたときに呼ばれるコールバックです。
   * {@link slotProps} の `accept.onClick` が先に実行され、イベントが `preventDefault` されていない場合だけ呼ばれます。
   * クリックイベントを引数として受け取ります。
   */
  onAccept?: ((event: CloseClickEvent) => void) | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   * クラス名は既定のクラス名と結合され、拒否・承諾ボタンの `onClick` は
   * このオブジェクトのハンドラーが先に実行されます。
   */
  slotProps?:
    | {
        /**
         * {@link AlertDialogParts.Trigger|Trigger} に渡すプロパティーです。
         */
        readonly trigger?: Omit<AlertDialogParts.Trigger.Props, "handle" | "children"> | undefined;

        /**
         * {@link AlertDialogParts.Portal|Portal} に渡すプロパティーです。
         */
        readonly portal?: AlertDialogParts.Portal.Props | undefined;

        /**
         * {@link AlertDialogParts.Backdrop|Backdrop} に渡すプロパティーです。
         */
        readonly backdrop?: AlertDialogParts.Backdrop.Props | undefined;

        /**
         * {@link AlertDialogParts.Viewport|Viewport} に渡すプロパティーです。
         */
        readonly viewport?: AlertDialogParts.Viewport.Props | undefined;

        /**
         * {@link AlertDialogParts.Popup|Popup} に渡すプロパティーです。
         */
        readonly popup?: AlertDialogParts.Popup.Props | undefined;

        /**
         * {@link AlertDialogParts.Title|Title} に渡すプロパティーです。
         */
        readonly title?: AlertDialogParts.Title.Props | undefined;

        /**
         * {@link AlertDialogParts.Description|Description} に渡すプロパティーです。
         */
        readonly description?: AlertDialogParts.Description.Props | undefined;

        /**
         * {@link AlertDialogParts.Close|Close} (拒否ボタン) に渡すプロパティーです。
         */
        readonly reject?: Omit<AlertDialogParts.Close.Props, "children"> | undefined;

        /**
         * {@link AlertDialogParts.Close|Close} (承諾ボタン) に渡すプロパティーです。
         */
        readonly accept?: Omit<AlertDialogParts.Close.Props, "children"> | undefined;
      }
    | undefined;
};

type CloseClickHandler = AlertDialogParts.Close.Props["onClick"];
type CloseClickEvent = Parameters<NonNullable<CloseClickHandler>>[0];

interface AlertDialogComponentType extends Component<AlertDialogProps> {
  /**
   * アラートダイアログを制御するハンドルを新しく作成します。
   *
   * 作成したハンドルは {@link AlertDialogParts.Root} と
   * {@link AlertDialogParts.Trigger} の `handle` プロパティーに渡します。
   */
  readonly createHandle: typeof AlertDialogParts.createHandle;
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
 * アラートダイアログを表示するコンポーネントです。
 *
 * タイトル（`title`）と説明文（`description`）、本文（`children`）、
 * 拒否（`reject`）と承諾（`accept`）のボタンから、確認を求めるダイアログを組み立てます。
 * ボタンのクリックはそれぞれ `onReject` と `onAccept` で受け取れます。
 * 右上の閉じるボタンのクリックは `onReject` で受け取れます。
 * 構成を細かく制御したい場合は、{@link AlertDialogParts.Root|Root} を直接組み立てます。
 *
 * @example 基本
 * ```tsx
 * import { AlertDialog } from "@suru-ui/react/alert-dialog";
 *
 * <AlertDialog
 *   trigger={(props) => <button type="button" {...props}>下書きを破棄</button>}
 *   title="下書きを破棄しますか?"
 *   description="この操作は元に戻せません。"
 *   reject={(props) => <button type="button" {...props}>キャンセル</button>}
 *   accept={(props) => <button type="button" {...props}>破棄する</button>}
 *   onReject={() => {
 *     // キャンセル時の処理
 *   }}
 *   onAccept={() => {
 *     // 承諾時の処理
 *   }}
 * />
 * ```
 */
export const AlertDialog: AlertDialogComponentType = /*#__PURE__*/ Object.assign(
  function SuiAlertDialog(props: AlertDialogProps) {
    const [handle] = React.useState(AlertDialog.createHandle);
    const {
      trigger,
      title,
      description,
      reject,
      accept,
      onReject,
      onAccept,
      children,
      slotProps: {
        trigger: triggerProps,
        portal: portalProps,
        backdrop: backdropProps,
        viewport: viewportProps,
        popup: popupProps,
        title: titleProps,
        description: descriptionProps,
        reject: rejectProps,
        accept: acceptProps,
      } = {},
      ...rootProps
    } = props;

    return (
      <AlertDialogParts.Root {...rootProps} handle={handle}>
        {trigger !== undefined && (
          <AlertDialogParts.Trigger {...triggerProps} handle={handle}>
            {trigger}
          </AlertDialogParts.Trigger>
        )}
        <AlertDialogParts.Portal {...portalProps}>
          <AlertDialogParts.Backdrop {...backdropProps} />
          <AlertDialogParts.Viewport {...viewportProps}>
            <AlertDialogParts.Popup {...popupProps}>
              <AlertDialogParts.Close
                className="sui_alert_dialog_close_button"
                onClick={createCloseClickHandler(undefined, onReject)}
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
              </AlertDialogParts.Close>
              {title !== undefined && (
                <AlertDialogParts.Title {...titleProps}>{title}</AlertDialogParts.Title>
              )}
              {description !== undefined && (
                <AlertDialogParts.Description {...descriptionProps}>
                  {description}
                </AlertDialogParts.Description>
              )}
              {children}
              {(reject !== undefined || accept !== undefined) && (
                <div className="sui_alert_dialog_actions">
                  {reject !== undefined && (
                    <AlertDialogParts.Close
                      {...rejectProps}
                      onClick={createCloseClickHandler(rejectProps?.onClick, onReject)}
                    >
                      {reject}
                    </AlertDialogParts.Close>
                  )}
                  {accept !== undefined && (
                    <AlertDialogParts.Close
                      {...acceptProps}
                      onClick={createCloseClickHandler(acceptProps?.onClick, onAccept)}
                    >
                      {accept}
                    </AlertDialogParts.Close>
                  )}
                </div>
              )}
            </AlertDialogParts.Popup>
          </AlertDialogParts.Viewport>
        </AlertDialogParts.Portal>
      </AlertDialogParts.Root>
    );
  },
  { createHandle: AlertDialogParts.createHandle },
);
