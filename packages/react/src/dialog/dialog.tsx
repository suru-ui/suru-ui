import * as React from "react";

import { XIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import * as Button from "../button/button.parts.js";
import type { IComponent } from "../types.js";
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
  DialogCloseTrigger,
  createDialogHandle,
  DialogToggleTrigger,
  useDialogPopupContext,
} from "./dialog.parts.js";

// Types
// -----

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
   * {@link DialogPopup} に渡す props です。
   */
  readonly popup?: Omit<DialogPopupProps, "children" | keyof DialogProps.Dialog> | undefined;

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
  export type Dialog<TPayload = any> = {
    /**
     * ダイアログのヘッダー右上に表示する操作要素です。
     *
     * {@link DialogProps.Dialog.showCloseIconButton|showCloseIconButton} が `true` の場合、その手前に配置されます。
     */
    action?: DialogActionProps["children"] | undefined;

    /**
     * ダイアログの本文です。
     */
    children?: DialogContentProps["children"] | undefined;

    /**
     * ダイアログを閉じるボタンです。
     */
    close?: DialogCloseTriggerProps["children"] | undefined;

    /**
     * ダイアログの説明文です。
     */
    description?: DialogDescriptionProps["children"] | undefined;

    /**
     * ダイアログの末尾に表示する内容です。
     *
     * {@link DialogProps.Dialog.close|close} を指定した場合、それが末尾に配置されます。
     */
    footer?: DialogFooterProps["children"] | undefined;

    /**
     * トリガーとダイアログに関連付けるためのハンドルです。
     */
    handle?: DialogHandle<TPayload> | undefined;

    /**
     * 閉じるボタンがクリックされたときに呼ばれるコールバックです。
     */
    onClose?: DialogCloseTriggerProps["onClick"] | undefined;

    /**
     * ダイアログに枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: DialogPopupProps["outlined"] | undefined;

    /**
     * ダイアログの角丸の大きさを指定します。
     *
     * 既定値は {@link DialogProps.Dialog.size|size} です。
     */
    radius?: DialogPopupProps["radius"] | undefined;

    /**
     * ダイアログを閉じるアイコンボタンを表示するかどうかを指定します。
     *
     * @default true
     */
    showCloseIconButton?: boolean | undefined;

    /**
     * ダイアログの大きさを指定します。
     *
     * @default "md"
     */
    size?: DialogPopupProps["size"] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: DialogSlotProps<TPayload> | undefined;

    /**
     * ダイアログの見出しです。
     */
    title?: DialogTitleProps["children"] | undefined;

    /**
     * ダイアログを開くトリガーです。
     *
     * {@link DialogProps.Dialog.slotProps|slotProps.toggleTrigger} だけを指定しても描画されません。
     */
    trigger?: DialogToggleTriggerProps["children"] | undefined;

    /**
     * ダイアログの主な外観を指定します。
     *
     * `"stacked"` では見出しと説明文が中央に配置され、操作が右上へ重なります。
     *
     * @default "default"
     */
    variant?: DialogPopupProps["variant"] | undefined;
  };

  export type Root<TPayload = any> = Omit<DialogRootProps<TPayload>, "children" | keyof Dialog>;
}

/**
 * {@link Dialog} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DialogProps<TPayload = any> = DialogProps.Dialog<TPayload> & DialogProps.Root<TPayload>;

// API
// ---

function CloseIconButton() {
  const ctx = useDialogPopupContext(true);

  return (
    <DialogCloseTrigger>
      <Button.Root
        size={ctx?.size}
        radius={ctx?.radius}
        squared
        variant="naked"
        aria-label="閉じる"
      >
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
  private readonly dialogProps: Required<
    Omit<DialogProps.Dialog<TPayload>, "slotProps" | "handle">
  >;

  private readonly slotProps: DialogSlotProps<TPayload>;

  private readonly rootProps: Required<DialogProps.Root<TPayload>>;

  private readonly handle: DialogHandle<TPayload>;

  /**
   * @param props {@link Dialog} の props です。
   * @param handle トリガーとダイアログを関連付けるためのハンドルです。
   * @internal
   */
  public constructor(
    props: DialogProps<TPayload>,
    handle: DialogHandle<TPayload> = createDialogHandle<TPayload>(),
  ) {
    const {
      size,
      close,
      title,
      action,
      footer,
      radius,
      onClose,
      trigger,
      variant = "default",
      children,
      outlined,
      slotProps = {},
      description,
      showCloseIconButton = true,
      ...otherProps
    } = props;
    const {
      open,
      modal,
      handle: handleProp,
      triggerId,
      actionsRef,
      defaultOpen,
      onOpenChange,
      defaultTriggerId,
      onOpenChangeComplete,
      disablePointerDismissal,
    } = otherProps;
    this.dialogProps = {
      size,
      close,
      title,
      action,
      footer,
      radius,
      onClose,
      trigger,
      variant,
      children,
      outlined,
      description,
      showCloseIconButton,
    };
    this.slotProps = slotProps;
    this.rootProps = {
      open,
      modal,
      triggerId,
      actionsRef,
      defaultOpen,
      onOpenChange,
      defaultTriggerId,
      onOpenChangeComplete,
      disablePointerDismissal,
    };
    this.handle = handleProp ?? handle;
  }

  /**
   * {@link DialogAction} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getActionProps(): DialogActionProps | null {
    const { action: props = {} } = this.slotProps;
    const { action, showCloseIconButton } = this.dialogProps;

    if (isLikelyVisibleNode(action) || showCloseIconButton) {
      return {
        ...props,
        children: (
          <>
            {action}
            {showCloseIconButton && <CloseIconButton />}
          </>
        ),
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
    const { content: props = {} } = this.slotProps;
    const { children } = this.dialogProps;

    if (isLikelyVisibleNode(children)) {
      return {
        ...props,
        children,
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
    const { header: props } = this.slotProps;
    const { title, action, variant, description, showCloseIconButton } = this.dialogProps;
    // 積み上げ式では操作をヘッダーの外へ重ねるため、ヘッダーの表示判定に含めません。
    const hasAction = variant === "default" && (isLikelyVisibleNode(action) || showCloseIconButton);

    if (isLikelyVisibleNode(title) || isLikelyVisibleNode(description) || hasAction) {
      return props ?? {};
    }

    return null;
  }

  /**
   * {@link DialogPopup} に渡す props を取得します。
   */
  public getPopupProps(): Omit<DialogPopupProps, "children"> {
    const { popup: props = {} } = this.slotProps;
    const { size, radius, variant, outlined } = this.dialogProps;

    return {
      ...props,
      size,
      radius,
      variant,
      outlined,
    };
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
    return {
      ...this.rootProps,
      handle: this.handle,
    };
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

    if (trigger) {
      return {
        ...props,
        handle: this.handle,
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

export interface IUseDialogAPI {
  /**
   * {@link DialogAPI} を作成します。
   *
   * @template TPayload トリガーが送信するデータの型です。
   * @param props {@link Dialog} の props です。
   * @returns ダイアログの API です
   */
  <TPayload = any>(props: DialogProps<TPayload>): DialogAPI<TPayload>;
}

/**
 * {@link DialogAPI} を作成するフックです。
 */
export const useDialogAPI: IUseDialogAPI = function useSuiDialogAPI<TPayload>(
  props: DialogProps<TPayload>,
) {
  const handle = React.useMemo(
    () => props.handle ?? createDialogHandle<TPayload>(),
    [props.handle],
  );

  return new DialogAPI(props, handle);
};

export { DialogAPI as API, useDialogAPI as useAPI };

// Component
// ---------

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
  function SuiDialog(props: DialogProps) {
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
                  {popupProps.variant === "default" && actionProps && (
                    <DialogAction {...actionProps} />
                  )}
                </DialogHeader>
              )}
              {popupProps.variant === "stacked" && actionProps && <DialogAction {...actionProps} />}
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
