import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type SegmentsContext, useSegmentsContext } from "./segments.context.js";

/**
 * {@link SegmentsIndicator} が持つ状態です。
 */
export type SegmentsIndicatorState = Override<SegmentsContext, BaseTabs.Indicator.State>;

export namespace SegmentsIndicatorProps {
  export type Render = RenderProps<SegmentsIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseTabs.Indicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // TabsIndicatorProps:
      "renderBeforeHydration",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseTabs.Indicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SegmentsIndicator} に渡す props です。
 */
export type SegmentsIndicatorProps = SegmentsIndicatorProps.Render &
  SegmentsIndicatorProps.SuruUI &
  SegmentsIndicatorProps.BaseUI &
  SegmentsIndicatorProps.HTML;

export type ISegmentsIndicator = IComponent<SegmentsIndicatorProps>;

/**
 * 選択されているセグメントの位置に追従するインジケーターです。
 *
 * {@link SegmentsList} の子要素として配置します。
 */
export const SegmentsIndicator: ISegmentsIndicator = function SuiSegmentsIndicator(props) {
  const ctx = useSegmentsContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseTabs.Indicator
      {...otherProps}
      {...proxyRenderProps<BaseTabs.Indicator.State, SegmentsIndicatorState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<SegmentsIndicatorState>(
            className,
            "sui_segments_indicator",
            (state) => `sui_segments_indicator-size_${state.size}`,
            (state) => `sui_segments_indicator-color_${state.color}`,
            (state) => `sui_segments_indicator-radius_${state.radius}`,
            (state) => `sui_segments_indicator-active_variant_${state.activeVariant}`,
          ),
        },
      )}
    />
  );
};

export { SegmentsIndicator as Indicator };

export namespace Indicator {
  export type State = SegmentsIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SegmentsIndicatorProps.Render;

    export type SuruUI = SegmentsIndicatorProps.SuruUI;

    export type BaseUI = SegmentsIndicatorProps.BaseUI;

    export type HTML = SegmentsIndicatorProps.HTML;
  }
}
