import type * as React from "react";

// https://github.com/mui/base-ui/blob/v1.7.0/packages/react/src/internals/resolveValueLabel.tsx#L13-L16
export interface ItemGroup<TItem = unknown> {
  [key: string]: unknown;
  items: readonly TItem[];
  label?: React.ReactNode | undefined;
}

export function isItemGroup<TItem = unknown>(x: unknown): x is ItemGroup<TItem> {
  return typeof x === "object" && x !== null && "items" in x && Array.isArray(x.items);
}
