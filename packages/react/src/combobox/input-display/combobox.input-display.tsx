import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useComboboxContext } from "../root/combobox.root.context.js";
import type { ComboboxInputDisplayContext } from "./combobox.input-display.context.js";

/**
 * {@link ComboboxInputDisplay} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxInputDisplayState<TItem = any> = ComboboxInputDisplayContext<TItem>;

export namespace ComboboxInputDisplayProps {
  export type Render<TItem = any> = RenderProps<ComboboxInputDisplayState<TItem>>;

  export type SuruUI = {
    /** `value` が空のときに代わりに表示する内容です。 */
    placeholder?: React.ReactNode | undefined;

    /**
     * 表示する内容です。
     *
     * 空のときは `placeholder` を代わりに表示します。
     */
    value?: React.ReactNode | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxInputDisplay} に渡す props です。
 */
export type ComboboxInputDisplayProps = ComboboxInputDisplayProps.Render &
  ComboboxInputDisplayProps.SuruUI &
  ComboboxInputDisplayProps.BaseUI &
  ComboboxInputDisplayProps.HTML;

export type IComboboxInputDisplay = IComponent<ComboboxInputDisplayProps>;

/**
 * 選択値を表示する要素です。
 *
 * {@link ComboboxInput} と同じ見た目を持つ描画専用の要素で、入力欄をポップアップの中に置く構成のトリガー内で使います。
 */
export const ComboboxInputDisplay: IComboboxInputDisplay = (props) => {
  const ctx = useComboboxContext();
  const { value, placeholder, ...otherSpanProps } = props;
  const label = ctx.itemToStringLabel(value);

  return useRender({
    props: [
      otherSpanProps,
      {
        children: label || placeholder,
        className: cn<ComboboxInputDisplayState>(
          "sui_combobox_input_display",
          !label && "sui_combobox_input_display-placeholder",
          (state) => `sui_combobox_input_display-size_${state.size}`,
          (state) => `sui_combobox_input_display-color_${state.color}`,
          (state) => `sui_combobox_input_display-radius_${state.radius}`,
          (state) => `sui_combobox_input_display-variant_${state.variant}`,
          (state) => state.outlined && "sui_combobox_input_display-outlined",
          (state) => state.multiple && "sui_combobox_input_display-multiple",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "span",
  });
};

export { ComboboxInputDisplay as InputDisplay };
export namespace InputDisplay {
  export type State<TItem = any> = ComboboxInputDisplayState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ComboboxInputDisplayProps.Render<TItem>;

    export type SuruUI = ComboboxInputDisplayProps.SuruUI;

    export type BaseUI = ComboboxInputDisplayProps.BaseUI;

    export type HTML = ComboboxInputDisplayProps.HTML;
  }
}
