import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { createItemRenderer, getSegmentsItemLabel, getSegmentsItemProps } from "../_segments.jsx";
import { type SegmentsContext, useSegmentsContext } from "../root/segments.root.context.js";
import type { SegmentsRootItemObject, ISegmentsRootItemRenderer } from "../root/segments.root.jsx";

/**
 * {@link SegmentsList} が持つ状態です。
 */
export type SegmentsListState = Override<SegmentsContext, BaseTabs.List.State>;

export namespace SegmentsListProps {
  export type Render = RenderProps<SegmentsListState>;

  export type SuruUI<TItem = any> = {
    /**
     * リストの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link SegmentsRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | ISegmentsRootItemRenderer<TItem> | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseTabs.List>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // TabsListProps:
      "activateOnFocus" | "loopFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseTabs.List>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SegmentsList} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type SegmentsListProps<TItem = any> = SegmentsListProps.Render &
  SegmentsListProps.SuruUI<TItem> &
  SegmentsListProps.BaseUI &
  SegmentsListProps.HTML;

export interface ISegmentsList extends IComponent<SegmentsListProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: SegmentsListProps<TItem>): IComponent.Return;
}

/**
 * 個々のセグメントをまとめるリスト要素です。
 *
 * {@link SegmentsRoot} の `items` を読み取り、`children` を省略した場合は既定の並びで表示します。
 */
export const SegmentsList: ISegmentsList = function SuiSegmentsList(props: SegmentsListProps) {
  const ctx = useSegmentsContext();
  const {
    style,
    render,
    children = defaultListItemRenderer,
    className,
    "aria-label": ariaLabel = "セグメント",
    ...otherProps
  } = props;
  const items = ctx.items;

  return (
    <BaseTabs.List
      {...otherProps}
      {...proxyRenderProps<BaseTabs.List.State, SegmentsListState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<SegmentsListState>(
            className,
            "sui_segments_list",
            (state) => `sui_segments_list-size_${state.size}`,
            (state) => `sui_segments_list-color_${state.color}`,
            (state) => `sui_segments_list-radius_${state.radius}`,
            (state) => `sui_segments_list-active_variant_${state.activeVariant}`,
            (state) => `sui_segments_list-orientation_${state.orientation}`,
            (state) => `sui_segments_list-tab_activation_direction_${state.tabActivationDirection}`,
          ),
        },
      )}
      aria-label={ariaLabel}
    >
      {typeof children === "function" ? items.map(children) : children}
    </BaseTabs.List>
  );
};

const defaultListItemRenderer: ISegmentsRootItemRenderer = createItemRenderer(
  getSegmentsItemProps,
  getSegmentsItemLabel,
);

export { SegmentsList as List };

export namespace List {
  export type State = SegmentsListState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SegmentsListProps.Render;

    export type SuruUI<TItem = any> = SegmentsListProps.SuruUI<TItem>;

    export type BaseUI = SegmentsListProps.BaseUI;

    export type HTML = SegmentsListProps.HTML;
  }

  export type IItemRenderer<TItem = any> = ISegmentsRootItemRenderer<TItem>;

  export type ItemObject = SegmentsRootItemObject;
}
