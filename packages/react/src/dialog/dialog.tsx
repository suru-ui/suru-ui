import * as React from "react";

import { XIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import * as Button from "../button/button.parts.js";
import type { IComponent, IUseContext } from "../types.js";
import {
  type DialogHandle,
  type DialogBodyProps,
  type DialogRootProps,
  type DialogRootState,
  type DialogTitleProps,
  type DialogFooterProps,
  type DialogHeaderProps,
  type DialogPortalProps,
  type DialogRootActions,
  type DialogContentProps,
  type DialogBackdropProps,
  type DialogContentRadius,
  type DialogControlsProps,
  type DialogViewportProps,
  type DialogContentContext,
  type DialogContentVariant,
  type DialogDescriptionProps,
  type DialogCloseTriggerProps,
  type DialogToggleTriggerProps,
  type DialogRootChangeEventReason,
  type DialogRootChangeEventDetails,
  DialogBody,
  DialogRoot,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogContent,
  DialogBackdrop,
  DialogControls,
  DialogViewport,
  DialogDescription,
  DialogCloseTrigger,
  createDialogHandle,
  DialogToggleTrigger,
  useDialogContentContext,
} from "./dialog.parts.js";

// Types
// -----

export type DialogActions = DialogRootActions;

export type DialogChangeEventDetails = DialogRootChangeEventDetails;

export type DialogChangeEventReason = DialogRootChangeEventReason;

export type DialogRadius = DialogContentRadius;

export type DialogVariant = DialogContentVariant;

/**
 * {@link Dialog} の各パーツに渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DialogSlotProps<TPayload = any> = {
  /**
   * {@link DialogBackdrop} に渡す props です。
   */
  readonly backdrop?: DialogBackdropProps | undefined;

  /**
   * {@link DialogBody} に渡す props です。
   */
  readonly body?: Omit<DialogBodyProps, "children" | "title"> | undefined;

  /**
   * {@link DialogCloseTrigger} に渡す props です。
   */
  readonly closeTrigger?: Omit<DialogCloseTriggerProps, "children"> | undefined;

  /**
   * {@link DialogContent} に渡す props です。
   */
  readonly content?: Omit<DialogContentProps, "children" | keyof DialogProps.Dialog> | undefined;

  /**
   * {@link DialogControls} に渡す props です。
   */
  readonly controls?: Omit<DialogControlsProps, "children"> | undefined;

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
  export type Body = Omit<DialogBodyProps, keyof Dialog | keyof Root> & {
    /**
     * ダイアログの HTML `title` 属性です。
     *
     * @see https://developer.mozilla.org/docs/Web/HTML/Reference/Global_attributes/title
     */
    htmlTitle?: React.HTMLAttributes<HTMLDivElement>["title"];
  };

  export type Dialog<TPayload = any> = {
    /**
     * ダイアログを閉じるボタンです。
     */
    close?: DialogCloseTriggerProps["children"] | undefined;

    /**
     * コントロールコンポーネントに表示する内容です。
     *
     * ダイアログの内側から順に配置されます。
     * {@link DialogProps.Dialog.showCloseIconButton|showCloseIconButton} が `true` の場合、それが一番外側に配置されます。
     */
    controls?: DialogControlsProps["children"] | undefined;

    /**
     * ダイアログの説明文です。
     */
    description?: React.ReactNode | undefined;

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
    outlined?: DialogContentProps["outlined"] | undefined;

    /**
     * ダイアログの角丸の大きさを指定します。
     *
     * @default "md"
     */
    radius?: DialogContentProps["radius"] | undefined;

    /**
     * ダイアログを閉じるアイコンボタンを表示にします。
     *
     * @default true
     */
    showCloseIconButton?: boolean | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: DialogSlotProps<TPayload> | undefined;

    /**
     * ダイアログの見出しです。
     */
    title?: React.ReactNode | undefined;

    /**
     * ダイアログを開くトリガーです。
     *
     * {@link DialogProps.Dialog.slotProps|slotProps.toggleTrigger} だけを指定しても描画されません。
     */
    trigger?: DialogToggleTriggerProps["children"] | undefined;

    /**
     * ダイアログの主な外観を指定します。
     *
     * @default "default"
     */
    variant?: DialogContentProps["variant"] | undefined;
  };

  export type Root<TPayload = any> = Omit<DialogRootProps<TPayload>, "children" | keyof Dialog>;
}

/**
 * {@link Dialog} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DialogProps<TPayload = any> = DialogProps.Dialog<TPayload> &
  DialogProps.Root<TPayload> &
  DialogProps.Body;

// API
// ---

function CloseIconButton() {
  const ctx = useDialogContentContext(true);

  return (
    <DialogCloseTrigger>
      <Button.Root radius={ctx?.radius} squared variant="naked" aria-label="閉じる">
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

  private readonly bodyProps: DialogProps.Body;

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
      close,
      title,
      radius,
      onClose,
      trigger,
      variant = "default",
      children,
      controls,
      outlined,
      htmlTitle,
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
      ...otherBodyProps
    } = otherProps;
    this.dialogProps = {
      close,
      title,
      radius,
      onClose,
      trigger,
      variant,
      controls,
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
    this.bodyProps = {
      ...otherBodyProps,
      children,
      htmlTitle,
    };
    this.handle = handleProp ?? handle;
  }

  /**
   * {@link DialogBackdrop} に渡す props を取得します。
   */
  public getBackdropProps(): DialogBackdropProps {
    const { backdrop: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link DialogBody} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getBodyProps(): DialogBodyProps | null {
    const { body: props = {} } = this.slotProps;
    const { children, htmlTitle, ...otherBodyProps } = this.bodyProps;

    if (isLikelyVisibleNode(children)) {
      return {
        ...otherBodyProps,
        ...props,
        title: htmlTitle,
        children,
      };
    }

    return null;
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
   */
  public getContentProps(): Omit<DialogContentProps, "children"> {
    const { content: props = {} } = this.slotProps;
    const { radius, variant, outlined } = this.dialogProps;

    return {
      ...props,
      radius,
      variant,
      outlined,
    };
  }

  /**
   * {@link DialogControls} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getControlsProps(): DialogControlsProps | null {
    const { controls: props = {} } = this.slotProps;
    const { controls, showCloseIconButton } = this.dialogProps;

    if (isLikelyVisibleNode(controls) || showCloseIconButton) {
      return {
        ...props,
        children: (
          <>
            {controls}
            {showCloseIconButton && <CloseIconButton />}
          </>
        ),
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
  public getFooterProps(): Omit<DialogFooterProps, "children"> | null {
    const { footer: props = {} } = this.slotProps;
    const { close } = this.dialogProps;

    if (close) {
      return props;
    }

    return null;
  }

  /**
   * {@link DialogHeader} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getHeaderProps(): Omit<DialogHeaderProps, "children"> | null {
    const { header: props } = this.slotProps;
    const { title, variant, controls, description, showCloseIconButton } = this.dialogProps;
    const hasControls =
      variant === "default" && (isLikelyVisibleNode(controls) || showCloseIconButton);

    if (
      props !== undefined ||
      isLikelyVisibleNode(title) ||
      isLikelyVisibleNode(description) ||
      hasControls
    ) {
      return props ?? {};
    }

    return null;
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

interface IUseDialogAPI {
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

interface IDialog extends IComponent<DialogProps> {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   */
  <TPayload = any>(props: DialogProps<TPayload>): IComponent.Return;

  /**
   * {@link DialogHandle} を作成する関数です。
   */
  readonly createHandle: typeof createDialogHandle;

  readonly useContentContext: IUseContext<DialogContentContext>;
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
    const contentProps = api.getContentProps();
    const headerProps = api.getHeaderProps();
    const titleProps = api.getTitleProps();
    const descriptionProps = api.getDescriptionProps();
    const controlsProps = api.getControlsProps();
    const bodyProps = api.getBodyProps();
    const footerProps = api.getFooterProps();
    const closeTriggerProps = api.getCloseTriggerProps();

    return (
      <DialogRoot {...api.getRootProps()}>
        {toggleTriggerProps && <DialogToggleTrigger {...toggleTriggerProps} />}
        <DialogPortal {...api.getPortalProps()}>
          <DialogBackdrop {...api.getBackdropProps()} />
          <DialogViewport {...api.getViewportProps()}>
            <DialogContent {...contentProps}>
              {headerProps && (
                <DialogHeader {...headerProps}>
                  {titleProps && <DialogTitle {...titleProps} />}
                  {descriptionProps && <DialogDescription {...descriptionProps} />}
                  {contentProps.variant === "default" && controlsProps && (
                    <DialogControls {...controlsProps} />
                  )}
                </DialogHeader>
              )}
              {bodyProps && <DialogBody {...bodyProps} />}
              {footerProps && (
                <DialogFooter {...footerProps}>
                  {closeTriggerProps && <DialogCloseTrigger {...closeTriggerProps} />}
                </DialogFooter>
              )}
              {contentProps.variant === "stacked" && controlsProps && (
                <DialogControls {...controlsProps} absolute={controlsProps.absolute ?? true} />
              )}
            </DialogContent>
          </DialogViewport>
        </DialogPortal>
      </DialogRoot>
    );
  },
  {
    createHandle: createDialogHandle,
    useContentContext: useDialogContentContext,
  },
);

export namespace Dialog {
  export type State = DialogState;

  export type Props<TPayload = any> = DialogProps<TPayload>;

  export type SlotProps<TPayload = any> = DialogSlotProps<TPayload>;

  export type ContentContext = DialogContentContext;

  export type Actions = DialogActions;

  export type ChangeEventDetails = DialogChangeEventDetails;

  export type ChangeEventReason = DialogChangeEventReason;

  export type Radius = DialogRadius;

  export type Variant = DialogVariant;
}
