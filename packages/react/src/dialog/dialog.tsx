import * as React from "react";

import { XIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import * as Button from "../button/button.parts.js";
import type { Override, IComponent } from "../types.js";
import {
  type DialogHandle,
  type DialogPopupSize,
  type DialogRootProps,
  type DialogRootState,
  type DialogPopupProps,
  type DialogTitleProps,
  type DialogActionProps,
  type DialogFooterProps,
  type DialogHeaderProps,
  type DialogPopupRadius,
  type DialogPortalProps,
  type DialogRootActions,
  type DialogContentProps,
  type DialogPopupContext,
  type DialogPopupVariant,
  type DialogBackdropProps,
  type DialogViewportProps,
  type ICreateDialogHandle,
  type IDialogToggleTrigger,
  type DialogDescriptionProps,
  type IUseDialogPopupContext,
  type DialogCloseTriggerProps,
  type DialogToggleTriggerProps,
  type DialogRootChangeEventReason,
  type DialogRootChangeEventDetails,
  DialogRoot,
  DialogPopup,
  DialogTitle,
  DialogAction,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogContent,
  DialogBackdrop,
  DialogViewport,
  DialogDescription,
  createDialogHandle,
  DialogCloseTrigger,
  DialogToggleTrigger,
  useDialogPopupContext,
} from "./dialog.parts.js";

// Types.

export type DialogActions = DialogRootActions;

export type DialogChangeEventDetails = DialogRootChangeEventDetails;

export type DialogChangeEventReason = DialogRootChangeEventReason;

export type DialogRadius = DialogPopupRadius;

export type DialogSize = DialogPopupSize;

export type DialogVariant = DialogPopupVariant;

/**
 * {@link Dialog} の各パーツに渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DialogSlotProps<TPayload = any> = {
  /**
   * {@link DialogAction} に渡す props です。
   */
  readonly action?: Omit<DialogActionProps, "children"> | undefined;

  /**
   * {@link DialogBackdrop} に渡す props です。
   */
  readonly backdrop?: DialogBackdropProps | undefined;

  /**
   * {@link DialogCloseTrigger} に渡す props です。
   */
  readonly closeTrigger?: Omit<DialogCloseTriggerProps, "children"> | undefined;

  /**
   * {@link DialogContent} に渡す props です。
   */
  readonly content?: Omit<DialogContentProps, "children"> | undefined;

  /**
   * {@link DialogDescription} に渡す props です。
   */
  readonly description?: Omit<DialogDescriptionProps, "children"> | undefined;

  /**
   * {@link DialogFooter} に渡す props です。
   */
  readonly footer?: Omit<DialogFooterProps, "children"> | undefined;

  /**
   * {@link DialogHeader} に渡す props です。
   *
   * 見出し・説明・操作のいずれも指定しないときはヘッダーを描画しないため、無視されます。
   */
  readonly header?: Omit<DialogHeaderProps, "children"> | undefined;

  /**
   * {@link DialogPortal} に渡す props です。
   */
  readonly portal?: Omit<DialogPortalProps, "children"> | undefined;

  /**
   * {@link DialogTitle} に渡す props です。
   */
  readonly title?: Omit<DialogTitleProps, "children"> | undefined;

  /**
   * {@link DialogToggleTrigger} に渡す props です。
   */
  readonly toggleTrigger?:
    | Omit<DialogToggleTriggerProps<TPayload>, "children" | "handle">
    | undefined;

  /**
   * {@link DialogViewport} に渡す props です。
   */
  readonly viewport?: Omit<DialogViewportProps, "children"> | undefined;
};

/**
 * {@link Dialog} の状態です。
 */
export type DialogState = DialogRootState;

namespace DialogProps {
  export type Content = Pick<DialogContentProps, "children">;

  export type Dialog<TPayload = any> = {
    /**
     * ダイアログのヘッダー右上に表示する操作要素です。
     *
     * {@link DialogProps.Dialog.showCloseIconButton|showCloseIconButton} が `true` の場合、その手前に配置されます。
     */
    action?: DialogActionProps["children"] | undefined;

    /** ダイアログの本文です。 */
    children?: DialogContentProps["children"] | undefined;

    /** ダイアログを閉じるボタンです。 */
    close?: DialogCloseTriggerProps["children"] | undefined;

    /** ダイアログの説明文です。 */
    description?: DialogDescriptionProps["children"] | undefined;

    /**
     * ダイアログの末尾に表示する内容です。
     *
     * {@link DialogProps.Dialog.close|close} を指定した場合、それが末尾に配置されます。
     */
    footer?: DialogFooterProps["children"] | undefined;

    /** 閉じるボタンがクリックされたときに呼ばれるコールバックです。 */
    onClose?: DialogCloseTriggerProps["onClick"] | undefined;

    /**
     * ダイアログを閉じるアイコンボタンを表示するかどうかを指定します。
     *
     * @default true
     */
    showCloseIconButton?: boolean | undefined;

    /** 各パーツに個別の props を渡すためのオブジェクトです。 */
    slotProps?: DialogSlotProps<TPayload> | undefined;

    /** ダイアログの見出しです。 */
    title?: DialogTitleProps["children"] | undefined;

    /**
     * ダイアログを開くトリガーです。
     *
     * {@link DialogProps.Dialog.slotProps|slotProps.toggleTrigger} だけを指定しても描画されません。
     */
    trigger?: DialogToggleTriggerProps["children"] | undefined;
  };

  export type Popup = Omit<DialogPopupProps, "children" | keyof Dialog | keyof Root>;

  export type Root<TPayload = any> = Omit<DialogRootProps<TPayload>, "children" | keyof Dialog>;
}

/**
 * {@link Dialog} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DialogProps<TPayload = any> = DialogProps.Dialog<TPayload> &
  DialogProps.Root<TPayload> &
  DialogProps.Popup &
  DialogProps.Content;

export interface IUseDialogAPI {
  /**
   * {@link DialogAPI} を作成します。
   *
   * @template TPayload トリガーが送信するデータの型です。
   *
   * @param props {@link Dialog} の props です。
   *
   * @returns ダイアログの API です
   */
  <TPayload = any>(props: DialogProps<TPayload>): DialogAPI<TPayload>;
}

// API.

function CloseIconButton(): React.ReactElement {
  const ctx = useDialogPopupContext();

  return (
    <DialogCloseTrigger>
      <Button.Root size={ctx.size} radius={ctx.radius} squared variant="naked" aria-label="閉じる">
        <XIcon />
      </Button.Root>
    </DialogCloseTrigger>
  );
}

/**
 * {@link Dialog} を構成する各パーツの props などを作成するための API です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export class DialogAPI<TPayload = any> {
  private readonly dialogProps: Required<Omit<DialogProps.Dialog<TPayload>, "slotProps">>;

  private readonly slotProps: DialogSlotProps<TPayload>;

  private readonly rootProps: Required<DialogProps.Root<TPayload>>;

  private readonly popupProps: DialogProps.Popup;

  private readonly contentProps: Required<DialogProps.Content> | null;

  /**
   * @param props {@link Dialog} の props です。
   *
   * @internal
   */
  public constructor(
    props: Override<
      DialogProps<TPayload>,
      {
        handle: DialogHandle<TPayload>;
      }
    >,
  ) {
    const {
      open,
      close,
      modal,
      title,
      action,
      footer,
      handle,
      onClose,
      trigger,
      children,
      slotProps = {},
      triggerId,
      actionsRef,
      defaultOpen,
      description,
      onOpenChange,
      defaultTriggerId,
      showCloseIconButton = true,
      onOpenChangeComplete,
      disablePointerDismissal,
      ...popupProps
    } = props;
    this.dialogProps = {
      close,
      title,
      action,
      footer,
      onClose,
      trigger,
      children,
      description,
      showCloseIconButton,
    };
    this.slotProps = slotProps;
    this.rootProps = {
      open,
      modal,
      handle,
      triggerId,
      actionsRef,
      defaultOpen,
      onOpenChange,
      defaultTriggerId,
      onOpenChangeComplete,
      disablePointerDismissal,
    };
    this.popupProps = popupProps;
    this.contentProps =
      "children" in props
        ? {
            children,
          }
        : null;
  }

  /**
   * {@link DialogAction} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getActionProps(): DialogActionProps | null {
    const { action: props = {} } = this.slotProps;
    const { action, showCloseIconButton } = this.dialogProps;

    if (showCloseIconButton === true || isLikelyVisibleNode(action)) {
      return {
        ...props,
        children: action === undefined ? <CloseIconButton /> : action,
      };
    }

    return null;
  }

  /**
   * {@link DialogBackdrop} に渡す props を取得します。
   */
  public getBackdropProps(): DialogBackdropProps {
    const { backdrop: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link DialogCloseTrigger} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getCloseTriggerProps(): DialogCloseTriggerProps | null {
    const { closeTrigger: props = {} } = this.slotProps;
    const { close, onClose } = this.dialogProps;

    if (close) {
      const { onClick, ...otherProps } = props;

      return {
        ...otherProps,
        onClick(evt) {
          onClick?.(evt);
          if (evt.defaultPrevented) {
            return;
          }

          onClose?.(evt);
        },
        children: close,
      };
    }

    return null;
  }

  /**
   * {@link DialogContent} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getContentProps(): DialogContentProps | null {
    const { content: props } = this.slotProps;

    if (this.contentProps) {
      return {
        ...props,
        ...this.contentProps,
      };
    }

    return null;
  }

  /**
   * {@link DialogDescription} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getDescriptionProps(): DialogDescriptionProps | null {
    const { description: props = {} } = this.slotProps;
    const { description } = this.dialogProps;

    if (isLikelyVisibleNode(description)) {
      return {
        ...props,
        children: description,
      };
    }

    return null;
  }

  /**
   * {@link DialogFooter} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getFooterProps(): DialogFooterProps | null {
    const { footer: props = {} } = this.slotProps;
    const { close, footer } = this.dialogProps;

    if (isLikelyVisibleNode(footer) || close) {
      return {
        ...props,
        children: footer,
      };
    }

    return null;
  }

  /**
   * {@link DialogHeader} に渡す props を取得します。
   *
   * 見出し・説明・操作のいずれも表示しないときは `null` を返します。
   */
  public getHeaderProps(): Omit<DialogHeaderProps, "children"> | null {
    const { header: props = {} } = this.slotProps;
    const { title, action, description, showCloseIconButton } = this.dialogProps;

    if (
      showCloseIconButton === true ||
      isLikelyVisibleNode(title) ||
      isLikelyVisibleNode(action) ||
      isLikelyVisibleNode(description)
    ) {
      return props;
    }

    return null;
  }

  /**
   * {@link DialogPopup} に渡す props を取得します。
   */
  public getPopupProps(): DialogProps.Popup {
    return this.popupProps;
  }

  /**
   * {@link DialogPortal} に渡す props を取得します。
   */
  public getPortalProps(): Omit<DialogPortalProps, "children"> {
    const { portal: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link DialogRoot} に渡す props を取得します。
   */
  public getRootProps(): Required<Omit<DialogRootProps<TPayload>, "children">> {
    return this.rootProps;
  }

  /**
   * {@link DialogTitle} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getTitleProps(): DialogTitleProps | null {
    const { title: props = {} } = this.slotProps;
    const { title } = this.dialogProps;

    if (isLikelyVisibleNode(title)) {
      return {
        ...props,
        children: title,
      };
    }

    return null;
  }

  /**
   * {@link DialogToggleTrigger} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getToggleTriggerProps(): DialogToggleTriggerProps<TPayload> | null {
    const { toggleTrigger: props = {} } = this.slotProps;
    const { trigger } = this.dialogProps;
    const { handle } = this.rootProps;

    if (trigger) {
      return {
        ...props,
        handle,
        children: trigger,
      };
    }

    return null;
  }

  /**
   * {@link DialogViewport} に渡す props を取得します。
   */
  public getViewportProps(): Omit<DialogViewportProps, "children"> {
    const { viewport: props = {} } = this.slotProps;

    return props;
  }
}

/**
 * {@link DialogAPI} を作成するフックです。
 */
export const useDialogAPI: IUseDialogAPI = <TPayload,>(props: DialogProps<TPayload>) => {
  const { handle: handleProp, ...otherProps } = props;
  const handle = React.useMemo(() => handleProp ?? createDialogHandle<TPayload>(), [handleProp]);

  return new DialogAPI({
    ...otherProps,
    handle,
  });
};

export { DialogAPI as API, useDialogAPI as useAPI };

// Component.

export interface IDialog extends IComponent<DialogProps> {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   */
  <TPayload = any>(props: DialogProps<TPayload>): IComponent.Return;
  readonly ToggleTrigger: IDialogToggleTrigger;

  /**
   * {@link DialogHandle} を作成する関数です。
   */
  readonly createHandle: ICreateDialogHandle;
  readonly usePopupContext: IUseDialogPopupContext;
}

/**
 * ダイアログを表示するコンポーネントです。
 *
 * 構成を細かく制御する場合は、{@link DialogRoot|Root} を直接組み立てます。
 */
export const Dialog: IDialog = /*#__PURE__*/ Object.assign(
  (props: DialogProps) => {
    const api = useDialogAPI(props);
    const toggleTriggerProps = api.getToggleTriggerProps();
    const popupProps = api.getPopupProps();
    const headerProps = api.getHeaderProps();
    const titleProps = api.getTitleProps();
    const descriptionProps = api.getDescriptionProps();
    const actionProps = api.getActionProps();
    const contentProps = api.getContentProps();
    const footerProps = api.getFooterProps();
    const closeTriggerProps = api.getCloseTriggerProps();

    return (
      <DialogRoot {...api.getRootProps()}>
        {toggleTriggerProps && <DialogToggleTrigger {...toggleTriggerProps} />}
        <DialogPortal {...api.getPortalProps()}>
          <DialogBackdrop {...api.getBackdropProps()} />
          <DialogViewport {...api.getViewportProps()}>
            <DialogPopup {...popupProps}>
              {headerProps && (
                <DialogHeader {...headerProps}>
                  {titleProps && <DialogTitle {...titleProps} />}
                  {descriptionProps && <DialogDescription {...descriptionProps} />}
                  {actionProps && <DialogAction {...actionProps} />}
                </DialogHeader>
              )}
              {contentProps && <DialogContent {...contentProps} />}
              {footerProps && (
                <DialogFooter {...footerProps}>
                  {footerProps.children}
                  {closeTriggerProps && <DialogCloseTrigger {...closeTriggerProps} />}
                </DialogFooter>
              )}
            </DialogPopup>
          </DialogViewport>
        </DialogPortal>
      </DialogRoot>
    );
  },
  {
    createHandle: createDialogHandle,
    ToggleTrigger: DialogToggleTrigger,
    usePopupContext: useDialogPopupContext,
  },
);

export namespace Dialog {
  export type State = DialogState;

  export type Props<TPayload = any> = DialogProps<TPayload>;

  export type SlotProps<TPayload = any> = DialogSlotProps<TPayload>;

  export type PopupContext = DialogPopupContext;

  export type Actions = DialogActions;

  export type ChangeEventDetails = DialogChangeEventDetails;

  export type ChangeEventReason = DialogChangeEventReason;

  export type Radius = DialogRadius;

  export type Size = DialogSize;

  export type Variant = DialogVariant;
}
