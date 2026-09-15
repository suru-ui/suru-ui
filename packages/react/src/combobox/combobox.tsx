import * as React from "react";

import { getItemLabel } from "../_get-item-label.js";
import { CheckIcon, ClearIcon, ChevronIcon } from "../_icons.jsx";
import isLikelyVisibleNode, { type LikelyVisibleNode } from "../_is-likely-visible-node.js";
import toReactNode from "../_to-react-node.js";
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
import type { IComponent, IUseContext } from "../types.js";
import { type ItemGroup, isItemGroup } from "./_combobox.jsx";
import {
  type ComboboxContext,
  type ComboboxRootSize,
  type ComboboxChipProps,
  type ComboboxIconProps,
  type ComboboxItemProps,
  type ComboboxListProps,
  type ComboboxRootColor,
  type ComboboxRootItems,
  type ComboboxRootProps,
  type ComboboxRootState,
  type ComboboxChipsProps,
  type ComboboxClearProps,
  type ComboboxEmptyProps,
  type ComboboxGroupProps,
  type ComboboxInputProps,
  type ComboboxLabelProps,
  type ComboboxPopupProps,
  type ComboboxRootRadius,
  type ComboboxValueProps,
  type ComboboxPortalProps,
  type ComboboxRootActions,
  type ComboboxRootVariant,
  type ComboboxTriggerProps,
  type ComboboxChipRemoveProps,
  type ComboboxCollectionProps,
  type ComboboxGroupLabelProps,
  type ComboboxInputGroupProps,
  type ComboboxPositionerProps,
  type ComboboxItemIndicatorProps,
  type ComboboxRootChangeEventReason,
  type ComboboxRootChangeEventDetails,
  type ComboboxRootHighlightEventReason,
  type ComboboxRootHighlightEventDetails,
  ComboboxChip,
  ComboboxIcon,
  ComboboxItem,
  ComboboxList,
  ComboboxRoot,
  ComboboxChips,
  ComboboxClear,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxLabel,
  ComboboxPopup,
  ComboboxValue,
  ComboboxPortal,
  ComboboxTrigger,
  ComboboxChipRemove,
  ComboboxCollection,
  ComboboxGroupLabel,
  ComboboxInputGroup,
  ComboboxPositioner,
  useComboboxContext,
  ComboboxItemIndicator,
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

export type ComboboxItems<TValue = unknown> = ComboboxRootItems<TValue>;

/**
 * 関連する項目を {@link ComboboxGroup} にまとめるためのオブジェクトです。
 *
 * @template TValue 項目の値の型です。
 */
export type ComboboxGroupItem<TValue = unknown> = ItemGroup<TValue>;

/**
 * {@link Combobox} の各パーツに渡すプロパティーです。
 */
export type ComboboxSlotProps = {
  /**
   * {@link ComboboxChip} に渡すプロパティーです。
   */
  readonly chip?: Omit<ComboboxChipProps, "children"> | undefined;

  /**
   * {@link ComboboxChipRemove} に渡すプロパティーです。
   */
  readonly chipRemove?: ComboboxChipRemoveProps | undefined;

  /**
   * {@link ComboboxChips} に渡すプロパティーです。
   */
  readonly chips?: Omit<ComboboxChipsProps, "children"> | undefined;

  /**
   * {@link ComboboxClear} に渡すプロパティーです。
   */
  readonly clear?: ComboboxClearProps | undefined;

  /**
   * {@link ComboboxCollection} に渡すプロパティーです。
   */
  readonly collection?: Omit<ComboboxCollectionProps, "children"> | undefined;

  /**
   * {@link ScrollAreaContent} に渡すプロパティーです。
   */
  readonly content?: Omit<ScrollAreaContentProps, "children"> | undefined;

  /**
   * {@link ScrollAreaCorner} に渡すプロパティーです。
   */
  readonly corner?: ScrollAreaCornerProps | undefined;

  /**
   * {@link ComboboxEmpty} に渡すプロパティーです。
   */
  readonly empty?: Omit<ComboboxEmptyProps, "children"> | undefined;

  /**
   * {@link ComboboxGroup} に渡すプロパティーです。
   */
  readonly group?: Omit<ComboboxGroupProps, "children" | "items"> | undefined;

  /**
   * {@link ComboboxGroupLabel} に渡すプロパティーです。
   */
  readonly groupLabel?: Omit<ComboboxGroupLabelProps, "children"> | undefined;

  /**
   * {@link ComboboxIcon} に渡すプロパティーです。
   */
  readonly icon?: ComboboxIconProps | undefined;

  /**
   * {@link ComboboxInput} に渡すプロパティーです。
   */
  readonly input?: Omit<ComboboxInputProps, "placeholder"> | undefined;

  /**
   * {@link ComboboxInputGroup} に渡すプロパティーです。
   */
  readonly inputGroup?: Omit<ComboboxInputGroupProps, "children"> | undefined;

  /**
   * {@link ComboboxItem} に渡すプロパティーです。
   */
  readonly item?: Omit<ComboboxItemProps, "children" | "value"> | undefined;

  /**
   * {@link ComboboxItemIndicator} に渡すプロパティーです。
   */
  readonly itemIndicator?: ComboboxItemIndicatorProps | undefined;

  /**
   * {@link ComboboxLabel} に渡すプロパティーです。
   */
  readonly label?: Omit<ComboboxLabelProps, "children"> | undefined;

  /**
   * {@link ComboboxList} に渡すプロパティーです。
   */
  readonly list?: Omit<ComboboxListProps, "children"> | undefined;

  /**
   * {@link ComboboxPopup} に渡すプロパティーです。
   */
  readonly popup?: Omit<ComboboxPopupProps, "children"> | undefined;

  /**
   * {@link ComboboxPortal} に渡すプロパティーです。
   */
  readonly portal?: Omit<ComboboxPortalProps, "children"> | undefined;

  /**
   * {@link ComboboxPositioner} に渡すプロパティーです。
   */
  readonly positioner?: Omit<ComboboxPositionerProps, "children"> | undefined;

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
   * {@link ComboboxTrigger} に渡すプロパティーです。
   */
  readonly trigger?: Omit<ComboboxTriggerProps, "children"> | undefined;

  /**
   * {@link ComboboxValue} に渡すプロパティーです。
   */
  readonly value?: Omit<ComboboxValueProps, "children"> | undefined;

  /**
   * {@link ScrollAreaViewport} に渡すプロパティーです。
   */
  readonly viewport?: Omit<ScrollAreaViewportProps, "children"> | undefined;
};

/**
 * {@link Combobox} の状態です。
 */
export type ComboboxState = ComboboxRootState;

/**
 * {@link Combobox} に渡すプロパティーです。
 *
 * @template TValue 項目の値の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export type ComboboxProps<TValue = unknown, TMultiple extends boolean | undefined = false> = Omit<
  ComboboxRootProps<TValue, TMultiple>,
  "children"
> &
  Pick<ComboboxListProps, "children"> & {
    /**
     * 入力欄を含むグループ要素に適用するクラス名です。
     */
    className?: ComboboxInputGroupProps["className"] | undefined;

    /**
     * リストが空のときだけ表示する内容です。
     */
    empty?: React.ReactNode | undefined;

    /**
     * トリガーに対応する表示ラベルです。
     */
    label?: React.ReactNode | undefined;

    /**
     * 入力欄のプレースホルダー文字列です。
     */
    placeholder?: string | undefined;

    /**
     * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
     *
     * 各パーツのプロパティーが優先されます。
     */
    slotProps?: ComboboxSlotProps | undefined;
  };

// API
// ---

/**
 * {@link Combobox} を構成する各パーツのプロパティーを作成するための API です。
 *
 * @template TValue 項目の値の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export interface ComboboxAPI<
  TValue = unknown,
  TMultiple extends boolean | undefined = boolean | undefined,
> {
  /**
   * {@link ComboboxChip} に渡すプロパティーを取得します。
   *
   * @param item 項目の値です。
   * @param index 項目のインデックスです。
   */
  getChipProps(item: TValue, index: number): ComboboxChipProps;

  /**
   * {@link ComboboxChipRemove} に渡すプロパティーを取得します。
   *
   * @param item 項目の値です。
   */
  getChipRemoveProps(item: TValue): ComboboxChipRemoveProps;

  /**
   * {@link ComboboxChips} に渡すプロパティーを取得します。
   */
  getChipsProps(): Omit<ComboboxChipsProps, "children"> | null;

  /**
   * {@link ComboboxClear} に渡すプロパティーを取得します。
   */
  getClearProps(): ComboboxClearProps;

  /**
   * {@link ComboboxCollection} に渡すプロパティーを取得します。
   */
  getCollectionProps(): Omit<ComboboxCollectionProps, "children">;

  /**
   * {@link ScrollAreaContent} に渡すプロパティーを取得します。
   */
  getContentProps(): Omit<ScrollAreaContentProps, "children">;

  /**
   * {@link ScrollAreaCorner} に渡すプロパティーを取得します。
   */
  getCornerProps(): ScrollAreaCornerProps;

  /**
   * {@link ComboboxEmpty} に渡すプロパティーを取得します。
   */
  getEmptyProps(): ComboboxEmptyProps | null;

  /**
   * {@link ComboboxGroupLabel} に渡すプロパティーを取得します。
   *
   * @param item グループの項目です。
   */
  getGroupLabelProps(item: ComboboxGroupItem<TValue>): ComboboxGroupLabelProps;

  /**
   * {@link ComboboxGroup} に渡すプロパティーを取得します。
   *
   * @param item グループの項目です。
   * @param index 項目のインデックスです。
   */
  getGroupProps(item: ComboboxGroupItem<TValue>, index: number): ComboboxGroupProps;

  /**
   * {@link ComboboxIcon} に渡すプロパティーを取得します。
   */
  getIconProps(): ComboboxIconProps;

  /**
   * {@link ComboboxInputGroup} に渡すプロパティーを取得します。
   */
  getInputGroupProps(): Omit<ComboboxInputGroupProps, "children">;

  /**
   * {@link ComboboxInput} に渡すプロパティーを取得します。
   */
  getInputProps(): ComboboxInputProps;

  /**
   * {@link ComboboxItemIndicator} に渡すプロパティーを取得します。
   */
  getItemIndicatorProps(): ComboboxItemIndicatorProps;

  /**
   * {@link ComboboxItem} に渡すプロパティーを取得します。
   *
   * @param item 項目の値です。
   * @param index 項目のインデックスです。
   */
  getItemProps(item: TValue, index: number): ComboboxItemProps;

  /**
   * {@link ComboboxLabel} に渡すプロパティーを取得します。
   */
  getLabelProps(): ComboboxLabelProps | null;

  /**
   * {@link ComboboxList} に渡すプロパティーを取得します。
   */
  getListProps(): Omit<ComboboxListProps, "children"> & {
    children: LikelyVisibleNode | Extract<ComboboxListProps["children"], Function> | null;
  };

  /**
   * {@link ComboboxPopup} に渡すプロパティーを取得します。
   */
  getPopupProps(): Omit<ComboboxPopupProps, "children">;

  /**
   * {@link ComboboxPortal} に渡すプロパティーを取得します。
   */
  getPortalProps(): Omit<ComboboxPortalProps, "children">;

  /**
   * {@link ComboboxPositioner} に渡すプロパティーを取得します。
   */
  getPositionerProps(): Omit<ComboboxPositionerProps, "children">;

  /**
   * {@link ComboboxRoot} に渡すプロパティーを取得します。
   */
  getRootProps(): Omit<ComboboxRootProps<TValue, TMultiple>, "children">;

  /**
   * {@link ScrollAreaRoot} に渡すプロパティーを取得します。
   */
  getScrollAreaProps(): Omit<ScrollAreaRootProps, "children">;

  /**
   * {@link ScrollAreaScrollbar} に渡すプロパティーを取得します。
   */
  getScrollbarProps(): Omit<ScrollAreaScrollbarProps, "children">;

  /**
   * {@link ScrollAreaThumb} に渡すプロパティーを取得します。
   */
  getThumbProps(): ScrollAreaThumbProps;

  /**
   * {@link ComboboxTrigger} に渡すプロパティーを取得します。
   */
  getTriggerProps(): ComboboxTriggerProps;

  /**
   * {@link ComboboxValue} に渡すプロパティーを取得します。
   */
  getValueProps(): Omit<ComboboxValueProps, "children"> | null;

  /**
   * {@link ScrollAreaViewport} に渡すプロパティーを取得します。
   */
  getViewportProps(): Omit<ScrollAreaViewportProps, "children">;
}

interface IUseComboboxAPI {
  /**
   * {@link ComboboxAPI} を作成します。
   *
   * @template TValue 項目の値の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   * @param props {@link Combobox} のプロパティーです。
   * @returns コンボボックスの API です
   */
  <TValue = unknown, TMultiple extends boolean | undefined = false>(
    props: ComboboxProps<TValue, TMultiple>,
  ): ComboboxAPI<TValue, TMultiple>;
}

/**
 * {@link ComboboxAPI} を作成するフックです。
 */
export const useComboboxAPI: IUseComboboxAPI = function useSuiComboboxAPI(props) {
  const {
    empty,
    label,
    children,
    multiple: multipleProp,
    className,
    slotProps: {
      chip: chipProps = {},
      icon: iconProps = {},
      item: itemProps = {},
      list: listProps = {},
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
      content: contentProps = {},
      trigger: triggerProps = {},
      viewport: viewportProps = {},
      scrollbar: scrollbarProps = {},
      chipRemove: chipRemoveProps = {},
      collection: collectionProps = {},
      groupLabel: groupLabelProps = {},
      inputGroup: inputGroupProps = {},
      positioner: positionerProps = {},
      scrollArea: scrollAreaProps = {},
      itemIndicator: itemIndicatorProps = {},
    } = {},
    placeholder,
    autoHighlight = true,
    openOnInputClick = true,
    itemToStringLabel,
    ...otherRootProps
  } = props;
  const { "aria-label": clearAriaLabel = "クリア", ...otherClearProps } = clearProps;
  const { "aria-label": triggerAriaLabel = "選択肢を選択", ...otherTriggerProps } = triggerProps;
  const {
    side = "bottom",
    align = "start",
    sideOffset = 8,
    ...otherPositionerProps
  } = positionerProps;
  const multiple = multipleProp === true;

  return {
    getChipProps(_item, index) {
      return {
        ...chipProps,
        key: index,
      };
    },
    getIconProps() {
      const { children = <ChevronIcon />, ...otherIconProps } = iconProps;

      return {
        ...otherIconProps,
        children,
      };
    },
    getItemProps(item, index) {
      return {
        ...itemProps,
        key: index,
        value: item,
        children: getItemLabel(item),
      };
    },
    getListProps() {
      return {
        ...listProps,
        children: typeof children === "function" ? children : toReactNode(children),
      };
    },
    getRootProps() {
      return {
        ...otherRootProps,
        multiple: multipleProp,
        autoHighlight,
        openOnInputClick,
      };
    },
    getChipsProps() {
      if (!multiple) {
        return null;
      }

      return chipsProps;
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
    getLabelProps() {
      if (!isLikelyVisibleNode(label)) {
        return null;
      }

      return {
        ...labelProps,
        children: label,
      };
    },
    getPopupProps() {
      return popupProps;
    },
    getThumbProps() {
      return thumbProps;
    },
    getValueProps() {
      if (!multiple) {
        return null;
      }

      return valueProps;
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
    getTriggerProps() {
      return {
        ...otherTriggerProps,
        "aria-label": triggerAriaLabel,
      };
    },
    getViewportProps() {
      return viewportProps;
    },
    getScrollbarProps() {
      return scrollbarProps;
    },
    getChipRemoveProps(item) {
      const itemLabel = itemToStringLabel?.(item) ?? getItemLabel(item);
      const {
        children = <ClearIcon />,
        "aria-label": ariaLabel = `${itemLabel}を削除`,
        ...otherChipRemoveProps
      } = chipRemoveProps;

      return {
        ...otherChipRemoveProps,
        children,
        "aria-label": ariaLabel,
      };
    },
    getCollectionProps() {
      return collectionProps;
    },
    getGroupLabelProps(item) {
      return {
        ...groupLabelProps,
        children: item.label,
      };
    },
    getInputGroupProps() {
      return {
        ...inputGroupProps,
        className,
      };
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
    getItemIndicatorProps() {
      const { children = <CheckIcon />, ...otherItemIndicatorProps } = itemIndicatorProps;

      return {
        ...otherItemIndicatorProps,
        children,
      };
    },
  };
};

export { type ComboboxAPI as API, useComboboxAPI as useAPI };

// Component
// ---------

interface ICombobox extends IComponent<ComboboxProps<unknown, boolean | undefined>> {
  /**
   * @template TValue 項目の値の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   */
  <TValue = unknown, TMultiple extends boolean | undefined = false>(
    props: ComboboxProps<TValue, TMultiple>,
  ): IComponent.Return;

  readonly useContext: IUseContext<ComboboxContext>;
}

/**
 * 入力欄で候補を絞り込み、定義済みの項目を選択するコンポーネントです。
 *
 * `multiple` を指定すると、選択値をチップとして入力欄内に表示します。
 */
export const Combobox: ICombobox = /*#__PURE__*/ Object.assign(
  function SuiCombobox(props: ComboboxProps<unknown, boolean | undefined>) {
    const api = useComboboxAPI(props);
    const labelProps = api.getLabelProps();
    const chipsProps = api.getChipsProps();
    const valueProps = api.getValueProps();
    const emptyProps = api.getEmptyProps();
    const listProps = api.getListProps();

    return (
      <ComboboxRoot {...api.getRootProps()}>
        {labelProps && <ComboboxLabel {...labelProps} />}
        <ComboboxInputGroup {...api.getInputGroupProps()}>
          {chipsProps ? (
            <ComboboxChips {...chipsProps}>
              {valueProps && (
                <ComboboxValue {...valueProps}>
                  {(value) => (
                    <>
                      {Array.isArray(value) &&
                        value.map((item, index) => (
                          <ComboboxChip key={index} {...api.getChipProps(item, index)}>
                            {getItemLabel(item)}
                            <ComboboxChipRemove {...api.getChipRemoveProps(item)} />
                          </ComboboxChip>
                        ))}
                      <ComboboxInput {...api.getInputProps()} />
                    </>
                  )}
                </ComboboxValue>
              )}
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
          <ComboboxPositioner {...api.getPositionerProps()}>
            <ComboboxPopup {...api.getPopupProps()}>
              {emptyProps && <ComboboxEmpty {...emptyProps} />}
              <ScrollAreaRoot {...api.getScrollAreaProps()}>
                <ScrollAreaViewport {...api.getViewportProps()}>
                  <ScrollAreaContent {...api.getContentProps()}>
                    <ComboboxList {...listProps}>
                      {listProps.children ??
                        ((item, index) => {
                          if (!isItemGroup(item)) {
                            const { children, ...otherItemProps } = api.getItemProps(item, index);

                            return (
                              <ComboboxItem {...otherItemProps}>
                                {children}
                                <ComboboxItemIndicator {...api.getItemIndicatorProps()} />
                              </ComboboxItem>
                            );
                          }

                          return (
                            <ComboboxGroup {...api.getGroupProps(item, index)}>
                              {item.label !== undefined && (
                                <ComboboxGroupLabel {...api.getGroupLabelProps(item)} />
                              )}
                              <ComboboxCollection {...api.getCollectionProps()}>
                                {(item, index) => {
                                  const { children, ...otherItemProps } = api.getItemProps(
                                    item,
                                    index,
                                  );

                                  return (
                                    <ComboboxItem {...otherItemProps}>
                                      {children}
                                      <ComboboxItemIndicator {...api.getItemIndicatorProps()} />
                                    </ComboboxItem>
                                  );
                                }}
                              </ComboboxCollection>
                            </ComboboxGroup>
                          );
                        })}
                    </ComboboxList>
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
    useContext: useComboboxContext,
  },
);

export namespace Combobox {
  export type State = ComboboxState;

  export type Props<
    TValue = unknown,
    TMultiple extends boolean | undefined = false,
  > = ComboboxProps<TValue, TMultiple>;

  export type SlotProps = ComboboxSlotProps;

  export type Actions = ComboboxActions;

  export type ChangeEventDetails = ComboboxChangeEventDetails;

  export type ChangeEventReason = ComboboxChangeEventReason;

  export type Color = ComboboxColor;

  export type GroupItem<TValue = unknown> = ComboboxGroupItem<TValue>;

  export type HighlightEventDetails = ComboboxHighlightEventDetails;

  export type HighlightEventReason = ComboboxHighlightEventReason;

  export type Items<TValue = unknown> = ComboboxItems<TValue>;

  export type Radius = ComboboxRadius;

  export type Size = ComboboxSize;

  export type Variant = ComboboxVariant;
}
