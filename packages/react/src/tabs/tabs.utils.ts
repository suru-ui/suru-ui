import type { TabsRootItemObject } from "./tabs.root.jsx";
import type { TabsTabProps } from "./tabs.tab.jsx";

/**
 * 項目オブジェクトを分解した結果です。
 */
export type TabsItemObjectDecomposition = Pick<TabsRootItemObject, "content" | "label"> & {
  /**
   * `TabsTab` に渡す props です。
   */
  readonly itemProps: Omit<TabsTabProps, "children">;
};

/**
 * 項目オブジェクトをラベル、内容、`TabsTab` に渡す props に分解する関数のインターフェースです。
 */
export interface IDecomposeTabsItemObject {
  /**
   * 項目オブジェクトをラベル、内容、`TabsTab` に渡す props に分解します。
   *
   * @param item 分解する項目オブジェクトです。
   * @returns 分解したラベル、内容、props です。
   */
  (item: TabsRootItemObject): TabsItemObjectDecomposition;
}

/**
 * 項目オブジェクトをラベル、内容、`TabsTab` に渡す props に分解する関数です。
 */
export const decomposeTabsItemObject: IDecomposeTabsItemObject =
  function decomposeSuiTabsItemObject(item) {
    const { label, content, ...itemProps } = item;

    return {
      label,
      content,
      itemProps,
    };
  };

export { decomposeTabsItemObject as decomposeItemObject };
