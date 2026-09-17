import { Combobox } from "@base-ui/react/combobox";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { ComboboxContext } from "./combobox.context.js";

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
export type ComboboxRootColor = Color;

/**
 * コンボボックスに表示する項目の一覧です。
 *
 * - 平坦な項目の配列
 * - `items` を持つグループの配列。グループには任意で `label` を付けられます。
 */
export type ComboboxRootItems<TValue = any> =
  | readonly TValue[]
  | readonly {
      readonly items: readonly TValue[];
      readonly label?: React.ReactNode;
    }[];

/**
 * コンボボックスの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type ComboboxRootRadius = "none" | Size | "full";

/**
 * コンボボックスの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type ComboboxRootSize = Size;

/**
 * コンボボックスの主な外観の種類です。
 *
 * - `"naked"`: 背景のない入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ComboboxRootVariant = "naked" | "liquid";

/**
 * {@link ComboboxRoot} が持つ状態です。
 */
export type ComboboxRootState = Combobox.Root.State;

export namespace ComboboxRootProps {
  export type Render = RenderProps<ComboboxRootState>;

  export type SuruUI<TValue = any> = {
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
    items?: ComboboxRootItems<TValue> | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

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

  export type BaseUI<TValue = any, TMultiple extends boolean | undefined = false> = Pick<
    Combobox.Root.Props<TValue, TMultiple>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxRootProps + AriaCombobox.Props:
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
      | "filteredItems"
      | "filter"
      | "virtualized"
      | "inline"
      | "modal"
      | "limit"
      | "locale"
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
      | "onValueChange",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TValue = any, TMultiple extends boolean | undefined = false> = Omit<
    Combobox.Root.Props<TValue, TMultiple>,
    keyof Render | keyof SuruUI | keyof BaseUI<TValue, TMultiple>
  >;
}

/**
 * {@link ComboboxRoot} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export type ComboboxRootProps<
  TValue = any,
  TMultiple extends boolean | undefined = false,
> = ComboboxRootProps.Render &
  ComboboxRootProps.SuruUI<TValue> &
  ComboboxRootProps.BaseUI<TValue, TMultiple> &
  ComboboxRootProps.HTML<TValue, TMultiple>;

interface IComboboxRoot extends IComponent<ComboboxRootProps<unknown, boolean | undefined>> {
  /**
   * @template TValue 項目の値の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   */
  <TValue, TMultiple extends boolean | undefined = false>(
    props: ComboboxRootProps<TValue, TMultiple>,
  ): IComponent.Return;
}

/**
 * コンボボックスのルート要素です。
 *
 * 選択状態とポップアップの開閉状態を管理し、スタイルを子パーツへ伝播します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const ComboboxRoot: IComboboxRoot = function SuiComboboxRoot<
  TValue,
  TMultiple extends boolean | undefined = false,
>(props: ComboboxRootProps<TValue, TMultiple>) {
  const {
    size = "md",
    color = "grey",
    radius = size,
    variant = "liquid",
    outlined = false,
    ...otherProps
  } = props;
  const ctx = React.useMemo<ComboboxContext>(
    () => ({
      size,
      color,
      radius,
      variant,
      outlined,
    }),
    [size, color, radius, variant, outlined],
  );

  return (
    <ComboboxContext value={ctx}>
      <Combobox.Root {...otherProps} />
    </ComboboxContext>
  );
};

export { ComboboxRoot as Root };

export namespace Root {
  export type State = ComboboxRootState;

  export type Props<TValue = any, TMultiple extends boolean | undefined = false> = Props.Render &
    Props.SuruUI<TValue> &
    Props.BaseUI<TValue, TMultiple> &
    Props.HTML<TValue, TMultiple>;

  export namespace Props {
    export type Render = ComboboxRootProps.Render;

    export type SuruUI<TValue = any> = ComboboxRootProps.SuruUI<TValue>;

    export type BaseUI<
      TValue = any,
      TMultiple extends boolean | undefined = false,
    > = ComboboxRootProps.BaseUI<TValue, TMultiple>;

    export type HTML<
      TValue = any,
      TMultiple extends boolean | undefined = false,
    > = ComboboxRootProps.HTML<TValue, TMultiple>;
  }

  export type Actions = ComboboxRootActions;

  export type ChangeEventDetails = ComboboxRootChangeEventDetails;

  export type ChangeEventReason = ComboboxRootChangeEventReason;

  export type Color = ComboboxRootColor;

  export type HighlightEventDetails = ComboboxRootHighlightEventDetails;

  export type HighlightEventReason = ComboboxRootHighlightEventReason;

  export type Items<TValue = any> = ComboboxRootItems<TValue>;

  export type Radius = ComboboxRootRadius;

  export type Size = ComboboxRootSize;

  export type Variant = ComboboxRootVariant;
}
