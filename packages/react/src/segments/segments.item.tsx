import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

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

/**
 * Segments のセグメントのメタデータです。
 */
export type SegmentsItemMetadata = BaseTabs.Tab.Metadata;

/**
 * アクティブなセグメントの位置です。
 */
export type SegmentsItemPosition = BaseTabs.Tab.Position;

/**
 * アクティブなセグメントの大きさです。
 */
export type SegmentsItemSize = BaseTabs.Tab.Size;

/**
 * Segments のセグメントの値です。
 */
export type SegmentsItemValue = BaseTabs.Tab.Value;

/**
 * {@link SegmentsItem} が持つ状態です。
 */
export type SegmentsItemState = BaseTabs.Tab.State;

export namespace SegmentsItemProps {
  export type Render = RenderProps<SegmentsItemState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseTabs.Tab>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // TabsTabProps:
      | "value"
      | "disabled",
      keyof Render | keyof SuruUI
    >
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

/**
 * 選択できる個々のセグメントです。
 */
export const SegmentsItem: ISegmentsItem = function SuiSegmentsItem(props) {
  const { className, ...otherProps } = props;

  return (
    <BaseTabs.Tab
      {...otherProps}
      className={cn(
        className,
        "sui_segments_item",
        (state) => state.active && "sui_segments_item-active",
        (state) => state.disabled && "sui_segments_item-disabled",
      )}
    />
  );
};

export { SegmentsItem as Item };

export namespace Item {
  export type State = SegmentsItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SegmentsItemProps.Render;

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
