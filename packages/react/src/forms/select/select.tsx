import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";
import * as SelectParts from "./select.parts.jsx";

/**
 * {@link Select} コンポーネントのプロパティーです。
 */
export type SelectProps<Value = unknown, Multiple extends boolean | undefined = false> = Omit<
  SelectParts.Root.Props<Value, Multiple>,
  "children"
> & {
  /**
   * トリガーの上に表示するラベルです。
   */
  label?: React.ReactNode | undefined;

  /**
   * トリガーに適用するクラス名です。`slotProps.trigger.className` と結合されます。
   */
  className?: SelectParts.Trigger.Props["className"] | undefined;

  /**
   * 選択値がないときに表示するプレースホルダーです。
   */
  placeholder?: React.ReactNode | undefined;

  /**
   * 選択項目の内容です。関数を指定すると、項目の値とインデックスから各項目を作ります。
   */
  children?: React.ReactNode | ((item: Value, index: number) => React.ReactNode) | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?: {
    readonly label?: SelectParts.Label.Props | undefined;
    readonly value?: SelectParts.Value.Props | undefined;
    readonly trigger?: SelectParts.Trigger.Props | undefined;
    readonly icon?: SelectParts.Icon.Props | undefined;
    readonly portal?: SelectParts.Portal.Props | undefined;
    readonly backdrop?: SelectParts.Backdrop.Props | undefined;
    readonly positioner?: SelectParts.Positioner.Props | undefined;
    readonly popup?: SelectParts.Popup.Props | undefined;
    readonly list?: SelectParts.List.Props | undefined;
    readonly item?: SelectParts.Item.Props | undefined;
    readonly itemIndicator?: SelectParts.ItemIndicator.Props | undefined;
    readonly itemText?: SelectParts.ItemText.Props | undefined;
    readonly arrow?: SelectParts.Arrow.Props | undefined;
    readonly scrollUpArrow?: SelectParts.ScrollUpArrow.Props | undefined;
    readonly scrollDownArrow?: SelectParts.ScrollDownArrow.Props | undefined;
    readonly group?: SelectParts.Group.Props | undefined;
    readonly groupLabel?: SelectParts.GroupLabel.Props | undefined;
    readonly separator?: SelectParts.Separator.Props | undefined;
  };
};

/**
 * 定義済みの項目から値を選択するコンポーネントです。
 *
 * `multiple` を指定すると複数の値を選択できます。項目が多く、入力による絞り込みが必要な場合は
 * {@link Combobox} を使用してください。
 *
 * @example 基本
 * ```tsx
 * <Select items={["りんご", "ばなな", "みかん"]} placeholder="果物を選択" />
 * ```
 *
 * @example 複数選択
 * ```tsx
 * <Select items={["TypeScript", "Rust", "Go"]} multiple defaultValue={["TypeScript"]} />
 * ```
 */
export const Select: SelectComponent = function SuiSelect<
  Value,
  Multiple extends boolean | undefined = false,
>(props: SelectProps<Value, Multiple>) {
  const {
    children,
    className,
    label,
    placeholder = "選択してください",
    slotProps: {
      label: labelProps,
      value: valueProps,
      trigger: triggerProps,
      icon: iconProps,
      portal: portalProps,
      backdrop: backdropProps,
      positioner: positionerProps,
      popup: popupProps,
      list: listProps,
      item: itemProps,
      itemIndicator: itemIndicatorProps,
      itemText: itemTextProps,
      arrow: arrowProps,
      scrollUpArrow: scrollUpArrowProps,
      scrollDownArrow: scrollDownArrowProps,
      group: groupProps,
      groupLabel: groupLabelProps,
      separator: separatorProps,
    } = {},
    ...rootProps
  } = props;
  const { children: iconChildren = <SuiChevronIcon />, ...restIconProps } = iconProps ?? {};
  const { "aria-label": triggerAriaLabel, ...restTriggerProps } = triggerProps ?? {};
  const {
    align = "start",
    side = "bottom",
    sideOffset = 8,
    alignItemWithTrigger = true,
    ...restPositionerProps
  } = positionerProps ?? {};
  const { children: indicatorChildren = <SuiCheckIcon />, ...restIndicatorProps } =
    itemIndicatorProps ?? {};
  const { children: valueChildren, ...restValueProps } = valueProps ?? {};
  const { children: itemTextChildren, ...restItemTextProps } = itemTextProps ?? {};
  const items = rootProps.items;

  const renderItem = (item: Value, index: number, defaultLabel?: React.ReactNode) => {
    const content =
      typeof children === "function"
        ? children(item, index)
        : (defaultLabel ?? getItemLabel(item, rootProps.itemToStringLabel));

    return (
      <SelectParts.Item {...itemProps} key={index} value={item}>
        <SelectParts.ItemIndicator {...restIndicatorProps}>
          {indicatorChildren}
        </SelectParts.ItemIndicator>
        <SelectParts.ItemText {...restItemTextProps}>
          {itemTextChildren ?? content}
        </SelectParts.ItemText>
      </SelectParts.Item>
    );
  };

  const listChildren =
    typeof children === "function" || children === undefined
      ? renderItems(items, renderItem, groupProps, groupLabelProps, separatorProps)
      : children;

  return (
    <SelectParts.Root {...rootProps}>
      {label !== undefined && <SelectParts.Label {...labelProps}>{label}</SelectParts.Label>}
      <SelectParts.Trigger
        {...restTriggerProps}
        className={cn(restTriggerProps.className, className)}
        aria-label={triggerAriaLabel ?? (label === undefined ? "選択肢を選択" : undefined)}
      >
        <SelectParts.Value placeholder={placeholder} {...restValueProps}>
          {valueChildren}
        </SelectParts.Value>
        <SelectParts.Icon {...restIconProps}>{iconChildren}</SelectParts.Icon>
      </SelectParts.Trigger>
      <SelectParts.Portal {...portalProps}>
        <SelectParts.Backdrop {...backdropProps} />
        <SelectParts.Positioner
          {...restPositionerProps}
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignItemWithTrigger={alignItemWithTrigger}
        >
          <SelectParts.Popup {...popupProps}>
            <SelectParts.ScrollUpArrow {...scrollUpArrowProps}>
              <SuiChevronUpIcon />
            </SelectParts.ScrollUpArrow>
            <SelectParts.Arrow {...arrowProps} />
            <SelectParts.List {...listProps}>{listChildren}</SelectParts.List>
            <SelectParts.ScrollDownArrow {...scrollDownArrowProps}>
              <SuiChevronDownIcon />
            </SelectParts.ScrollDownArrow>
          </SelectParts.Popup>
        </SelectParts.Positioner>
      </SelectParts.Portal>
    </SelectParts.Root>
  );
};

interface SelectComponent extends Component<SelectProps> {
  <Value, Multiple extends boolean | undefined = false>(
    props: SelectProps<Value, Multiple>,
  ): React.ReactElement | null;
}

function renderItems<Value>(
  items: SelectParts.SelectItems<Value> | undefined,
  renderItem: (item: Value, index: number, defaultLabel?: React.ReactNode) => React.ReactNode,
  groupProps: SelectParts.Group.Props | undefined,
  groupLabelProps: SelectParts.GroupLabel.Props | undefined,
  separatorProps: SelectParts.Separator.Props | undefined,
): React.ReactNode {
  if (items === undefined) {
    return null;
  }

  if (!Array.isArray(items)) {
    return Object.entries(items).map(([value, label], index) =>
      renderItem(value as Value, index, label),
    );
  }

  return items.map((entry, index) => {
    if (isItemGroup(entry)) {
      const label = entry.label ?? getItemLabel(entry, undefined);
      return (
        <React.Fragment key={index}>
          <SelectParts.Group {...groupProps}>
            {label !== "" && (
              <SelectParts.GroupLabel {...groupLabelProps}>{label}</SelectParts.GroupLabel>
            )}
            {entry.items.map((item, itemIndex) => renderItem(item, itemIndex))}
          </SelectParts.Group>
          {index < items.length - 1 && <SelectParts.Separator {...separatorProps} />}
        </React.Fragment>
      );
    }

    if (isLabeledItem(entry)) {
      return renderItem(entry.value, index, entry.label);
    }

    return renderItem(entry as Value, index);
  });
}

function isItemGroup<Value>(item: unknown): item is SelectParts.SelectItemGroup<Value> {
  return typeof item === "object" && item !== null && "items" in item && Array.isArray(item.items);
}

function isLabeledItem<Value>(
  item: unknown,
): item is { readonly label: React.ReactNode; readonly value: Value } {
  return typeof item === "object" && item !== null && "value" in item && "label" in item;
}

function getItemLabel<Value>(
  item: Value,
  itemToStringLabel: ((item: Value) => string) | undefined,
) {
  if (itemToStringLabel) {
    return itemToStringLabel(item);
  }

  if (typeof item === "object" && item !== null && "label" in item) {
    const label = item.label;
    if (typeof label === "string" || typeof label === "number") {
      return String(label);
    }
  }

  if (typeof item === "object" && item !== null && "value" in item) {
    const value = item.value;
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
  }

  if (typeof item === "string" || typeof item === "number" || typeof item === "bigint") {
    return String(item);
  }

  return "";
}

function SuiChevronIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" {...props}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function SuiChevronUpIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M12 10H4l4-4.5z" />
    </svg>
  );
}

function SuiChevronDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M12 6H4l4 4.5z" />
    </svg>
  );
}

function SuiCheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" {...props}>
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}
