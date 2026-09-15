import type { SelectRootItemGroup, SelectRootLabeledItem } from "./select.root.jsx";

export function isLabeledItem(item: unknown): item is SelectRootLabeledItem {
  return typeof item === "object" && item !== null && "value" in item && "label" in item;
}

export function isItemGroup(item: unknown): item is SelectRootItemGroup {
  return (
    typeof item === "object" &&
    item !== null &&
    "items" in item &&
    (Array.isArray(item.items) || (typeof item.items === "object" && item.items !== null))
  );
}
