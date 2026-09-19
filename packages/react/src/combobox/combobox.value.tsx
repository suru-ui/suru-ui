import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { Override, IComponent } from "../types.js";
import { type ComboboxContext, useComboboxContext } from "./combobox.context.js";

export type ComboboxValueType<
  TItem = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> = Exclude<Combobox.Root.Props<TItem, TMultiple>["value"], null | undefined>;

export interface IComboboxValueRenderer<
  TItem = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> {
  (
    selectedValue: ComboboxValueType<TItem, TMultiple>,
    context: ComboboxContext<TItem>,
  ): React.ReactNode;
}

/**
 * {@link ComboboxValue} が持つ状態です。
 */
export type ComboboxValueState = Combobox.Value.State;

export namespace ComboboxValueProps {
  export type Render = {};

  export type SuruUI = {};

  export type BaseUI<
    TItem = any,
    TMultiple extends boolean | undefined = boolean | undefined,
  > = Override<
    Pick<
      React.ComponentProps<typeof Combobox.Value>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // ComboboxValueProps:
        "children" | "placeholder",
        keyof Render | keyof SuruUI
      >
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
  <TItem = any, TMultiple extends boolean | undefined = boolean | undefined>(
    props: ComboboxValueProps<TItem, TMultiple>,
  ): IComponent.Return;
}

/**
 * 現在の選択値を子要素へ反映する要素です。
 *
 * それ自身は HTML 要素をレンダリングしません。
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
