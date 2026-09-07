/**
 * 項目が `label` を持つオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns `label` を持つオブジェクトの場合に `true` を返します。
 */
export function isItemObject(item: unknown): item is {
  readonly label: unknown;
  readonly [key: string]: any;
} {
  return typeof item === "object" && item !== null && "label" in item;
}
