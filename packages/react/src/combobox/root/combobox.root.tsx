import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { defaultItemToStringLabel, defaultItemToStringValue } from "../../_item.js";
import type { Override, IComponent } from "../../types.js";
import type { ComboboxGroupProps } from "../group/combobox.group.jsx";
import type { ComboboxItemProps } from "../item/combobox.item.jsx";
import {
  type ComboboxContextSize,
  type ComboboxContextColor,
  type ComboboxContextRadius,
  type ComboboxContextVariant,
  ComboboxContext,
} from "./combobox.root.context.js";

/**
 * {@link ComboboxRoot} を命令的に操作するためのオブジェクトです。
 */
export type ComboboxRootActions = Combobox.Root.Actions;

/**
 * {@link ComboboxRoot} の値が変更されたイベントの詳細です。
 */
export type ComboboxRootChangeEventDetails = Combobox.Root.ChangeEventDetails;

/**
 * {@link ComboboxRoot} の値が変更された理由です。
 */
export type ComboboxRootChangeEventReason = Combobox.Root.ChangeEventReason;

/**
 * {@link ComboboxRoot} の項目がハイライト表示またはハイライト解除されたイベントの詳細です。
 */
export type ComboboxRootHighlightEventDetails = Combobox.Root.HighlightEventDetails;

/**
 * {@link ComboboxRoot} の項目がハイライト表示またはハイライト解除された理由です。
 */
export type ComboboxRootHighlightEventReason = Combobox.Root.HighlightEventReason;

/**
 * コンボボックスの配色です。
 */
export type ComboboxRootColor = ComboboxContextColor;

/**
 * 値と表示内容を組にした、リストの項目です。
 *
 * `label` を表示し、`value` を選択値として扱います。
 *
 * @template TValue 項目の値の型です。
 */
export type ComboboxRootLabeledItemObject<TValue = any> = Override<
  Omit<ComboboxItemProps, "children">,
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
export type ComboboxRootItemGroupObject<TValue = any> = Override<
  ComboboxGroupProps<TValue>,
  {
    /**
     * グループに含まれる項目です。
     */
    items: readonly (TValue | ComboboxRootLabeledItemObject<TValue>)[];

    /**
     * グループのラベルです。
     */
    label?: React.ReactNode | undefined;
  }
>;

/**
 * コンボボックスの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type ComboboxRootRadius = ComboboxContextRadius;

/**
 * コンボボックスの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ComboboxRootSize = ComboboxContextSize;

/**
 * コンボボックスの主な外観の種類です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ComboboxRootVariant = ComboboxContextVariant;

/**
 * {@link ComboboxRoot} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxRootState<TItem = any> = Override<ComboboxContext<TItem>, Combobox.Root.State>;

export namespace ComboboxRootProps {
  export type Render = {};

  export type SuruUI<TItem = any> = {
    /**
     * フォーカス時に枠線へ適用する色を指定します。
     *
     * @default "grey"
     */
    color?: ComboboxRootColor | undefined;

    /**
     * リストに表示する項目の一覧です。
     *
     * グループの配列を指定するとグループごとに区切って表示します。
     */
    items?: readonly TItem[] | undefined;

    /**
     * 入力を含むグループ要素の角丸を指定します。
     *
     * 既定値は {@link ComboboxRootProps.size|size} です。
     */
    radius?: ComboboxRootRadius | undefined;

    /**
     * 入力欄とリスト項目のサイズを指定します。
     *
     * @default "md"
     */
    size?: ComboboxRootSize | undefined;

    /**
     * 入力欄の主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: ComboboxRootVariant | undefined;
  };

  export type BaseUI<
    TItem = any,
    TMultiple extends boolean | undefined = boolean | undefined,
  > = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.Root<TItem, TMultiple>>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // AriaCombobox.Props より:
      | "children"
      | "name"
      | "form"
      | "id"
      | "required"
      | "readOnly"
      | "disabled"
      | "defaultOpen"
      | "open"
      | "onOpenChangeComplete"
      | "openOnInputClick"
      | "loopFocus"
      | "inputValue"
      | "defaultInputValue"
      | "inputRef"
      | "grid"
      | "items"
      | "filteredItems"
      | "filter"
      | "virtualized"
      | "inline"
      | "modal"
      | "limit"
      | "locale"
      // ComboboxRootProps より:
      | "multiple"
      | "autoComplete"
      | "autoHighlight"
      | "highlightItemOnHover"
      | "itemToStringLabel"
      | "itemToStringValue"
      | "isItemEqualToValue"
      | "defaultValue"
      | "actionsRef"
      | "onOpenChange"
      | "onInputValueChange"
      | "onItemHighlighted"
      | "value"
      | "onValueChange"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML<TItem = any, TMultiple extends boolean | undefined = boolean | undefined> = Omit<
    React.ComponentProps<typeof Combobox.Root<TItem, TMultiple>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxRoot} に渡す props です。
 *
 * @template TItem 項目の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export type ComboboxRootProps<
  TItem = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> = ComboboxRootProps.Render &
  ComboboxRootProps.SuruUI<TItem> &
  ComboboxRootProps.BaseUI<TItem, TMultiple> &
  ComboboxRootProps.HTML<TItem, TMultiple>;

export interface IComboboxRoot extends IComponent<ComboboxRootProps> {
  /**
   * @template TItem 項目の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   */
  <TItem, const TMultiple extends boolean | undefined = false>(
    props: ComboboxRootProps<TItem, TMultiple>,
  ): IComponent.Return;
}

/**
 * コンボボックスのルート要素です。
 *
 * 選択状態とポップアップの開閉状態を管理し、スタイルを子パーツへ伝播します。これ自身は HTML 要素をレンダリングしません。
 */
export const ComboboxRoot: IComboboxRoot = function SuiComboboxRoot(props: ComboboxRootProps) {
  const {
    size = "md",
    color = "grey",
    items,
    radius = size,
    variant = "liquid",
    disabled = false,
    multiple = false,
    readOnly = false,
    required = false,
    itemToStringLabel = defaultItemToStringLabel,
    itemToStringValue = defaultItemToStringValue,
    ...otherProps
  } = props;
  const ctx = React.useMemo<ComboboxContext>(
    () => ({
      size,
      color,
      items,
      radius,
      variant,
      multiple,
      outlined: false,
      itemToStringLabel,
    }),
    [size, color, items, radius, variant, multiple, itemToStringLabel],
  );

  return (
    <ComboboxContext value={ctx}>
      <Combobox.Root
        {...otherProps}
        items={items}
        disabled={disabled}
        multiple={multiple}
        readOnly={readOnly}
        required={required}
        itemToStringLabel={itemToStringLabel}
        itemToStringValue={itemToStringValue}
      />
    </ComboboxContext>
  );
};

export { ComboboxRoot as Root };

export namespace Root {
  export type State = ComboboxRootState;

  export type Props<
    TItem = any,
    TMultiple extends boolean | undefined = boolean | undefined,
  > = Props.Render &
    Props.SuruUI<TItem> &
    Props.BaseUI<TItem, TMultiple> &
    Props.HTML<TItem, TMultiple>;

  export namespace Props {
    export type Render = ComboboxRootProps.Render;

    export type SuruUI<TItem = any> = ComboboxRootProps.SuruUI<TItem>;

    export type BaseUI<
      TItem = any,
      TMultiple extends boolean | undefined = boolean | undefined,
    > = ComboboxRootProps.BaseUI<TItem, TMultiple>;

    export type HTML<
      TItem = any,
      TMultiple extends boolean | undefined = boolean | undefined,
    > = ComboboxRootProps.HTML<TItem, TMultiple>;
  }

  export type Actions = ComboboxRootActions;

  export type ChangeEventDetails = ComboboxRootChangeEventDetails;

  export type ChangeEventReason = ComboboxRootChangeEventReason;

  export type Color = ComboboxRootColor;

  export type HighlightEventDetails = ComboboxRootHighlightEventDetails;

  export type HighlightEventReason = ComboboxRootHighlightEventReason;

  export type ItemGroupObject<TValue = any> = ComboboxRootItemGroupObject<TValue>;

  export type LabeledItemObject<TValue = any> = ComboboxRootLabeledItemObject<TValue>;

  export type Radius = ComboboxRootRadius;

  export type Size = ComboboxRootSize;

  export type Variant = ComboboxRootVariant;
}
