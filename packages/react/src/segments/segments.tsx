import * as React from "react";

import mergeProps from "../_merge-props.js";
import toReactNode from "../_to-react-node.js";
import type { IComponent } from "../types.js";
import { createItemRenderer, getSegmentsItemLabel, getSegmentsItemProps } from "./_segments.jsx";
import type { SegmentsContext } from "./segments.context.js";
import {
  type SegmentsRootSize,
  type SegmentsItemProps,
  type SegmentsItemValue,
  type SegmentsListProps,
  type SegmentsRootColor,
  type SegmentsRootProps,
  type SegmentsRootState,
  type SegmentsRootRadius,
  type SegmentsIndicatorProps,
  type SegmentsRootItemObject,
  type SegmentsRootOrientation,
  type ISegmentsRootItemRenderer,
  type SegmentsRootActiveVariant,
  type SegmentsRootChangeEventReason,
  type SegmentsRootChangeEventDetails,
  SegmentsItem,
  SegmentsList,
  SegmentsRoot,
  SegmentsIndicator,
} from "./segments.parts.js";

// Types
// -----

export type SegmentsActiveVariant = SegmentsRootActiveVariant;

export type SegmentsChangeEventDetails = SegmentsRootChangeEventDetails;

export type SegmentsChangeEventReason = SegmentsRootChangeEventReason;

export type SegmentsColor = SegmentsRootColor;

export type SegmentsItemObject = SegmentsRootItemObject;

export type ISegmentsItemRenderer<TItem = any> = ISegmentsRootItemRenderer<TItem>;

export type SegmentsOrientation = SegmentsRootOrientation;

export type SegmentsRadius = SegmentsRootRadius;

export type SegmentsSize = SegmentsRootSize;

export type SegmentsValue = SegmentsItemValue;

/**
 * {@link Segments} が持つ状態です。
 */
export type SegmentsState = SegmentsRootState;

/**
 * {@link Segments} の各パーツに渡す props です。
 */
export type SegmentsSlotProps = {
  /**
   * {@link SegmentsIndicator} に渡す props です。
   */
  readonly indicator?: SegmentsIndicatorProps | undefined;

  /**
   * {@link SegmentsItem} に渡す props です。
   *
   * すべての項目に同じ props が渡されます。`children` と `value` は上書きされません。
   */
  readonly item?: Omit<SegmentsItemProps, "children" | "value"> | undefined;

  /**
   * {@link SegmentsList} に渡す props です。
   *
   * `children` は上書きされません。
   */
  readonly list?: Omit<SegmentsListProps, "children"> | undefined;
};

namespace SegmentsProps {
  export type Root<TItem = any> = Omit<SegmentsRootProps<TItem>, keyof Segments>;

  export type Segments<TItem = any> = {
    /**
     * セグメントの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link SegmentsRootProps.items|items} の各項目が引数として渡されます。
     * 省略した場合は {@link SegmentsRootProps.items|items} を既定の並びで表示します。
     */
    children?: SegmentsListProps<TItem>["children"] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: SegmentsSlotProps | undefined;
  };
}

/**
 * {@link Segments} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type SegmentsProps<TItem = any> = SegmentsProps.Segments<TItem> & SegmentsProps.Root<TItem>;

export interface IUseSegmentsAPI {
  /**
   * {@link SegmentsAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @param props {@link Segments} の props です。
   * @returns セグメントの API です。
   */
  <TItem = any>(props: SegmentsProps<TItem>): SegmentsAPI<TItem>;
}

// API
// ---

/**
 * {@link Segments} を構成する各パーツの props などを作成するための API です。
 *
 * @template TItem 項目の型です。
 */
export class SegmentsAPI<TItem = any> {
  private readonly rootProps: SegmentsProps.Root<TItem>;

  private readonly segmentsProps: Required<Omit<SegmentsProps.Segments<TItem>, "slotProps">>;

  private readonly slotProps: SegmentsSlotProps;

  /**
   * @param props {@link Segments} の props です。
   * @internal
   */
  public constructor(props: SegmentsProps<TItem>) {
    const { children, slotProps = {}, ...rootProps } = props;
    this.rootProps = rootProps;
    this.segmentsProps = { children };
    this.slotProps = slotProps;
  }

  private readonly defaultItemRenderer: ISegmentsItemRenderer = createItemRenderer<TItem>(
    (item) => this.getItemProps(item),
    (item) => this.getLabel(item),
  );

  /**
   * {@link SegmentsIndicator} に渡す props を取得します。
   */
  public getIndicatorProps(): SegmentsIndicatorProps {
    const { indicator: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link SegmentsItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getItemProps(item: TItem): Omit<SegmentsItemProps, "children"> {
    const { item: props = {} } = this.slotProps;
    const itemProps = getSegmentsItemProps(item);

    return mergeProps<typeof SegmentsItem>([{ ...props, value: itemProps.value }, itemProps]);
  }

  /**
   * 項目のラベルを取得します。
   *
   * @param item 項目です。
   */
  public getLabel(item: TItem): React.ReactNode {
    return getSegmentsItemLabel(item);
  }

  /**
   * {@link SegmentsList} に渡す props を取得します。
   */
  public getListProps(): Omit<SegmentsListProps<TItem>, "children"> & {
    children: React.ReactNode;
  } {
    const { list: props = {} } = this.slotProps;
    const { children } = this.segmentsProps;
    const { items = [] } = this.rootProps;
    const content =
      typeof children === "function"
        ? items.map(children)
        : (toReactNode(children) ?? items.map(this.defaultItemRenderer));

    return {
      ...props,
      children: (
        <>
          {content}
          <SegmentsIndicator {...this.getIndicatorProps()} />
        </>
      ),
    };
  }

  /**
   * {@link SegmentsRoot} に渡す props を取得します。
   */
  public getRootProps(): SegmentsProps.Root<TItem> {
    return this.rootProps;
  }
}

/**
 * {@link SegmentsAPI} を作成するフックです。
 */
export const useSegmentsAPI: IUseSegmentsAPI = function useSuiSegmentsAPI(props) {
  return new SegmentsAPI(props);
};

export { SegmentsAPI as API, useSegmentsAPI as useAPI };

// Component
// ---------

export interface ISegments extends IComponent<SegmentsProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: SegmentsProps<TItem>): IComponent.Return;
}

/**
 * 関連する選択肢から 1 つを選ばせるセグメントコントロールです。
 *
 * `items` からセグメントの並びを組み立てます。レイアウトを細かく制御する場合は、{@link SegmentsRoot} と各パーツを直接組み立てます。
 */
export const Segments: ISegments = function SuiSegments(props: SegmentsProps) {
  const api = useSegmentsAPI(props);

  return (
    <SegmentsRoot {...api.getRootProps()}>
      <SegmentsList {...api.getListProps()} />
    </SegmentsRoot>
  );
};

export namespace Segments {
  export type State = SegmentsState;

  export type Props<TItem = any> = SegmentsProps<TItem>;

  export type SlotProps = SegmentsSlotProps;

  export type Context<TItem = any> = SegmentsContext<TItem>;

  export type ActiveVariant = SegmentsActiveVariant;

  export type ChangeEventDetails = SegmentsChangeEventDetails;

  export type ChangeEventReason = SegmentsChangeEventReason;

  export type Color = SegmentsColor;

  export type IItemRenderer<TItem = any> = ISegmentsItemRenderer<TItem>;

  export type ItemObject = SegmentsItemObject;

  export type Orientation = SegmentsOrientation;

  export type Radius = SegmentsRadius;

  export type Size = SegmentsSize;

  export type Value = SegmentsValue;
}
