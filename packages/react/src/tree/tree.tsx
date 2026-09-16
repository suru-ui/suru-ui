import * as React from "react";

import type { LikelyVisibleNode } from "../_is-likely-visible-node.js";
import toReactNode from "../_to-react-node.js";
import type { IComponent } from "../types.js";
import {
  type TreeRootSize,
  type TreeItemProps,
  type TreeRootColor,
  type TreeRootProps,
  type TreeRootState,
  type TreeRootRadius,
  type TreeRootVariant,
  type TreeRootItemObject,
  type ITreeRootItemRenderer,
  type TreeItemIndicatorProps,
  TreeItem,
  TreeRoot,
  TreeItemIndicator,
} from "./tree.parts.js";

// Types
// -----

export type TreeColor = TreeRootColor;

export type TreeItemObject = TreeRootItemObject;

export interface ITreeItemRenderer extends ITreeRootItemRenderer {}

export type TreeRadius = TreeRootRadius;

export type TreeSize = TreeRootSize;

export type TreeVariant = TreeRootVariant;

/**
 * {@link Tree} が持つ状態です。
 */
export type TreeState = TreeRootState;

/**
 * {@link Tree} の各パーツに渡す props です。
 */
export type TreeSlotProps = {
  /**
   * {@link TreeItemIndicator} に渡す props です。
   *
   * すべての項目のインジケーターに同じ props が渡されます。`visible` は上書きされません。
   */
  readonly indicator?: Omit<TreeItemIndicatorProps, "visible"> | undefined;

  /**
   * {@link TreeItem} に渡す props です。
   *
   * すべての項目に同じ props が渡されます。ツリーの構造に関わる props は上書きされません。
   */
  readonly item?:
    | Omit<
        TreeItemProps,
        "children" | "hasItems" | "id" | "label" | "level" | "posInSet" | "setSize"
      >
    | undefined;
};

/**
 * {@link Tree} に渡す props です。
 */
export type TreeProps = Omit<TreeRootProps, "children" | "items"> &
  Pick<TreeRootProps, "children"> & {
    /**
     * ツリーの項目です。
     *
     * ノードから {@link TreeItem} を再帰的に描画します。手動で項目を組み立てるときは、{@link TreeRoot} を直接使ってください。
     */
    items: readonly TreeItemObject[];

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: TreeSlotProps | undefined;
  };

// API
// ---

/**
 * {@link Tree} を構成する各パーツの props などを作成するための API です。
 */
export interface TreeAPI {
  /**
   * {@link TreeItemIndicator} に渡す props を取得します。
   *
   * @param node 描画対象のノードです。
   */
  getIndicatorProps(node: Readonly<TreeItemObject>): TreeItemIndicatorProps;

  /**
   * ノードのラベルを取得します。
   *
   * @param node 描画対象のノードです。
   */
  getItemLabel(node: Readonly<TreeItemObject>): React.ReactNode;

  /**
   * {@link TreeItem} に渡す props を取得します。
   *
   * @param node 描画対象のノードです。
   * @param level ノードの深さです。ルートの直接の子が `1` です。
   * @param posInSet 同じ深さの中での位置です。1 起点です。
   * @param setSize 同じ深さの項目数です。
   */
  getItemProps(
    node: Readonly<TreeItemObject>,
    level: number,
    posInSet: number,
    setSize: number,
  ): Omit<TreeItemProps, "children">;

  /**
   * {@link TreeRoot} に渡す props を取得します。
   *
   * 関数を指定した場合はそのまま渡し、{@link TreeRoot} が表示中のノードへ適用します。
   */
  getRootProps(): Omit<TreeRootProps, "children"> & {
    children: LikelyVisibleNode | ITreeRootItemRenderer | undefined;
  };
}

interface IUseTreeAPI {
  /**
   * {@link TreeAPI} を作成します。
   *
   * @param props {@link Tree} の props です。
   * @returns ツリーの API です
   */
  (props: TreeProps): TreeAPI;
}

/**
 * {@link TreeAPI} を作成するフックです。
 */
export const useTreeAPI: IUseTreeAPI = function useSuiTreeAPI(props) {
  const {
    items,
    children,
    slotProps: { item: itemProps = {}, indicator: indicatorProps = {} } = {},
    ...otherRootProps
  } = props;

  return {
    getItemLabel(node) {
      return node.label;
    },
    getItemProps(node, level, posInSet, setSize) {
      const { id, items, label, ...otherNodeProps } = node;
      const hasItems = items != null && items.length > 0;

      return {
        ...itemProps,
        ...otherNodeProps,
        id,
        label,
        level,
        setSize,
        disabled: node.disabled || itemProps.disabled,
        hasItems,
        posInSet,
      };
    },
    getRootProps() {
      return {
        ...otherRootProps,
        items,
        children: typeof children === "function" ? children : toReactNode(children),
      };
    },
    getIndicatorProps(node) {
      const hasItems = node.items != null && node.items.length > 0;

      return {
        ...indicatorProps,
        visible: hasItems,
      };
    },
  };
};

export { type TreeAPI as API, useTreeAPI as useAPI };

// Component
// ---------

/**
 * 階層的な項目の一覧を表示するツリーです。
 *
 * WAI-ARIA tree パターンに従い、キーボード操作と選択と展開の状態は {@link TreeRoot} が管理します。展開されているノードだけが描画されます。
 */
export const Tree: IComponent<TreeProps> = function SuiTree(props) {
  const api = useTreeAPI(props);
  const rootProps = api.getRootProps();

  return (
    <TreeRoot {...rootProps}>
      {rootProps.children ??
        ((node, level, posInSet, setSize) => (
          <TreeItem key={node.id} {...api.getItemProps(node, level, posInSet, setSize)}>
            <TreeItemIndicator {...api.getIndicatorProps(node)} />
            {api.getItemLabel(node)}
          </TreeItem>
        ))}
    </TreeRoot>
  );
};

export namespace Tree {
  export type State = TreeState;

  export type Props = TreeProps;

  export type SlotProps = TreeSlotProps;

  export type Color = TreeColor;

  export type ItemObject = TreeItemObject;

  export interface IItemRenderer extends ITreeItemRenderer {}

  export type Radius = TreeRadius;

  export type Size = TreeSize;

  export type Variant = TreeVariant;
}
