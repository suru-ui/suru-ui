import * as React from "react";

import cn from "../../cn.js";
import type { IComponent, IUseContext } from "../../types.js";
import { getItemLabel, isLabeledItem } from "../_get-item-label.js";
import {
  type SelectContext,
  type SelectRootSize,
  type SelectIconProps,
  type SelectItemProps,
  type SelectListProps,
  type SelectRootItems,
  type SelectRootProps,
  type SelectRootState,
  type SelectArrowProps,
  type SelectGroupProps,
  type SelectLabelProps,
  type SelectPopupProps,
  type SelectRootRadius,
  type SelectValueProps,
  type SelectPortalProps,
  type SelectRootVariant,
  type SelectTriggerProps,
  type SelectBackdropProps,
  type SelectItemTextProps,
  type SelectRootItemGroup,
  type SelectSeparatorProps,
  type SelectGroupLabelProps,
  type SelectPositionerProps,
  type SelectItemIndicatorProps,
  type SelectScrollUpArrowProps,
  type SelectScrollDownArrowProps,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectRoot,
  SelectArrow,
  SelectGroup,
  SelectLabel,
  SelectPopup,
  SelectValue,
  SelectPortal,
  SelectTrigger,
  SelectBackdrop,
  SelectItemText,
  SelectSeparator,
  SelectGroupLabel,
  SelectPositioner,
  useSelectContext,
  SelectItemIndicator,
  SelectScrollUpArrow,
  SelectScrollDownArrow,
} from "./select.parts.jsx";

/**
 * {@link SelectRootRadius} です。
 */
export type SelectRadius = SelectRootRadius;

/**
 * {@link SelectRootSize} です。
 */
export type SelectSize = SelectRootSize;

/**
 * {@link SelectRootVariant} です。
 */
export type SelectVariant = SelectRootVariant;

/**
 * {@link SelectRootItemGroup} です。
 */
export type SelectItemGroup<Value = unknown> = SelectRootItemGroup<Value>;

/**
 * {@link SelectRootItems} です。
 */
export type SelectItems<Value = unknown> = SelectRootItems<Value>;

/**
 * {@link Select} の各パーツに渡すプロパティーです。
 */
export type SelectSlotProps = {
  /**
   * {@link SelectArrow} に渡すプロパティーです。
   */
  readonly arrow?: SelectArrowProps | undefined;

  /**
   * {@link SelectBackdrop} に渡すプロパティーです。
   */
  readonly backdrop?: SelectBackdropProps | undefined;

  /**
   * {@link SelectGroup} に渡すプロパティーです。
   */
  readonly group?: SelectGroupProps | undefined;

  /**
   * {@link SelectGroupLabel} に渡すプロパティーです。
   */
  readonly groupLabel?: SelectGroupLabelProps | undefined;

  /**
   * {@link SelectIcon} に渡すプロパティーです。
   */
  readonly icon?: SelectIconProps | undefined;

  /**
   * {@link SelectItem} に渡すプロパティーです。
   */
  readonly item?: SelectItemProps | undefined;

  /**
   * {@link SelectItemIndicator} に渡すプロパティーです。
   */
  readonly itemIndicator?: SelectItemIndicatorProps | undefined;

  /**
   * {@link SelectItemText} に渡すプロパティーです。
   */
  readonly itemText?: SelectItemTextProps | undefined;

  /**
   * {@link SelectLabel} に渡すプロパティーです。
   */
  readonly label?: SelectLabelProps | undefined;

  /**
   * {@link SelectList} に渡すプロパティーです。
   */
  readonly list?: SelectListProps | undefined;

  /**
   * {@link SelectPopup} に渡すプロパティーです。
   */
  readonly popup?: SelectPopupProps | undefined;

  /**
   * {@link SelectPortal} に渡すプロパティーです。
   */
  readonly portal?: SelectPortalProps | undefined;

  /**
   * {@link SelectPositioner} に渡すプロパティーです。
   */
  readonly positioner?: SelectPositionerProps | undefined;

  /**
   * {@link SelectScrollDownArrow} に渡すプロパティーです。
   */
  readonly scrollDownArrow?: SelectScrollDownArrowProps | undefined;

  /**
   * {@link SelectScrollUpArrow} に渡すプロパティーです。
   */
  readonly scrollUpArrow?: SelectScrollUpArrowProps | undefined;

  /**
   * {@link SelectSeparator} に渡すプロパティーです。
   */
  readonly separator?: SelectSeparatorProps | undefined;

  /**
   * {@link SelectTrigger} に渡すプロパティーです。
   */
  readonly trigger?: SelectTriggerProps | undefined;

  /**
   * {@link SelectValue} に渡すプロパティーです。
   */
  readonly value?: SelectValueProps | undefined;
};

/**
 * {@link Select} の状態です。
 */
export type SelectState = SelectRootState;

/**
 * {@link Select} コンポーネントのプロパティーです。
 */
export type SelectProps<Value = unknown, Multiple extends boolean | undefined = false> = Omit<
  SelectRootProps<Value, Multiple>,
  "children"
> & {
  /**
   * 選択項目の内容です。関数を指定すると、項目の値とインデックスから各項目を作ります。
   */
  children?: React.ReactNode | ((item: Value, index: number) => React.ReactNode) | undefined;

  /**
   * トリガーに適用するクラス名です。`slotProps.trigger.className` と結合されます。
   */
  className?: SelectTriggerProps["className"] | undefined;

  /**
   * トリガーの上に表示するラベルです。
   */
  label?: React.ReactNode | undefined;

  /**
   * 選択値がないときに表示するプレースホルダーです。
   */
  placeholder?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   */
  slotProps?: SelectSlotProps | undefined;
};

/**
 * 定義済みの項目から値を選択するコンポーネントです。
 *
 * `multiple` を指定すると複数の値を選択できます。項目が多く、入力による絞り込みが必要な場合は {@link Combobox} を使用してください。
 */
export const Select: SelectType = /*#__PURE__*/ Object.assign(
  function SuiSelect<Value, Multiple extends boolean | undefined = false>(
    props: SelectProps<Value, Multiple>,
  ) {
    const {
      label,
      children,
      className,
      slotProps: {
        icon: iconProps,
        item: itemProps,
        list: listProps,
        arrow: arrowProps,
        group: groupProps,
        label: labelProps,
        popup: popupProps,
        value: valueProps,
        portal: portalProps,
        trigger: triggerProps,
        backdrop: backdropProps,
        itemText: itemTextProps,
        separator: separatorProps,
        groupLabel: groupLabelProps,
        positioner: positionerProps,
        itemIndicator: itemIndicatorProps,
        scrollUpArrow: scrollUpArrowProps,
        scrollDownArrow: scrollDownArrowProps,
      } = {},
      placeholder = "選択してください",
      itemToStringLabel,
      ...rootProps
    } = props;
    const { children: iconChildren = <SuiChevronIcon />, ...restIconProps } = iconProps ?? {};
    const { "aria-label": triggerAriaLabel, ...restTriggerProps } = triggerProps ?? {};
    const {
      side = "bottom",
      align = "start",
      sideOffset = 8,
      alignItemWithTrigger = true,
      ...restPositionerProps
    } = positionerProps ?? {};
    const { children: indicatorChildren = <SuiCheckIcon />, ...restIndicatorProps } =
      itemIndicatorProps ?? {};
    const { children: valueChildren, ...restValueProps } = valueProps ?? {};
    const { children: itemTextChildren, ...restItemTextProps } = itemTextProps ?? {};
    const items = rootProps.items;

    const listChildren = React.useMemo(() => {
      if (typeof children !== "function" && children !== undefined) {
        return children;
      }

      const renderItem = (item: Value, index: number, defaultLabel?: React.ReactNode) => {
        const content =
          typeof children === "function"
            ? children(item, index)
            : (defaultLabel ?? itemToStringLabel?.(item) ?? getItemLabel(item));

        return (
          <SelectItem {...itemProps} key={index} value={item}>
            <SelectItemIndicator {...restIndicatorProps}>{indicatorChildren}</SelectItemIndicator>
            <SelectItemText {...restItemTextProps}>{itemTextChildren ?? content}</SelectItemText>
          </SelectItem>
        );
      };

      const renderItems = (items: SelectItems<Value> | undefined): React.ReactNode => {
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
            const label = entry.label ?? getItemLabel(entry);
            return (
              <React.Fragment key={index}>
                <SelectGroup {...groupProps}>
                  {label !== "" && (
                    <SelectGroupLabel {...groupLabelProps}>{label}</SelectGroupLabel>
                  )}
                  {entry.items.map((item, itemIndex) => renderItem(item, itemIndex))}
                </SelectGroup>
                {index < items.length - 1 && <SelectSeparator {...separatorProps} />}
              </React.Fragment>
            );
          }

          if (isLabeledItem(entry)) {
            return renderItem(entry.value, index, entry.label);
          }

          return renderItem(entry as Value, index);
        });
      };

      return renderItems(items);
    }, [
      children,
      groupLabelProps,
      groupProps,
      indicatorChildren,
      itemProps,
      items,
      itemTextChildren,
      itemToStringLabel,
      restIndicatorProps,
      restItemTextProps,
      separatorProps,
    ]);

    return (
      <SelectRoot {...rootProps}>
        {("label" in props || !!labelProps) && <SelectLabel children={label} {...labelProps} />}
        <SelectTrigger
          {...restTriggerProps}
          className={cn(className, restTriggerProps.className)}
          aria-label={triggerAriaLabel ?? (label === undefined ? "選択肢を選択" : undefined)}
        >
          <SelectValue placeholder={placeholder} {...restValueProps}>
            {valueChildren}
          </SelectValue>
          <SelectIcon {...restIconProps}>{iconChildren}</SelectIcon>
        </SelectTrigger>
        <SelectPortal {...portalProps}>
          <SelectBackdrop {...backdropProps} />
          <SelectPositioner
            {...restPositionerProps}
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignItemWithTrigger={alignItemWithTrigger}
          >
            <SelectPopup {...popupProps}>
              <SelectScrollUpArrow {...scrollUpArrowProps}>
                <SuiChevronUpIcon />
              </SelectScrollUpArrow>
              <SelectArrow {...arrowProps} />
              <SelectList {...listProps}>{listChildren}</SelectList>
              <SelectScrollDownArrow {...scrollDownArrowProps}>
                <SuiChevronDownIcon />
              </SelectScrollDownArrow>
            </SelectPopup>
          </SelectPositioner>
        </SelectPortal>
      </SelectRoot>
    );
  },
  {
    useContext: useSelectContext,
  },
);

/**
 * {@link Select} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Select {
  /**
   * {@link SelectState} です。
   */
  export type State = SelectState;

  /**
   * {@link SelectProps} です。
   *
   * @template Value 選択項目の値を表す型です。
   * @template Multiple 複数選択を有効にするかどうかです。
   */
  export type Props<Value = unknown, Multiple extends boolean | undefined = false> = SelectProps<
    Value,
    Multiple
  >;

  /**
   * {@link SelectContext} です。
   */
  export type Context = SelectContext;

  /**
   * {@link SelectSlotProps} です。
   */
  export type SlotProps = SelectSlotProps;

  /**
   * {@link SelectItemGroup} です。
   */
  export type ItemGroup<Value = unknown> = SelectItemGroup<Value>;

  /**
   * {@link SelectItems} です。
   */
  export type Items<Value = unknown> = SelectItems<Value>;

  /**
   * {@link SelectRadius} です。
   */
  export type Radius = SelectRadius;

  /**
   * {@link SelectSize} です。
   */
  export type Size = SelectSize;

  /**
   * {@link SelectVariant} です。
   */
  export type Variant = SelectVariant;
}

interface SelectType extends IComponent<SelectProps<unknown, boolean | undefined>> {
  <Value, Multiple extends boolean | undefined = false>(
    props: SelectProps<Value, Multiple>,
  ): React.ReactElement | null;

  /**
   * {@link useSelectContext} です。
   */
  readonly useContext: IUseContext<SelectContext>;
}

function isItemGroup<Value>(item: unknown): item is SelectItemGroup<Value> {
  return typeof item === "object" && item !== null && "items" in item && Array.isArray(item.items);
}

function SuiChevronIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 16 16"
      focusable="false"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function SuiChevronUpIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg fill="currentColor" viewBox="0 0 16 16" focusable="false" aria-hidden="true" {...props}>
      <path d="M12 10H4l4-4.5z" />
    </svg>
  );
}

function SuiChevronDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg fill="currentColor" viewBox="0 0 16 16" focusable="false" aria-hidden="true" {...props}>
      <path d="M12 6H4l4 4.5z" />
    </svg>
  );
}

function SuiCheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 16 16"
      focusable="false"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}
