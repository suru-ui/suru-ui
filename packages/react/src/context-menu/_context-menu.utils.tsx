import isReactNode from "../_is-react-node.js";
import type * as Button from "../button/button.parts.js";
import type {
  ContextMenuRootLinkItemObject,
  ContextMenuRootItemObjectGroup,
  ContextMenuRootRadioItemObject,
  ContextMenuRootLabeledItemObject,
  ContextMenuRootSubmenuItemObject,
  ContextMenuRootCheckboxItemObject,
  ContextMenuRootRadioItemObjectGroup,
} from "./root/context-menu.root.jsx";

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

export function isLabeledItemObject(item: unknown): item is ContextMenuRootLabeledItemObject {
  return isObject(item) && !hasItems(item) && hasLabel(item) && hasOptionalTypeof(item, "item");
}

export function isLinkItemObject(item: unknown): item is ContextMenuRootLinkItemObject {
  return isObject(item) && !hasItems(item) && hasLabel(item) && hasType(item, "link");
}

export function isCheckboxItemObject(item: unknown): item is ContextMenuRootCheckboxItemObject {
  return isObject(item) && !hasItems(item) && hasLabel(item) && hasType(item, "checkbox");
}

export function isRadioItemObject(item: unknown): item is ContextMenuRootRadioItemObject {
  return isObject(item) && !hasItems(item) && hasLabel(item);
}

export function isRadioItemObjectGroup(item: unknown): item is ContextMenuRootRadioItemObjectGroup {
  return isObject(item) && hasItems(item) && hasType(item, "radio-group");
}

export function isSubmenuItemObject(item: unknown): item is ContextMenuRootSubmenuItemObject {
  return isObject(item) && hasItems(item) && hasLabel(item) && hasType(item, "submenu");
}

export function isItemObjectGroup(item: unknown): item is ContextMenuRootItemObjectGroup {
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
