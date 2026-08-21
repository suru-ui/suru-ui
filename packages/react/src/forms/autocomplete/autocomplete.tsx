import * as React from "react";

import isLikelyVisibleNode from "../../_is-likely-visible-node.js";
import type { IComponent, IUseContext } from "../../types.js";
import { getItemLabel } from "../_get-item-label.js";
import { type ItemGroup, isItemGroup } from "./_item-group.js";
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
  type AutocompleteInputProps,
  type AutocompletePopupProps,
  type AutocompleteRootRadius,
  type AutocompleteThumbProps,
  type AutocompleteCornerProps,
  type AutocompletePortalProps,
  type AutocompleteRootActions,
  type AutocompleteRootVariant,
  type AutocompleteContentProps,
  type AutocompleteViewportProps,
  type AutocompleteScrollbarProps,
  type AutocompleteInputGroupProps,
  type AutocompletePositionerProps,
  type AutocompleteScrollAreaProps,
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
  AutocompleteThumb,
  AutocompleteCorner,
  AutocompletePortal,
  AutocompleteContent,
  AutocompleteViewport,
  AutocompleteScrollbar,
  AutocompleteCollection,
  AutocompleteGroupLabel,
  AutocompleteInputGroup,
  AutocompletePositioner,
  AutocompleteScrollArea,
  useAutocompleteContext,
} from "./autocomplete.parts.jsx";

/**
 * {@link AutocompleteRootColor} です。
 */
export type AutocompleteColor = AutocompleteRootColor;

/**
 * {@link AutocompleteRootRadius} です。
 */
export type AutocompleteRadius = AutocompleteRootRadius;

/**
 * {@link AutocompleteRootSize} です。
 */
export type AutocompleteSize = AutocompleteRootSize;

/**
 * {@link AutocompleteRootVariant} です。
 */
export type AutocompleteVariant = AutocompleteRootVariant;

/**
 * {@link AutocompleteRootActions} です。
 */
export type AutocompleteActions = AutocompleteRootActions;

/**
 * {@link AutocompleteRootChangeEventReason} です。
 */
export type AutocompleteChangeEventReason = AutocompleteRootChangeEventReason;

/**
 * {@link AutocompleteRootChangeEventDetails} です。
 */
export type AutocompleteChangeEventDetails = AutocompleteRootChangeEventDetails;

/**
 * {@link AutocompleteRootHighlightEventReason} です。
 */
export type AutocompleteHighlightEventReason = AutocompleteRootHighlightEventReason;

/**
 * {@link AutocompleteRootHighlightEventDetails} です。
 */
export type AutocompleteHighlightEventDetails = AutocompleteRootHighlightEventDetails;

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
   * {@link AutocompleteContent} に渡すプロパティーです。
   */
  readonly content?: Omit<AutocompleteContentProps, "children"> | undefined;

  /**
   * {@link AutocompleteCorner} に渡すプロパティーです。
   */
  readonly corner?: AutocompleteCornerProps | undefined;

  /**
   * {@link AutocompleteEmpty} に渡すプロパティーです。
   */
  readonly empty?: AutocompleteEmptyProps | undefined;

  /**
   * {@link AutocompleteInput} に渡すプロパティーです。
   */
  readonly input?: AutocompleteInputProps | undefined;

  /**
   * {@link AutocompleteInputGroup} に渡すプロパティーです。
   */
  readonly inputGroup?: Omit<AutocompleteInputGroupProps, "children"> | undefined;

  /**
   * {@link AutocompleteItem} に渡すプロパティーです。
   */
  readonly item?: Omit<AutocompleteItemProps, "children"> | undefined;

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
   * {@link AutocompleteScrollArea} に渡すプロパティーです。
   */
  readonly scrollArea?: Omit<AutocompleteScrollAreaProps, "children"> | undefined;

  /**
   * {@link AutocompleteScrollbar} に渡すプロパティーです。
   */
  readonly scrollbar?: Omit<AutocompleteScrollbarProps, "children"> | undefined;

  /**
   * {@link AutocompleteThumb} に渡すプロパティーです。
   */
  readonly thumb?: AutocompleteThumbProps | undefined;

  /**
   * {@link AutocompleteViewport} に渡すプロパティーです。
   */
  readonly viewport?: Omit<AutocompleteViewportProps, "children"> | undefined;
};

/**
 * {@link Autocomplete} の状態です。
 */
export type AutocompleteState = AutocompleteRootState;

/**
 * {@link Autocomplete} コンポーネントのプロパティーです。
 */
export type AutocompleteProps<TItemValue = unknown> = Omit<
  AutocompleteRootProps<TItemValue>,
  "children"
> & {
  /**
   * 検索結果リストの内容です。
   *
   * - 関数: 各行の内容を、項目の値とインデックスを受け取って作ります。
   * - それ以外の React ノード: リストにそのまま表示します（`Item` を列挙する場合など）
   * - 指定しない場合: アイテムの値をそのまま各行に表示します
   */
  children?: React.ReactNode | ((item: React.ReactNode, index: number) => React.ReactNode);

  /**
   * リストが空のときだけ表示する内容です。
   */
  empty?: React.ReactNode;

  /**
   * 入力欄の末尾に表示する内容です。
   */
  endAddons?: readonly React.ReactNode[] | undefined;

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

interface AutocompleteType extends IComponent.Attributes {
  <TItems extends readonly ItemGroup[]>(
    props: Omit<AutocompleteProps<TItems[number]["items"][number]>, "items"> & {
      items: TItems;
    },
  ): IComponent.Return;
  <TItemValue>(
    props: Omit<AutocompleteProps<TItemValue>, "items"> & {
      items?: readonly TItemValue[] | undefined;
    },
  ): IComponent.Return;

  /**
   * {@link useAutocompleteContext} です。
   */
  readonly useContext: IUseContext<AutocompleteContext>;
}

/**
 * 検索文字列に応じて候補を絞り込んで表示する入力欄です。
 */
export const Autocomplete: AutocompleteType = /*#__PURE__*/ Object.assign(
  function SuiAutocomplete(props: AutocompleteProps) {
    const {
      empty,
      children: itemRenderer,
      slotProps: {
        item: itemProps,
        list: listProps,
        addon: addonProps,
        clear: clearProps = {},
        empty: emptyProps,
        input: inputProps,
        popup: popupProps,
        thumb: thumbProps,
        corner: cornerProps,
        portal: portalProps,
        content: contentProps,
        viewport: viewportProps,
        scrollbar: scrollbarProps,
        inputGroup: inputGroupProps,
        positioner: positionerProps = {},
        scrollArea: scrollAreaProps,
      } = {},
      endAddons = [],
      placeholder,
      startAddons = [],
      autoHighlight = true,
      openOnInputClick = true,
      ...rootProps
    } = props;
    const { "aria-label": clearAriaLabel = "クリア", ...otherClearProps } = clearProps;
    const {
      side = "bottom",
      align = "start",
      sideOffset = 8,
      ...otherPositionerProps
    } = positionerProps;
    const listChildren = React.useMemo<AutocompleteListProps["children"]>(() => {
      if (typeof itemRenderer !== "function" && itemRenderer !== undefined) {
        return itemRenderer;
      }

      const renderItem = itemRenderer || ((item) => getItemLabel(item));

      return (item: unknown, index: number): React.ReactNode => {
        if (!isItemGroup(item)) {
          return (
            <AutocompleteItem {...itemProps} key={index} value={item}>
              {renderItem(item as React.ReactNode, index)}
            </AutocompleteItem>
          );
        }

        const group = item;

        return (
          <AutocompleteGroup key={index} items={group.items}>
            {"label" in group && isLikelyVisibleNode(group["label"]) && (
              <AutocompleteGroupLabel>{group["label"]}</AutocompleteGroupLabel>
            )}
            <AutocompleteCollection>
              {(groupItem, groupIndex) => (
                <AutocompleteItem {...itemProps} key={groupIndex} value={groupItem}>
                  {renderItem(groupItem, groupIndex)}
                </AutocompleteItem>
              )}
            </AutocompleteCollection>
          </AutocompleteGroup>
        );
      };
    }, [itemProps, itemRenderer]);

    return (
      <AutocompleteRoot
        {...rootProps}
        autoHighlight={autoHighlight}
        openOnInputClick={openOnInputClick}
      >
        <AutocompleteInputGroup {...inputGroupProps}>
          {React.Children.map(startAddons, (addon) => (
            <AutocompleteAddon {...addonProps}>{addon}</AutocompleteAddon>
          ))}
          <AutocompleteInput placeholder={placeholder} {...inputProps} />
          <AutocompleteAddon {...addonProps}>
            <AutocompleteClear
              children={<SuiClearIcon />}
              {...otherClearProps}
              aria-label={clearAriaLabel}
            />
          </AutocompleteAddon>
          {React.Children.map(endAddons, (addon) => (
            <AutocompleteAddon {...addonProps}>{addon}</AutocompleteAddon>
          ))}
          <AutocompleteAddon {...addonProps}>
            <SuiChevronIcon />
          </AutocompleteAddon>
        </AutocompleteInputGroup>
        <AutocompletePortal {...portalProps}>
          <AutocompletePositioner
            {...otherPositionerProps}
            side={side}
            align={align}
            sideOffset={sideOffset}
          >
            <AutocompletePopup {...popupProps}>
              {("empty" in props || !!emptyProps) && (
                <AutocompleteEmpty children={empty} {...emptyProps} />
              )}
              <AutocompleteScrollArea {...scrollAreaProps}>
                <AutocompleteViewport {...viewportProps}>
                  <AutocompleteContent {...contentProps}>
                    <AutocompleteList {...listProps}>{listChildren}</AutocompleteList>
                  </AutocompleteContent>
                </AutocompleteViewport>
                <AutocompleteScrollbar {...scrollbarProps}>
                  <AutocompleteThumb {...thumbProps} />
                </AutocompleteScrollbar>
                <AutocompleteCorner {...cornerProps} />
              </AutocompleteScrollArea>
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

/**
 * {@link Autocomplete} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Autocomplete {
  /**
   * {@link AutocompleteState} です。
   */
  export type State = AutocompleteState;

  /**
   * {@link AutocompleteProps} です。
   */
  export type Props<TItemValue = unknown> = AutocompleteProps<TItemValue>;

  /**
   * {@link AutocompleteContext} です。
   */
  export type Context = AutocompleteContext;

  /**
   * {@link AutocompleteSlotProps} です。
   */
  export type SlotProps = AutocompleteSlotProps;

  /**
   * {@link AutocompleteActions} です。
   */
  export type Actions = AutocompleteActions;

  /**
   * {@link AutocompleteChangeEventDetails} です。
   */
  export type ChangeEventDetails = AutocompleteChangeEventDetails;

  /**
   * {@link AutocompleteChangeEventReason} です。
   */
  export type ChangeEventReason = AutocompleteChangeEventReason;

  /**
   * {@link AutocompleteColor} です。
   */
  export type Color = AutocompleteColor;

  /**
   * {@link AutocompleteHighlightEventDetails} です。
   */
  export type HighlightEventDetails = AutocompleteHighlightEventDetails;

  /**
   * {@link AutocompleteHighlightEventReason} です。
   */
  export type HighlightEventReason = AutocompleteHighlightEventReason;

  /**
   * {@link AutocompleteRadius} です。
   */
  export type Radius = AutocompleteRadius;

  /**
   * {@link AutocompleteSize} です。
   */
  export type Size = AutocompleteSize;

  /**
   * {@link AutocompleteVariant} です。
   */
  export type Variant = AutocompleteVariant;
}

/**
 * {@link Autocomplete} の Clear に使う既定のアイコンです。
 */
function SuiClearIcon(props: React.ComponentProps<"svg">) {
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
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

/**
 * {@link Autocomplete} の Trigger に使う既定のアイコンです。
 */
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
