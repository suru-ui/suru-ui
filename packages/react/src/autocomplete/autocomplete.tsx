import * as React from "react";

import { getItemLabel } from "../_get-item-label.js";
import { ClearIcon, ChevronIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
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
} from "../scroll-area/scroll-area.parts.jsx";
import type { IComponent, IUseContext } from "../types.js";
import { type ItemGroup, isItemGroup } from "./_autocomplete.jsx";
import {
  type AutocompleteContext,
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
  type AutocompletePortalProps,
  type AutocompleteRootActions,
  type AutocompleteRootVariant,
  type AutocompleteCollectionProps,
  type AutocompleteInputGroupProps,
  type AutocompletePositionerProps,
  type AutocompleteRootChangeEventReason,
  type AutocompleteRootChangeEventDetails,
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
  AutocompleteCollection,
  AutocompleteGroupLabel,
  AutocompleteInputGroup,
  AutocompletePositioner,
  useAutocompleteContext,
} from "./autocomplete.parts.jsx";

// Types
// -----

/**
 * {@link AutocompleteRootActions}
 */
export type AutocompleteActions = AutocompleteRootActions;

/**
 * {@link AutocompleteRootChangeEventDetails}
 */
export type AutocompleteChangeEventDetails = AutocompleteRootChangeEventDetails;

/**
 * {@link AutocompleteRootChangeEventReason}
 */
export type AutocompleteChangeEventReason = AutocompleteRootChangeEventReason;

/**
 * {@link AutocompleteRootColor}
 */
export type AutocompleteColor = AutocompleteRootColor;

/**
 * {@link AutocompleteRootHighlightEventDetails}
 */
export type AutocompleteHighlightEventDetails = AutocompleteRootHighlightEventDetails;

/**
 * {@link AutocompleteRootHighlightEventReason}
 */
export type AutocompleteHighlightEventReason = AutocompleteRootHighlightEventReason;

/**
 * {@link AutocompleteRootRadius}
 */
export type AutocompleteRadius = AutocompleteRootRadius;

/**
 * {@link AutocompleteRootSize}
 */
export type AutocompleteSize = AutocompleteRootSize;

/**
 * {@link AutocompleteRootVariant}
 */
export type AutocompleteVariant = AutocompleteRootVariant;

/**
 * 関連する項目を {@link AutocompleteGroup} にまとめるためのオブジェクトです。
 *
 * @template TItem 項目の値の型です。
 */
export type AutocompleteGroupItem<TItem = any> = ItemGroup<TItem>;

/**
 * {@link Autocomplete} の各パーツに渡すプロパティーです。
 */
export type AutocompleteSlotProps = {
  /**
   * {@link AutocompleteAddon} に渡すプロパティーです。
   */
  readonly addon?: Omit<AutocompleteAddonProps, "children"> | undefined;

  /**
   * {@link AutocompleteClear} に渡すプロパティーです。
   */
  readonly clear?: AutocompleteClearProps | undefined;

  /**
   * {@link AutocompleteCollection} に渡すプロパティーです。
   */
  readonly collection?: Omit<AutocompleteCollectionProps, "children"> | undefined;

  /**
   * {@link ScrollAreaContent} に渡すプロパティーです。
   */
  readonly content?: Omit<ScrollAreaContentProps, "children"> | undefined;

  /**
   * {@link ScrollAreaCorner} に渡すプロパティーです。
   */
  readonly corner?: ScrollAreaCornerProps | undefined;

  /**
   * {@link AutocompleteEmpty} に渡すプロパティーです。
   */
  readonly empty?: Omit<AutocompleteEmptyProps, "children"> | undefined;

  /**
   * {@link AutocompleteGroup} に渡すプロパティーです。
   */
  readonly group?: Omit<AutocompleteGroupProps, "children" | "items"> | undefined;

  /**
   * {@link AutocompleteInput} に渡すプロパティーです。
   */
  readonly input?: Omit<AutocompleteInputProps, "placeholder"> | undefined;

  /**
   * {@link AutocompleteInputGroup} に渡すプロパティーです。
   */
  readonly inputGroup?: Omit<AutocompleteInputGroupProps, "children"> | undefined;

  /**
   * {@link AutocompleteItem} に渡すプロパティーです。
   */
  readonly item?: Omit<AutocompleteItemProps, "children" | "value"> | undefined;

  /**
   * {@link AutocompleteList} に渡すプロパティーです。
   */
  readonly list?: Omit<AutocompleteListProps, "children"> | undefined;

  /**
   * {@link AutocompletePopup} に渡すプロパティーです。
   */
  readonly popup?: Omit<AutocompletePopupProps, "children"> | undefined;

  /**
   * {@link AutocompletePortal} に渡すプロパティーです。
   */
  readonly portal?: Omit<AutocompletePortalProps, "children"> | undefined;

  /**
   * {@link AutocompletePositioner} に渡すプロパティーです。
   */
  readonly positioner?: Omit<AutocompletePositionerProps, "children"> | undefined;

  /**
   * {@link ScrollAreaRoot} に渡すプロパティーです。
   */
  readonly scrollArea?: Omit<ScrollAreaRootProps, "children"> | undefined;

  /**
   * {@link ScrollAreaScrollbar} に渡すプロパティーです。
   */
  readonly scrollbar?: Omit<ScrollAreaScrollbarProps, "children"> | undefined;

  /**
   * {@link ScrollAreaThumb} に渡すプロパティーです。
   */
  readonly thumb?: ScrollAreaThumbProps | undefined;

  /**
   * {@link ScrollAreaViewport} に渡すプロパティーです。
   */
  readonly viewport?: Omit<ScrollAreaViewportProps, "children"> | undefined;
};

/**
 * {@link Autocomplete} の状態です。
 */
export type AutocompleteState = AutocompleteRootState;

/**
 * {@link Autocomplete} に渡すプロパティーです。
 *
 * @template TItem 項目の値の型です。
 */
export type AutocompleteProps<TItem = any> = Omit<AutocompleteRootProps<TItem>, "children"> &
  Pick<AutocompleteListProps, "children"> & {
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
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: AutocompleteSlotProps | undefined;

    /**
     * 入力欄の先頭に表示する内容です。
     */
    startAddons?: readonly React.ReactNode[] | undefined;
  };

// API
// ---

/**
 * {@link Autocomplete} を構成する各パーツのプロパティーを作成するための API です。
 *
 * @template TItem 項目の値の型です。
 */
export interface AutocompleteAPI<TItem = any> {
  /**
   * 入力欄の末尾に表示する {@link AutocompleteAddon} に渡すプロパティーを取得します。
   */
  getChevronAddonProps(): AutocompleteAddonProps;

  /**
   * {@link AutocompleteClear} を包む {@link AutocompleteAddon} に渡すプロパティーを取得します。
   */
  getClearAddonProps(): AutocompleteAddonProps;

  /**
   * {@link AutocompleteClear} に渡すプロパティーを取得します。
   */
  getClearProps(): AutocompleteClearProps;

  /**
   * {@link AutocompleteCollection} に渡すプロパティーを取得します。
   */
  getCollectionProps(): Omit<AutocompleteCollectionProps, "children">;

  /**
   * {@link ScrollAreaContent} に渡すプロパティーを取得します。
   */
  getContentProps(): Omit<ScrollAreaContentProps, "children">;

  /**
   * {@link ScrollAreaCorner} に渡すプロパティーを取得します。
   */
  getCornerProps(): ScrollAreaCornerProps;

  /**
   * {@link AutocompleteEmpty} に渡すプロパティーを取得します。
   */
  getEmptyProps(): AutocompleteEmptyProps | null;

  /**
   * 入力欄の末尾に表示する {@link AutocompleteAddon} の一覧を取得します。
   */
  getEndAddonsPropsList(): readonly AutocompleteAddonProps[];

  /**
   * {@link AutocompleteGroup} に渡すプロパティーを取得します。
   *
   * @param item グループの項目です。
   * @param index 項目のインデックスです。
   */
  getGroupProps(item: AutocompleteGroupItem<TItem>, index: number): AutocompleteGroupProps;

  /**
   * グループ内の {@link AutocompleteItem} に渡すプロパティーを取得します。
   *
   * @param item 項目の値です。
   * @param index 項目のインデックスです。
   */
  getGroupedItemProps(item: TItem, index: number): AutocompleteItemProps;

  /**
   * {@link AutocompleteInputGroup} に渡すプロパティーを取得します。
   */
  getInputGroupProps(): Omit<AutocompleteInputGroupProps, "children">;

  /**
   * {@link AutocompleteInput} に渡すプロパティーを取得します。
   */
  getInputProps(): AutocompleteInputProps;

  /**
   * {@link AutocompleteItem} に渡すプロパティーを取得します。
   *
   * @param item 項目の値です。
   * @param index 項目のインデックスです。
   */
  getItemProps(item: TItem, index: number): AutocompleteItemProps;

  /**
   * {@link AutocompleteList} に渡すプロパティーを取得します。
   */
  getListProps(): AutocompleteListProps;

  /**
   * {@link AutocompletePopup} に渡すプロパティーを取得します。
   */
  getPopupProps(): Omit<AutocompletePopupProps, "children">;

  /**
   * {@link AutocompletePortal} に渡すプロパティーを取得します。
   */
  getPortalProps(): Omit<AutocompletePortalProps, "children">;

  /**
   * {@link AutocompletePositioner} に渡すプロパティーを取得します。
   */
  getPositionerProps(): Omit<AutocompletePositionerProps, "children">;

  /**
   * {@link AutocompleteRoot} に渡すプロパティーを取得します。
   */
  getRootProps(): Omit<AutocompleteRootProps<TItem>, "children">;

  /**
   * {@link ScrollAreaRoot} に渡すプロパティーを取得します。
   */
  getScrollAreaProps(): Omit<ScrollAreaRootProps, "children">;

  /**
   * {@link ScrollAreaScrollbar} に渡すプロパティーを取得します。
   */
  getScrollbarProps(): Omit<ScrollAreaScrollbarProps, "children">;

  /**
   * 入力欄の先頭に表示する {@link AutocompleteAddon} の一覧を取得します。
   */
  getStartAddonsPropsList(): readonly AutocompleteAddonProps[];

  /**
   * {@link ScrollAreaThumb} に渡すプロパティーを取得します。
   */
  getThumbProps(): ScrollAreaThumbProps;

  /**
   * {@link ScrollAreaViewport} に渡すプロパティーを取得します。
   */
  getViewportProps(): Omit<ScrollAreaViewportProps, "children">;
}

interface IUseAutocompleteAPI {
  /**
   * {@link AutocompleteAPI} を作成します。
   *
   * @template TItem 項目の値の型です。
   * @param props {@link Autocomplete} のプロパティーです。
   * @returns オートコンプリートの API です
   */
  <TItem = any>(props: AutocompleteProps<TItem>): AutocompleteAPI<TItem>;
}

/**
 * {@link AutocompleteAPI} を作成するフックです。
 */
export const useAutocompleteAPI: IUseAutocompleteAPI = function useSuiAutocompleteAPI(props) {
  const {
    empty,
    children,
    endAddons = [],
    slotProps: {
      item: itemProps = {},
      list: listProps = {},
      addon: addonProps = {},
      clear: clearProps = {},
      empty: emptyProps = {},
      group: groupProps = {},
      input: inputProps = {},
      popup: popupProps = {},
      thumb: thumbProps = {},
      corner: cornerProps = {},
      portal: portalProps = {},
      content: contentProps = {},
      viewport: viewportProps = {},
      scrollbar: scrollbarProps = {},
      collection: collectionProps = {},
      inputGroup: inputGroupProps = {},
      positioner: positionerProps = {},
      scrollArea: scrollAreaProps = {},
    } = {},
    placeholder,
    startAddons = [],
    autoHighlight = true,
    openOnInputClick = true,
    itemToRenderedValue = getItemLabel,
    ...otherRootProps
  } = props;
  const { "aria-label": clearAriaLabel = "クリア", ...otherClearProps } = clearProps;
  const {
    side = "bottom",
    align = "start",
    sideOffset = 8,
    ...otherPositionerProps
  } = positionerProps;

  return {
    getItemProps(item, index) {
      return {
        ...itemProps,
        key: index,
        value: item,
        children: itemToRenderedValue(item, index),
      };
    },
    getListProps() {
      return {
        ...listProps,
        children,
      };
    },
    getRootProps() {
      return {
        ...otherRootProps,
        autoHighlight,
        openOnInputClick,
      };
    },
    getClearProps() {
      return {
        children: <ClearIcon />,
        "aria-label": clearAriaLabel,
        ...otherClearProps,
      };
    },
    getEmptyProps() {
      if (!isLikelyVisibleNode(empty)) {
        return null;
      }

      return {
        ...emptyProps,
        children: empty,
      };
    },
    getGroupProps(item, index) {
      return {
        ...groupProps,
        key: index,
        items: item.items,
      };
    },
    getInputProps() {
      return {
        placeholder,
        ...inputProps,
      };
    },
    getPopupProps() {
      return popupProps;
    },
    getThumbProps() {
      return thumbProps;
    },
    getCornerProps() {
      return cornerProps;
    },
    getPortalProps() {
      return portalProps;
    },
    getContentProps() {
      return contentProps;
    },
    getViewportProps() {
      return viewportProps;
    },
    getScrollbarProps() {
      return scrollbarProps;
    },
    getClearAddonProps() {
      return {
        ...addonProps,
      };
    },
    getCollectionProps() {
      return collectionProps;
    },
    getInputGroupProps() {
      return inputGroupProps;
    },
    getPositionerProps() {
      return {
        ...otherPositionerProps,
        side,
        align,
        sideOffset,
      };
    },
    getScrollAreaProps() {
      return scrollAreaProps;
    },
    getGroupedItemProps(item, index) {
      return {
        ...itemProps,
        key: index,
        value: item,
        children: itemToRenderedValue(item, index),
      };
    },
    getChevronAddonProps() {
      return {
        ...addonProps,
        children: <ChevronIcon />,
      };
    },
    getEndAddonsPropsList() {
      return endAddons.map((children): AutocompleteAddonProps => ({
        ...addonProps,
        children,
      }));
    },
    getStartAddonsPropsList() {
      return startAddons.map((children): AutocompleteAddonProps => ({
        ...addonProps,
        children,
      }));
    },
  };
};

export { type AutocompleteAPI as API, useAutocompleteAPI as useAPI };

// Component
// ---------

interface IAutocomplete extends IComponent<AutocompleteProps> {
  /**
   * @template TItem 項目の値の型です。
   */
  <TItem = any>(props: AutocompleteProps<TItem>): IComponent.Return;

  /**
   * {@link useAutocompleteContext}
   */
  readonly useContext: IUseContext<AutocompleteContext>;
}

/**
 * 検索文字列に応じて候補を絞り込んで表示する入力欄です。
 */
export const Autocomplete: IAutocomplete = /*#__PURE__*/ Object.assign(
  function SuiAutocomplete(props: AutocompleteProps) {
    const api = useAutocompleteAPI(props);
    const emptyProps = api.getEmptyProps();
    const listProps = api.getListProps();

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
                    <AutocompleteList {...listProps}>
                      {listProps.children ??
                        ((item, index) => {
                          if (!isItemGroup(item)) {
                            return <AutocompleteItem {...api.getItemProps(item, index)} />;
                          }

                          return (
                            <AutocompleteGroup {...api.getGroupProps(item, index)}>
                              {item.label !== undefined && (
                                <AutocompleteGroupLabel>{item.label}</AutocompleteGroupLabel>
                              )}
                              <AutocompleteCollection {...api.getCollectionProps()}>
                                {(item, index) => (
                                  <AutocompleteItem {...api.getGroupedItemProps(item, index)} />
                                )}
                              </AutocompleteCollection>
                            </AutocompleteGroup>
                          );
                        })}
                    </AutocompleteList>
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
    useContext: useAutocompleteContext,
  },
);

export namespace Autocomplete {
  /**
   * {@link AutocompleteState}
   */
  export type State = AutocompleteState;

  /**
   * {@link AutocompleteProps}
   */
  export type Props = AutocompleteProps;

  /**
   * {@link AutocompleteSlotProps}
   */
  export type SlotProps = AutocompleteSlotProps;

  /**
   * {@link AutocompleteActions}
   */
  export type Actions = AutocompleteActions;

  /**
   * {@link AutocompleteChangeEventDetails}
   */
  export type ChangeEventDetails = AutocompleteChangeEventDetails;

  /**
   * {@link AutocompleteChangeEventReason}
   */
  export type ChangeEventReason = AutocompleteChangeEventReason;

  /**
   * {@link AutocompleteColor}
   */
  export type Color = AutocompleteColor;

  /**
   * {@link AutocompleteGroupItem}
   */
  export type GroupItem<TItem = any> = AutocompleteGroupItem<TItem>;

  /**
   * {@link AutocompleteHighlightEventDetails}
   */
  export type HighlightEventDetails = AutocompleteHighlightEventDetails;

  /**
   * {@link AutocompleteHighlightEventReason}
   */
  export type HighlightEventReason = AutocompleteHighlightEventReason;

  /**
   * {@link AutocompleteRadius}
   */
  export type Radius = AutocompleteRadius;

  /**
   * {@link AutocompleteSize}
   */
  export type Size = AutocompleteSize;

  /**
   * {@link AutocompleteVariant}
   */
  export type Variant = AutocompleteVariant;
}
