import type { AccordionItemProps } from "./accordion.item.jsx";
import type { AccordionRootItemObject } from "./accordion.root.jsx";

/**
 * 項目オブジェクトを分解した結果です。
 */
export type AccordionItemObjectDecomposition = Pick<
  AccordionRootItemObject,
  "content" | "title"
> & {
  /**
   * `AccordionItem` に渡す props です。
   */
  readonly itemProps: AccordionItemProps;
};

/**
 * 項目オブジェクトをタイトル、内容、`AccordionItem` に渡す props に分解する関数のインターフェースです。
 */
export interface IDecomposeAccordionItemObject {
  /**
   * 項目オブジェクトをタイトル、内容、`AccordionItem` に渡す props に分解します。
   *
   * 項目オブジェクトの `htmlTitle` は `itemProps` の `title` に移し替えます。
   *
   * @param item 分解する項目オブジェクトです。
   * @returns 分解したタイトル、内容、props です。
   */
  (item: AccordionRootItemObject): AccordionItemObjectDecomposition;
}

/**
 * 項目オブジェクトをタイトル、内容、`AccordionItem` に渡す props に分解する関数です。
 */
export const decomposeAccordionItemObject: IDecomposeAccordionItemObject =
  function decomposeSuiAccordionItemObject(item) {
    const { title, content, htmlTitle, ...itemProps } = item;

    return {
      title,
      content,
      itemProps: {
        ...itemProps,
        title: htmlTitle,
      },
    };
  };

export { decomposeAccordionItemObject as decomposeItemObject };
