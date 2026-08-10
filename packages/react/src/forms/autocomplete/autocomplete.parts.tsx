import { Autocomplete } from "@base-ui/react/autocomplete";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import { ScrollArea } from "../../navigation/scroll-area/index.js";
import type { Component } from "../../types.js";

import "./autocomplete.css";

// Context
// -------

/**
 * {@link AutocompleteRoot} が子パーツへ提供する状態です。
 */
export type AutocompleteContext = {
  /**
   * フォーカス時に枠線へ適用するアクセントカラーです。
   */
  readonly accentColor: Color;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 入力を含むグループ要素の角丸です。
   */
  readonly radius: "none" | "rounded" | "full";

  /**
   * 入力欄とリスト項目のサイズです。
   */
  readonly size: Size;

  /**
   * 入力欄のスタイルバリエーションです。
   */
  readonly variant: "naked" | "liquid";
};

/**
 * オートコンプリートのスタイルを子要素へ伝播するコンテキストです。
 */
export const AutocompleteContext: React.Context<AutocompleteContext | null> =
  React.createContext<AutocompleteContext | null>(null);

/**
 * {@link AutocompleteContext} を読み取るフックです。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useAutocompleteContext(optional?: false): AutocompleteContext;
export function useAutocompleteContext(optional?: boolean): AutocompleteContext | null;
export function useAutocompleteContext(optional?: boolean): AutocompleteContext | null {
  const context = React.use(AutocompleteContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "AutocompleteContext",
      providerName: "AutocompleteRoot",
    });
  }

  return context;
}

/**
 * {@link AutocompleteContext} の別名です。
 */
export type Context = AutocompleteContext;

/**
 * {@link AutocompleteContext} の別名です。
 */
export const Context: React.Context<AutocompleteContext | null> = AutocompleteContext;

/**
 * {@link useAutocompleteContext} の別名です。
 *
 * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
 *
 * @returns コンテキストの値。`optional` が `true` でコンテキストがない場合は `null`。
 */
export function useContext(optional?: false): AutocompleteContext;
export function useContext(optional?: boolean): AutocompleteContext | null;
export function useContext(optional?: boolean): AutocompleteContext | null {
  return useAutocompleteContext(optional);
}

// Root
// ----

/**
 * {@link AutocompleteRoot} の状態です。
 */
export type AutocompleteRootState = Autocomplete.Root.State;

/**
 * {@link AutocompleteRoot} に渡すプロパティーです。
 */
export type AutocompleteRootProps = Omit<
  React.ComponentProps<typeof Autocomplete.Root>,
  "items"
> & {
  /**
   * リストに表示する項目の一覧です。
   *
   * フラットな配列か、`{ items }` を持つグループの配列を指定します。
   * 指定しない場合、`Item` に列挙された項目からリストが作られます。
   */
  items?: readonly unknown[] | undefined;

  /**
   * フォーカス時に枠線へ適用するアクセントカラーを指定します。
   *
   * @default "grey"
   */
  accentColor?: Color | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   * 省略時は `variant` が `"naked"` の場合に有効になります。
   */
  outlined?: boolean | undefined;

  /**
   * 入力欄とリスト項目のサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * 入力欄のスタイルバリエーションを指定します。
   *
   * - `"naked"`: 背景のない入力欄
   * - `"liquid"`: 薄い塗りつぶし
   *
   * @default "naked"
   */
  variant?: "naked" | "liquid" | undefined;

  /**
   * 入力を含むグループ要素の角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形
   *
   * @default "rounded"
   */
  radius?: "none" | "rounded" | "full" | undefined;
};

/**
 * オートコンプリートのルート要素です。
 *
 * 入力値とポップアップの開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 * スタイルプロパティーは、コンテキストを通して {@link InputGroup} に伝播します。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Root items={["りんご", "ばなな"]}>
 *   <AutocompleteParts.InputGroup>
 *     <AutocompleteParts.Input />
 *     <AutocompleteParts.Trigger>
 *       <AutocompleteParts.Icon />
 *     </AutocompleteParts.Trigger>
 *   </AutocompleteParts.InputGroup>
 *   <AutocompleteParts.Portal>
 *     <AutocompleteParts.Positioner>
 *       <AutocompleteParts.Popup>
 *         <AutocompleteParts.List>
 *           {(item, index) => (
 *             <AutocompleteParts.Item key={index} index={index} value={item}>
 *               {item}
 *             </AutocompleteParts.Item>
 *           )}
 *         </AutocompleteParts.List>
 *       </AutocompleteParts.Popup>
 *     </AutocompleteParts.Positioner>
 *   </AutocompleteParts.Portal>
 * </AutocompleteParts.Root>
 * ```
 */
export const AutocompleteRoot: Component<AutocompleteRootProps> = function SuiAutocompleteRoot(
  props,
) {
  const {
    size: sizeProp = "md",
    radius: radiusProp = "rounded",
    variant: variantProp = "naked",
    outlined: outlinedProp = variantProp === "naked",
    accentColor: accentColorProp = "grey",
    ...otherProps
  } = props;
  const context = React.useMemo<AutocompleteContext>(
    () => ({
      size: sizeProp,
      radius: radiusProp,
      variant: variantProp,
      outlined: outlinedProp,
      accentColor: accentColorProp,
    }),
    [accentColorProp, outlinedProp, radiusProp, sizeProp, variantProp],
  );

  return (
    <Context value={context}>
      <Autocomplete.Root {...otherProps} />
    </Context>
  );
};

/**
 * {@link AutocompleteRoot} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link AutocompleteRoot} の状態型です。
   */
  export type State = AutocompleteRootState;

  /**
   * {@link AutocompleteRoot} のプロパティー型です。
   */
  export type Props = AutocompleteRootProps;
}

/**
 * {@link AutocompleteRoot} の別名です。
 */
export const Root: Component<Root.Props> = AutocompleteRoot;

// Value
// -----

/**
 * {@link Value} の状態です。
 */
export type AutocompleteValueState = Autocomplete.Value.State;

/**
 * {@link Value} に渡すプロパティーです。
 */
export type AutocompleteValueProps = React.ComponentProps<typeof Autocomplete.Value>;

/**
 * 現在の入力値を子要素に反映する要素です。
 *
 * それ自身は HTML 要素をレンダリングしません。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Value>{(value) => value}</AutocompleteParts.Value>
 * ```
 */
export const AutocompleteValue: Component<AutocompleteValueProps> = function SuiAutocompleteValue(
  props,
) {
  return <Autocomplete.Value {...props} />;
};

/**
 * {@link AutocompleteValue} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Value {
  /**
   * {@link AutocompleteValue} の状態型です。
   */
  export type State = AutocompleteValueState;

  /**
   * {@link AutocompleteValue} のプロパティー型です。
   */
  export type Props = AutocompleteValueProps;
}

/**
 * {@link AutocompleteValue} の別名です。
 */
export const Value: Component<Value.Props> = AutocompleteValue;

// Trigger
// -------

/**
 * {@link Trigger} の状態です。
 */
export type AutocompleteTriggerState = Autocomplete.Trigger.State;

/**
 * {@link Trigger} に渡すプロパティーです。
 */
export type AutocompleteTriggerProps = React.ComponentProps<typeof Autocomplete.Trigger>;

/**
 * ポップアップを開閉するボタン要素です。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Trigger>
 *   <AutocompleteParts.Icon />
 * </AutocompleteParts.Trigger>
 * ```
 */
export const AutocompleteTrigger: Component<AutocompleteTriggerProps> =
  function SuiAutocompleteTrigger(props) {
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.Trigger {...otherProps} className={cn(className, "sui_autocomplete_trigger")} />
    );
  };

/**
 * {@link AutocompleteTrigger} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link AutocompleteTriggerState} の別名です。
   */
  export type State = AutocompleteTriggerState;

  /**
   * {@link AutocompleteTriggerProps} の別名です。
   */
  export type Props = AutocompleteTriggerProps;
}

/**
 * {@link AutocompleteTrigger} の別名です。
 */
export const Trigger: Component<Trigger.Props> = AutocompleteTrigger;

// Input
// -----

/**
 * {@link Input} の状態です。
 */
export type AutocompleteInputState = Autocomplete.Input.State;

/**
 * {@link Input} に渡すプロパティーです。
 */
export type AutocompleteInputProps = React.ComponentProps<typeof Autocomplete.Input>;

/**
 * 検索文字列を入力するテキスト入力欄です。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Input placeholder="検索" />
 * ```
 */
export const AutocompleteInput: Component<AutocompleteInputProps> = function SuiAutocompleteInput(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Input {...otherProps} className={cn(className, "sui_autocomplete_input")} />;
};

/**
 * {@link AutocompleteInput} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Input {
  /**
   * {@link AutocompleteInputState} の別名です。
   */
  export type State = AutocompleteInputState;

  /**
   * {@link AutocompleteInputProps} の別名です。
   */
  export type Props = AutocompleteInputProps;
}

/**
 * {@link AutocompleteInput} の別名です。
 */
export const Input: Component<Input.Props> = AutocompleteInput;

// InputGroup
// ----------

/**
 * {@link InputGroup} の状態です。
 */
export type AutocompleteInputGroupState = Autocomplete.InputGroup.State;

/**
 * {@link InputGroup} に渡すプロパティーです。
 */
export type AutocompleteInputGroupProps = React.ComponentProps<typeof Autocomplete.InputGroup>;

/**
 * 入力欄とその付属コントロールをまとめるグループ要素です。
 *
 * {@link Root} のスタイルプロパティーが伝播され、入力欄の見た目を決定します。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.InputGroup>
 *   <AutocompleteParts.Input />
 *   <AutocompleteParts.Clear />
 * </AutocompleteParts.InputGroup>
 * ```
 */
export const AutocompleteInputGroup: Component<AutocompleteInputGroupProps> =
  function SuiAutocompleteInputGroup(props) {
    const context = useAutocompleteContext(true);
    const { className, ...otherProps } = props;
    const size = context?.size ?? "md";
    const radius = context?.radius ?? "rounded";
    const variant = context?.variant ?? "naked";
    const outlined = context?.outlined ?? variant === "naked";
    const accentColor = context?.accentColor ?? "grey";

    return (
      <Autocomplete.InputGroup
        {...otherProps}
        className={cn(
          className,
          "sui_autocomplete",
          "sui_autocomplete_input_group",
          `sui_autocomplete-size_${size}`,
          `sui_autocomplete-variant_${variant}`,
          `sui_autocomplete-radius_${radius}`,
          `sui_autocomplete-accent_color_${accentColor}`,
          outlined && "sui_autocomplete-outlined",
          (state) => state.disabled && "sui_autocomplete-disabled",
        )}
      />
    );
  };

/**
 * {@link AutocompleteInputGroup} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace InputGroup {
  /**
   * {@link AutocompleteInputGroupState} の別名です。
   */
  export type State = AutocompleteInputGroupState;

  /**
   * {@link AutocompleteInputGroupProps} の別名です。
   */
  export type Props = AutocompleteInputGroupProps;
}

/**
 * {@link AutocompleteInputGroup} の別名です。
 */
export const InputGroup: Component<InputGroup.Props> = AutocompleteInputGroup;

// Icon
// ----

/**
 * {@link Icon} の状態です。
 */
export type AutocompleteIconState = Autocomplete.Icon.State;

/**
 * {@link Icon} に渡すプロパティーです。
 */
export type AutocompleteIconProps = React.ComponentProps<typeof Autocomplete.Icon>;

/**
 * ポップアップを開く操作を示すアイコンを表示する要素です。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Icon render={<ChevronDownIcon />} />
 * ```
 */
export const AutocompleteIcon: Component<AutocompleteIconProps> = function SuiAutocompleteIcon(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Icon {...otherProps} className={cn(className, "sui_autocomplete_icon")} />;
};

/**
 * {@link AutocompleteIcon} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Icon {
  /**
   * {@link AutocompleteIconState} の別名です。
   */
  export type State = AutocompleteIconState;

  /**
   * {@link AutocompleteIconProps} の別名です。
   */
  export type Props = AutocompleteIconProps;
}

/**
 * {@link AutocompleteIcon} の別名です。
 */
export const Icon: Component<Icon.Props> = AutocompleteIcon;

// Clear
// -----

/**
 * {@link Clear} の状態です。
 */
export type AutocompleteClearState = Autocomplete.Clear.State;

/**
 * {@link Clear} に渡すプロパティーです。
 */
export type AutocompleteClearProps = React.ComponentProps<typeof Autocomplete.Clear>;

/**
 * 入力値を消去するボタン要素です。
 *
 * 入力値があるときだけ表示されます。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Clear>
 *   <CloseIcon />
 * </AutocompleteParts.Clear>
 * ```
 */
export const AutocompleteClear: Component<AutocompleteClearProps> = function SuiAutocompleteClear(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Clear {...otherProps} className={cn(className, "sui_autocomplete_clear")} />;
};

/**
 * {@link AutocompleteClear} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Clear {
  /**
   * {@link AutocompleteClearState} の別名です。
   */
  export type State = AutocompleteClearState;

  /**
   * {@link AutocompleteClearProps} の別名です。
   */
  export type Props = AutocompleteClearProps;
}

/**
 * {@link AutocompleteClear} の別名です。
 */
export const Clear: Component<Clear.Props> = AutocompleteClear;

// List
// ----

/**
 * {@link List} の状態です。
 */
export type AutocompleteListState = Autocomplete.List.State;

/**
 * {@link List} に渡すプロパティーです。
 */
export type AutocompleteListProps = React.ComponentProps<typeof Autocomplete.List>;

/**
 * 検索結果のリストを表示するコンテナー要素です。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.List>
 *   {(item, index) => (
 *     <AutocompleteParts.Item key={index} index={index} value={item}>
 *       {item}
 *     </AutocompleteParts.Item>
 *   )}
 * </AutocompleteParts.List>
 * ```
 */
export const AutocompleteList: Component<AutocompleteListProps> = function SuiAutocompleteList(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <ScrollArea className="sui_autocomplete_scroll_area">
      <Autocomplete.List {...otherProps} className={cn(className, "sui_autocomplete_list")} />
    </ScrollArea>
  );
};

/**
 * {@link AutocompleteList} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace List {
  /**
   * {@link AutocompleteListState} の別名です。
   */
  export type State = AutocompleteListState;

  /**
   * {@link AutocompleteListProps} の別名です。
   */
  export type Props = AutocompleteListProps;
}

/**
 * {@link AutocompleteList} の別名です。
 */
export const List: Component<List.Props> = AutocompleteList;

// Status
// ------

/**
 * {@link Status} の状態です。
 */
export type AutocompleteStatusState = Autocomplete.Status.State;

/**
 * {@link Status} に渡すプロパティーです。
 */
export type AutocompleteStatusProps = React.ComponentProps<typeof Autocomplete.Status>;

/**
 * リストの状態を読み上げるための非表示の要素です。
 *
 * この要素は常に DOM にマウントされたままにしてください。
 * 内容を変更するときは、要素を出し入れするのではなく children を差し替えます。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Status>{status}</AutocompleteParts.Status>
 * ```
 */
export const AutocompleteStatus: Component<AutocompleteStatusProps> =
  function SuiAutocompleteStatus(props) {
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.Status {...otherProps} className={cn(className, "sui_autocomplete_status")} />
    );
  };

/**
 * {@link AutocompleteStatus} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Status {
  /**
   * {@link AutocompleteStatusState} の別名です。
   */
  export type State = AutocompleteStatusState;

  /**
   * {@link AutocompleteStatusProps} の別名です。
   */
  export type Props = AutocompleteStatusProps;
}

/**
 * {@link AutocompleteStatus} の別名です。
 */
export const Status: Component<Status.Props> = AutocompleteStatus;

// Portal
// ------

/**
 * {@link Portal} の状態です。
 */
export type AutocompletePortalState = Autocomplete.Portal.State;

/**
 * {@link Portal} に渡すプロパティーです。
 */
export type AutocompletePortalProps = React.ComponentProps<typeof Autocomplete.Portal>;

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 *
 * 既定では ポップアップを `<body>` の末尾に配置します。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Portal>
 *   <AutocompleteParts.Positioner>
 *     <AutocompleteParts.Popup>…</AutocompleteParts.Popup>
 *   </AutocompleteParts.Positioner>
 * </AutocompleteParts.Portal>
 * ```
 */
export const AutocompletePortal: Component<AutocompletePortalProps> =
  function SuiAutocompletePortal(props) {
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.Portal {...otherProps} className={cn(className, "sui_autocomplete_portal")} />
    );
  };

/**
 * {@link AutocompletePortal} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Portal {
  /**
   * {@link AutocompletePortalState} の別名です。
   */
  export type State = AutocompletePortalState;

  /**
   * {@link AutocompletePortalProps} の別名です。
   */
  export type Props = AutocompletePortalProps;
}

/**
 * {@link AutocompletePortal} の別名です。
 */
export const Portal: Component<Portal.Props> = AutocompletePortal;

// Backdrop
// --------

/**
 * {@link Backdrop} の状態です。
 */
export type AutocompleteBackdropState = Autocomplete.Backdrop.State;

/**
 * {@link Backdrop} に渡すプロパティーです。
 */
export type AutocompleteBackdropProps = React.ComponentProps<typeof Autocomplete.Backdrop>;

/**
 * ポップアップの背後に表示されるオーバーレイ要素です。
 *
 * {@link Root} の `modal` プロパティーが `true` のときだけ表示します。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Backdrop />
 * ```
 */
export const AutocompleteBackdrop: Component<AutocompleteBackdropProps> =
  function SuiAutocompleteBackdrop(props) {
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.Backdrop
        {...otherProps}
        className={cn(className, "sui_autocomplete_backdrop")}
      />
    );
  };

/**
 * {@link AutocompleteBackdrop} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link AutocompleteBackdropState} の別名です。
   */
  export type State = AutocompleteBackdropState;

  /**
   * {@link AutocompleteBackdropProps} の別名です。
   */
  export type Props = AutocompleteBackdropProps;
}

/**
 * {@link AutocompleteBackdrop} の別名です。
 */
export const Backdrop: Component<Backdrop.Props> = AutocompleteBackdrop;

// Positioner
// ----------

/**
 * {@link Positioner} の状態です。
 */
export type AutocompletePositionerState = Autocomplete.Positioner.State;

/**
 * {@link Positioner} に渡すプロパティーです。
 */
export type AutocompletePositionerProps = React.ComponentProps<typeof Autocomplete.Positioner>;

/**
 * ポップアップを入力欄に位置合わせする要素です。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Positioner side="bottom" align="start" sideOffset={8}>
 *   <AutocompleteParts.Popup>…</AutocompleteParts.Popup>
 * </AutocompleteParts.Positioner>
 * ```
 */
export const AutocompletePositioner: Component<AutocompletePositionerProps> =
  function SuiAutocompletePositioner(props) {
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.Positioner
        {...otherProps}
        className={cn(className, "sui_autocomplete_positioner")}
      />
    );
  };

/**
 * {@link AutocompletePositioner} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Positioner {
  /**
   * {@link AutocompletePositionerState} の別名です。
   */
  export type State = AutocompletePositionerState;

  /**
   * {@link AutocompletePositionerProps} の別名です。
   */
  export type Props = AutocompletePositionerProps;
}

/**
 * {@link AutocompletePositioner} の別名です。
 */
export const Positioner: Component<Positioner.Props> = AutocompletePositioner;

// Popup
// -----

/**
 * {@link Popup} の状態です。
 */
export type AutocompletePopupState = Autocomplete.Popup.State;

/**
 * {@link Popup} に渡すプロパティーです。
 */
export type AutocompletePopupProps = React.ComponentProps<typeof Autocomplete.Popup>;

/**
 * 検索結果リストを表示するポップアップ要素です。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Popup>
 *   <AutocompleteParts.List>…</AutocompleteParts.List>
 * </AutocompleteParts.Popup>
 * ```
 */
export const AutocompletePopup: Component<AutocompletePopupProps> = function SuiAutocompletePopup(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Popup {...otherProps} className={cn(className, "sui_autocomplete_popup")} />;
};

/**
 * {@link AutocompletePopup} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Popup {
  /**
   * {@link AutocompletePopupState} の別名です。
   */
  export type State = AutocompletePopupState;

  /**
   * {@link AutocompletePopupProps} の別名です。
   */
  export type Props = AutocompletePopupProps;
}

/**
 * {@link AutocompletePopup} の別名です。
 */
export const Popup: Component<Popup.Props> = AutocompletePopup;

// Arrow
// -----

/**
 * {@link Arrow} の状態です。
 */
export type AutocompleteArrowState = Autocomplete.Arrow.State;

/**
 * {@link Arrow} に渡すプロパティーです。
 */
export type AutocompleteArrowProps = React.ComponentProps<typeof Autocomplete.Arrow>;

/**
 * ポップアップと入力欄をつなぐ矢印要素です。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Positioner>
 *   <AutocompleteParts.Arrow />
 *   <AutocompleteParts.Popup>…</AutocompleteParts.Popup>
 * </AutocompleteParts.Positioner>
 * ```
 */
export const AutocompleteArrow: Component<AutocompleteArrowProps> = function SuiAutocompleteArrow(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Arrow {...otherProps} className={cn(className, "sui_autocomplete_arrow")} />;
};

/**
 * {@link AutocompleteArrow} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Arrow {
  /**
   * {@link AutocompleteArrowState} の別名です。
   */
  export type State = AutocompleteArrowState;

  /**
   * {@link AutocompleteArrowProps} の別名です。
   */
  export type Props = AutocompleteArrowProps;
}

/**
 * {@link AutocompleteArrow} の別名です。
 */
export const Arrow: Component<Arrow.Props> = AutocompleteArrow;

// Group
// -----

/**
 * {@link Group} の状態です。
 */
export type AutocompleteGroupState = Autocomplete.Group.State;

/**
 * {@link Group} に渡すプロパティーです。
 */
export type AutocompleteGroupProps = React.ComponentProps<typeof Autocomplete.Group>;

/**
 * 関連する項目をまとめるグループ要素です。
 *
 * {@link Root} の `items` にグループの配列を渡したときに使います。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Group items={groupItems}>
 *   <AutocompleteParts.GroupLabel>果物</AutocompleteParts.GroupLabel>
 * </AutocompleteParts.Group>
 * ```
 */
export const AutocompleteGroup: Component<AutocompleteGroupProps> = function SuiAutocompleteGroup(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Group {...otherProps} className={cn(className, "sui_autocomplete_group")} />;
};

/**
 * {@link AutocompleteGroup} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Group {
  /**
   * {@link AutocompleteGroupState} の別名です。
   */
  export type State = AutocompleteGroupState;

  /**
   * {@link AutocompleteGroupProps} の別名です。
   */
  export type Props = AutocompleteGroupProps;
}

/**
 * {@link AutocompleteGroup} の別名です。
 */
export const Group: Component<Group.Props> = AutocompleteGroup;

// GroupLabel
// ----------

/**
 * {@link GroupLabel} の状態です。
 */
export type AutocompleteGroupLabelState = Autocomplete.GroupLabel.State;

/**
 * {@link GroupLabel} に渡すプロパティーです。
 */
export type AutocompleteGroupLabelProps = React.ComponentProps<typeof Autocomplete.GroupLabel>;

/**
 * グループに自動的に対応付けられるラベル要素です。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.GroupLabel>果物</AutocompleteParts.GroupLabel>
 * ```
 */
export const AutocompleteGroupLabel: Component<AutocompleteGroupLabelProps> =
  function SuiAutocompleteGroupLabel(props) {
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.GroupLabel
        {...otherProps}
        className={cn(className, "sui_autocomplete_group_label")}
      />
    );
  };

/**
 * {@link AutocompleteGroupLabel} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace GroupLabel {
  /**
   * {@link AutocompleteGroupLabelState} の別名です。
   */
  export type State = AutocompleteGroupLabelState;

  /**
   * {@link AutocompleteGroupLabelProps} の別名です。
   */
  export type Props = AutocompleteGroupLabelProps;
}

/**
 * {@link AutocompleteGroupLabel} の別名です。
 */
export const GroupLabel: Component<GroupLabel.Props> = AutocompleteGroupLabel;

// Item
// ----

/**
 * {@link Item} の状態です。
 */
export type AutocompleteItemState = Autocomplete.Item.State;

/**
 * {@link Item} に渡すプロパティーです。
 */
export type AutocompleteItemProps = React.ComponentProps<typeof Autocomplete.Item>;

/**
 * リストの個々の項目要素です。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Item value="apple">りんご</AutocompleteParts.Item>
 * ```
 */
export const AutocompleteItem: Component<AutocompleteItemProps> = function SuiAutocompleteItem(
  props,
) {
  const context = useAutocompleteContext(true);
  const { className, ...otherProps } = props;
  const size = context?.size ?? "md";

  return (
    <Autocomplete.Item
      {...otherProps}
      className={cn(className, "sui_autocomplete_item", `sui_autocomplete-size_${size}`)}
    />
  );
};

/**
 * {@link AutocompleteItem} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link AutocompleteItemState} の別名です。
   */
  export type State = AutocompleteItemState;

  /**
   * {@link AutocompleteItemProps} の別名です。
   */
  export type Props = AutocompleteItemProps;
}

/**
 * {@link AutocompleteItem} の別名です。
 */
export const Item: Component<Item.Props> = AutocompleteItem;

// Row
// ---

/**
 * {@link Row} の状態です。
 */
export type AutocompleteRowState = Autocomplete.Row.State;

/**
 * {@link Row} に渡すプロパティーです。
 */
export type AutocompleteRowProps = React.ComponentProps<typeof Autocomplete.Row>;

/**
 * グリッドリストの 1 行を表示する要素です。
 *
 * {@link Root} の `grid` プロパティーと一緒に使います。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Row>
 *   <AutocompleteParts.Item value="a">a</AutocompleteParts.Item>
 * </AutocompleteParts.Row>
 * ```
 */
export const AutocompleteRow: Component<AutocompleteRowProps> = function SuiAutocompleteRow(props) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Row {...otherProps} className={cn(className, "sui_autocomplete_row")} />;
};

/**
 * {@link AutocompleteRow} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Row {
  /**
   * {@link AutocompleteRowState} の別名です。
   */
  export type State = AutocompleteRowState;

  /**
   * {@link AutocompleteRowProps} の別名です。
   */
  export type Props = AutocompleteRowProps;
}

/**
 * {@link AutocompleteRow} の別名です。
 */
export const Row: Component<Row.Props> = AutocompleteRow;

// Collection
// ----------

/**
 * {@link Collection} の状態です。
 */
export type AutocompleteCollectionState = Autocomplete.Collection.State;

/**
 * {@link Collection} に渡すプロパティーです。
 */
export type AutocompleteCollectionProps = React.ComponentProps<typeof Autocomplete.Collection>;

/**
 * フィルタリングされた項目を列挙する要素です。
 *
 * それ自身は HTML 要素をレンダリングしません。
 * 平坦なリストでは {@link List} の関数 children がこの要素を暗黙的に提供するため、通常は使いません。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Collection>
 *   {(item, index) => (
 *     <AutocompleteParts.Item key={index} index={index} value={item}>
 *       {item}
 *     </AutocompleteParts.Item>
 *   )}
 * </AutocompleteParts.Collection>
 * ```
 */
export const AutocompleteCollection: Component<AutocompleteCollectionProps> =
  function SuiAutocompleteCollection(props) {
    return <Autocomplete.Collection {...props} />;
  };

/**
 * {@link AutocompleteCollection} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Collection {
  /**
   * {@link AutocompleteCollectionState} の別名です。
   */
  export type State = AutocompleteCollectionState;

  /**
   * {@link AutocompleteCollectionProps} の別名です。
   */
  export type Props = AutocompleteCollectionProps;
}

/**
 * {@link AutocompleteCollection} の別名です。
 */
export const Collection: Component<Collection.Props> = AutocompleteCollection;

// Empty
// -----

/**
 * {@link Empty} の状態です。
 */
export type AutocompleteEmptyState = Autocomplete.Empty.State;

/**
 * {@link Empty} に渡すプロパティーです。
 */
export type AutocompleteEmptyProps = React.ComponentProps<typeof Autocomplete.Empty>;

/**
 * リストが空のときだけ、その children を表示する要素です。
 *
 * この要素自体は常に DOM に残します。表示内容の切り替えは children で行います。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Empty>見つかりませんでした</AutocompleteParts.Empty>
 * ```
 */
export const AutocompleteEmpty: Component<AutocompleteEmptyProps> = function SuiAutocompleteEmpty(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Empty {...otherProps} className={cn(className, "sui_autocomplete_empty")} />;
};

/**
 * {@link AutocompleteEmpty} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Empty {
  /**
   * {@link AutocompleteEmptyState} の別名です。
   */
  export type State = AutocompleteEmptyState;

  /**
   * {@link AutocompleteEmptyProps} の別名です。
   */
  export type Props = AutocompleteEmptyProps;
}

/**
 * {@link AutocompleteEmpty} の別名です。
 */
export const Empty: Component<Empty.Props> = AutocompleteEmpty;

// Separator
// ---------

/**
 * {@link Separator} の状態です。
 */
export type AutocompleteSeparatorState = Autocomplete.Separator.State;

/**
 * {@link Separator} に渡すプロパティーです。
 */
export type AutocompleteSeparatorProps = React.ComponentProps<typeof Autocomplete.Separator>;

/**
 * 項目やグループを区切る区切り線要素です。
 *
 * @example
 * ```tsx
 * <AutocompleteParts.Separator />
 * ```
 */
export const AutocompleteSeparator: Component<AutocompleteSeparatorProps> =
  function SuiAutocompleteSeparator(props) {
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.Separator
        {...otherProps}
        className={cn(className, "sui_autocomplete_separator")}
      />
    );
  };

/**
 * {@link AutocompleteSeparator} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Separator {
  /**
   * {@link AutocompleteSeparatorState} の別名です。
   */
  export type State = AutocompleteSeparatorState;

  /**
   * {@link AutocompleteSeparatorProps} の別名です。
   */
  export type Props = AutocompleteSeparatorProps;
}

/**
 * {@link AutocompleteSeparator} の別名です。
 */
export const Separator: Component<Separator.Props> = AutocompleteSeparator;

// useFilter
// ---------

/**
 * アイテムをクエリと照合するフィルタ関数を作るフックです。
 *
 * 比較には `Intl.Collator` を使用します。
 * 外部でフィルタリングしたい場合、フィルタ関数は {@link Root} の `filter` プロパティーや
 * `filteredItems` プロパティーと組み合わせて使います。
 * {@link Root} の配下で呼び出してください。Provider がない場合は例外を投げます。
 *
 * @example
 * ```tsx
 * const filter = AutocompleteParts.useFilter();
 * ```
 */
export const useFilter = Autocomplete.useFilter;

// useFilteredItems
// ----------------

/**
 * {@link Root} 内で、内部的にフィルタリングされた項目の一覧を返すフックです。
 * {@link Root} の配下で呼び出してください。Provider がない場合は例外を投げます。
 *
 * @example
 * ```tsx
 * const filteredItems = AutocompleteParts.useFilteredItems();
 * ```
 */
export const useFilteredItems = Autocomplete.useFilteredItems;
