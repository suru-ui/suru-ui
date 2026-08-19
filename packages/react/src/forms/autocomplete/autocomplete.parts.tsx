import { Autocomplete } from "@base-ui/react/autocomplete";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import { ScrollArea } from "../../navigation/scroll-area/index.js";
import type { IComponent, IUseContext } from "../../types.js";

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
  readonly accentColor: AutocompleteRootColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 入力を含むグループ要素の角丸です。
   */
  readonly radius: AutocompleteRootRadius;

  /**
   * 入力欄とリスト項目のサイズです。
   */
  readonly size: AutocompleteRootSize;

  /**
   * 入力欄のスタイルバリエーションです。
   */
  readonly variant: AutocompleteRootVariant;
};

/**
 * オートコンプリートのスタイルを子要素へ伝播するコンテキストです。
 */
export const AutocompleteContext: React.Context<AutocompleteContext | null> =
  React.createContext<AutocompleteContext | null>(null);

function useSuiAutocompleteContext(optional?: false): AutocompleteContext;
function useSuiAutocompleteContext(optional?: boolean): AutocompleteContext | null;
function useSuiAutocompleteContext(optional?: boolean): AutocompleteContext | null {
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
 * {@link AutocompleteContext} を読み取るフックです。
 */
export const useAutocompleteContext: IUseContext<AutocompleteContext> = useSuiAutocompleteContext;

/**
 * {@link AutocompleteContext} です。
 */
export type Context = AutocompleteContext;

/**
 * {@link AutocompleteContext} です。
 */
export const Context: React.Context<AutocompleteContext | null> = AutocompleteContext;

/**
 * {@link useAutocompleteContext} です。
 */
export const useContext: IUseContext<Context> = useAutocompleteContext;

// Root
// ----

/**
 * オートコンプリートの色です。
 */
export type AutocompleteRootColor = Color;

/**
 * オートコンプリートの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type AutocompleteRootRadius = "none" | Size | "full";

/**
 * オートコンプリートの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type AutocompleteRootSize = Size;

/**
 * オートコンプリートの主な外観の種類です。
 *
 * - `"naked"`: 背景のない入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AutocompleteRootVariant = "naked" | "liquid";

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
  accentColor?: AutocompleteRootColor | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   * 省略時は `variant` が `"naked"` の場合に有効になります。
   */
  outlined?: boolean | undefined;

  /**
   * 入力を含むグループ要素の角丸を指定します。
   *
   * デフォルト値は {@link AutocompleteRootProps.size|size} です。
   */
  radius?: AutocompleteRootRadius | undefined;

  /**
   * 入力欄とリスト項目のサイズを指定します。
   *
   * @default "md"
   */
  size?: AutocompleteRootSize | undefined;

  /**
   * 入力欄のスタイルバリエーションを指定します。
   *
   * @default "naked"
   */
  variant?: AutocompleteRootVariant | undefined;
};

/**
 * オートコンプリートのルート要素です。
 *
 * 入力値とポップアップの開閉状態を管理し、各パーツをグループ化します。
 */
export const AutocompleteRoot: IComponent<AutocompleteRootProps> = function SuiAutocompleteRoot(
  props,
) {
  const {
    variant: variantProp = "naked",
    outlined: outlinedProp = variantProp === "naked",
    accentColor: accentColorProp = "grey",
    size: sizeProp = "md",
    radius: radiusProp = sizeProp,
    ...otherProps
  } = props;
  const context = React.useMemo<AutocompleteContext>(
    () => ({
      accentColor: accentColorProp,
      outlined: outlinedProp,
      radius: radiusProp,
      size: sizeProp,
      variant: variantProp,
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
 * {@link AutocompleteRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link AutocompleteRootState} です。
   */
  export type State = AutocompleteRootState;

  /**
   * {@link AutocompleteRootProps} です。
   */
  export type Props = AutocompleteRootProps;

  /**
   * {@link AutocompleteRootColor} です。
   */
  export type Color = AutocompleteRootColor;

  /**
   * {@link AutocompleteRootRadius} です。
   */
  export type Radius = AutocompleteRootRadius;

  /**
   * {@link AutocompleteRootSize} です。
   */
  export type Size = AutocompleteRootSize;

  /**
   * {@link AutocompleteRootVariant} です。
   */
  export type Variant = AutocompleteRootVariant;
}

/**
 * {@link AutocompleteRoot} です。
 */
export const Root: IComponent<Root.Props> = AutocompleteRoot;

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
 */
export const AutocompleteValue: IComponent<AutocompleteValueProps> = function SuiAutocompleteValue(
  props,
) {
  return <Autocomplete.Value {...props} />;
};

/**
 * {@link AutocompleteValue} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Value {
  /**
   * {@link AutocompleteValueState} です。
   */
  export type State = AutocompleteValueState;

  /**
   * {@link AutocompleteValueProps} です。
   */
  export type Props = AutocompleteValueProps;
}

/**
 * {@link AutocompleteValue} です。
 */
export const Value: IComponent<Value.Props> = AutocompleteValue;

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
 */
export const AutocompleteTrigger: IComponent<AutocompleteTriggerProps> =
  function SuiAutocompleteTrigger(props) {
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.Trigger {...otherProps} className={cn(className, "sui_autocomplete_trigger")} />
    );
  };

/**
 * {@link AutocompleteTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link AutocompleteTriggerState} です。
   */
  export type State = AutocompleteTriggerState;

  /**
   * {@link AutocompleteTriggerProps} です。
   */
  export type Props = AutocompleteTriggerProps;
}

/**
 * {@link AutocompleteTrigger} です。
 */
export const Trigger: IComponent<Trigger.Props> = AutocompleteTrigger;

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
 */
export const AutocompleteInput: IComponent<AutocompleteInputProps> = function SuiAutocompleteInput(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Input {...otherProps} className={cn(className, "sui_autocomplete_input")} />;
};

/**
 * {@link AutocompleteInput} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Input {
  /**
   * {@link AutocompleteInputState} です。
   */
  export type State = AutocompleteInputState;

  /**
   * {@link AutocompleteInputProps} です。
   */
  export type Props = AutocompleteInputProps;
}

/**
 * {@link AutocompleteInput} です。
 */
export const Input: IComponent<Input.Props> = AutocompleteInput;

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
 */
export const AutocompleteInputGroup: IComponent<AutocompleteInputGroupProps> =
  function SuiAutocompleteInputGroup(props) {
    const context = useAutocompleteContext(true);
    const { className, ...otherProps } = props;
    const size = context?.size ?? "md";
    const radius = context?.radius ?? "md";
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
 * {@link AutocompleteInputGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace InputGroup {
  /**
   * {@link AutocompleteInputGroupState} です。
   */
  export type State = AutocompleteInputGroupState;

  /**
   * {@link AutocompleteInputGroupProps} です。
   */
  export type Props = AutocompleteInputGroupProps;
}

/**
 * {@link AutocompleteInputGroup} です。
 */
export const InputGroup: IComponent<InputGroup.Props> = AutocompleteInputGroup;

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
 */
export const AutocompleteIcon: IComponent<AutocompleteIconProps> = function SuiAutocompleteIcon(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Icon {...otherProps} className={cn(className, "sui_autocomplete_icon")} />;
};

/**
 * {@link AutocompleteIcon} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Icon {
  /**
   * {@link AutocompleteIconState} です。
   */
  export type State = AutocompleteIconState;

  /**
   * {@link AutocompleteIconProps} です。
   */
  export type Props = AutocompleteIconProps;
}

/**
 * {@link AutocompleteIcon} です。
 */
export const Icon: IComponent<Icon.Props> = AutocompleteIcon;

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
 */
export const AutocompleteClear: IComponent<AutocompleteClearProps> = function SuiAutocompleteClear(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Clear {...otherProps} className={cn(className, "sui_autocomplete_clear")} />;
};

/**
 * {@link AutocompleteClear} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Clear {
  /**
   * {@link AutocompleteClearState} です。
   */
  export type State = AutocompleteClearState;

  /**
   * {@link AutocompleteClearProps} です。
   */
  export type Props = AutocompleteClearProps;
}

/**
 * {@link AutocompleteClear} です。
 */
export const Clear: IComponent<Clear.Props> = AutocompleteClear;

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
 */
export const AutocompleteList: IComponent<AutocompleteListProps> = function SuiAutocompleteList(
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
 * {@link AutocompleteList} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace List {
  /**
   * {@link AutocompleteListState} です。
   */
  export type State = AutocompleteListState;

  /**
   * {@link AutocompleteListProps} です。
   */
  export type Props = AutocompleteListProps;
}

/**
 * {@link AutocompleteList} です。
 */
export const List: IComponent<List.Props> = AutocompleteList;

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
 */
export const AutocompleteStatus: IComponent<AutocompleteStatusProps> =
  function SuiAutocompleteStatus(props) {
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.Status {...otherProps} className={cn(className, "sui_autocomplete_status")} />
    );
  };

/**
 * {@link AutocompleteStatus} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Status {
  /**
   * {@link AutocompleteStatusState} です。
   */
  export type State = AutocompleteStatusState;

  /**
   * {@link AutocompleteStatusProps} です。
   */
  export type Props = AutocompleteStatusProps;
}

/**
 * {@link AutocompleteStatus} です。
 */
export const Status: IComponent<Status.Props> = AutocompleteStatus;

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
 */
export const AutocompletePortal: IComponent<AutocompletePortalProps> =
  function SuiAutocompletePortal(props) {
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.Portal {...otherProps} className={cn(className, "sui_autocomplete_portal")} />
    );
  };

/**
 * {@link AutocompletePortal} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Portal {
  /**
   * {@link AutocompletePortalState} です。
   */
  export type State = AutocompletePortalState;

  /**
   * {@link AutocompletePortalProps} です。
   */
  export type Props = AutocompletePortalProps;
}

/**
 * {@link AutocompletePortal} です。
 */
export const Portal: IComponent<Portal.Props> = AutocompletePortal;

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
 */
export const AutocompleteBackdrop: IComponent<AutocompleteBackdropProps> =
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
 * {@link AutocompleteBackdrop} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link AutocompleteBackdropState} です。
   */
  export type State = AutocompleteBackdropState;

  /**
   * {@link AutocompleteBackdropProps} です。
   */
  export type Props = AutocompleteBackdropProps;
}

/**
 * {@link AutocompleteBackdrop} です。
 */
export const Backdrop: IComponent<Backdrop.Props> = AutocompleteBackdrop;

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
 */
export const AutocompletePositioner: IComponent<AutocompletePositionerProps> =
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
 * {@link AutocompletePositioner} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Positioner {
  /**
   * {@link AutocompletePositionerState} です。
   */
  export type State = AutocompletePositionerState;

  /**
   * {@link AutocompletePositionerProps} です。
   */
  export type Props = AutocompletePositionerProps;
}

/**
 * {@link AutocompletePositioner} です。
 */
export const Positioner: IComponent<Positioner.Props> = AutocompletePositioner;

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
 */
export const AutocompletePopup: IComponent<AutocompletePopupProps> = function SuiAutocompletePopup(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Popup {...otherProps} className={cn(className, "sui_autocomplete_popup")} />;
};

/**
 * {@link AutocompletePopup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Popup {
  /**
   * {@link AutocompletePopupState} です。
   */
  export type State = AutocompletePopupState;

  /**
   * {@link AutocompletePopupProps} です。
   */
  export type Props = AutocompletePopupProps;
}

/**
 * {@link AutocompletePopup} です。
 */
export const Popup: IComponent<Popup.Props> = AutocompletePopup;

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
 */
export const AutocompleteArrow: IComponent<AutocompleteArrowProps> = function SuiAutocompleteArrow(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Arrow {...otherProps} className={cn(className, "sui_autocomplete_arrow")} />;
};

/**
 * {@link AutocompleteArrow} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Arrow {
  /**
   * {@link AutocompleteArrowState} です。
   */
  export type State = AutocompleteArrowState;

  /**
   * {@link AutocompleteArrowProps} です。
   */
  export type Props = AutocompleteArrowProps;
}

/**
 * {@link AutocompleteArrow} です。
 */
export const Arrow: IComponent<Arrow.Props> = AutocompleteArrow;

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
 */
export const AutocompleteGroup: IComponent<AutocompleteGroupProps> = function SuiAutocompleteGroup(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Group {...otherProps} className={cn(className, "sui_autocomplete_group")} />;
};

/**
 * {@link AutocompleteGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Group {
  /**
   * {@link AutocompleteGroupState} です。
   */
  export type State = AutocompleteGroupState;

  /**
   * {@link AutocompleteGroupProps} です。
   */
  export type Props = AutocompleteGroupProps;
}

/**
 * {@link AutocompleteGroup} です。
 */
export const Group: IComponent<Group.Props> = AutocompleteGroup;

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
 */
export const AutocompleteGroupLabel: IComponent<AutocompleteGroupLabelProps> =
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
 * {@link AutocompleteGroupLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace GroupLabel {
  /**
   * {@link AutocompleteGroupLabelState} です。
   */
  export type State = AutocompleteGroupLabelState;

  /**
   * {@link AutocompleteGroupLabelProps} です。
   */
  export type Props = AutocompleteGroupLabelProps;
}

/**
 * {@link AutocompleteGroupLabel} です。
 */
export const GroupLabel: IComponent<GroupLabel.Props> = AutocompleteGroupLabel;

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
 */
export const AutocompleteItem: IComponent<AutocompleteItemProps> = function SuiAutocompleteItem(
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
 * {@link AutocompleteItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link AutocompleteItemState} です。
   */
  export type State = AutocompleteItemState;

  /**
   * {@link AutocompleteItemProps} です。
   */
  export type Props = AutocompleteItemProps;
}

/**
 * {@link AutocompleteItem} です。
 */
export const Item: IComponent<Item.Props> = AutocompleteItem;

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
 */
export const AutocompleteRow: IComponent<AutocompleteRowProps> = function SuiAutocompleteRow(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Row {...otherProps} className={cn(className, "sui_autocomplete_row")} />;
};

/**
 * {@link AutocompleteRow} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Row {
  /**
   * {@link AutocompleteRowState} です。
   */
  export type State = AutocompleteRowState;

  /**
   * {@link AutocompleteRowProps} です。
   */
  export type Props = AutocompleteRowProps;
}

/**
 * {@link AutocompleteRow} です。
 */
export const Row: IComponent<Row.Props> = AutocompleteRow;

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
 */
export const AutocompleteCollection: IComponent<AutocompleteCollectionProps> =
  function SuiAutocompleteCollection(props) {
    return <Autocomplete.Collection {...props} />;
  };

/**
 * {@link AutocompleteCollection} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Collection {
  /**
   * {@link AutocompleteCollectionState} です。
   */
  export type State = AutocompleteCollectionState;

  /**
   * {@link AutocompleteCollectionProps} です。
   */
  export type Props = AutocompleteCollectionProps;
}

/**
 * {@link AutocompleteCollection} です。
 */
export const Collection: IComponent<Collection.Props> = AutocompleteCollection;

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
 */
export const AutocompleteEmpty: IComponent<AutocompleteEmptyProps> = function SuiAutocompleteEmpty(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Empty {...otherProps} className={cn(className, "sui_autocomplete_empty")} />;
};

/**
 * {@link AutocompleteEmpty} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Empty {
  /**
   * {@link AutocompleteEmptyState} です。
   */
  export type State = AutocompleteEmptyState;

  /**
   * {@link AutocompleteEmptyProps} です。
   */
  export type Props = AutocompleteEmptyProps;
}

/**
 * {@link AutocompleteEmpty} です。
 */
export const Empty: IComponent<Empty.Props> = AutocompleteEmpty;

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
 */
export const AutocompleteSeparator: IComponent<AutocompleteSeparatorProps> =
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
 * {@link AutocompleteSeparator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Separator {
  /**
   * {@link AutocompleteSeparatorState} です。
   */
  export type State = AutocompleteSeparatorState;

  /**
   * {@link AutocompleteSeparatorProps} です。
   */
  export type Props = AutocompleteSeparatorProps;
}

/**
 * {@link AutocompleteSeparator} です。
 */
export const Separator: IComponent<Separator.Props> = AutocompleteSeparator;

// useFilter
// ---------

/**
 * アイテムをクエリと照合するフィルタ関数を作るフックです。
 *
 * 比較には `Intl.Collator` を使用します。
 * 外部でフィルタリングしたい場合、フィルタ関数は {@link Root} の `filter` プロパティーや
 * `filteredItems` プロパティーと組み合わせて使います。
 * {@link Root} の配下で呼び出してください。Provider がない場合は例外を投げます。
 */
export const useFilter = Autocomplete.useFilter;

// useFilteredItems
// ----------------

/**
 * {@link Root} 内で、内部的にフィルタリングされた項目の一覧を返すフックです。
 * {@link Root} の配下で呼び出してください。Provider がない場合は例外を投げます。
 */
export const useFilteredItems = Autocomplete.useFilteredItems;
