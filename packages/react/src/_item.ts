// 参考:
// https://github.com/mui/base-ui/blob/v1.7.0/packages/react/src/internals/resolveValueLabel.tsx#L60-L73
// https://github.com/mui/base-ui/blob/v1.7.0/packages/react/src/internals/resolveValueLabel.tsx#L75-L83
// https://github.com/mui/base-ui/blob/v1.7.0/packages/react/src/internals/serializeValue.ts
// https://github.com/sindresorhus/type-fest/blob/v5.10.0/source/primitive.d.ts

interface IItemGroup {
  readonly items: readonly unknown[];
}

interface ILabeledItem {
  readonly label: unknown;
  readonly value: unknown;
}

export function isObject(x: unknown): x is object {
  return typeof x === "object" && x !== null;
}

export function hasLabel<X extends object>(x: X): x is X & Pick<ILabeledItem, "label"> {
  return "label" in x;
}

export function hasValue<X extends object>(x: X): x is X & Pick<ILabeledItem, "value"> {
  return "value" in x;
}

export function hasItems<X extends object>(x: X): x is X & IItemGroup {
  return "items" in x && Array.isArray(x.items);
}

export function isItemGroup(item: unknown): item is IItemGroup;

export function isItemGroup<TItem extends IItemGroup>(item: unknown): item is TItem;

export function isItemGroup(item: unknown): boolean {
  return isObject(item) && hasItems(item);
}

export function isLabeledItem(item: unknown): item is ILabeledItem;

export function isLabeledItem<TItem extends ILabeledItem>(item: unknown): item is TItem;

export function isLabeledItem(item: unknown): boolean {
  return isObject(item) && hasLabel(item) && hasValue(item);
}

type Primitive = null | undefined | string | number | boolean | symbol | bigint;

type PrimitiveItem = NonNullable<Primitive>;

export function isPrimitiveItem(item: unknown): item is PrimitiveItem {
  return (
    typeof item === "string" ||
    typeof item === "number" ||
    typeof item === "bigint" ||
    typeof item === "symbol" ||
    typeof item === "boolean"
  );
}

export function defaultItemToStringLabel(item: unknown): string {
  switch (true) {
    case typeof item === "string":
    case typeof item === "boolean":
      return item.toString();

    case typeof item === "number":
    case typeof item === "bigint":
      return item.toString(10);

    case typeof item === "symbol":
      return item.description ?? item.toString();

    case item == null:
      return "";

    case isObject(item) && hasLabel(item) && item.label !== undefined:
      return serializeValue(item.label);

    case isObject(item) && hasValue(item):
      return serializeValue(item.value);

    default:
      return serializeValue(item);
  }
}

export function defaultItemToStringValue(item: unknown): string {
  switch (true) {
    case isLabeledItem(item):
      return serializeValue(item.value);

    default:
      return serializeValue(item);
  }
}

function serializeValue(value: unknown): string {
  switch (true) {
    case typeof value === "string":
    case typeof value === "boolean":
      return value.toString();

    case typeof value === "number":
    case typeof value === "bigint":
      return value.toString(10);

    case typeof value === "symbol":
      return value.description ?? value.toString();

    case value == null:
      return "";

    default:
      try {
        return JSON.stringify(value);
      } catch {
        // oxlint-disable-next-line typescript/no-base-to-string
        return String(value);
      }
  }
}
