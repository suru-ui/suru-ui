import * as React from "react";

import { XIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import * as Button from "../button/button.parts.js";
import type { Override, IComponent } from "../types.js";
import {
  type AlertDialogHandle,
  type AlertDialogIconProps,
  type AlertDialogPopupSize,
  type AlertDialogRootProps,
  type AlertDialogRootState,
  type AlertDialogPopupProps,
  type AlertDialogTitleProps,
  type AlertDialogActionProps,
  type AlertDialogFooterProps,
  type AlertDialogHeaderProps,
  type AlertDialogPopupRadius,
  type AlertDialogPortalProps,
  type AlertDialogRootActions,
  type AlertDialogContentProps,
  type AlertDialogPopupContext,
  type AlertDialogPopupVariant,
  type AlertDialogBackdropProps,
  type AlertDialogViewportProps,
  type ICreateAlertDialogHandle,
  type IAlertDialogToggleTrigger,
  type AlertDialogDescriptionProps,
  type IUseAlertDialogPopupContext,
  type AlertDialogCloseTriggerProps,
  type AlertDialogToggleTriggerProps,
  type AlertDialogRootChangeEventReason,
  type AlertDialogRootChangeEventDetails,
  AlertDialogIcon,
  AlertDialogRoot,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogContent,
  AlertDialogBackdrop,
  AlertDialogViewport,
  AlertDialogDescription,
  AlertDialogCloseTrigger,
  createAlertDialogHandle,
  AlertDialogToggleTrigger,
  useAlertDialogPopupContext,
} from "./alert-dialog.parts.js";

// Types.

export type AlertDialogActions = AlertDialogRootActions;

export type AlertDialogChangeEventDetails = AlertDialogRootChangeEventDetails;

export type AlertDialogChangeEventReason = AlertDialogRootChangeEventReason;

export type AlertDialogRadius = AlertDialogPopupRadius;

export type AlertDialogSize = AlertDialogPopupSize;

export type AlertDialogVariant = AlertDialogPopupVariant;

/**
 * {@link AlertDialog} の各パーツに渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type AlertDialogSlotProps<TPayload = any> = {
  /**
   * {@link AlertDialogAction} に渡す props です。
   */
  readonly action?: Omit<AlertDialogActionProps, "children"> | undefined;

  /**
   * {@link AlertDialogBackdrop} に渡す props です。
   */
  readonly backdrop?: AlertDialogBackdropProps | undefined;

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
  readonly content?: Omit<AlertDialogContentProps, "children"> | undefined;

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
     * アラートダイアログのヘッダー右上に表示する操作要素です。
     *
     * {@link AlertDialogProps.AlertDialog.showCancelIconButton|showCancelIconButton} が `true` の場合、その手前に配置されます。
     */
    action?: AlertDialogActionProps["children"] | undefined;

    /** 中止してアラートダイアログを閉じるボタンです。 */
    cancel?: AlertDialogCloseTriggerProps["children"] | undefined;

    /** 確認してアラートダイアログを閉じるボタンです。 */
    confirm?: AlertDialogCloseTriggerProps["children"] | undefined;

    /** アラートダイアログの説明文です。 */
    description?: AlertDialogDescriptionProps["children"] | undefined;

    /**
     * アラートダイアログの末尾に表示する内容です。
     *
     * {@link AlertDialogProps.AlertDialog.cancel|cancel} と {@link AlertDialogProps.AlertDialog.confirm|confirm} を指定した場合、それらが末尾に配置されます。
     */
    footer?: AlertDialogFooterProps["children"] | undefined;

    /** アラートのアイコンです。 */
    icon?: AlertDialogIconProps["children"] | undefined;

    /** 中止ボタンがクリックされたときに呼ばれるコールバックです。 */
    onCancel?: AlertDialogCloseTriggerProps["onClick"] | undefined;

    /** 確認ボタンがクリックされたときに呼ばれるコールバックです。 */
    onConfirm?: AlertDialogCloseTriggerProps["onClick"] | undefined;

    /**
     * アラートダイアログを閉じるアイコンボタンを表示にします。
     *
     * @default false
     */
    showCancelIconButton?: boolean | undefined;

    /** 各パーツに個別の props を渡すためのオブジェクトです。 */
    slotProps?: AlertDialogSlotProps<TPayload> | undefined;

    /** アラートダイアログの見出しです。 */
    title?: AlertDialogTitleProps["children"] | undefined;

    /**
     * アラートダイアログを開くトリガーです。
     *
     * {@link AlertDialogProps.AlertDialog.slotProps|slotProps.toggleTrigger} だけを指定しても描画されません。
     */
    trigger?: AlertDialogToggleTriggerProps["children"] | undefined;
  };

  export type Content = Pick<AlertDialogContentProps, "children">;

  export type Popup = Omit<AlertDialogPopupProps, "children" | keyof AlertDialog | keyof Root>;

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
  AlertDialogProps.Popup &
  AlertDialogProps.Content;

export interface IUseAlertDialogAPI {
  /**
   * {@link AlertDialogAPI} を作成します。
   *
   * @template TPayload トリガーが送信するデータの型です。
   *
   * @param props {@link AlertDialog} の props です。
   *
   * @returns アラートダイアログの API です
   */
  <TPayload = any>(props: AlertDialogProps<TPayload>): AlertDialogAPI<TPayload>;
}

// API.

function CancelIconButton(): React.ReactElement {
  const ctx = useAlertDialogPopupContext();

  return (
    <AlertDialogCloseTrigger>
      <Button.Root size={ctx.size} radius={ctx.radius} squared variant="naked" aria-label="閉じる">
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
    Omit<AlertDialogProps.AlertDialog<TPayload>, "slotProps">
  >;

  private readonly slotProps: AlertDialogSlotProps<TPayload>;

  private readonly rootProps: Required<AlertDialogProps.Root<TPayload>>;

  private readonly popupProps: AlertDialogProps.Popup;

  private readonly contentProps: Required<AlertDialogProps.Content> | null;

  /**
   * @param props {@link AlertDialog} の props です。
   *
   * @internal
   */
  public constructor(
    props: Override<
      AlertDialogProps<TPayload>,
      {
        handle: AlertDialogHandle<TPayload>;
      }
    >,
  ) {
    const {
      icon,
      open,
      title,
      action,
      cancel,
      footer,
      handle,
      confirm,
      trigger,
      children,
      onCancel,
      onConfirm,
      slotProps = {},
      triggerId,
      actionsRef,
      defaultOpen,
      description,
      onOpenChange,
      defaultTriggerId,
      onOpenChangeComplete,
      showCancelIconButton = false,
      ...popupProps
    } = props;
    this.alertDialogProps = {
      icon,
      title,
      action,
      cancel,
      footer,
      confirm,
      trigger,
      onCancel,
      onConfirm,
      description,
      showCancelIconButton,
    };
    this.slotProps = slotProps;
    this.rootProps = {
      open,
      handle,
      triggerId,
      actionsRef,
      defaultOpen,
      onOpenChange,
      defaultTriggerId,
      onOpenChangeComplete,
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
   * {@link AlertDialogAction} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getActionProps(): AlertDialogActionProps | null {
    const { action: props = {} } = this.slotProps;
    const { action, showCancelIconButton } = this.alertDialogProps;

    if (showCancelIconButton === true || isLikelyVisibleNode(action)) {
      return {
        ...props,
        children: action === undefined ? <CancelIconButton /> : action,
      };
    }

    return null;
  }

  /**
   * {@link AlertDialogBackdrop} に渡す props を取得します。
   */
  public getBackdropProps(): AlertDialogBackdropProps {
    const { backdrop: props = {} } = this.slotProps;

    return props;
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
   *
   * それを表示しないときは `null` を返します。
   */
  public getContentProps(): AlertDialogContentProps | null {
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
  public getFooterProps(): AlertDialogFooterProps | null {
    const { footer: props = {} } = this.slotProps;
    const { cancel, footer, confirm } = this.alertDialogProps;

    if (isLikelyVisibleNode(footer) || cancel || confirm) {
      return {
        ...props,
        children: footer,
      };
    }

    return null;
  }

  /**
   * {@link AlertDialogHeader} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getHeaderProps(): Omit<AlertDialogHeaderProps, "children"> | null {
    const { header: props = {} } = this.slotProps;
    const { icon, title, action, description, showCancelIconButton } = this.alertDialogProps;

    if (
      showCancelIconButton === true ||
      isLikelyVisibleNode(icon) ||
      isLikelyVisibleNode(title) ||
      isLikelyVisibleNode(action) ||
      isLikelyVisibleNode(description)
    ) {
      return props;
    }

    return null;
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
   * {@link AlertDialogPopup} に渡す props を取得します。
   */
  public getPopupProps(): AlertDialogProps.Popup {
    return this.popupProps;
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
    return this.rootProps;
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
   * {@link AlertDialogViewport} に渡す props を取得します。
   */
  public getViewportProps(): Omit<AlertDialogViewportProps, "children"> {
    const { viewport: props = {} } = this.slotProps;

    return props;
  }
}

/**
 * {@link AlertDialogAPI} を作成するフックです。
 */
export const useAlertDialogAPI: IUseAlertDialogAPI = <TPayload,>(
  props: AlertDialogProps<TPayload>,
) => {
  const { handle: handleProp, ...otherProps } = props;
  const handle = React.useMemo(
    () => handleProp ?? createAlertDialogHandle<TPayload>(),
    [handleProp],
  );

  return new AlertDialogAPI({
    ...otherProps,
    handle,
  });
};

export { AlertDialogAPI as API, useAlertDialogAPI as useAPI };

// Component.

export interface IAlertDialog extends IComponent<AlertDialogProps> {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   */
  <TPayload = any>(props: AlertDialogProps<TPayload>): IComponent.Return;
  readonly ToggleTrigger: IAlertDialogToggleTrigger;

  /**
   * {@link AlertDialogHandle} を作成する関数です。
   */
  readonly createHandle: ICreateAlertDialogHandle;
  readonly usePopupContext: IUseAlertDialogPopupContext;
}

/**
 * アラートダイアログを表示するコンポーネントです。
 *
 * 構成を細かく制御する場合は、{@link AlertDialogRoot|Root} を直接組み立てます。
 */
export const AlertDialog: IAlertDialog = /*#__PURE__*/ Object.assign(
  (props: AlertDialogProps) => {
    const api = useAlertDialogAPI(props);
    const toggleTriggerProps = api.getToggleTriggerProps();
    const popupProps = api.getPopupProps();
    const headerProps = api.getHeaderProps();
    const iconProps = api.getIconProps();
    const titleProps = api.getTitleProps();
    const descriptionProps = api.getDescriptionProps();
    const actionProps = api.getActionProps();
    const contentProps = api.getContentProps();
    const footerProps = api.getFooterProps();
    const cancelTriggerProps = api.getCancelTriggerProps();
    const confirmTriggerProps = api.getConfirmTriggerProps();

    return (
      <AlertDialogRoot {...api.getRootProps()}>
        {toggleTriggerProps && <AlertDialogToggleTrigger {...toggleTriggerProps} />}
        <AlertDialogPortal {...api.getPortalProps()}>
          <AlertDialogBackdrop {...api.getBackdropProps()} />
          <AlertDialogViewport {...api.getViewportProps()}>
            <AlertDialogPopup {...popupProps}>
              {headerProps && (
                <AlertDialogHeader {...headerProps}>
                  {iconProps && <AlertDialogIcon {...iconProps} />}
                  {titleProps && <AlertDialogTitle {...titleProps} />}
                  {descriptionProps && <AlertDialogDescription {...descriptionProps} />}
                  {actionProps && <AlertDialogAction {...actionProps} />}
                </AlertDialogHeader>
              )}
              {contentProps && <AlertDialogContent {...contentProps} />}
              {footerProps && (
                <AlertDialogFooter {...footerProps}>
                  {footerProps.children}
                  {cancelTriggerProps && <AlertDialogCloseTrigger {...cancelTriggerProps} />}
                  {confirmTriggerProps && <AlertDialogCloseTrigger {...confirmTriggerProps} />}
                </AlertDialogFooter>
              )}
            </AlertDialogPopup>
          </AlertDialogViewport>
        </AlertDialogPortal>
      </AlertDialogRoot>
    );
  },
  {
    createHandle: createAlertDialogHandle,
    ToggleTrigger: AlertDialogToggleTrigger,
    usePopupContext: useAlertDialogPopupContext,
  },
);

export namespace AlertDialog {
  export type State = AlertDialogState;

  export type Props<TPayload = any> = AlertDialogProps<TPayload>;

  export type SlotProps<TPayload = any> = AlertDialogSlotProps<TPayload>;

  export type PopupContext = AlertDialogPopupContext;

  export type Actions = AlertDialogActions;

  export type ChangeEventDetails = AlertDialogChangeEventDetails;

  export type ChangeEventReason = AlertDialogChangeEventReason;

  export type Radius = AlertDialogRadius;

  export type Size = AlertDialogSize;

  export type Variant = AlertDialogVariant;
}
