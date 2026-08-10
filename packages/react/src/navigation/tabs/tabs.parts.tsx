import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./tabs.css";

// Root
// ----

/**
 * {@link TabsRoot} の状態です。
 */
export type TabsRootState = BaseTabs.Root.State;

/**
 * {@link TabsRoot} に渡すプロパティーです。
 */
export type TabsRootProps = React.ComponentProps<typeof BaseTabs.Root> & {
  /**
   * Tabs の枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * Tabs の角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"sm"`: 小さい角丸
   * - `"md"`: 標準的な角丸
   * - `"lg"`: 大きい角丸
   *
   * @default "md"
   */
  radius?: "none" | "sm" | "md" | "lg" | undefined;

  /**
   * Tabs のサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;
};

/**
 * Tabs のルート要素です。
 *
 * 各タブと対応するパネルをグループ化します。
 *
 * @example
 * ```tsx
 * <TabsParts.Root defaultValue="overview">
 *   <TabsParts.List>
 *     <TabsParts.Tab value="overview">概要</TabsParts.Tab>
 *     <TabsParts.Tab value="projects">プロジェクト</TabsParts.Tab>
 *   </TabsParts.List>
 *   <TabsParts.Panel value="overview">概要の内容</TabsParts.Panel>
 *   <TabsParts.Panel value="projects">プロジェクトの内容</TabsParts.Panel>
 * </TabsParts.Root>
 * ```
 */
export const TabsRoot: Component<TabsRootProps> = function SuiTabsRoot(props) {
  const {
    className,
    orientation = "horizontal",
    outlined = false,
    radius = "md",
    size = "md",
    ...otherProps
  } = props;

  return (
    <BaseTabs.Root
      {...otherProps}
      orientation={orientation}
      className={cn(
        className,
        "sui_tabs",
        outlined && "sui_tabs-outlined",
        `sui_tabs-orientation_${orientation}`,
        `sui_tabs-radius_${radius}`,
        `sui_tabs-size_${size}`,
      )}
    />
  );
};

/**
 * {@link TabsRoot} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link Root} の状態です。
   */
  export type State = TabsRootState;

  /**
   * {@link Root} に渡すプロパティーです。
   */
  export type Props = TabsRootProps;
}

/**
 * {@link TabsRoot} の別名です。
 */
export const Root: Component<Root.Props> = TabsRoot;

// List
// ----

/**
 * {@link List} の状態です。
 */
export type TabsListState = BaseTabs.List.State;

/**
 * {@link List} に渡すプロパティーです。
 */
export type TabsListProps = React.ComponentProps<typeof BaseTabs.List>;

/**
 * 個々の Tab ボタンをまとめるリスト要素です。
 *
 * @example
 * ```tsx
 * <TabsParts.List>
 *   <TabsParts.Tab value="a">項目 A</TabsParts.Tab>
 *   <TabsParts.Tab value="b">項目 B</TabsParts.Tab>
 * </TabsParts.List>
 * ```
 */
export const TabsList: Component<TabsListProps> = function SuiTabsList(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.List {...otherProps} className={cn(className, "sui_tabs_list")} />;
};

/**
 * {@link TabsList} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace List {
  /**
   * {@link List} の状態です。
   */
  export type State = TabsListState;

  /**
   * {@link List} に渡すプロパティーです。
   */
  export type Props = TabsListProps;
}

/**
 * {@link TabsList} の別名です。
 */
export const List: Component<List.Props> = TabsList;

// Tab
// ---

/**
 * {@link Tab} の状態です。
 */
export type TabsTabState = BaseTabs.Tab.State;

/**
 * {@link Tab} に渡すプロパティーです。
 */
export type TabsTabProps = React.ComponentProps<typeof BaseTabs.Tab>;

/**
 * 対応するパネルを切り替える Tab ボタンです。
 *
 * @example
 * ```tsx
 * <TabsParts.Tab value="overview">概要</TabsParts.Tab>
 * ```
 */
export const TabsTab: Component<TabsTabProps> = function SuiTabsTab(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.Tab {...otherProps} className={cn(className, "sui_tabs_tab")} />;
};

/**
 * {@link TabsTab} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Tab {
  /**
   * {@link Tab} の状態です。
   */
  export type State = TabsTabState;

  /**
   * {@link Tab} に渡すプロパティーです。
   */
  export type Props = TabsTabProps;
}

/**
 * {@link TabsTab} の別名です。
 */
export const Tab: Component<Tab.Props> = TabsTab;

// Indicator
// ---------

/**
 * {@link TabsIndicator} の状態です。
 */
export type TabsIndicatorState = BaseTabs.Indicator.State;

/**
 * {@link TabsIndicator} に渡すプロパティーです。
 */
export type TabsIndicatorProps = React.ComponentProps<typeof BaseTabs.Indicator>;

/**
 * アクティブな Tab の位置に追従するインジケーター要素です。
 *
 * `TabsParts.List` の子要素として配置します。
 *
 * @example
 * ```tsx
 * <TabsParts.List>
 *   <TabsParts.Tab value="a">項目 A</TabsParts.Tab>
 *   <TabsParts.Indicator />
 * </TabsParts.List>
 * ```
 */
export const TabsIndicator: Component<TabsIndicatorProps> = function SuiTabsIndicator(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.Indicator {...otherProps} className={cn(className, "sui_tabs_indicator")} />;
};

/**
 * {@link TabsIndicator} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link Indicator} の状態です。
   */
  export type State = TabsIndicatorState;

  /**
   * {@link Indicator} に渡すプロパティーです。
   */
  export type Props = TabsIndicatorProps;
}

/**
 * {@link TabsIndicator} の別名です。
 */
export const Indicator: Component<Indicator.Props> = TabsIndicator;

// Panel
// -----

/**
 * {@link TabsPanel} の状態です。
 */
export type TabsPanelState = BaseTabs.Panel.State;

/**
 * {@link TabsPanel} に渡すプロパティーです。
 */
export type TabsPanelProps = React.ComponentProps<typeof BaseTabs.Panel>;

/**
 * アクティブな Tab に対応するコンテンツを表示するパネル要素です。
 *
 * @example
 * ```tsx
 * <TabsParts.Panel value="overview">概要の内容</TabsParts.Panel>
 * ```
 */
export const TabsPanel: Component<TabsPanelProps> = function SuiTabsPanel(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.Panel {...otherProps} className={cn(className, "sui_tabs_panel")} />;
};

/**
 * {@link TabsPanel} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Panel {
  /**
   * {@link Panel} の状態です。
   */
  export type State = TabsPanelState;

  /**
   * {@link Panel} に渡すプロパティーです。
   */
  export type Props = TabsPanelProps;
}

/**
 * {@link TabsPanel} の別名です。
 */
export const Panel: Component<Panel.Props> = TabsPanel;
