import type { SegmentsItemProps } from "../item/segments.item.jsx";
import type { SegmentsRootItemObject } from "../root/segments.root.jsx";

/** 項目オブジェクトを分解した結果です。 */
export type SegmentsItemObjectDecomposition = Pick<SegmentsRootItemObject, "label"> & {
  /** `SegmentsItem` に渡す props です。 */
  readonly itemProps: Omit<SegmentsItemProps, "children">;
};

/** 項目オブジェクトをラベル、`SegmentsItem` に渡す props に分解する関数のインターフェースです。 */
export interface IDecomposeSegmentsItemObject {
  /**
   * 項目オブジェクトをラベル、`SegmentsItem` に渡す props に分解します。
   *
   * @param item 分解する項目オブジェクトです。
   *
   * @returns 分解したラベル、props です。
   */
  (item: SegmentsRootItemObject): SegmentsItemObjectDecomposition;
}

/** 項目オブジェクトをラベル、`SegmentsItem` に渡す props に分解する関数です。 */
export const decomposeSegmentsItemObject: IDecomposeSegmentsItemObject = (item) => {
  const { label, ...itemProps } = item;

  return {
    label,
    itemProps,
  };
};

export { decomposeSegmentsItemObject as decomposeItemObject };
