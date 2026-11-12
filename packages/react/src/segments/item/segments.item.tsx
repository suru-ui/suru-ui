import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSegmentsContext } from "../root/segments.root.context.js";
import { SegmentsItemContext } from "./segments.item.context.js";

/**
 * セグメントをアクティブ化する方向です。
 *
 * - `"left"`: 左方向
 * - `"right"`: 右方向
 * - `"up"`: 上方向
 * - `"down"`: 下方向
 * - `"none"`: 方向なし
 */
export type SegmentsItemActivationDirection = BaseTabs.Tab.ActivationDirection;

/** Segments のセグメントのメタデータです。 */
export type SegmentsItemMetadata = BaseTabs.Tab.Metadata;

/** アクティブなセグメントの位置です。 */
export type SegmentsItemPosition = BaseTabs.Tab.Position;

/** アクティブなセグメントの大きさです。 */
export type SegmentsItemSize = BaseTabs.Tab.Size;

/** Segments のセグメントの値です。 */
export type SegmentsItemValue = BaseTabs.Tab.Value;

/**
 * {@link SegmentsItem} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type SegmentsItemState<TItem = any> = SegmentsItemContext<TItem>;

export namespace SegmentsItemProps {
  export type Render<TItem = any> = RenderProps<SegmentsItemState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseTabs.Tab>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NativeButtonProps より :
      | keyof NativeButtonProps
      // TabsTabProps より :
      | "value"
      | "disabled"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseTabs.Tab>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SegmentsItem} に渡す props です。
 */
export type SegmentsItemProps = SegmentsItemProps.Render &
  SegmentsItemProps.SuruUI &
  SegmentsItemProps.BaseUI &
  SegmentsItemProps.HTML;

export type ISegmentsItem = IComponent<SegmentsItemProps>;

/** 選択できる個々のセグメントです。 */
export const SegmentsItem: ISegmentsItem = (props) => {
  const ctx = useSegmentsContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseTabs.Tab
      {...otherProps}
      {...proxyRenderProps<BaseTabs.Tab.State, SegmentsItemState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <SegmentsItemContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="button"
              />
            </SegmentsItemContext>
          ),
          className: cn<SegmentsItemState>(
            className,
            "sui_segments_item",
            (state) => state.active && "sui_segments_item-active",
            (state) => state.disabled && "sui_segments_item-disabled",
            (state) => `sui_segments_item-size_${state.size}`,
            (state) => `sui_segments_item-color_${state.color}`,
            (state) => `sui_segments_item-radius_${state.radius}`,
            (state) => `sui_segments_item-active_variant_${state.activeVariant}`,
            (state) => `sui_segments_item-orientation_${state.orientation}`,
            (state) => `sui_segments_item-tab_activation_direction_${state.tabActivationDirection}`,
            (state) => state.thin && "sui_segments_item-thin",
          ),
        },
      )}
    />
  );
};

export { SegmentsItem as Item };
export namespace Item {
  export type State<TItem = any> = SegmentsItemState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = SegmentsItemProps.Render<TItem>;

    export type SuruUI = SegmentsItemProps.SuruUI;

    export type BaseUI = SegmentsItemProps.BaseUI;

    export type HTML = SegmentsItemProps.HTML;
  }

  export type ActivationDirection = SegmentsItemActivationDirection;

  export type Metadata = SegmentsItemMetadata;

  export type Position = SegmentsItemPosition;

  export type Size = SegmentsItemSize;

  export type Value = SegmentsItemValue;
}
