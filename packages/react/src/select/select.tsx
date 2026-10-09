import * as React from "react";

import { CheckIcon, ChevronIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import { getItemKey } from "../_item.js";
import mergeProps from "../_merge-props.js";
import toReactNode from "../_to-react-node.js";
import type { IComponent } from "../types.js";
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
  type IUseSelectContext,
  type SelectPortalProps,
  type SelectRootActions,
  type SelectRootVariant,
  type SelectContentProps,
  type SelectTriggerProps,
  type SelectBackdropProps,
  type SelectItemTextProps,
  type SelectSeparatorProps,
  type SelectGroupLabelProps,
  type SelectPositionerProps,
  type ISelectListItemRenderer,
  type SelectItemIndicatorProps,
  type SelectScrollUpArrowProps,
  type SelectListItemObjectGroup,
  type SelectRootItemObjectGroup,
  type SelectScrollDownArrowProps,
  type SelectListLabeledItemObject,
  type SelectRootChangeEventReason,
  type SelectRootLabeledItemObject,
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
  SelectScrollUpArrow,
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

export type SelectLabeledItemObject<TValue = any> = SelectRootLabeledItemObject<TValue>;

export type SelectItemObjectGroup<TValue = any> = SelectRootItemObjectGroup<TValue>;

export type SelectItems<TValue = any> = SelectRootItems<TValue>;

/**
 * {@link Select} の各パーツに渡す props です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectSlotProps<TValue = any> = {
  /**
   * {@link SelectArrow} に渡す props です。
   */
  readonly arrow?: SelectArrowProps | undefined;

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
  readonly itemText?: Omit<SelectItemTextProps, "children"> | undefined;

  /**
   * {@link SelectLabel} に渡す props です。
   */
  readonly label?: Omit<SelectLabelProps, "children"> | undefined;

  /**
   * {@link SelectList} に渡す props です。
   */
  readonly list?: SelectListProps<TValue> | undefined;

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
 *
 * @template TValue 項目の値の型です。
 */
export type SelectState<TValue = any> = SelectRootState<TValue>;

namespace SelectProps {
  export type Root<
    TValue = any,
    TMultiple extends boolean | undefined = boolean | undefined,
  > = Omit<SelectRootProps<TValue, TMultiple>, keyof Select>;

  export type Select<TValue = any> = {
    /**
     * リストの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link SelectRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | ISelectListItemRenderer<TValue> | undefined;

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
    slotProps?: SelectSlotProps<TValue> | undefined;
  };

  export type Trigger = Omit<SelectTriggerProps, keyof Select | keyof Root>;
}

/**
 * {@link Select} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export type SelectProps<
  TValue = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> = SelectProps.Select<TValue> & SelectProps.Root<TValue, TMultiple> & SelectProps.Trigger;

export interface IUseSelectAPI {
  /**
   * {@link SelectAPI} を作成します。
   *
   * @template TValue 項目の値の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   * @param props {@link Select} の props です。
   * @returns セレクトの API です。
   */
  <TValue = any, const TMultiple extends boolean | undefined = undefined>(
    props: SelectProps<TValue, TMultiple>,
  ): SelectAPI<TValue, TMultiple>;
}

// API
// ---

/**
 * {@link Select} を構成する各パーツの props を作成するための API です。
 *
 * @template TValue 項目の値の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export class SelectAPI<TValue = any, TMultiple extends boolean | undefined = boolean | undefined> {
  private readonly selectProps: Required<Omit<SelectProps.Select<TValue>, "slotProps">>;

  private readonly slotProps: SelectSlotProps<TValue>;

  private readonly rootProps: Required<SelectProps.Root<TValue, TMultiple>>;

  private readonly triggerProps: SelectProps.Trigger;

  /**
   * @param props {@link Select} の props です。
   * @internal
   */
  public constructor(props: SelectProps<TValue, TMultiple>) {
    const {
      label,
      children,
      slotProps = {},
      placeholder = "選択してください",
      ...rootAndTriggerProps
    } = props;
    const {
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
      ...triggerProps
    } = rootAndTriggerProps;
    this.selectProps = { label, children, placeholder };
    this.slotProps = slotProps;
    this.rootProps = {
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
    this.triggerProps = triggerProps;
  }

  private defaultListItemRenderer: ISelectListItemRenderer<TValue> = (item, index, items) => {
    if ("items" in item) {
      const groupProps = this.getGroupProps(item);
      const groupLabelProps = this.getGroupLabelProps(item);
      const separatorProps = this.getSeparatorProps(index, items);

      return (
        <React.Fragment key={getItemKey(item) ?? index}>
          <SelectGroup {...groupProps}>
            {groupLabelProps && <SelectGroupLabel {...groupLabelProps} />}
            {this.getGroupedItems(item).map(this.defaultListItemRenderer)}
          </SelectGroup>
          {separatorProps && <SelectSeparator {...separatorProps} />}
        </React.Fragment>
      );
    }

    return (
      <SelectItem {...this.getItemProps(item)} key={getItemKey(item) ?? index}>
        <SelectItemText {...this.getItemTextProps(item)} />
        <SelectItemIndicator {...this.getItemIndicatorProps()} />
      </SelectItem>
    );
  };

  /**
   * {@link SelectArrow} に渡す props を取得します。
   */
  public getArrowProps(): Omit<SelectArrowProps, "children"> {
    const { arrow: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link SelectBackdrop} に渡す props を取得します。
   */
  public getBackdropProps(): Omit<SelectBackdropProps, "children"> {
    const { backdrop: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link SelectContent} に渡す props を取得します。
   */
  public getContentProps(): Omit<SelectContentProps, "children"> {
    const { content: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link SelectGroupLabel} に渡す props を取得します。
   *
   * 表示する内容がないときは `null` を返します。
   *
   * @param item グループです。
   */
  public getGroupLabelProps(item: SelectListItemObjectGroup<TValue>): SelectGroupLabelProps | null {
    const { groupLabel: baseProps = {} } = this.slotProps;
    const { label } = item;
    if (isLikelyVisibleNode(label)) {
      return {
        ...baseProps,
        children: label,
      };
    }

    return null;
  }

  /**
   * {@link SelectGroup} に渡す props を取得します。
   *
   * @param item グループです。
   */
  public getGroupProps(
    item: SelectListItemObjectGroup<TValue>,
  ): Omit<SelectGroupProps, "children"> {
    const { group: baseProps = {} } = this.slotProps;
    const { items: _, label: __, ...otherGroupProps } = item;

    return mergeProps([baseProps, otherGroupProps]);
  }

  /**
   * グループに含まれる項目を取得します。
   *
   * @param item グループです。
   */
  public getGroupedItems(
    item: SelectListItemObjectGroup<TValue>,
  ): SelectListItemObjectGroup<TValue>["items"] {
    return item.items;
  }

  /**
   * {@link SelectIcon} に渡す props を取得します。
   */
  public getIconProps(): SelectIconProps {
    const { icon: props = {} } = this.slotProps;
    const { children = <ChevronIcon />, ...otherProps } = props;

    return {
      ...otherProps,
      children,
    };
  }

  /**
   * {@link SelectItemIndicator} に渡す props を取得します。
   */
  public getItemIndicatorProps(): SelectItemIndicatorProps {
    const { itemIndicator: props = {} } = this.slotProps;
    const { children = <CheckIcon />, ...otherProps } = props;

    return {
      ...otherProps,
      children,
    };
  }

  /**
   * {@link SelectItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getItemProps(item: SelectListLabeledItemObject): Omit<SelectItemProps, "children"> {
    const { item: baseProps = {} } = this.slotProps;
    const { label: _, ...otherItemProps } = item;

    return mergeProps([baseProps, otherItemProps]);
  }

  /**
   * {@link SelectItemText} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getItemTextProps(item: SelectListLabeledItemObject): SelectItemTextProps {
    const { label, value } = item;

    return {
      ...this.slotProps.itemText,
      children: toReactNode(label, String(value)),
    };
  }

  /**
   * {@link SelectLabel} に渡す props を取得します。
   *
   * 表示する内容がないときは `null` を返します。
   */
  public getLabelProps(): SelectLabelProps | null {
    const { label } = this.selectProps;
    const { label: props = {} } = this.slotProps;
    if (isLikelyVisibleNode(label)) {
      return {
        ...props,
        children: label,
      };
    }

    return null;
  }

  /**
   * {@link SelectList} に渡す props を取得します。
   */
  public getListProps(): SelectListProps<TValue> {
    const { children: defaultChildren } = this.selectProps;
    const { children = defaultChildren, ...otherProps } = this.slotProps.list ?? {};

    return {
      ...otherProps,
      children: children ?? this.defaultListItemRenderer,
    };
  }

  /**
   * {@link SelectPortal} に渡す props を取得します。
   */
  public getPortalProps(): Omit<SelectPortalProps, "children"> {
    const { portal: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link SelectPositioner} に渡す props を取得します。
   */
  public getPositionerProps(): Omit<SelectPositionerProps, "children"> {
    const {
      side = "bottom",
      align = "start",
      sideOffset = 8,
      alignItemWithTrigger = true,
      ...otherPositionerProps
    } = this.slotProps.positioner ?? {};

    return {
      ...otherPositionerProps,
      side,
      align,
      sideOffset,
      alignItemWithTrigger,
    };
  }

  /**
   * {@link SelectRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<SelectRootProps<TValue, TMultiple>, "children"> {
    return this.rootProps;
  }

  /**
   * {@link SelectScrollDownArrow} に渡す props を取得します。
   */
  public getScrollDownArrowProps(): SelectScrollDownArrowProps {
    const { scrollDownArrow: props = {} } = this.slotProps;
    const { children = <ChevronIcon />, ...otherProps } = props;

    return {
      ...otherProps,
      children,
    };
  }

  /**
   * {@link SelectScrollUpArrow} に渡す props を取得します。
   */
  public getScrollUpArrowProps(): SelectScrollUpArrowProps {
    const { scrollUpArrow: props = {} } = this.slotProps;
    const { children = <ChevronIcon style={{ rotate: "180deg" }} />, ...otherProps } = props;

    return {
      ...otherProps,
      children,
    };
  }

  /**
   * {@link SelectSeparator} に渡す props を取得します。
   *
   * 末尾のグループでは表示しないため `null` を返します。
   *
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   */
  public getSeparatorProps(index: number, items: readonly any[]): SelectSeparatorProps | null {
    if (index >= items.length - 1) {
      return null;
    }

    return this.slotProps.separator ?? {};
  }

  /**
   * {@link SelectTrigger} に渡す props を取得します。
   */
  public getTriggerProps(): Omit<SelectTriggerProps, "children"> {
    return this.triggerProps;
  }

  /**
   * {@link SelectValue} に渡す props を取得します。
   */
  public getValueProps(): SelectValueProps {
    const { placeholder } = this.selectProps;
    const { value: props = {} } = this.slotProps;

    return {
      placeholder,
      ...props,
    };
  }
}

/**
 * {@link SelectAPI} を作成するフックです。
 */
export const useSelectAPI: IUseSelectAPI = function useSuiSelectAPI<
  TValue,
  TMultiple extends boolean | undefined,
>(props: SelectProps<TValue, TMultiple>) {
  return new SelectAPI(props);
};

export { SelectAPI as API, useSelectAPI as useAPI };

// Component
// ---------

export interface ISelect extends IComponent<SelectProps> {
  /**
   * @template TValue 項目の値の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   */
  <TValue = any, const TMultiple extends boolean | undefined = false>(
    props: SelectProps<TValue, TMultiple>,
  ): IComponent.Return;

  readonly useContext: IUseSelectContext;
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
              <SelectList {...api.getListProps()} />
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

export namespace Select {
  export type State<TValue = any> = SelectState<TValue>;

  export type Props<
    TValue = any,
    TMultiple extends boolean | undefined = boolean | undefined,
  > = SelectProps<TValue, TMultiple>;

  export type SlotProps<TValue = any> = SelectSlotProps<TValue>;

  export type Context<TValue = any> = SelectContext<TValue>;

  export type Actions = SelectActions;

  export type ChangeEventDetails = SelectChangeEventDetails;

  export type ChangeEventReason = SelectChangeEventReason;

  export type Item<TValue = any> = SelectRootItem<TValue>;

  export type ItemObjectGroup<TValue = any> = SelectItemObjectGroup<TValue>;

  export type Items<TValue = any> = SelectItems<TValue>;

  export type LabeledItemObject<TValue = any> = SelectLabeledItemObject<TValue>;

  export type Radius = SelectRadius;

  export type Size = SelectSize;

  export type Variant = SelectVariant;
}
