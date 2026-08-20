import * as React from "react";

import cn from "../../cn.js";
import type { IComponent, IUseContext } from "../../types.js";
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
   * 項目の状態が変わると、関数形式の children は再び呼び出されます。
   */
  children?:
    | React.ReactNode
    | ((item: React.ReactNode, index: number) => React.ReactNode)
    | undefined;

  /**
   * 入力欄を含むグループ要素に適用するクラス名です。
   * `slotProps.inputGroup.className` と結合されます。
   */
  className?: AutocompleteInputGroupProps["className"] | undefined;

  /**
   * 入力欄のプレースホルダー文字列です。
   * `slotProps.input` の `placeholder` が優先されます。
   */
  placeholder?: string | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   * `clear`、`icon`、`input`、`inputGroup`、`item`、`list`、`portal`、`positioner`、`popup`、`trigger` を指定できます。
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
 * `autoHighlight` と `openOnInputClick` の既定値はどちらも `true` です。
 * `placeholder` は `slotProps.input` の `placeholder` が優先されます。
 * クリアボタンは入力値がある場合だけ、ポップアップの内容は開いている場合だけ表示されます。
 */
export const Autocomplete: AutocompleteType = /*#__PURE__*/ Object.assign(
  function SuiAutocomplete(props: AutocompleteProps) {
    const {
      children,
      className,
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
      ...restClearProps
    } = clearProps ?? {};
    const { children: iconChildren = <SuiChevronIcon />, ...restIconProps } = iconProps ?? {};
    const { "aria-label": triggerAriaLabel, ...restTriggerProps } = triggerProps ?? {};
    const {
      side = "bottom",
      align = "start",
      sideOffset = 8,
      ...restPositionerProps
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
                      : String(groupItem)}
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
              : String(item)}
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
        <AutocompleteInputGroup
          {...inputGroupProps}
          className={cn(className, inputGroupProps?.className)}
        >
          <AutocompleteInput placeholder={placeholder} {...inputProps} />
          <AutocompleteClear {...restClearProps} aria-label={clearAriaLabel ?? "クリア"}>
            {clearChildren}
          </AutocompleteClear>
          <AutocompleteTrigger
            {...restTriggerProps}
            aria-label={triggerAriaLabel ?? "選択肢を選択"}
          >
            <AutocompleteIcon {...restIconProps}>{iconChildren}</AutocompleteIcon>
          </AutocompleteTrigger>
        </AutocompleteInputGroup>
        <AutocompletePortal {...portalProps}>
          <AutocompletePositioner
            {...restPositionerProps}
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
   * {@link AutocompleteSlotProps} です。
   */
  export type SlotProps = AutocompleteSlotProps;

  /**
   * {@link AutocompleteContext} です。
   */
  export type Context = AutocompleteContext;

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
    <svg fill="none" stroke="currentColor" viewBox="0 0 16 16" strokeLinecap="round" {...props}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

/**
 * {@link Autocomplete} の Trigger に使う既定のアイコンです。
 */
function SuiChevronIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 16 16" strokeLinecap="round" {...props}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}
