import type * as React from "react";

/**
 * ラベルと値を両方持つ項目かどうかを判定する型ガードです。
 */
export function isLabeledItem<Value>(
  item: unknown,
): item is { readonly label: React.ReactNode; readonly value: Value } {
  return typeof item === "object" && item !== null && "value" in item && "label" in item;
}

/**
 * 項目の表示ラベルを解決します。
 *
 * `itemToStringLabel` を指定した場合はその戻り値を、指定しなければ `{ label, value }` 形式の項目は `label` / `value` を、その他の値は文字列化した値を返します。
 * それ以外の場合は空文字列を返します。
 */
export function getItemLabel<Value>(
  item: Value,
  itemToStringLabel: ((item: Value) => string) | undefined,
): string {
  if (itemToStringLabel) {
    return itemToStringLabel(item);
  }

  if (typeof item === "object" && item !== null) {
    if ("label" in item && (typeof item.label === "string" || typeof item.label === "number")) {
      return String(item.label);
    }
    if ("value" in item && (typeof item.value === "string" || typeof item.value === "number")) {
      return String(item.value);
    }

    return "";
  }

  if (
    typeof item === "string" ||
    typeof item === "number" ||
    typeof item === "bigint" ||
    typeof item === "boolean"
  ) {
    return String(item);
  }

  return "";
}
