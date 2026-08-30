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
  type AlertDescriptionProps,
  AlertIcon,
  AlertRoot,
  AlertTitle,
  AlertActions,
  AlertDescription,
} from "./alert.parts.jsx";

/**
 * {@link AlertRootColor}
 */
export type AlertColor = AlertRootColor;

/**
 * {@link AlertRootRadius}
 */
export type AlertRadius = AlertRootRadius;

/**
 * {@link AlertRootSize}
 */
export type AlertSize = AlertRootSize;

/**
 * {@link AlertRootVariant}
 */
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
   * {@link AlertDescription} に渡す props です。
   */
  readonly description?: Omit<AlertDescriptionProps, "children"> | undefined;

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
 * {@link Alert} を構成する各パーツの props を作成するための API です。
 */
export interface AlertAPI {
  /**
   * {@link AlertActions} に渡す props を取得します。
   *
   * 操作ボタンを表示しないときは `null` を返します。
   */
  getActionsProps(): AlertActionsProps | null;

  /**
   * {@link AlertDescription} に渡す props を取得します。
   *
   * 説明文を表示しないときは `null` を返します。
   */
  getDescriptionProps(): AlertDescriptionProps | null;

  /**
   * {@link AlertIcon} に渡す props を取得します。
   *
   * アイコンを表示しないときは `null` を返します。
   */
  getIconProps(): AlertIconProps | null;

  /**
   * {@link AlertRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<AlertRootProps, "children">;

  /**
   * {@link AlertTitle} に渡す props を取得します。
   *
   * タイトルを表示しないときは `null` を返します。
   */
  getTitleProps(): AlertTitleProps | null;
}

/**
 * {@link Alert} が持つ状態です。
 */
export type AlertState = AlertRootState;

/**
 * {@link Alert} に渡す props です。
 */
export type AlertProps = Omit<AlertRootProps, "children"> &
  Pick<AlertDescriptionProps, "children"> & {
    /**
     * アラートの操作ボタンです。
     */
    actions?: AlertActionsProps["children"];

    /**
     * アラートに表示するアイコンです。
     */
    icon?: AlertIconProps["children"];

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     *
     * 各パーツの props が優先されます。
     */
    slotProps?: AlertSlotProps | undefined;

    /**
     * アラートのタイトルです。
     */
    title?: AlertTitleProps["children"];
  };

interface IUseAlertAPI {
  /**
   * {@link AlertAPI} を作成します。
   *
   * @param props {@link Alert} の props です。
   * @returns アラートの API です
   */
  (props: AlertProps): AlertAPI;
}

/**
 * {@link AlertAPI} を作成するフックです。
 */
export const useAlertAPI: IUseAlertAPI = function useSuiAlertAPI(props) {
  const {
    icon,
    title,
    actions,
    children,
    slotProps: {
      icon: iconProps,
      title: titleProps,
      actions: actionsProps,
      description: descriptionProps,
    } = {},
    ...otherRootProps
  } = props;

  return {
    getIconProps() {
      return "icon" in props || !!iconProps ? { children: icon, ...iconProps } : null;
    },
    getRootProps() {
      return otherRootProps;
    },
    getTitleProps() {
      return "title" in props || !!titleProps ? { children: title, ...titleProps } : null;
    },
    getActionsProps() {
      return "actions" in props || !!actionsProps ? { children: actions, ...actionsProps } : null;
    },
    getDescriptionProps() {
      return "children" in props || !!descriptionProps ? { children, ...descriptionProps } : null;
    },
  };
};

/**
 * {@link useAlertAPI}
 */
export const useAPI: IUseAlertAPI = useAlertAPI;

/**
 * 重要なメッセージや通知をステータスインジケーター付きで表示するコンポーネントです。
 */
export const Alert: IComponent<AlertProps> = function SuiAlert(props: AlertProps) {
  const api = useAPI(props);
  const iconProps = api.getIconProps();
  const titleProps = api.getTitleProps();
  const descriptionProps = api.getDescriptionProps();
  const actionsProps = api.getActionsProps();

  return (
    <AlertRoot {...api.getRootProps()}>
      {iconProps && <AlertIcon {...iconProps} />}
      {titleProps && <AlertTitle {...titleProps} />}
      {descriptionProps && <AlertDescription {...descriptionProps} />}
      {actionsProps && <AlertActions {...actionsProps} />}
    </AlertRoot>
  );
};

export namespace Alert {
  /**
   * {@link AlertState}
   */
  export type State = AlertState;

  /**
   * {@link AlertProps}
   */
  export type Props = AlertProps;

  /**
   * {@link AlertSlotProps}
   */
  export type SlotProps = AlertSlotProps;

  /**
   * {@link AlertColor}
   */
  export type Color = AlertColor;

  /**
   * {@link AlertRadius}
   */
  export type Radius = AlertRadius;

  /**
   * {@link AlertSize}
   */
  export type Size = AlertSize;

  /**
   * {@link AlertVariant}
   */
  export type Variant = AlertVariant;
}
