import type { BreadcrumbLinkProps } from "./breadcrumb.link.jsx";
import type { BreadcrumbRootItemObject } from "./breadcrumb.root.jsx";

/**
 * 項目オブジェクトを分解した結果です。
 */
export type BreadcrumbItemObjectDecomposition = Pick<BreadcrumbRootItemObject, "label"> & {
  /**
   * `BreadcrumbLink` に渡す props です。
   */
  readonly itemProps: Omit<BreadcrumbLinkProps, "children">;
};

/**
 * 項目オブジェクトをラベル、`BreadcrumbLink` に渡す props に分解する関数のインターフェースです。
 */
export interface IDecomposeBreadcrumbItemObject {
  /**
   * 項目オブジェクトをラベル、`BreadcrumbLink` に渡す props に分解します。
   *
   * @param item 分解する項目オブジェクトです。
   * @returns 分解したラベル、props です。
   */
  (item: BreadcrumbRootItemObject): BreadcrumbItemObjectDecomposition;
}

/**
 * 項目オブジェクトをラベル、`BreadcrumbLink` に渡す props に分解する関数です。
 */
export const decomposeBreadcrumbItemObject: IDecomposeBreadcrumbItemObject =
  function decomposeSuiBreadcrumbItemObject(item) {
    const { label, ...itemProps } = item;

    return {
      label,
      itemProps,
    };
  };

export { decomposeBreadcrumbItemObject as decomposeItemObject };
