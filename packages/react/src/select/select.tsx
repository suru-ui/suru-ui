import * as React from "react";

import { CheckIcon, ChevronIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import mergeProps from "../_merge-props.js";
import toReactNode from "../_to-react-node.js";
import type { Override, IComponent, IUseContext } from "../types.js";
import {
  type SelectContext,
  type SelectRootItem,
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
  type SelectRootRadius,
  type SelectValueProps,
  type SelectPortalProps,
  type SelectRootActions,
  type SelectRootVariant,
  type SelectContentProps,
  type SelectTriggerProps,
  type SelectBackdropProps,
  type SelectItemTextProps,
  type SelectRootItemGroup,
  type SelectSeparatorProps,
  type SelectGroupLabelProps,
  type SelectPositionerProps,
  type SelectRootLabeledItem,
  type SelectItemIndicatorProps,
  type SelectScrollUpArrowProps,
  type SelectScrollDownArrowProps,
  type SelectRootChangeEventReason,
  type SelectRootChangeEventDetails,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectRoot,
  SelectArrow,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectPortal,
  SelectContent,
  SelectTrigger,
  SelectBackdrop,
  SelectItemText,
  SelectSeparator,
  SelectGroupLabel,
  SelectPositioner,
  useSelectContext,
  SelectItemIndicator,
  SelectListItemGroup,
  SelectScrollUpArrow,
  SelectListLabeledItem,
  SelectScrollDownArrow,
} from "./select.parts.js";

// Types
// -----

export type SelectActions = SelectRootActions;

export type SelectChangeEventDetails = SelectRootChangeEventDetails;

export type SelectChangeEventReason = SelectRootChangeEventReason;

export type SelectRadius = SelectRootRadius;

export type SelectSize = SelectRootSize;

export type SelectVariant = SelectRootVariant;

export type SelectLabeledItem<TValue = any> = SelectRootLabeledItem<TValue>;

export type SelectItemGroup<TValue = any> = SelectRootItemGroup<TValue>;

export type SelectItems<TValue = any> = SelectRootItems<TValue>;

/**
 * {@link Select} の各パーツに渡す props です。
 */
export type SelectSlotProps = {
  /**
   * {@link SelectArrow} に渡す props です。
   */
  readonly arrow?: Omit<SelectArrowProps, "children"> | undefined;

  /**
   * {@link SelectBackdrop} に渡す props です。
   */
  readonly backdrop?: Omit<SelectBackdropProps, "children"> | undefined;

  /**
   * {@link SelectContent} に渡す props です。
   */
  readonly content?: Omit<SelectContentProps, "children"> | undefined;

  /**
   * {@link SelectGroup} に渡す props です。
   */
  readonly group?: Omit<SelectGroupProps, "children"> | undefined;

  /**
   * {@link SelectGroupLabel} に渡す props です。
   */
  readonly groupLabel?: Omit<SelectGroupLabelProps, "children"> | undefined;

  /**
   * {@link SelectIcon} に渡す props です。
   */
  readonly icon?: SelectIconProps | undefined;

  /**
   * {@link SelectItem} に渡す props です。
   */
  readonly item?: Omit<SelectItemProps, "children" | "value"> | undefined;

  /**
   * {@link SelectItemIndicator} に渡す props です。
   */
  readonly itemIndicator?: SelectItemIndicatorProps | undefined;

  /**
   * {@link SelectItemText} に渡す props です。
   */
  readonly itemText?: SelectItemTextProps | undefined;

  /**
   * {@link SelectLabel} に渡す props です。
   */
  readonly label?: Omit<SelectLabelProps, "children"> | undefined;

  /**
   * {@link SelectList} に渡す props です。
   */
  readonly list?: Omit<SelectListProps, "children"> | undefined;

  /**
   * {@link SelectPortal} に渡す props です。
   */
  readonly portal?: Omit<SelectPortalProps, "children"> | undefined;

  /**
   * {@link SelectPositioner} に渡す props です。
   */
  readonly positioner?: Omit<SelectPositionerProps, "children"> | undefined;

  /**
   * {@link SelectScrollDownArrow} に渡す props です。
   */
  readonly scrollDownArrow?: SelectScrollDownArrowProps | undefined;

  /**
   * {@link SelectScrollUpArrow} に渡す props です。
   */
  readonly scrollUpArrow?: SelectScrollUpArrowProps | undefined;

  /**
   * {@link SelectSeparator} に渡す props です。
   */
  readonly separator?: SelectSeparatorProps | undefined;

  /**
   * {@link SelectValue} に渡す props です。
   */
  readonly value?: SelectValueProps | undefined;
};

/**
 * {@link Select} が持つ状態です。
 */
export type SelectState = SelectRootState;

/**
 * {@link Select} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export type SelectProps<
  TValue = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> = Override<
  Override<
    SelectTriggerProps,
    Override<SelectRootProps<TValue, TMultiple>, Pick<SelectListProps<TValue>, "children">>
  >,
  {
    /**
     * トリガーの上に表示するラベルです。
     */
    label?: React.ReactNode | undefined;

    /**
     * 選択値がないときに表示するプレースホルダーです。
     *
     * @default "選択してください"
     */
    placeholder?: React.ReactNode | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: SelectSlotProps | undefined;
  }
>;

// API
// ---

/**
 * {@link Select} を構成する各パーツの props を作成するための API です。
 *
 * @template TValue 項目の値の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export interface SelectAPI<
  TValue = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> {
  /**
   * {@link SelectArrow} に渡す props を取得します。
   */
  getArrowProps(): Omit<SelectArrowProps, "children">;

  /**
   * {@link SelectBackdrop} に渡す props を取得します。
   */
  getBackdropProps(): Omit<SelectBackdropProps, "children">;

  /**
   * {@link SelectContent} に渡す props を取得します。
   */
  getContentProps(): Omit<SelectContentProps, "children">;

  /**
   * {@link SelectGroupLabel} に渡す props を取得します。
   *
   * @param item グループです。
   */
  getGroupLabelProps(item: SelectListItemGroup): SelectGroupLabelProps | null;

  /**
   * {@link SelectGroup} に渡す props を取得します。
   *
   * @param item グループです。
   */
  getGroupProps(item: SelectListItemGroup): Omit<SelectGroupProps, "children">;

  /**
   * グループに含まれる項目を取得します。
   *
   * @param item グループです。
   */
  getGroupedItems(item: SelectListItemGroup): SelectListItemGroup["items"];

  /**
   * {@link SelectIcon} に渡す props を取得します。
   */
  getIconProps(): SelectIconProps;

  /**
   * {@link SelectItemIndicator} に渡す props を取得します。
   */
  getItemIndicatorProps(): SelectItemIndicatorProps;

  /**
   * {@link SelectItem} に渡す props を取得します。
   *
   * @param item 項目です。
   * @param index 項目のインデックスです。
   */
  getItemProps(item: SelectListLabeledItem, index: number): Omit<SelectItemProps, "children">;

  /**
   * {@link SelectItemText} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getItemTextProps(item: SelectListLabeledItem): SelectItemTextProps;

  /**
   * {@link SelectLabel} に渡す props を取得します。
   */
  getLabelProps(): SelectLabelProps | null;

  /**
   * {@link SelectList} に渡す props を取得します。
   */
  getListProps(): SelectListProps<TValue>;

  /**
   * {@link SelectPortal} に渡す props を取得します。
   */
  getPortalProps(): Omit<SelectPortalProps, "children">;

  /**
   * {@link SelectPositioner} に渡す props を取得します。
   */
  getPositionerProps(): Omit<SelectPositionerProps, "children">;

  /**
   * {@link SelectRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<SelectRootProps<TValue, TMultiple>, "children">;

  /**
   * {@link SelectScrollDownArrow} に渡す props を取得します。
   */
  getScrollDownArrowProps(): SelectScrollDownArrowProps;

  /**
   * {@link SelectScrollUpArrow} に渡す props を取得します。
   */
  getScrollUpArrowProps(): SelectScrollUpArrowProps;

  /**
   * {@link SelectSeparator} に渡す props を取得します。
   *
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   */
  getSeparatorProps(index: number, items: readonly any[]): SelectSeparatorProps | null;

  /**
   * {@link SelectTrigger} に渡す props を取得します。
   */
  getTriggerProps(): Omit<SelectTriggerProps, "children">;

  /**
   * {@link SelectValue} に渡す props を取得します。
   */
  getValueProps(): SelectValueProps;
}

interface IUseSelectAPI {
  /**
   * {@link SelectAPI} を作成します。
   *
   * @template TValue 項目の値の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   * @param props {@link Select} の props です。
   * @returns セレクトの API です。
   */
  <TValue = any, TMultiple extends boolean | undefined = boolean | undefined>(
    props: SelectProps<TValue, TMultiple>,
  ): SelectAPI<TValue, TMultiple>;
}

/**
 * {@link SelectAPI} を作成するフックです。
 */
export const useSelectAPI: IUseSelectAPI = function useSuiSelectAPI<
  TValue,
  TMultiple extends boolean | undefined = boolean | undefined,
>(props: SelectProps<TValue, TMultiple>) {
  const {
    id,
    form,
    name,
    open,
    size,
    items,
    label,
    modal,
    value,
    radius,
    variant,
    children,
    disabled,
    inputRef,
    multiple,
    outlined,
    readOnly,
    required,
    slotProps: {
      icon: iconProps = {},
      item: itemProps = {},
      list: listProps = {},
      arrow: arrowProps = {},
      group: groupProps = {},
      label: labelProps = {},
      value: valueProps = {},
      portal: portalProps = {},
      content: contentProps = {},
      backdrop: backdropProps = {},
      itemText: itemTextProps = {},
      separator: separatorProps = {},
      groupLabel: groupLabelProps = {},
      positioner: positionerProps = {},
      itemIndicator: itemIndicatorProps = {},
      scrollUpArrow: scrollUpArrowProps = {},
      scrollDownArrow: scrollDownArrowProps = {},
    } = {},
    actionsRef,
    defaultOpen,
    placeholder = "選択してください",
    autoComplete,
    defaultValue,
    onOpenChange,
    onValueChange,
    itemToStringLabel,
    itemToStringValue,
    isItemEqualToValue,
    highlightItemOnHover,
    onOpenChangeComplete,
    ...triggerProps
  } = props;

  return {
    getIconProps() {
      const { children = <ChevronIcon />, ...otherIconProps } = iconProps;

      return {
        ...otherIconProps,
        children,
      };
    },
    getItemProps(item) {
      const { label: _, ...otherItemProps } = item;

      return mergeProps([itemProps, otherItemProps]);
    },
    getListProps() {
      return {
        ...listProps,
        children,
      };
    },
    getRootProps() {
      const rootProps: Omit<SelectRootProps<TValue, TMultiple>, "children"> = {
        id,
        form,
        name,
        open,
        size,
        items,
        modal,
        value,
        radius,
        variant,
        disabled,
        inputRef,
        multiple,
        outlined,
        readOnly,
        required,
        actionsRef,
        defaultOpen,
        autoComplete,
        defaultValue,
        onOpenChange,
        onValueChange,
        itemToStringLabel,
        itemToStringValue,
        isItemEqualToValue,
        highlightItemOnHover,
        onOpenChangeComplete,
      };

      return rootProps;
    },
    getArrowProps() {
      return arrowProps;
    },
    getGroupProps(item) {
      const { items: _, label: __, ...otherGroupProps } = item;

      return mergeProps([groupProps, otherGroupProps]);
    },
    getLabelProps() {
      if (isLikelyVisibleNode(label)) {
        return {
          ...labelProps,
          children: label,
        };
      }

      return null;
    },
    getValueProps() {
      return {
        placeholder,
        ...valueProps,
      };
    },
    getPortalProps() {
      return portalProps;
    },
    getContentProps() {
      return contentProps;
    },
    getGroupedItems(item) {
      return item.items;
    },
    getTriggerProps() {
      return triggerProps;
    },
    getBackdropProps() {
      return backdropProps;
    },
    getItemTextProps(item) {
      const { label, value } = item;

      return {
        ...itemTextProps,
        children: toReactNode(label, String(value)),
      };
    },
    getSeparatorProps(index, items) {
      if (index >= items.length - 1) {
        return null;
      }

      return separatorProps;
    },
    getGroupLabelProps(item) {
      const { label } = item;
      if (isLikelyVisibleNode(label)) {
        return {
          ...groupLabelProps,
          children: label,
        };
      }

      return null;
    },
    getPositionerProps() {
      const {
        side = "bottom",
        align = "start",
        sideOffset = 8,
        alignItemWithTrigger = true,
        ...otherPositionerProps
      } = positionerProps;

      return {
        ...otherPositionerProps,
        side,
        align,
        sideOffset,
        alignItemWithTrigger,
      };
    },
    getItemIndicatorProps() {
      const { children = <CheckIcon />, ...otherItemIndicatorProps } = itemIndicatorProps;

      return {
        ...otherItemIndicatorProps,
        children,
      };
    },
    getScrollUpArrowProps() {
      const {
        children = <ChevronIcon style={{ rotate: "180deg" }} />,
        ...otherScrollUpArrowProps
      } = scrollUpArrowProps;

      return {
        ...otherScrollUpArrowProps,
        children,
      };
    },
    getScrollDownArrowProps() {
      const { children = <ChevronIcon />, ...otherScrollDownArrowProps } = scrollDownArrowProps;

      return {
        ...otherScrollDownArrowProps,
        children,
      };
    },
  };
};

export { type SelectAPI as API, useSelectAPI as useAPI };

// Component
// ---------

interface ISelect extends IComponent<SelectProps<unknown, boolean | undefined>> {
  /**
   * @template TValue 項目の値の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   */
  <TValue = any, TMultiple extends boolean | undefined = false>(
    props: SelectProps<TValue, TMultiple>,
  ): IComponent.Return;

  readonly useContext: IUseContext<SelectContext>;
}

/**
 * 定義済みの項目から値を選択するコンポーネントです。
 *
 * `multiple` を指定すると複数の値を選択できます。項目が多く、入力による絞り込みが必要な場合は {@link Combobox} を使用してください。
 */
export const Select: ISelect = /*#__PURE__*/ Object.assign(
  function SuiSelect(props: SelectProps) {
    const api = useSelectAPI(props);
    const labelProps = api.getLabelProps();
    const listProps = api.getListProps();

    return (
      <SelectRoot {...api.getRootProps()}>
        {labelProps && <SelectLabel {...labelProps} />}
        <SelectTrigger {...api.getTriggerProps()}>
          <SelectValue {...api.getValueProps()} />
          <SelectIcon {...api.getIconProps()} />
        </SelectTrigger>
        <SelectPortal {...api.getPortalProps()}>
          <SelectBackdrop {...api.getBackdropProps()} />
          <SelectPositioner {...api.getPositionerProps()}>
            <SelectContent {...api.getContentProps()}>
              <SelectScrollUpArrow {...api.getScrollUpArrowProps()} />
              <SelectArrow {...api.getArrowProps()} />
              <SelectList {...listProps}>
                {listProps.children ??
                  function defaultListItemRenderer(item, index, items) {
                    if ("items" in item) {
                      const groupProps = api.getGroupProps(item);
                      const groupLabelProps = api.getGroupLabelProps(item);
                      const separatorProps = api.getSeparatorProps(index, items);

                      return (
                        <React.Fragment key={index}>
                          <SelectGroup {...groupProps}>
                            {groupLabelProps && <SelectGroupLabel {...groupLabelProps} />}
                            {api.getGroupedItems(item).map(defaultListItemRenderer)}
                          </SelectGroup>
                          {separatorProps && <SelectSeparator {...separatorProps} />}
                        </React.Fragment>
                      );
                    }

                    return (
                      <SelectItem {...api.getItemProps(item, index)} key={index}>
                        <SelectItemText {...api.getItemTextProps(item)} />
                        <SelectItemIndicator {...api.getItemIndicatorProps()} />
                      </SelectItem>
                    );
                  }}
              </SelectList>
              <SelectScrollDownArrow {...api.getScrollDownArrowProps()} />
            </SelectContent>
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
  export type State = SelectState;

  export type Props<
    TValue = any,
    TMultiple extends boolean | undefined = boolean | undefined,
  > = SelectProps<TValue, TMultiple>;

  export type SlotProps = SelectSlotProps;

  export type Context<TValue = any> = SelectContext<TValue>;

  export type Actions = SelectActions;

  export type ChangeEventDetails = SelectChangeEventDetails;

  export type ChangeEventReason = SelectChangeEventReason;

  export type Item<TValue = any> = SelectRootItem<TValue>;

  export type ItemGroup<TValue = any> = SelectItemGroup<TValue>;

  export type Items<TValue = any> = SelectItems<TValue>;

  export type LabeledItem<TValue = any> = SelectLabeledItem<TValue>;

  export type Radius = SelectRadius;

  export type Size = SelectSize;

  export type Variant = SelectVariant;
}
