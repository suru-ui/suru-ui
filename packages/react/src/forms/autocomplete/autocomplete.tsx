import * as React from "react";

import type { IComponent, IUseContext } from "../../types.js";
import { getItemLabel } from "../_get-item-label.js";
import {
  type AutocompleteContext,
  type AutocompleteRootSize,
  type AutocompleteIconProps,
  type AutocompleteItemProps,
  type AutocompleteListProps,
  type AutocompleteRootColor,
  type AutocompleteRootProps,
  type AutocompleteRootState,
  type AutocompleteClearProps,
  type AutocompleteInputProps,
  type AutocompletePopupProps,
  type AutocompleteRootRadius,
  type AutocompletePortalProps,
  type AutocompleteRootVariant,
  type AutocompleteTriggerProps,
  type AutocompleteInputGroupProps,
  type AutocompletePositionerProps,
  AutocompleteIcon,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteRoot,
  AutocompleteClear,
  AutocompleteGroup,
  AutocompleteInput,
  AutocompletePopup,
  AutocompletePortal,
  AutocompleteTrigger,
  AutocompleteCollection,
  AutocompleteGroupLabel,
  AutocompleteInputGroup,
  AutocompletePositioner,
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
 * {@link Autocomplete} の各パーツに渡すプロパティーです。
 */
export type AutocompleteSlotProps = {
  /**
   * {@link AutocompleteClear} に渡すプロパティーです。
   */
  readonly clear?: AutocompleteClearProps | undefined;

  /**
   * {@link AutocompleteIcon} に渡すプロパティーです。
   */
  readonly icon?: AutocompleteIconProps | undefined;

  /**
   * {@link AutocompleteInput} に渡すプロパティーです。
   */
  readonly input?: AutocompleteInputProps | undefined;

  /**
   * {@link AutocompleteInputGroup} に渡すプロパティーです。
   */
  readonly inputGroup?: AutocompleteInputGroupProps | undefined;

  /**
   * {@link AutocompleteItem} に渡すプロパティーです。
   */
  readonly item?: AutocompleteItemProps | undefined;

  /**
   * {@link AutocompleteList} に渡すプロパティーです。
   */
  readonly list?: AutocompleteListProps | undefined;

  /**
   * {@link AutocompletePopup} に渡すプロパティーです。
   */
  readonly popup?: AutocompletePopupProps | undefined;

  /**
   * {@link AutocompletePortal} に渡すプロパティーです。
   */
  readonly portal?: AutocompletePortalProps | undefined;

  /**
   * {@link AutocompletePositioner} に渡すプロパティーです。
   */
  readonly positioner?: AutocompletePositionerProps | undefined;

  /**
   * {@link AutocompleteTrigger} に渡すプロパティーです。
   */
  readonly trigger?: AutocompleteTriggerProps | undefined;
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
   * 検索結果リストの内容です。
   *
   * - 関数: 各行の内容を、項目の値とインデックスを受け取って作ります。
   * - それ以外の React ノード: リストにそのまま表示します（`Item` を列挙する場合など）
   * - 指定しない場合: アイテムの値をそのまま各行に表示します
   */
  children?: React.ReactNode | ((item: React.ReactNode, index: number) => React.ReactNode);

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
};

interface AutocompleteType extends IComponent<AutocompleteProps> {
  /**
   * {@link useAutocompleteContext} です。
   */
  readonly useContext: IUseContext<AutocompleteContext>;
}

/**
 * 検索文字列に応じて候補を絞り込んで表示する入力欄です。
 *
 * クリアボタンと、ポップアップを開くボタンを自動で配置します。
 * Clear と Trigger に挿入するアイコンは、`slotProps` の `clear.children` と `icon.children` で差し替えられます。
 */
export const Autocomplete: AutocompleteType = /*#__PURE__*/ Object.assign(
  function SuiAutocomplete(props: AutocompleteProps) {
    const {
      children,
      slotProps: {
        icon: iconProps,
        item: itemProps,
        list: listProps,
        clear: clearProps,
        input: inputProps,
        popup: popupProps,
        portal: portalProps,
        trigger: triggerProps,
        inputGroup: inputGroupProps,
        positioner: positionerProps,
      } = {},
      placeholder,
      autoHighlight = true,
      openOnInputClick = true,
      ...rootProps
    } = props;
    const {
      children: clearChildren = <SuiClearIcon />,
      "aria-label": clearAriaLabel,
      ...otherClearProps
    } = clearProps ?? {};
    const { children: iconChildren = <SuiChevronIcon />, ...otherIconProps } = iconProps ?? {};
    const { "aria-label": triggerAriaLabel, ...otherTriggerProps } = triggerProps ?? {};
    const {
      side = "bottom",
      align = "start",
      sideOffset = 8,
      ...otherPositionerProps
    } = positionerProps ?? {};
    const listChildren = React.useMemo(() => {
      if (typeof children !== "function" && children !== undefined) {
        return children;
      }

      return (item: unknown, index: number): React.ReactNode => {
        const group = item as { items?: readonly unknown[]; label?: React.ReactNode } | null;
        if (group && Array.isArray(group.items)) {
          return (
            <AutocompleteGroup key={index} items={group.items}>
              {group.label !== undefined && (
                <AutocompleteGroupLabel>{group.label}</AutocompleteGroupLabel>
              )}
              <AutocompleteCollection>
                {(groupItem, groupIndex) => (
                  <AutocompleteItem {...itemProps} key={groupIndex} value={groupItem}>
                    {typeof children === "function"
                      ? children(groupItem as React.ReactNode, groupIndex)
                      : getItemLabel(groupItem, undefined)}
                  </AutocompleteItem>
                )}
              </AutocompleteCollection>
            </AutocompleteGroup>
          );
        }
        return (
          <AutocompleteItem {...itemProps} key={index} value={item}>
            {typeof children === "function"
              ? children(item as React.ReactNode, index)
              : getItemLabel(item, undefined)}
          </AutocompleteItem>
        );
      };
    }, [children, itemProps]);

    return (
      <AutocompleteRoot
        {...rootProps}
        autoHighlight={autoHighlight}
        openOnInputClick={openOnInputClick}
      >
        <AutocompleteInputGroup {...inputGroupProps}>
          <AutocompleteInput placeholder={placeholder} {...inputProps} />
          <AutocompleteClear {...otherClearProps} aria-label={clearAriaLabel ?? "クリア"}>
            {clearChildren}
          </AutocompleteClear>
          <AutocompleteTrigger
            {...otherTriggerProps}
            aria-label={triggerAriaLabel ?? "選択肢を選択"}
          >
            <AutocompleteIcon {...otherIconProps}>{iconChildren}</AutocompleteIcon>
          </AutocompleteTrigger>
        </AutocompleteInputGroup>
        <AutocompletePortal {...portalProps}>
          <AutocompletePositioner
            {...otherPositionerProps}
            side={side}
            align={align}
            sideOffset={sideOffset}
          >
            <AutocompletePopup {...popupProps}>
              <AutocompleteList {...listProps}>{listChildren}</AutocompleteList>
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
   * {@link AutocompleteColor} です。
   */
  export type Color = AutocompleteColor;

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
