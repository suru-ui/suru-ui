import type { IComponent } from "../types.js";

/**
 * 項目オブジェクトの値を推論します。
 *
 * @template TItem 項目の型です。
 */
export type $InferItemValue<TItem> = TItem extends {
  content: any;
  title: any;
  value?: infer TItemValue;
}
  ? TItemValue
  : any;

/**
 * 項目が `title` と `content` を持つオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns `title` と `content` を持つオブジェクトの場合に `true` を返します。
 */
export function isItemObject(item: unknown): item is {
  readonly content: unknown;
  readonly title: unknown;
  readonly [key: string]: any;
} {
  return typeof item === "object" && item !== null && "title" in item && "content" in item;
}

/**
 * アコーディオンの開閉状態を示す既定の矢印アイコンです。
 */
export const ChevronIcon: IComponent = function SuiChevronIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
