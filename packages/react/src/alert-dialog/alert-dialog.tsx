import * as React from "react";

import { XIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import * as Button from "../button/button.parts.js";
import type { IComponent, IUseContext } from "../types.js";
import {
  type AlertDialogHandle,
  type AlertDialogBodyProps,
  type AlertDialogIconProps,
  type AlertDialogRootProps,
  type AlertDialogRootState,
  type AlertDialogTitleProps,
  type AlertDialogFooterProps,
  type AlertDialogHeaderProps,
  type AlertDialogPortalProps,
  type AlertDialogRootActions,
  type AlertDialogContentProps,
  type AlertDialogBackdropProps,
  type AlertDialogContentRadius,
  type AlertDialogControlsProps,
  type AlertDialogViewportProps,
  type AlertDialogContentContext,
  type AlertDialogContentVariant,
  type AlertDialogDescriptionProps,
  type AlertDialogCloseTriggerProps,
  type AlertDialogToggleTriggerProps,
  type AlertDialogRootChangeEventReason,
  type AlertDialogRootChangeEventDetails,
  AlertDialogBody,
  AlertDialogIcon,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogContent,
  AlertDialogBackdrop,
  AlertDialogControls,
  AlertDialogViewport,
  AlertDialogDescription,
  AlertDialogCloseTrigger,
  createAlertDialogHandle,
  AlertDialogToggleTrigger,
  useAlertDialogContentContext,
} from "./alert-dialog.parts.js";

// Types
// -----

export type AlertDialogActions = AlertDialogRootActions;

export type AlertDialogChangeEventDetails = AlertDialogRootChangeEventDetails;

export type AlertDialogChangeEventReason = AlertDialogRootChangeEventReason;

export type AlertDialogRadius = AlertDialogContentRadius;

export type AlertDialogVariant = AlertDialogContentVariant;

/**
 * {@link AlertDialog} の各パーツに渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type AlertDialogSlotProps<TPayload = any> = {
  /**
   * {@link AlertDialogBackdrop} に渡す props です。
   */
  readonly backdrop?: AlertDialogBackdropProps | undefined;

  /**
   * {@link AlertDialogBody} に渡す props です。
   */
  readonly body?: Omit<AlertDialogBodyProps, "children" | "title"> | undefined;

  /**
   * {@link AlertDialogCloseTrigger} に渡す props です。
   */
  readonly cancelTrigger?: Omit<AlertDialogCloseTriggerProps, "children"> | undefined;

  /**
   * {@link AlertDialogCloseTrigger} に渡す props です。
   */
  readonly confirmTrigger?: Omit<AlertDialogCloseTriggerProps, "children"> | undefined;

  /**
   * {@link AlertDialogContent} に渡す props です。
   */
  readonly content?:
    | Omit<AlertDialogContentProps, "children" | keyof AlertDialogProps.AlertDialog>
    | undefined;

  /**
   * {@link AlertDialogControls} に渡す props です。
   */
  readonly controls?: Omit<AlertDialogControlsProps, "children"> | undefined;

  /**
   * {@link AlertDialogDescription} に渡す props です。
   */
  readonly description?: Omit<AlertDialogDescriptionProps, "children"> | undefined;

  /**
   * {@link AlertDialogFooter} に渡す props です。
   */
  readonly footer?: Omit<AlertDialogFooterProps, "children"> | undefined;

  /**
   * {@link AlertDialogHeader} に渡す props です。
   */
  readonly header?: Omit<AlertDialogHeaderProps, "children"> | undefined;

  /**
   * {@link AlertDialogIcon} に渡す props です。
   */
  readonly icon?: Omit<AlertDialogIconProps, "children"> | undefined;

  /**
   * {@link AlertDialogPortal} に渡す props です。
   */
  readonly portal?: Omit<AlertDialogPortalProps, "children"> | undefined;

  /**
   * {@link AlertDialogTitle} に渡す props です。
   */
  readonly title?: Omit<AlertDialogTitleProps, "children"> | undefined;

  /**
   * {@link AlertDialogToggleTrigger} に渡す props です。
   */
  readonly toggleTrigger?:
    | Omit<AlertDialogToggleTriggerProps<TPayload>, "children" | "handle">
    | undefined;

  /**
   * {@link AlertDialogViewport} に渡す props です。
   */
  readonly viewport?: Omit<AlertDialogViewportProps, "children"> | undefined;
};

/**
 * {@link AlertDialog} の状態です。
 */
export type AlertDialogState = AlertDialogRootState;

namespace AlertDialogProps {
  export type AlertDialog<TPayload = any> = {
    /**
     * 中止してアラートダイアログを閉じるボタンです。
     */
    cancel?: AlertDialogCloseTriggerProps["children"] | undefined;

    /**
     * 確認してアラートダイアログを閉じるボタンです。
     */
    confirm?: AlertDialogCloseTriggerProps["children"] | undefined;

    /**
     * コントロールコンポーネントに表示する内容です。
     *
     * アラートダイアログの内側から順に配置されます。
     * {@link AlertDialogProps.AlertDialog.showCancelIconButton|showCancelIconButton} が `true` の場合、それが一番外側に配置されます。
     */
    controls?: AlertDialogControlsProps["children"] | undefined;

    /**
     * アラートダイアログの説明文です。
     */
    description?: React.ReactNode | undefined;

    /**
     * トリガーとアラートダイアログに関連付けるためのハンドルです。
     */
    handle?: AlertDialogHandle<TPayload> | undefined;

    /**
     * アラートのアイコンです。
     */
    icon?: AlertDialogIconProps["children"] | undefined;

    /**
     * 中止ボタンがクリックされたときに呼ばれるコールバックです。
     */
    onCancel?: AlertDialogCloseTriggerProps["onClick"] | undefined;

    /**
     * 確認ボタンがクリックされたときに呼ばれるコールバックです。
     */
    onConfirm?: AlertDialogCloseTriggerProps["onClick"] | undefined;

    /**
     * アラートダイアログに枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: AlertDialogContentProps["outlined"] | undefined;

    /**
     * アラートダイアログの角丸の大きさを指定します。
     *
     * @default "md"
     */
    radius?: AlertDialogContentProps["radius"] | undefined;

    /**
     * アラートダイアログを閉じるアイコンボタンを表示にします。
     *
     * @default false
     */
    showCancelIconButton?: boolean | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: AlertDialogSlotProps<TPayload> | undefined;

    /**
     * アラートダイアログの見出しです。
     */
    title?: React.ReactNode | undefined;

    /**
     * アラートダイアログを開くトリガーです。
     */
    trigger?: AlertDialogToggleTriggerProps["children"] | undefined;

    /**
     * アラートダイアログの主な外観を指定します。
     *
     * @default "default"
     */
    variant?: AlertDialogContentProps["variant"] | undefined;
  };

  export type Body = Omit<AlertDialogBodyProps, keyof AlertDialog | keyof Root> & {
    /**
     * アラートダイアログの HTML `title` 属性です。
     *
     * {@link https://developer.mozilla.org/docs/Web/HTML/Reference/Global_attributes/title|title}
     */
    htmlTitle?: React.HTMLAttributes<HTMLDivElement>["title"];
  };

  export type Root<TPayload = any> = Omit<
    AlertDialogRootProps<TPayload>,
    "children" | keyof AlertDialog
  >;
}

/**
 * {@link AlertDialog} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type AlertDialogProps<TPayload = any> = AlertDialogProps.AlertDialog<TPayload> &
  AlertDialogProps.Root<TPayload> &
  AlertDialogProps.Body;

// API
// ---

function CancelIconButton() {
  const ctx = useAlertDialogContentContext(true);

  return (
    <AlertDialogCloseTrigger className="sui_alert_dialog_cancel_icon_button">
      <Button.Root radius={ctx?.radius} squared variant="naked" aria-label="閉じる">
        <XIcon />
      </Button.Root>
    </AlertDialogCloseTrigger>
  );
}

/**
 * {@link AlertDialog} を構成する各パーツの props などを作成するための API です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export class AlertDialogAPI<TPayload = any> {
  private readonly alertDialogProps: Required<
    Omit<AlertDialogProps.AlertDialog<TPayload>, "slotProps" | "handle">
  >;

  private readonly slotProps: AlertDialogSlotProps<TPayload>;

  private readonly rootProps: Required<AlertDialogProps.Root<TPayload>>;

  private readonly bodyProps: AlertDialogProps.Body;

  private readonly handle: AlertDialogHandle<TPayload>;

  /**
   * @param props {@link AlertDialog} の props です。
   * @param handle トリガーとアラートダイアログを関連付けるためのハンドルです。
   * @internal
   */
  public constructor(
    props: AlertDialogProps<TPayload>,
    handle: AlertDialogHandle<TPayload> = createAlertDialogHandle<TPayload>(),
  ) {
    const {
      icon,
      title,
      cancel,
      radius,
      confirm,
      trigger,
      variant = "default",
      children,
      controls,
      onCancel,
      outlined,
      htmlTitle,
      onConfirm,
      slotProps = {},
      description,
      ...otherProps
    } = props;
    const {
      open,
      handle: handleProp,
      triggerId,
      actionsRef,
      defaultOpen,
      onOpenChange,
      defaultTriggerId,
      onOpenChangeComplete,
      showCancelIconButton = false,
      ...otherBodyProps
    } = otherProps;
    this.alertDialogProps = {
      icon,
      title,
      cancel,
      radius,
      confirm,
      trigger,
      variant,
      controls,
      onCancel,
      outlined,
      onConfirm,
      description,
      showCancelIconButton,
    };
    this.slotProps = slotProps;
    this.rootProps = {
      open,
      triggerId,
      actionsRef,
      defaultOpen,
      onOpenChange,
      defaultTriggerId,
      onOpenChangeComplete,
    };
    this.bodyProps = {
      ...otherBodyProps,
      children,
      htmlTitle,
    };
    this.handle = handleProp ?? handle;
  }

  /**
   * {@link AlertDialogBackdrop} に渡す props を取得します。
   */
  public getBackdropProps(): AlertDialogBackdropProps {
    const { backdrop: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link AlertDialogBody} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getBodyProps(): AlertDialogBodyProps | null {
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
   * {@link AlertDialogCloseTrigger} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getCancelTriggerProps(): AlertDialogCloseTriggerProps | null {
    const { cancelTrigger: props = {} } = this.slotProps;
    const { cancel, onCancel } = this.alertDialogProps;

    if (cancel) {
      const { onClick, ...otherProps } = props;

      return {
        ...otherProps,
        onClick(evt) {
          onClick?.(evt);
          if (evt.defaultPrevented) {
            return;
          }

          onCancel?.(evt);
        },
        children: cancel,
      };
    }

    return null;
  }

  /**
   * {@link AlertDialogCloseTrigger} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getConfirmTriggerProps(): AlertDialogCloseTriggerProps | null {
    const { confirmTrigger: props = {} } = this.slotProps;
    const { confirm, onConfirm } = this.alertDialogProps;

    if (confirm) {
      const { onClick, ...otherProps } = props;

      return {
        ...otherProps,
        onClick(evt) {
          onClick?.(evt);
          if (evt.defaultPrevented) {
            return;
          }

          onConfirm?.(evt);
        },
        children: confirm,
      };
    }

    return null;
  }

  /**
   * {@link AlertDialogContent} に渡す props を取得します。
   */
  public getContentProps(): Omit<AlertDialogContentProps, "children"> {
    const { content: props = {} } = this.slotProps;
    const { radius, variant, outlined } = this.alertDialogProps;

    return {
      ...props,
      radius,
      variant,
      outlined,
    };
  }

  /**
   * {@link AlertDialogControls} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getControlsProps(): AlertDialogControlsProps | null {
    const { controls: props = {} } = this.slotProps;
    const { controls, showCancelIconButton } = this.alertDialogProps;

    if (isLikelyVisibleNode(controls) || showCancelIconButton) {
      return {
        ...props,
        children: (
          <>
            {controls}
            {showCancelIconButton && <CancelIconButton />}
          </>
        ),
      };
    }

    return null;
  }

  /**
   * {@link AlertDialogDescription} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getDescriptionProps(): AlertDialogDescriptionProps | null {
    const { description: props = {} } = this.slotProps;
    const { description } = this.alertDialogProps;

    if (isLikelyVisibleNode(description)) {
      return {
        ...props,
        children: description,
      };
    }

    return null;
  }

  /**
   * {@link AlertDialogFooter} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getFooterProps(): Omit<AlertDialogFooterProps, "children"> | null {
    const { footer: props = {} } = this.slotProps;
    const { cancel, confirm } = this.alertDialogProps;

    if (cancel || confirm) {
      return props;
    }

    return null;
  }

  /**
   * {@link AlertDialogHeader} に渡す props を取得します。
   */
  public getHeaderProps(): Omit<AlertDialogHeaderProps, "children"> {
    const { header: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link AlertDialogIcon} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getIconProps(): AlertDialogIconProps | null {
    const { icon: props = {} } = this.slotProps;
    const { icon } = this.alertDialogProps;

    if (isLikelyVisibleNode(icon)) {
      return {
        ...props,
        children: icon,
      };
    }

    return null;
  }

  /**
   * {@link AlertDialogPortal} に渡す props を取得します。
   */
  public getPortalProps(): Omit<AlertDialogPortalProps, "children"> {
    const { portal: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link AlertDialogRoot} に渡す props を取得します。
   */
  public getRootProps(): Required<Omit<AlertDialogRootProps<TPayload>, "children">> {
    return {
      ...this.rootProps,
      handle: this.handle,
    };
  }

  /**
   * {@link AlertDialogTitle} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getTitleProps(): AlertDialogTitleProps | null {
    const { title: props = {} } = this.slotProps;
    const { title } = this.alertDialogProps;

    if (isLikelyVisibleNode(title)) {
      return {
        ...props,
        children: title,
      };
    }

    return null;
  }

  /**
   * {@link AlertDialogToggleTrigger} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getToggleTriggerProps(): AlertDialogToggleTriggerProps<TPayload> | null {
    const { toggleTrigger: props = {} } = this.slotProps;
    const { trigger } = this.alertDialogProps;

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
   * {@link AlertDialogViewport} に渡す props を取得します。
   */
  public getViewportProps(): Omit<AlertDialogViewportProps, "children"> {
    const { viewport: props = {} } = this.slotProps;

    return props;
  }
}

interface IUseAlertDialogAPI {
  /**
   * {@link AlertDialogAPI} を作成します。
   *
   * @template TPayload トリガーが送信するデータの型です。
   * @param props {@link AlertDialog} の props です。
   * @returns アラートダイアログの API です
   */
  <TPayload = any>(props: AlertDialogProps<TPayload>): AlertDialogAPI<TPayload>;
}

/**
 * {@link AlertDialogAPI} を作成するフックです。
 */
export const useAlertDialogAPI: IUseAlertDialogAPI = function useSuiAlertDialogAPI<TPayload>(
  props: AlertDialogProps<TPayload>,
) {
  const handle = React.useMemo(
    () => props.handle ?? createAlertDialogHandle<TPayload>(),
    [props.handle],
  );

  return new AlertDialogAPI(props, handle);
};

export { AlertDialogAPI as API, useAlertDialogAPI as useAPI };

// Component
// ---------

interface IAlertDialog extends IComponent<AlertDialogProps> {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   */
  <TPayload = any>(props: AlertDialogProps<TPayload>): IComponent.Return;

  /**
   * {@link AlertDialogHandle} を作成する関数です。
   */
  readonly createHandle: typeof createAlertDialogHandle;

  readonly useContentContext: IUseContext<AlertDialogContentContext>;
}

/**
 * アラートダイアログを表示するコンポーネントです。
 *
 * 構成を細かく制御する場合は、{@link AlertDialogRoot|Root} を直接組み立てます。
 */
export const AlertDialog: IAlertDialog = /*#__PURE__*/ Object.assign(
  function SuiAlertDialog(props: AlertDialogProps) {
    const api = useAlertDialogAPI(props);
    const toggleTriggerProps = api.getToggleTriggerProps();
    const contentProps = api.getContentProps();
    const iconProps = api.getIconProps();
    const titleProps = api.getTitleProps();
    const descriptionProps = api.getDescriptionProps();
    const controlsProps = api.getControlsProps();
    const bodyProps = api.getBodyProps();
    const footerProps = api.getFooterProps();
    const cancelTriggerProps = api.getCancelTriggerProps();
    const confirmTriggerProps = api.getConfirmTriggerProps();

    return (
      <AlertDialogRoot {...api.getRootProps()}>
        {toggleTriggerProps && <AlertDialogToggleTrigger {...toggleTriggerProps} />}
        <AlertDialogPortal {...api.getPortalProps()}>
          <AlertDialogBackdrop {...api.getBackdropProps()} />
          <AlertDialogViewport {...api.getViewportProps()}>
            <AlertDialogContent {...contentProps}>
              <AlertDialogHeader {...api.getHeaderProps()}>
                {iconProps && <AlertDialogIcon {...iconProps} />}
                {titleProps && <AlertDialogTitle {...titleProps} />}
                {descriptionProps && <AlertDialogDescription {...descriptionProps} />}
                {contentProps.variant === "default" && controlsProps && (
                  <AlertDialogControls {...controlsProps} />
                )}
              </AlertDialogHeader>
              {bodyProps && <AlertDialogBody {...bodyProps} />}
              {footerProps && (
                <AlertDialogFooter {...footerProps}>
                  {cancelTriggerProps && <AlertDialogCloseTrigger {...cancelTriggerProps} />}
                  {confirmTriggerProps && <AlertDialogCloseTrigger {...confirmTriggerProps} />}
                </AlertDialogFooter>
              )}
              {contentProps.variant === "stacked" && controlsProps && (
                <AlertDialogControls {...controlsProps} absolute={controlsProps.absolute ?? true} />
              )}
            </AlertDialogContent>
          </AlertDialogViewport>
        </AlertDialogPortal>
      </AlertDialogRoot>
    );
  },
  {
    createHandle: createAlertDialogHandle,
    useContentContext: useAlertDialogContentContext,
  },
);

export namespace AlertDialog {
  export type State = AlertDialogState;

  export type Props<TPayload = any> = AlertDialogProps<TPayload>;

  export type SlotProps<TPayload = any> = AlertDialogSlotProps<TPayload>;

  export type ContentContext = AlertDialogContentContext;

  export type Actions = AlertDialogActions;

  export type ChangeEventDetails = AlertDialogChangeEventDetails;

  export type ChangeEventReason = AlertDialogChangeEventReason;

  export type Radius = AlertDialogRadius;

  export type Variant = AlertDialogVariant;
}
