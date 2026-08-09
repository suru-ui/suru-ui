import { Dialog } from "@base-ui/react/dialog";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

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
 *
 * @example
 * ```tsx
 * const handle = DialogParts.createHandle();
 * ```
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
 *
 * @example
 * ```tsx
 * const handle = DialogParts.createHandle();
 *
 * <DialogParts.Root handle={handle}>
 *   <DialogParts.Trigger handle={handle}>
 *     {(props) => <button type="button" {...props}>通知を見る</button>}
 *   </DialogParts.Trigger>
 *   <DialogParts.Portal>
 *     <DialogParts.Popup>
 *       <DialogParts.Title>通知</DialogParts.Title>
 *       <DialogParts.Close>閉じる</DialogParts.Close>
 *     </DialogParts.Popup>
 *   </DialogParts.Portal>
 * </DialogParts.Root>
 * ```
 */
export const DialogRoot: Component<DialogRootProps> = function SuiDialogRoot(props) {
  return <Dialog.Root {...props} />;
};

/**
 * {@link DialogRoot} の型をまとめた名前空間です。
 */
export namespace Root {
  export type State = DialogRootState;
  export type Props = DialogRootProps;
}

/**
 * {@link DialogRoot} の短縮名です。
 */
export const Root: Component<Root.Props> = DialogRoot;

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
 *
 * @example
 * ```tsx
 * <DialogParts.Trigger>
 *   {(props) => <button type="button" {...props}>通知を見る</button>}
 * </DialogParts.Trigger>
 * ```
 */
export const DialogTrigger: Component<DialogTriggerProps> = function SuiDialogTrigger(props) {
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
  export type State = DialogTriggerState;
  export type Props = DialogTriggerProps;
}

/**
 * {@link DialogTrigger} の短縮名です。
 */
export const Trigger: Component<Trigger.Props> = DialogTrigger;

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
 *
 * @example
 * ```tsx
 * <DialogParts.Portal container={customContainer}>
 *   <DialogParts.Popup>…</DialogParts.Popup>
 * </DialogParts.Portal>
 * ```
 */
export const DialogPortal: Component<DialogPortalProps> = function SuiDialogPortal(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Portal {...otherProps} className={cn(className, "sui_dialog_portal")} />;
};

/**
 * {@link DialogPortal} の型をまとめた名前空間です。
 */
export namespace Portal {
  export type State = DialogPortalState;
  export type Props = DialogPortalProps;
}

/**
 * {@link DialogPortal} の短縮名です。
 */
export const Portal: Component<Portal.Props> = DialogPortal;

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
 *
 * @example
 * ```tsx
 * <DialogParts.Backdrop />
 * ```
 */
export const DialogBackdrop: Component<DialogBackdropProps> = function SuiDialogBackdrop(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Backdrop {...otherProps} className={cn(className, "sui_dialog_backdrop")} />;
};

/**
 * {@link DialogBackdrop} の型をまとめた名前空間です。
 */
export namespace Backdrop {
  export type State = DialogBackdropState;
  export type Props = DialogBackdropProps;
}

/**
 * {@link DialogBackdrop} の短縮名です。
 */
export const Backdrop: Component<Backdrop.Props> = DialogBackdrop;

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
 *
 * @example
 * ```tsx
 * <DialogParts.Viewport>
 *   <DialogParts.Popup>…</DialogParts.Popup>
 * </DialogParts.Viewport>
 * ```
 */
export const DialogViewport: Component<DialogViewportProps> = function SuiDialogViewport(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Viewport {...otherProps} className={cn(className, "sui_dialog_viewport")} />;
};

/**
 * {@link DialogViewport} の型をまとめた名前空間です。
 */
export namespace Viewport {
  export type State = DialogViewportState;
  export type Props = DialogViewportProps;
}

/**
 * {@link DialogViewport} の短縮名です。
 */
export const Viewport: Component<Viewport.Props> = DialogViewport;

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
 *
 * @example
 * ```tsx
 * <DialogParts.Popup>
 *   <DialogParts.Title>通知</DialogParts.Title>
 *   <DialogParts.Description>新しい通知はありません。</DialogParts.Description>
 * </DialogParts.Popup>
 * ```
 */
export const DialogPopup: Component<DialogPopupProps> = function SuiDialogPopup(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Popup {...otherProps} className={cn(className, "sui_dialog_popup")} />;
};

/**
 * {@link DialogPopup} の型をまとめた名前空間です。
 */
export namespace Popup {
  export type State = DialogPopupState;
  export type Props = DialogPopupProps;
}

/**
 * {@link DialogPopup} の短縮名です。
 */
export const Popup: Component<Popup.Props> = DialogPopup;

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
 *
 * @example
 * ```tsx
 * <DialogParts.Title>通知</DialogParts.Title>
 * ```
 */
export const DialogTitle: Component<DialogTitleProps> = function SuiDialogTitle(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Title {...otherProps} className={cn(className, "sui_dialog_title")} />;
};

/**
 * {@link DialogTitle} の型をまとめた名前空間です。
 */
export namespace Title {
  export type State = DialogTitleState;
  export type Props = DialogTitleProps;
}

/**
 * {@link DialogTitle} の短縮名です。
 */
export const Title: Component<Title.Props> = DialogTitle;

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
 *
 * @example
 * ```tsx
 * <DialogParts.Description>新しい通知はありません。</DialogParts.Description>
 * ```
 */
export const DialogDescription: Component<DialogDescriptionProps> = function SuiDialogDescription(
  props,
) {
  const { className, ...otherProps } = props;

  return <Dialog.Description {...otherProps} className={cn(className, "sui_dialog_description")} />;
};

/**
 * {@link DialogDescription} の型をまとめた名前空間です。
 */
export namespace Description {
  export type State = DialogDescriptionState;
  export type Props = DialogDescriptionProps;
}

/**
 * {@link DialogDescription} の短縮名です。
 */
export const Description: Component<Description.Props> = DialogDescription;

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
 *
 * @example
 * ```tsx
 * <DialogParts.Close>
 *   {(props) => <button type="button" {...props}>閉じる</button>}
 * </DialogParts.Close>
 * ```
 */
export const DialogClose: Component<DialogCloseProps> = function SuiDialogClose(props) {
  const { className, children, ...otherProps } = props;

  return (
    <Dialog.Close {...otherProps} className={cn(className, "sui_dialog_close")} render={children} />
  );
};

/**
 * {@link DialogClose} の型をまとめた名前空間です。
 */
export namespace Close {
  export type State = DialogCloseState;
  export type Props = DialogCloseProps;
}

/**
 * {@link DialogClose} の短縮名です。
 */
export const Close: Component<Close.Props> = DialogClose;
