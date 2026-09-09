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
  type TreeRootSelectionMode,
  type TreeItemIndicatorProps,
  TreeItem,
  TreeRoot,
  TreeItemIndicator,
} from "./tree.parts.jsx";

// Types
// -----

/**
 * {@link TreeRootColor}
 */
export type TreeColor = TreeRootColor;

/**
 * {@link TreeRootItemObject}
 */
export type TreeItemObject = TreeRootItemObject;

/**
 * {@link ITreeRootItemRenderer}
 */
export interface ITreeItemRenderer extends ITreeRootItemRenderer {}

/**
 * {@link TreeRootRadius}
 */
export type TreeRadius = TreeRootRadius;

/**
 * {@link TreeRootSelectionMode}
 */
export type TreeSelectionMode = TreeRootSelectionMode;

/**
 * {@link TreeRootSize}
 */
export type TreeSize = TreeRootSize;

/**
 * {@link TreeRootVariant}
 */
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
    | Omit<TreeItemProps, "hasChildren" | "id" | "label" | "level" | "posInSet" | "setSize">
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
    children: LikelyVisibleNode | ITreeRootItemRenderer | null;
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
      const hasChildren = node.children != null && node.children.length > 0;

      return {
        ...itemProps,
        id: node.id,
        label: node.label,
        level,
        setSize,
        disabled: node.disabled || itemProps.disabled,
        posInSet,
        hasChildren,
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
      const hasChildren = node.children != null && node.children.length > 0;

      return {
        ...indicatorProps,
        visible: hasChildren,
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
  /**
   * {@link TreeState}
   */
  export type State = TreeState;

  /**
   * {@link TreeProps}
   */
  export type Props = TreeProps;

  /**
   * {@link TreeSlotProps}
   */
  export type SlotProps = TreeSlotProps;

  /**
   * {@link TreeColor}
   */
  export type Color = TreeColor;

  /**
   * {@link TreeItemObject}
   */
  export type ItemObject = TreeItemObject;

  /**
   * {@link ITreeItemRenderer}
   */
  export interface IItemRenderer extends ITreeItemRenderer {}

  /**
   * {@link TreeRadius}
   */
  export type Radius = TreeRadius;

  /**
   * {@link TreeSelectionMode}
   */
  export type SelectionMode = TreeSelectionMode;

  /**
   * {@link TreeSize}
   */
  export type Size = TreeSize;

  /**
   * {@link TreeVariant}
   */
  export type Variant = TreeVariant;
}
