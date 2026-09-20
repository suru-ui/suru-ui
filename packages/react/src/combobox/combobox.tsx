import * as React from "react";

import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import isReactNode from "../_is-react-node.js";
import {
  isItemGroup,
  isLabeledItem,
  isPrimitiveItem,
  defaultItemToStringLabel,
  defaultItemToStringValue,
} from "../_item.js";
import mergeProps from "../_merge-props.js";
import {
  type ScrollAreaRootProps,
  type ScrollAreaThumbProps,
  type ScrollAreaCornerProps,
  type ScrollAreaContentProps,
  type ScrollAreaViewportProps,
  type ScrollAreaScrollbarProps,
  ScrollAreaRoot,
  ScrollAreaThumb,
  ScrollAreaCorner,
  ScrollAreaContent,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
} from "../scroll-area/scroll-area.parts.js";
import type { IComponent } from "../types.js";
import {
  type ComboboxContext,
  type IComboboxFilter,
  type ComboboxRootSize,
  type ComboboxChipProps,
  type ComboboxIconProps,
  type ComboboxItemProps,
  type ComboboxListProps,
  type ComboboxRootColor,
  type ComboboxRootProps,
  type ComboboxRootState,
  type ComboboxArrowProps,
  type ComboboxChipsProps,
  type ComboboxClearProps,
  type ComboboxEmptyProps,
  type ComboboxGroupProps,
  type ComboboxInputProps,
  type ComboboxLabelProps,
  type ComboboxPopupProps,
  type ComboboxRootRadius,
  type ComboboxValueProps,
  type IUseComboboxFilter,
  type ComboboxPortalProps,
  type ComboboxRootActions,
  type ComboboxRootVariant,
  type ComboboxStatusProps,
  type IUseComboboxContext,
  type ComboboxTriggerProps,
  type ComboboxBackdropProps,
  type ComboboxRootItemGroup,
  type ComboboxRootItemValue,
  type ComboboxItemLabelProps,
  type ComboboxSeparatorProps,
  type IComboboxFilteredItems,
  type ComboboxChipRemoveProps,
  type ComboboxCollectionProps,
  type ComboboxGroupLabelProps,
  type ComboboxInputGroupProps,
  type ComboboxPositionerProps,
  type IUseComboboxFilteredItems,
  type ComboboxItemIndicatorProps,
  type ComboboxRootItemLabeledValue,
  type ComboboxRootChangeEventReason,
  type ComboboxRootChangeEventDetails,
  type ComboboxRootHighlightEventReason,
  type ComboboxRootHighlightEventDetails,
  ComboboxChip,
  ComboboxIcon,
  ComboboxItem,
  ComboboxList,
  ComboboxRoot,
  ComboboxArrow,
  ComboboxChips,
  ComboboxClear,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxLabel,
  ComboboxPopup,
  ComboboxValue,
  ComboboxPortal,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxBackdrop,
  ComboboxItemLabel,
  ComboboxSeparator,
  useComboboxFilter,
  ComboboxChipRemove,
  ComboboxCollection,
  ComboboxGroupLabel,
  ComboboxInputGroup,
  ComboboxPositioner,
  useComboboxContext,
  ComboboxItemIndicator,
  IComboboxValueRenderer,
  useComboboxFilteredItems,
  IComboboxListItemRenderer,
  IComboboxCollectionItemRenderer,
} from "./combobox.parts.js";

// Types
// -----

export type ComboboxActions = ComboboxRootActions;

export type ComboboxChangeEventDetails = ComboboxRootChangeEventDetails;

export type ComboboxChangeEventReason = ComboboxRootChangeEventReason;

export type ComboboxColor = ComboboxRootColor;

export type ComboboxHighlightEventDetails = ComboboxRootHighlightEventDetails;

export type ComboboxHighlightEventReason = ComboboxRootHighlightEventReason;

export type ComboboxRadius = ComboboxRootRadius;

export type ComboboxSize = ComboboxRootSize;

export type ComboboxVariant = ComboboxRootVariant;

export type ComboboxItemGroup<TValue = any> = ComboboxRootItemGroup<TValue>;

export type ComboboxItemLabeledValue<TItem = any> = ComboboxRootItemLabeledValue<TItem>;

export type ComboboxItemValue<TItem = any> = ComboboxRootItemValue<TItem>;

/**
 * {@link Combobox} の各パーツに渡す props です。
 */
export type ComboboxSlotProps<
  TItem = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> = {
  /**
   * {@link ComboboxArrow} に渡す props です。
   */
  readonly arrow?: ComboboxArrowProps | undefined;

  /**
   * {@link ComboboxBackdrop} に渡す props です。
   */
  readonly backdrop?: Omit<ComboboxBackdropProps, "children"> | undefined;

  /**
   * {@link ComboboxChip} に渡す props です。
   */
  readonly chip?: Omit<ComboboxChipProps, "children" | "value"> | undefined;

  /**
   * {@link ComboboxChipRemove} に渡す props です。
   */
  readonly chipRemove?: ComboboxChipRemoveProps | undefined;

  /**
   * {@link ComboboxChips} に渡す props です。
   */
  readonly chips?: Omit<ComboboxChipsProps, "children"> | undefined;

  /**
   * {@link ComboboxClear} に渡す props です。
   */
  readonly clear?: ComboboxClearProps | undefined;

  /**
   * {@link ComboboxCollection} に渡す props です。
   */
  readonly collection?: ComboboxCollectionProps | undefined;

  /**
   * {@link ScrollAreaContent} に渡す props です。
   */
  readonly content?: Omit<ScrollAreaContentProps, "children"> | undefined;

  /**
   * {@link ScrollAreaCorner} に渡す props です。
   */
  readonly corner?: ScrollAreaCornerProps | undefined;

  /**
   * {@link ComboboxEmpty} に渡す props です。
   */
  readonly empty?: Omit<ComboboxEmptyProps, "children"> | undefined;

  /**
   * {@link ComboboxGroup} に渡す props です。
   */
  readonly group?: Omit<ComboboxGroupProps, "children" | "items"> | undefined;

  /**
   * {@link ComboboxGroupLabel} に渡す props です。
   */
  readonly groupLabel?: Omit<ComboboxGroupLabelProps, "children"> | undefined;

  /**
   * {@link ComboboxIcon} に渡す props です。
   */
  readonly icon?: ComboboxIconProps | undefined;

  /**
   * {@link ComboboxInput} に渡す props です。
   */
  readonly input?: ComboboxInputProps | undefined;

  /**
   * {@link ComboboxItem} に渡す props です。
   */
  readonly item?: Omit<ComboboxItemProps, "children" | "value"> | undefined;

  /**
   * {@link ComboboxItemIndicator} に渡す props です。
   */
  readonly itemIndicator?: ComboboxItemIndicatorProps | undefined;

  /**
   * {@link ComboboxItemLabel} に渡す props です。
   */
  readonly itemLabel?: ComboboxItemLabelProps | undefined;

  /**
   * {@link ComboboxLabel} に渡す props です。
   */
  readonly label?: Omit<ComboboxLabelProps, "children"> | undefined;

  /**
   * {@link ComboboxList} に渡す props です。
   */
  readonly list?: ComboboxListProps | undefined;

  /**
   * {@link ComboboxPopup} に渡す props です。
   */
  readonly popup?: Omit<ComboboxPopupProps, "children"> | undefined;

  /**
   * {@link ComboboxPortal} に渡す props です。
   */
  readonly portal?: Omit<ComboboxPortalProps, "children"> | undefined;

  /**
   * {@link ComboboxPositioner} に渡す props です。
   */
  readonly positioner?: Omit<ComboboxPositionerProps, "children"> | undefined;

  /**
   * {@link ScrollAreaRoot} に渡す props です。
   */
  readonly scrollArea?: Omit<ScrollAreaRootProps, "children"> | undefined;

  /**
   * {@link ScrollAreaScrollbar} に渡す props です。
   */
  readonly scrollbar?: Omit<ScrollAreaScrollbarProps, "children"> | undefined;

  /**
   * {@link ComboboxSeparator} に渡す props です。
   */
  readonly separator?: ComboboxSeparatorProps | undefined;

  /**
   * {@link ComboboxStatus} に渡す props です。
   */
  readonly status?: Omit<ComboboxStatusProps, "children"> | undefined;

  /**
   * {@link ScrollAreaThumb} に渡す props です。
   */
  readonly thumb?: ScrollAreaThumbProps | undefined;

  /**
   * {@link ComboboxTrigger} に渡す props です。
   */
  readonly trigger?: Omit<ComboboxTriggerProps, "children"> | undefined;

  /**
   * {@link ComboboxValue} に渡す props です。
   */
  readonly value?: ComboboxValueProps<TItem, TMultiple> | undefined;

  /**
   * {@link ScrollAreaViewport} に渡す props です。
   */
  readonly viewport?: Omit<ScrollAreaViewportProps, "children"> | undefined;
};

/**
 * {@link Combobox} の状態です。
 */
export type ComboboxState = ComboboxRootState;

namespace ComboboxProps {
  export type Combobox<TItem = any, TMultiple extends boolean | undefined = boolean | undefined> = {
    /**
     * 矢印を表示するかどうかを指定します。
     *
     * 矢印の内容や props を変更するときは {@link ComboboxProps.slotProps|slotProps.arrow} を使います。
     */
    arrow?: boolean | undefined;

    /**
     * Backdrop を表示するかどうかを指定します。
     *
     * Backdrop の内容や props を変更するときは {@link ComboboxProps.slotProps|slotProps.backdrop} を使います。
     */
    backdrop?: boolean | undefined;

    /**
     * リストが空のときだけ表示する内容です。
     */
    empty?: React.ReactNode | undefined;

    /**
     * トリガーに対応する表示ラベルです。
     */
    label?: React.ReactNode | undefined;

    /**
     * 値未選択時の代替文字列です。
     */
    // ComboboxValue と ComboboxInput 両方の placeholder で使用する可能性があるので、string 型のみを受け入れます。
    placeholder?: string | undefined;

    /**
     * グループの末尾に区切り線を表示するかどうかを指定します。
     *
     * 既定レンダラーを使うときにだけ適用されます。
     */
    separator?: boolean | undefined;

    /**
     * 各パーツに個別のpropsを渡すためのオブジェクトです。
     */
    slotProps?: ComboboxSlotProps<TItem, TMultiple> | undefined;

    /**
     * 非同期検索などの状態を読み上げる内容です。
     */
    status?: React.ReactNode | undefined;
  };

  export type InputGroup = Omit<ComboboxInputGroupProps, "children" | keyof Combobox | keyof Root>;

  export type Root<TItem = any, TMultiple extends boolean | undefined = boolean | undefined> = Omit<
    ComboboxRootProps<TItem, TMultiple>,
    "children" | keyof Combobox
  >;
}

/**
 * {@link Combobox} に渡す props です。
 *
 * @template TItem 項目の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export type ComboboxProps<
  TItem = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> = ComboboxProps.Combobox<TItem, TMultiple> &
  ComboboxProps.Root<TItem, TMultiple> &
  ComboboxProps.InputGroup;

/**
 * {@link ComboboxAPI.getCollectionProps} に渡すオプションです。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxCollectionPropsOptions<TItem = any> = {
  /**
   * 項目の既定レンダラーです。
   */
  readonly defaultItemRenderer?: IComboboxCollectionItemRenderer<TItem> | undefined;
};

/**
 * {@link ComboboxAPI.getListProps} に渡すオプションです。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxListPropsOptions<TItem = any> = {
  /**
   * 項目の既定レンダラーです。
   */
  readonly defaultItemRenderer?: IComboboxListItemRenderer<TItem> | undefined;
};

/**
 * {@link ComboboxAPI.getValueProps} に渡すオプションです。
 */
export type ComboboxValuePropsOptions<
  TItem = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> = {
  /**
   * 選択値の既定レンダラーです。
   */
  readonly defaultRenderer?: IComboboxValueRenderer<TItem, TMultiple> | undefined;
};

// API
// ---

/**
 * {@link Combobox} を構成する各パーツの props を作成するための API です。
 *
 * @template TItem 項目の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export interface ComboboxAPI<
  TItem = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> {
  /**
   * {@link ComboboxArrow} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getArrowProps(): ComboboxArrowProps | null;

  /**
   * {@link ComboboxBackdrop} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getBackdropProps(): Omit<ComboboxBackdropProps, "children"> | null;

  /**
   * {@link ComboboxChip} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  // `value` だとこのメソッドの使い方が分かりづらくなるので `item` という変数名にします。
  getChipProps<TItem = any>(item?: TItem): Omit<ComboboxChipProps<TItem>, "children">;

  /**
   * {@link ComboboxChipRemove} に渡す props を取得します。
   */
  getChipRemoveProps(): ComboboxChipRemoveProps;

  /**
   * {@link ComboboxChips} に渡す props を取得します。
   */
  getChipsProps(): Omit<ComboboxChipsProps, "children"> | null;

  /**
   * {@link ComboboxClear} に渡す props を取得します。
   */
  getClearProps(): ComboboxClearProps;

  /**
   * {@link ComboboxCollection} に渡す props を取得します。
   *
   * @param options 取得時のオプションです。
   */
  getCollectionProps<TItem = any>(
    options?: ComboboxCollectionPropsOptions<TItem>,
  ): ComboboxCollectionProps;

  /**
   * {@link ScrollAreaContent} に渡す props を取得します。
   */
  getContentProps(): Omit<ScrollAreaContentProps, "children">;

  /**
   * {@link ScrollAreaCorner} に渡す props を取得します。
   */
  getCornerProps(): ScrollAreaCornerProps;

  /**
   * {@link ComboboxEmpty} に渡す props を取得します。
   */
  getEmptyProps(): ComboboxEmptyProps;

  /**
   * {@link ComboboxGroupLabel} に渡す props を取得します。
   *
   * @param item グループの項目です。
   */
  getGroupLabelProps(item?: ComboboxItemGroup): ComboboxGroupLabelProps | null;

  /**
   * {@link ComboboxGroup} に渡す props を取得します。
   *
   * @param item グループの項目です。
   */
  getGroupProps<TItem = any>(): ComboboxGroupProps<TItem>;
  getGroupProps<TValue = any>(
    item: ComboboxItemGroup<TValue>,
  ): ComboboxGroupProps<ComboboxItemValue<TValue>>;

  /**
   * {@link ComboboxIcon} に渡す props を取得します。
   */
  getIconProps(): ComboboxIconProps;

  /**
   * {@link ComboboxInputGroup} に渡す props を取得します。
   */
  getInputGroupProps(): Omit<ComboboxInputGroupProps, "children">;

  /**
   * {@link ComboboxInput} に渡す props を取得します。
   */
  getInputProps(): ComboboxInputProps;

  /**
   * {@link ComboboxItemIndicator} に渡す props を取得します。
   */
  getItemIndicatorProps(): ComboboxItemIndicatorProps;

  /**
   * {@link ComboboxItemLabel} に渡す props を取得します。
   */
  getItemLabelProps(): ComboboxItemLabelProps;

  /**
   * {@link ComboboxItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  // `value` だとこのメソッドの使い方が分かりづらくなるので `item` という変数名にします。
  getItemProps<TItem = any>(item?: TItem): ComboboxItemProps<TItem>;

  /**
   * {@link ComboboxLabel} に渡す props を取得します。
   */
  getLabelProps(): ComboboxLabelProps | null;

  /**
   * {@link ComboboxList} に渡す props を取得します。
   *
   * @param options 取得時のオプションです。
   */
  getListProps<TItem = any>(options?: ComboboxListPropsOptions<TItem>): ComboboxListProps<TItem>;

  /**
   * {@link ComboboxPopup} に渡す props を取得します。
   */
  getPopupProps(): Omit<ComboboxPopupProps, "children">;

  /**
   * {@link ComboboxPortal} に渡す props を取得します。
   */
  getPortalProps(): Omit<ComboboxPortalProps, "children">;

  /**
   * {@link ComboboxPositioner} に渡す props を取得します。
   */
  getPositionerProps(): Omit<ComboboxPositionerProps, "children">;

  /**
   * {@link ComboboxRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<ComboboxRootProps<TItem, TMultiple>, "children">;

  /**
   * {@link ScrollAreaRoot} に渡す props を取得します。
   */
  getScrollAreaProps(): Omit<ScrollAreaRootProps, "children">;

  /**
   * {@link ScrollAreaScrollbar} に渡す props を取得します。
   */
  getScrollbarProps(): Omit<ScrollAreaScrollbarProps, "children">;

  /**
   * {@link ComboboxSeparator} に渡す props を取得します。
   *
   * `separator` が無効なときは `null` を返します。
   */
  getSeparatorProps(): ComboboxSeparatorProps | null;

  /**
   * {@link ComboboxStatus} に渡す props を取得します。
   */
  getStatusProps(): ComboboxStatusProps;

  /**
   * {@link ScrollAreaThumb} に渡す props を取得します。
   */
  getThumbProps(): ScrollAreaThumbProps;

  /**
   * {@link ComboboxTrigger} に渡す props を取得します。
   */
  getTriggerProps(): Omit<ComboboxTriggerProps, "children">;

  /**
   * {@link ComboboxValue} に渡す props を取得します。
   *
   * @param options 取得時のオプションです。
   */
  getValueProps<TItem = any>(
    options?: ComboboxValuePropsOptions<TItem, TMultiple>,
  ): ComboboxValueProps<TItem, TMultiple> | null;

  /**
   * {@link ScrollAreaViewport} に渡す props を取得します。
   */
  getViewportProps(): Omit<ScrollAreaViewportProps, "children">;
}

interface IUseComboboxAPI {
  /**
   * {@link ComboboxAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   * @param props {@link Combobox} の props です。
   * @returns コンボボックスの API です
   */
  <TItem = any, const TMultiple extends boolean | undefined = undefined>(
    props: ComboboxProps<TItem, TMultiple>,
  ): ComboboxAPI<TItem, TMultiple>;
}

/**
 * {@link ComboboxAPI} を作成するフックです。
 */
export const useComboboxAPI: IUseComboboxAPI = function useSuiComboboxAPI<
  TItem,
  TMultiple extends boolean | undefined,
>(props: ComboboxProps<TItem, TMultiple>) {
  const {
    id,
    form,
    grid,
    name,
    open,
    size,
    arrow = false,
    color,
    empty = "該当なし",
    items,
    label,
    limit,
    modal,
    value,
    filter,
    inline,
    locale,
    radius,
    status,
    variant,
    backdrop = false,
    disabled,
    inputRef,
    multiple,
    outlined,
    readOnly,
    required,
    loopFocus,
    separator = false,
    slotProps: {
      chip: chipProps = {},
      icon: iconProps = {},
      item: itemProps = {},
      list: listProps = {},
      arrow: arrowProps,
      chips: chipsProps = {},
      clear: clearProps = {},
      empty: emptyProps = {},
      group: groupProps = {},
      input: inputProps = {},
      label: labelProps = {},
      popup: popupProps = {},
      thumb: thumbProps = {},
      value: valueProps = {},
      corner: cornerProps = {},
      portal: portalProps = {},
      status: statusProps = {},
      content: contentProps = {},
      trigger: triggerProps = {},
      backdrop: backdropProps,
      viewport: viewportProps = {},
      itemLabel: itemLabelProps = {},
      scrollbar: scrollbarProps = {},
      separator: separatorProps = {},
      chipRemove: chipRemoveProps = {},
      collection: collectionProps = {},
      groupLabel: groupLabelProps = {},
      positioner: positionerProps = {},
      scrollArea: scrollAreaProps = {},
      itemIndicator: itemIndicatorProps = {},
    } = {},
    actionsRef,
    inputValue,
    defaultOpen,
    placeholder: defaultPlaceholder,
    virtualized,
    autoComplete,
    defaultValue,
    onOpenChange,
    autoHighlight,
    filteredItems,
    onValueChange,
    openOnInputClick,
    defaultInputValue,
    itemToStringLabel = defaultItemToStringLabel,
    itemToStringValue = defaultItemToStringValue,
    onItemHighlighted,
    isItemEqualToValue,
    onInputValueChange,
    highlightItemOnHover,
    onOpenChangeComplete,
    ...inputGroupProps
  } = props;

  return {
    getChipProps(item) {
      if (arguments.length > 0) {
        return {
          ...chipProps,
          value: item!,
        };
      }

      return chipProps;
    },
    getIconProps() {
      return iconProps;
    },
    getItemProps(item) {
      switch (true) {
        case isLabeledItem<ComboboxRootItemLabeledValue>(item): {
          const { label: _label, ...otherProps } = item;
          return mergeProps([itemProps, otherProps, { value: item }]);
        }

        default:
          return {
            ...itemProps,
            value: item,
          };
      }
    },
    getListProps(options) {
      const { defaultItemRenderer } = options ?? {};
      const { children = defaultItemRenderer, ...otherListProps } = listProps;

      return {
        ...otherListProps,
        children,
      };
    },
    getRootProps(): Required<ComboboxProps.Root<TItem, TMultiple>> {
      return {
        id,
        form,
        grid,
        name,
        open,
        size,
        color,
        items,
        limit,
        modal,
        value,
        filter,
        inline,
        locale,
        radius,
        variant,
        disabled,
        inputRef,
        multiple,
        outlined,
        readOnly,
        required,
        loopFocus,
        actionsRef,
        inputValue,
        defaultOpen,
        virtualized,
        autoComplete,
        defaultValue,
        onOpenChange,
        autoHighlight,
        filteredItems,
        onValueChange,
        openOnInputClick,
        defaultInputValue,
        itemToStringLabel,
        itemToStringValue,
        onItemHighlighted,
        isItemEqualToValue,
        onInputValueChange,
        highlightItemOnHover,
        onOpenChangeComplete,
      };
    },
    getArrowProps() {
      if (arrow || arrowProps) {
        return arrowProps || {};
      }

      return null;
    },
    getChipsProps() {
      if (multiple) {
        return chipsProps;
      }

      return null;
    },
    getClearProps() {
      return clearProps;
    },
    getEmptyProps() {
      return {
        ...emptyProps,
        children: empty,
      };
    },
    getGroupProps(item?: ComboboxItemGroup) {
      if (item) {
        const { label: _label, ...otherGroupProps } = item;
        return mergeProps([groupProps, otherGroupProps]);
      }

      return groupProps;
    },
    getInputProps() {
      const { placeholder = defaultPlaceholder, ...otherProps } = inputProps;

      return {
        ...otherProps,
        placeholder,
      };
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
    getPopupProps() {
      return popupProps;
    },
    getThumbProps() {
      return thumbProps;
    },
    getValueProps(
      options: ComboboxValuePropsOptions<any, TMultiple> = {},
    ): Required<ComboboxValueProps<any, TMultiple>> | null {
      if (multiple) {
        const { defaultRenderer } = options;
        const { children = defaultRenderer, placeholder = defaultPlaceholder } = valueProps;

        return {
          children,
          placeholder,
        };
      }

      return null;
    },
    getCornerProps() {
      return cornerProps;
    },
    getPortalProps() {
      return portalProps;
    },
    getStatusProps() {
      return {
        ...statusProps,
        children: status,
      };
    },
    getContentProps() {
      return contentProps;
    },
    getTriggerProps() {
      return triggerProps;
    },
    getBackdropProps() {
      if (backdrop || backdropProps) {
        return backdropProps || {};
      }

      return null;
    },
    getViewportProps() {
      return viewportProps;
    },
    getItemLabelProps() {
      return itemLabelProps;
    },
    getScrollbarProps() {
      return scrollbarProps;
    },
    getSeparatorProps() {
      if (separator) {
        return separatorProps;
      }

      return null;
    },
    getChipRemoveProps() {
      return chipRemoveProps;
    },
    getCollectionProps(options = {}) {
      const { defaultItemRenderer } = options;
      const { children = defaultItemRenderer, ...otherCollectionProps } = collectionProps;

      return {
        ...otherCollectionProps,
        children,
      };
    },
    getGroupLabelProps(item) {
      if (item) {
        const { label, ...otherProps } = item;
        if (isLikelyVisibleNode(label)) {
          return mergeProps([groupLabelProps, otherProps, { children: label }]);
        }

        return null;
      }

      return groupLabelProps;
    },
    getInputGroupProps() {
      return inputGroupProps;
    },
    getPositionerProps() {
      return positionerProps;
    },
    getScrollAreaProps() {
      const {
        // @ts-expect-error
        "data-scope": dataScope = null,
        ...otherProps
      } = scrollAreaProps;

      return {
        ...otherProps,
        "data-scope": dataScope,
      };
    },
    getItemIndicatorProps() {
      return itemIndicatorProps;
    },
  };
};

export { type ComboboxAPI as API, useComboboxAPI as useAPI };

// Component
// ---------

export interface ICombobox extends IComponent<ComboboxProps> {
  /**
   * @template TItem 項目の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   */
  <TItem = any, const TMultiple extends boolean | undefined = false>(
    props: ComboboxProps<TItem, TMultiple>,
  ): IComponent.Return;

  readonly useContext: IUseComboboxContext;

  readonly useFilter: IUseComboboxFilter;

  readonly useFilteredItems: IUseComboboxFilteredItems;
}

/**
 * 入力欄で候補を絞り込み、定義済みの項目を選択するコンポーネントです。
 *
 * `multiple` を指定すると、選択値をチップとして入力欄内に表示します。
 */
export const Combobox: ICombobox = /*#__PURE__*/ Object.assign(
  function SuiCombobox(props: ComboboxProps) {
    const api = useComboboxAPI(props);

    const defaultValueRenderer: IComboboxValueRenderer = (selectedValue: any[]) => (
      <>
        {selectedValue.map((item, index) => (
          <ComboboxChip {...api.getChipProps(item)} key={index}>
            <ComboboxItemLabel {...api.getItemLabelProps()} />
            <ComboboxChipRemove {...api.getChipRemoveProps()} />
          </ComboboxChip>
        ))}
        <ComboboxInput {...api.getInputProps()} />
      </>
    );
    const defaultListItemRenderer: IComboboxListItemRenderer = (item, index) => {
      switch (true) {
        case isItemGroup<ComboboxItemGroup>(item): {
          const groupLabelProps = api.getGroupLabelProps(item);
          const separatorProps = api.getSeparatorProps();

          return (
            <ComboboxGroup {...api.getGroupProps(item)} key={index}>
              {groupLabelProps && <ComboboxGroupLabel {...groupLabelProps} />}
              <ComboboxCollection
                {...api.getCollectionProps({ defaultItemRenderer: defaultListItemRenderer })}
              />
              {separatorProps && <ComboboxSeparator {...separatorProps} />}
            </ComboboxGroup>
          );
        }

        case isPrimitiveItem(item):
        case isLabeledItem(item):
        case !isReactNode(item):
          return (
            <ComboboxItem {...api.getItemProps(item)} key={index}>
              <ComboboxItemLabel {...api.getItemLabelProps()} />
              <ComboboxItemIndicator {...api.getItemIndicatorProps()} />
            </ComboboxItem>
          );

        default:
          return <React.Fragment key={index}>{item}</React.Fragment>;
      }
    };

    const labelProps = api.getLabelProps();
    const chipsProps = api.getChipsProps();
    const arrowProps = api.getArrowProps();
    const backdropProps = api.getBackdropProps();

    return (
      <ComboboxRoot {...api.getRootProps()}>
        {labelProps && <ComboboxLabel {...labelProps} />}
        <ComboboxInputGroup {...api.getInputGroupProps()}>
          {chipsProps ? (
            <ComboboxChips {...chipsProps}>
              <ComboboxValue
                {
                  // chipsProps が null でない時点で valueProps も null ではありません。
                  ...api.getValueProps({ defaultRenderer: defaultValueRenderer })
                }
              />
            </ComboboxChips>
          ) : (
            <ComboboxInput {...api.getInputProps()} />
          )}
          <ComboboxClear {...api.getClearProps()} />
          <ComboboxTrigger {...api.getTriggerProps()}>
            <ComboboxIcon {...api.getIconProps()} />
          </ComboboxTrigger>
        </ComboboxInputGroup>
        <ComboboxPortal {...api.getPortalProps()}>
          {backdropProps && <ComboboxBackdrop {...backdropProps} />}
          <ComboboxPositioner {...api.getPositionerProps()}>
            <ComboboxPopup {...api.getPopupProps()}>
              {arrowProps && <ComboboxArrow {...arrowProps} />}
              <ScrollAreaRoot {...api.getScrollAreaProps()}>
                <ScrollAreaViewport {...api.getViewportProps()}>
                  <ScrollAreaContent {...api.getContentProps()}>
                    <ComboboxStatus {...api.getStatusProps()} />
                    <ComboboxEmpty {...api.getEmptyProps()} />
                    <ComboboxList
                      {...api.getListProps({ defaultItemRenderer: defaultListItemRenderer })}
                    />
                  </ScrollAreaContent>
                </ScrollAreaViewport>
                <ScrollAreaScrollbar {...api.getScrollbarProps()}>
                  <ScrollAreaThumb {...api.getThumbProps()} />
                </ScrollAreaScrollbar>
                <ScrollAreaCorner {...api.getCornerProps()} />
              </ScrollAreaRoot>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>
    );
  },
  {
    useFilter: useComboboxFilter,
    useContext: useComboboxContext,
    useFilteredItems: useComboboxFilteredItems,
  },
);

export namespace Combobox {
  export type State = ComboboxState;

  export type Props<
    TValue = any,
    TMultiple extends boolean | undefined = boolean | undefined,
  > = ComboboxProps<TValue, TMultiple>;

  export type SlotProps = ComboboxSlotProps;

  export type Context = ComboboxContext;

  export type Actions = ComboboxActions;

  export type ChangeEventDetails = ComboboxChangeEventDetails;

  export type ChangeEventReason = ComboboxChangeEventReason;

  export type Color = ComboboxColor;

  export type HighlightEventDetails = ComboboxHighlightEventDetails;

  export type HighlightEventReason = ComboboxHighlightEventReason;

  export type IFilter = IComboboxFilter;

  export type IFilteredItems<TItem = any> = IComboboxFilteredItems<TItem>;

  export type ItemGroup<TValue = any> = ComboboxItemGroup<TValue>;

  export type ItemLabeledValue<TItem = any> = ComboboxItemLabeledValue<TItem>;

  export type ItemValue<TItem = any> = ComboboxItemValue<TItem>;

  export type Radius = ComboboxRadius;

  export type Size = ComboboxSize;

  export type Variant = ComboboxVariant;
}
