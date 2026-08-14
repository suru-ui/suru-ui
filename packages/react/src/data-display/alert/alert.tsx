import * as React from "react";

import type { Component } from "../../types.js";
import * as AlertParts from "./alert.parts.jsx";

/**
 * {@link Alert} の各パーツに渡すプロパティーです。
 */
export type AlertSlotProps = {
  /**
   * {@link AlertParts.Actions|Actions} に渡すプロパティーです。
   */
  readonly actions?: AlertParts.Actions.Props | undefined;

  /**
   * {@link AlertParts.Description|Description} に渡すプロパティーです。
   */
  readonly description?: AlertParts.Description.Props | undefined;

  /**
   * {@link AlertParts.Icon|Icon} に渡すプロパティーです。
   */
  readonly icon?: AlertParts.Icon.Props | undefined;

  /**
   * {@link AlertParts.Title|Title} に渡すプロパティーです。
   */
  readonly title?: AlertParts.Title.Props | undefined;
};

/**
 * {@link Alert} コンポーネントのプロパティーです。
 */
export type AlertProps = Omit<AlertParts.Root.Props, "children"> &
  Pick<AlertParts.Description.Props, "children"> & {
    /**
     * アラートの操作ボタンです。
     */
    actions?: AlertParts.Actions.Props["children"];

    /**
     * アラートに表示するアイコンです。
     */
    icon?: AlertParts.Icon.Props["children"];

    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: AlertSlotProps | undefined;

    /**
     * アラートのタイトルです。
     */
    title?: AlertParts.Title.Props["children"] | undefined;
  };

/**
 * 重要なメッセージや通知をステータスインジケーター付きで表示するコンポーネントです。
 *
 * @example 基本
 * ```tsx
 * <Alert>プロフィールを更新しました。</Alert>
 * ```
 *
 * @example アイコン付き
 * ```tsx
 * <Alert color="green" icon={<CheckIcon />}>
 *   保存しました。
 * </Alert>
 * ```
 */
export const Alert: Component<AlertProps> = function SuiAlert(props) {
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
    <AlertParts.Root {...rootProps}>
      {("icon" in props || !!iconProps) && (
        <AlertParts.Icon {...{ children: icon, ...iconProps }} />
      )}
      {("title" in props || !!titleProps) && (
        <AlertParts.Title {...{ children: title, ...titleProps }} />
      )}
      {("children" in props || !!descriptionProps) && (
        <AlertParts.Description {...{ children, ...descriptionProps }} />
      )}
      {("actions" in props || !!actionsProps) && (
        <AlertParts.Actions {...{ children: actions, ...actionsProps }} />
      )}
    </AlertParts.Root>
  );
};
