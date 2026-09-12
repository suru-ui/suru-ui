import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import toReactNode from "../_to-react-node.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { isItemObject } from "./_segments.jsx";

import "./segments.css";

// Root
// ----

/**
 * Segments のアクティブなセグメントが変更されるイベントの詳細です。
 */
export type SegmentsRootChangeEventDetails = BaseTabs.Root.ChangeEventDetails;

/**
 * Segments のアクティブなセグメントを変更する理由です。
 */
export type SegmentsRootChangeEventReason = BaseTabs.Root.ChangeEventReason;

/**
 * Segments の方向です。
 *
 * - `"horizontal"`: 水平方向
 * - `"vertical"`: 垂直方向
 */
export type SegmentsRootOrientation = BaseTabs.Root.Orientation;

/**
 * Segments の配色です。
 */
export type SegmentsRootColor = Color;

/**
 * Segments の角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 円形
 */
export type SegmentsRootRadius = "none" | Size | "full";

/**
 * Segments の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type SegmentsRootSize = Size;

/**
 * {@link SegmentsRoot} が持つ状態です。
 */
export type SegmentsRootState = BaseTabs.Root.State;

export namespace SegmentsRootProps {
  export type Render = RenderProps<SegmentsRootState>;

  export type SuruUI = {
    /**
     * Segments の配色を指定します。
     *
     * 選択されている項目の背景と文字色に使われます。
     *
     * @default "grey"
     */
    color?: SegmentsRootColor | undefined;

    /**
     * Segments の角丸の大きさを指定します。
     *
     * 既定値は {@link SegmentsRootProps.size|size}
     */
    radius?: SegmentsRootRadius | undefined;

    /**
     * Segments の大きさを指定します。
     *
     * @default "md"
     */
    size?: SegmentsRootSize | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseTabs.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // TabsRootProps:
      "value" | "defaultValue" | "orientation" | "onValueChange",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseTabs.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SegmentsRoot} に渡す props です。
 */
export type SegmentsRootProps = SegmentsRootProps.Render &
  SegmentsRootProps.SuruUI &
  SegmentsRootProps.BaseUI &
  SegmentsRootProps.HTML;

/**
 * Segments のルート要素です。
 *
 * 個々のセグメントをグループ化し、選択値を管理します。
 */
export const SegmentsRoot: IComponent<SegmentsRootProps> = function SuiSegmentsRoot(props) {
  const {
    size = "md",
    color = "grey",
    radius = size,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <BaseTabs.Root
      {...otherProps}
      className={cn(
        className,
        "sui_segments",
        `sui_segments-size_${size}`,
        `sui_segments-radius_${radius}`,
        `sui_segments-color_${color}`,
      )}
      data-scope={dataScope}
    />
  );
};

export { SegmentsRoot as Root };

export namespace Root {
  export type State = SegmentsRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SegmentsRootProps.Render;

    export type SuruUI = SegmentsRootProps.SuruUI;

    export type BaseUI = SegmentsRootProps.BaseUI;

    export type HTML = SegmentsRootProps.HTML;
  }

  export type ChangeEventDetails = SegmentsRootChangeEventDetails;

  export type ChangeEventReason = SegmentsRootChangeEventReason;

  export type Color = SegmentsRootColor;

  export type Orientation = SegmentsRootOrientation;

  export type Radius = SegmentsRootRadius;

  export type Size = SegmentsRootSize;
}

// List
// ----

/**
 * {@link SegmentsList} の項目を表すオブジェクトです。
 *
 * `label` を含み、その他のプロパティーは {@link SegmentsItem} に渡されます。
 */
export type SegmentsListItemObject = Omit<SegmentsItemProps, "children"> & {
  /**
   * 項目に表示するラベルです。
   */
  readonly label: React.ReactNode;
};

/**
 * {@link SegmentsList} の各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface ISegmentsListItemRenderer<TItem = any> {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   * @returns レンダリングする内容です。
   */
  (item: TItem, index: number, items: readonly TItem[]): React.ReactNode;
}

/**
 * {@link SegmentsList} が持つ状態です。
 */
export type SegmentsListState = BaseTabs.List.State;

export namespace SegmentsListProps {
  export type Render = RenderProps<SegmentsListState>;

  export type SuruUI<TItem = any> = {
    /**
     * リストの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link SegmentsListProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | ISegmentsListItemRenderer<TItem>;

    /**
     * リストの項目です。
     *
     * `children` に関数を指定した場合、この配列の各項目が引数として渡されます。
     */
    items?: readonly TItem[] | undefined;
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

interface ISegmentsList extends IComponent<SegmentsListProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = never>(props: SegmentsListProps<TItem>): IComponent.Return;
}

/**
 * 個々のセグメントをまとめるリスト要素です。
 */
export const SegmentsList: ISegmentsList = function SuiSegmentsList(props: SegmentsListProps) {
  const { items = [], children = defaultListItemRenderer, className, ...otherProps } = props;

  return (
    <BaseTabs.List {...otherProps} className={cn(className, "sui_segments_list")}>
      {typeof children === "function" ? items.map(children) : children}
    </BaseTabs.List>
  );
};

const defaultListItemRenderer: ISegmentsListItemRenderer = (item, index) => {
  if (!isItemObject(item)) {
    return toReactNode(item);
  }

  const { label, value, ...otherItemProps } = item;

  return (
    <SegmentsItem {...otherItemProps} key={index} value={value}>
      {toReactNode(label)}
    </SegmentsItem>
  );
};

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

  export type ItemObject = SegmentsListItemObject;

  export interface IItemRenderer<TItem = any> extends ISegmentsListItemRenderer<TItem> {}
}

// Item
// ----

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

/**
 * 選択できる個々のセグメントです。
 */
export const SegmentsItem: IComponent<SegmentsItemProps> = function SuiSegmentsItem(props) {
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

// Indicator
// ---------

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

/**
 * 選択されているセグメントの位置に追従するインジケーターです。
 *
 * {@link SegmentsList} の子要素として配置します。
 */
export const SegmentsIndicator: IComponent<SegmentsIndicatorProps> = function SuiSegmentsIndicator(
  props,
) {
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
