import { Dialog } from "@base-ui/react/dialog";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./dialog.css";

// Context
// -------

/**
 * ダイアログの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type DialogContentContextRadius = "none" | Size;

/**
 * {@link DialogContent} が子パーツへ提供するコンテキストです。
 */
export type DialogContentContext = {
  /**
   * ダイアログの角丸の大きさです。
   */
  readonly radius: DialogContentContextRadius;
};

/**
 * {@link DialogContent} が子パーツへ提供するコンテキストです。
 */
export const DialogContentContext: React.Context<DialogContentContext | null> =
  React.createContext<DialogContentContext | null>(null);

function useSuiDialogContentContext(optional?: false): DialogContentContext;
function useSuiDialogContentContext(optional?: boolean): DialogContentContext | null;
function useSuiDialogContentContext(optional?: boolean): DialogContentContext | null {
  const ctx = React.use(DialogContentContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "DialogContentContext",
      providerName: "DialogContent",
    });
  }

  return ctx;
}

/**
 * {@link DialogContentContext} を読み取るフックです。
 */
export const useDialogContentContext: IUseContext<DialogContentContext> =
  useSuiDialogContentContext;

export { DialogContentContext as ContentContext, useDialogContentContext as useContentContext };

export namespace ContentContext {
  /**
   * {@link DialogContentContextRadius}
   */
  export type Radius = DialogContentContextRadius;
}

// Handle
// ------

/**
 * ダイアログを命令的に制御するハンドルです。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export interface DialogHandle<TPayload = any> extends Dialog.Handle<TPayload> {}

interface ICreateHandle {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   * @returns ダイアログを命令的に制御するハンドルです。
   */
  <TPayload = any>(): DialogHandle<TPayload>;
}

/**
 * {@link DialogHandle} を作成する関数です。
 */
export const createDialogHandle: ICreateHandle = function createSuiDialogHandle() {
  return Dialog.createHandle();
};

export { type DialogHandle as Handle, createDialogHandle as createHandle };

// Root
// ----

/**
 * ダイアログを命令的に操作するためのオブジェクトです。
 */
export type DialogRootActions = Dialog.Root.Actions;

/**
 * ダイアログの開閉状態を変更されるイベントの詳細です。
 */
export type DialogRootChangeEventDetails = Dialog.Root.ChangeEventDetails;

/**
 * ダイアログの開閉状態が変更される理由です。
 */
export type DialogRootChangeEventReason = Dialog.Root.ChangeEventReason;

/**
 * {@link DialogRoot} が持つ状態です。
 */
export type DialogRootState = Dialog.Root.State;

/**
 * {@link DialogRoot} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DialogRootProps<TPayload = any> = Omit<
  React.ComponentProps<typeof Dialog.Root>,
  "handle"
> & {
  /**
   * トリガーとダイアログに関連付けるためのハンドルです。
   */
  handle: DialogHandle<TPayload>;
};

interface IDialogRoot extends IComponent<DialogRootProps> {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   */
  <TPayload = any>(props: DialogRootProps<TPayload>): IComponent.Return;
}

/**
 * ダイアログのルートコンポーネントです。
 *
 * ダイアログの開閉状態を管理し、各パーツをグループ化します。それ自身は HTML 要素をレンダリングしません。
 */
export const DialogRoot: IDialogRoot = function SuiDialogRoot(props: DialogRootProps) {
  return <Dialog.Root {...props} />;
};

export { DialogRoot as Root };

export namespace Root {
  /**
   * {@link DialogRootState}
   */
  export type State = DialogRootState;

  /**
   * {@link DialogRootProps}
   */
  export type Props<TPayload = any> = DialogRootProps<TPayload>;

  /**
   * {@link DialogRootActions}
   */
  export type Actions = DialogRootActions;

  /**
   * {@link DialogRootChangeEventDetails}
   */
  export type ChangeEventDetails = DialogRootChangeEventDetails;

  /**
   * {@link DialogRootChangeEventReason}
   */
  export type ChangeEventReason = DialogRootChangeEventReason;
}

// ToggleTrigger
// -------------

/**
 * {@link DialogToggleTrigger} が持つ状態です。
 */
export type DialogToggleTriggerState = Dialog.Trigger.State;

/**
 * {@link DialogToggleTrigger} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DialogToggleTriggerProps<TPayload = any> = Omit<
  React.ComponentProps<typeof Dialog.Trigger>,
  "handle" | "children" | "render"
> & {
  /**
   * ボタンとしてレンダリングする要素です。
   */
  children: NonNullable<React.ComponentProps<typeof Dialog.Trigger>["render"]>;

  /**
   * トリガーとダイアログに関連付けるためのハンドルです。
   */
  handle: DialogHandle<TPayload>;
};

/**
 * ダイアログを開くボタンコンポーネントです。
 */
export const DialogToggleTrigger: IComponent<DialogToggleTriggerProps> =
  function SuiDialogToggleTrigger(props) {
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

export { DialogToggleTrigger as ToggleTrigger };

export namespace ToggleTrigger {
  /**
   * {@link DialogToggleTriggerState}
   */
  export type State = DialogToggleTriggerState;

  /**
   * {@link DialogToggleTriggerProps}
   */
  export type Props = DialogToggleTriggerProps;
}

// Portal
// ------

/**
 * {@link DialogPortal} が持つ状態です。
 */
export type DialogPortalState = Dialog.Portal.State;

/**
 * {@link DialogPortal} に渡す props です。
 */
export type DialogPortalProps = React.ComponentProps<typeof Dialog.Portal>;

/**
 * ダイアログを DOM の別の場所に配置するコンポーネントです。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const DialogPortal: IComponent<DialogPortalProps> = function SuiDialogPortal(props) {
  const {
    // @ts-expect-error
    "data-scope": dataScope = "",
    className,
    ...otherProps
  } = props;

  return (
    <Dialog.Portal
      {...otherProps}
      className={cn(className, "sui_dialog_portal")}
      data-scope={dataScope}
    />
  );
};

export { DialogPortal as Portal };

export namespace Portal {
  /**
   * {@link DialogPortalState}
   */
  export type State = DialogPortalState;

  /**
   * {@link DialogPortalProps}
   */
  export type Props = DialogPortalProps;
}

// Backdrop
// --------

/**
 * {@link DialogBackdrop} が持つ状態です。
 */
export type DialogBackdropState = Dialog.Backdrop.State;

/**
 * {@link DialogBackdrop} に渡す props です。
 */
export type DialogBackdropProps = React.ComponentProps<typeof Dialog.Backdrop>;

/**
 * ポップアップの背後に表示されるオーバーレイコンポーネントです。
 */
export const DialogBackdrop: IComponent<DialogBackdropProps> = function SuiDialogBackdrop(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Backdrop {...otherProps} className={cn(className, "sui_dialog_backdrop")} />;
};

export { DialogBackdrop as Backdrop };

export namespace Backdrop {
  /**
   * {@link DialogBackdropState}
   */
  export type State = DialogBackdropState;

  /**
   * {@link DialogBackdropProps}
   */
  export type Props = DialogBackdropProps;
}

// Viewport
// --------

/**
 * {@link DialogViewport} が持つ状態です。
 */
export type DialogViewportState = Dialog.Viewport.State;

/**
 * {@link DialogViewport} に渡す props です。
 */
export type DialogViewportProps = React.ComponentProps<typeof Dialog.Viewport>;

/**
 * ポップアップの配置コンテナーコンポーネントです。
 *
 * スクロール可能なオーバーレイを作り、ポップアップを中央に配置します。
 */
export const DialogViewport: IComponent<DialogViewportProps> = function SuiDialogViewport(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Viewport {...otherProps} className={cn(className, "sui_dialog_viewport")} />;
};

export { DialogViewport as Viewport };

export namespace Viewport {
  /**
   * {@link DialogViewportState}
   */
  export type State = DialogViewportState;

  /**
   * {@link DialogViewportProps}
   */
  export type Props = DialogViewportProps;
}

// Content
// -------

/**
 * ダイアログの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type DialogContentRadius = "none" | Size;

/**
 * ダイアログの主な外観です。
 *
 * - `"default"`: 規定のスタイル
 * - `"stacked"`: 積み重なっているスタイル
 */
export type DialogContentVariant = "default" | "stacked";

/**
 * {@link DialogContent} が持つ状態です。
 */
export type DialogContentState = Dialog.Popup.State;

/**
 * {@link DialogContent} に渡す props です。
 */
export type DialogContentProps = React.ComponentProps<typeof Dialog.Popup> & {
  /**
   * ダイアログに枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * ダイアログの角丸の大きさを指定します。
   *
   * @default "md"
   */
  radius?: DialogContentRadius | undefined;

  /**
   * ダイアログの主な外観を指定します。
   *
   * @default "default"
   */
  variant?: DialogContentVariant | undefined;
};

/**
 * ダイアログを表示するコンポーネントです。
 */
export const DialogContent: IComponent<DialogContentProps> = function SuiDialogContent(props) {
  const { radius = "md", variant = "default", outlined = false, className, ...otherProps } = props;
  const ctx = React.useMemo<DialogContentContext>(() => ({ radius }), [radius]);

  return (
    <DialogContentContext value={ctx}>
      <Dialog.Popup
        {...otherProps}
        className={cn(
          className,
          "sui_dialog_content",
          `sui_dialog_content-radius_${radius}`,
          `sui_dialog_content-variant_${variant}`,
          outlined && "sui_dialog_content-outlined",
        )}
      />
    </DialogContentContext>
  );
};

export { DialogContent as Content };

export namespace Content {
  /**
   * {@link DialogContentState}
   */
  export type State = DialogContentState;

  /**
   * {@link DialogContentProps}
   */
  export type Props = DialogContentProps;

  /**
   * {@link DialogContentRadius}
   */
  export type Radius = DialogContentRadius;

  /**
   * {@link DialogContentVariant}
   */
  export type Variant = DialogContentVariant;
}

// Controls
// --------

/**
 * {@link DialogControls} が持つ状態です。
 */
export type DialogControlsState = {};

/**
 * {@link DialogControls} に渡す props です。
 */
export type DialogControlsProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<DialogControlsState> & {
    /**
     * 絶対位置として配置するかを指定します。
     *
     * @default false
     */
    absolute?: boolean | undefined;
  };

/**
 * ダイアログのコントロールコンポーネントです。
 */
export const DialogControls: IComponent<DialogControlsProps> = function SuiDialogControls(props) {
  const { absolute = false, ...htmlProps } = props;

  return useRender({
    defaultTagName: "div",
    props: [
      htmlProps,
      {
        className: cn(
          "sui_dialog_controls",
          absolute && "sui_dialog_controls-absolute",
          !absolute && "sui_dialog_controls-relative",
        ),
      },
    ],
  });
};

export { DialogControls as Controls };

export namespace Controls {
  /**
   * {@link DialogControlsState}
   */
  export type State = DialogControlsState;

  /**
   * {@link DialogControlsProps}
   */
  export type Props = DialogControlsProps;
}

// Header
// ------

/**
 * {@link DialogHeader} が持つ状態です。
 */
export type DialogHeaderState = {};

/**
 * {@link DialogHeader} に渡す props です。
 */
export type DialogHeaderProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<DialogHeaderState>;

/**
 * ダイアログのヘッダーコンポーネントです。
 */
export const DialogHeader: IComponent<DialogHeaderProps> = function SuiDialogHeader(htmlProps) {
  return useRender({
    defaultTagName: "div",
    props: [
      htmlProps,
      {
        className: "sui_dialog_header",
      },
    ],
  });
};

export { DialogHeader as Header };

export namespace Header {
  /**
   * {@link DialogHeaderState}
   */
  export type State = DialogHeaderState;

  /**
   * {@link DialogHeaderProps}
   */
  export type Props = DialogHeaderProps;
}

// Title
// -----

/**
 * {@link DialogTitle} が持つ状態です。
 */
export type DialogTitleState = Dialog.Title.State;

/**
 * {@link DialogTitle} に渡す props です。
 */
export type DialogTitleProps = React.ComponentProps<typeof Dialog.Title>;

/**
 * ダイアログの見出しを表示するコンポーネントです。
 */
export const DialogTitle: IComponent<DialogTitleProps> = function SuiDialogTitle(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Title {...otherProps} className={cn(className, "sui_dialog_title")} />;
};

export { DialogTitle as Title };

export namespace Title {
  /**
   * {@link DialogTitleState}
   */
  export type State = DialogTitleState;

  /**
   * {@link DialogTitleProps}
   */
  export type Props = DialogTitleProps;
}

// Description
// -----------

/**
 * {@link DialogDescription} が持つ状態です。
 */
export type DialogDescriptionState = Dialog.Description.State;

/**
 * {@link DialogDescription} に渡す props です。
 */
export type DialogDescriptionProps = React.ComponentProps<typeof Dialog.Description>;

/**
 * ダイアログの内容を表示するコンポーネントです。
 */
export const DialogDescription: IComponent<DialogDescriptionProps> = function SuiDialogDescription(
  props,
) {
  const { className, ...otherProps } = props;

  return <Dialog.Description {...otherProps} className={cn(className, "sui_dialog_description")} />;
};

export { DialogDescription as Description };

export namespace Description {
  /**
   * {@link DialogDescriptionState}
   */
  export type State = DialogDescriptionState;

  /**
   * {@link DialogDescriptionProps}
   */
  export type Props = DialogDescriptionProps;
}

// Body
// ----

/**
 * {@link DialogBody} が持つ状態です。
 */
export type DialogBodyState = {};

/**
 * {@link DialogBody} に渡す props です。
 */
export type DialogBodyProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<DialogBodyState>;

/**
 * ダイアログのボディーコンポーネントです。
 */
export const DialogBody: IComponent<DialogBodyProps> = function SuiDialogBody(props) {
  return useRender({
    defaultTagName: "div",
    props: [
      props,
      {
        className: "sui_dialog_body",
      },
    ],
  });
};

export { DialogBody as Body };

export namespace Body {
  /**
   * {@link DialogBodyState}
   */
  export type State = DialogBodyState;

  /**
   * {@link DialogBodyProps}
   */
  export type Props = DialogBodyProps;
}

// Footer
// ------

/**
 * {@link DialogFooter} が持つ状態です。
 */
export type DialogFooterState = {};

/**
 * {@link DialogFooter} に渡す props です。
 */
export type DialogFooterProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<DialogFooterState>;

/**
 * ダイアログのフッターコンポーネントです。
 */
export const DialogFooter: IComponent<DialogFooterProps> = function SuiDialogFooter(props) {
  return useRender({
    defaultTagName: "div",
    props: [
      props,
      {
        className: "sui_dialog_footer",
      },
    ],
  });
};

export { DialogFooter as Footer };

export namespace Footer {
  /**
   * {@link DialogFooterState}
   */
  export type State = DialogFooterState;

  /**
   * {@link DialogFooterProps}
   */
  export type Props = DialogFooterProps;
}

// CloseTrigger
// ------------

/**
 * {@link DialogCloseTrigger} が持つ状態です。
 */
export type DialogCloseTriggerState = Dialog.Close.State;

/**
 * {@link DialogCloseTrigger} に渡す props です。
 */
export type DialogCloseTriggerProps = Omit<
  React.ComponentProps<typeof Dialog.Close>,
  "children" | "render"
> & {
  /**
   * ボタンとしてレンダリングする要素です。
   */
  children: NonNullable<React.ComponentProps<typeof Dialog.Close>["render"]>;
};

/**
 * ダイアログを閉じるボタンコンポーネントです。
 */
export const DialogCloseTrigger: IComponent<DialogCloseTriggerProps> =
  function SuiDialogCloseTrigger(props) {
    const { children, className, ...otherProps } = props;

    return (
      <Dialog.Close
        {...otherProps}
        render={children}
        className={cn(className, "sui_dialog_close")}
      />
    );
  };

export { DialogCloseTrigger as CloseTrigger };

export namespace CloseTrigger {
  /**
   * {@link DialogCloseTriggerState}
   */
  export type State = DialogCloseTriggerState;

  /**
   * {@link DialogCloseTriggerProps}
   */
  export type Props = DialogCloseTriggerProps;
}
