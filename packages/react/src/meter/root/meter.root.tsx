import { Meter } from "@base-ui/react/meter";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type MeterContextSize,
  type MeterContextColor,
  type MeterContextRadius,
  type MeterContextVariant,
  MeterContext,
} from "./meter.root.context.js";

/**
 * メーターの配色です。
 */
export type MeterRootColor = MeterContextColor;

/**
 * メーターの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type MeterRootRadius = MeterContextRadius;

/**
 * メーターの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type MeterRootSize = MeterContextSize;

/**
 * メーターの主な外観の種類です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MeterRootVariant = MeterContextVariant;

/**
 * {@link MeterRoot} が持つ状態です。
 */
export type MeterRootState = Override<MeterContext, Meter.Root.State>;

export namespace MeterRootProps {
  export type Render = RenderProps<MeterRootState>;

  export type SuruUI = {
    /**
     * メーターの色を指定します。
     *
     * @default "grey"
     */
    color?: MeterRootColor | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default true
     */
    outlined?: boolean | undefined;

    /**
     * メーターの角丸を指定します。
     *
     * @default "full"
     */
    radius?: MeterRootRadius | undefined;

    /**
     * メーターのサイズを指定します。
     *
     * @default "md"
     */
    size?: MeterRootSize | undefined;

    /**
     * メーターの主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: MeterRootVariant | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Meter.Root>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MeterRootProps より:
      "aria-valuetext" | "format" | "getAriaValueText" | "locale" | "max" | "min" | "value"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Meter.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MeterRoot} に渡す props です。
 */
export type MeterRootProps = MeterRootProps.Render &
  MeterRootProps.SuruUI &
  MeterRootProps.BaseUI &
  MeterRootProps.HTML;

export type IMeterRoot = IComponent<MeterRootProps>;

/**
 * メーターのルートコンポーネントです。
 */
export const MeterRoot: IMeterRoot = function SuiMeterRoot(props) {
  const {
    size = "md",
    color = "grey",
    style,
    radius = "full",
    render,
    variant = "liquid",
    outlined = true,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const ctx = React.useMemo<MeterContext>(
    () => ({ size, color, radius, variant, outlined }),
    [size, color, radius, variant, outlined],
  );

  return (
    <MeterContext value={ctx}>
      <Meter.Root
        {...otherProps}
        {...proxyRenderProps<Meter.Root.State, MeterRootState>((state) => ({ ...ctx, ...state }), {
          style,
          render,
          className: cn<MeterRootState>(
            className,
            "sui_meter",
            (state) => `sui_meter-size_${state.size}`,
            (state) => `sui_meter-color_${state.color}`,
            (state) => `sui_meter-radius_${state.radius}`,
            (state) => `sui_meter-variant_${state.variant}`,
            (state) => state.outlined && "sui_meter-outlined",
          ),
        })}
        data-scope={dataScope}
      />
    </MeterContext>
  );
};

export { MeterRoot as Root };

export namespace Root {
  export type State = MeterRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MeterRootProps.Render;

    export type SuruUI = MeterRootProps.SuruUI;

    export type BaseUI = MeterRootProps.BaseUI;

    export type HTML = MeterRootProps.HTML;
  }

  export type Color = MeterRootColor;

  export type Radius = MeterRootRadius;

  export type Size = MeterRootSize;

  export type Variant = MeterRootVariant;
}
