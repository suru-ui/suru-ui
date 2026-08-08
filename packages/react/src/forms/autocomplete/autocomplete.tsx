import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";
import * as AutocompleteParts from "./autocomplete.parts.jsx";

/**
 * {@link Autocomplete} コンポーネントのプロパティーです。
 */
export type AutocompleteProps = Omit<AutocompleteParts.Root.Props, "children"> & {
  /**
   * 入力欄を含むグループ要素に適用するクラス名です。
   */
  className?: AutocompleteParts.InputGroup.Props["className"] | undefined;

  /**
   * 入力欄のプレースホルダー文字列です。
   */
  placeholder?: string | undefined;

  /**
   * 検索結果リストの内容です。
   *
   * - 関数: 各行の内容を、項目の値とインデックスを受け取って作ります。
   * - それ以外の React ノード: リストにそのまま表示します（`Item` を列挙する場合など）
   * - 指定しない場合: アイテムの値をそのまま各行に表示します
   */
  children?: React.ReactNode | ((item: any, index: number) => React.ReactNode) | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?:
    | {
        readonly clear?: AutocompleteParts.Clear.Props | undefined;

        readonly icon?: AutocompleteParts.Icon.Props | undefined;

        readonly input?: AutocompleteParts.Input.Props | undefined;

        readonly inputGroup?: AutocompleteParts.InputGroup.Props | undefined;

        readonly item?: AutocompleteParts.Item.Props | undefined;

        readonly list?: AutocompleteParts.List.Props | undefined;

        readonly portal?: AutocompleteParts.Portal.Props | undefined;

        readonly positioner?: AutocompleteParts.Positioner.Props | undefined;

        readonly popup?: AutocompleteParts.Popup.Props | undefined;

        readonly trigger?: AutocompleteParts.Trigger.Props | undefined;
      }
    | undefined;
};

/**
 * 検索文字列に応じて候補を絞り込んで表示する入力欄です。
 *
 * クリアボタンと、ポップアップを開くボタンを自動で配置します。
 * Clear と Trigger に挿入するアイコンは、`slotProps` の
 * `clear.children` と `icon.children` で差し替えられます。
 *
 * @example 基本
 * ```tsx
 * <Autocomplete items={["りんご", "ばなな", "みかん"]} />
 * ```
 *
 * @example 行の見た目を変える
 * ```tsx
 * <Autocomplete items={["りんご", "ばなな", "みかん"]}>
 *   {(item) => <span className="pl-2">🍎 {item}</span>}
 * </Autocomplete>
 * ```
 *
 * @example 制御モード
 * ```tsx
 * <Autocomplete
 *   items={["りんご", "ばなな", "みかん"]}
 *   value={value}
 *   onValueChange={setValue}
 * />
 * ```
 */
export const Autocomplete: Component<AutocompleteProps> = function SuiAutocomplete(props) {
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
  const listChildren =
    typeof children === "function" || children === undefined
      ? (item: any, index: number): React.ReactNode => {
          const group = item as { label?: React.ReactNode; items?: readonly unknown[] } | null;
          if (group && Array.isArray(group.items)) {
            return (
              <AutocompleteParts.Group key={index} items={group.items}>
                {group.label !== undefined && (
                  <AutocompleteParts.GroupLabel>{group.label}</AutocompleteParts.GroupLabel>
                )}
                <AutocompleteParts.Collection>
                  {(groupItem, groupIndex) => (
                    <AutocompleteParts.Item {...itemProps} key={groupIndex} value={groupItem}>
                      {typeof children === "function"
                        ? children(groupItem, groupIndex)
                        : String(groupItem)}
                    </AutocompleteParts.Item>
                  )}
                </AutocompleteParts.Collection>
              </AutocompleteParts.Group>
            );
          }
          return (
            <AutocompleteParts.Item {...itemProps} key={index} value={item}>
              {typeof children === "function" ? children(item, index) : String(item)}
            </AutocompleteParts.Item>
          );
        }
      : children;

  return (
    <AutocompleteParts.Root
      {...rootProps}
      autoHighlight={autoHighlight}
      openOnInputClick={openOnInputClick}
    >
      <AutocompleteParts.InputGroup
        {...inputGroupProps}
        className={cn(inputGroupProps?.className, className)}
      >
        <AutocompleteParts.Input
          {...inputProps}
          placeholder={placeholder ?? inputProps?.placeholder}
        />
        <AutocompleteParts.Clear {...restClearProps} aria-label={clearAriaLabel ?? "クリア"}>
          {clearChildren}
        </AutocompleteParts.Clear>
        <AutocompleteParts.Trigger
          {...restTriggerProps}
          aria-label={triggerAriaLabel ?? "選択肢を選択"}
        >
          <AutocompleteParts.Icon {...restIconProps}>{iconChildren}</AutocompleteParts.Icon>
        </AutocompleteParts.Trigger>
      </AutocompleteParts.InputGroup>
      <AutocompleteParts.Portal {...portalProps}>
        <AutocompleteParts.Positioner
          {...restPositionerProps}
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <AutocompleteParts.Popup {...popupProps}>
            <AutocompleteParts.List {...listProps}>{listChildren}</AutocompleteParts.List>
          </AutocompleteParts.Popup>
        </AutocompleteParts.Positioner>
      </AutocompleteParts.Portal>
    </AutocompleteParts.Root>
  );
};

// Clear と Icon の既定アイコンです。

function SuiClearIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" {...props}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

function SuiChevronIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" {...props}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}
