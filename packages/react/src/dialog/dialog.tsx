import * as React from "react";

import { XIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import * as Button from "../button/button.parts.jsx";
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
} from "./dialog.parts.jsx";

// Types
// -----

/**
 * {@link DialogRootActions}
 */
export type DialogActions = DialogRootActions;

/**
 * {@link DialogRootChangeEventDetails}
 */
export type DialogChangeEventDetails = DialogRootChangeEventDetails;

/**
 * {@link DialogRootChangeEventReason}
 */
export type DialogChangeEventReason = DialogRootChangeEventReason;

/**
 * {@link DialogContentRadius}
 */
export type DialogRadius = DialogContentRadius;

/**
 * {@link DialogContentVariant}
 */
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
   * {@link DialogCloseTrigger} に渡す props です。
   */
  readonly closeTrigger?: Omit<DialogCloseTriggerProps, "children"> | undefined;

  /**
   * {@link DialogContent} に渡す props です。
   */
  readonly content?: Omit<DialogContentProps, "children" | keyof DialogPropsContent> | undefined;

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

type DialogPropsMain<TPayload = any> = {
  /**
   * ダイアログを閉じるボタンです。
   */
  close?: DialogCloseTriggerProps["children"] | undefined;

  /**
   * コントロールコンポーネントに表示する内容です。
   *
   * ダイアログの内側から順に配置されます。
   * {@link DialogPropsMain.showCloseIconButton|showCloseIconButton} が `true` の場合、それが一番外側に配置されます。
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
   */
  trigger?: DialogToggleTriggerProps["children"] | undefined;
};

type DialogPropsRoot<TPayload = any> = Omit<
  DialogRootProps<TPayload>,
  "children" | keyof DialogPropsMain
>;

type DialogPropsBody = Omit<DialogBodyProps, keyof DialogPropsMain | keyof DialogPropsRoot> & {
  /**
   * {@link https://developer.mozilla.org/docs/Web/HTML/Reference/Global_attributes/title|title}
   */
  htmlTitle?: React.HTMLAttributes<HTMLDivElement>["title"];
};

type DialogPropsContent = Pick<DialogContentProps, "outlined" | "radius" | "variant">;

/**
 * {@link Dialog} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DialogProps<TPayload = any> = DialogPropsMain<TPayload> &
  DialogPropsRoot<TPayload> &
  DialogPropsBody &
  DialogPropsContent;

// API
// ---

function CloseIconButton() {
  const ctx = useDialogContentContext(true);

  return (
    <DialogCloseTrigger>
      <Button.Root radius={ctx?.radius} squared variant="naked">
        <Button.Content>
          <XIcon />
        </Button.Content>
      </Button.Root>
    </DialogCloseTrigger>
  );
}

/**
 * {@link Dialog} を構成する各パーツの props などを作成するための API です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export interface DialogAPI<TPayload = any> {
  /**
   * {@link DialogBackdrop} に渡す props を取得します。
   */
  getBackdropProps(): DialogBackdropProps;

  /**
   * {@link DialogBody} に渡す props を取得します。
   */
  getBodyProps(): DialogBodyProps | null;

  /**
   * {@link DialogCloseTrigger} に渡す props を取得します。
   */
  getCloseTriggerProps(): DialogCloseTriggerProps | null;

  /**
   * {@link DialogContent} に渡す props を取得します。
   */
  getContentProps(): Omit<DialogContentProps, "children">;

  /**
   * {@link DialogControls} に渡す props を取得します。
   */
  getControlsProps(): DialogControlsProps | null;

  /**
   * {@link DialogDescription} に渡す props を取得します。
   */
  getDescriptionProps(): DialogDescriptionProps | null;

  /**
   * {@link DialogFooter} に渡す props を取得します。
   */
  getFooterProps(): Omit<DialogFooterProps, "children"> | null;

  /**
   * {@link DialogHeader} に渡す props を取得します。
   */
  getHeaderProps(): Omit<DialogHeaderProps, "children">;

  /**
   * {@link DialogPortal} に渡す props を取得します。
   */
  getPortalProps(): Omit<DialogPortalProps, "children">;

  /**
   * {@link DialogRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<DialogRootProps, "children">;

  /**
   * {@link DialogTitle} に渡す props を取得します。
   */
  getTitleProps(): DialogTitleProps | null;

  /**
   * {@link DialogToggleTrigger} に渡す props を取得します。
   */
  getToggleTriggerProps(): DialogToggleTriggerProps<TPayload> | null;

  /**
   * {@link DialogViewport} に渡す props を取得します。
   */
  getViewportProps(): Omit<DialogViewportProps, "children">;
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
export const useDialogAPI: IUseDialogAPI = function useSuiDialogAPI(props) {
  const {
    open,
    close,
    modal,
    title,
    handle: handleProp,
    radius,
    onClose,
    trigger,
    variant,
    children,
    controls,
    outlined,
    htmlTitle,
    slotProps: {
      title: titleProps = {},
      footer: footerProps = {},
      header: headerProps = {},
      portal: portalProps = {},
      content: contentProps = {},
      backdrop: backdropProps = {},
      controls: controlsProps = {},
      viewport: viewportProps = {},
      description: descriptionProps = {},
      closeTrigger: closeTriggerProps = {},
      toggleTrigger: toggleTriggerProps = {},
    } = {},
    triggerId,
    actionsRef,
    defaultOpen,
    description,
    onOpenChange,
    defaultTriggerId,
    showCloseIconButton = true,
    onOpenChangeComplete,
    disablePointerDismissal,
    ...otherBodyProps
  } = props;
  const handle = React.useMemo(() => handleProp || createDialogHandle(), [handleProp]);

  return {
    getBodyProps() {
      if (isLikelyVisibleNode(children)) {
        return {
          ...otherBodyProps,
          title: htmlTitle,
          children,
        };
      }

      return null;
    },
    getRootProps(): Omit<DialogRootProps, "children"> {
      return {
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
    },
    getTitleProps() {
      if (isLikelyVisibleNode(title)) {
        return {
          ...titleProps,
          children: title,
        };
      }

      return null;
    },
    getFooterProps() {
      if (isLikelyVisibleNode(close)) {
        return footerProps;
      }

      return null;
    },
    getHeaderProps() {
      return headerProps;
    },
    getPortalProps() {
      return portalProps;
    },
    getContentProps() {
      const requiredProps: Required<DialogPropsContent> = {
        radius,
        variant,
        outlined,
      };

      return {
        ...requiredProps,
        ...contentProps,
      };
    },
    getBackdropProps() {
      return backdropProps;
    },
    getControlsProps() {
      if (isLikelyVisibleNode(controls) || showCloseIconButton) {
        return {
          ...controlsProps,
          children: (
            <>
              {controls}
              {showCloseIconButton && <CloseIconButton />}
            </>
          ),
        };
      }

      return null;
    },
    getViewportProps() {
      return viewportProps;
    },
    getDescriptionProps() {
      if (isLikelyVisibleNode(description)) {
        return {
          ...descriptionProps,
          children: description,
        };
      }

      return null;
    },
    getCloseTriggerProps() {
      if (isLikelyVisibleNode(close)) {
        const { onClick, ...otherCloseButtonProps } = closeTriggerProps;

        return {
          ...otherCloseButtonProps,
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
    },
    getToggleTriggerProps() {
      if (trigger) {
        return {
          ...toggleTriggerProps,
          handle,
          children: trigger,
        };
      }

      return null;
    },
  };
};

export { type DialogAPI as API, useDialogAPI as useAPI };

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

  /**
   * {@link useDialogContentContext}
   */
  readonly useContentContext: IUseContext<DialogContentContext>;
}

/**
 * ダイアログを表示するコンポーネントです。
 */
export const Dialog: IDialog = /*#__PURE__*/ Object.assign(
  function SuiDialog(props: DialogProps) {
    const api = useDialogAPI(props);
    const toggleTriggerProps = api.getToggleTriggerProps();
    const contentProps = api.getContentProps();
    const controlsProps = api.getControlsProps();
    const titleProps = api.getTitleProps();
    const descriptionProps = api.getDescriptionProps();
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
              <DialogHeader {...api.getHeaderProps()}>
                {titleProps && <DialogTitle {...titleProps} />}
                {descriptionProps && <DialogDescription {...descriptionProps} />}
                {contentProps.variant === "default" && controlsProps && (
                  <DialogControls {...controlsProps} />
                )}
              </DialogHeader>
              {bodyProps && <DialogBody {...bodyProps} />}
              {footerProps && (
                <DialogFooter {...footerProps}>
                  {closeTriggerProps && <DialogCloseTrigger {...closeTriggerProps} />}
                </DialogFooter>
              )}
              {contentProps.variant === "stacked" && controlsProps && (
                <DialogControls {...controlsProps} absolute={controlsProps?.absolute ?? true} />
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
  /**
   * {@link DialogState} です。
   */
  export type State = DialogState;

  /**
   * {@link DialogProps} です。
   */
  export type Props = DialogProps;

  /**
   * {@link DialogSlotProps} です。
   */
  export type SlotProps = DialogSlotProps;

  /**
   * {@link DialogContentContext}
   */
  export type ContentContext = DialogContentContext;

  /**
   * {@link DialogActions}
   */
  export type Actions = DialogActions;

  /**
   * {@link DialogChangeEventDetails}
   */
  export type ChangeEventDetails = DialogChangeEventDetails;

  /**
   * {@link DialogChangeEventReason}
   */
  export type ChangeEventReason = DialogChangeEventReason;

  /**
   * {@link DialogRadius}
   */
  export type Radius = DialogRadius;

  /**
   * {@link DialogVariant}
   */
  export type Variant = DialogVariant;
}
