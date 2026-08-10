import { useRender } from "@base-ui/react/use-render";
import type { Color, Size } from "@suru-ui/theme";
import type * as React from "react";

import cn from "../../cn.js";
import type { Component, RenderProps } from "../../types.js";

import "./alert.css";

// Root
// ----

/**
 * {@link AlertRoot} の状態です。
 */
export type AlertRootState = {};

/**
 * {@link AlertRoot} に渡すプロパティーです。
 */
export type AlertRootProps = useRender.ComponentProps<"div", AlertRootState> & {
  /**
   * アラートのスタイルバリエーションを指定します。
   *
   * @default "liquid"
   */
  variant?: "naked" | "liquid" | undefined;

  /**
   * アラートの色を指定します。
   *
   * @default "blue"
   */
  color?: Color | undefined;

  /**
   * アラートのサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * アラートの角丸を指定します。
   *
   * デフォルト値は {@link AlertRootProps.size|size} です。
   *
   * - `"none"`: 角を直角にする
   * - `"sm"`: 小さい角丸
   * - `"md"`: 標準的な角丸
   * - `"lg"`: 大きい角丸
   */
  radius?: "none" | Size | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   */
  outlined?: boolean | undefined;
};

/**
 * アラートのルート要素です。
 *
 * 既定では `role="alert"` を持つ要素として描画されます。
 *
 * @example
 * ```tsx
 * <AlertParts.Root color="green">
 *   <AlertParts.Icon />
 *   <AlertParts.Description>保存しました。</AlertParts.Description>
 * </AlertParts.Root>
 * ```
 */
export const AlertRoot: Component<AlertRootProps> = function SuiAlertRoot(props) {
  const {
    ref,
    role = "alert",
    size = "md",
    color = "grey",
    radius = size,
    render,
    variant = "liquid",
    outlined = false,
    className,
    ...elementProps
  } = props;

  return useRender({
    defaultTagName: "div",
    ref,
    render,
    props: {
      ...elementProps,
      role,
      className: cn(
        className,
        "sui_alert",
        `sui_alert-size_${size}`,
        `sui_alert-color_${color}`,
        `sui_alert-radius_${radius}`,
        `sui_alert-variant_${variant}`,
        outlined && "sui_alert-outlined",
      ),
    },
  });
};

export namespace Root {
  export type State = AlertRootState;
  export type Props = AlertRootProps;
}

export const Root: Component<Root.Props> = AlertRoot;

// Icon
// ----

/**
 * {@link AlertIcon} の状態です。
 */
export type AlertIconState = {};

/**
 * {@link AlertIcon} に渡すプロパティーです。
 */
export type AlertIconProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<"div", AlertIconState>;

/**
 * アラートの状態を視覚的に示すインジケーター要素です。
 *
 * 子要素を省略すると、状態色の丸いインジケーターを表示します。
 *
 * @example
 * ```tsx
 * <AlertParts.Icon>
 *   <InfoIcon />
 * </AlertParts.Icon>
 * ```
 */
export const AlertIcon: Component<AlertIconProps> = function SuiAlertIcon(props) {
  const { ref, render, className, "aria-hidden": ariaHidden = true, ...elementProps } = props;

  return useRender({
    defaultTagName: "div",
    ref,
    render,
    props: {
      ...elementProps,
      className: cn(className, "sui_alert_icon"),
      "aria-hidden": ariaHidden,
    },
  });
};

export namespace Icon {
  export type State = AlertIconState;
  export type Props = AlertIconProps;
}

export const Icon: Component<Icon.Props> = AlertIcon;

// Title
// -----

/**
 * {@link AlertTitle} の状態です。
 */
export type AlertTitleState = {};

/**
 * {@link AlertTitle} に渡すプロパティーです。
 */
export type AlertTitleProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<"div", AlertTitleState>;

/**
 * アラートのタイトルを表示する要素です。
 *
 * @example
 * ```tsx
 * <AlertParts.Title>保存完了</AlertParts.Title>
 * ```
 */
export const AlertTitle: Component<AlertTitleProps> = function SuiAlertTitle(props) {
  const { ref, render, className, ...elementProps } = props;

  return useRender({
    defaultTagName: "div",
    ref,
    render,
    props: {
      ...elementProps,
      className: cn(className, "sui_alert_title"),
    },
  });
};

export namespace Title {
  export type State = AlertTitleState;
  export type Props = AlertTitleProps;
}

export const Title: Component<Title.Props> = AlertTitle;

// Description
// -----------

/**
 * {@link AlertDescription} の状態です。
 */
export type AlertDescriptionState = {};

/**
 * {@link AlertDescription} に渡すプロパティーです。
 */
export type AlertDescriptionProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<"div", AlertDescriptionState>;

/**
 * アラートのメッセージをまとめるコンテンツ要素です。
 *
 * @example
 * ```tsx
 * <AlertParts.Description>プロフィールを更新しました。</AlertParts.Description>
 * ```
 */
export const AlertDescription: Component<AlertDescriptionProps> = function SuiAlertDescription(
  props,
) {
  const { ref, render, className, ...elementProps } = props;

  return useRender({
    defaultTagName: "div",
    ref,
    render,
    props: {
      ...elementProps,
      className: cn(className, "sui_alert_description"),
    },
  });
};

export namespace Description {
  export type State = AlertDescriptionState;
  export type Props = AlertDescriptionProps;
}

export const Description: Component<Description.Props> = AlertDescription;

// Actions
// -------

/**
 * {@link AlertActions} の状態です。
 */
export type AlertActionsState = {};

/**
 * {@link AlertActions} に渡すプロパティーです。
 */
export type AlertActionsProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<"div", AlertActionsState>;

/**
 * アラートの操作ボタンを右寄せでまとめる要素です。
 *
 * @example
 * ```tsx
 * <AlertParts.Actions>
 *   <Button>取り消す</Button>
 *   <Button>再試行</Button>
 * </AlertParts.Actions>
 * ```
 */
export const AlertActions: Component<AlertActionsProps> = function SuiAlertActions(props) {
  const { ref, render, className, ...elementProps } = props;

  return useRender({
    defaultTagName: "div",
    ref,
    render,
    props: {
      ...elementProps,
      className: cn(className, "sui_alert_actions"),
    },
  });
};

export namespace Actions {
  export type State = AlertActionsState;
  export type Props = AlertActionsProps;
}

export const Actions: Component<Actions.Props> = AlertActions;
