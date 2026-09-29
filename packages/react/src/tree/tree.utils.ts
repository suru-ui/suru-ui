import type { TreeItemProps } from "./tree.item.jsx";
import type { TreeRootItemObject } from "./tree.root.jsx";

/**
 * 項目オブジェクトを分解した結果です。
 */
export type TreeItemObjectDecomposition = Pick<TreeRootItemObject, "id" | "items" | "label"> & {
  /**
   * `TreeItem` に渡す props です。
   */
  readonly itemProps: Omit<
    TreeItemProps,
    "children" | "hasItems" | "id" | "level" | "posInSet" | "setSize"
  >;
};

/**
 * 項目オブジェクトを識別子、子ノード、ラベル、`TreeItem` に渡す props に分解する関数のインターフェースです。
 */
export interface IDecomposeTreeItemObject {
  /**
   * 項目オブジェクトを識別子、子ノード、ラベル、`TreeItem` に渡す props に分解します。
   *
   * `id` は識別子、`items` は子ノード、`label` は表示に使います。
   *
   * @param item 分解する項目オブジェクトです。
   * @returns 分解した識別子、子ノード、ラベル、props です。
   */
  (item: TreeRootItemObject): TreeItemObjectDecomposition;
}

/**
 * 項目オブジェクトを識別子、子ノード、ラベル、`TreeItem` に渡す props に分解する関数です。
 */
export const decomposeTreeItemObject: IDecomposeTreeItemObject =
  function decomposeSuiTreeItemObject(item) {
    const { id, items, label, ...itemProps } = item;

    return {
      id,
      items,
      label,
      itemProps,
    };
  };

export { decomposeTreeItemObject as decomposeItemObject };
