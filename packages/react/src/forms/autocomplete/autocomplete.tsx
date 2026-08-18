import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import {
  type AutocompleteIconProps,
  type AutocompleteItemProps,
  type AutocompleteListProps,
  type AutocompleteRootProps,
  type AutocompleteRootState,
  type AutocompleteClearProps,
  type AutocompleteInputProps,
  type AutocompletePopupProps,
  type AutocompletePortalProps,
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
} from "./autocomplete.parts.jsx";

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
   * {@link AutocompletePortal} に渡すプロパティーです。
   */
  readonly portal?: AutocompletePortalProps | undefined;

  /**
   * {@link AutocompletePositioner} に渡すプロパティーです。
   */
  readonly positioner?: AutocompletePositionerProps | undefined;

  /**
   * {@link AutocompletePopup} に渡すプロパティーです。
   */
  readonly popup?: AutocompletePopupProps | undefined;

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
   * 入力欄を含むグループ要素に適用するクラス名です。
   * `slotProps.inputGroup.className` と結合されます。
   */
  className?: AutocompleteInputGroupProps["className"] | undefined;

  /**
   * 入力欄のプレースホルダー文字列です。
   * 指定した場合は `slotProps.input.placeholder` より優先されます。
   */
  placeholder?: string | undefined;

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
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   * `clear`、`icon`、`input`、`inputGroup`、`item`、`list`、`portal`、`positioner`、
   * `popup`、`trigger` を指定できます。
   */
  slotProps?: AutocompleteSlotProps | undefined;
};

/**
 * 検索文字列に応じて候補を絞り込んで表示する入力欄です。
 *
 * クリアボタンと、ポップアップを開くボタンを自動で配置します。
 * Clear と Trigger に挿入するアイコンは、`slotProps` の
 * `clear.children` と `icon.children` で差し替えられます。
 * `autoHighlight` と `openOnInputClick` の既定値はどちらも `true` です。
 * `placeholder` は `slotProps.input.placeholder` より優先されます。
 * クリアボタンは入力値がある場合だけ、ポップアップの内容は開いている場合だけ表示されます。
 */
export const Autocomplete: IComponent<AutocompleteProps> = function SuiAutocomplete(props) {
  const {
    autoHighlight = true,
    children,
    className,
    placeholder,
    slotProps: {
      clear: clearProps,
      icon: iconProps,
      input: inputProps,
      inputGroup: inputGroupProps,
      item: itemProps,
      list: listProps,
      portal: portalProps,
      positioner: positionerProps,
      popup: popupProps,
      trigger: triggerProps,
    } = {},
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
    align = "start",
    side = "bottom",
    sideOffset = 8,
    ...restPositionerProps
  } = positionerProps ?? {};
  const listChildren = React.useMemo(() => {
    if (typeof children !== "function" && children !== undefined) {
      return children;
    }

    return (item: unknown, index: number): React.ReactNode => {
      const group = item as { label?: React.ReactNode; items?: readonly unknown[] } | null;
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
          {typeof children === "function" ? children(item as React.ReactNode, index) : String(item)}
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
        <AutocompleteInput {...inputProps} placeholder={placeholder ?? inputProps?.placeholder} />
        <AutocompleteClear {...restClearProps} aria-label={clearAriaLabel ?? "クリア"}>
          {clearChildren}
        </AutocompleteClear>
        <AutocompleteTrigger {...restTriggerProps} aria-label={triggerAriaLabel ?? "選択肢を選択"}>
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
};

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
}

/**
 * {@link Autocomplete} の Clear に使う既定のアイコンです。
 */
function SuiClearIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" {...props}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

/**
 * {@link Autocomplete} の Trigger に使う既定のアイコンです。
 */
function SuiChevronIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" {...props}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}
