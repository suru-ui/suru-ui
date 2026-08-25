import type { Size, Color } from "@suru-ui/theme";
import type * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./alert.css";

// Root
// ----

/**
 * アラートの色です。
 */
export type AlertRootColor = Color;

/**
 * アラートの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 */
export type AlertRootRadius = "none" | Size;

/**
 * アラートの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type AlertRootSize = Size;

/**
 * アラートの主な外観の種類です。
 *
 * - `"muted"`: 控えめな背景
 * - `"naked"`: 背景のないテキストのみ
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AlertRootVariant = "muted" | "naked" | "liquid";

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
    color?: AlertRootColor | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * アラートの角丸を指定します。
     *
     * 既定値は {@link AlertRootProps.size|size} です。
     */
    radius?: AlertRootRadius | undefined;

    /**
     * アラートのサイズを指定します。
     *
     * @default "md"
     */
    size?: AlertRootSize | undefined;

    /**
     * アラートの主な外観を指定します。
     *
     * @default "muted"
     */
    variant?: AlertRootVariant | undefined;
  };

/**
 * アラートのルートコンポーネントです。
 */
export const AlertRoot: IComponent<AlertRootProps> = function SuiAlertRoot(props) {
  const {
    role = "alert",
    size = "md",
    color = "grey",
    radius = size,
    variant = "muted",
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
 * {@link AlertRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link AlertRootState} です。
   */
  export type State = AlertRootState;

  /**
   * {@link AlertRootProps} です。
   */
  export type Props = AlertRootProps;

  /**
   * {@link AlertRootColor} です。
   */
  export type Color = AlertRootColor;

  /**
   * {@link AlertRootRadius} です。
   */
  export type Radius = AlertRootRadius;

  /**
   * {@link AlertRootSize} です。
   */
  export type Size = AlertRootSize;

  /**
   * {@link AlertRootVariant} です。
   */
  export type Variant = AlertRootVariant;
}

/**
 * {@link AlertRoot} です。
 */
export const Root: IComponent<Root.Props> = AlertRoot;

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
 */
export const AlertIcon: IComponent<AlertIconProps> = function SuiAlertIcon(props) {
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
 * {@link AlertIcon} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Icon {
  /**
   * {@link AlertIconState} です。
   */
  export type State = AlertIconState;

  /**
   * {@link AlertIconProps} です。
   */
  export type Props = AlertIconProps;
}

/**
 * {@link AlertIcon} です。
 */
export const Icon: IComponent<Icon.Props> = AlertIcon;

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
 */
export const AlertTitle: IComponent<AlertTitleProps> = function SuiAlertTitle(props) {
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
 * {@link AlertTitle} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Title {
  /**
   * {@link AlertTitleState} です。
   */
  export type State = AlertTitleState;

  /**
   * {@link AlertTitleProps} です。
   */
  export type Props = AlertTitleProps;
}

/**
 * {@link AlertTitle} です。
 */
export const Title: IComponent<Title.Props> = AlertTitle;

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
 */
export const AlertDescription: IComponent<AlertDescriptionProps> = function SuiAlertDescription(
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
 * {@link AlertDescription} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Description {
  /**
   * {@link AlertDescriptionState} です。
   */
  export type State = AlertDescriptionState;

  /**
   * {@link AlertDescriptionProps} です。
   */
  export type Props = AlertDescriptionProps;
}

/**
 * {@link AlertDescription} の状態やプロパティーをまとめた型名前空間です。
 */
export const Description: IComponent<Description.Props> = AlertDescription;

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
 */
export const AlertActions: IComponent<AlertActionsProps> = function SuiAlertActions(props) {
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
 * {@link AlertActions} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Actions {
  /**
   * {@link AlertActionsState} です。
   */
  export type State = AlertActionsState;

  /**
   * {@link AlertActionsProps} です。
   */
  export type Props = AlertActionsProps;
}

/**
 * {@link AlertActions} の状態やプロパティーをまとめた型名前空間です。
 */
export const Actions: IComponent<Actions.Props> = AlertActions;
