import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type TabsRootSize,
  type TabsTabProps,
  type TabsListProps,
  type TabsRootProps,
  type TabsRootState,
  type TabsPanelProps,
  type TabsRootRadius,
  type TabsIndicatorProps,
  TabsTab,
  TabsList,
  TabsRoot,
  TabsPanel,
  TabsIndicator,
} from "./tabs.parts.jsx";

/**
 * {@link TabsRootRadius} です。
 */
export type TabsRadius = TabsRootRadius;

/**
 * {@link TabsRootSize} です。
 */
export type TabsSize = TabsRootSize;

/**
 * {@link Tabs} の状態です。
 */
export type TabsState = TabsRootState;

/**
 * {@link Tabs} の 1 つのタブとパネルを表す項目です。
 */
export type TabsItem = {
  /**
   * タブに対応するパネルに表示するコンテンツです。
   */
  readonly content?: React.ReactNode | undefined;

  /**
   * タブを無効にするかどうかです。
   *
   * @default false
   */
  readonly disabled?: boolean | undefined;

  /**
   * タブに表示するラベルです。
   * `slotProps.tab.children` を指定した場合は、そちらが優先されます。
   */
  readonly label: React.ReactNode;

  /**
   * タブの値です。
   */
  readonly value: unknown;
};

/**
 * {@link Tabs} の各パーツに渡すプロパティーです。
 *
 * 各パーツの指定値は、パーツに渡される既定のプロパティーより優先されます。
 * `tab.children` を指定した場合は、すべてのタブのラベルより優先されます。
 */
export type TabsSlotProps = {
  /**
   * {@link TabsIndicator} に渡すプロパティーです。
   */
  readonly indicator?: TabsIndicatorProps | undefined;

  /**
   * {@link TabsList} に渡すプロパティーです。
   */
  readonly list?: TabsListProps | undefined;

  /**
   * {@link TabsTab} に渡すプロパティーです。
   * `children` を指定すると、すべてのタブのラベルより優先されます。
   */
  readonly tab?: TabsTabProps | undefined;

  /**
   * {@link TabsPanel} に渡すプロパティーです。
   */
  readonly tabPanel?: TabsPanelProps | undefined;
};

/**
 * 各パーツに渡すプロパティーをまとめたものです。
 */
export type TabsPartsProps = {
  /**
   * {@link TabsIndicator} に渡すプロパティーです。
   */
  readonly indicator: TabsIndicatorProps;

  /**
   * {@link TabsList} に渡すプロパティーです。
   *
   * `items` を指定しないときは null になります。
   */
  readonly list: TabsListProps | null;

  /**
   * 各 {@link TabsPanel} に渡すプロパティーの一覧です。
   *
   * `items` の各項目に対応します。
   */
  readonly panel: readonly TabsPanelProps[];

  /**
   * {@link TabsRoot} に渡すプロパティーです。
   */
  readonly root: TabsRootProps;

  /**
   * 各 {@link TabsTab} に渡すプロパティーの一覧です。
   *
   * `items` の各項目に対応します。`children` にはタブのラベルが設定されています。
   */
  readonly tab: readonly TabsTabProps[];
};

/**
 * {@link Tabs} コンポーネントのプロパティーです。
 */
export type TabsProps = Omit<TabsRootProps, "children"> & {
  /**
   * タブとパネルの項目です。
   */
  items?: TabsItem[] | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   * `tab.children` を指定すると、すべてのタブのラベルより優先されます。
   */
  slotProps?: TabsSlotProps | undefined;
};

/**
 * {@link Tabs} の各パーツに渡すプロパティーを作るフックです。
 */
export function useTabs(props: TabsProps): TabsPartsProps {
  const { items, slotProps, ...rootProps } = props;
  const {
    list: listProps,
    tab: tabProps,
    indicator: indicatorProps,
    tabPanel: tabPanelProps,
  } = slotProps ?? {};
  const { children: tabChildren, ...otherTabProps } = tabProps ?? {};

  return {
    root: rootProps,
    list: items === undefined ? null : (listProps ?? {}),
    tab:
      items?.map((item) => ({
        ...otherTabProps,
        value: item.value,
        disabled: item.disabled,
        children: tabChildren ?? item.label,
      })) ?? [],
    panel:
      items?.map((item) => ({
        ...tabPanelProps,
        value: item.value,
        children: item.content,
      })) ?? [],
    indicator: indicatorProps ?? {},
  };
}

/**
 * Tab とパネルを切り替えるコンポーネントです。
 *
 * `items` から Tab の並びとパネルを組み立てます。
 * レイアウトを細かく制御する場合は、{@link TabsRoot|Root} と各パーツを直接組み立てます。
 */
export const Tabs: IComponent<TabsProps> = function SuiTabs(props) {
  const partsProps = useTabs(props);

  return (
    <TabsRoot {...partsProps.root}>
      {partsProps.list && (
        <>
          <TabsList {...partsProps.list}>
            {partsProps.tab.map((tabProps) => (
              <TabsTab key={String(tabProps.value)} {...tabProps} />
            ))}
            <TabsIndicator {...partsProps.indicator} />
          </TabsList>
          {partsProps.panel.map((panelProps) => (
            <TabsPanel key={String(panelProps.value)} {...panelProps} />
          ))}
        </>
      )}
    </TabsRoot>
  );
};

/**
 * {@link Tabs} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Tabs {
  /**
   * {@link TabsState} です。
   */
  export type State = TabsState;

  /**
   * {@link TabsProps} です。
   */
  export type Props = TabsProps;

  /**
   * {@link TabsSlotProps} です。
   */
  export type SlotProps = TabsSlotProps;

  /**
   * {@link TabsItem} です。
   */
  export type Item = TabsItem;

  /**
   * {@link TabsRadius} です。
   */
  export type Radius = TabsRadius;

  /**
   * {@link TabsSize} です。
   */
  export type Size = TabsSize;
}
