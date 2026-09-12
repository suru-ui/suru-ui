import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./tabs.css";

// Root
// ----

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

// List
// ----

/**
 * {@link TabsList} が持つ状態です。
 */
export type TabsListState = BaseTabs.List.State;

export namespace TabsListProps {
  export type Render = RenderProps<TabsListState>;

  export type SuruUI = {};

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
 * {@link TabsList} に渡す props です。
 */
export type TabsListProps = TabsListProps.Render &
  TabsListProps.SuruUI &
  TabsListProps.BaseUI &
  TabsListProps.HTML;

/**
 * 個々の Tab ボタンをまとめるリスト要素です。
 *
 * 矢印キーによるフォーカス移動の起点になります。
 */
export const TabsList: IComponent<TabsListProps> = function SuiTabsList(props) {
  const { className, "aria-label": ariaLabel = "タブ", ...otherProps } = props;

  return (
    <BaseTabs.List
      {...otherProps}
      className={cn(className, "sui_tabs_list")}
      aria-label={ariaLabel}
    />
  );
};

export { TabsList as List };

export namespace List {
  export type State = TabsListState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TabsListProps.Render;

    export type SuruUI = TabsListProps.SuruUI;

    export type BaseUI = TabsListProps.BaseUI;

    export type HTML = TabsListProps.HTML;
  }
}

// Tab
// ---

/**
 * タブをアクティブ化する方向です。
 *
 * - `"left"`: 左方向
 * - `"right"`: 右方向
 * - `"up"`: 上方向
 * - `"down"`: 下方向
 * - `"none"`: 方向なし
 */
export type TabsTabActivationDirection = BaseTabs.Tab.ActivationDirection;

/**
 * Tabs のタブのメタデータです。
 */
export type TabsTabMetadata = BaseTabs.Tab.Metadata;

/**
 * アクティブなタブの位置です。
 */
export type TabsTabPosition = BaseTabs.Tab.Position;

/**
 * アクティブなタブの大きさです。
 */
export type TabsTabSize = BaseTabs.Tab.Size;

/**
 * Tabs のタブの値です。
 */
export type TabsTabValue = BaseTabs.Tab.Value;

/**
 * {@link TabsTab} が持つ状態です。
 */
export type TabsTabState = BaseTabs.Tab.State;

export namespace TabsTabProps {
  export type Render = RenderProps<TabsTabState>;

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
 * {@link TabsTab} に渡す props です。
 */
export type TabsTabProps = TabsTabProps.Render &
  TabsTabProps.SuruUI &
  TabsTabProps.BaseUI &
  TabsTabProps.HTML;

/**
 * 対応するパネルを切り替える Tab ボタンです。
 */
export const TabsTab: IComponent<TabsTabProps> = function SuiTabsTab(props) {
  const { className, ...otherProps } = props;

  return (
    <BaseTabs.Tab
      {...otherProps}
      className={cn(
        className,
        "sui_tabs_tab",
        (state) => state.active && "sui_tabs_tab-active",
        (state) => state.disabled && "sui_tabs_tab-disabled",
      )}
    />
  );
};

export { TabsTab as Tab };

export namespace Tab {
  export type State = TabsTabState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TabsTabProps.Render;

    export type SuruUI = TabsTabProps.SuruUI;

    export type BaseUI = TabsTabProps.BaseUI;

    export type HTML = TabsTabProps.HTML;
  }

  export type ActivationDirection = TabsTabActivationDirection;

  export type Metadata = TabsTabMetadata;

  export type Position = TabsTabPosition;

  export type Size = TabsTabSize;

  export type Value = TabsTabValue;
}

// Indicator
// ---------

/**
 * {@link TabsIndicator} が持つ状態です。
 */
export type TabsIndicatorState = BaseTabs.Indicator.State;

export namespace TabsIndicatorProps {
  export type Render = RenderProps<TabsIndicatorState>;

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
 * {@link TabsIndicator} に渡す props です。
 */
export type TabsIndicatorProps = TabsIndicatorProps.Render &
  TabsIndicatorProps.SuruUI &
  TabsIndicatorProps.BaseUI &
  TabsIndicatorProps.HTML;

/**
 * アクティブな Tab の位置に追従するインジケーター要素です。
 *
 * {@link TabsList} の子要素として配置します。
 */
export const TabsIndicator: IComponent<TabsIndicatorProps> = function SuiTabsIndicator(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.Indicator {...otherProps} className={cn(className, "sui_tabs_indicator")} />;
};

export { TabsIndicator as Indicator };

export namespace Indicator {
  export type State = TabsIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TabsIndicatorProps.Render;

    export type SuruUI = TabsIndicatorProps.SuruUI;

    export type BaseUI = TabsIndicatorProps.BaseUI;

    export type HTML = TabsIndicatorProps.HTML;
  }
}

// Panel
// -----

/**
 * Tabs のパネルのメタデータです。
 */
export type TabsPanelMetadata = BaseTabs.Panel.Metadata;

/**
 * {@link TabsPanel} が持つ状態です。
 */
export type TabsPanelState = BaseTabs.Panel.State;

export namespace TabsPanelProps {
  export type Render = RenderProps<TabsPanelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseTabs.Panel>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // TabsPanelProps:
      "value" | "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseTabs.Panel>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TabsPanel} に渡す props です。
 */
export type TabsPanelProps = TabsPanelProps.Render &
  TabsPanelProps.SuruUI &
  TabsPanelProps.BaseUI &
  TabsPanelProps.HTML;

/**
 * アクティブな Tab に対応するコンテンツを表示するパネル要素です。
 */
export const TabsPanel: IComponent<TabsPanelProps> = function SuiTabsPanel(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.Panel {...otherProps} className={cn(className, "sui_tabs_panel")} />;
};

export { TabsPanel as Panel };

export namespace Panel {
  export type State = TabsPanelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TabsPanelProps.Render;

    export type SuruUI = TabsPanelProps.SuruUI;

    export type BaseUI = TabsPanelProps.BaseUI;

    export type HTML = TabsPanelProps.HTML;
  }

  export type Metadata = TabsPanelMetadata;
}
