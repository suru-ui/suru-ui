import { AlertDialog } from "@base-ui/react/alert-dialog";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

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
 * 作成したハンドルを {@link Root} と {@link Trigger} または {@link AlertDialog} の `handle` プロパティーに渡すことで、トリガーとダイアログの内容を関連付けます。
 */
export const createHandle: typeof AlertDialog.createHandle = AlertDialog.createHandle;

// Root
// ----

/**
 * {@link AlertDialogRoot} の状態です。
 */
export type AlertDialogRootState = AlertDialog.Root.State;

/**
 * {@link AlertDialogRoot} に渡すプロパティーです。
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
 */
export const AlertDialogRoot: IComponent<AlertDialogRootProps> = function SuiAlertDialogRoot(
  props,
) {
  return <AlertDialog.Root {...props} />;
};

/**
 * {@link AlertDialogRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link AlertDialogRootState} です。
   */
  export type State = AlertDialogRootState;

  /**
   * {@link AlertDialogRootProps} です。
   */
  export type Props = AlertDialogRootProps;
}

/**
 * {@link AlertDialogRoot} です。
 */
export const Root: IComponent<Root.Props> = AlertDialogRoot;

// Trigger
// -------

/**
 * {@link AlertDialogTrigger} の状態です。
 */
export type AlertDialogTriggerState = AlertDialog.Trigger.State;

/**
 * {@link AlertDialogTrigger} に渡すプロパティーです。
 */
export type AlertDialogTriggerProps = Omit<
  React.ComponentProps<typeof AlertDialog.Trigger>,
  "handle" | "children" | "render"
> & {
  /**
   * ボタンとしてレンダリングする要素です。
   *
   * {@link AlertDialog.Trigger} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<React.ComponentProps<typeof AlertDialog.Trigger>["render"]>;

  /**
   * アラートダイアログ ({@link Root}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成し、{@link Root} と共有します。
   */
  handle: AlertDialogHandle;
};

/**
 * アラートダイアログを開くボタン要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link AlertDialog.Trigger} の `render` プロパティーに渡されます。
 */
export const AlertDialogTrigger: IComponent<AlertDialogTriggerProps> =
  function SuiAlertDialogTrigger(props) {
    const { handle, children, className, ...otherProps } = props;

    return (
      <AlertDialog.Trigger
        {...otherProps}
        handle={handle}
        render={children}
        className={cn(className, "sui_alert_dialog_trigger")}
      />
    );
  };

/**
 * {@link AlertDialogTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link AlertDialogTriggerState} です。
   */
  export type State = AlertDialogTriggerState;

  /**
   * {@link AlertDialogTriggerProps} です。
   */
  export type Props = AlertDialogTriggerProps;
}

/**
 * {@link AlertDialogTrigger} です。
 */
export const Trigger: IComponent<Trigger.Props> = AlertDialogTrigger;

// Portal
// ------

/**
 * {@link AlertDialogPortal} の状態です。
 */
export type AlertDialogPortalState = AlertDialog.Portal.State;

/**
 * {@link AlertDialogPortal} に渡すプロパティーです。
 */
export type AlertDialogPortalProps = React.ComponentProps<typeof AlertDialog.Portal>;

/**
 * アラートダイアログを DOM の別の場所へ移動する要素です。
 *
 * 既定では ポップアップを `<body>` の末尾に配置します。
 */
export const AlertDialogPortal: IComponent<AlertDialogPortalProps> = function SuiAlertDialogPortal(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <AlertDialog.Portal {...otherProps} className={cn(className, "sui_alert_dialog_portal")} />
  );
};

/**
 * {@link AlertDialogPortal} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Portal {
  /**
   * {@link AlertDialogPortalState} です。
   */
  export type State = AlertDialogPortalState;

  /**
   * {@link AlertDialogPortalProps} です。
   */
  export type Props = AlertDialogPortalProps;
}

/**
 * {@link AlertDialogPortal} です。
 */
export const Portal: IComponent<Portal.Props> = AlertDialogPortal;

// Backdrop
// --------

/**
 * {@link AlertDialogBackdrop} の状態です。
 */
export type AlertDialogBackdropState = AlertDialog.Backdrop.State;

/**
 * {@link AlertDialogBackdrop} に渡すプロパティーです。
 */
export type AlertDialogBackdropProps = React.ComponentProps<typeof AlertDialog.Backdrop>;

/**
 * ポップアップの背後に表示されるオーバーレイ要素です。
 */
export const AlertDialogBackdrop: IComponent<AlertDialogBackdropProps> =
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
 * {@link AlertDialogBackdrop} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link AlertDialogBackdropState} です。
   */
  export type State = AlertDialogBackdropState;

  /**
   * {@link AlertDialogBackdropProps} です。
   */
  export type Props = AlertDialogBackdropProps;
}

/**
 * {@link AlertDialogBackdrop} です。
 */
export const Backdrop: IComponent<Backdrop.Props> = AlertDialogBackdrop;

// Viewport
// --------

/**
 * {@link AlertDialogViewport} の状態です。
 */
export type AlertDialogViewportState = AlertDialog.Viewport.State;

/**
 * {@link AlertDialogViewport} に渡すプロパティーです。
 */
export type AlertDialogViewportProps = React.ComponentProps<typeof AlertDialog.Viewport>;

/**
 * ポップアップの配置コンテナー要素です。
 *
 * スクロール可能なオーバーレイを作り、ポップアップを中央に配置します。
 */
export const AlertDialogViewport: IComponent<AlertDialogViewportProps> =
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
 * {@link AlertDialogViewport} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Viewport {
  /**
   * {@link AlertDialogViewportState} です。
   */
  export type State = AlertDialogViewportState;

  /**
   * {@link AlertDialogViewportProps} です。
   */
  export type Props = AlertDialogViewportProps;
}

/**
 * {@link AlertDialogViewport} です。
 */
export const Viewport: IComponent<Viewport.Props> = AlertDialogViewport;

// Popup
// -----

/**
 * {@link AlertDialogPopup} の状態です。
 */
export type AlertDialogPopupState = AlertDialog.Popup.State;

/**
 * {@link AlertDialogPopup} に渡すプロパティーです。
 */
export type AlertDialogPopupProps = React.ComponentProps<typeof AlertDialog.Popup>;

/**
 * アラートダイアログの本文を表示する要素です。
 */
export const AlertDialogPopup: IComponent<AlertDialogPopupProps> = function SuiAlertDialogPopup(
  props,
) {
  const { className, ...otherProps } = props;

  return <AlertDialog.Popup {...otherProps} className={cn(className, "sui_alert_dialog_popup")} />;
};

/**
 * {@link AlertDialogPopup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Popup {
  /**
   * {@link AlertDialogPopupState} です。
   */
  export type State = AlertDialogPopupState;

  /**
   * {@link AlertDialogPopupProps} です。
   */
  export type Props = AlertDialogPopupProps;
}

/**
 * {@link AlertDialogPopup} です。
 */
export const Popup: IComponent<Popup.Props> = AlertDialogPopup;

// Title
// -----

/**
 * {@link AlertDialogTitle} の状態です。
 */
export type AlertDialogTitleState = AlertDialog.Title.State;

/**
 * {@link AlertDialogTitle} に渡すプロパティーです。
 */
export type AlertDialogTitleProps = React.ComponentProps<typeof AlertDialog.Title>;

/**
 * アラートダイアログのタイトルを表示する見出し要素です。
 */
export const AlertDialogTitle: IComponent<AlertDialogTitleProps> = function SuiAlertDialogTitle(
  props,
) {
  const { className, ...otherProps } = props;

  return <AlertDialog.Title {...otherProps} className={cn(className, "sui_alert_dialog_title")} />;
};

/**
 * {@link AlertDialogTitle} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Title {
  /**
   * {@link AlertDialogTitleState} です。
   */
  export type State = AlertDialogTitleState;

  /**
   * {@link AlertDialogTitleProps} です。
   */
  export type Props = AlertDialogTitleProps;
}

/**
 * {@link AlertDialogTitle} です。
 */
export const Title: IComponent<Title.Props> = AlertDialogTitle;

// Description
// -----------

/**
 * {@link AlertDialogDescription} の状態です。
 */
export type AlertDialogDescriptionState = AlertDialog.Description.State;

/**
 * {@link AlertDialogDescription} に渡すプロパティーです。
 */
export type AlertDialogDescriptionProps = React.ComponentProps<typeof AlertDialog.Description>;

/**
 * アラートダイアログの説明文を表示する段落要素です。
 */
export const AlertDialogDescription: IComponent<AlertDialogDescriptionProps> =
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
 * {@link AlertDialogDescription} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Description {
  /**
   * {@link AlertDialogDescriptionState} です。
   */
  export type State = AlertDialogDescriptionState;

  /**
   * {@link AlertDialogDescriptionProps} です。
   */
  export type Props = AlertDialogDescriptionProps;
}

/**
 * {@link AlertDialogDescription} です。
 */
export const Description: IComponent<Description.Props> = AlertDialogDescription;

// Close
// -----

/**
 * {@link AlertDialogClose} の状態です。
 */
export type AlertDialogCloseState = AlertDialog.Close.State;

/**
 * {@link AlertDialogClose} に渡すプロパティーです。
 */
export type AlertDialogCloseProps = Omit<
  React.ComponentProps<typeof AlertDialog.Close>,
  "children" | "render"
> & {
  /**
   * ボタンとしてレンダリングする要素です。
   *
   * {@link AlertDialog.Close} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<React.ComponentProps<typeof AlertDialog.Close>["render"]>;
};

/**
 * アラートダイアログを閉じるボタン要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link AlertDialog.Close} の `render` プロパティーに渡されます。
 */
export const AlertDialogClose: IComponent<AlertDialogCloseProps> = function SuiAlertDialogClose(
  props,
) {
  const { children, className, ...otherProps } = props;

  return (
    <AlertDialog.Close
      {...otherProps}
      render={children}
      className={cn(className, "sui_alert_dialog_close")}
    />
  );
};

/**
 * {@link AlertDialogClose} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Close {
  /**
   * {@link AlertDialogCloseState} です。
   */
  export type State = AlertDialogCloseState;

  /**
   * {@link AlertDialogCloseProps} です。
   */
  export type Props = AlertDialogCloseProps;
}

/**
 * {@link AlertDialogClose} です。
 */
export const Close: IComponent<Close.Props> = AlertDialogClose;
