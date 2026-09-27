import * as React from "react";

import { getItemKey } from "../_item.js";
import mergeProps from "../_merge-props.js";
import type { IComponent } from "../types.js";
import {
  getTabsItemLabel,
  getTabsItemProps,
  createItemRenderer,
  getTabsItemContent,
} from "./_tabs.jsx";
import type { TabsContext } from "./tabs.context.js";
import {
  type TabsRootSize,
  type TabsTabProps,
  type TabsTabValue,
  type TabsListProps,
  type TabsRootProps,
  type TabsRootState,
  type TabsPanelProps,
  type TabsRootRadius,
  type TabsRootVariant,
  type TabsIndicatorProps,
  type TabsRootItemObject,
  type TabsRootOrientation,
  type ITabsRootItemRenderer,
  type TabsRootActiveVariant,
  type TabsRootChangeEventReason,
  type TabsRootChangeEventDetails,
  TabsTab,
  TabsList,
  TabsRoot,
  TabsPanel,
  TabsIndicator,
} from "./tabs.parts.js";

// Types
// -----

export type TabsActiveVariant = TabsRootActiveVariant;

export type TabsChangeEventDetails = TabsRootChangeEventDetails;

export type TabsChangeEventReason = TabsRootChangeEventReason;

export type TabsItemObject = TabsRootItemObject;

export type ITabsItemRenderer<TItem = any> = ITabsRootItemRenderer<TItem>;

export type TabsOrientation = TabsRootOrientation;

export type TabsRadius = TabsRootRadius;

export type TabsSize = TabsRootSize;

export type TabsValue = TabsTabValue;

export type TabsVariant = TabsRootVariant;

/**
 * {@link Tabs} が持つ状態です。
 */
export type TabsState = TabsRootState;

/**
 * {@link Tabs} の各パーツに渡す props です。
 */
export type TabsSlotProps = {
  /**
   * {@link TabsIndicator} に渡す props です。
   */
  readonly indicator?: TabsIndicatorProps | undefined;

  /**
   * {@link TabsList} に渡す props です。
   *
   * `children` は上書きされます。
   */
  readonly list?: Omit<TabsListProps, "children"> | undefined;

  /**
   * {@link TabsPanel} に渡す props です。
   *
   * すべてのパネルに同じ props が渡されます。`children` と `value` は上書きされます。
   */
  readonly panel?: Omit<TabsPanelProps, "children" | "value"> | undefined;

  /**
   * {@link TabsTab} に渡す props です。
   *
   * すべてのタブに同じ props が渡されます。`children` と `value` は上書きされます。
   */
  readonly tab?: Omit<TabsTabProps, "children" | "value"> | undefined;
};

namespace TabsProps {
  export type Root<TItem = any> = Omit<TabsRootProps<TItem>, "children" | keyof Tabs>;

  export type Tabs = {
    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: TabsSlotProps | undefined;
  };
}

/**
 * {@link Tabs} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type TabsProps<TItem = any> = TabsProps.Tabs & TabsProps.Root<TItem>;

// API
// ---

/**
 * {@link Tabs} を構成する各パーツの props などを作成するための API です。
 *
 * @template TItem 項目の型です。
 */
export class TabsAPI<TItem = any> {
  private readonly rootProps: TabsProps.Root<TItem>;

  private readonly slotProps: TabsSlotProps;

  /**
   * @param props {@link Tabs} の props です。
   * @internal
   */
  public constructor(props: TabsProps<TItem>) {
    const { slotProps = {}, ...rootProps } = props;
    this.rootProps = rootProps;
    this.slotProps = slotProps;
  }

  private readonly defaultItemRenderer: ITabsItemRenderer<TItem> = createItemRenderer<TItem>(
    (item) => this.getTabProps(item),
    (item) => this.getLabel(item),
  );

  /**
   * {@link TabsIndicator} に渡す props を取得します。
   */
  public getIndicatorProps(): TabsIndicatorProps {
    const { indicator: props = {} } = this.slotProps;

    return props;
  }

  /**
   * 項目のラベルを取得します。
   *
   * @param item 項目です。
   */
  public getLabel(item: TItem): React.ReactNode {
    return getTabsItemLabel(item);
  }

  /**
   * {@link TabsList} に渡す props を取得します。
   */
  public getListProps(): Omit<TabsListProps<TItem>, "children"> & {
    children: React.ReactNode;
  } {
    const { list: props = {} } = this.slotProps;
    const { items = [] } = this.rootProps;

    return {
      ...props,
      children: (
        <>
          {items.map(this.defaultItemRenderer)}
          <TabsIndicator {...this.getIndicatorProps()} />
        </>
      ),
    };
  }

  /**
   * 各 {@link TabsPanel} に渡す props の一覧を取得します。
   *
   * 内容のない項目に対応するパネルは含まれません。
   */
  public getPanelPropsList(): TabsPanelProps[] {
    const { panel: props = {} } = this.slotProps;
    const { items = [] } = this.rootProps;
    const panelPropsList: TabsPanelProps[] = [];

    for (const item of items) {
      const children = getTabsItemContent(item);
      if (children === undefined) {
        continue;
      }

      panelPropsList.push({
        ...props,
        value: getTabsItemProps(item).value,
        children,
      });
    }

    return panelPropsList;
  }

  /**
   * {@link TabsRoot} に渡す props を取得します。
   */
  public getRootProps(): TabsProps.Root<TItem> {
    return this.rootProps;
  }

  /**
   * {@link TabsTab} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getTabProps(item: TItem): Omit<TabsTabProps, "children"> {
    const { tab: props = {} } = this.slotProps;
    const itemProps = getTabsItemProps(item);

    return mergeProps<typeof TabsTab>([{ ...props, value: itemProps.value }, itemProps]);
  }
}

export interface IUseTabsAPI {
  /**
   * {@link TabsAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @param props {@link Tabs} の props です。
   * @returns タブの API です。
   */
  <TItem = any>(props: TabsProps<TItem>): TabsAPI<TItem>;
}

/**
 * {@link TabsAPI} を作成するフックです。
 */
export const useTabsAPI: IUseTabsAPI = function useSuiTabsAPI(props) {
  return new TabsAPI(props);
};

export { TabsAPI as API, useTabsAPI as useAPI };

// Component
// ---------

export interface ITabs extends IComponent<TabsProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: TabsProps<TItem>): IComponent.Return;
}

/**
 * タブとパネルを切り替えるコンポーネントです。
 *
 * `items` からタブの並びとパネルを組み立てます。
 * 矢印キーでタブ間を移動でき、`Enter` または `Space` で選択します。
 * レイアウトを細かく制御する場合は、`Root` と各パーツを直接組み立てます。
 */
export const Tabs: ITabs = function SuiTabs(props: TabsProps) {
  const api = useTabsAPI(props);
  const panelPropsList = api.getPanelPropsList();

  return (
    <TabsRoot {...api.getRootProps()}>
      <TabsList {...api.getListProps()} />
      {panelPropsList.map((panelProps, index) => (
        <TabsPanel key={getItemKey(panelProps.value) ?? index} {...panelProps} />
      ))}
    </TabsRoot>
  );
};

export namespace Tabs {
  export type State = TabsState;

  export type Props<TItem = any> = TabsProps<TItem>;

  export type SlotProps = TabsSlotProps;

  export type Context<TItem = any> = TabsContext<TItem>;

  export type ActiveVariant = TabsActiveVariant;

  export type ChangeEventDetails = TabsChangeEventDetails;

  export type ChangeEventReason = TabsChangeEventReason;

  export type IItemRenderer<TItem = any> = ITabsItemRenderer<TItem>;

  export type ItemObject = TabsItemObject;

  export type Orientation = TabsOrientation;

  export type Radius = TabsRadius;

  export type Size = TabsSize;

  export type Value = TabsValue;

  export type Variant = TabsVariant;
}
