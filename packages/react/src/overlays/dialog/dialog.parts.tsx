import { Dialog } from "@base-ui/react/dialog";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./dialog.css";

// Types
// -----

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
 * {@link Root} の状態です。
 */
export type DialogRootState = Dialog.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
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
 * {@link DialogRoot} の型をまとめた名前空間です。
 */
export namespace Root {
  /**
   * {@link DialogRoot} の状態型です。
   */
  export type State = DialogRootState;

  /**
   * {@link DialogRoot} のプロパティー型です。
   */
  export type Props = DialogRootProps;
}

/**
 * {@link DialogRoot} の短縮名です。
 */
export const Root: IComponent<Root.Props> = DialogRoot;

// Trigger
// -------

/**
 * {@link Trigger} の状態です。
 */
export type DialogTriggerState = Dialog.Trigger.State;

/**
 * {@link Trigger} に渡すプロパティーです。
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
  const { className, handle, children, ...otherProps } = props;

  return (
    <Dialog.Trigger
      {...otherProps}
      handle={handle}
      className={cn(className, "sui_dialog_trigger")}
      render={children}
    />
  );
};

/**
 * {@link DialogTrigger} の型をまとめた名前空間です。
 */
export namespace Trigger {
  /**
   * {@link DialogTrigger} の状態型です。
   */
  export type State = DialogTriggerState;

  /**
   * {@link DialogTrigger} のプロパティー型です。
   */
  export type Props = DialogTriggerProps;
}

/**
 * {@link DialogTrigger} の短縮名です。
 */
export const Trigger: IComponent<Trigger.Props> = DialogTrigger;

// Portal
// ------

/**
 * {@link Portal} の状態です。
 */
export type DialogPortalState = Dialog.Portal.State;

/**
 * {@link Portal} に渡すプロパティーです。
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
 * {@link DialogPortal} の型をまとめた名前空間です。
 */
export namespace Portal {
  /**
   * {@link DialogPortal} の状態型です。
   */
  export type State = DialogPortalState;

  /**
   * {@link DialogPortal} のプロパティー型です。
   */
  export type Props = DialogPortalProps;
}

/**
 * {@link DialogPortal} の短縮名です。
 */
export const Portal: IComponent<Portal.Props> = DialogPortal;

// Backdrop
// --------

/**
 * {@link Backdrop} の状態です。
 */
export type DialogBackdropState = Dialog.Backdrop.State;

/**
 * {@link Backdrop} に渡すプロパティーです。
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
 * {@link DialogBackdrop} の型をまとめた名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link DialogBackdrop} の状態型です。
   */
  export type State = DialogBackdropState;

  /**
   * {@link DialogBackdrop} のプロパティー型です。
   */
  export type Props = DialogBackdropProps;
}

/**
 * {@link DialogBackdrop} の短縮名です。
 */
export const Backdrop: IComponent<Backdrop.Props> = DialogBackdrop;

// Viewport
// --------

/**
 * {@link Viewport} の状態です。
 */
export type DialogViewportState = Dialog.Viewport.State;

/**
 * {@link Viewport} に渡すプロパティーです。
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
 * {@link DialogViewport} の型をまとめた名前空間です。
 */
export namespace Viewport {
  /**
   * {@link DialogViewport} の状態型です。
   */
  export type State = DialogViewportState;

  /**
   * {@link DialogViewport} のプロパティー型です。
   */
  export type Props = DialogViewportProps;
}

/**
 * {@link DialogViewport} の短縮名です。
 */
export const Viewport: IComponent<Viewport.Props> = DialogViewport;

// Popup
// -----

/**
 * {@link Popup} の状態です。
 */
export type DialogPopupState = Dialog.Popup.State;

/**
 * {@link Popup} に渡すプロパティーです。
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
 * {@link DialogPopup} の型をまとめた名前空間です。
 */
export namespace Popup {
  /**
   * {@link DialogPopup} の状態型です。
   */
  export type State = DialogPopupState;

  /**
   * {@link DialogPopup} のプロパティー型です。
   */
  export type Props = DialogPopupProps;
}

/**
 * {@link DialogPopup} の短縮名です。
 */
export const Popup: IComponent<Popup.Props> = DialogPopup;

// Title
// -----

/**
 * {@link Title} の状態です。
 */
export type DialogTitleState = Dialog.Title.State;

/**
 * {@link Title} に渡すプロパティーです。
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
 * {@link DialogTitle} の型をまとめた名前空間です。
 */
export namespace Title {
  /**
   * {@link DialogTitle} の状態型です。
   */
  export type State = DialogTitleState;

  /**
   * {@link DialogTitle} のプロパティー型です。
   */
  export type Props = DialogTitleProps;
}

/**
 * {@link DialogTitle} の短縮名です。
 */
export const Title: IComponent<Title.Props> = DialogTitle;

// Description
// -----------

/**
 * {@link Description} の状態です。
 */
export type DialogDescriptionState = Dialog.Description.State;

/**
 * {@link Description} に渡すプロパティーです。
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
 * {@link DialogDescription} の型をまとめた名前空間です。
 */
export namespace Description {
  /**
   * {@link DialogDescription} の状態型です。
   */
  export type State = DialogDescriptionState;

  /**
   * {@link DialogDescription} のプロパティー型です。
   */
  export type Props = DialogDescriptionProps;
}

/**
 * {@link DialogDescription} の短縮名です。
 */
export const Description: IComponent<Description.Props> = DialogDescription;

// Close
// -----

/**
 * {@link Close} の状態です。
 */
export type DialogCloseState = Dialog.Close.State;

/**
 * {@link Close} に渡すプロパティーです。
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
  const { className, children, ...otherProps } = props;

  return (
    <Dialog.Close {...otherProps} className={cn(className, "sui_dialog_close")} render={children} />
  );
};

/**
 * {@link DialogClose} の型をまとめた名前空間です。
 */
export namespace Close {
  /**
   * {@link DialogClose} の状態型です。
   */
  export type State = DialogCloseState;

  /**
   * {@link DialogClose} のプロパティー型です。
   */
  export type Props = DialogCloseProps;
}

/**
 * {@link DialogClose} の短縮名です。
 */
export const Close: IComponent<Close.Props> = DialogClose;
