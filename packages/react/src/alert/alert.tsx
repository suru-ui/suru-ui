import * as React from "react";

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
 * {@link AlertRootColor} です。
 */
export type AlertColor = AlertRootColor;

/**
 * {@link AlertRootRadius} です。
 */
export type AlertRadius = AlertRootRadius;

/**
 * {@link AlertRootSize} です。
 */
export type AlertSize = AlertRootSize;

/**
 * {@link AlertRootVariant} です。
 */
export type AlertVariant = AlertRootVariant;

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
 * {@link Alert} の各パーツに渡すプロパティーです。
 */
export type AlertPartsProps = {
  /**
   * {@link AlertActions} に渡すプロパティーです。
   *
   * これを表示しないときは null になります。
   */
  readonly actions: AlertActionsProps | null;

  /**
   * {@link AlertDescription} に渡すプロパティーです。
   *
   * これを表示しないときは null になります。
   */
  readonly description: AlertDescriptionProps | null;

  /**
   * {@link AlertIcon} に渡すプロパティーです。
   *
   * これを表示しないときは null になります。
   */
  readonly icon: AlertIconProps | null;

  /**
   * {@link AlertRoot} に渡すプロパティーです。
   */
  readonly root: AlertRootProps;

  /**
   * {@link AlertTitle} に渡すプロパティーです。
   *
   * これを表示しないときは null になります。
   */
  readonly title: AlertTitleProps | null;
};

/**
 * {@link AlertRootState} です。
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
 * {@link Alert} の各パーツに渡すプロパティーを作るフックです。
 */
export function useAlert(props: AlertProps): AlertPartsProps {
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

  return {
    root: rootProps,
    icon: "icon" in props || !!iconProps ? { children: icon, ...iconProps } : null,
    title: "title" in props || !!titleProps ? { children: title, ...titleProps } : null,
    description:
      "children" in props || !!descriptionProps ? { children, ...descriptionProps } : null,
    actions: "actions" in props || !!actionsProps ? { children: actions, ...actionsProps } : null,
  };
}

/**
 * 重要なメッセージや通知をステータスインジケーター付きで表示するコンポーネントです。
 */
export const Alert: IComponent<AlertProps> = function SuiAlert(props) {
  const partsProps = useAlert(props);

  return (
    <AlertRoot {...partsProps.root}>
      {partsProps.icon && <AlertIcon {...partsProps.icon} />}
      {partsProps.title && <AlertTitle {...partsProps.title} />}
      {partsProps.description && <AlertDescription {...partsProps.description} />}
      {partsProps.actions && <AlertActions {...partsProps.actions} />}
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

  /**
   * {@link AlertColor} です。
   */
  export type Color = AlertColor;

  /**
   * {@link AlertRadius} です。
   */
  export type Radius = AlertRadius;

  /**
   * {@link AlertSize} です。
   */
  export type Size = AlertSize;

  /**
   * {@link AlertVariant} です。
   */
  export type Variant = AlertVariant;
}
