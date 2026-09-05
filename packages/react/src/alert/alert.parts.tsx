import type { Size, Color } from "@suru-ui/theme";
import type * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./alert.css";

// Root
// ----

/**
 * アラートの配色です。
 */
export type AlertRootColor = Color;

/**
 * アラートの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AlertRootRadius = "none" | Size;

/**
 * アラートの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AlertRootSize = Size;

/**
 * アラートの主な外観です。
 *
 * - `"muted"`: 控えめな背景
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AlertRootVariant = "muted" | "naked" | "liquid";

/**
 * {@link AlertRoot} が持つ状態です。
 */
export type AlertRootState = {};

/**
 * {@link AlertRoot} に渡す props です。
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
    className,
    ...otherDivProps
  } = props;

  return useRender({
    defaultTagName: "div",
    props: [
      otherDivProps,
      {
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
        "data-scope": "",
      },
    ],
  });
};

export { AlertRoot as Root };

export namespace Root {
  /**
   * {@link AlertRootState}
   */
  export type State = AlertRootState;

  /**
   * {@link AlertRootProps}
   */
  export type Props = AlertRootProps;

  /**
   * {@link AlertRootColor}
   */
  export type Color = AlertRootColor;

  /**
   * {@link AlertRootRadius}
   */
  export type Radius = AlertRootRadius;

  /**
   * {@link AlertRootSize}
   */
  export type Size = AlertRootSize;

  /**
   * {@link AlertRootVariant}
   */
  export type Variant = AlertRootVariant;
}

// Icon
// ----

/**
 * {@link AlertIcon} が持つ状態です。
 */
export type AlertIconState = {};

/**
 * {@link AlertIcon} に渡す props です。
 */
export type AlertIconProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<AlertIconState>;

/**
 * アラートの状態を視覚的に示すインジケーターコンポーネントです。
 *
 * 子要素を省略すると、状態色の丸いインジケーターを表示します。
 */
export const AlertIcon: IComponent<AlertIconProps> = function SuiAlertIcon(props) {
  const { className, "aria-hidden": ariaHidden = true, ...otherDivProps } = props;

  return useRender({
    defaultTagName: "div",
    props: [
      otherDivProps,
      {
        className: cn(className, "sui_alert_icon"),
        "aria-hidden": ariaHidden,
      },
    ],
  });
};

export { AlertIcon as Icon };

export namespace Icon {
  /**
   * {@link AlertIconState}
   */
  export type State = AlertIconState;

  /**
   * {@link AlertIconProps}
   */
  export type Props = AlertIconProps;
}

// Title
// -----

/**
 * {@link AlertTitle} が持つ状態です。
 */
export type AlertTitleState = {};

/**
 * {@link AlertTitle} に渡す props です。
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

export { AlertTitle as Title };

export namespace Title {
  /**
   * {@link AlertTitleState}
   */
  export type State = AlertTitleState;

  /**
   * {@link AlertTitleProps}
   */
  export type Props = AlertTitleProps;
}

// Content
// -------

/**
 * {@link AlertContent} が持つ状態です。
 */
export type AlertContentState = {};

/**
 * {@link AlertContent} に渡す props です。
 */
export type AlertContentProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<AlertContentState>;

/**
 * アラートのメッセージをまとめるコンテンツコンポーネントです。
 */
export const AlertContent: IComponent<AlertContentProps> = function SuiAlertContent(props) {
  return useRender({
    defaultTagName: "div",
    props: [
      props,
      {
        className: "sui_alert_content",
      },
    ],
  });
};

export { AlertContent as Content };

export namespace Content {
  /**
   * {@link AlertContentState}
   */
  export type State = AlertContentState;

  /**
   * {@link AlertContentProps}
   */
  export type Props = AlertContentProps;
}

// Actions
// -------

/**
 * {@link AlertActions} が持つ状態です。
 */
export type AlertActionsState = {};

/**
 * {@link AlertActions} に渡す props です。
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

export { AlertActions as Actions };

export namespace Actions {
  /**
   * {@link AlertActionsState}
   */
  export type State = AlertActionsState;

  /**
   * {@link AlertActionsProps}
   */
  export type Props = AlertActionsProps;
}
