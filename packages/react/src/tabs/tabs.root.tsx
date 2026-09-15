import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * Tabs のアクティブなタブが変更されるイベントの詳細です。
 */
export type TabsRootChangeEventDetails = BaseTabs.Root.ChangeEventDetails;

/**
 * Tabs のアクティブなタブを変更する理由です。
 */
export type TabsRootChangeEventReason = BaseTabs.Root.ChangeEventReason;

/**
 * Tabs の方向です。
 *
 * - `"horizontal"`: 水平方向
 * - `"vertical"`: 垂直方向
 */
export type TabsRootOrientation = BaseTabs.Root.Orientation;

/**
 * 選択中のタブの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 * - `"solid"`: 塗りつぶし
 */
export type TabsRootActiveVariant = "naked" | "liquid" | "solid";

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

  export type SuruUI = {
    /**
     * 選択中のタブの主な外観を指定します。
     *
     * `variant` が `"segments"` の場合のみ有効です。
     *
     * @default "liquid"
     */
    activeVariant?: TabsRootActiveVariant | undefined;

    /**
     * Tabs の枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * Tabs の角丸の大きさを指定します。
     *
     * 既定値は {@link TabsRootProps.size|size}
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
 */
export type TabsRootProps = TabsRootProps.Render &
  TabsRootProps.SuruUI &
  TabsRootProps.BaseUI &
  TabsRootProps.HTML;

/**
 * Tabs のルート要素です。
 *
 * 各タブと対応するパネルをグループ化します。
 * 矢印キーによるタブ間の移動は Base UI が提供します。
 */
export const TabsRoot: IComponent<TabsRootProps> = function SuiTabsRoot(props) {
  const {
    size = "md",
    radius = size,
    variant = "line",
    outlined = false,
    className,
    activeVariant = "liquid",
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
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
  );
};

export { TabsRoot as Root };

export namespace Root {
  export type State = TabsRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TabsRootProps.Render;

    export type SuruUI = TabsRootProps.SuruUI;

    export type BaseUI = TabsRootProps.BaseUI;

    export type HTML = TabsRootProps.HTML;
  }

  export type ActiveVariant = TabsRootActiveVariant;

  export type ChangeEventDetails = TabsRootChangeEventDetails;

  export type ChangeEventReason = TabsRootChangeEventReason;

  export type Orientation = TabsRootOrientation;

  export type Radius = TabsRootRadius;

  export type Size = TabsRootSize;

  export type Variant = TabsRootVariant;
}
