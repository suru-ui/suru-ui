import { Select as BaseSelect } from "@base-ui/react/select";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import type { Override, IComponent } from "../types.js";
import { isItemGroup, isLabeledItem } from "./_select.jsx";
import { SelectContext } from "./select.context.js";
import type { SelectGroupProps } from "./select.group.jsx";
import type { SelectItemProps } from "./select.item.jsx";

/**
 * {@link SelectRoot} のアクションです。
 */
export type SelectRootActions = BaseSelect.Root.Actions;

/**
 * {@link SelectRoot} の値が変更するイベントの詳細です。
 */
export type SelectRootChangeEventDetails = BaseSelect.Root.ChangeEventDetails;

/**
 * {@link SelectRoot} の値が変更する理由です。
 */
export type SelectRootChangeEventReason = BaseSelect.Root.ChangeEventReason;

/**
 * 項目の値と表示内容を対応付けたオブジェクトです。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectRootItemMapping<TValue = any> = TValue extends string
  ? { readonly [_ in TValue]: React.ReactNode }
  : never;

/**
 * 値と表示内容を組にした、リストの項目です。
 *
 * `label` を表示し、`value` を選択値として扱います。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectRootLabeledItem<TValue = any> = Override<
  Omit<SelectItemProps, "children">,
  {
    readonly label: React.ReactNode;

    readonly value: TValue;
  }
>;

/**
 * リストに表示する項目です。
 *
 * 値そのものか、ラベルと値を持つオブジェクトを指定できます。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectRootItem<TValue = any> = TValue | SelectRootLabeledItem<TValue>;

/**
 * 関連する項目をまとめるグループです。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectRootItemGroup<TValue = any> = Override<
  Omit<SelectGroupProps, "children">,
  {
    /**
     * グループに含まれる項目です。
     */
    readonly items: SelectRootItemMapping<TValue> | readonly SelectRootItem<TValue>[];

    /**
     * グループの見出しです。
     */
    readonly label?: React.ReactNode | undefined;
  }
>;

/**
 * リストに表示する項目の一覧です。
 *
 * - 値と表示内容を対応付けたオブジェクト
 * - 平坦な項目の配列
 * - グループ化した項目の配列
 *
 * @template TValue 項目の値の型です。
 */
export type SelectRootItems<TValue = any> =
  | SelectRootItemMapping<TValue>
  | readonly SelectRootItem<TValue>[]
  | readonly SelectRootItemGroup<TValue>[];

/**
 * 選択欄の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type SelectRootRadius = "none" | Size | "full";

/**
 * 選択欄の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type SelectRootSize = Size;

/**
 * 選択欄の主な外観の種類です。
 *
 * - `"naked"`: 背景のない選択欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type SelectRootVariant = "naked" | "liquid";

/**
 * {@link SelectRoot} が持つ状態です。
 */
export type SelectRootState = BaseSelect.Root.State;

export namespace SelectRootProps {
  export type Render = {};

  export type SuruUI<TValue = any> = {
    /**
     * リストに表示する項目の一覧です。
     *
     * グループの配列を指定するとグループごとに区切って表示します。
     */
    items?: SelectRootItems<TValue> | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * 選択欄とポップアップの角丸を指定します。
     *
     * 既定値は {@link SelectRootProps.size|size} です。
     */
    radius?: SelectRootRadius | undefined;

    /**
     * 選択欄とリスト項目のサイズを指定します。
     *
     * @default "md"
     */
    size?: SelectRootSize | undefined;

    /**
     * 選択欄の主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: SelectRootVariant | undefined;
  };

  export type BaseUI<
    TValue = any,
    TMultiple extends boolean | undefined = boolean | undefined,
  > = Pick<
    React.ComponentProps<typeof BaseSelect.Root<TValue, TMultiple>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectRootProps:
      | "inputRef"
      | "name"
      | "form"
      | "autoComplete"
      | "id"
      | "required"
      | "readOnly"
      | "disabled"
      | "multiple"
      | "highlightItemOnHover"
      | "defaultOpen"
      | "onOpenChange"
      | "onOpenChangeComplete"
      | "open"
      | "modal"
      | "actionsRef"
      | "items"
      | "itemToStringLabel"
      | "itemToStringValue"
      | "isItemEqualToValue"
      | "defaultValue"
      | "value"
      | "onValueChange",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<
    TValue = any,
    TMultiple extends boolean | undefined = boolean | undefined,
  > = Omit<
    React.ComponentProps<typeof BaseSelect.Root<TValue, TMultiple>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectRoot} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export type SelectRootProps<
  TValue = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> = SelectRootProps.Render &
  SelectRootProps.SuruUI<TValue> &
  SelectRootProps.BaseUI<TValue, TMultiple> &
  SelectRootProps.HTML<TValue, TMultiple>;

interface ISelectRoot extends IComponent<SelectRootProps<unknown, boolean | undefined>> {
  /**
   * @template TValue 項目の値の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   */
  <TValue, TMultiple extends boolean | undefined = false>(
    props: SelectRootProps<TValue, TMultiple>,
  ): IComponent.Return;
}

/**
 * 選択状態とポップアップの開閉状態を管理する Select のルートです。
 *
 * それ自身は HTML 要素をレンダリングせず、スタイルと項目を子パーツへ伝播します。
 */
export const SelectRoot: ISelectRoot = function SuiSelectRoot(props: SelectRootProps) {
  const {
    size = "md",
    items,
    radius = size,
    variant = "liquid",
    outlined = false,
    onValueChange,
    isItemEqualToValue: isItemEqualToValueProp,
    ...otherProps
  } = props;
  const ctx = React.useMemo<SelectContext>(
    () => ({
      size,
      items,
      radius,
      variant,
      outlined,
    }),
    [items, outlined, radius, size, variant],
  );
  const baseuiItems = React.useMemo(() => {
    if (!items) {
      return undefined;
    }
    if (!Array.isArray(items)) {
      return items;
    }

    return items.map((item) => {
      if (isLabeledItem(item)) {
        return {
          label: item.label,
          value: item.value,
        };
      }

      if (isItemGroup(item)) {
        return {
          items: item.items,
          label: item.label,
        };
      }

      return item;
    });
  }, [items]);
  // Base UI の型情報によると `onValueChange` の第一引数に `value` が来るはずですが、実際には `items` の要素が来ます。
  // 型情報と実際の挙動を合わせるために、ハンドラーを修正します。
  const handleValueChange = React.useCallback<NonNullable<SelectRootProps["onValueChange"]>>(
    (item, ...args) => {
      if (!onValueChange) {
        return;
      }

      if (Array.isArray(item)) {
        onValueChange(
          item.map((entry) => (isLabeledItem(entry) ? entry.value : entry)),
          ...args,
        );

        return;
      }

      onValueChange(isLabeledItem(item) ? item.value : item, ...args);
    },
    [onValueChange],
  );
  // Base UI の型情報によると `isItemEqualToValue` の第一引数に `value` が来るはずですが、実際には `items` の要素が来ます。
  // 型情報と実際の挙動を合わせるために、ハンドラーを修正します。
  const isItemEqualToValue = React.useCallback<NonNullable<SelectRootProps["isItemEqualToValue"]>>(
    (item, ...args) => {
      const value = isLabeledItem(item) ? item.value : item;
      const equal = !isItemEqualToValueProp
        ? Object.is(value, args[0])
        : isItemEqualToValueProp(value, ...args);

      return equal;
    },
    [isItemEqualToValueProp],
  );

  return (
    <SelectContext value={ctx}>
      <BaseSelect.Root
        {...otherProps}
        items={baseuiItems}
        onValueChange={handleValueChange}
        isItemEqualToValue={isItemEqualToValue}
      />
    </SelectContext>
  );
};

export { SelectRoot as Root };

/**
 * {@link SelectRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  export type State = SelectRootState;

  export type Props<
    TValue = any,
    TMultiple extends boolean | undefined = boolean | undefined,
  > = Props.Render &
    Props.SuruUI<TValue> &
    Props.BaseUI<TValue, TMultiple> &
    Props.HTML<TValue, TMultiple>;

  export namespace Props {
    export type Render = SelectRootProps.Render;

    export type SuruUI<TValue = any> = SelectRootProps.SuruUI<TValue>;

    export type BaseUI<
      TValue = any,
      TMultiple extends boolean | undefined = boolean | undefined,
    > = SelectRootProps.BaseUI<TValue, TMultiple>;

    export type HTML<
      TValue = any,
      TMultiple extends boolean | undefined = boolean | undefined,
    > = SelectRootProps.HTML<TValue, TMultiple>;
  }

  export type Actions = SelectRootActions;

  export type ChangeEventDetails = SelectRootChangeEventDetails;

  export type ChangeEventReason = SelectRootChangeEventReason;

  export type ItemGroup<TValue = any> = SelectRootItemGroup<TValue>;

  export type Items<TValue = any> = SelectRootItems<TValue>;

  export type Radius = SelectRootRadius;

  export type Size = SelectRootSize;

  export type Variant = SelectRootVariant;
}
