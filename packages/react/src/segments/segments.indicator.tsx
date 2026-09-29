import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SegmentsIndicator} が持つ状態です。
 */
export type SegmentsIndicatorState = BaseTabs.Indicator.State;

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
  const { className, ...otherProps } = props;

  return <BaseTabs.Indicator {...otherProps} className={cn(className, "sui_segments_indicator")} />;
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
