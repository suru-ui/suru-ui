import { Autocomplete } from "@base-ui/react/autocomplete";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { IComponent } from "../types.js";
import { AutocompleteContext } from "./autocomplete.context.js";

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

export namespace AutocompleteRootProps {
  export type Render = {};

  export type SuruUI = {
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

  export type BaseUI<TItemValue = any> = Pick<
    Autocomplete.Root.Props<TItemValue>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AutocompleteRootProps + AriaCombobox.Props:
      | "actionsRef"
      | "autoHighlight"
      | "defaultOpen"
      | "defaultValue"
      | "disabled"
      | "filter"
      | "filteredItems"
      | "form"
      | "grid"
      | "highlightItemOnHover"
      | "id"
      | "inline"
      | "inputRef"
      | "itemToStringValue"
      | "items"
      | "keepHighlight"
      | "limit"
      | "locale"
      | "loopFocus"
      | "modal"
      | "mode"
      | "name"
      | "onItemHighlighted"
      | "onOpenChange"
      | "onOpenChangeComplete"
      | "onValueChange"
      | "open"
      | "openOnInputClick"
      | "readOnly"
      | "required"
      | "submitOnItemClick"
      | "value"
      | "virtualized",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TItemValue = any> = Omit<
    Autocomplete.Root.Props<TItemValue>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteRoot} に渡す props です。
 *
 * @template TItemValue 項目の値の型です。
 */
export type AutocompleteRootProps<TItemValue = any> = AutocompleteRootProps.Render &
  AutocompleteRootProps.SuruUI &
  AutocompleteRootProps.BaseUI<TItemValue> &
  AutocompleteRootProps.HTML<TItemValue>;

interface IAutocompleteRoot extends IComponent<AutocompleteRootProps> {
  /**
   * @template TItemValue 項目の値の型です。
   */
  <TItemValue = any>(props: AutocompleteRootProps<TItemValue>): IComponent.Return;
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
  export type State = AutocompleteRootState;

  export type Props<TItemValue = any> = Props.Render &
    Props.SuruUI &
    Props.BaseUI<TItemValue> &
    Props.HTML<TItemValue>;

  export namespace Props {
    export type Render = AutocompleteRootProps.Render;

    export type SuruUI = AutocompleteRootProps.SuruUI;

    export type BaseUI<TItemValue = any> = AutocompleteRootProps.BaseUI<TItemValue>;

    export type HTML<TItemValue = any> = AutocompleteRootProps.HTML<TItemValue>;
  }

  export type Actions = AutocompleteRootActions;

  export type ChangeEventDetails = AutocompleteRootChangeEventDetails;

  export type ChangeEventReason = AutocompleteRootChangeEventReason;

  export type Color = AutocompleteRootColor;

  export type HighlightEventDetails = AutocompleteRootHighlightEventDetails;

  export type HighlightEventReason = AutocompleteRootHighlightEventReason;

  export type Radius = AutocompleteRootRadius;

  export type Size = AutocompleteRootSize;

  export type Variant = AutocompleteRootVariant;
}
