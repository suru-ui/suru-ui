import type { IComponent } from "../../types.js";
import {
  type TreeNode,
  type TreeRootSize,
  type TreeItemProps,
  type TreeRootProps,
  type TreeRootState,
  type TreeRootRadius,
  type TreeItemLabelProps,
  type TreeRootSelectionMode,
  type TreeItemIndicatorProps,
  TreeItem,
  TreeRoot,
  TreeItemLabel,
  TreeItemIndicator,
} from "./tree.parts.jsx";

/**
 * {@link TreeRootRadius} です。
 */
export type TreeRadius = TreeRootRadius;

/**
 * {@link TreeRootSelectionMode} です。
 */
export type TreeSelectionMode = TreeRootSelectionMode;

/**
 * {@link TreeRootSize} です。
 */
export type TreeSize = TreeRootSize;

/**
 * {@link Tree} の状態です。
 */
export type TreeState = TreeRootState;

/**
 * {@link Tree} の各パーツに渡すプロパティーです。
 */
export type TreeSlotProps = {
  /**
   * {@link TreeItemIndicator} に渡すプロパティーです。
   *
   * すべての項目のインジケーターに同じプロパティーが渡されます。`visible` は上書きされません。
   */
  readonly indicator?: Omit<TreeItemIndicatorProps, "visible"> | undefined;

  /**
   * {@link TreeItem} に渡すプロパティーです。
   *
   * すべての項目に同じプロパティーが渡されます。ツリーの構造に関わるプロパティーは上書きされません。
   */
  readonly item?:
    | Omit<TreeItemProps, "hasChildren" | "id" | "label" | "level" | "posInSet" | "setSize">
    | undefined;

  /**
   * {@link TreeItemLabel} に渡すプロパティーです。
   *
   * `children` は上書きされません。
   */
  readonly label?: Omit<TreeItemLabelProps, "children"> | undefined;
};

/**
 * 各ノードに対応するパーツのプロパティーです。
 */
export type TreeNodePartsProps = {
  /**
   * {@link TreeItemIndicator} に渡すプロパティーです。
   */
  readonly indicator: TreeItemIndicatorProps;

  /**
   * {@link TreeItem} に渡すプロパティーです。
   */
  readonly item: TreeItemProps;

  /**
   * {@link TreeItemLabel} に渡すプロパティーです。
   */
  readonly label: TreeItemLabelProps;
};

/**
 * {@link Tree} の各パーツに渡すプロパティーです。
 */
export type TreePartsProps = {
  /**
   * ノードに対応する各パーツのプロパティーを作る関数です。
   *
   * @param node 対応するノードです。
   * @param level ノードの深さです。ルートの直接の子が `1` です。
   * @param posInSet 同じ深さの中での位置です。1 起点です。
   * @param setSize 同じ深さの項目数です。
   */
  readonly getItemPartsProps: (
    node: Readonly<TreeNode>,
    level: number,
    posInSet: number,
    setSize: number,
  ) => TreeNodePartsProps;

  /**
   * {@link TreeRoot} に渡すプロパティーです。
   */
  readonly root: Omit<TreeRootProps, "children">;
};

/**
 * {@link Tree} コンポーネントのプロパティーです。
 */
export type TreeProps = Omit<TreeRootProps, "children"> & {
  /**
   * ツリーのノードデータを指定します。
   *
   * ノードから {@link TreeItem} を再帰的に描画します。手動で項目を組み立てるときは、{@link TreeParts.Root|Root} を直接使ってください。
   */
  data: readonly TreeNode[];

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * ツリーの構造に関わるプロパティーは、`data` から生成される値が優先されます。
   */
  slotProps?: TreeSlotProps | undefined;
};

/**
 * {@link Tree} の各パーツに渡すプロパティーを作るフックです。
 */
export function useTree(props: TreeProps): TreePartsProps {
  const {
    slotProps: { indicator: indicatorProps, item: itemProps, label: labelProps } = {},
    ...rootProps
  } = props;

  return {
    root: rootProps,

    getItemPartsProps(node, level, posInSet, setSize) {
      const hasChildren = node.children != null && node.children.length > 0;

      return {
        indicator: { ...indicatorProps, visible: hasChildren },
        item: {
          ...itemProps,
          disabled: node.disabled,
          hasChildren,
          id: node.id,
          label: node.label,
          level,
          posInSet,
          setSize,
        },
        label: { ...labelProps, children: node.label },
      };
    },
  };
}

/**
 * 階層的な項目の一覧を表示するツリーです。
 *
 * WAI-ARIA tree パターンに従い、キーボード操作と選択と展開の状態は {@link TreeRoot} が管理します。展開されているノードだけが描画されます。
 */
export const Tree: IComponent<TreeProps> = function SuiTree(props) {
  const partsProps = useTree(props);

  return (
    <TreeRoot {...partsProps.root}>
      {(node, level, posInSet, setSize) => {
        const itemPartsProps = partsProps.getItemPartsProps(node, level, posInSet, setSize);

        return (
          <TreeItem {...itemPartsProps.item}>
            <TreeItemIndicator {...itemPartsProps.indicator} />
            <TreeItemLabel {...itemPartsProps.label} />
          </TreeItem>
        );
      }}
    </TreeRoot>
  );
};

/**
 * {@link Tree} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Tree {
  /**
   * {@link TreeState} です。
   */
  export type State = TreeState;

  /**
   * {@link TreeProps} です。
   */
  export type Props = TreeProps;

  /**
   * {@link TreeSlotProps} です。
   */
  export type SlotProps = TreeSlotProps;

  /**
   * {@link TreeNode} です。
   */
  export type Node = TreeNode;

  /**
   * {@link TreeRadius} です。
   */
  export type Radius = TreeRadius;

  /**
   * {@link TreeSelectionMode} です。
   */
  export type SelectionMode = TreeSelectionMode;

  /**
   * {@link TreeSize} です。
   */
  export type Size = TreeSize;
}
