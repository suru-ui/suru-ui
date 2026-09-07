/**
 * 項目がラベルを持つオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns ラベルを持つオブジェクトの場合に `true` を返します。
 */
export function isItemObject(item: unknown): item is {
  readonly items?: readonly unknown[] | undefined;
  readonly label: unknown;
  readonly type?: string | undefined;
  readonly [key: string]: any;
} {
  return typeof item === "object" && item !== null && "label" in item;
}

/**
 * 項目がチェックボックス項目のオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns チェックボックス項目のオブジェクトの場合に `true` を返します。
 */
export function isCheckboxItemObject(item: unknown): item is {
  readonly label: unknown;
  readonly type: "checkbox";
  readonly [key: string]: any;
} {
  return isItemObject(item) && item.type === "checkbox";
}

/**
 * 項目がラジオ項目のオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns ラジオ項目のオブジェクトの場合に `true` を返します。
 */
export function isRadioItemObject(item: unknown): item is {
  readonly label: unknown;
  readonly type: "radio";
  readonly value: unknown;
  readonly [key: string]: any;
} {
  return isItemObject(item) && item.type === "radio";
}

/**
 * 項目がラジオグループのオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns ラジオグループのオブジェクトの場合に `true` を返します。
 */
export function isRadioGroupObject(item: unknown): item is {
  readonly items: readonly unknown[];
  readonly type: "radio-group";
  readonly [key: string]: any;
} {
  return (
    typeof item === "object" &&
    item !== null &&
    "type" in item &&
    (item as { type: unknown }).type === "radio-group" &&
    "items" in item &&
    Array.isArray((item as { items: unknown }).items)
  );
}

/**
 * 項目が区切り線のオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns 区切り線のオブジェクトの場合に `true` を返します。
 */
export function isSeparatorObject(item: unknown): item is {
  readonly type: "separator";
  readonly [key: string]: any;
} {
  return (
    typeof item === "object" &&
    item !== null &&
    "type" in item &&
    (item as { type: unknown }).type === "separator"
  );
}
