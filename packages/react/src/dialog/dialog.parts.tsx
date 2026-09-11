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

export namespace DialogRootProps {
  export type Render = RenderProps<DialogRootState>;

  export type SuruUI<TPayload = any> = {
    /**
     * トリガーとダイアログに関連付けるためのハンドルです。
     */
    handle: DialogHandle<TPayload>;
  };

  export type BaseUI = Omit<React.ComponentProps<typeof Dialog.Root>, keyof Render | keyof SuruUI>;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;
}

/**
 * {@link DialogRoot} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DialogRootProps<TPayload = any> = DialogRootProps.Render &
  DialogRootProps.SuruUI<TPayload> &
  DialogRootProps.BaseUI &
  DialogRootProps.HTML;

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
  export type State = DialogRootState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI &
    Props.HTML;

  export namespace Props {
    export type Render = DialogRootProps.Render;

    export type SuruUI<TPayload = any> = DialogRootProps.SuruUI<TPayload>;

    export type BaseUI = DialogRootProps.BaseUI;

    export type HTML = DialogRootProps.HTML;
  }

  export type Actions = DialogRootActions;

  export type ChangeEventDetails = DialogRootChangeEventDetails;

  export type ChangeEventReason = DialogRootChangeEventReason;
}

// ToggleTrigger
// -------------

/**
 * {@link DialogToggleTrigger} が持つ状態です。
 */
export type DialogToggleTriggerState = Dialog.Trigger.State;

export namespace DialogToggleTriggerProps {
  export type Render = RenderProps<DialogToggleTriggerState>;

  export type SuruUI<TPayload = any> = {
    /**
     * ボタンとしてレンダリングする要素です。
     */
    children: NonNullable<React.ComponentProps<typeof Dialog.Trigger>["render"]>;

    /**
     * トリガーとダイアログに関連付けるためのハンドルです。
     */
    handle: DialogHandle<TPayload>;
  };

  export type BaseUI = Omit<
    React.ComponentProps<typeof Dialog.Trigger>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<React.ComponentProps<"button">, keyof Render | keyof SuruUI>;
}

/**
 * {@link DialogToggleTrigger} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DialogToggleTriggerProps<TPayload = any> = DialogToggleTriggerProps.Render &
  DialogToggleTriggerProps.SuruUI<TPayload> &
  DialogToggleTriggerProps.BaseUI &
  DialogToggleTriggerProps.HTML;

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
  export type State = DialogToggleTriggerState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI &
    Props.HTML;

  export namespace Props {
    export type Render = DialogToggleTriggerProps.Render;

    export type SuruUI<TPayload = any> = DialogToggleTriggerProps.SuruUI<TPayload>;

    export type BaseUI = DialogToggleTriggerProps.BaseUI;

    export type HTML = DialogToggleTriggerProps.HTML;
  }
}

// Portal
// ------

/**
 * {@link DialogPortal} が持つ状態です。
 */
export type DialogPortalState = Dialog.Portal.State;

export namespace DialogPortalProps {
  export type Render = RenderProps<DialogPortalState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof Dialog.Portal>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof Dialog.Portal>
  >;
}

/**
 * {@link DialogPortal} に渡す props です。
 */
export type DialogPortalProps = DialogPortalProps.Render &
  DialogPortalProps.SuruUI &
  DialogPortalProps.BaseUI &
  DialogPortalProps.HTML;

/**
 * ダイアログを DOM の別の場所に配置するコンポーネントです。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const DialogPortal: IComponent<DialogPortalProps> = function SuiDialogPortal(props) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
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
  export type State = DialogPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogPortalProps.Render;

    export type SuruUI = DialogPortalProps.SuruUI;

    export type BaseUI = DialogPortalProps.BaseUI;

    export type HTML = DialogPortalProps.HTML;
  }
}

// Backdrop
// --------

/**
 * {@link DialogBackdrop} が持つ状態です。
 */
export type DialogBackdropState = Dialog.Backdrop.State;

export namespace DialogBackdropProps {
  export type Render = RenderProps<DialogBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof Dialog.Backdrop>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof Dialog.Backdrop>
  >;
}

/**
 * {@link DialogBackdrop} に渡す props です。
 */
export type DialogBackdropProps = DialogBackdropProps.Render &
  DialogBackdropProps.SuruUI &
  DialogBackdropProps.BaseUI &
  DialogBackdropProps.HTML;

/**
 * ポップアップの背後に表示されるオーバーレイコンポーネントです。
 */
export const DialogBackdrop: IComponent<DialogBackdropProps> = function SuiDialogBackdrop(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Backdrop {...otherProps} className={cn(className, "sui_dialog_backdrop")} />;
};

export { DialogBackdrop as Backdrop };

export namespace Backdrop {
  export type State = DialogBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogBackdropProps.Render;

    export type SuruUI = DialogBackdropProps.SuruUI;

    export type BaseUI = DialogBackdropProps.BaseUI;

    export type HTML = DialogBackdropProps.HTML;
  }
}

// Viewport
// --------

/**
 * {@link DialogViewport} が持つ状態です。
 */
export type DialogViewportState = Dialog.Viewport.State;

export namespace DialogViewportProps {
  export type Render = RenderProps<DialogViewportState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof Dialog.Viewport>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof Dialog.Viewport>
  >;
}

/**
 * {@link DialogViewport} に渡す props です。
 */
export type DialogViewportProps = DialogViewportProps.Render &
  DialogViewportProps.SuruUI &
  DialogViewportProps.BaseUI &
  DialogViewportProps.HTML;

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
  export type State = DialogViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogViewportProps.Render;

    export type SuruUI = DialogViewportProps.SuruUI;

    export type BaseUI = DialogViewportProps.BaseUI;

    export type HTML = DialogViewportProps.HTML;
  }
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

export namespace DialogContentProps {
  export type Render = RenderProps<DialogContentState>;

  export type SuruUI = {
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

  export type BaseUI = Omit<React.ComponentProps<typeof Dialog.Popup>, keyof Render | keyof SuruUI>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof Dialog.Popup>
  >;
}

/**
 * {@link DialogContent} に渡す props です。
 */
export type DialogContentProps = DialogContentProps.Render &
  DialogContentProps.SuruUI &
  DialogContentProps.BaseUI &
  DialogContentProps.HTML;

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
  export type State = DialogContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogContentProps.Render;

    export type SuruUI = DialogContentProps.SuruUI;

    export type BaseUI = DialogContentProps.BaseUI;

    export type HTML = DialogContentProps.HTML;
  }

  export type Radius = DialogContentRadius;

  export type Variant = DialogContentVariant;
}

// Controls
// --------

/**
 * {@link DialogControls} が持つ状態です。
 */
export type DialogControlsState = {};

export namespace DialogControlsProps {
  export type Render = RenderProps<DialogControlsState>;

  export type SuruUI = {
    /**
     * 絶対位置として配置するかを指定します。
     *
     * @default false
     */
    absolute?: boolean | undefined;
  };

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;
}

/**
 * {@link DialogControls} に渡す props です。
 */
export type DialogControlsProps = DialogControlsProps.Render &
  DialogControlsProps.SuruUI &
  DialogControlsProps.HTML;

/**
 * ダイアログのコントロールコンポーネントです。
 */
export const DialogControls: IComponent<DialogControlsProps> = function SuiDialogControls(props) {
  const { absolute = false, ...htmlProps } = props;

  return useRender({
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
    defaultTagName: "div",
  });
};

export { DialogControls as Controls };

export namespace Controls {
  export type State = DialogControlsState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = DialogControlsProps.Render;

    export type SuruUI = DialogControlsProps.SuruUI;

    export type HTML = DialogControlsProps.HTML;
  }
}

// Header
// ------

/**
 * {@link DialogHeader} が持つ状態です。
 */
export type DialogHeaderState = {};

export namespace DialogHeaderProps {
  export type Render = RenderProps<DialogHeaderState>;

  export type SuruUI = {};

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;
}

/**
 * {@link DialogHeader} に渡す props です。
 */
export type DialogHeaderProps = DialogHeaderProps.Render &
  DialogHeaderProps.SuruUI &
  DialogHeaderProps.HTML;

/**
 * ダイアログのヘッダーコンポーネントです。
 */
export const DialogHeader: IComponent<DialogHeaderProps> = function SuiDialogHeader(htmlProps) {
  return useRender({
    props: [
      htmlProps,
      {
        className: "sui_dialog_header",
      },
    ],
    defaultTagName: "div",
  });
};

export { DialogHeader as Header };

export namespace Header {
  export type State = DialogHeaderState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = DialogHeaderProps.Render;

    export type SuruUI = DialogHeaderProps.SuruUI;

    export type HTML = DialogHeaderProps.HTML;
  }
}

// Title
// -----

/**
 * {@link DialogTitle} が持つ状態です。
 */
export type DialogTitleState = Dialog.Title.State;

export namespace DialogTitleProps {
  export type Render = RenderProps<DialogTitleState>;

  export type SuruUI = {};

  export type BaseUI = Omit<React.ComponentProps<typeof Dialog.Title>, keyof Render | keyof SuruUI>;

  export type HTML = Omit<
    React.ComponentProps<"h2">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof Dialog.Title>
  >;
}

/**
 * {@link DialogTitle} に渡す props です。
 */
export type DialogTitleProps = DialogTitleProps.Render &
  DialogTitleProps.SuruUI &
  DialogTitleProps.BaseUI &
  DialogTitleProps.HTML;

/**
 * ダイアログの見出しを表示するコンポーネントです。
 */
export const DialogTitle: IComponent<DialogTitleProps> = function SuiDialogTitle(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Title {...otherProps} className={cn(className, "sui_dialog_title")} />;
};

export { DialogTitle as Title };

export namespace Title {
  export type State = DialogTitleState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogTitleProps.Render;

    export type SuruUI = DialogTitleProps.SuruUI;

    export type BaseUI = DialogTitleProps.BaseUI;

    export type HTML = DialogTitleProps.HTML;
  }
}

// Description
// -----------

/**
 * {@link DialogDescription} が持つ状態です。
 */
export type DialogDescriptionState = Dialog.Description.State;

export namespace DialogDescriptionProps {
  export type Render = RenderProps<DialogDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof Dialog.Description>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"p">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof Dialog.Description>
  >;
}

/**
 * {@link DialogDescription} に渡す props です。
 */
export type DialogDescriptionProps = DialogDescriptionProps.Render &
  DialogDescriptionProps.SuruUI &
  DialogDescriptionProps.BaseUI &
  DialogDescriptionProps.HTML;

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
  export type State = DialogDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogDescriptionProps.Render;

    export type SuruUI = DialogDescriptionProps.SuruUI;

    export type BaseUI = DialogDescriptionProps.BaseUI;

    export type HTML = DialogDescriptionProps.HTML;
  }
}

// Body
// ----

/**
 * {@link DialogBody} が持つ状態です。
 */
export type DialogBodyState = {};

export namespace DialogBodyProps {
  export type Render = RenderProps<DialogBodyState>;

  export type SuruUI = {};

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;
}

/**
 * {@link DialogBody} に渡す props です。
 */
export type DialogBodyProps = DialogBodyProps.Render &
  DialogBodyProps.SuruUI &
  DialogBodyProps.HTML;

/**
 * ダイアログのボディーコンポーネントです。
 */
export const DialogBody: IComponent<DialogBodyProps> = function SuiDialogBody(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_dialog_body",
      },
    ],
    defaultTagName: "div",
  });
};

export { DialogBody as Body };

export namespace Body {
  export type State = DialogBodyState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = DialogBodyProps.Render;

    export type SuruUI = DialogBodyProps.SuruUI;

    export type HTML = DialogBodyProps.HTML;
  }
}

// Footer
// ------

/**
 * {@link DialogFooter} が持つ状態です。
 */
export type DialogFooterState = {};

export namespace DialogFooterProps {
  export type Render = RenderProps<DialogFooterState>;

  export type SuruUI = {};

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;
}

/**
 * {@link DialogFooter} に渡す props です。
 */
export type DialogFooterProps = DialogFooterProps.Render &
  DialogFooterProps.SuruUI &
  DialogFooterProps.HTML;

/**
 * ダイアログのフッターコンポーネントです。
 */
export const DialogFooter: IComponent<DialogFooterProps> = function SuiDialogFooter(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_dialog_footer",
      },
    ],
    defaultTagName: "div",
  });
};

export { DialogFooter as Footer };

export namespace Footer {
  export type State = DialogFooterState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = DialogFooterProps.Render;

    export type SuruUI = DialogFooterProps.SuruUI;

    export type HTML = DialogFooterProps.HTML;
  }
}

// CloseTrigger
// ------------

/**
 * {@link DialogCloseTrigger} が持つ状態です。
 */
export type DialogCloseTriggerState = Dialog.Close.State;

export namespace DialogCloseTriggerProps {
  export type Render = RenderProps<DialogCloseTriggerState>;

  export type SuruUI = {
    /**
     * ボタンとしてレンダリングする要素です。
     */
    children: NonNullable<React.ComponentProps<typeof Dialog.Close>["render"]>;
  };

  export type BaseUI = Omit<React.ComponentProps<typeof Dialog.Close>, keyof Render | keyof SuruUI>;

  export type HTML = Omit<
    React.ComponentProps<"button">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof Dialog.Close>
  >;
}

/**
 * {@link DialogCloseTrigger} に渡す props です。
 */
export type DialogCloseTriggerProps = DialogCloseTriggerProps.Render &
  DialogCloseTriggerProps.SuruUI &
  DialogCloseTriggerProps.BaseUI &
  DialogCloseTriggerProps.HTML;

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
  export type State = DialogCloseTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogCloseTriggerProps.Render;

    export type SuruUI = DialogCloseTriggerProps.SuruUI;

    export type BaseUI = DialogCloseTriggerProps.BaseUI;

    export type HTML = DialogCloseTriggerProps.HTML;
  }
}
