import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import Config from "../../_config.jsx";
import { defaultItemToStringValue } from "../../_item.js";
import type { Override, IComponent } from "../../types.js";
import type { AutocompleteGroupProps } from "../group/autocomplete.group.jsx";
import type { AutocompleteItemProps } from "../item/autocomplete.item.jsx";
import {
  type AutocompleteContextSize,
  type AutocompleteContextColor,
  type AutocompleteContextRadius,
  type AutocompleteContextVariant,
  AutocompleteContext,
} from "./autocomplete.root.context.js";

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
export type AutocompleteRootColor = AutocompleteContextColor;

/**
 * 値と表示内容を組にした、リストの項目です。
 *
 * `label` を表示し、`value` を選択値として扱います。
 *
 * @template TValue 項目の値の型です。
 */
export type AutocompleteRootLabeledItemObject<TValue = any> = Override<
  Omit<AutocompleteItemProps, "children">,
  {
    /**
     * 表示ラベルです。
     */
    readonly label: React.ReactNode;

    /**
     * 選択値です。
     */
    readonly value: TValue;
  }
>;

/**
 * 関連する項目をまとめるグループオブジェクトです。
 *
 * @template TValue 項目の値の型です。
 */
export type AutocompleteRootItemGroupObject<TValue = any> = Override<
  AutocompleteGroupProps<TValue>,
  {
    /**
     * グループに含まれる項目です。
     */
    items: readonly (TValue | AutocompleteRootLabeledItemObject<TValue>)[];

    /**
     * グループのラベルです。
     */
    label?: React.ReactNode | undefined;
  }
>;

/**
 * オートコンプリートの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type AutocompleteRootRadius = AutocompleteContextRadius;

/**
 * オートコンプリートの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type AutocompleteRootSize = AutocompleteContextSize;

/**
 * オートコンプリートの主な外観の種類です。
 *
 * - `"naked"`: 背景のない入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AutocompleteRootVariant = AutocompleteContextVariant;

/**
 * {@link AutocompleteRoot} の状態です。
 */
export type AutocompleteRootState = Override<AutocompleteContext, Autocomplete.Root.State>;

export namespace AutocompleteRootProps {
  export type Render = {};

  export type SuruUI<TItem = any> = {
    /**
     * フォーカス時に枠線へ適用する色を指定します。
     *
     * @default "grey"
     */
    color?: AutocompleteRootColor | undefined;

    /**
     * リストに表示する項目の一覧です。
     *
     * グループの配列を指定するとグループごとに区切って表示します。
     */
    items?: readonly TItem[] | undefined;

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

      // ComboboxRootProps:
      | "children"
      | "name"
      // | "form"
      | "id"
      | "required"
      | "readOnly"
      | "disabled"
      | "defaultOpen"
      | "open"
      // | "onOpenChange"
      | "onOpenChangeComplete"
      // | "openOnInputClick"
      // | "autoHighlight"
      // | "keepHighlight"
      // | "highlightItemOnHover"
      | "loopFocus"
      // | "inputValue"
      // | "onInputValueChange"
      // | "defaultInputValue"
      // | "actionsRef"
      | "onItemHighlighted"
      | "inputRef"
      | "grid"
      // | "items"
      | "filteredItems"
      | "filter"
      // | "itemToStringLabel"
      // | "itemToStringValue"
      // | "isItemEqualToValue"
      | "virtualized"
      // | "inline"
      | "modal"
      | "limit"
      // | "autoComplete"
      // | "formAutoComplete"
      | "locale"
      | "submitOnItemClick"
      // | "fillInputOnItemPress"

      // AriaComboboxProps:
      // | "selectionMode"
      // | "selectedValue"
      // | "defaultSelectedValue"
      // | "onSelectedValueChange"

      // AutocompleteRootProps:
      | "items"
      | "form"
      | "mode"
      | "inline"
      | "autoHighlight"
      | "keepHighlight"
      | "highlightItemOnHover"
      | "defaultValue"
      | "value"
      | "onValueChange"
      | "submitOnItemClick"
      | "itemToStringValue"
      | "actionsRef"
      | "onOpenChange"
      | "onItemHighlighted"
      | "openOnInputClick",
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
  AutocompleteRootProps.SuruUI<TItemValue> &
  AutocompleteRootProps.BaseUI<TItemValue> &
  AutocompleteRootProps.HTML<TItemValue>;

export interface IAutocompleteRoot extends IComponent<AutocompleteRootProps> {
  /**
   * @template TItemValue 項目の値の型です。
   */
  <TItemValue = any>(props: AutocompleteRootProps<TItemValue>): IComponent.Return;
}

/**
 * オートコンプリートのルート要素です。
 *
 * 入力値とポップアップの開閉状態を管理し、各パーツをグループ化します。これ自身は HTML 要素をレンダリングしません。
 */
export const AutocompleteRoot: IAutocompleteRoot = function SuiAutocompleteRoot(
  props: AutocompleteRootProps,
) {
  const config = React.use(Config);
  const {
    size = "md",
    color = "grey",
    items,
    radius = size,
    variant = "liquid",
    disabled = false,
    readOnly = false,
    required = false,
    itemToStringValue = defaultItemToStringValue,
    ...otherProps
  } = props;
  const ctx = React.useMemo<AutocompleteContext>(
    () => ({ size, color, items, radius, variant, outlined: false }),
    [size, color, items, radius, variant],
  );

  return (
    <config.Context
      size={size}
      color={color}
      radius={radius}
      variant={variant}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
    >
      <AutocompleteContext value={ctx}>
        <Autocomplete.Root
          {...otherProps}
          items={items}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          itemToStringValue={itemToStringValue}
        />
      </AutocompleteContext>
    </config.Context>
  );
};

export { AutocompleteRoot as Root };

export namespace Root {
  export type State = AutocompleteRootState;

  export type Props<TItemValue = any> = Props.Render &
    Props.SuruUI<TItemValue> &
    Props.BaseUI<TItemValue> &
    Props.HTML<TItemValue>;

  export namespace Props {
    export type Render = AutocompleteRootProps.Render;

    export type SuruUI<TItemValue = any> = AutocompleteRootProps.SuruUI<TItemValue>;

    export type BaseUI<TItemValue = any> = AutocompleteRootProps.BaseUI<TItemValue>;

    export type HTML<TItemValue = any> = AutocompleteRootProps.HTML<TItemValue>;
  }

  export type Actions = AutocompleteRootActions;

  export type ChangeEventDetails = AutocompleteRootChangeEventDetails;

  export type ChangeEventReason = AutocompleteRootChangeEventReason;

  export type Color = AutocompleteRootColor;

  export type HighlightEventDetails = AutocompleteRootHighlightEventDetails;

  export type HighlightEventReason = AutocompleteRootHighlightEventReason;

  export type ItemGroupObject<TValue = any> = AutocompleteRootItemGroupObject<TValue>;

  export type LabeledItemObject<TValue = any> = AutocompleteRootLabeledItemObject<TValue>;

  export type Radius = AutocompleteRootRadius;

  export type Size = AutocompleteRootSize;

  export type Variant = AutocompleteRootVariant;
}
