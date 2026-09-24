import * as React from "react";

import { getItemLabel } from "../_get-item-label.js";
import { ClearIcon, ChevronIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import isReactNode from "../_is-react-node.js";
import { getItemKey, isItemGroup, isLabeledItem, isPrimitiveItem } from "../_item.js";
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
import { type ItemObjectGroup } from "./_autocomplete.jsx";
import {
  type AutocompleteContext,
  type IAutocompleteFilter,
  type AutocompleteRootSize,
  type AutocompleteItemProps,
  type AutocompleteListProps,
  type AutocompleteRootColor,
  type AutocompleteRootProps,
  type AutocompleteRootState,
  type AutocompleteAddonProps,
  type AutocompleteClearProps,
  type AutocompleteEmptyProps,
  type AutocompleteGroupProps,
  type AutocompleteInputProps,
  type AutocompletePopupProps,
  type AutocompleteRootRadius,
  type IUseAutocompleteFilter,
  type AutocompletePortalProps,
  type AutocompleteRootActions,
  type AutocompleteRootVariant,
  type AutocompleteStatusProps,
  type IUseAutocompleteContext,
  type IAutocompleteFilteredItems,
  type AutocompleteCollectionProps,
  type AutocompleteGroupLabelProps,
  type AutocompleteInputGroupProps,
  type AutocompletePositionerProps,
  type IUseAutocompleteFilteredItems,
  type AutocompleteRootChangeEventReason,
  type AutocompleteRootChangeEventDetails,
  type IAutocompleteCollectionItemRenderer,
  type AutocompleteRootHighlightEventReason,
  type AutocompleteRootHighlightEventDetails,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteRoot,
  AutocompleteAddon,
  AutocompleteClear,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteInput,
  AutocompletePopup,
  AutocompletePortal,
  AutocompleteStatus,
  useAutocompleteFilter,
  AutocompleteCollection,
  AutocompleteGroupLabel,
  AutocompleteInputGroup,
  AutocompletePositioner,
  useAutocompleteContext,
  useAutocompleteFilteredItems,
} from "./autocomplete.parts.js";

// Types
// -----

export type AutocompleteActions = AutocompleteRootActions;

export type AutocompleteChangeEventDetails = AutocompleteRootChangeEventDetails;

export type AutocompleteChangeEventReason = AutocompleteRootChangeEventReason;

export type AutocompleteColor = AutocompleteRootColor;

export type AutocompleteHighlightEventDetails = AutocompleteRootHighlightEventDetails;

export type AutocompleteHighlightEventReason = AutocompleteRootHighlightEventReason;

export type AutocompleteRadius = AutocompleteRootRadius;

export type AutocompleteSize = AutocompleteRootSize;

export type AutocompleteVariant = AutocompleteRootVariant;

/**
 * 関連する項目を {@link AutocompleteGroup} にまとめるためのオブジェクトです。
 *
 * @template TItem 項目の値の型です。
 */
export type AutocompleteGroupItemObject<TItem = any> = ItemObjectGroup<TItem>;

/**
 * {@link Autocomplete} の各パーツに渡す props です。
 */
export type AutocompleteSlotProps<TItem = any> = {
  /**
   * {@link AutocompleteAddon} に渡す props です。
   */
  readonly addon?: AutocompleteAddonProps | undefined;

  /**
   * {@link AutocompleteClear} に渡す props です。
   */
  readonly clear?: AutocompleteClearProps | undefined;

  /**
   * {@link AutocompleteCollection} に渡す props です。
   */
  readonly collection?: AutocompleteCollectionProps<TItem> | undefined;

  /**
   * {@link ScrollAreaContent} に渡す props です。
   */
  readonly content?: Omit<ScrollAreaContentProps, "children"> | undefined;

  /**
   * {@link ScrollAreaCorner} に渡す props です。
   */
  readonly corner?: ScrollAreaCornerProps | undefined;

  /**
   * {@link AutocompleteEmpty} に渡す props です。
   */
  readonly empty?: Omit<AutocompleteEmptyProps, "children"> | undefined;

  /**
   * {@link AutocompleteGroup} に渡す props です。
   */
  readonly group?: Omit<AutocompleteGroupProps, "children" | "items"> | undefined;

  /**
   * {@link AutocompleteGroupLabel} に渡す props です。
   */
  readonly groupLabel?: Omit<AutocompleteGroupLabelProps, "children"> | undefined;

  /**
   * {@link AutocompleteInput} に渡す props です。
   */
  readonly input?: Omit<AutocompleteInputProps, "placeholder"> | undefined;

  /**
   * {@link AutocompleteInputGroup} に渡す props です。
   */
  readonly inputGroup?: Omit<AutocompleteInputGroupProps, "children"> | undefined;

  /**
   * {@link AutocompleteItem} に渡す props です。
   */
  readonly item?: Omit<AutocompleteItemProps<TItem>, "children" | "value"> | undefined;

  /**
   * {@link AutocompleteList} に渡す props です。
   */
  readonly list?: AutocompleteListProps<TItem> | undefined;

  /**
   * {@link AutocompletePopup} に渡す props です。
   */
  readonly popup?: Omit<AutocompletePopupProps, "children"> | undefined;

  /**
   * {@link AutocompletePortal} に渡す props です。
   */
  readonly portal?: Omit<AutocompletePortalProps, "children"> | undefined;

  /**
   * {@link AutocompletePositioner} に渡す props です。
   */
  readonly positioner?: Omit<AutocompletePositionerProps, "children"> | undefined;

  /**
   * {@link ScrollAreaRoot} に渡す props です。
   */
  readonly scrollArea?: Omit<ScrollAreaRootProps, "children"> | undefined;

  /**
   * {@link ScrollAreaScrollbar} に渡す props です。
   */
  readonly scrollbar?: Omit<ScrollAreaScrollbarProps, "children"> | undefined;

  /**
   * {@link AutocompleteStatus} に渡す props です。
   */
  readonly status?: Omit<AutocompleteStatusProps, "children"> | undefined;

  /**
   * {@link ScrollAreaThumb} に渡す props です。
   */
  readonly thumb?: ScrollAreaThumbProps | undefined;

  /**
   * {@link ScrollAreaViewport} に渡す props です。
   */
  readonly viewport?: Omit<ScrollAreaViewportProps, "children"> | undefined;
};

/**
 * {@link Autocomplete} の状態です。
 */
export type AutocompleteState = AutocompleteRootState;

namespace AutocompleteProps {
  export type Autocomplete<TItem = any> = Pick<AutocompleteListProps<TItem>, "children"> & {
    /**
     * リストが空のときだけ表示する内容です。
     */
    empty?: React.ReactNode | undefined;

    /**
     * 入力欄の末尾に表示する内容です。
     */
    endAddons?: readonly React.ReactNode[] | undefined;

    /**
     * 検索結果リストの内容です。
     */
    itemToRenderedValue?: ((item: TItem, index: number) => React.ReactNode) | undefined;

    /**
     * 入力欄のプレースホルダー文字列です。
     */
    placeholder?: string | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     *
     * 各パーツの props が優先されます。
     */
    slotProps?: AutocompleteSlotProps<TItem> | undefined;

    /**
     * 入力欄の先頭に表示する内容です。
     */
    startAddons?: readonly React.ReactNode[] | undefined;

    /**
     * 非同期検索などの状態を読み上げる内容です。
     */
    status?: React.ReactNode | undefined;
  };

  export type InputGroup = Omit<
    AutocompleteInputGroupProps,
    "children" | keyof Autocomplete | keyof Root
  >;

  export type Root<TItem = any> = Omit<
    AutocompleteRootProps<TItem>,
    "children" | keyof Autocomplete
  >;
}

/**
 * {@link Autocomplete} に渡す props です。
 *
 * @template TItem 項目の値の型です。
 */
export type AutocompleteProps<TItem = any> = AutocompleteProps.Autocomplete<TItem> &
  AutocompleteProps.Root<TItem> &
  AutocompleteProps.InputGroup;

// API
// ---

/**
 * {@link Autocomplete} を構成する各パーツの props を作成するための API です。
 *
 * @template TItem 項目の値の型です。
 */
export class AutocompleteAPI<TItem = any> {
  private readonly autocompleteProps: Required<
    Omit<AutocompleteProps.Autocomplete<TItem>, "slotProps">
  >;

  private readonly slotProps: AutocompleteSlotProps<TItem>;

  private readonly rootProps: Required<AutocompleteProps.Root<TItem>>;

  private readonly inputGroupProps: AutocompleteProps.InputGroup;

  /**
   * @param props {@link Autocomplete} の props です。
   * @internal
   */
  public constructor(props: AutocompleteProps<TItem>) {
    const {
      empty,
      status,
      children,
      endAddons,
      slotProps = {},
      placeholder,
      startAddons,
      itemToRenderedValue,
      ...rootAndInputGroupProps
    } = props;
    const {
      id,
      form,
      grid,
      mode,
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
      outlined,
      readOnly,
      required,
      loopFocus,
      actionsRef,
      defaultOpen,
      virtualized,
      defaultValue,
      onOpenChange,
      autoHighlight,
      filteredItems,
      keepHighlight,
      onValueChange,
      openOnInputClick,
      itemToStringValue,
      onItemHighlighted,
      submitOnItemClick,
      highlightItemOnHover,
      onOpenChangeComplete,
      ...inputGroupProps
    } = rootAndInputGroupProps;
    this.autocompleteProps = {
      empty,
      status,
      children,
      endAddons,
      placeholder,
      startAddons,
      itemToRenderedValue,
    };
    this.slotProps = slotProps;
    this.rootProps = {
      id,
      form,
      grid,
      mode,
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
      outlined,
      readOnly,
      required,
      loopFocus,
      actionsRef,
      defaultOpen,
      virtualized,
      defaultValue,
      onOpenChange,
      autoHighlight,
      filteredItems,
      keepHighlight,
      onValueChange,
      openOnInputClick,
      itemToStringValue,
      onItemHighlighted,
      submitOnItemClick,
      highlightItemOnHover,
      onOpenChangeComplete,
    };
    this.inputGroupProps = inputGroupProps;
  }

  private defaultCollectionItemRenderer: IAutocompleteCollectionItemRenderer<TItem> = (
    item,
    index,
  ) => {
    switch (true) {
      case isItemGroup<AutocompleteGroupItemObject<TItem>>(item): {
        const groupLabelProps = this.getGroupLabelProps(item);

        return (
          <AutocompleteGroup {...this.getGroupProps(item)} key={getItemKey(item) ?? index}>
            {groupLabelProps && <AutocompleteGroupLabel {...groupLabelProps} />}
            <AutocompleteCollection {...this.getCollectionProps()} />
          </AutocompleteGroup>
        );
      }

      case isLabeledItem(item):
      case isPrimitiveItem(item):
      case !isReactNode(item):
        return (
          <AutocompleteItem {...this.getItemProps(item, index)} key={getItemKey(item) ?? index} />
        );

      default:
        return <React.Fragment key={getItemKey(item) ?? index}>{item}</React.Fragment>;
    }
  };

  /**
   * 入力欄の末尾に表示する {@link AutocompleteAddon} に渡す props を取得します。
   */
  public getChevronAddonProps(): AutocompleteAddonProps {
    const { addon: addonProps = {} } = this.slotProps;
    const { children = <ChevronIcon />, ...otherAddonProps } = addonProps;

    return {
      ...otherAddonProps,
      children,
    };
  }

  /**
   * {@link AutocompleteClear} を包む {@link AutocompleteAddon} に渡す props を取得します。
   */
  public getClearAddonProps(): AutocompleteAddonProps {
    const { addon: addonProps = {} } = this.slotProps;

    return {
      ...addonProps,
    };
  }

  /**
   * {@link AutocompleteClear} に渡す props を取得します。
   */
  public getClearProps(): AutocompleteClearProps {
    const { clear: clearProps = {} } = this.slotProps;
    const { "aria-label": clearAriaLabel = "クリア", ...otherClearProps } = clearProps;

    return {
      children: <ClearIcon />,
      "aria-label": clearAriaLabel,
      ...otherClearProps,
    };
  }

  /**
   * {@link AutocompleteCollection} に渡す props を取得します。
   */
  public getCollectionProps(): AutocompleteCollectionProps<TItem> {
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
   * {@link AutocompleteEmpty} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getEmptyProps(): AutocompleteEmptyProps | null {
    const { empty } = this.autocompleteProps;
    if (!isLikelyVisibleNode(empty)) {
      return null;
    }
    const { empty: props = {} } = this.slotProps;

    return {
      ...props,
      children: empty,
    };
  }

  /**
   * 入力欄の末尾に表示する {@link AutocompleteAddon} の一覧を取得します。
   */
  public getEndAddonsPropsList(): readonly AutocompleteAddonProps[] {
    const { endAddons = [] } = this.autocompleteProps;
    const { addon: addonProps = {} } = this.slotProps;

    return endAddons.map((children): AutocompleteAddonProps => ({
      ...addonProps,
      children,
    }));
  }

  /**
   * {@link AutocompleteGroup} に渡す props を取得します。
   *
   * @param item グループの項目です。
   */
  public getGroupProps(item?: AutocompleteGroupItemObject<TItem>): AutocompleteGroupProps {
    const { group: baseProps = {} } = this.slotProps;

    if (item) {
      const { label: _label, ...otherProps } = item;

      return mergeProps([baseProps, otherProps]);
    }

    return baseProps;
  }

  /**
   * {@link AutocompleteGroupLabel} に渡す props を取得します。
   *
   * @param item グループの項目です。
   */
  public getGroupLabelProps(
    item?: AutocompleteGroupItemObject<TItem>,
  ): AutocompleteGroupLabelProps | null {
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
   * グループ内の {@link AutocompleteItem} に渡す props を取得します。
   *
   * @param item 項目の値です。
   * @param index 項目のインデックスです。
   */
  public getGroupedItemProps(item: TItem, index: number): AutocompleteItemProps {
    return this.getItemProps(item, index);
  }

  /**
   * {@link AutocompleteInputGroup} に渡す props を取得します。
   */
  public getInputGroupProps(): Omit<AutocompleteInputGroupProps, "children"> {
    return this.inputGroupProps;
  }

  /**
   * {@link AutocompleteInput} に渡す props を取得します。
   */
  public getInputProps(): AutocompleteInputProps {
    const { placeholder } = this.autocompleteProps;
    const { input: props = {} } = this.slotProps;

    return {
      placeholder,
      ...props,
    };
  }

  /**
   * {@link AutocompleteItem} に渡す props を取得します。
   *
   * @param item 項目の値です。
   * @param index 項目のインデックスです。
   */
  public getItemProps(item: TItem, index: number): AutocompleteItemProps {
    const { itemToRenderedValue = getItemLabel } = this.autocompleteProps;
    const { item: props = {} } = this.slotProps;

    if (isLabeledItem(item)) {
      const { label: _label, ...otherProps } = item;

      return mergeProps([
        props,
        otherProps,
        { value: item, children: itemToRenderedValue(item, index) },
      ]);
    }

    return {
      ...props,
      value: item,
      children: itemToRenderedValue(item, index),
    };
  }

  /**
   * {@link AutocompleteList} に渡す props を取得します。
   */
  public getListProps(): AutocompleteListProps<TItem> {
    const { children: topChildren } = this.autocompleteProps;
    const { children = topChildren ?? this.defaultCollectionItemRenderer, ...otherProps } =
      this.slotProps.list ?? {};

    return {
      ...otherProps,
      children,
    };
  }

  /**
   * {@link AutocompletePopup} に渡す props を取得します。
   */
  public getPopupProps(): Omit<AutocompletePopupProps, "children"> {
    const { popup: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link AutocompletePortal} に渡す props を取得します。
   */
  public getPortalProps(): Omit<AutocompletePortalProps, "children"> {
    const { portal: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link AutocompletePositioner} に渡す props を取得します。
   */
  public getPositionerProps(): Omit<AutocompletePositionerProps, "children"> {
    const { positioner: props = {} } = this.slotProps;
    const { side = "bottom", align = "start", sideOffset = 8, ...otherProps } = props;

    return {
      ...otherProps,
      side,
      align,
      sideOffset,
    };
  }

  /**
   * {@link AutocompleteRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<AutocompleteRootProps<TItem>, "children"> {
    const { autoHighlight = true, openOnInputClick = true, ...otherProps } = this.rootProps;

    return {
      ...otherProps,
      autoHighlight,
      openOnInputClick,
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
   * 入力欄の先頭に表示する {@link AutocompleteAddon} の一覧を取得します。
   */
  public getStartAddonsPropsList(): readonly AutocompleteAddonProps[] {
    const { startAddons = [] } = this.autocompleteProps;
    const { addon: addonProps = {} } = this.slotProps;

    return startAddons.map((children): AutocompleteAddonProps => ({
      ...addonProps,
      children,
    }));
  }

  /**
   * {@link AutocompleteStatus} に渡す props を取得します。
   */
  public getStatusProps(): AutocompleteStatusProps {
    const { status } = this.autocompleteProps;
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
   * {@link ScrollAreaViewport} に渡す props を取得します。
   */
  public getViewportProps(): Omit<ScrollAreaViewportProps, "children"> {
    const { viewport: props = {} } = this.slotProps;

    return props;
  }
}

export interface IUseAutocompleteAPI {
  /**
   * {@link AutocompleteAPI} を作成します。
   *
   * @template TItem 項目の値の型です。
   * @param props {@link Autocomplete} の props です。
   * @returns オートコンプリートの API です
   */
  <TItem = any>(props: AutocompleteProps<TItem>): AutocompleteAPI<TItem>;
}

/**
 * {@link AutocompleteAPI} を作成するフックです。
 */
export const useAutocompleteAPI: IUseAutocompleteAPI = function useSuiAutocompleteAPI(props) {
  return new AutocompleteAPI(props);
};

export { AutocompleteAPI as API, useAutocompleteAPI as useAPI };

// Component
// ---------

interface IAutocomplete extends IComponent<AutocompleteProps> {
  /**
   * @template TItem 項目の値の型です。
   */
  <TItem = any>(props: AutocompleteProps<TItem>): IComponent.Return;

  readonly useContext: IUseAutocompleteContext;

  readonly useFilter: IUseAutocompleteFilter;

  readonly useFilteredItems: IUseAutocompleteFilteredItems;
}

/**
 * 検索文字列に応じて候補を絞り込んで表示する入力欄です。
 */
export const Autocomplete: IAutocomplete = /*#__PURE__*/ Object.assign(
  function SuiAutocomplete(props: AutocompleteProps) {
    const api = useAutocompleteAPI(props);
    const emptyProps = api.getEmptyProps();

    return (
      <AutocompleteRoot {...api.getRootProps()}>
        <AutocompleteInputGroup {...api.getInputGroupProps()}>
          {api.getStartAddonsPropsList().map((addonProps, index) => (
            <AutocompleteAddon key={index} {...addonProps} />
          ))}
          <AutocompleteInput {...api.getInputProps()} />
          <AutocompleteAddon {...api.getClearAddonProps()}>
            <AutocompleteClear {...api.getClearProps()} />
          </AutocompleteAddon>
          {api.getEndAddonsPropsList().map((addonProps, index) => (
            <AutocompleteAddon key={index} {...addonProps} />
          ))}
          <AutocompleteAddon {...api.getChevronAddonProps()} />
        </AutocompleteInputGroup>
        <AutocompletePortal {...api.getPortalProps()}>
          <AutocompletePositioner {...api.getPositionerProps()}>
            <AutocompletePopup {...api.getPopupProps()}>
              {emptyProps && <AutocompleteEmpty {...emptyProps} />}
              <ScrollAreaRoot {...api.getScrollAreaProps()}>
                <ScrollAreaViewport {...api.getViewportProps()}>
                  <ScrollAreaContent {...api.getContentProps()}>
                    <AutocompleteStatus {...api.getStatusProps()} />
                    <AutocompleteList {...api.getListProps()} />
                  </ScrollAreaContent>
                </ScrollAreaViewport>
                <ScrollAreaScrollbar {...api.getScrollbarProps()}>
                  <ScrollAreaThumb {...api.getThumbProps()} />
                </ScrollAreaScrollbar>
                <ScrollAreaCorner {...api.getCornerProps()} />
              </ScrollAreaRoot>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </AutocompleteRoot>
    );
  },
  {
    useFilter: useAutocompleteFilter,
    useContext: useAutocompleteContext,
    useFilteredItems: useAutocompleteFilteredItems,
  },
);

export namespace Autocomplete {
  export type State = AutocompleteState;

  export type Props<TItem = any> = AutocompleteProps<TItem>;

  export type SlotProps<TItem = any> = AutocompleteSlotProps<TItem>;

  export type Context = AutocompleteContext;

  export type Actions = AutocompleteActions;

  export type ChangeEventDetails = AutocompleteChangeEventDetails;

  export type ChangeEventReason = AutocompleteChangeEventReason;

  export type Color = AutocompleteColor;

  export type GroupItemObject<TItem = any> = AutocompleteGroupItemObject<TItem>;

  export type HighlightEventDetails = AutocompleteHighlightEventDetails;

  export type HighlightEventReason = AutocompleteHighlightEventReason;

  export type IFilter = IAutocompleteFilter;

  export type IFilteredItems<TItem = any> = IAutocompleteFilteredItems<TItem>;

  export type Radius = AutocompleteRadius;

  export type Size = AutocompleteSize;

  export type Variant = AutocompleteVariant;
}
