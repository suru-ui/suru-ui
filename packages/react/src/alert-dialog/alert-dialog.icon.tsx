import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size, Color, ColorTemplate } from "@suru-ui/theme";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * アラートダイアログのアイコンの配色です。
 */
export type AlertDialogIconColor = Color;

/**
 * アラートダイアログのアイコンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type AlertDialogIconRadius = "none" | Size | "full";

/**
 * アラートダイアログのアイコンの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AlertDialogIconSize = Size;

/**
 * アラートダイアログのアイコンの主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AlertDialogIconVariant = ColorTemplate;

/**
 * {@link AlertDialogIcon} が持つ状態です。
 */
export type AlertDialogIconState = {};

export namespace AlertDialogIconProps {
  export type Render = RenderProps<AlertDialogIconState>;

  export type SuruUI = {
    /**
     * アラートダイアログのアイコンの配色を指定します。
     *
     * @default "red"
     */
    color?: AlertDialogIconColor | undefined;

    /**
     * アラートダイアログのアイコンの背景色を控えめにします。
     *
     * @default false
     */
    muted?: boolean | undefined;

    /**
     * アラートダイアログのアイコンに枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * アラートダイアログのアイコンの角丸の大きさを指定します。
     *
     * 既定値は {@link AlertDialogIconProps.size|size} です。
     */
    radius?: AlertDialogIconRadius | undefined;

    /**
     * アラートダイアログのアイコンの大きさを指定します。
     *
     * @default "md"
     */
    size?: AlertDialogIconSize | undefined;

    /**
     * アラートダイアログのアイコンの主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: AlertDialogIconVariant | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogIcon} に渡す props です。
 */
export type AlertDialogIconProps = AlertDialogIconProps.Render &
  AlertDialogIconProps.SuruUI &
  AlertDialogIconProps.BaseUI &
  AlertDialogIconProps.HTML;

/**
 * アラートダイアログのアイコンコンポーネントです。
 */
export const AlertDialogIcon: IComponent<AlertDialogIconProps> = function SuiAlertDialogIcon(
  props,
) {
  const {
    size = "md",
    color = "red",
    muted = false,
    radius = size,
    variant = "liquid",
    outlined = false,
    "aria-hidden": ariaHidden = true,
    ...otherDivProps
  } = props;

  return useRender({
    props: [
      otherDivProps,
      {
        className: cn(
          "sui_alert_dialog_icon",
          `sui_alert_dialog_icon-size_${size}`,
          `sui_alert_dialog_icon-color_${color}`,
          `sui_alert_dialog_icon-radius_${radius}`,
          `sui_alert_dialog_icon-variant_${variant}`,
          muted && "sui_alert_dialog_icon-muted",
          outlined && "sui_alert_dialog_icon-outlined",
        ),
        "aria-hidden": ariaHidden,
      },
    ],
    defaultTagName: "div",
  });
};

export { AlertDialogIcon as Icon };

export namespace Icon {
  export type State = AlertDialogIconState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogIconProps.Render;

    export type SuruUI = AlertDialogIconProps.SuruUI;

    export type BaseUI = AlertDialogIconProps.BaseUI;

    export type HTML = AlertDialogIconProps.HTML;
  }

  export type Color = AlertDialogIconColor;

  export type Radius = AlertDialogIconRadius;

  export type Size = AlertDialogIconSize;

  export type Variant = AlertDialogIconVariant;
}
