import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSegmentsContext } from "../root/segments.root.context.js";
import { SegmentsIndicatorContext } from "./segments.indicator.context.js";

/**
 * {@link SegmentsIndicator} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type SegmentsIndicatorState<TItem = any> = SegmentsIndicatorContext<TItem>;

export namespace SegmentsIndicatorProps {
  export type Render<TItem = any> = RenderProps<SegmentsIndicatorState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseTabs.Indicator>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // TabsIndicatorProps より:
      "renderBeforeHydration"
    >,
    keyof Render | keyof SuruUI
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
          render: (htmlProps, state) => (
            <SegmentsIndicatorContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </SegmentsIndicatorContext>
          ),
          className: cn<SegmentsIndicatorState>(
            className,
            "sui_segments_indicator",
            (state) => `sui_segments_indicator-size_${state.size}`,
            (state) => `sui_segments_indicator-color_${state.color}`,
            (state) => `sui_segments_indicator-radius_${state.radius}`,
            (state) => `sui_segments_indicator-active_variant_${state.activeVariant}`,
            (state) => `sui_segments_indicator-orientation_${state.orientation}`,
            (state) =>
              `sui_segments_indicator-tab_activation_direction_${state.tabActivationDirection}`,
          ),
        },
      )}
    />
  );
};

export { SegmentsIndicator as Indicator };

export namespace Indicator {
  export type State<TItem = any> = SegmentsIndicatorState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = SegmentsIndicatorProps.Render<TItem>;

    export type SuruUI = SegmentsIndicatorProps.SuruUI;

    export type BaseUI = SegmentsIndicatorProps.BaseUI;

    export type HTML = SegmentsIndicatorProps.HTML;
  }
}
