import * as React from "react";

import { getItemLabel } from "../_get-item-label.js";
import { CheckIcon, ChevronIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { IComponent, IUseContext } from "../types.js";
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
  type SelectRootActions,
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
  type SelectRootChangeEventReason,
  type SelectRootChangeEventDetails,
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

// Types
// -----

/**
 * {@link SelectRootActions}
 */
export type SelectActions = SelectRootActions;

/**
 * {@link SelectRootChangeEventDetails}
 */
export type SelectChangeEventDetails = SelectRootChangeEventDetails;

/**
 * {@link SelectRootChangeEventReason}
 */
export type SelectChangeEventReason = SelectRootChangeEventReason;

/**
 * {@link SelectRootRadius}
 */
export type SelectRadius = SelectRootRadius;

/**
 * {@link SelectRootSize}
 */
export type SelectSize = SelectRootSize;

/**
 * {@link SelectRootVariant}
 */
export type SelectVariant = SelectRootVariant;

/**
 * {@link SelectRootItemGroup}
 *
 * @template TValue 項目の値の型です。
 */
export type SelectItemGroup<TValue = unknown> = SelectRootItemGroup<TValue>;

/**
 * {@link SelectRootItems}
 *
 * @template TValue 項目の値の型です。
 */
export type SelectItems<TValue = unknown> = SelectRootItems<TValue>;

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
  readonly icon?: Omit<SelectIconProps, "children"> | undefined;

  /**
   * {@link SelectItem} に渡す props です。
   */
  readonly item?: Omit<SelectItemProps, "children" | "value"> | undefined;

  /**
   * {@link SelectItemIndicator} に渡す props です。
   */
  readonly itemIndicator?: Omit<SelectItemIndicatorProps, "children"> | undefined;

  /**
   * {@link SelectItemText} に渡す props です。
   */
  readonly itemText?: SelectItemTextProps | undefined;

  /**
   * {@link SelectLabel} に渡す props です。
   */
  readonly label?: SelectLabelProps | undefined;

  /**
   * {@link SelectList} に渡す props です。
   */
  readonly list?: Omit<SelectListProps, "children"> | undefined;

  /**
   * {@link SelectPopup} に渡す props です。
   */
  readonly popup?: Omit<SelectPopupProps, "children"> | undefined;

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
  readonly scrollDownArrow?: Omit<SelectScrollDownArrowProps, "children"> | undefined;

  /**
   * {@link SelectScrollUpArrow} に渡す props です。
   */
  readonly scrollUpArrow?: Omit<SelectScrollUpArrowProps, "children"> | undefined;

  /**
   * {@link SelectSeparator} に渡す props です。
   */
  readonly separator?: Omit<SelectSeparatorProps, "children"> | undefined;

  /**
   * {@link SelectTrigger} に渡す props です。
   */
  readonly trigger?: Omit<SelectTriggerProps, "children"> | undefined;

  /**
   * {@link SelectValue} に渡す props です。
   */
  readonly value?: Omit<SelectValueProps, "children"> | undefined;
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
export type SelectProps<TValue = unknown, TMultiple extends boolean | undefined = false> = Omit<
  SelectRootProps<TValue, TMultiple>,
  "children"
> &
  Pick<SelectListProps<TValue>, "children"> & {
    /**
     * トリガーに適用するクラス名です。
     */
    className?: SelectTriggerProps["className"] | undefined;

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
     *
     * 各パーツの props が優先されます。
     */
    slotProps?: SelectSlotProps | undefined;
  };

// API
// ---

/**
 * {@link Select} を構成する各パーツの props を作成するための API です。
 *
 * @template TValue 項目の値の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export interface SelectAPI<
  TValue = unknown,
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
   * {@link SelectGroup} に渡す props を取得します。
   */
  getGroupProps(): Omit<SelectGroupProps, "children">;

  /**
   * {@link SelectGroupLabel} に渡す props を取得します。
   *
   * @param label グループの見出しです。
   */
  getGroupLabelProps(label: React.ReactNode): SelectGroupLabelProps;

  /**
   * {@link SelectIcon} に渡す props を取得します。
   */
  getIconProps(): SelectIconProps;

  /**
   * {@link SelectItem} に渡す props を取得します。
   *
   * @param item 項目の値です。
   * @param index 項目のインデックスです。
   */
  getItemProps(item: TValue, index: number): Omit<SelectItemProps, "children">;

  /**
   * {@link SelectItemIndicator} に渡す props を取得します。
   */
  getItemIndicatorProps(): SelectItemIndicatorProps;

  /**
   * {@link SelectItemText} に渡す props を取得します。
   */
  getItemTextProps(): SelectItemTextProps;

  /**
   * {@link SelectLabel} に渡す props を取得します。
   */
  getLabelProps(): SelectLabelProps | null;

  /**
   * {@link SelectList} に渡す props を取得します。
   */
  getListProps(): SelectListProps<TValue>;

  /**
   * {@link SelectPopup} に渡す props を取得します。
   */
  getPopupProps(): Omit<SelectPopupProps, "children">;

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
   */
  getSeparatorProps(): Omit<SelectSeparatorProps, "children">;

  /**
   * {@link SelectTrigger} に渡す props を取得します。
   */
  getTriggerProps(): Omit<SelectTriggerProps, "children">;

  /**
   * {@link SelectValue} に渡す props を取得します。
   */
  getValueProps(): Omit<SelectValueProps, "children">;
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
  <TValue = unknown, TMultiple extends boolean | undefined = false>(
    props: SelectProps<TValue, TMultiple>,
  ): SelectAPI<TValue, TMultiple>;
}

/**
 * {@link SelectAPI} を作成するフックです。
 */
export const useSelectAPI: IUseSelectAPI = function useSuiSelectAPI(props) {
  const {
    label,
    children,
    className,
    slotProps: {
      icon: iconProps = {},
      item: itemProps = {},
      list: listProps = {},
      arrow: arrowProps = {},
      group: groupProps = {},
      label: labelProps = {},
      popup: popupProps = {},
      value: valueProps = {},
      portal: portalProps = {},
      trigger: triggerProps = {},
      backdrop: backdropProps = {},
      itemText: itemTextProps = {},
      separator: separatorProps = {},
      groupLabel: groupLabelProps = {},
      positioner: positionerProps = {},
      itemIndicator: itemIndicatorProps = {},
      scrollUpArrow: scrollUpArrowProps = {},
      scrollDownArrow: scrollDownArrowProps = {},
    } = {},
    placeholder = "選択してください",
    ...otherRootProps
  } = props;
  const { "aria-label": triggerAriaLabel, ...otherTriggerProps } = triggerProps;
  const {
    side = "bottom",
    align = "start",
    sideOffset = 8,
    alignItemWithTrigger = true,
    ...otherPositionerProps
  } = positionerProps;

  return {
    getIconProps() {
      return {
        ...iconProps,
        children: <ChevronIcon />,
      };
    },
    getItemProps(item, index) {
      return {
        ...itemProps,
        key: index,
        value: item,
      };
    },
    getListProps() {
      return {
        ...listProps,
        children,
      };
    },
    getRootProps() {
      return otherRootProps;
    },
    getArrowProps() {
      return arrowProps;
    },
    getGroupProps() {
      return groupProps;
    },
    getLabelProps() {
      if (!isLikelyVisibleNode(label) && !isLikelyVisibleNode(labelProps.children)) {
        return null;
      }

      return {
        ...labelProps,
        children: label ?? labelProps.children,
      };
    },
    getPopupProps() {
      return popupProps;
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
    getTriggerProps() {
      return {
        ...otherTriggerProps,
        className,
        "aria-label": triggerAriaLabel ?? (label === undefined ? "選択肢を選択" : undefined),
      };
    },
    getBackdropProps() {
      return backdropProps;
    },
    getItemTextProps() {
      return itemTextProps;
    },
    getSeparatorProps() {
      return separatorProps;
    },
    getGroupLabelProps(labelContent) {
      return {
        ...groupLabelProps,
        children: labelContent,
      };
    },
    getPositionerProps() {
      return {
        ...otherPositionerProps,
        side,
        align,
        sideOffset,
        alignItemWithTrigger,
      };
    },
    getItemIndicatorProps() {
      return {
        ...itemIndicatorProps,
        children: <CheckIcon />,
      };
    },
    getScrollUpArrowProps() {
      return {
        ...scrollUpArrowProps,
        children: <ChevronIcon />,
      };
    },
    getScrollDownArrowProps() {
      return {
        ...scrollDownArrowProps,
        children: <ChevronIcon />,
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
  <TValue = unknown, TMultiple extends boolean | undefined = false>(
    props: SelectProps<TValue, TMultiple>,
  ): IComponent.Return;

  /**
   * {@link useSelectContext}
   */
  readonly useContext: IUseContext<SelectContext>;
}

/**
 * 定義済みの項目から値を選択するコンポーネントです。
 *
 * `value` と `onValueChange` を指定すると制御された選択欄になり、`defaultValue` を指定すると制御されていない選択欄になります。
 * `multiple` を指定すると複数の値を選択できます。項目が多く、入力による絞り込みが必要な場合は {@link Combobox} を使用してください。
 */
export const Select: ISelect = /*#__PURE__*/ Object.assign(
  function SuiSelect(props: SelectProps<unknown, boolean | undefined>) {
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
            <SelectPopup {...api.getPopupProps()}>
              <SelectScrollUpArrow {...api.getScrollUpArrowProps()} />
              <SelectArrow {...api.getArrowProps()} />
              <SelectList {...listProps}>
                {listProps.children ??
                  ((item, index, items) => {
                    if (typeof item === "object" && item !== null && "items" in item) {
                      const group = item as SelectItemGroup<unknown>;
                      const groupLabelProps =
                        group.label === undefined ? null : api.getGroupLabelProps(group.label);

                      return (
                        <React.Fragment key={index}>
                          <SelectGroup {...api.getGroupProps()}>
                            {groupLabelProps && <SelectGroupLabel {...groupLabelProps} />}
                            {group.items.map((groupItem, groupIndex) => {
                              const otherItemProps = api.getItemProps(groupItem, groupIndex);
                              const { children: textChildren, ...otherTextProps } =
                                api.getItemTextProps();
                              const { children: indicatorChildren, ...otherIndicatorProps } =
                                api.getItemIndicatorProps();

                              return (
                                <SelectItem key={groupIndex} {...otherItemProps}>
                                  <SelectItemIndicator {...otherIndicatorProps}>
                                    {indicatorChildren}
                                  </SelectItemIndicator>
                                  <SelectItemText {...otherTextProps}>
                                    {textChildren ?? getItemLabel(groupItem)}
                                  </SelectItemText>
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                          {index < items.length - 1 && (
                            <SelectSeparator {...api.getSeparatorProps()} />
                          )}
                        </React.Fragment>
                      );
                    }

                    const otherItemProps = api.getItemProps(item, index);
                    const { children: textChildren, ...otherTextProps } = api.getItemTextProps();
                    const { children: indicatorChildren, ...otherIndicatorProps } =
                      api.getItemIndicatorProps();

                    return (
                      <SelectItem key={index} {...otherItemProps}>
                        <SelectItemIndicator {...otherIndicatorProps}>
                          {indicatorChildren}
                        </SelectItemIndicator>
                        <SelectItemText {...otherTextProps}>
                          {textChildren ?? getItemLabel(item)}
                        </SelectItemText>
                      </SelectItem>
                    );
                  })}
              </SelectList>
              <SelectScrollDownArrow {...api.getScrollDownArrowProps()} />
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
   * {@link SelectState}
   */
  export type State = SelectState;

  /**
   * {@link SelectProps}
   *
   * @template TValue 項目の値の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   */
  export type Props<TValue = unknown, TMultiple extends boolean | undefined = false> = SelectProps<
    TValue,
    TMultiple
  >;

  /**
   * {@link SelectSlotProps}
   */
  export type SlotProps = SelectSlotProps;

  /**
   * {@link SelectContext}
   */
  export type Context<TValue = any> = SelectContext<TValue>;

  /**
   * {@link SelectActions}
   */
  export type Actions = SelectActions;

  /**
   * {@link SelectChangeEventDetails}
   */
  export type ChangeEventDetails = SelectChangeEventDetails;

  /**
   * {@link SelectChangeEventReason}
   */
  export type ChangeEventReason = SelectChangeEventReason;

  /**
   * {@link SelectItemGroup}
   */
  export type ItemGroup<TValue = unknown> = SelectItemGroup<TValue>;

  /**
   * {@link SelectItems}
   */
  export type Items<TValue = unknown> = SelectItems<TValue>;

  /**
   * {@link SelectRadius}
   */
  export type Radius = SelectRadius;

  /**
   * {@link SelectSize}
   */
  export type Size = SelectSize;

  /**
   * {@link SelectVariant}
   */
  export type Variant = SelectVariant;
}
