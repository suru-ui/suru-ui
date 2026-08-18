import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./tabs.css";

// Types
// -----

/**
 * Tabs の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 */
export type TabsRadius = "none" | "sm" | "md" | "lg";

/**
 * Tabs の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type TabsSize = Size;

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
   * @default "md"
   */
  radius?: TabsRadius | undefined;

  /**
   * Tabs のサイズを指定します。
   *
   * @default "md"
   */
  size?: TabsSize | undefined;
};

/**
 * Tabs のルート要素です。
 *
 * 各タブと対応するパネルをグループ化します。
 */
export const TabsRoot: IComponent<TabsRootProps> = function SuiTabsRoot(props) {
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
 * {@link TabsRoot} の状態やプロパティーをまとめた型名前空間です。
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
export const Root: IComponent<Root.Props> = TabsRoot;

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
 */
export const TabsList: IComponent<TabsListProps> = function SuiTabsList(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.List {...otherProps} className={cn(className, "sui_tabs_list")} />;
};

/**
 * {@link TabsList} の状態やプロパティーをまとめた型名前空間です。
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
export const List: IComponent<List.Props> = TabsList;

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
 */
export const TabsTab: IComponent<TabsTabProps> = function SuiTabsTab(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.Tab {...otherProps} className={cn(className, "sui_tabs_tab")} />;
};

/**
 * {@link TabsTab} の状態やプロパティーをまとめた型名前空間です。
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
export const Tab: IComponent<Tab.Props> = TabsTab;

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
 */
export const TabsIndicator: IComponent<TabsIndicatorProps> = function SuiTabsIndicator(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.Indicator {...otherProps} className={cn(className, "sui_tabs_indicator")} />;
};

/**
 * {@link TabsIndicator} の状態やプロパティーをまとめた型名前空間です。
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
export const Indicator: IComponent<Indicator.Props> = TabsIndicator;

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
 */
export const TabsPanel: IComponent<TabsPanelProps> = function SuiTabsPanel(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.Panel {...otherProps} className={cn(className, "sui_tabs_panel")} />;
};

/**
 * {@link TabsPanel} の状態やプロパティーをまとめた型名前空間です。
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
export const Panel: IComponent<Panel.Props> = TabsPanel;
