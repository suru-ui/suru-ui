import * as React from "react";

import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import isReactNode from "../_is-react-node.js";
import {
  getItemKey,
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
  type ComboboxAddonProps,
  type ComboboxArrowProps,
  type ComboboxChipsProps,
  type ComboboxClearProps,
  type ComboboxEmptyProps,
  type ComboboxGroupProps,
  type ComboboxInputProps,
  type ComboboxPopupProps,
  type ComboboxRootRadius,
  type ComboboxValueProps,
  type IUseComboboxFilter,
  type ComboboxItemContext,
  type ComboboxPortalProps,
  type ComboboxRootActions,
  type ComboboxRootVariant,
  type ComboboxStatusProps,
  type IUseComboboxContext,
  type ComboboxTriggerProps,
  type ComboboxBackdropProps,
  type IComboboxTriggerLabel,
  type ComboboxItemLabelProps,
  type ComboboxSeparatorProps,
  type IComboboxFilteredItems,
  type ComboboxChipRemoveProps,
  type ComboboxCollectionProps,
  type ComboboxGroupLabelProps,
  type ComboboxInputGroupProps,
  type ComboboxPositionerProps,
  type IUseComboboxItemContext,
  type ComboboxInputDisplayProps,
  type IUseComboboxFilteredItems,
  type ComboboxItemIndicatorProps,
  type ComboboxRootItemGroupObject,
  type ComboboxRootChangeEventReason,
  type ComboboxRootLabeledItemObject,
  type ComboboxRootChangeEventDetails,
  type ComboboxRootHighlightEventReason,
  type ComboboxRootHighlightEventDetails,
  ComboboxChip,
  ComboboxIcon,
  ComboboxItem,
  ComboboxList,
  ComboboxRoot,
  ComboboxAddon,
  ComboboxArrow,
  ComboboxChips,
  ComboboxClear,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
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
  ComboboxInputDisplay,
  ComboboxTriggerLabel,
  ComboboxItemIndicator,
  IComboboxValueRenderer,
  useComboboxItemContext,
  useComboboxFilteredItems,
  IComboboxListItemRenderer,
  IComboboxItemLabelRenderer,
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

export type ComboboxItemGroupObject<TValue = any> = ComboboxRootItemGroupObject<TValue>;

export type ComboboxLabeledItemObject<TItem = any> = ComboboxRootLabeledItemObject<TItem>;

/**
 * {@link Combobox} の各パーツに渡す props です。
 */
export type ComboboxSlotProps<
  TItem = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> = {
  /**
   * {@link ComboboxAddon} に渡す props です。
   */
  readonly addon?: Omit<ComboboxAddonProps, "children"> | undefined;

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
   * {@link ComboboxInputDisplay} に渡す props です。
   */
  readonly display?: Omit<ComboboxInputDisplayProps, "children" | "value"> | undefined;

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
   * ポップアップ内の {@link ComboboxInputGroup} に渡す props です。
   */
  readonly inputGroupInPopup?: Omit<ComboboxInputGroupProps, "children"> | undefined;

  /**
   * {@link ComboboxItem} に渡す props です。
   */
  readonly item?: Omit<ComboboxItemProps, "children" | "value"> | undefined;

  /**
   * {@link ComboboxItemIndicator} に渡す props です。
   */
  readonly itemIndicator?: ComboboxItemIndicatorProps | undefined;

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
     * チップに表示するラベルを生成する関数です。
     *
     * 省略時はコンボボックスの変換関数を使います。
     */
    chipLabelRenderer?: IComboboxItemLabelRenderer<TItem> | undefined;

    /**
     * リストが空のときだけ表示する内容です。
     */
    empty?: React.ReactNode | undefined;

    /**
     * 入力欄の末尾に表示する内容です。
     */
    endAddons?: Iterable<React.ReactNode> | undefined;

    /**
     * 入力欄をポップアップの中に置くかどうかを指定します。
     *
     * 有効にするとトリガーには選択値とプレースホルダーだけを表示し、検索用の入力欄はポップアップ内に描画します。
     *
     * @default false
     */
    inputInPopup?: boolean | undefined;

    /**
     * 候補リストの項目に表示するラベルを生成する関数です。
     *
     * 省略時はコンボボックスの変換関数を使います。
     */
    itemLabelRenderer?: IComboboxItemLabelRenderer<TItem> | undefined;

    /**
     * 複数選択時に項目の選択後も入力欄の絞り込みを維持し、ポップアップを開いたままにするかどうかを指定します。
     *
     * 有効にすると項目押下による閉じる要求を取り消します。
     * 入力欄がポップアップの外にある場合の絞り込み維持に相当します。
     *
     * @default false
     */
    keepFilterOnSelect?: boolean | undefined;

    /**
     * トリガーまたは入力欄の上に表示するラベルです。
     */
    label?: React.ReactNode | undefined;

    /**
     * 値未選択時の代替文字列です。
     */
    // ComboboxValue と ComboboxInput と ComboboxInputDisplay の placeholder で使用する可能性があるので、string 型のみを受け入れます。
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
     * 入力欄の先頭に表示する内容です。
     */
    startAddons?: Iterable<React.ReactNode> | undefined;

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

export interface IUseComboboxAPI {
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

// API
// ---

const NONE = {} as never;

/**
 * {@link Combobox} を構成する各パーツの props を作成するための API です。
 *
 * @template TItem 項目の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export class ComboboxAPI<TItem = any, TMultiple extends boolean | undefined = boolean | undefined> {
  private readonly comboboxProps: Required<
    Omit<ComboboxProps.Combobox<TItem, TMultiple>, "slotProps">
  >;

  private readonly slotProps: ComboboxSlotProps<TItem, TMultiple>;

  private readonly rootProps: Required<ComboboxProps.Root<TItem, TMultiple>>;

  private readonly inputGroupProps: ComboboxProps.InputGroup;

  /**
   * @param props {@link Combobox} の props です。
   * @internal
   */
  public constructor(props: ComboboxProps<TItem, TMultiple>) {
    const {
      arrow,
      empty,
      label,
      status,
      backdrop,
      endAddons,
      separator,
      slotProps = {},
      placeholder,
      startAddons,
      inputInPopup,
      chipLabelRenderer,
      itemLabelRenderer,
      ...rootAndInputGroupProps
    } = props;
    const {
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
      keepFilterOnSelect,
      onInputValueChange,
      highlightItemOnHover,
      onOpenChangeComplete,
      ...inputGroupProps
    } = rootAndInputGroupProps;
    this.comboboxProps = {
      arrow,
      empty,
      label,
      status,
      backdrop,
      endAddons,
      separator,
      placeholder,
      startAddons,
      inputInPopup,
      chipLabelRenderer,
      itemLabelRenderer,
      keepFilterOnSelect,
    };
    this.slotProps = slotProps;
    this.rootProps = {
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
    this.inputGroupProps = inputGroupProps;
  }

  private defaultValueRenderer: IComboboxValueRenderer = (selectedValue, ctx) => {
    if (this.isInputInPopup()) {
      if (ctx.multiple) {
        const items: readonly any[] = selectedValue ?? [];

        return (
          <ComboboxChips {...this.getChipsProps()}>
            {items.map((item, index) => (
              <ComboboxChip {...this.getChipProps(item)} key={getItemKey(item) ?? index}>
                <ComboboxItemLabel {...this.getChipLabelProps()} />
                <ComboboxChipRemove {...this.getChipRemoveProps()} />
              </ComboboxChip>
            ))}
            <ComboboxInputDisplay {...this.getInputDisplayProps()} />
          </ComboboxChips>
        );
      }

      return <ComboboxInputDisplay {...this.getInputDisplayProps(selectedValue)} />;
    } else {
      if (ctx.multiple) {
        const items: readonly any[] = selectedValue ?? [];

        return (
          <ComboboxChips {...this.getChipsProps()}>
            {items.map((item, index) => (
              <ComboboxChip {...this.getChipProps(item)} key={getItemKey(item) ?? index}>
                <ComboboxItemLabel {...this.getChipLabelProps()} />
                <ComboboxChipRemove {...this.getChipRemoveProps()} />
              </ComboboxChip>
            ))}
            <ComboboxInput {...this.getInputProps()} />
          </ComboboxChips>
        );
      }

      return <ComboboxInput {...this.getInputProps()} />;
    }
  };

  private defaultCollectionItemRenderer: IComboboxCollectionItemRenderer = (item, index) => {
    switch (true) {
      case isItemGroup<ComboboxItemGroupObject>(item): {
        const groupLabelProps = this.getGroupLabelProps(item);
        const separatorProps = this.getSeparatorProps();

        return (
          <ComboboxGroup {...this.getGroupProps(item)} key={getItemKey(item) ?? index}>
            {groupLabelProps && <ComboboxGroupLabel {...groupLabelProps} />}
            <ComboboxCollection {...this.getCollectionProps()} />
            {separatorProps && <ComboboxSeparator {...separatorProps} />}
          </ComboboxGroup>
        );
      }

      case isPrimitiveItem(item):
      case isLabeledItem(item):
      case !isReactNode(item):
        return (
          <ComboboxItem {...this.getItemProps(item)} key={getItemKey(item) ?? index}>
            <ComboboxItemLabel {...this.getItemLabelProps()} />
            <ComboboxItemIndicator {...this.getItemIndicatorProps()} />
          </ComboboxItem>
        );

      default:
        return <React.Fragment key={getItemKey(item) ?? index}>{item}</React.Fragment>;
    }
  };

  public isInputInPopup(): boolean {
    return this.comboboxProps.inputInPopup ?? false;
  }

  /**
   * {@link ComboboxAddon} に渡す props を取得します。
   */
  public getAddonProps(addon?: undefined): Omit<ComboboxAddonProps, "children">;
  public getAddonProps(addon?: React.ReactNode): ComboboxAddonProps;
  public getAddonProps(addon: React.ReactNode = NONE): ComboboxAddonProps {
    const { addon: props = {} } = this.slotProps;

    if (addon === NONE) {
      return props;
    }

    return {
      ...props,
      children: addon,
    };
  }

  /**
   * {@link ComboboxArrow} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getArrowProps(): ComboboxArrowProps | null {
    const { arrow = false } = this.comboboxProps;
    const { arrow: props } = this.slotProps;

    if (arrow || props) {
      return props || {};
    }

    return null;
  }

  /**
   * {@link ComboboxBackdrop} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getBackdropProps(): Omit<ComboboxBackdropProps, "children"> | null {
    const { backdrop = false } = this.comboboxProps;
    const { backdrop: props } = this.slotProps;

    if (backdrop || props) {
      return props || {};
    }

    return null;
  }

  /**
   * チップ内の {@link ComboboxItemLabel} に渡す props を取得します。
   */
  public getChipLabelProps(): ComboboxItemLabelProps<TItem> {
    const { chipLabelRenderer } = this.comboboxProps;

    return {
      children: chipLabelRenderer,
    };
  }

  /**
   * {@link ComboboxChip} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  // `value` だとこのメソッドの使い方が分かりづらくなるので `item` という変数名にします。
  public getChipProps<TItem = any>(item: TItem = NONE): Omit<ComboboxChipProps<TItem>, "children"> {
    const { chip: props = {} } = this.slotProps;

    if (item === NONE) {
      return props;
    }

    return {
      ...props,
      value: item,
    };
  }

  /**
   * {@link ComboboxChipRemove} に渡す props を取得します。
   */
  public getChipRemoveProps(): ComboboxChipRemoveProps {
    const { chipRemove: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ComboboxChips} に渡す props を取得します。
   */
  public getChipsProps(): Omit<ComboboxChipsProps, "children"> {
    const { chips: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ComboboxClear} に渡す props を取得します。
   */
  public getClearProps(): ComboboxClearProps {
    const { clear: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ComboboxCollection} に渡す props を取得します。
   */
  public getCollectionProps<TItem = any>(): ComboboxCollectionProps<TItem> {
    const { children = this.defaultCollectionItemRenderer, ...otherProps } =
      this.slotProps.collection ?? {};

    return {
      ...otherProps,
      children,
    };
  }

  /**
   * {@link ScrollAreaContent} に渡す props を取得します。
   */
  public getContentProps(): Omit<ScrollAreaContentProps, "children"> {
    const { content: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ScrollAreaCorner} に渡す props を取得します。
   */
  public getCornerProps(): ScrollAreaCornerProps {
    const { corner: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ComboboxEmpty} に渡す props を取得します。
   */
  public getEmptyProps(): ComboboxEmptyProps {
    const { empty = "該当なし" } = this.comboboxProps;
    const { empty: props = {} } = this.slotProps;

    return {
      ...props,
      children: empty,
    };
  }

  /**
   * {@link ComboboxGroupLabel} に渡す props を取得します。
   *
   * @param item グループの項目です。
   */
  public getGroupLabelProps(item?: ComboboxItemGroupObject): ComboboxGroupLabelProps | null {
    const { groupLabel: baseProps = {} } = this.slotProps;

    if (item) {
      const { label, ...otherProps } = item;
      if (isLikelyVisibleNode(label)) {
        return mergeProps([baseProps, otherProps, { children: label }]);
      }

      return null;
    }

    return baseProps;
  }

  /**
   * {@link ComboboxGroup} に渡す props を取得します。
   *
   * @param item グループの項目です。
   */
  public getGroupProps<TItem = any>(): ComboboxGroupProps<TItem>;
  public getGroupProps<TValue = any>(
    item: ComboboxItemGroupObject<TValue>,
  ): ComboboxGroupProps<TValue | ComboboxLabeledItemObject<TValue>>;
  public getGroupProps(item?: ComboboxItemGroupObject) {
    const { group: baseProps = {} } = this.slotProps;

    if (item) {
      const { label: _label, ...otherProps } = item;
      return mergeProps([baseProps, otherProps]);
    }

    return baseProps;
  }

  /**
   * {@link ComboboxIcon} に渡す props を取得します。
   */
  public getIconProps(): ComboboxIconProps {
    const { icon: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ComboboxInputGroup} に渡す props を取得します。
   */
  public getInputGroupProps(): Omit<ComboboxInputGroupProps, "children"> {
    return this.inputGroupProps;
  }

  /**
   * ポップアップ内の {@link ComboboxInputGroup} に渡す props を取得します。
   */
  public getInputGroupInPopupProps(): Omit<ComboboxInputGroupProps, "children"> {
    const { inputGroupInPopup: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ComboboxInput} に渡す props を取得します。
   */
  public getInputProps(): ComboboxInputProps {
    const { placeholder: defaultPlaceholder } = this.comboboxProps;
    const { input: props = {} } = this.slotProps;
    const { placeholder = defaultPlaceholder, ...otherProps } = props;

    return {
      ...otherProps,
      placeholder,
    };
  }

  /**
   * {@link ComboboxItemIndicator} に渡す props を取得します。
   */
  public getItemIndicatorProps(): ComboboxItemIndicatorProps {
    const { itemIndicator: props = {} } = this.slotProps;

    return props;
  }

  /**
   * 候補リストの項目内の {@link ComboboxItemLabel} に渡す props を取得します。
   */
  public getItemLabelProps(): ComboboxItemLabelProps<TItem> {
    const { itemLabelRenderer } = this.comboboxProps;

    return {
      children: itemLabelRenderer,
    };
  }

  /**
   * {@link ComboboxItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  // `value` だとこのメソッドの使い方が分かりづらくなるので `item` という変数名にします。
  public getItemProps<TItem = any>(item?: TItem): ComboboxItemProps<TItem> {
    const { item: baseProps = {} } = this.slotProps;

    switch (true) {
      case isLabeledItem<ComboboxRootLabeledItemObject>(item): {
        const { label: _label, ...otherProps } = item;
        return mergeProps([baseProps, otherProps, { value: item }]);
      }

      default:
        return {
          ...baseProps,
          value: item!,
        };
    }
  }

  /**
   * ラベルとして表示する内容を取得します。
   */
  public getLabel(): React.ReactNode {
    const { label } = this.comboboxProps;

    return label;
  }

  /**
   * {@link ComboboxList} に渡す props を取得します。
   */
  public getListProps<TItem = any>(): ComboboxListProps<TItem> {
    const { children = this.defaultCollectionItemRenderer, ...otherProps } =
      this.slotProps.list ?? {};

    return {
      ...otherProps,
      children,
    };
  }

  /**
   * {@link ComboboxInputDisplay} に渡す props を取得します。
   *
   * @param value 表示する内容です。
   */
  public getInputDisplayProps(value?: React.ReactNode): ComboboxInputDisplayProps {
    const { input: { placeholder: inputPlaceholder } = {}, display: props = {} } = this.slotProps;
    const { placeholder: valuePlaceholder } = this.getValueProps();
    const { placeholder = inputPlaceholder ?? valuePlaceholder, ...otherProps } = props;

    return {
      ...otherProps,
      value,
      placeholder,
    };
  }

  /**
   * {@link ComboboxPopup} に渡す props を取得します。
   */
  public getPopupProps(): Omit<ComboboxPopupProps, "children"> {
    const { popup: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ComboboxPortal} に渡す props を取得します。
   */
  public getPortalProps(): Omit<ComboboxPortalProps, "children"> {
    const { portal: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ComboboxPositioner} に渡す props を取得します。
   */
  public getPositionerProps(): Omit<ComboboxPositionerProps, "children"> {
    const { positioner: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ComboboxRoot} に渡す props を取得します。
   */
  public getRootProps(): ComboboxProps.Root<TItem, TMultiple> {
    const { keepFilterOnSelect = false } = this.comboboxProps;
    const {
      multiple,
      onOpenChange,
      itemToStringLabel = defaultItemToStringLabel,
      itemToStringValue = defaultItemToStringValue,
      onInputValueChange,
      ...otherProps
    } = this.rootProps;
    let handleOpenChange = onOpenChange;
    let handleInputValueChange = onInputValueChange;
    if (multiple && keepFilterOnSelect) {
      if (this.isInputInPopup()) {
        handleOpenChange = (open, eventDetails) => {
          if (!open && eventDetails.reason === "item-press") {
            eventDetails.cancel();
          }

          onOpenChange?.(open, eventDetails);
        };
      } else {
        handleInputValueChange = (value, eventDetails) => {
          // @ts-expect-error .isItemPress はおそらく v1.8 以降の機能
          if (eventDetails.isItemPress) {
            eventDetails.cancel();
          }

          onInputValueChange?.(value, eventDetails);
        };
      }
    }

    return {
      ...otherProps,
      multiple,
      onOpenChange: handleOpenChange,
      itemToStringLabel,
      itemToStringValue,
      onInputValueChange: handleInputValueChange,
    };
  }

  /**
   * {@link ScrollAreaRoot} に渡す props を取得します。
   */
  public getScrollAreaProps(): Omit<ScrollAreaRootProps, "children"> {
    const { scrollArea: props = {} } = this.slotProps;
    const {
      // @ts-expect-error
      "data-scope": dataScope = null,
      ...otherProps
    } = props;
    // リテラルの余剰プロパティーチェックを避けるため変数を経由します。
    const propsWithScope = {
      ...otherProps,
      "data-scope": dataScope,
    };

    return propsWithScope;
  }

  /**
   * {@link ScrollAreaScrollbar} に渡す props を取得します。
   */
  public getScrollbarProps(): Omit<ScrollAreaScrollbarProps, "children"> {
    const { scrollbar: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ComboboxSeparator} に渡す props を取得します。
   *
   * `separator` が無効なときは `null` を返します。
   */
  public getSeparatorProps(): ComboboxSeparatorProps | null {
    const { separator = false } = this.comboboxProps;
    const { separator: props } = this.slotProps;

    if (separator || props) {
      return props || {};
    }

    return null;
  }

  /**
   * {@link ComboboxStatus} に渡す props を取得します。
   */
  public getStatusProps(): ComboboxStatusProps {
    const { status } = this.comboboxProps;
    const { status: props = {} } = this.slotProps;

    return {
      ...props,
      children: status,
    };
  }

  /**
   * {@link ScrollAreaThumb} に渡す props を取得します。
   */
  public getThumbProps(): ScrollAreaThumbProps {
    const { thumb: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ComboboxTrigger} に渡す props を取得します。
   */
  public getTriggerProps(): Omit<ComboboxTriggerProps, "children"> {
    const { trigger: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ComboboxValue} に渡す props を取得します。
   */
  public getValueProps(): Required<ComboboxValueProps<any, TMultiple>> {
    const { placeholder: defaultPlaceholder } = this.comboboxProps;
    const { value: props = {} } = this.slotProps;
    const { children = this.defaultValueRenderer, placeholder = defaultPlaceholder } = props;

    return {
      children,
      placeholder,
    };
  }

  /**
   * {@link ScrollAreaViewport} に渡す props を取得します。
   */
  public getViewportProps(): Omit<ScrollAreaViewportProps, "children"> {
    const { viewport: props = {} } = this.slotProps;

    return props;
  }

  /**
   * 入力欄の末尾に表示する {@link ComboboxAddon} の一覧を取得します。
   *
   * @template T コールバックの返り値の型です。
   * @returns コールバックの返り値の一覧です。
   */
  public mapEndAddons<T>(callback: (addon: React.ReactNode, index: number) => T): T[] {
    const { endAddons: addons = [] } = this.comboboxProps;
    const result: T[] = [];
    let index = 0;
    for (const addon of addons) {
      result.push(callback(addon, index++));
    }

    return result;
  }

  /**
   * 入力欄の先頭に表示する {@link ComboboxAddon} の一覧を取得します。
   *
   * @template T コールバックの返り値の型です。
   * @returns コールバックの返り値の一覧です。
   */
  public mapStartAddons<T>(callback: (addon: React.ReactNode, index: number) => T): T[] {
    const { startAddons: addons = [] } = this.comboboxProps;
    const result: T[] = [];
    let index = 0;
    for (const addon of addons) {
      result.push(callback(addon, index++));
    }

    return result;
  }
}

/**
 * {@link ComboboxAPI} を作成するフックです。
 */
export const useComboboxAPI: IUseComboboxAPI = function useSuiComboboxAPI<
  TItem,
  TMultiple extends boolean | undefined,
>(props: ComboboxProps<TItem, TMultiple>) {
  return new ComboboxAPI(props);
};

export { ComboboxAPI as API, useComboboxAPI as useAPI };

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

  readonly TriggerLabel: IComboboxTriggerLabel;

  readonly useContext: IUseComboboxContext;

  readonly useFilter: IUseComboboxFilter;

  readonly useFilteredItems: IUseComboboxFilteredItems;

  readonly useItemContext: IUseComboboxItemContext;
}

/**
 * 入力欄で候補を絞り込み、定義済みの項目を選択するコンポーネントです。
 */
export const Combobox: ICombobox = /*#__PURE__*/ Object.assign(
  function SuiCombobox(props: ComboboxProps) {
    const api = useComboboxAPI(props);
    const arrowProps = api.getArrowProps();
    const backdropProps = api.getBackdropProps();

    return api.isInputInPopup() ? (
      <ComboboxRoot {...api.getRootProps()}>
        {api.getLabel()}
        <ComboboxTrigger {...api.getTriggerProps()}>
          <ComboboxInputGroup {...api.getInputGroupProps()}>
            <ComboboxValue {...api.getValueProps()} />
            <ComboboxAddon {...api.getAddonProps()}>
              <ComboboxIcon {...api.getIconProps()} />
            </ComboboxAddon>
          </ComboboxInputGroup>
        </ComboboxTrigger>
        <ComboboxPortal {...api.getPortalProps()}>
          {backdropProps && <ComboboxBackdrop {...backdropProps} />}
          <ComboboxPositioner {...api.getPositionerProps()}>
            <ComboboxPopup {...api.getPopupProps()}>
              <ComboboxInputGroup {...api.getInputGroupInPopupProps()}>
                {api.mapStartAddons((addon, index) => (
                  <ComboboxAddon {...api.getAddonProps(addon)} key={getItemKey(addon) ?? index} />
                ))}
                <ComboboxInput {...api.getInputProps()} />
                <ComboboxAddon {...api.getAddonProps()}>
                  <ComboboxClear {...api.getClearProps()} />
                </ComboboxAddon>
                {api.mapEndAddons((addon, index) => (
                  <ComboboxAddon {...api.getAddonProps(addon)} key={getItemKey(addon) ?? index} />
                ))}
              </ComboboxInputGroup>
              <ScrollAreaRoot {...api.getScrollAreaProps()}>
                <ScrollAreaViewport {...api.getViewportProps()}>
                  <ScrollAreaContent {...api.getContentProps()}>
                    <ComboboxStatus {...api.getStatusProps()} />
                    <ComboboxEmpty {...api.getEmptyProps()} />
                    <ComboboxList {...api.getListProps()} />
                  </ScrollAreaContent>
                </ScrollAreaViewport>
                <ScrollAreaScrollbar {...api.getScrollbarProps()}>
                  <ScrollAreaThumb {...api.getThumbProps()} />
                </ScrollAreaScrollbar>
                <ScrollAreaCorner {...api.getCornerProps()} />
              </ScrollAreaRoot>
              {arrowProps && <ComboboxArrow {...arrowProps} />}
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>
    ) : (
      <ComboboxRoot {...api.getRootProps()}>
        {api.getLabel()}
        <ComboboxInputGroup {...api.getInputGroupProps()}>
          {api.mapStartAddons((addon, index) => (
            <ComboboxAddon {...api.getAddonProps(addon)} key={getItemKey(addon) ?? index} />
          ))}
          <ComboboxValue {...api.getValueProps()} />
          <ComboboxAddon {...api.getAddonProps()}>
            <ComboboxClear {...api.getClearProps()} />
          </ComboboxAddon>
          {api.mapEndAddons((addon, index) => (
            <ComboboxAddon {...api.getAddonProps(addon)} key={getItemKey(addon) ?? index} />
          ))}
          <ComboboxAddon {...api.getAddonProps()}>
            <ComboboxIcon {...api.getIconProps()} />
          </ComboboxAddon>
        </ComboboxInputGroup>
        <ComboboxPortal {...api.getPortalProps()}>
          {backdropProps && <ComboboxBackdrop {...backdropProps} />}
          <ComboboxPositioner {...api.getPositionerProps()}>
            <ComboboxPopup {...api.getPopupProps()}>
              <ScrollAreaRoot {...api.getScrollAreaProps()}>
                <ScrollAreaViewport {...api.getViewportProps()}>
                  <ScrollAreaContent {...api.getContentProps()}>
                    <ComboboxStatus {...api.getStatusProps()} />
                    <ComboboxEmpty {...api.getEmptyProps()} />
                    <ComboboxList {...api.getListProps()} />
                  </ScrollAreaContent>
                </ScrollAreaViewport>
                <ScrollAreaScrollbar {...api.getScrollbarProps()}>
                  <ScrollAreaThumb {...api.getThumbProps()} />
                </ScrollAreaScrollbar>
                <ScrollAreaCorner {...api.getCornerProps()} />
              </ScrollAreaRoot>
              {arrowProps && <ComboboxArrow {...arrowProps} />}
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>
    );
  },
  {
    useFilter: useComboboxFilter,
    useContext: useComboboxContext,
    TriggerLabel: ComboboxTriggerLabel,
    useItemContext: useComboboxItemContext,
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

  export type ItemContext = ComboboxItemContext;

  export type Actions = ComboboxActions;

  export type ChangeEventDetails = ComboboxChangeEventDetails;

  export type ChangeEventReason = ComboboxChangeEventReason;

  export type Color = ComboboxColor;

  export type HighlightEventDetails = ComboboxHighlightEventDetails;

  export type HighlightEventReason = ComboboxHighlightEventReason;

  export type IFilter = IComboboxFilter;

  export type IFilteredItems<TItem = any> = IComboboxFilteredItems<TItem>;

  export type ItemGroupObject<TValue = any> = ComboboxItemGroupObject<TValue>;

  export type LabeledItemObject<TItem = any> = ComboboxLabeledItemObject<TItem>;

  export type Radius = ComboboxRadius;

  export type Size = ComboboxSize;

  export type Variant = ComboboxVariant;
}
