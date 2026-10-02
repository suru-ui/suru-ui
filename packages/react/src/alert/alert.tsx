import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { IComponent } from "../types.js";
import {
  type AlertRootSize,
  type AlertIconProps,
  type AlertRootColor,
  type AlertRootProps,
  type AlertRootState,
  type AlertRootRadius,
  type AlertTitleProps,
  type AlertRootVariant,
  type AlertActionsProps,
  type AlertContentProps,
  type AlertRootActionsPosition,
  AlertIcon,
  AlertRoot,
  AlertTitle,
  AlertActions,
  AlertContent,
} from "./alert.parts.js";

// Types
// -----

export type AlertColor = AlertRootColor;

export type AlertRadius = AlertRootRadius;

export type AlertSize = AlertRootSize;

export type AlertVariant = AlertRootVariant;

/**
 * {@link Alert} の各パーツに渡す props です。
 */
export type AlertSlotProps = {
  /**
   * {@link AlertActions} に渡す props です。
   */
  readonly actions?: Omit<AlertActionsProps, "children"> | undefined;

  /**
   * {@link AlertContent} に渡す props です。
   */
  readonly content?: Omit<AlertContentProps, "children"> | undefined;

  /**
   * {@link AlertIcon} に渡す props です。
   */
  readonly icon?: Omit<AlertIconProps, "children"> | undefined;

  /**
   * {@link AlertTitle} に渡す props です。
   */
  readonly title?: Omit<AlertTitleProps, "children"> | undefined;
};

/**
 * {@link Alert} が持つ状態です。
 */
export type AlertState = AlertRootState;

namespace AlertProps {
  export type Alert = {
    /**
     * アラートの操作ボタンです。
     */
    actions?: AlertActionsProps["children"] | undefined;

    /**
     * アラートの本文です。
     */
    children?: AlertContentProps["children"] | undefined;

    /**
     * アラートに表示するアイコンです。
     */
    icon?: AlertIconProps["children"] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: AlertSlotProps | undefined;

    /**
     * アラートのタイトルです。
     */
    title?: AlertTitleProps["children"] | undefined;
  };

  export type Root = Omit<AlertRootProps, keyof Alert>;
}

/**
 * {@link Alert} に渡す props です。
 */
export type AlertProps = AlertProps.Alert & AlertProps.Root;

export type IAlert = IComponent<AlertProps>;

export interface IUseAlertAPI {
  /**
   * {@link AlertAPI} を作成します。
   *
   * @param props {@link Alert} の props です。
   * @returns アラートの API です
   */
  (props: AlertProps): AlertAPI;
}

// API
// ---

/**
 * {@link Alert} を構成する各パーツの props を作成するための API です。
 */
export class AlertAPI {
  private readonly alertProps: Required<Omit<AlertProps.Alert, "slotProps">>;

  private readonly slotProps: AlertSlotProps;

  private readonly rootProps: AlertProps.Root;

  /**
   * @param props {@link Alert} の props です。
   * @internal
   */
  public constructor(props: AlertProps) {
    const { icon, title, actions, children, slotProps = {}, ...rootProps } = props;
    this.alertProps = { icon, title, actions, children };
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }

  /**
   * {@link AlertActions} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getActionsProps(): AlertActionsProps | null {
    const { actions: props = {} } = this.slotProps;
    const { actions } = this.alertProps;

    if (isLikelyVisibleNode(actions)) {
      return {
        ...props,
        children: actions,
      };
    }

    return null;
  }

  /**
   * {@link AlertContent} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getContentProps(): AlertContentProps | null {
    const { content: props = {} } = this.slotProps;
    const { children } = this.alertProps;

    if (isLikelyVisibleNode(children)) {
      return {
        ...props,
        children,
      };
    }

    return null;
  }

  /**
   * {@link AlertIcon} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getIconProps(): AlertIconProps | null {
    const { icon: props = {} } = this.slotProps;
    const { icon } = this.alertProps;

    if (isLikelyVisibleNode(icon)) {
      return {
        ...props,
        children: icon,
      };
    }

    return null;
  }

  /**
   * {@link AlertRoot} に渡す props を取得します。
   */
  public getRootProps(): AlertProps.Root {
    return this.rootProps;
  }

  /**
   * {@link AlertTitle} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getTitleProps(): AlertTitleProps | null {
    const { title: props = {} } = this.slotProps;
    const { title } = this.alertProps;

    if (isLikelyVisibleNode(title)) {
      return {
        ...props,
        children: title,
      };
    }

    return null;
  }
}

/**
 * {@link AlertAPI} を作成するフックです。
 */
export const useAlertAPI: IUseAlertAPI = function useSuiAlertAPI(props) {
  return new AlertAPI(props);
};

export { AlertAPI as API, useAlertAPI as useAPI };

// Component
// ---------

/**
 * 重要なメッセージや通知をステータスインジケーター付きで表示するコンポーネントです。
 */
export const Alert: IAlert = function SuiAlert(props: AlertProps) {
  const api = useAlertAPI(props);
  const iconProps = api.getIconProps();
  const titleProps = api.getTitleProps();
  const contentProps = api.getContentProps();
  const actionsProps = api.getActionsProps();

  return (
    <AlertRoot {...api.getRootProps()}>
      {iconProps && <AlertIcon {...iconProps} />}
      {titleProps && <AlertTitle {...titleProps} />}
      {contentProps && <AlertContent {...contentProps} />}
      {actionsProps && <AlertActions {...actionsProps} />}
    </AlertRoot>
  );
};

export namespace Alert {
  export type State = AlertState;

  export type Props = AlertProps;

  export type SlotProps = AlertSlotProps;

  export type ActionsPosition = AlertRootActionsPosition;

  export type Color = AlertColor;

  export type Radius = AlertRadius;

  export type Size = AlertSize;

  export type Variant = AlertVariant;
}
