import * as React from "react";

import { XIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import { ButtonRoot } from "../button/button.parts.jsx";
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
} from "./alert-dialog.parts.jsx";

// Types
// -----

/**
 * {@link AlertDialogRootActions}
 */
export type AlertDialogActions = AlertDialogRootActions;

/**
 * {@link AlertDialogRootChangeEventDetails}
 */
export type AlertDialogChangeEventDetails = AlertDialogRootChangeEventDetails;

/**
 * {@link AlertDialogRootChangeEventReason}
 */
export type AlertDialogChangeEventReason = AlertDialogRootChangeEventReason;

/**
 * {@link AlertDialogContentRadius}
 */
export type AlertDialogRadius = AlertDialogContentRadius;

/**
 * {@link AlertDialogContentVariant}
 */
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
    | Omit<AlertDialogContentProps, "children" | keyof AlertDialogPropsContent>
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

type AlertDialogPropsMain<TPayload = any> = {
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
   * {@link AlertDialogPropsMain.showCancelIconButton|showCancelIconButton} が `true` の場合、それが一番外側に配置されます。
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
};

type AlertDialogPropsRoot<TPayload = any> = Omit<
  AlertDialogRootProps<TPayload>,
  "children" | keyof AlertDialogPropsMain
>;

type AlertDialogPropsBody = Omit<
  AlertDialogBodyProps,
  keyof AlertDialogPropsMain | keyof AlertDialogPropsRoot
> & {
  /**
   * {@link https://developer.mozilla.org/docs/Web/HTML/Reference/Global_attributes/title|title}
   */
  htmlTitle?: React.HTMLAttributes<HTMLDivElement>["title"];
};

type AlertDialogPropsContent = Pick<AlertDialogContentProps, "outlined" | "radius" | "variant">;

/**
 * {@link AlertDialog} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type AlertDialogProps<TPayload = any> = AlertDialogPropsMain<TPayload> &
  AlertDialogPropsRoot<TPayload> &
  AlertDialogPropsBody &
  AlertDialogPropsContent;

// API
// ---

function CancelIconButton() {
  const ctx = useAlertDialogContentContext(true);

  return (
    <AlertDialogCloseTrigger>
      <ButtonRoot radius={ctx?.radius} squared variant="naked">
        <XIcon />
      </ButtonRoot>
    </AlertDialogCloseTrigger>
  );
}

/**
 * {@link AlertDialog} を構成する各パーツの props などを作成するための API です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export interface AlertDialogAPI<TPayload = any> {
  /**
   * {@link AlertDialogBackdrop} に渡す props を取得します。
   */
  getBackdropProps(): AlertDialogBackdropProps;

  /**
   * {@link AlertDialogBody} に渡す props を取得します。
   */
  getBodyProps(): AlertDialogBodyProps | null;

  /**
   * {@link AlertDialogCloseTrigger} に渡す props を取得します。
   */
  getCancelTriggerProps(): AlertDialogCloseTriggerProps | null;

  /**
   * {@link AlertDialogCloseTrigger} に渡す props を取得します。
   */
  getConfirmTriggerProps(): AlertDialogCloseTriggerProps | null;

  /**
   * {@link AlertDialogContent} に渡す props を取得します。
   */
  getContentProps(): Omit<AlertDialogContentProps, "children">;

  /**
   * {@link AlertDialogControls} に渡す props を取得します。
   */
  getControlsProps(): AlertDialogControlsProps | null;

  /**
   * {@link AlertDialogDescription} に渡す props を取得します。
   */
  getDescriptionProps(): AlertDialogDescriptionProps | null;

  /**
   * {@link AlertDialogFooter} に渡す props を取得します。
   */
  getFooterProps(): Omit<AlertDialogFooterProps, "children"> | null;

  /**
   * {@link AlertDialogHeader} に渡す props を取得します。
   */
  getHeaderProps(): Omit<AlertDialogHeaderProps, "children">;

  /**
   * {@link AlertDialogIcon} に渡す props を取得します。
   */
  getIconProps(): AlertDialogIconProps | null;

  /**
   * {@link AlertDialogPortal} に渡す props を取得します。
   */
  getPortalProps(): Omit<AlertDialogPortalProps, "children">;

  /**
   * {@link AlertDialogRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<AlertDialogRootProps, "children">;

  /**
   * {@link AlertDialogTitle} に渡す props を取得します。
   */
  getTitleProps(): AlertDialogTitleProps | null;

  /**
   * {@link AlertDialogToggleTrigger} に渡す props を取得します。
   */
  getToggleTriggerProps(): AlertDialogToggleTriggerProps<TPayload> | null;

  /**
   * {@link AlertDialogViewport} に渡す props を取得します。
   */
  getViewportProps(): Omit<AlertDialogViewportProps, "children">;
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
export const useAlertDialogAPI: IUseAlertDialogAPI = function useSuiAlertDialogAPI(props) {
  const {
    icon,
    open,
    title,
    cancel,
    handle: handleProp,
    radius,
    confirm,
    trigger,
    variant,
    children,
    controls,
    onCancel,
    outlined,
    htmlTitle,
    onConfirm,
    slotProps: {
      icon: iconProps = {},
      title: titleProps = {},
      footer: footerProps = {},
      header: headerProps = {},
      portal: portalProps = {},
      content: contentProps = {},
      backdrop: backdropProps = {},
      controls: controlsProps = {},
      viewport: viewportProps = {},
      description: descriptionProps = {},
      cancelTrigger: cancelTriggerProps = {},
      toggleTrigger: toggleTriggerProps = {},
      confirmTrigger: confirmTriggerProps = {},
    } = {},
    triggerId,
    actionsRef,
    defaultOpen,
    description,
    onOpenChange,
    defaultTriggerId,
    onOpenChangeComplete,
    showCancelIconButton = false,
    ...otherBodyProps
  } = props;
  const handle = React.useMemo(() => handleProp || createAlertDialogHandle(), [handleProp]);

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
    getIconProps() {
      if (isLikelyVisibleNode(icon)) {
        return {
          ...iconProps,
          children: icon,
        };
      }

      return null;
    },
    getRootProps(): Required<Omit<AlertDialogRootProps, "children">> {
      return {
        open,
        handle,
        triggerId,
        actionsRef,
        defaultOpen,
        onOpenChange,
        defaultTriggerId,
        onOpenChangeComplete,
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
      if (isLikelyVisibleNode(cancel) || isLikelyVisibleNode(confirm)) {
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
      const requiredProps: Required<AlertDialogPropsContent> = {
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
      if (isLikelyVisibleNode(controls) || showCancelIconButton) {
        return {
          ...controlsProps,
          children: (
            <>
              {controls}
              {showCancelIconButton && <CancelIconButton />}
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
    getCancelTriggerProps() {
      if (isLikelyVisibleNode(cancel)) {
        const { onClick, ...otherCancelButtonProps } = cancelTriggerProps;

        return {
          ...otherCancelButtonProps,
          children: cancel,
          onClick(evt) {
            onClick?.(evt);
            if (evt.defaultPrevented) {
              return;
            }

            onCancel?.(evt);
          },
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
    getConfirmTriggerProps() {
      if (isLikelyVisibleNode(confirm)) {
        const { onClick, ...otherConfirmButtonProps } = confirmTriggerProps;

        return {
          ...otherConfirmButtonProps,
          children: confirm,
          onClick(evt) {
            onClick?.(evt);
            if (evt.defaultPrevented) {
              return;
            }

            onConfirm?.(evt);
          },
        };
      }

      return null;
    },
  };
};

export { type AlertDialogAPI as API, useAlertDialogAPI as useAPI };

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

  /**
   * {@link useAlertDialogContentContext}
   */
  readonly useContentContext: IUseContext<AlertDialogContentContext>;
}

/**
 * アラートダイアログを表示するコンポーネントです。
 */
export const AlertDialog: IAlertDialog = /*#__PURE__*/ Object.assign(
  function SuiAlertDialog(props: AlertDialogProps) {
    const api = useAlertDialogAPI(props);
    const toggleTriggerProps = api.getToggleTriggerProps();
    const contentProps = api.getContentProps();
    const controlsProps = api.getControlsProps();
    const iconProps = api.getIconProps();
    const titleProps = api.getTitleProps();
    const descriptionProps = api.getDescriptionProps();
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
                <AlertDialogControls
                  {...controlsProps}
                  absolute={controlsProps?.absolute ?? true}
                />
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
  /**
   * {@link AlertDialogState} です。
   */
  export type State = AlertDialogState;

  /**
   * {@link AlertDialogProps} です。
   */
  export type Props = AlertDialogProps;

  /**
   * {@link AlertDialogSlotProps} です。
   */
  export type SlotProps = AlertDialogSlotProps;

  /**
   * {@link AlertDialogContentContext}
   */
  export type ContentContext = AlertDialogContentContext;

  /**
   * {@link AlertDialogActions}
   */
  export type Actions = AlertDialogActions;

  /**
   * {@link AlertDialogChangeEventDetails}
   */
  export type ChangeEventDetails = AlertDialogChangeEventDetails;

  /**
   * {@link AlertDialogChangeEventReason}
   */
  export type ChangeEventReason = AlertDialogChangeEventReason;

  /**
   * {@link AlertDialogRadius}
   */
  export type Radius = AlertDialogRadius;

  /**
   * {@link AlertDialogVariant}
   */
  export type Variant = AlertDialogVariant;
}
