import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { Override, IComponent } from "../../types.js";
import { type ComboboxContext, useComboboxContext } from "../root/combobox.root.context.js";

/**
 * 選択値の型です。
 *
 * @template TItem 項目の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export type ComboboxValueType<
  TItem = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> = Exclude<Combobox.Root.Props<TItem, TMultiple>["value"], null | undefined>;

/**
 * 選択値をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export interface IComboboxValueRenderer<
  TItem = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> {
  /**
   * 選択値をレンダリングします。
   *
   * @param selectedValue 現在の選択値です。
   * @param context コンボボックスのコンテキストです。
   * @returns レンダリングする内容です。
   */
  (
    selectedValue: ComboboxValueType<TItem, TMultiple>,
    context: ComboboxContext<TItem>,
  ): React.ReactNode;
}

/**
 * {@link ComboboxValue} の状態です。
 */
export type ComboboxValueState = Combobox.Value.State;

export namespace ComboboxValueProps {
  export type Render = {};

  export type SuruUI = {};

  export type BaseUI<
    TItem = any,
    TMultiple extends boolean | undefined = boolean | undefined,
  > = Override<
    Omit<
      Pick<
        React.ComponentProps<typeof Combobox.Value>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // ComboboxValueProps より:
        "children" | "placeholder"
      >,
      keyof Render | keyof SuruUI
    >,
    {
      children?: React.ReactNode | IComboboxValueRenderer<TItem, TMultiple>;
    }
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Value>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxValue} に渡す props です。
 */
export type ComboboxValueProps<
  TItem = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> = ComboboxValueProps.Render &
  ComboboxValueProps.SuruUI &
  ComboboxValueProps.BaseUI<TItem, TMultiple> &
  ComboboxValueProps.HTML;

export interface IComboboxValue extends IComponent<ComboboxValueProps> {
  /**
   * @template TItem 項目の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   */
  <TItem = any, TMultiple extends boolean | undefined = boolean | undefined>(
    props: ComboboxValueProps<TItem, TMultiple>,
  ): IComponent.Return;
}

/**
 * 現在の選択値を子要素へ反映する要素です。
 *
 * これ自身は HTML 要素をレンダリングしません。
 */
export const ComboboxValue: IComboboxValue = function SuiComboboxValue(props: ComboboxValueProps) {
  const ctx = useComboboxContext();
  const { children, ...otherProps } = props;

  return (
    <Combobox.Value {...otherProps}>
      {typeof children === "function" ? (selectedValue) => children(selectedValue, ctx) : children}
    </Combobox.Value>
  );
};

export { ComboboxValue as Value };

export namespace Value {
  export type State = ComboboxValueState;

  export type Props<
    TItem = any,
    TMultiple extends boolean | undefined = boolean | undefined,
  > = Props.Render & Props.SuruUI & Props.BaseUI<TItem, TMultiple> & Props.HTML;

  export namespace Props {
    export type Render = ComboboxValueProps.Render;

    export type SuruUI = ComboboxValueProps.SuruUI;

    export type BaseUI<
      TItem = any,
      TMultiple extends boolean | undefined = boolean | undefined,
    > = ComboboxValueProps.BaseUI<TItem, TMultiple>;

    export type HTML = ComboboxValueProps.HTML;
  }

  export type IRenderer<
    TItem = any,
    TMultiple extends boolean | undefined = boolean | undefined,
  > = IComboboxValueRenderer<TItem, TMultiple>;
}
