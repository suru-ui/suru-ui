import type * as React from "react";

export interface ItemGroup<TValue = unknown> {
  [key: string]: unknown;
  items: readonly TValue[];
  label?: React.ReactNode | undefined;
}

export function isItemGroup<TValue = unknown>(x: unknown): x is ItemGroup<TValue> {
  return typeof x === "object" && x !== null && "items" in x && Array.isArray(x.items);
}
