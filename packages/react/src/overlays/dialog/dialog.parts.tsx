import { Dialog } from "@base-ui/react/dialog";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./dialog.css";

// Handle
// ------

/**
 * ダイアログを制御するハンドルです。
 */
export type DialogHandle = Dialog.Handle<unknown>;

/**
 * ダイアログを制御するハンドルを新しく作成します。
 *
 * 作成したハンドルを {@link Root} と {@link Trigger} の `handle` プロパティーに渡すことで、
 * トリガーとダイアログの内容を関連付けます。
 */
export const createHandle: typeof Dialog.createHandle = Dialog.createHandle;

// Root
// ----

/**
 * {@link DialogRoot} の状態です。
 */
export type DialogRootState = Dialog.Root.State;

/**
 * {@link DialogRoot} に渡すプロパティーです。
 */
export type DialogRootProps = Omit<React.ComponentProps<typeof Dialog.Root>, "handle"> & {
  /**
   * ダイアログとトリガー ({@link Trigger}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成します。
   */
  handle: DialogHandle;
};

/**
 * ダイアログのルートです。
 *
 * ダイアログの開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const DialogRoot: IComponent<DialogRootProps> = function SuiDialogRoot(props) {
  return <Dialog.Root {...props} />;
};

/**
 * {@link DialogRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link DialogRootState} です。
   */
  export type State = DialogRootState;

  /**
   * {@link DialogRootProps} です。
   */
  export type Props = DialogRootProps;
}

/**
 * {@link DialogRoot} です。
 */
export const Root: IComponent<Root.Props> = DialogRoot;

// Trigger
// -------

/**
 * {@link DialogTrigger} の状態です。
 */
export type DialogTriggerState = Dialog.Trigger.State;

/**
 * {@link DialogTrigger} に渡すプロパティーです。
 */
export type DialogTriggerProps = Omit<
  React.ComponentProps<typeof Dialog.Trigger>,
  "handle" | "children" | "render"
> & {
  /**
   * ダイアログ ({@link Root}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成し、{@link Root} と共有します。
   */
  handle: DialogHandle;

  /**
   * ボタンとしてレンダリングする要素です。
   *
   * {@link Dialog.Trigger} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<React.ComponentProps<typeof Dialog.Trigger>["render"]>;
};

/**
 * ダイアログを開くボタン要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link Dialog.Trigger} の `render` プロパティーに渡されます。
 */
export const DialogTrigger: IComponent<DialogTriggerProps> = function SuiDialogTrigger(props) {
  const { handle, children, className, ...otherProps } = props;

  return (
    <Dialog.Trigger
      {...otherProps}
      handle={handle}
      render={children}
      className={cn(className, "sui_dialog_trigger")}
    />
  );
};

/**
 * {@link DialogTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link DialogTriggerState} です。
   */
  export type State = DialogTriggerState;

  /**
   * {@link DialogTriggerProps} です。
   */
  export type Props = DialogTriggerProps;
}

/**
 * {@link DialogTrigger} です。
 */
export const Trigger: IComponent<Trigger.Props> = DialogTrigger;

// Portal
// ------

/**
 * {@link DialogPortal} の状態です。
 */
export type DialogPortalState = Dialog.Portal.State;

/**
 * {@link DialogPortal} に渡すプロパティーです。
 */
export type DialogPortalProps = React.ComponentProps<typeof Dialog.Portal>;

/**
 * ダイアログを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const DialogPortal: IComponent<DialogPortalProps> = function SuiDialogPortal(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Portal {...otherProps} className={cn(className, "sui_dialog_portal")} />;
};

/**
 * {@link DialogPortal} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Portal {
  /**
   * {@link DialogPortalState} です。
   */
  export type State = DialogPortalState;

  /**
   * {@link DialogPortalProps} です。
   */
  export type Props = DialogPortalProps;
}

/**
 * {@link DialogPortal} です。
 */
export const Portal: IComponent<Portal.Props> = DialogPortal;

// Backdrop
// --------

/**
 * {@link DialogBackdrop} の状態です。
 */
export type DialogBackdropState = Dialog.Backdrop.State;

/**
 * {@link DialogBackdrop} に渡すプロパティーです。
 */
export type DialogBackdropProps = React.ComponentProps<typeof Dialog.Backdrop>;

/**
 * ポップアップの背後に表示されるオーバーレイ要素です。
 */
export const DialogBackdrop: IComponent<DialogBackdropProps> = function SuiDialogBackdrop(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Backdrop {...otherProps} className={cn(className, "sui_dialog_backdrop")} />;
};

/**
 * {@link DialogBackdrop} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link DialogBackdropState} です。
   */
  export type State = DialogBackdropState;

  /**
   * {@link DialogBackdropProps} です。
   */
  export type Props = DialogBackdropProps;
}

/**
 * {@link DialogBackdrop} です。
 */
export const Backdrop: IComponent<Backdrop.Props> = DialogBackdrop;

// Viewport
// --------

/**
 * {@link DialogViewport} の状態です。
 */
export type DialogViewportState = Dialog.Viewport.State;

/**
 * {@link DialogViewport} に渡すプロパティーです。
 */
export type DialogViewportProps = React.ComponentProps<typeof Dialog.Viewport>;

/**
 * ポップアップの配置コンテナー要素です。
 *
 * スクロール可能なオーバーレイを作り、ポップアップを中央に配置します。
 */
export const DialogViewport: IComponent<DialogViewportProps> = function SuiDialogViewport(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Viewport {...otherProps} className={cn(className, "sui_dialog_viewport")} />;
};

/**
 * {@link DialogViewport} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Viewport {
  /**
   * {@link DialogViewportState} です。
   */
  export type State = DialogViewportState;

  /**
   * {@link DialogViewportProps} です。
   */
  export type Props = DialogViewportProps;
}

/**
 * {@link DialogViewport} です。
 */
export const Viewport: IComponent<Viewport.Props> = DialogViewport;

// Popup
// -----

/**
 * {@link DialogPopup} の状態です。
 */
export type DialogPopupState = Dialog.Popup.State;

/**
 * {@link DialogPopup} に渡すプロパティーです。
 */
export type DialogPopupProps = React.ComponentProps<typeof Dialog.Popup>;

/**
 * ダイアログの本文を表示する要素です。
 *
 * `initialFocus` と `finalFocus` を使うと、開閉時に移動するフォーカス先を指定できます。
 */
export const DialogPopup: IComponent<DialogPopupProps> = function SuiDialogPopup(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Popup {...otherProps} className={cn(className, "sui_dialog_popup")} />;
};

/**
 * {@link DialogPopup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Popup {
  /**
   * {@link DialogPopupState} です。
   */
  export type State = DialogPopupState;

  /**
   * {@link DialogPopupProps} です。
   */
  export type Props = DialogPopupProps;
}

/**
 * {@link DialogPopup} です。
 */
export const Popup: IComponent<Popup.Props> = DialogPopup;

// Title
// -----

/**
 * {@link DialogTitle} の状態です。
 */
export type DialogTitleState = Dialog.Title.State;

/**
 * {@link DialogTitle} に渡すプロパティーです。
 */
export type DialogTitleProps = React.ComponentProps<typeof Dialog.Title>;

/**
 * ダイアログのタイトルを表示する見出し要素です。
 */
export const DialogTitle: IComponent<DialogTitleProps> = function SuiDialogTitle(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Title {...otherProps} className={cn(className, "sui_dialog_title")} />;
};

/**
 * {@link DialogTitle} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Title {
  /**
   * {@link DialogTitleState} です。
   */
  export type State = DialogTitleState;

  /**
   * {@link DialogTitleProps} です。
   */
  export type Props = DialogTitleProps;
}

/**
 * {@link DialogTitle} です。
 */
export const Title: IComponent<Title.Props> = DialogTitle;

// Description
// -----------

/**
 * {@link DialogDescription} の状態です。
 */
export type DialogDescriptionState = Dialog.Description.State;

/**
 * {@link DialogDescription} に渡すプロパティーです。
 */
export type DialogDescriptionProps = React.ComponentProps<typeof Dialog.Description>;

/**
 * ダイアログの説明文を表示する段落要素です。
 */
export const DialogDescription: IComponent<DialogDescriptionProps> = function SuiDialogDescription(
  props,
) {
  const { className, ...otherProps } = props;

  return <Dialog.Description {...otherProps} className={cn(className, "sui_dialog_description")} />;
};

/**
 * {@link DialogDescription} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Description {
  /**
   * {@link DialogDescriptionState} です。
   */
  export type State = DialogDescriptionState;

  /**
   * {@link DialogDescriptionProps} です。
   */
  export type Props = DialogDescriptionProps;
}

/**
 * {@link DialogDescription} です。
 */
export const Description: IComponent<Description.Props> = DialogDescription;

// Close
// -----

/**
 * {@link DialogClose} の状態です。
 */
export type DialogCloseState = Dialog.Close.State;

/**
 * {@link DialogClose} に渡すプロパティーです。
 */
export type DialogCloseProps = Omit<
  React.ComponentProps<typeof Dialog.Close>,
  "children" | "render"
> & {
  /**
   * ボタンとしてレンダリングする要素です。
   *
   * {@link Dialog.Close} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<React.ComponentProps<typeof Dialog.Close>["render"]>;
};

/**
 * ダイアログを閉じるボタン要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link Dialog.Close} の `render` プロパティーに渡されます。
 */
export const DialogClose: IComponent<DialogCloseProps> = function SuiDialogClose(props) {
  const { children, className, ...otherProps } = props;

  return (
    <Dialog.Close {...otherProps} render={children} className={cn(className, "sui_dialog_close")} />
  );
};

/**
 * {@link DialogClose} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Close {
  /**
   * {@link DialogCloseState} です。
   */
  export type State = DialogCloseState;

  /**
   * {@link DialogCloseProps} です。
   */
  export type Props = DialogCloseProps;
}

/**
 * {@link DialogClose} です。
 */
export const Close: IComponent<Close.Props> = DialogClose;
