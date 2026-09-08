import * as React from "react";

import toReactNode from "../_to-react-node.js";
import type { IComponent } from "../types.js";
import {
  type TabsRootSize,
  type TabsTabProps,
  type TabsTabValue,
  type TabsListProps,
  type TabsRootProps,
  type TabsRootState,
  type TabsPanelProps,
  type TabsRootRadius,
  type TabsIndicatorProps,
  type TabsRootOrientation,
  type TabsRootChangeEventReason,
  type TabsRootChangeEventDetails,
  TabsTab,
  TabsList,
  TabsRoot,
  TabsPanel,
  TabsIndicator,
} from "./tabs.parts.jsx";

// Types
// -----

/**
 * {@link TabsRootRadius}
 */
export type TabsRadius = TabsRootRadius;

/**
 * {@link TabsRootSize}
 */
export type TabsSize = TabsRootSize;

/**
 * {@link TabsRootOrientation}
 */
export type TabsOrientation = TabsRootOrientation;

/**
 * {@link TabsTabValue}
 */
export type TabsValue = TabsTabValue;

/**
 * {@link TabsRootChangeEventDetails}
 */
export type TabsChangeEventDetails = TabsRootChangeEventDetails;

/**
 * {@link TabsRootChangeEventReason}
 */
export type TabsChangeEventReason = TabsRootChangeEventReason;

/**
 * {@link Tabs} が持つ状態です。
 */
export type TabsState = TabsRootState;

/**
 * {@link Tabs} の1つのタブとパネルを表す項目オブジェクトです。
 */
export type TabsItemObject = {
  /**
   * タブに対応するパネルに表示する内容です。
   */
  readonly content?: React.ReactNode | undefined;

  /**
   * タブを無効にするかどうかを指定します。
   *
   * @default false
   */
  readonly disabled?: boolean | undefined;

  /**
   * タブに表示するラベルです。
   */
  readonly label: React.ReactNode;

  /**
   * タブの値です。
   */
  readonly value: TabsTabProps["value"];
};

/**
 * {@link TabsItemObject}
 */
export type TabsItem = TabsItemObject;

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
   * すべてのパネルに同じ props が渡されます。`children` と `value` は上書きされません。
   */
  readonly panel?: Omit<TabsPanelProps, "children" | "value"> | undefined;

  /**
   * {@link TabsTab} に渡す props です。
   *
   * すべてのタブに同じ props が渡されます。`children` と `disabled` と `value` は上書きされません。
   */
  readonly tab?: Omit<TabsTabProps, "children" | "disabled" | "value"> | undefined;
};

/**
 * {@link Tabs} に渡す props です。
 *
 * `value` を指定すると制御コンポーネントになり、`defaultValue` を指定すると非制御コンポーネントになります。
 */
export type TabsProps = Omit<TabsRootProps, "children"> & {
  /**
   * タブとパネルの項目です。
   */
  items?: readonly TabsItemObject[] | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  slotProps?: TabsSlotProps | undefined;
};

// API
// ---

/**
 * {@link Tabs} を構成する各パーツの props を作成するための API です。
 */
export interface TabsAPI {
  /**
   * {@link TabsIndicator} に渡す props を取得します。
   */
  getIndicatorProps(): TabsIndicatorProps;

  /**
   * {@link TabsList} に渡す props を取得します。
   */
  getListProps(): Omit<TabsListProps, "children"> | null;

  /**
   * 各 {@link TabsPanel} に渡す props の一覧を取得します。
   */
  getPanelPropsList(): TabsPanelProps[];

  /**
   * {@link TabsRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<TabsRootProps, "children">;

  /**
   * 各 {@link TabsTab} に渡す props の一覧を取得します。
   */
  getTabPropsList(): TabsTabProps[];
}

interface IUseTabsAPI {
  /**
   * {@link TabsAPI} を作成します。
   *
   * @param props {@link Tabs} の props です。
   * @returns タブの API です
   */
  (props: TabsProps): TabsAPI;
}

/**
 * {@link TabsAPI} を作成するフックです。
 */
export const useTabsAPI: IUseTabsAPI = function useSuiTabsAPI(props) {
  const {
    items,
    slotProps: {
      tab: tabProps = {},
      list: listProps = {},
      panel: panelProps = {},
      indicator: indicatorProps = {},
    } = {},
    ...otherRootProps
  } = props;

  return {
    getListProps() {
      if (items === undefined) {
        return null;
      }

      return listProps;
    },
    getRootProps() {
      return otherRootProps;
    },
    getTabPropsList() {
      return (
        items?.map((item) => ({
          ...tabProps,
          value: item.value,
          children: toReactNode(item.label),
          disabled: item.disabled,
        })) ?? []
      );
    },
    getIndicatorProps() {
      return indicatorProps;
    },
    getPanelPropsList() {
      return (
        items?.map((item) => ({
          ...panelProps,
          value: item.value,
          children: toReactNode(item.content),
        })) ?? []
      );
    },
  };
};

export { type TabsAPI as API, useTabsAPI as useAPI };

/**
 * {@link useTabsAPI}
 */
export const useTabs = useTabsAPI;

// Component
// ---------

/**
 * タブとパネルを切り替えるコンポーネントです。
 *
 * `items` からタブの並びとパネルを組み立てます。
 * 矢印キーでタブ間を移動でき、`Enter` または `Space` で選択します。
 * レイアウトを細かく制御する場合は、`Root` と各パーツを直接組み立てます。
 */
export const Tabs: IComponent<TabsProps> = function SuiTabs(props) {
  const api = useTabsAPI(props);
  const listProps = api.getListProps();

  return (
    <TabsRoot {...api.getRootProps()}>
      {listProps && (
        <>
          <TabsList {...listProps}>
            {api.getTabPropsList().map((tabProps, index) => (
              <TabsTab key={index} {...tabProps} />
            ))}
            <TabsIndicator {...api.getIndicatorProps()} />
          </TabsList>
          {api.getPanelPropsList().map((panelProps, index) => (
            <TabsPanel key={index} {...panelProps} />
          ))}
        </>
      )}
    </TabsRoot>
  );
};

export namespace Tabs {
  /**
   * {@link TabsState}
   */
  export type State = TabsState;

  /**
   * {@link TabsProps}
   */
  export type Props = TabsProps;

  /**
   * {@link TabsSlotProps}
   */
  export type SlotProps = TabsSlotProps;

  /**
   * {@link TabsChangeEventDetails}
   */
  export type ChangeEventDetails = TabsChangeEventDetails;

  /**
   * {@link TabsChangeEventReason}
   */
  export type ChangeEventReason = TabsChangeEventReason;

  /**
   * {@link TabsItem}
   */
  export type Item = TabsItem;

  /**
   * {@link TabsItemObject}
   */
  export type ItemObject = TabsItemObject;

  /**
   * {@link TabsOrientation}
   */
  export type Orientation = TabsOrientation;

  /**
   * {@link TabsRadius}
   */
  export type Radius = TabsRadius;

  /**
   * {@link TabsSize}
   */
  export type Size = TabsSize;

  /**
   * {@link TabsValue}
   */
  export type Value = TabsValue;
}
