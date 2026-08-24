import * as React from "react";

import type { IComponent, IUseContext } from "../../types.js";
import { getItemLabel } from "../_get-item-label.js";
import { isItemGroup } from "./_item-group.js";
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
  type AutocompleteThumbProps,
  type AutocompleteCornerProps,
  type AutocompletePortalProps,
  type AutocompleteRootActions,
  type AutocompleteRootVariant,
  type AutocompleteContentProps,
  type AutocompleteViewportProps,
  type AutocompleteScrollbarProps,
  type AutocompleteCollectionProps,
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
   * {@link AutocompleteCollection} に渡すプロパティーです。
   */
  readonly collection?: Omit<AutocompleteCollectionProps, "children"> | undefined;

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
   * {@link AutocompleteGroup} に渡すプロパティーです。
   */
  readonly group?: Omit<AutocompleteGroupProps, "children" | "items"> | undefined;

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

export type AutocompleteItemPartsProps =
  | {
      readonly item: AutocompleteItemProps;
    }
  | {
      readonly collection: Omit<AutocompleteCollectionProps, "children">;

      readonly getItemProps: (item: any, index: number) => AutocompleteItemProps;

      readonly group: AutocompleteGroupProps;
    };

/**
 * 各パーツに渡すプロパティーをまとめたものです。
 */
export type AutocompletePartsProps = {
  /**
   * Chevron アイコンを包む {@link AutocompleteAddon} に渡すプロパティーです。
   *
   * `children` にはデフォルトのアイコンが設定されています。
   */
  readonly chevronAddon: AutocompleteAddonProps;

  /**
   * {@link AutocompleteClear} に渡すプロパティーです。
   */
  readonly clear: AutocompleteClearProps | undefined;

  /**
   * {@link AutocompleteAddon} に渡すプロパティーです。
   */
  readonly clearAddon: AutocompleteAddonProps;

  /**
   * {@link AutocompleteContent} に渡すプロパティーです。
   */
  readonly content: AutocompleteContentProps;

  /**
   * {@link AutocompleteCorner} に渡すプロパティーです。
   */
  readonly corner: AutocompleteCornerProps;

  /**
   * {@link AutocompleteEmpty} に渡すプロパティーです。
   *
   * これを表示しないときは null になります。
   */
  readonly empty: AutocompleteEmptyProps | null;

  /**
   * 入力欄の末尾に表示する {@link AutocompleteAddon} の一覧です。
   */
  readonly endAddons: readonly AutocompleteAddonProps[];

  readonly getItemPartsProps: (item: any, index: number) => AutocompleteItemPartsProps;

  /**
   * {@link AutocompleteInput} に渡すプロパティーです。
   */
  readonly input: AutocompleteInputProps;

  /**
   * {@link AutocompleteInputGroup} に渡すプロパティーです。
   */
  readonly inputGroup: AutocompleteInputGroupProps;

  /**
   * {@link AutocompleteList} に渡すプロパティーです。
   */
  readonly list: AutocompleteListProps;

  /**
   * {@link AutocompletePopup} に渡すプロパティーです。
   */
  readonly popup: AutocompletePopupProps;

  /**
   * {@link AutocompletePortal} に渡すプロパティーです。
   */
  readonly portal: AutocompletePortalProps;

  /**
   * {@link AutocompletePositioner} に渡すプロパティーです。
   */
  readonly positioner: AutocompletePositionerProps;

  /**
   * {@link AutocompleteRoot} に渡すプロパティーです。
   */
  readonly root: AutocompleteRootProps;

  /**
   * {@link AutocompleteScrollArea} に渡すプロパティーです。
   */
  readonly scrollArea: AutocompleteScrollAreaProps;

  /**
   * {@link AutocompleteScrollbar} に渡すプロパティーです。
   */
  readonly scrollbar: AutocompleteScrollbarProps;

  /**
   * 入力欄の先頭に表示する {@link AutocompleteAddon} の一覧です。
   *
   * 内容は `children` に入ります。
   */
  readonly startAddons: readonly AutocompleteAddonProps[];

  /**
   * {@link AutocompleteThumb} に渡すプロパティーです。
   */
  readonly thumb: AutocompleteThumbProps;

  /**
   * {@link AutocompleteViewport} に渡すプロパティーです。
   */
  readonly viewport: AutocompleteViewportProps;
};

/**
 * {@link Autocomplete} の状態です。
 */
export type AutocompleteState = AutocompleteRootState;

/**
 * {@link Autocomplete} コンポーネントのプロパティーです。
 */
export type AutocompleteProps = Omit<AutocompleteRootProps, "children"> & {
  /**
   * リストが空のときだけ表示する内容です。
   */
  empty?: React.ReactNode;

  /**
   * 入力欄の末尾に表示する内容です。
   */
  endAddons?: readonly React.ReactNode[] | undefined;

  /**
   * 検索結果リストの内容です。
   */
  itemToRenderedValue?: ((item: any, index: number) => React.ReactNode) | undefined;

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

/**
 * {@link Autocomplete} の各パーツに渡すプロパティーを作るフックです。
 */
export function useAutocomplete(props: AutocompleteProps): AutocompletePartsProps {
  const {
    empty,
    slotProps: {
      item: itemProps,
      list: listProps,
      addon: addonProps,
      group: groupProps,
      clear: clearProps = {},
      empty: emptyProps,
      input: inputProps,
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
    endAddons = [],
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
    list: {
      ...listProps,
    },
    root: {
      ...otherRootProps,
      autoHighlight,
      openOnInputClick,
    },
    clear: {
      children: <SuiClearIcon />,
      "aria-label": clearAriaLabel,
      ...otherClearProps,
    },
    empty:
      "empty" in props || !!emptyProps
        ? {
            children: empty,
            ...emptyProps,
          }
        : null,
    input: {
      placeholder,
      ...inputProps,
    },
    popup: popupProps,
    thumb: thumbProps,
    corner: cornerProps,
    portal: portalProps,
    content: contentProps,
    viewport: viewportProps,
    endAddons: React.Children.map(endAddons, (children) => ({
      ...addonProps,
      children,
    }))!,
    scrollbar: scrollbarProps,
    clearAddon: {
      ...addonProps,
    },
    inputGroup: inputGroupProps,
    positioner: {
      ...otherPositionerProps,
      side,
      align,
      sideOffset,
    },
    scrollArea: scrollAreaProps,
    startAddons: React.Children.map(startAddons, (children) => ({
      ...addonProps,
      children,
    }))!,
    chevronAddon: {
      ...addonProps,
      children: <SuiChevronIcon />,
    },
    getItemPartsProps: (item, index) => {
      if (!isItemGroup(item)) {
        return {
          item: {
            ...itemProps,
            key: index,
            value: item,
            children: itemToRenderedValue(item, index),
          },
        };
      }

      return {
        group: {
          ...groupProps,
          key: index,
          items: item.items,
        },
        collection: {
          ...collectionProps,
        },
        getItemProps: (item, index) => ({
          ...itemProps,
          key: index,
          value: item,
          children: itemToRenderedValue(item, index),
        }),
      };
    },
  };
}

/**
 * {@link Autocomplete} のコンポーネント型です。
 */
interface AutocompleteType extends IComponent<AutocompleteProps> {
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
    const partsProps = useAutocomplete(props);

    return (
      <AutocompleteRoot {...partsProps.root}>
        <AutocompleteInputGroup {...partsProps.inputGroup}>
          {partsProps.startAddons.map((addonProps, index) => (
            <AutocompleteAddon key={index} {...addonProps} />
          ))}
          <AutocompleteInput {...partsProps.input} />
          <AutocompleteAddon {...partsProps.clearAddon}>
            <AutocompleteClear {...partsProps.clear} />
          </AutocompleteAddon>
          {partsProps.endAddons.map((addonProps, index) => (
            <AutocompleteAddon key={index} {...addonProps} />
          ))}
          <AutocompleteAddon {...partsProps.chevronAddon} />
        </AutocompleteInputGroup>
        <AutocompletePortal {...partsProps.portal}>
          <AutocompletePositioner {...partsProps.positioner}>
            <AutocompletePopup {...partsProps.popup}>
              {partsProps.empty && <AutocompleteEmpty {...partsProps.empty} />}
              <AutocompleteScrollArea {...partsProps.scrollArea}>
                <AutocompleteViewport {...partsProps.viewport}>
                  <AutocompleteContent {...partsProps.content}>
                    <AutocompleteList {...partsProps.list}>
                      {(item, index) => {
                        const itemPartsProps = partsProps.getItemPartsProps(item, index);
                        if ("item" in itemPartsProps) {
                          return <AutocompleteItem {...itemPartsProps.item} />;
                        }

                        return (
                          <AutocompleteGroup {...itemPartsProps.group}>
                            {item.label !== undefined && (
                              <AutocompleteGroupLabel>{item.label}</AutocompleteGroupLabel>
                            )}
                            <AutocompleteCollection {...itemPartsProps.collection}>
                              {(item, index) => (
                                <AutocompleteItem {...itemPartsProps.getItemProps(item, index)} />
                              )}
                            </AutocompleteCollection>
                          </AutocompleteGroup>
                        );
                      }}
                    </AutocompleteList>
                  </AutocompleteContent>
                </AutocompleteViewport>
                <AutocompleteScrollbar {...partsProps.scrollbar}>
                  <AutocompleteThumb {...partsProps.thumb} />
                </AutocompleteScrollbar>
                <AutocompleteCorner {...partsProps.corner} />
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
  export type Props = AutocompleteProps;

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
