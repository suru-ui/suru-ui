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
  type TabsRootVariant,
  type TabsIndicatorProps,
  type TabsRootOrientation,
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

export type TabsRadius = TabsRootRadius;

export type TabsSize = TabsRootSize;

export type TabsVariant = TabsRootVariant;

export type TabsActiveVariant = TabsRootActiveVariant;

export type TabsOrientation = TabsRootOrientation;

export type TabsValue = TabsTabValue;

export type TabsChangeEventDetails = TabsRootChangeEventDetails;

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
   * タブに表示するラベルです。
   */
  readonly label: React.ReactNode;

  /**
   * タブの値です。
   */
  readonly value: TabsTabProps["value"];

  /**
   * タブに対応するパネルに表示する内容です。
   *
   * 省略するとその項目のパネルは作られません。
   */
  readonly content?: React.ReactNode | undefined;

  /**
   * タブを無効にするかどうかを指定します。
   *
   * @default false
   */
  readonly disabled?: boolean | undefined;
};

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
   * すべてのタブに同じ props が渡されます。`children` と `disabled` と `value` は上書きされます。
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
   *
   * 内容のない項目に対応するパネルは含まれません。
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
      const panelPropsList: TabsPanelProps[] = [];

      for (const item of items ?? []) {
        const children = toReactNode(item.content);
        if (children === undefined) {
          continue;
        }

        panelPropsList.push({ ...panelProps, value: item.value, children });
      }

      return panelPropsList;
    },
  };
};

export { type TabsAPI as API, useTabsAPI as useAPI };

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
              <TabsTab key={getTabsItemKey(tabProps.value, index)} {...tabProps} />
            ))}
            <TabsIndicator {...api.getIndicatorProps()} />
          </TabsList>
          {api.getPanelPropsList().map((panelProps, index) => (
            <TabsPanel key={getTabsItemKey(panelProps.value, index)} {...panelProps} />
          ))}
        </>
      )}
    </TabsRoot>
  );
};

/**
 * 反復描画の要素に付けるキーを求めます。
 *
 * 値が文字列または数値の場合はそのまま使い、それ以外の場合はインデックスを使います。
 *
 * @param value 項目の値です。
 * @param index 項目のインデックスです。
 * @returns キーに使う値です。
 */
function getTabsItemKey(value: unknown, index: number): React.Key {
  return typeof value === "string" || typeof value === "number" ? value : index;
}

export namespace Tabs {
  export type State = TabsState;

  export type Props = TabsProps;

  export type SlotProps = TabsSlotProps;

  export type ActiveVariant = TabsActiveVariant;

  export type ChangeEventDetails = TabsChangeEventDetails;

  export type ChangeEventReason = TabsChangeEventReason;

  export type ItemObject = TabsItemObject;

  export type Orientation = TabsOrientation;

  export type Radius = TabsRadius;

  export type Size = TabsSize;

  export type Value = TabsValue;

  export type Variant = TabsVariant;
}
