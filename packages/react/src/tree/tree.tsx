import * as React from "react";

import { getItemKey } from "../_item.js";
import mergeProps from "../_merge-props.js";
import toReactNode from "../_to-react-node.js";
import type { IComponent } from "../types.js";
import { isItemObject } from "./_tree.jsx";
import type { TreeContext } from "./tree.context.js";
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

/**
 * {@link Tree} が持つ状態です。
 */
export type TreeState = TreeRootState;

export type TreeVariant = TreeRootVariant;

/**
 * {@link Tree} の各パーツに渡す props です。
 */
export type TreeSlotProps = {
  /**
   * {@link TreeItemIndicator} に渡す props です。
   *
   * すべての項目のインジケーターに同じ props が渡されます。`visible` は項目から組み立てるため指定できません。
   */
  readonly indicator?: Omit<TreeItemIndicatorProps, "visible"> | undefined;

  /**
   * {@link TreeItem} に渡す props です。
   *
   * すべての項目に同じ props が渡されます。`children` とツリーの構造に関わる props は項目から組み立てるため指定できません。
   */
  readonly item?:
    | Omit<TreeItemProps, "children" | "hasItems" | "id" | "level" | "posInSet" | "setSize">
    | undefined;
};

namespace TreeProps {
  export type Root = Omit<TreeRootProps, keyof Tree>;

  export type Tree = {
    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: TreeSlotProps | undefined;
  };
}

/**
 * {@link Tree} に渡す props です。
 */
export type TreeProps = TreeProps.Tree & TreeProps.Root;

// API
// ---

/**
 * {@link Tree} を構成する各パーツの props などを作成するための API です。
 */
export class TreeAPI {
  private readonly rootProps: TreeProps.Root;

  private readonly slotProps: TreeSlotProps;

  /**
   * @param props {@link Tree} の props です。
   * @internal
   */
  public constructor(props: TreeProps) {
    const { slotProps = {}, ...rootProps } = props;
    this.rootProps = rootProps;
    this.slotProps = slotProps;
  }

  private readonly defaultItemRenderer: ITreeItemRenderer = (node, level, posInSet, setSize) => {
    switch (true) {
      case isItemObject(node):
        return (
          <TreeItem
            key={getItemKey(node) ?? node.id}
            {...this.getItemProps(node, level, posInSet, setSize)}
          >
            <TreeItemIndicator {...this.getIndicatorProps(node)} />
            {this.getItemLabel(node)}
          </TreeItem>
        );

      default:
        return (
          <React.Fragment key={getItemKey(node) ?? posInSet}>{toReactNode(node)}</React.Fragment>
        );
    }
  };

  /**
   * {@link TreeItemIndicator} に渡す props を取得します。
   *
   * @param node 描画対象のノードです。
   */
  public getIndicatorProps(node: Readonly<TreeItemObject>): TreeItemIndicatorProps {
    const { indicator: props = {} } = this.slotProps;
    const hasItems = node.items != null && node.items.length > 0;

    return {
      ...props,
      visible: hasItems,
    };
  }

  /**
   * ノードのラベルを取得します。
   *
   * @param node 描画対象のノードです。
   */
  public getItemLabel(node: Readonly<TreeItemObject>): React.ReactNode {
    return toReactNode(node.label);
  }

  /**
   * {@link TreeItem} に渡す props を取得します。
   *
   * @param node 描画対象のノードです。
   * @param level ノードの深さです。ルートの直接の子が `1` です。
   * @param posInSet 同じ深さの中での位置です。1 起点です。
   * @param setSize 同じ深さの項目数です。
   */
  public getItemProps(
    node: Readonly<TreeItemObject>,
    level: number,
    posInSet: number,
    setSize: number,
  ): Omit<TreeItemProps, "children"> {
    const { item: props = {} } = this.slotProps;
    const { id, items, label: _label, disabled, ...otherNodeProps } = node;
    const hasItems = items != null && items.length > 0;

    return {
      ...mergeProps([props, otherNodeProps, { disabled: disabled || props.disabled, hasItems }]),
      id,
      level,
      setSize,
      posInSet,
    };
  }

  /**
   * {@link TreeRoot} に渡す props を取得します。
   */
  public getRootProps(): TreeRootProps {
    const { children = this.defaultItemRenderer, ...otherProps } = this.rootProps;

    return {
      ...otherProps,
      children,
    };
  }
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
  return new TreeAPI(props);
};

export { TreeAPI as API, useTreeAPI as useAPI };

// Component
// ---------

/**
 * 階層的な項目の一覧を表示するツリーです。
 *
 * WAI-ARIA tree パターンに従い、キーボード操作と選択と展開の状態は {@link TreeRoot} が管理します。展開されているノードだけが描画されます。
 */
export const Tree: IComponent<TreeProps> = function SuiTree(props) {
  const api = useTreeAPI(props);

  return <TreeRoot {...api.getRootProps()} />;
};

export namespace Tree {
  export type State = TreeState;

  export type Props = TreeProps;

  export type SlotProps = TreeSlotProps;

  export type Context = TreeContext;

  export type Color = TreeColor;

  export type ItemObject = TreeItemObject;

  export interface IItemRenderer extends ITreeItemRenderer {}

  export type Radius = TreeRadius;

  export type Size = TreeSize;

  export type Variant = TreeVariant;
}
