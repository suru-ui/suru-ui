import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size, Color } from "@suru-ui/theme";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

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

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertRoot} に渡す props です。
 */
export type AlertRootProps = AlertRootProps.Render &
  AlertRootProps.SuruUI &
  AlertRootProps.BaseUI &
  AlertRootProps.HTML;

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

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertRootProps.Render;

    export type SuruUI = AlertRootProps.SuruUI;

    export type BaseUI = AlertRootProps.BaseUI;

    export type HTML = AlertRootProps.HTML;
  }

  export type Color = AlertRootColor;

  export type Radius = AlertRootRadius;

  export type Size = AlertRootSize;

  export type Variant = AlertRootVariant;
}
