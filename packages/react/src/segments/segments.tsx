import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type SegmentsRootSize,
  type SegmentsItemProps,
  type SegmentsListProps,
  type SegmentsRootColor,
  type SegmentsRootProps,
  type SegmentsRootState,
  type SegmentsRootRadius,
  type SegmentsIndicatorProps,
  SegmentsItem,
  SegmentsList,
  SegmentsRoot,
  SegmentsIndicator,
} from "./segments.parts.jsx";

/**
 * {@link SegmentsRootColor} です。
 */
export type SegmentsColor = SegmentsRootColor;

/**
 * {@link SegmentsRootRadius} です。
 */
export type SegmentsRadius = SegmentsRootRadius;

/**
 * {@link SegmentsRootSize} です。
 */
export type SegmentsSize = SegmentsRootSize;

/**
 * {@link Segments} の状態です。
 */
export type SegmentsState = SegmentsRootState;

/**
 * {@link Segments} の 1 つのセグメントを表す項目です。
 */
export type SegmentsItemOption = {
  /**
   * セグメントを無効にするかどうかです。
   *
   * @default false
   */
  readonly disabled?: boolean | undefined;

  /**
   * セグメントに表示するラベルです。
   * `slotProps.item.children` を指定した場合は、そちらが優先されます。
   */
  readonly label: React.ReactNode;

  /**
   * セグメントの値です。
   */
  readonly value: unknown;
};

/**
 * {@link Segments} の各パーツに渡すプロパティーです。
 *
 * 各パーツの指定値は、パーツに渡される既定のプロパティーより優先されます。
 * `item.children` を指定した場合は、すべてのセグメントのラベルより優先されます。
 */
export type SegmentsSlotProps = {
  /**
   * {@link SegmentsIndicator} に渡すプロパティーです。
   */
  readonly indicator?: SegmentsIndicatorProps | undefined;

  /**
   * {@link SegmentsItem} に渡すプロパティーです。
   * `children` を指定すると、すべてのセグメントのラベルより優先されます。
   */
  readonly item?: SegmentsItemProps | undefined;

  /**
   * {@link SegmentsList} に渡すプロパティーです。
   */
  readonly list?: SegmentsListProps | undefined;
};

/**
 * 各パーツに渡すプロパティーをまとめたものです。
 */
export type SegmentsPartsProps = {
  /**
   * {@link SegmentsIndicator} に渡すプロパティーです。
   */
  readonly indicator: SegmentsIndicatorProps;

  /**
   * 各 {@link SegmentsItem} に渡すプロパティーの一覧です。
   *
   * `items` の各項目に対応します。`children` にはセグメントのラベルが設定されています。
   */
  readonly item: readonly SegmentsItemProps[];

  /**
   * {@link SegmentsList} に渡すプロパティーです。
   *
   * `items` を指定しないときは null になります。
   */
  readonly list: SegmentsListProps | null;

  /**
   * {@link SegmentsRoot} に渡すプロパティーです。
   */
  readonly root: SegmentsRootProps;
};

/**
 * {@link Segments} コンポーネントのプロパティーです。
 */
export type SegmentsProps = Omit<SegmentsRootProps, "children"> & {
  /**
   * セグメントの項目です。
   */
  items?: SegmentsItemOption[] | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   * `item.children` を指定すると、すべてのセグメントのラベルより優先されます。
   */
  slotProps?: SegmentsSlotProps | undefined;
};

/**
 * {@link Segments} の各パーツに渡すプロパティーを作るフックです。
 */
export function useSegments(props: SegmentsProps): SegmentsPartsProps {
  const { items, slotProps, ...rootProps } = props;
  const { list: listProps, item: itemProps, indicator: indicatorProps } = slotProps ?? {};
  const { children: itemChildren, ...otherItemProps } = itemProps ?? {};

  return {
    root: rootProps,
    list: items === undefined ? null : (listProps ?? {}),
    item:
      items?.map((option) => ({
        ...otherItemProps,
        value: option.value,
        disabled: option.disabled,
        children: itemChildren ?? option.label,
      })) ?? [],
    indicator: indicatorProps ?? {},
  };
}

/**
 * 関連する選択肢から 1 つを選ばせるセグメントコントロールです。
 *
 * `items` からセグメントの並びを組み立てます。
 * レイアウトを細かく制御する場合は、{@link SegmentsRoot|Root} と各パーツを直接組み立てます。
 */
export const Segments: IComponent<SegmentsProps> = function SuiSegments(props) {
  const partsProps = useSegments(props);

  return (
    <SegmentsRoot {...partsProps.root}>
      {partsProps.list && (
        <SegmentsList {...partsProps.list}>
          {partsProps.item.map((itemProps) => (
            <SegmentsItem key={String(itemProps.value)} {...itemProps} />
          ))}
          <SegmentsIndicator {...partsProps.indicator} />
        </SegmentsList>
      )}
    </SegmentsRoot>
  );
};

/**
 * {@link Segments} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Segments {
  /**
   * {@link SegmentsState} です。
   */
  export type State = SegmentsState;

  /**
   * {@link SegmentsProps} です。
   */
  export type Props = SegmentsProps;

  /**
   * {@link SegmentsSlotProps} です。
   */
  export type SlotProps = SegmentsSlotProps;

  /**
   * {@link SegmentsColor} です。
   */
  export type Color = SegmentsColor;

  /**
   * {@link SegmentsItemOption} です。
   */
  export type Item = SegmentsItemOption;

  /**
   * {@link SegmentsRadius} です。
   */
  export type Radius = SegmentsRadius;

  /**
   * {@link SegmentsSize} です。
   */
  export type Size = SegmentsSize;
}
