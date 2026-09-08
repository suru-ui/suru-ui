import { Autocomplete } from "@base-ui/react/autocomplete";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./autocomplete.css";

// Context
// -------

/**
 * フォーカス時に枠線へ適用する配色です。
 */
type AutocompleteContextColor = Color;

/**
 * 入力を含むグループ要素の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
type AutocompleteContextRadius = "none" | Size | "full";

/**
 * 入力欄とリスト項目のサイズです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
type AutocompleteContextSize = Size;

/**
 * 入力欄の主な外観です。
 *
 * - `"naked"`: 背景のない入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
type AutocompleteContextVariant = "naked" | "liquid";

/**
 * {@link AutocompleteRoot} が子パーツへ提供する状態です。
 */
export type AutocompleteContext = {
  /**
   * フォーカス時に枠線へ適用する配色です。
   */
  readonly color: AutocompleteContextColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 入力を含むグループ要素の角丸です。
   */
  readonly radius: AutocompleteContextRadius;

  /**
   * 入力欄とリスト項目のサイズです。
   */
  readonly size: AutocompleteContextSize;

  /**
   * 入力欄の主な外観です。
   */
  readonly variant: AutocompleteContextVariant;
};

/**
 * オートコンプリートのスタイルを子要素へ伝播するコンテキストです。
 */
export const AutocompleteContext: React.Context<AutocompleteContext | null> =
  React.createContext<AutocompleteContext | null>(null);

function useSuiAutocompleteContext(optional?: false): AutocompleteContext;
function useSuiAutocompleteContext(optional?: boolean): AutocompleteContext | null;
function useSuiAutocompleteContext(optional?: boolean): AutocompleteContext | null {
  const ctx = React.use(AutocompleteContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "AutocompleteContext",
      providerName: "AutocompleteRoot",
    });
  }

  return ctx;
}

/**
 * {@link AutocompleteContext} を読み取るフックです。
 */
export const useAutocompleteContext: IUseContext<AutocompleteContext> = useSuiAutocompleteContext;

export { AutocompleteContext as Context, useAutocompleteContext as useContext };

export namespace Context {
  /**
   * {@link AutocompleteContextColor}
   */
  export type Color = AutocompleteContextColor;

  /**
   * {@link AutocompleteContextRadius}
   */
  export type Radius = AutocompleteContextRadius;

  /**
   * {@link AutocompleteContextSize}
   */
  export type Size = AutocompleteContextSize;

  /**
   * {@link AutocompleteContextVariant}
   */
  export type Variant = AutocompleteContextVariant;
}

// Root
// ----

/**
 * {@link AutocompleteRoot} を命令的に操作するためのオブジェクトです。
 */
export type AutocompleteRootActions = Autocomplete.Root.Actions;

/**
 * {@link AutocompleteRoot} の値が変更されたイベントの詳細です。
 */
export type AutocompleteRootChangeEventDetails = Autocomplete.Root.ChangeEventDetails;

/**
 * {@link AutocompleteRoot} の値が変更された理由です。
 */
export type AutocompleteRootChangeEventReason = Autocomplete.Root.ChangeEventReason;

/**
 * {@link AutocompleteRoot} のアイテムがハイライト表示またはハイライト解除されたイベントの詳細です。
 */
export type AutocompleteRootHighlightEventDetails = Autocomplete.Root.HighlightEventDetails;

/**
 * {@link AutocompleteRoot} のアイテムがハイライト表示またはハイライト解除された理由です。
 */
export type AutocompleteRootHighlightEventReason = Autocomplete.Root.HighlightEventReason;

/**
 * オートコンプリートの配色です。
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
 *
 * @template TItem 項目の値の型です。
 */
export type AutocompleteRootProps<TItem = any> = Autocomplete.Root.Props<TItem> & {
  /**
   * フォーカス時に枠線へ適用する色を指定します。
   *
   * @default "grey"
   */
  color?: AutocompleteRootColor | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * 入力を含むグループ要素の角丸を指定します。
   *
   * 既定値は {@link AutocompleteRootProps.size|size} です。
   */
  radius?: AutocompleteRootRadius | undefined;

  /**
   * 入力欄とリスト項目のサイズを指定します。
   *
   * @default "md"
   */
  size?: AutocompleteRootSize | undefined;

  /**
   * 入力欄の主な外観を指定します。
   *
   * @default "liquid"
   */
  variant?: AutocompleteRootVariant | undefined;
};

interface IAutocompleteRoot extends IComponent<AutocompleteRootProps> {
  /**
   * @template TItem 項目の値の型です。
   */
  <TItem = any>(props: AutocompleteRootProps<TItem>): IComponent.Return;
}

/**
 * オートコンプリートのルート要素です。
 *
 * 入力値とポップアップの開閉状態を管理し、各パーツをグループ化します。
 */
export const AutocompleteRoot: IAutocompleteRoot = function SuiAutocompleteRoot(
  props: AutocompleteRootProps,
) {
  const {
    size = "md",
    color = "grey",
    radius = size,
    variant = "liquid",
    outlined = false,
    ...otherProps
  } = props;
  const ctx = React.useMemo<AutocompleteContext>(
    () => ({ size, color, radius, variant, outlined }),
    [size, color, radius, variant, outlined],
  );

  return (
    <AutocompleteContext value={ctx}>
      <Autocomplete.Root {...otherProps} />
    </AutocompleteContext>
  );
};

export { AutocompleteRoot as Root };

export namespace Root {
  /**
   * {@link AutocompleteRootState}
   */
  export type State = AutocompleteRootState;

  /**
   * {@link AutocompleteRootProps}
   */
  export type Props<TItem = any> = AutocompleteRootProps<TItem>;

  /**
   * {@link AutocompleteRootActions}
   */
  export type Actions = AutocompleteRootActions;

  /**
   * {@link AutocompleteRootChangeEventDetails}
   */
  export type ChangeEventDetails = AutocompleteRootChangeEventDetails;

  /**
   * {@link AutocompleteRootChangeEventReason}
   */
  export type ChangeEventReason = AutocompleteRootChangeEventReason;

  /**
   * {@link AutocompleteRootColor}
   */
  export type Color = AutocompleteRootColor;

  /**
   * {@link AutocompleteRootHighlightEventDetails}
   */
  export type HighlightEventDetails = AutocompleteRootHighlightEventDetails;

  /**
   * {@link AutocompleteRootHighlightEventReason}
   */
  export type HighlightEventReason = AutocompleteRootHighlightEventReason;

  /**
   * {@link AutocompleteRootRadius}
   */
  export type Radius = AutocompleteRootRadius;

  /**
   * {@link AutocompleteRootSize}
   */
  export type Size = AutocompleteRootSize;

  /**
   * {@link AutocompleteRootVariant}
   */
  export type Variant = AutocompleteRootVariant;
}

// InputGroup
// ----------

/**
 * {@link AutocompleteInputGroup} の状態です。
 */
export type AutocompleteInputGroupState = Autocomplete.InputGroup.State;

/**
 * {@link AutocompleteInputGroup} に渡すプロパティーです。
 */
export type AutocompleteInputGroupProps = React.ComponentProps<typeof Autocomplete.InputGroup>;

/**
 * 入力欄とその付属コントロールをまとめるグループ要素です。
 */
export const AutocompleteInputGroup: IComponent<AutocompleteInputGroupProps> =
  function SuiAutocompleteInputGroup(props) {
    const { size, color, radius, variant, outlined } = useAutocompleteContext();
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.InputGroup
        {...otherProps}
        className={cn(
          className,
          "sui_autocomplete",
          `sui_autocomplete-size_${size}`,
          `sui_autocomplete-color_${color}`,
          `sui_autocomplete-radius_${radius}`,
          `sui_autocomplete-variant_${variant}`,
          outlined && "sui_autocomplete-outlined",
          (state) => state.disabled && "sui_autocomplete-disabled",
        )}
        data-scope=""
      />
    );
  };

export { AutocompleteInputGroup as InputGroup };

export namespace InputGroup {
  /**
   * {@link AutocompleteInputGroupState}
   */
  export type State = AutocompleteInputGroupState;

  /**
   * {@link AutocompleteInputGroupProps}
   */
  export type Props = AutocompleteInputGroupProps;
}

// Input
// -----

/**
 * {@link AutocompleteInput} の状態です。
 */
export type AutocompleteInputState = Autocomplete.Input.State;

/**
 * {@link AutocompleteInput} に渡すプロパティーです。
 */
export type AutocompleteInputProps = React.ComponentProps<typeof Autocomplete.Input>;

/**
 * 検索文字列を入力するテキスト入力欄です。
 */
export const AutocompleteInput: IComponent<AutocompleteInputProps> = function SuiAutocompleteInput(
  props,
) {
  const { type = "text", className, ...otherProps } = props;

  return (
    <Autocomplete.Input
      {...otherProps}
      type={type}
      className={cn(
        className,
        "sui_autocomplete_input",
        (state) => state.valid === true && "sui_autocomplete_input-valid",
        (state) => state.valid === false && "sui_autocomplete_input-invalid",
        (state) => state.valid === null && "sui_autocomplete_input-unverified",
        (state) => state.disabled && "sui_autocomplete_input-disabled",
      )}
    />
  );
};

export { AutocompleteInput as Input };

export namespace Input {
  /**
   * {@link AutocompleteInputState}
   */
  export type State = AutocompleteInputState;

  /**
   * {@link AutocompleteInputProps}
   */
  export type Props = AutocompleteInputProps;
}

// Addon
// -----

/**
 * {@link AutocompleteAddon} の状態です。
 */
export type AutocompleteAddonState = {};

/**
 * {@link AutocompleteAddon} に渡すプロパティーです。
 */
export type AutocompleteAddonProps = Omit<
  React.ComponentProps<"span">,
  keyof RenderProps<AutocompleteAddonState>
> &
  RenderProps<AutocompleteAddonState>;

/**
 * 入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const AutocompleteAddon: IComponent<AutocompleteAddonProps> = function SuiAutocompleteAddon(
  props,
) {
  const { className, ...otherSpanProps } = props;

  return useRender({
    defaultTagName: "span",
    props: [
      otherSpanProps,
      {
        className: cn(className, "sui_autocomplete_addon"),
      },
    ],
  });
};

export { AutocompleteAddon as Addon };

export namespace Addon {
  /**
   * {@link AutocompleteAddonState}
   */
  export type State = AutocompleteAddonState;

  /**
   * {@link AutocompleteAddonProps}
   */
  export type Props = AutocompleteAddonProps;
}

// Clear
// -----

/**
 * {@link AutocompleteClear} の状態です。
 */
export type AutocompleteClearState = Autocomplete.Clear.State;

/**
 * {@link AutocompleteClear} に渡すプロパティーです。
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

  return (
    <Autocomplete.Clear
      {...otherProps}
      className={cn(
        className,
        "sui_autocomplete_clear",
        (state) => state.disabled && "sui_autocomplete_clear-disabled",
      )}
    />
  );
};

export { AutocompleteClear as Clear };

export namespace Clear {
  /**
   * {@link AutocompleteClearState}
   */
  export type State = AutocompleteClearState;

  /**
   * {@link AutocompleteClearProps}
   */
  export type Props = AutocompleteClearProps;
}

// List
// ----

/**
 * {@link AutocompleteList} の状態です。
 */
export type AutocompleteListState = Autocomplete.List.State;

/**
 * {@link AutocompleteList} に渡すプロパティーです。
 */
export type AutocompleteListProps = React.ComponentProps<typeof Autocomplete.List>;

/**
 * 検索結果のリストを表示するコンテナー要素です。
 */
export const AutocompleteList: IComponent<AutocompleteListProps> = function SuiAutocompleteList(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.List {...otherProps} className={cn(className, "sui_autocomplete_list")} />;
};

export { AutocompleteList as List };

export namespace List {
  /**
   * {@link AutocompleteListState}
   */
  export type State = AutocompleteListState;

  /**
   * {@link AutocompleteListProps}
   */
  export type Props = AutocompleteListProps;
}

// Status
// ------

/**
 * {@link AutocompleteStatus} の状態です。
 */
export type AutocompleteStatusState = Autocomplete.Status.State;

/**
 * {@link AutocompleteStatus} に渡すプロパティーです。
 */
export type AutocompleteStatusProps = React.ComponentProps<typeof Autocomplete.Status>;

/**
 * リストの状態を読み上げるための非表示の要素です。
 *
 * この要素は常に DOM にマウントされたままにしてください。内容を変更するときは、要素を出し入れするのではなく children を差し替えます。
 */
export const AutocompleteStatus: IComponent<AutocompleteStatusProps> =
  function SuiAutocompleteStatus(props) {
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.Status {...otherProps} className={cn(className, "sui_autocomplete_status")} />
    );
  };

export { AutocompleteStatus as Status };

export namespace Status {
  /**
   * {@link AutocompleteStatusState}
   */
  export type State = AutocompleteStatusState;

  /**
   * {@link AutocompleteStatusProps}
   */
  export type Props = AutocompleteStatusProps;
}

// Portal
// ------

/**
 * {@link AutocompletePortal} の状態です。
 */
export type AutocompletePortalState = Autocomplete.Portal.State;

/**
 * {@link AutocompletePortal} に渡すプロパティーです。
 */
export type AutocompletePortalProps = React.ComponentProps<typeof Autocomplete.Portal>;

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 *
 * 既定では ポップアップを `<body>` の末尾に配置します。
 */
export const AutocompletePortal: IComponent<AutocompletePortalProps> =
  function SuiAutocompletePortal(props) {
    const { size, radius } = useAutocompleteContext();
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.Portal
        {...otherProps}
        className={cn(
          className,
          "sui_autocomplete_portal",
          `sui_autocomplete_portal-size_${size}`,
          `sui_autocomplete_portal-radius_${radius}`,
        )}
        data-scope=""
      />
    );
  };

export { AutocompletePortal as Portal };

export namespace Portal {
  /**
   * {@link AutocompletePortalState}
   */
  export type State = AutocompletePortalState;

  /**
   * {@link AutocompletePortalProps}
   */
  export type Props = AutocompletePortalProps;
}

// Positioner
// ----------

/**
 * {@link AutocompletePositioner} の状態です。
 */
export type AutocompletePositionerState = Autocomplete.Positioner.State;

/**
 * {@link AutocompletePositioner} に渡すプロパティーです。
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

export { AutocompletePositioner as Positioner };

export namespace Positioner {
  /**
   * {@link AutocompletePositionerState}
   */
  export type State = AutocompletePositionerState;

  /**
   * {@link AutocompletePositionerProps}
   */
  export type Props = AutocompletePositionerProps;
}

// Popup
// -----

/**
 * {@link AutocompletePopup} の状態です。
 */
export type AutocompletePopupState = Autocomplete.Popup.State;

/**
 * {@link AutocompletePopup} に渡すプロパティーです。
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

export { AutocompletePopup as Popup };

export namespace Popup {
  /**
   * {@link AutocompletePopupState}
   */
  export type State = AutocompletePopupState;

  /**
   * {@link AutocompletePopupProps}
   */
  export type Props = AutocompletePopupProps;
}

// Group
// -----

/**
 * {@link AutocompleteGroup} の状態です。
 */
export type AutocompleteGroupState = Autocomplete.Group.State;

/**
 * {@link AutocompleteGroup} に渡すプロパティーです。
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

export { AutocompleteGroup as Group };

export namespace Group {
  /**
   * {@link AutocompleteGroupState}
   */
  export type State = AutocompleteGroupState;

  /**
   * {@link AutocompleteGroupProps}
   */
  export type Props = AutocompleteGroupProps;
}

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

export { AutocompleteGroupLabel as GroupLabel };

export namespace GroupLabel {
  /**
   * {@link AutocompleteGroupLabelState}
   */
  export type State = AutocompleteGroupLabelState;

  /**
   * {@link AutocompleteGroupLabelProps}
   */
  export type Props = AutocompleteGroupLabelProps;
}

// Item
// ----

/**
 * {@link AutocompleteItem} の状態です。
 */
export type AutocompleteItemState = Autocomplete.Item.State;

/**
 * {@link AutocompleteItem} に渡すプロパティーです。
 */
export type AutocompleteItemProps = React.ComponentProps<typeof Autocomplete.Item>;

/**
 * リストの個々の項目要素です。
 */
export const AutocompleteItem: IComponent<AutocompleteItemProps> = function SuiAutocompleteItem(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Item {...otherProps} className={cn(className, "sui_autocomplete_item")} />;
};

export { AutocompleteItem as Item };

export namespace Item {
  /**
   * {@link AutocompleteItemState}
   */
  export type State = AutocompleteItemState;

  /**
   * {@link AutocompleteItemProps}
   */
  export type Props = AutocompleteItemProps;
}

// Row
// ---

/**
 * {@link AutocompleteRow} の状態です。
 */
export type AutocompleteRowState = Autocomplete.Row.State;

/**
 * {@link AutocompleteRow} に渡すプロパティーです。
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

export { AutocompleteRow as Row };

export namespace Row {
  /**
   * {@link AutocompleteRowState}
   */
  export type State = AutocompleteRowState;

  /**
   * {@link AutocompleteRowProps}
   */
  export type Props = AutocompleteRowProps;
}

// Collection
// ----------

/**
 * {@link AutocompleteCollection} の状態です。
 */
export type AutocompleteCollectionState = Autocomplete.Collection.State;

/**
 * {@link AutocompleteCollection} に渡すプロパティーです。
 */
export type AutocompleteCollectionProps = React.ComponentProps<typeof Autocomplete.Collection>;

/**
 * フィルタリングされた項目を列挙する要素です。
 *
 * これ自身は HTML 要素をレンダリングしません。
 */
export const AutocompleteCollection: IComponent<AutocompleteCollectionProps> =
  function SuiAutocompleteCollection(props) {
    return <Autocomplete.Collection {...props} />;
  };

export { AutocompleteCollection as Collection };

export namespace Collection {
  /**
   * {@link AutocompleteCollectionState}
   */
  export type State = AutocompleteCollectionState;

  /**
   * {@link AutocompleteCollectionProps}
   */
  export type Props = AutocompleteCollectionProps;
}

// Empty
// -----

/**
 * {@link AutocompleteEmpty} の状態です。
 */
export type AutocompleteEmptyState = Autocomplete.Empty.State;

/**
 * {@link AutocompleteEmpty} に渡すプロパティーです。
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

export { AutocompleteEmpty as Empty };

export namespace Empty {
  /**
   * {@link AutocompleteEmptyState}
   */
  export type State = AutocompleteEmptyState;

  /**
   * {@link AutocompleteEmptyProps}
   */
  export type Props = AutocompleteEmptyProps;
}

// useFilter
// ---------

/**
 * 項目を検索文字列と照合するフィルターです。
 */
export interface AutocompleteFilter extends ReturnType<typeof Autocomplete.useFilter> {}

/**
 * {@link useAutocompleteFilter} のオプションです。
 */
export type IUseAutocompleteFilterOptions =
  Parameters<typeof Autocomplete.useFilter> extends readonly [arg0?: infer TArg0, ...never[]]
    ? NonNullable<TArg0>
    : unknown;

/**
 * {@link useAutocompleteFilter} の戻り値です。
 */
export interface IUseAutocompleteFilterReturn extends AutocompleteFilter {}

/**
 * {@link useAutocompleteFilter} の型です。
 */
export interface IUseAutocompleteFilter {
  (options?: IUseAutocompleteFilterOptions): IUseAutocompleteFilterReturn;
}

export namespace IUseAutocompleteFilter {
  /**
   * {@link IUseAutocompleteFilterOptions}
   */
  export type Options = IUseAutocompleteFilterOptions;

  /**
   * {@link IUseAutocompleteFilterReturn}
   */
  export interface Return extends IUseAutocompleteFilterReturn {}
}

function useSuiAutocompleteFilter(options?: IUseAutocompleteFilterOptions): AutocompleteFilter {
  return Autocomplete.useFilter(options);
}

/**
 * 項目を検索文字列と照合するフィルター関数を作るフックです。
 */
export const useAutocompleteFilter: IUseAutocompleteFilter = useSuiAutocompleteFilter;

export { useAutocompleteFilter as useFilter };

// useFilteredItems
// ----------------

/**
 * フィルタリングされた項目の一覧です。
 */
export type AutocompleteFilteredItems<TItem = any> = readonly TItem[];

/**
 * {@link useAutocompleteFilteredItems} の戻り値です。
 */
export type IUseAutocompleteFilteredItemsReturn<TItem = any> = AutocompleteFilteredItems<TItem>;

/**
 * {@link useAutocompleteFilteredItems} の型です。
 */
export interface IUseAutocompleteFilteredItems {
  <TItem = any>(): IUseAutocompleteFilteredItemsReturn<TItem>;
}

export namespace IUseAutocompleteFilteredItems {
  /**
   * {@link IUseAutocompleteFilteredItemsReturn}
   */
  export type Return<TItem = any> = IUseAutocompleteFilteredItemsReturn<TItem>;
}

function useSuiAutocompleteFilteredItems(): AutocompleteFilteredItems<any> {
  return Autocomplete.useFilteredItems();
}

/**
 * Root 内でフィルタリングされた項目の一覧を返すフックです。
 */
export const useAutocompleteFilteredItems: IUseAutocompleteFilteredItems =
  useSuiAutocompleteFilteredItems;

export { useAutocompleteFilteredItems as useFilteredItems };
