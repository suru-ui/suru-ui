import { AlertDialog } from "@base-ui/react/alert-dialog";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./alert-dialog.css";

// Handle
// ------

/**
 * アラートダイアログに渡すハンドルです。
 */
export type AlertDialogHandle = AlertDialog.Handle<unknown>;

/**
 * アラートダイアログを制御するハンドルを新しく作成します。
 *
 * 作成したハンドルを {@link Root} と {@link Trigger} または {@link AlertDialog} の
 * `handle` プロパティーに渡すことで、トリガーとダイアログの内容を関連付けます。
 *
 * @example
 * ```tsx
 * const handle = AlertDialogParts.createHandle();
 * ```
 */
export const createHandle: typeof AlertDialog.createHandle = AlertDialog.createHandle;

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type AlertDialogRootState = AlertDialog.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type AlertDialogRootProps = Omit<React.ComponentProps<typeof AlertDialog.Root>, "handle"> & {
  /**
   * アラートダイアログとトリガー ({@link Trigger}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成します。
   */
  handle: AlertDialogHandle;
};

/**
 * アラートダイアログのルート要素です。
 *
 * ダイアログの開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 *
 * @example
 * ```tsx
 * const handle = AlertDialogParts.createHandle();
 *
 * <AlertDialogParts.Root handle={handle}>
 *   <AlertDialogParts.Trigger handle={handle}>
 *     {(props) => <button type="button" {...props}>下書きを破棄</button>}
 *   </AlertDialogParts.Trigger>
 *   <AlertDialogParts.Portal>
 *     <AlertDialogParts.Popup>
 *       <AlertDialogParts.Title>下書きを破棄しますか?</AlertDialogParts.Title>
 *     </AlertDialogParts.Popup>
 *   </AlertDialogParts.Portal>
 * </AlertDialogParts.Root>
 * ```
 */
export const AlertDialogRoot: Component<AlertDialogRootProps> = function SuiAlertDialogRoot(props) {
  return <AlertDialog.Root {...props} />;
};

/**
 * {@link AlertDialogRoot} の型をまとめた名前空間です。
 */
export namespace Root {
  /**
   * {@link AlertDialogRoot} の状態型です。
   */
  export type State = AlertDialogRootState;

  /**
   * {@link AlertDialogRoot} のプロパティー型です。
   */
  export type Props = AlertDialogRootProps;
}

/**
 * {@link AlertDialogRoot} の短縮名です。
 */
export const Root: Component<Root.Props> = AlertDialogRoot;

// Trigger
// -------

/**
 * {@link Trigger} の状態です。
 */
export type AlertDialogTriggerState = AlertDialog.Trigger.State;

/**
 * {@link Trigger} に渡すプロパティーです。
 */
export type AlertDialogTriggerProps = Omit<
  React.ComponentProps<typeof AlertDialog.Trigger>,
  "handle" | "children" | "render"
> & {
  /**
   * アラートダイアログ ({@link Root}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成し、{@link Root} と共有します。
   */
  handle: AlertDialogHandle;

  /**
   * ボタンとしてレンダリングする要素です。
   *
   * {@link AlertDialog.Trigger} の `render` プロパティーと同じ型で、
   * そのまま `render` に渡されます。
   */
  children: NonNullable<React.ComponentProps<typeof AlertDialog.Trigger>["render"]>;
};

/**
 * アラートダイアログを開くボタン要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link AlertDialog.Trigger} の
 * `render` プロパティーに渡されます。
 *
 * @example
 * ```tsx
 * <AlertDialogParts.Trigger handle={handle}>
 *   {(props) => <button type="button" {...props}>下書きを破棄</button>}
 * </AlertDialogParts.Trigger>
 * ```
 */
export const AlertDialogTrigger: Component<AlertDialogTriggerProps> =
  function SuiAlertDialogTrigger(props) {
    const { className, handle, children, ...otherProps } = props;

    return (
      <AlertDialog.Trigger
        {...otherProps}
        handle={handle}
        className={cn(className, "sui_alert_dialog_trigger")}
        render={children}
      />
    );
  };

/**
 * {@link AlertDialogTrigger} の型をまとめた名前空間です。
 */
export namespace Trigger {
  /**
   * {@link AlertDialogTrigger} の状態型です。
   */
  export type State = AlertDialogTriggerState;

  /**
   * {@link AlertDialogTrigger} のプロパティー型です。
   */
  export type Props = AlertDialogTriggerProps;
}

/**
 * {@link AlertDialogTrigger} の短縮名です。
 */
export const Trigger: Component<Trigger.Props> = AlertDialogTrigger;

// Portal
// ------

/**
 * {@link Portal} の状態です。
 */
export type AlertDialogPortalState = AlertDialog.Portal.State;

/**
 * {@link Portal} に渡すプロパティーです。
 */
export type AlertDialogPortalProps = React.ComponentProps<typeof AlertDialog.Portal>;

/**
 * アラートダイアログを DOM の別の場所へ移動する要素です。
 *
 * 既定では ポップアップを `<body>` の末尾に配置します。
 *
 * @example
 * ```tsx
 * <AlertDialogParts.Portal container={customContainer}>
 *   <AlertDialogParts.Popup>…</AlertDialogParts.Popup>
 * </AlertDialogParts.Portal>
 * ```
 */
export const AlertDialogPortal: Component<AlertDialogPortalProps> = function SuiAlertDialogPortal(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <AlertDialog.Portal {...otherProps} className={cn(className, "sui_alert_dialog_portal")} />
  );
};

/**
 * {@link AlertDialogPortal} の型をまとめた名前空間です。
 */
export namespace Portal {
  /**
   * {@link AlertDialogPortal} の状態型です。
   */
  export type State = AlertDialogPortalState;

  /**
   * {@link AlertDialogPortal} のプロパティー型です。
   */
  export type Props = AlertDialogPortalProps;
}

/**
 * {@link AlertDialogPortal} の短縮名です。
 */
export const Portal: Component<Portal.Props> = AlertDialogPortal;

// Backdrop
// --------

/**
 * {@link Backdrop} の状態です。
 */
export type AlertDialogBackdropState = AlertDialog.Backdrop.State;

/**
 * {@link Backdrop} に渡すプロパティーです。
 */
export type AlertDialogBackdropProps = React.ComponentProps<typeof AlertDialog.Backdrop>;

/**
 * ポップアップの背後に表示されるオーバーレイ要素です。
 *
 * @example
 * ```tsx
 * <AlertDialogParts.Backdrop />
 * ```
 */
export const AlertDialogBackdrop: Component<AlertDialogBackdropProps> =
  function SuiAlertDialogBackdrop(props) {
    const { className, ...otherProps } = props;

    return (
      <AlertDialog.Backdrop
        {...otherProps}
        className={cn(className, "sui_alert_dialog_backdrop")}
      />
    );
  };

/**
 * {@link AlertDialogBackdrop} の型をまとめた名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link AlertDialogBackdrop} の状態型です。
   */
  export type State = AlertDialogBackdropState;

  /**
   * {@link AlertDialogBackdrop} のプロパティー型です。
   */
  export type Props = AlertDialogBackdropProps;
}

/**
 * {@link AlertDialogBackdrop} の短縮名です。
 */
export const Backdrop: Component<Backdrop.Props> = AlertDialogBackdrop;

// Viewport
// --------

/**
 * {@link Viewport} の状態です。
 */
export type AlertDialogViewportState = AlertDialog.Viewport.State;

/**
 * {@link Viewport} に渡すプロパティーです。
 */
export type AlertDialogViewportProps = React.ComponentProps<typeof AlertDialog.Viewport>;

/**
 * ポップアップの配置コンテナー要素です。
 *
 * スクロール可能なオーバーレイを作り、ポップアップを中央に配置します。
 *
 * @example
 * ```tsx
 * <AlertDialogParts.Viewport>
 *   <AlertDialogParts.Popup>…</AlertDialogParts.Popup>
 * </AlertDialogParts.Viewport>
 * ```
 */
export const AlertDialogViewport: Component<AlertDialogViewportProps> =
  function SuiAlertDialogViewport(props) {
    const { className, ...otherProps } = props;

    return (
      <AlertDialog.Viewport
        {...otherProps}
        className={cn(className, "sui_alert_dialog_viewport")}
      />
    );
  };

/**
 * {@link AlertDialogViewport} の型をまとめた名前空間です。
 */
export namespace Viewport {
  /**
   * {@link AlertDialogViewport} の状態型です。
   */
  export type State = AlertDialogViewportState;

  /**
   * {@link AlertDialogViewport} のプロパティー型です。
   */
  export type Props = AlertDialogViewportProps;
}

/**
 * {@link AlertDialogViewport} の短縮名です。
 */
export const Viewport: Component<Viewport.Props> = AlertDialogViewport;

// Popup
// -----

/**
 * {@link Popup} の状態です。
 */
export type AlertDialogPopupState = AlertDialog.Popup.State;

/**
 * {@link Popup} に渡すプロパティーです。
 */
export type AlertDialogPopupProps = React.ComponentProps<typeof AlertDialog.Popup>;

/**
 * アラートダイアログの本文を表示する要素です。
 *
 * @example
 * ```tsx
 * <AlertDialogParts.Popup>
 *   <AlertDialogParts.Title>下書きを破棄しますか?</AlertDialogParts.Title>
 *   <AlertDialogParts.Description>この操作は元に戻せません。</AlertDialogParts.Description>
 * </AlertDialogParts.Popup>
 * ```
 */
export const AlertDialogPopup: Component<AlertDialogPopupProps> = function SuiAlertDialogPopup(
  props,
) {
  const { className, ...otherProps } = props;

  return <AlertDialog.Popup {...otherProps} className={cn(className, "sui_alert_dialog_popup")} />;
};

/**
 * {@link AlertDialogPopup} の型をまとめた名前空間です。
 */
export namespace Popup {
  /**
   * {@link AlertDialogPopup} の状態型です。
   */
  export type State = AlertDialogPopupState;

  /**
   * {@link AlertDialogPopup} のプロパティー型です。
   */
  export type Props = AlertDialogPopupProps;
}

/**
 * {@link AlertDialogPopup} の短縮名です。
 */
export const Popup: Component<Popup.Props> = AlertDialogPopup;

// Title
// -----

/**
 * {@link Title} の状態です。
 */
export type AlertDialogTitleState = AlertDialog.Title.State;

/**
 * {@link Title} に渡すプロパティーです。
 */
export type AlertDialogTitleProps = React.ComponentProps<typeof AlertDialog.Title>;

/**
 * アラートダイアログのタイトルを表示する見出し要素です。
 *
 * @example
 * ```tsx
 * <AlertDialogParts.Title>下書きを破棄しますか?</AlertDialogParts.Title>
 * ```
 */
export const AlertDialogTitle: Component<AlertDialogTitleProps> = function SuiAlertDialogTitle(
  props,
) {
  const { className, ...otherProps } = props;

  return <AlertDialog.Title {...otherProps} className={cn(className, "sui_alert_dialog_title")} />;
};

/**
 * {@link AlertDialogTitle} の型をまとめた名前空間です。
 */
export namespace Title {
  /**
   * {@link AlertDialogTitle} の状態型です。
   */
  export type State = AlertDialogTitleState;

  /**
   * {@link AlertDialogTitle} のプロパティー型です。
   */
  export type Props = AlertDialogTitleProps;
}

/**
 * {@link AlertDialogTitle} の短縮名です。
 */
export const Title: Component<Title.Props> = AlertDialogTitle;

// Description
// -----------

/**
 * {@link Description} の状態です。
 */
export type AlertDialogDescriptionState = AlertDialog.Description.State;

/**
 * {@link Description} に渡すプロパティーです。
 */
export type AlertDialogDescriptionProps = React.ComponentProps<typeof AlertDialog.Description>;

/**
 * アラートダイアログの説明文を表示する段落要素です。
 *
 * @example
 * ```tsx
 * <AlertDialogParts.Description>この操作は元に戻せません。</AlertDialogParts.Description>
 * ```
 */
export const AlertDialogDescription: Component<AlertDialogDescriptionProps> =
  function SuiAlertDialogDescription(props) {
    const { className, ...otherProps } = props;

    return (
      <AlertDialog.Description
        {...otherProps}
        className={cn(className, "sui_alert_dialog_description")}
      />
    );
  };

/**
 * {@link AlertDialogDescription} の型をまとめた名前空間です。
 */
export namespace Description {
  /**
   * {@link AlertDialogDescription} の状態型です。
   */
  export type State = AlertDialogDescriptionState;

  /**
   * {@link AlertDialogDescription} のプロパティー型です。
   */
  export type Props = AlertDialogDescriptionProps;
}

/**
 * {@link AlertDialogDescription} の短縮名です。
 */
export const Description: Component<Description.Props> = AlertDialogDescription;

// Close
// -----

/**
 * {@link Close} の状態です。
 */
export type AlertDialogCloseState = AlertDialog.Close.State;

/**
 * {@link Close} に渡すプロパティーです。
 */
export type AlertDialogCloseProps = Omit<
  React.ComponentProps<typeof AlertDialog.Close>,
  "children" | "render"
> & {
  /**
   * ボタンとしてレンダリングする要素です。
   *
   * {@link AlertDialog.Close} の `render` プロパティーと同じ型で、
   * そのまま `render` に渡されます。
   */
  children: NonNullable<React.ComponentProps<typeof AlertDialog.Close>["render"]>;
};

/**
 * アラートダイアログを閉じるボタン要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link AlertDialog.Close} の
 * `render` プロパティーに渡されます。
 *
 * @example
 * ```tsx
 * <AlertDialogParts.Close>
 *   {(props) => <button type="button" {...props}>キャンセル</button>}
 * </AlertDialogParts.Close>
 * ```
 */
export const AlertDialogClose: Component<AlertDialogCloseProps> = function SuiAlertDialogClose(
  props,
) {
  const { className, children, ...otherProps } = props;

  return (
    <AlertDialog.Close
      {...otherProps}
      className={cn(className, "sui_alert_dialog_close")}
      render={children}
    />
  );
};

/**
 * {@link AlertDialogClose} の型をまとめた名前空間です。
 */
export namespace Close {
  /**
   * {@link AlertDialogClose} の状態型です。
   */
  export type State = AlertDialogCloseState;

  /**
   * {@link AlertDialogClose} のプロパティー型です。
   */
  export type Props = AlertDialogCloseProps;
}

/**
 * {@link AlertDialogClose} の短縮名です。
 */
export const Close: Component<Close.Props> = AlertDialogClose;
