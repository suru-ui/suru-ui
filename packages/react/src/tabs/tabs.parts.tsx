import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./tabs.css";

// Root
// ----

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
 * {@link TabsRoot} が持つ状態です。
 */
export type TabsRootState = BaseTabs.Root.State;

/**
 * {@link TabsRoot} に渡す props です。
 */
export type TabsRootProps = React.ComponentProps<typeof BaseTabs.Root> & {
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
};

/**
 * Tabs のルート要素です。
 *
 * 各タブと対応するパネルをグループ化します。
 * 矢印キーによるタブ間の移動は Base UI が提供します。
 */
export const TabsRoot: IComponent<TabsRootProps> = function SuiTabsRoot(props) {
  const { size = "md", radius = size, outlined = false, className, ...otherProps } = props;

  return (
    <BaseTabs.Root
      {...otherProps}
      className={cn(
        className,
        "sui_tabs",
        `sui_tabs-size_${size}`,
        `sui_tabs-radius_${radius}`,
        outlined && "sui_tabs-outlined",
      )}
      data-scope=""
    />
  );
};

export { TabsRoot as Root };

/**
 * {@link TabsRoot}
 */
export namespace Root {
  /**
   * {@link TabsRootState}
   */
  export type State = TabsRootState;

  /**
   * {@link TabsRootProps}
   */
  export type Props = TabsRootProps;

  /**
   * {@link TabsRootRadius}
   */
  export type Radius = TabsRootRadius;

  /**
   * {@link TabsRootSize}
   */
  export type Size = TabsRootSize;
}

// List
// ----

/**
 * {@link TabsList} が持つ状態です。
 */
export type TabsListState = BaseTabs.List.State;

/**
 * {@link TabsList} に渡す props です。
 */
export type TabsListProps = React.ComponentProps<typeof BaseTabs.List>;

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

/**
 * {@link TabsList}
 */
export namespace List {
  /**
   * {@link TabsListState}
   */
  export type State = TabsListState;

  /**
   * {@link TabsListProps}
   */
  export type Props = TabsListProps;
}

// Tab
// ---

/**
 * {@link TabsTab} が持つ状態です。
 */
export type TabsTabState = BaseTabs.Tab.State;

/**
 * {@link TabsTab} に渡す props です。
 */
export type TabsTabProps = React.ComponentProps<typeof BaseTabs.Tab>;

/**
 * 対応するパネルを切り替える Tab ボタンです。
 */
export const TabsTab: IComponent<TabsTabProps> = function SuiTabsTab(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.Tab {...otherProps} className={cn(className, "sui_tabs_tab")} />;
};

export { TabsTab as Tab };

/**
 * {@link TabsTab}
 */
export namespace Tab {
  /**
   * {@link TabsTabState}
   */
  export type State = TabsTabState;

  /**
   * {@link TabsTabProps}
   */
  export type Props = TabsTabProps;
}

// Indicator
// ---------

/**
 * {@link TabsIndicator} が持つ状態です。
 */
export type TabsIndicatorState = BaseTabs.Indicator.State;

/**
 * {@link TabsIndicator} に渡す props です。
 */
export type TabsIndicatorProps = React.ComponentProps<typeof BaseTabs.Indicator>;

/**
 * アクティブな Tab の位置に追従するインジケーター要素です。
 *
 * `TabsParts.List` の子要素として配置します。
 */
export const TabsIndicator: IComponent<TabsIndicatorProps> = function SuiTabsIndicator(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.Indicator {...otherProps} className={cn(className, "sui_tabs_indicator")} />;
};

export { TabsIndicator as Indicator };

/**
 * {@link TabsIndicator}
 */
export namespace Indicator {
  /**
   * {@link TabsIndicatorState}
   */
  export type State = TabsIndicatorState;

  /**
   * {@link TabsIndicatorProps}
   */
  export type Props = TabsIndicatorProps;
}

// Panel
// -----

/**
 * {@link TabsPanel} が持つ状態です。
 */
export type TabsPanelState = BaseTabs.Panel.State;

/**
 * {@link TabsPanel} に渡す props です。
 */
export type TabsPanelProps = React.ComponentProps<typeof BaseTabs.Panel>;

/**
 * アクティブな Tab に対応するコンテンツを表示するパネル要素です。
 */
export const TabsPanel: IComponent<TabsPanelProps> = function SuiTabsPanel(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.Panel {...otherProps} className={cn(className, "sui_tabs_panel")} />;
};

export { TabsPanel as Panel };

/**
 * {@link TabsPanel}
 */
export namespace Panel {
  /**
   * {@link TabsPanelState}
   */
  export type State = TabsPanelState;

  /**
   * {@link TabsPanelProps}
   */
  export type Props = TabsPanelProps;
}
