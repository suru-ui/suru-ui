import type * as React from "react";

/** ラベルと値を両方持つ項目かどうかを判定する型ガードです。 */
export function isLabeledItem(item: unknown): item is {
  readonly label: React.ReactNode;
  readonly value: unknown;
} {
  return typeof item === "object" && item !== null && "value" in item && "label" in item;
}

/** 項目の表示ラベルを解決します。 */
export function getItemLabel(item: unknown): string {
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
