import type { Color, Size, ColorTemplate as Variant } from "@suru-ui/theme";
import type * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Component } from "../../types.js";

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
export type AlertRootProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<AlertRootState> & {
    /**
     * アラートの色を指定します。
     *
     * @default "grey"
     */
    color?: Color | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

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
     * アラートのサイズを指定します。
     *
     * @default "md"
     */
    size?: Size | undefined;

    /**
     * アラートのスタイルバリエーションを指定します。
     *
     * @default "solid"
     */
    variant?: Variant | undefined;
  };

/**
 * アラートのルートコンポーネントです。
 *
 * @example
 * ```tsx
 * <AlertRoot color="green">
 *   <AlertIcon />
 *   <AlertDescription>保存しました。</AlertDescription>
 * </AlertRoot>
 * ```
 */
export const AlertRoot: Component<AlertRootProps> = function SuiAlertRoot(props) {
  const {
    role = "alert",
    size = "md",
    color = "grey",
    radius = size,
    variant = "solid",
    outlined = false,
    ...otherProps
  } = props;

  return useRender({
    defaultTagName: "div",
    props: [
      otherProps,
      {
        role,
        className: cn(
          "sui_alert",
          `sui_alert-size_${size}`,
          `sui_alert-color_${color}`,
          `sui_alert-radius_${radius}`,
          `sui_alert-variant_${variant}`,
          outlined && "sui_alert-outlined",
        ),
      },
    ],
  });
};

/**
 * {@link AlertRoot} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link AlertRoot} の状態型です。
   */
  export type State = AlertRootState;

  /**
   * {@link AlertRoot} のプロパティー型です。
   */
  export type Props = AlertRootProps;
}

/**
 * {@link AlertRoot} です。
 */
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
  RenderProps<AlertIconState>;

/**
 * アラートの状態を視覚的に示すインジケーターコンポーネントです。
 *
 * 子要素を省略すると、状態色の丸いインジケーターを表示します。
 *
 * @example
 * ```tsx
 * <AlertIcon>
 *   <InfoIcon />
 * </AlertIcon>
 * ```
 */
export const AlertIcon: Component<AlertIconProps> = function SuiAlertIcon(props) {
  const { "aria-hidden": ariaHidden = true, ...otherProps } = props;

  return useRender({
    defaultTagName: "div",
    props: [
      otherProps,
      {
        className: "sui_alert_icon",
        "aria-hidden": ariaHidden,
      },
    ],
  });
};

/**
 * {@link AlertIcon} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Icon {
  /**
   * {@link AlertIcon} の状態型です。
   */
  export type State = AlertIconState;

  /**
   * {@link AlertIcon} のプロパティー型です。
   */
  export type Props = AlertIconProps;
}

/**
 * {@link AlertIcon} です。
 */
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
  RenderProps<AlertTitleState>;

/**
 * アラートのタイトルを表示するコンポーネントです。
 *
 * @example
 * ```tsx
 * <AlertTitle>保存完了</AlertTitle>
 * ```
 */
export const AlertTitle: Component<AlertTitleProps> = function SuiAlertTitle(props) {
  return useRender({
    defaultTagName: "div",
    props: [
      props,
      {
        className: "sui_alert_title",
      },
    ],
  });
};

/**
 * {@link AlertTitle} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Title {
  /**
   * {@link AlertTitle} の状態型です。
   */
  export type State = AlertTitleState;

  /**
   * {@link AlertTitle} のプロパティー型です。
   */
  export type Props = AlertTitleProps;
}

/**
 * {@link AlertTitle} です。
 */
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
  RenderProps<AlertDescriptionState>;

/**
 * アラートのメッセージをまとめるコンテンツコンポーネントです。
 *
 * @example
 * ```tsx
 * <AlertDescription>プロフィールを更新しました。</AlertDescription>
 * ```
 */
export const AlertDescription: Component<AlertDescriptionProps> = function SuiAlertDescription(
  props,
) {
  return useRender({
    defaultTagName: "div",
    props: [
      props,
      {
        className: "sui_alert_description",
      },
    ],
  });
};

/**
 * {@link AlertDescription} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Description {
  /**
   * {@link AlertDescription} の状態型です。
   */
  export type State = AlertDescriptionState;

  /**
   * {@link AlertDescription} のプロパティー型です。
   */
  export type Props = AlertDescriptionProps;
}

/**
 * {@link AlertDescription} の状態とプロパティーをまとめた型名前空間です。
 */
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
  RenderProps<AlertActionsState>;

/**
 * アラートの操作ボタンを右寄せでまとめるコンポーネントです。
 *
 * @example
 * ```tsx
 * <AlertActions>
 *   <Button>取り消す</Button>
 *   <Button>再試行</Button>
 * </AlertActions>
 * ```
 */
export const AlertActions: Component<AlertActionsProps> = function SuiAlertActions(props) {
  return useRender({
    defaultTagName: "div",
    props: [
      props,
      {
        className: "sui_alert_actions",
      },
    ],
  });
};

/**
 * {@link AlertActions} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Actions {
  /**
   * {@link AlertActions} の状態型です。
   */
  export type State = AlertActionsState;

  /**
   * {@link AlertActions} のプロパティー型です。
   */
  export type Props = AlertActionsProps;
}

/**
 * {@link AlertActions} の状態とプロパティーをまとめた型名前空間です。
 */
export const Actions: Component<Actions.Props> = AlertActions;
