import isReactNode from "../_is-react-node.js";
import type * as Button from "../button/button.parts.js";
import type {
  ContextMenuRootLinkItem,
  ContextMenuRootItemGroup,
  ContextMenuRootRadioItem,
  ContextMenuRootLabeledItem,
  ContextMenuRootSubmenuItem,
  ContextMenuRootCheckboxItem,
  ContextMenuRootRadioItemGroup,
} from "./context-menu.root.jsx";

function isObject(x: unknown): x is object {
  return typeof x === "object" && x !== null;
}

function hasItems<X extends object>(x: X): x is X & { items: unknown[] } {
  return "items" in x && Array.isArray(x.items);
}

function hasLabel<X extends object>(x: X): x is X & { label: React.ReactNode } {
  return "label" in x && isReactNode(x.label);
}

function hasOptionalLabel<X extends object>(x: X): x is X & { label: React.ReactNode } {
  return !("label" in x) || isReactNode(x.label);
}

function hasType<X extends object, T>(x: X, type: T): x is X & { type: T } {
  return "type" in x && x.type === type;
}

function hasOptionalTypeof<X extends object, T>(x: X, type: T): x is X & { type: T } {
  return !("type" in x) || x.type === undefined || x.type === type;
}

export function isLabeledItem(item: unknown): item is ContextMenuRootLabeledItem {
  return isObject(item) && !hasItems(item) && hasLabel(item) && hasOptionalTypeof(item, "item");
}

export function isLinkItem(item: unknown): item is ContextMenuRootLinkItem {
  return isObject(item) && !hasItems(item) && hasLabel(item) && hasType(item, "link");
}

export function isCheckboxItem(item: unknown): item is ContextMenuRootCheckboxItem {
  return isObject(item) && !hasItems(item) && hasLabel(item) && hasType(item, "checkbox");
}

export function isRadioItem(item: unknown): item is ContextMenuRootRadioItem {
  return isObject(item) && !hasItems(item) && hasLabel(item);
}

export function isRadioItemGroup(item: unknown): item is ContextMenuRootRadioItemGroup {
  return isObject(item) && hasItems(item) && hasType(item, "radio-group");
}

export function isSubmenuItem(item: unknown): item is ContextMenuRootSubmenuItem {
  return isObject(item) && hasItems(item) && hasLabel(item) && hasType(item, "submenu");
}

export function isItemGroup(item: unknown): item is ContextMenuRootItemGroup {
  return (
    isObject(item) && hasItems(item) && hasOptionalLabel(item) && hasOptionalTypeof(item, "group")
  );
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
