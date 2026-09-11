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

export namespace AlertRootProps {
  export type Render = RenderProps<AlertRootState>;

  export type SuruUI = {
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
     * 既定値は {@link AlertRootProps.size|size}
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

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;
}

/**
 * {@link AlertRoot} に渡す props です。
 */
export type AlertRootProps = AlertRootProps.Render & AlertRootProps.SuruUI & AlertRootProps.HTML;

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
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherDivProps
  } = props;

  return useRender({
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
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "div",
  });
};

export { AlertRoot as Root };

export namespace Root {
  export type State = AlertRootState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = AlertRootProps.Render;

    export type SuruUI = AlertRootProps.SuruUI;

    export type HTML = AlertRootProps.HTML;
  }

  export type Color = AlertRootColor;

  export type Radius = AlertRootRadius;

  export type Size = AlertRootSize;

  export type Variant = AlertRootVariant;
}

// Icon
// ----

/**
 * {@link AlertIcon} が持つ状態です。
 */
export type AlertIconState = {};

export namespace AlertIconProps {
  export type Render = RenderProps<AlertIconState>;

  export type SuruUI = {};

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;
}

/**
 * {@link AlertIcon} に渡す props です。
 */
export type AlertIconProps = AlertIconProps.Render & AlertIconProps.SuruUI & AlertIconProps.HTML;

/**
 * アラートの状態を視覚的に示すインジケーターコンポーネントです。
 *
 * 子要素を省略すると、状態色の丸いインジケーターを表示します。
 */
export const AlertIcon: IComponent<AlertIconProps> = function SuiAlertIcon(props) {
  const { "aria-hidden": ariaHidden = true, ...otherDivProps } = props;

  return useRender({
    props: [
      otherDivProps,
      {
        className: "sui_alert_icon",
        "aria-hidden": ariaHidden,
      },
    ],
    defaultTagName: "div",
  });
};

export { AlertIcon as Icon };

export namespace Icon {
  export type State = AlertIconState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = AlertIconProps.Render;

    export type SuruUI = AlertIconProps.SuruUI;

    export type HTML = AlertIconProps.HTML;
  }
}

// Title
// -----

/**
 * {@link AlertTitle} が持つ状態です。
 */
export type AlertTitleState = {};

export namespace AlertTitleProps {
  export type Render = RenderProps<AlertTitleState>;

  export type SuruUI = {};

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;
}

/**
 * {@link AlertTitle} に渡す props です。
 */
export type AlertTitleProps = AlertTitleProps.Render &
  AlertTitleProps.SuruUI &
  AlertTitleProps.HTML;

/**
 * アラートのタイトルを表示するコンポーネントです。
 */
export const AlertTitle: IComponent<AlertTitleProps> = function SuiAlertTitle(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_alert_title",
      },
    ],
    defaultTagName: "div",
  });
};

export { AlertTitle as Title };

export namespace Title {
  export type State = AlertTitleState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = AlertTitleProps.Render;

    export type SuruUI = AlertTitleProps.SuruUI;

    export type HTML = AlertTitleProps.HTML;
  }
}

// Content
// -------

/**
 * {@link AlertContent} が持つ状態です。
 */
export type AlertContentState = {};

export namespace AlertContentProps {
  export type Render = RenderProps<AlertContentState>;

  export type SuruUI = {};

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;
}

/**
 * {@link AlertContent} に渡す props です。
 */
export type AlertContentProps = AlertContentProps.Render &
  AlertContentProps.SuruUI &
  AlertContentProps.HTML;

/**
 * アラートのメッセージをまとめるコンテンツコンポーネントです。
 */
export const AlertContent: IComponent<AlertContentProps> = function SuiAlertContent(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_alert_content",
      },
    ],
    defaultTagName: "div",
  });
};

export { AlertContent as Content };

export namespace Content {
  export type State = AlertContentState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = AlertContentProps.Render;

    export type SuruUI = AlertContentProps.SuruUI;

    export type HTML = AlertContentProps.HTML;
  }
}

// Actions
// -------

/**
 * {@link AlertActions} が持つ状態です。
 */
export type AlertActionsState = {};

export namespace AlertActionsProps {
  export type Render = RenderProps<AlertActionsState>;

  export type SuruUI = {};

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;
}

/**
 * {@link AlertActions} に渡す props です。
 */
export type AlertActionsProps = AlertActionsProps.Render &
  AlertActionsProps.SuruUI &
  AlertActionsProps.HTML;

/**
 * アラートの操作ボタンを右寄せでまとめるコンポーネントです。
 */
export const AlertActions: IComponent<AlertActionsProps> = function SuiAlertActions(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_alert_actions",
      },
    ],
    defaultTagName: "div",
  });
};

export { AlertActions as Actions };

export namespace Actions {
  export type State = AlertActionsState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = AlertActionsProps.Render;

    export type SuruUI = AlertActionsProps.SuruUI;

    export type HTML = AlertActionsProps.HTML;
  }
}
