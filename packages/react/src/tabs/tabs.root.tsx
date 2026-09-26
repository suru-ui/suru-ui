import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { Size, ColorTemplate } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { TabsContext } from "./tabs.context.js";
import type { TabsTabProps } from "./tabs.tab.jsx";

/**
 * Tabs のアクティブなタブが変更されるイベントの詳細です。
 */
export type TabsRootChangeEventDetails = BaseTabs.Root.ChangeEventDetails;

/**
 * Tabs のアクティブなタブを変更する理由です。
 */
export type TabsRootChangeEventReason = BaseTabs.Root.ChangeEventReason;

/**
 * Tabs の項目を表すオブジェクトです。
 *
 * `label` と `content` を含み、その他のプロパティーは {@link TabsTab} に渡されます。
 */
export type TabsRootItemObject = Omit<TabsTabProps, "children"> & {
  /**
   * タブに表示するラベルです。
   */
  readonly label: React.ReactNode;

  /**
   * タブに対応するパネルに表示する内容です。
   *
   * 省略するとその項目のパネルは作られません。
   */
  readonly content?: React.ReactNode | undefined;
};

/**
 * Tabs の各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface ITabsRootItemRenderer<TItem = any> {
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
 * 選択中のタブの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 * - `"solid"`: 塗りつぶし
 */
export type TabsRootActiveVariant = ColorTemplate;

/**
 * Tabs の方向です。
 *
 * - `"horizontal"`: 水平方向
 * - `"vertical"`: 垂直方向
 */
export type TabsRootOrientation = BaseTabs.Root.Orientation;

/**
 * Tabs の角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type TabsRootRadius = "none" | Size;

/**
 * Tabs の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type TabsRootSize = Size;

/**
 * Tabs の主な外観です。
 *
 * - `"segments"`: 区分表示
 * - `"line"`: 下線表示
 */
export type TabsRootVariant = "segments" | "line";

/**
 * {@link TabsRoot} が持つ状態です。
 */
export type TabsRootState = BaseTabs.Root.State;

export namespace TabsRootProps {
  export type Render = RenderProps<TabsRootState>;

  export type SuruUI<TItem = any> = {
    /**
     * 選択中のタブの主な外観を指定します。
     *
     * `variant` が `"segments"` の場合のみ有効です。
     *
     * @default "liquid"
     */
    activeVariant?: TabsRootActiveVariant | undefined;

    /**
     * タブに表示する項目です。
     *
     * `children` を省略した {@link TabsList} は、この項目を順に並べて表示します。
     * 合成の {@link Tabs} は内容を持つ項目からパネルも組み立てます。
     */
    items?: readonly TItem[] | undefined;

    /**
     * Tabs の枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * Tabs の角丸の大きさを指定します。
     *
     * 既定値は {@link TabsRootProps.size|size} です。
     */
    radius?: TabsRootRadius | undefined;

    /**
     * Tabs の大きさを指定します。
     *
     * @default "md"
     */
    size?: TabsRootSize | undefined;

    /**
     * Tabs の主な外観を指定します。
     *
     * @default "line"
     */
    variant?: TabsRootVariant | undefined;
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
 * {@link TabsRoot} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type TabsRootProps<TItem = any> = TabsRootProps.Render &
  TabsRootProps.SuruUI<TItem> &
  TabsRootProps.BaseUI &
  TabsRootProps.HTML;

export interface ITabsRoot extends IComponent<TabsRootProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = never>(props: TabsRootProps<TItem>): IComponent.Return;
}

/**
 * Tabs のルート要素です。
 *
 * 各タブと対応するパネルをグループ化します。
 * `items` は子孫の {@link TabsList} へコンテキスト経由で渡されます。
 */
export const TabsRoot: ITabsRoot = function SuiTabsRoot(props: TabsRootProps) {
  const {
    size = "md",
    items = [],
    radius = size,
    variant = "line",
    outlined = false,
    className,
    activeVariant = "liquid",
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const ctx = React.useMemo<TabsContext>(() => ({ items }), [items]);

  return (
    <TabsContext value={ctx}>
      <BaseTabs.Root
        {...otherProps}
        className={cn(
          className,
          "sui_tabs",
          `sui_tabs-size_${size}`,
          `sui_tabs-radius_${radius}`,
          `sui_tabs-variant_${variant}`,
          `sui_tabs-active_variant_${activeVariant}`,
          outlined && "sui_tabs-outlined",
          (state) => `sui_tabs-orientation_${state.orientation}`,
        )}
        data-scope={dataScope}
      />
    </TabsContext>
  );
};

export { TabsRoot as Root };

export namespace Root {
  export type State = TabsRootState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TabsRootProps.Render;

    export type SuruUI<TItem = any> = TabsRootProps.SuruUI<TItem>;

    export type BaseUI = TabsRootProps.BaseUI;

    export type HTML = TabsRootProps.HTML;
  }

  export type ActiveVariant = TabsRootActiveVariant;

  export type ChangeEventDetails = TabsRootChangeEventDetails;

  export type ChangeEventReason = TabsRootChangeEventReason;

  export type IItemRenderer<TItem = any> = ITabsRootItemRenderer<TItem>;

  export type ItemObject = TabsRootItemObject;

  export type Orientation = TabsRootOrientation;

  export type Radius = TabsRootRadius;

  export type Size = TabsRootSize;

  export type Variant = TabsRootVariant;
}
