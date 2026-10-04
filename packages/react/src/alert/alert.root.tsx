import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import {
  type AlertContextSize,
  type AlertContextColor,
  type AlertContextRadius,
  type AlertContextVariant,
  type AlertContextActionsPosition,
  type AlertContextDescriptionPosition,
  AlertContext,
} from "./alert.context.js";

/**
 * アラートのアクションの配置です。
 *
 * 説明文があるときは説明文との間に仕切り線を表示します。
 *
 * - `"bottom"`: 説明文の下
 * - `"side"`: タイトルと説明文の右側に縦方向へ並べます
 */
export type AlertRootActionsPosition = AlertContextActionsPosition;

/**
 * アラートの説明文の配置です。
 *
 * - `"bottom"`: タイトルの下
 * - `"side-start"`: タイトルの右側に横方向へ並べ、説明文を左寄せにします
 * - `"side-end"`: タイトルの右側に横方向へ並べ、説明文を右寄せにします
 */
export type AlertRootDescriptionPosition = AlertContextDescriptionPosition;

/**
 * アラートの配色です。
 */
export type AlertRootColor = AlertContextColor;

/**
 * アラートの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AlertRootRadius = AlertContextRadius;

/**
 * アラートの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AlertRootSize = AlertContextSize;

/**
 * アラートの主な外観です。
 *
 * - `"muted"`: 控えめな背景
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AlertRootVariant = AlertContextVariant;

/**
 * {@link AlertRoot} が持つ状態です。
 */
export type AlertRootState = AlertContext;

export namespace AlertRootProps {
  export type Render = RenderProps<AlertRootState>;

  export type SuruUI = {
    /**
     * アラートのアクションの配置を指定します。
     *
     * @default "side"
     */
    actionsPosition?: AlertRootActionsPosition | undefined;

    /**
     * アラートの色を指定します。
     *
     * @default "grey"
     */
    color?: AlertRootColor | undefined;

    /**
     * タイトルに対する説明文の配置を指定します。
     *
     * - `"bottom"`: タイトルの下に説明文を置きます
     * - `"side-start"`: タイトルの右側に説明文を横方向へ並べ、説明文を左寄せにします
     * - `"side-end"`: タイトルの右側に説明文を横方向へ並べ、説明文を右寄せにします
     *
     * @default "bottom"
     */
    descriptionPosition?: AlertRootDescriptionPosition | undefined;

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

export type IAlertRoot = IComponent<AlertRootProps>;

/**
 * アラートのルートコンポーネントです。
 */
export const AlertRoot: IAlertRoot = function SuiAlertRoot(props) {
  const {
    role = "alert",
    size = "md",
    color = "grey",
    radius = size,
    variant = "muted",
    outlined = false,
    actionsPosition = "side",
    descriptionPosition = "bottom",
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherDivProps
  } = props;

  const ctx = React.useMemo<AlertContext>(
    () => ({ size, color, radius, variant, outlined, actionsPosition, descriptionPosition }),
    [size, color, radius, variant, outlined, actionsPosition, descriptionPosition],
  );
  const element = useRender({
    props: [
      otherDivProps,
      {
        role,
        className: cn<AlertRootState>(
          "sui_alert",
          (state) => `sui_alert-actionsposition_${state.actionsPosition}`,
          (state) =>
            `sui_alert-descriptionposition_${state.descriptionPosition.replaceAll("-", "_")}`,
          (state) => `sui_alert-size_${state.size}`,
          (state) => `sui_alert-color_${state.color}`,
          (state) => `sui_alert-radius_${state.radius}`,
          (state) => `sui_alert-variant_${state.variant}`,
          (state) => state.outlined && "sui_alert-outlined",
        ),
        "data-scope": dataScope,
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });

  return <AlertContext value={ctx}>{element}</AlertContext>;
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

  export type ActionsPosition = AlertRootActionsPosition;

  export type Color = AlertRootColor;

  export type DescriptionPosition = AlertRootDescriptionPosition;

  export type Radius = AlertRootRadius;

  export type Size = AlertRootSize;

  export type Variant = AlertRootVariant;
}
