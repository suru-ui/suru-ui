import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import type { SegmentsItemProps } from "../item/segments.item.jsx";
import {
  type SegmentsContextSize,
  type SegmentsContextColor,
  type SegmentsContextRadius,
  type SegmentsContextActiveVariant,
  SegmentsContext,
} from "./segments.root.context.js";

/** Segments のアクティブなセグメントが変更されるイベントの詳細です。 */
export type SegmentsRootChangeEventDetails = BaseTabs.Root.ChangeEventDetails;

/** Segments のアクティブなセグメントを変更する理由です。 */
export type SegmentsRootChangeEventReason = BaseTabs.Root.ChangeEventReason;

/**
 * Segments の項目を表すオブジェクトです。
 *
 * `label` を含み、その他のプロパティーは {@link SegmentsItem} に渡されます。
 */
export type SegmentsRootItemObject = Override<
  Omit<SegmentsItemProps, "children">,
  {
    /** 項目に表示するラベルです。 */
    readonly label: React.ReactNode;
  }
>;

/**
 * Segments の各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface ISegmentsRootItemRenderer<TItem = any> {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   *
   * @returns レンダリングする内容です。
   */
  (item: TItem, index: number, items: readonly TItem[]): React.ReactNode;
}

/**
 * 選択中のセグメントの主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type SegmentsRootActiveVariant = SegmentsContextActiveVariant;

/** Segments の配色です。 */
export type SegmentsRootColor = SegmentsContextColor;

/**
 * Segments の方向です。
 *
 * - `"horizontal"`: 水平方向
 * - `"vertical"`: 垂直方向
 */
export type SegmentsRootOrientation = BaseTabs.Root.Orientation;

/**
 * Segments の角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 円形
 */
export type SegmentsRootRadius = SegmentsContextRadius;

/**
 * Segments の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type SegmentsRootSize = SegmentsContextSize;

/**
 * {@link SegmentsRoot} が持つ状態です。
 */
export type SegmentsRootState<TItem = any> = Override<SegmentsContext<TItem>, BaseTabs.Root.State>;

export namespace SegmentsRootProps {
  export type Render<TItem = any> = RenderProps<SegmentsRootState<TItem>>;

  export type SuruUI<TItem = any> = {
    /**
     * 選択中のセグメントの主な外観を指定します。
     *
     * @default "solid"
     */
    activeVariant?: SegmentsRootActiveVariant | undefined;

    /**
     * Segments の配色を指定します。
     *
     * 選択されている項目の背景と文字色に使われます。
     *
     * @default "grey"
     */
    color?: SegmentsRootColor | undefined;

    /**
     * セグメントに表示する項目です。
     *
     * `children` を省略した {@link SegmentsList} は、この項目を順に並べて表示します。
     */
    items?: readonly TItem[] | undefined;

    /**
     * Segments の角丸の大きさを指定します。
     *
     * 既定値は {@link SegmentsRootProps.size|size} です。
     */
    radius?: SegmentsRootRadius | undefined;

    /**
     * Segments の大きさを指定します。
     *
     * @default "md"
     */
    size?: SegmentsRootSize | undefined;

    /**
     * 上下の余白を半分にして高さを薄くするかどうかを指定します。
     *
     * @default false
     */
    thin?: boolean | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseTabs.Root>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // TabsRootProps より :
      "value" | "defaultValue" | "orientation" | "onValueChange"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseTabs.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SegmentsRoot} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type SegmentsRootProps<TItem = any> = SegmentsRootProps.Render<TItem> &
  SegmentsRootProps.SuruUI<TItem> &
  SegmentsRootProps.BaseUI &
  SegmentsRootProps.HTML;

export interface ISegmentsRoot extends IComponent<SegmentsRootProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: SegmentsRootProps<TItem>): IComponent.Return;
}

/**
 * Segments のルート要素です。
 *
 * 個々のセグメントをグループ化し、選択値を管理します。
 *
 * `items` は子孫の {@link SegmentsList} へコンテキスト経由で渡されます。
 */
export const SegmentsRoot: ISegmentsRoot = (props: SegmentsRootProps) => {
  const {
    size = "md",
    thin = false,
    color = "grey",
    items = [],
    style,
    radius = size,
    render,
    className,
    // @ts-expect-error data-scope は Base UI のコンポーネント型に含まれないため。
    "data-scope": dataScope = "",
    activeVariant = "solid",
    ...otherProps
  } = props;
  const ctx = React.useMemo<SegmentsContext>(
    () => ({
      size,
      thin,
      color,
      items,
      radius,
      activeVariant,
    }),
    [activeVariant, color, items, radius, size, thin],
  );

  return (
    <SegmentsContext value={ctx}>
      <BaseTabs.Root
        {...otherProps}
        {...proxyRenderProps<BaseTabs.Root.State, SegmentsRootState>(
          (state) => ({
            ...ctx,
            ...state,
          }),
          {
            style,
            render,
            className: cn<SegmentsRootState>(
              className,
              "sui_segments",
              (state) => `sui_segments-size_${state.size}`,
              (state) => `sui_segments-color_${state.color}`,
              (state) => `sui_segments-radius_${state.radius}`,
              (state) => `sui_segments-active_variant_${state.activeVariant}`,
              (state) => `sui_segments-orientation_${state.orientation}`,
              (state) => `sui_segments-tab_activation_direction_${state.tabActivationDirection}`,
              (state) => state.thin && "sui_segments-thin",
            ),
          },
        )}
        data-scope={dataScope}
      />
    </SegmentsContext>
  );
};

export { SegmentsRoot as Root };
export namespace Root {
  export type State<TItem = any> = SegmentsRootState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> &
    Props.SuruUI<TItem> &
    Props.BaseUI &
    Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = SegmentsRootProps.Render<TItem>;

    export type SuruUI<TItem = any> = SegmentsRootProps.SuruUI<TItem>;

    export type BaseUI = SegmentsRootProps.BaseUI;

    export type HTML = SegmentsRootProps.HTML;
  }

  export type ActiveVariant = SegmentsRootActiveVariant;

  export type ChangeEventDetails = SegmentsRootChangeEventDetails;

  export type ChangeEventReason = SegmentsRootChangeEventReason;

  export type Color = SegmentsRootColor;

  export type IItemRenderer<TItem = any> = ISegmentsRootItemRenderer<TItem>;

  export type ItemObject = SegmentsRootItemObject;

  export type Orientation = SegmentsRootOrientation;

  export type Radius = SegmentsRootRadius;

  export type Size = SegmentsRootSize;
}
