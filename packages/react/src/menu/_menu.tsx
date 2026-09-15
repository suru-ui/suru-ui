import type * as Button from "../button/button.parts.js";

/**
 * 項目がラベルを持つオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns ラベルを持つオブジェクトの場合に `true` を返します。
 */
export function isItemObject(item: unknown): item is {
  readonly label: unknown;
  readonly items?: readonly unknown[] | undefined;
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

/**
 * 項目がグループのオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns グループのオブジェクトの場合に `true` を返します。
 */
export function isGroupObject(item: unknown): item is {
  readonly items: readonly unknown[];
  readonly type: "group";
  readonly label?: unknown;
  readonly [key: string]: any;
} {
  return (
    typeof item === "object" &&
    item !== null &&
    "type" in item &&
    (item as { type: unknown }).type === "group" &&
    "items" in item &&
    Array.isArray((item as { items: unknown }).items)
  );
}

/**
 * 項目がリンク項目のオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns リンク項目のオブジェクトの場合に `true` を返します。
 */
export function isLinkItemObject(item: unknown): item is {
  readonly label: unknown;
  readonly type: "link";
  readonly [key: string]: any;
} {
  return isItemObject(item) && item.type === "link";
}

/**
 * 項目の状態に応じた外観を返します。
 *
 * チェックされている場合は指定された外観を返し、それ以外の場合は `"naked"` を返します。
 *
 * @param state 項目の状態です。
 * @param variant チェック状態のときの外観です。
 * @returns 適用する外観です。
 */
export function getItemVariant(state: object, variant: Button.Root.Variant): Button.Root.Variant {
  if ("checked" in state && state.checked === true) {
    return variant;
  }

  return "naked";
}
