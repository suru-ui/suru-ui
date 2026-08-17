import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type AlertIconProps,
  type AlertRootProps,
  type AlertRootState,
  type AlertTitleProps,
  type AlertActionsProps,
  type AlertDescriptionProps,
  AlertIcon,
  AlertRoot,
  AlertTitle,
  AlertActions,
  AlertDescription,
} from "./alert.parts.jsx";

/**
 * {@link Alert} の各パーツに渡すプロパティーです。
 */
export type AlertSlotProps = {
  /**
   * {@link AlertActions} に渡すプロパティーです。
   */
  readonly actions?: AlertActionsProps | undefined;

  /**
   * {@link AlertDescription} に渡すプロパティーです。
   */
  readonly description?: AlertDescriptionProps | undefined;

  /**
   * {@link AlertIcon} に渡すプロパティーです。
   */
  readonly icon?: AlertIconProps | undefined;

  /**
   * {@link AlertTitle} に渡すプロパティーです。
   */
  readonly title?: AlertTitleProps | undefined;
};

/**
 * {@link Alert} の状態です。
 */
export type AlertState = AlertRootState;

/**
 * {@link Alert} コンポーネントのプロパティーです。
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
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: AlertSlotProps | undefined;

    /**
     * アラートのタイトルです。
     */
    title?: AlertTitleProps["children"] | undefined;
  };

/**
 * 重要なメッセージや通知をステータスインジケーター付きで表示するコンポーネントです。
 */
export const Alert: IComponent<AlertProps> = function SuiAlert(props) {
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
    ...rootProps
  } = props;

  return (
    <AlertRoot {...rootProps}>
      {("icon" in props || !!iconProps) && <AlertIcon {...{ children: icon, ...iconProps }} />}
      {("title" in props || !!titleProps) && <AlertTitle {...{ children: title, ...titleProps }} />}
      {("children" in props || !!descriptionProps) && (
        <AlertDescription {...{ children, ...descriptionProps }} />
      )}
      {("actions" in props || !!actionsProps) && (
        <AlertActions {...{ children: actions, ...actionsProps }} />
      )}
    </AlertRoot>
  );
};

/**
 * {@link Alert} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Alert {
  /**
   * {@link AlertState} です。
   */
  export type State = AlertState;

  /**
   * {@link AlertProps} です。
   */
  export type Props = AlertProps;

  /**
   * {@link AlertSlotProps} です。
   */
  export type SlotProps = AlertSlotProps;
}
