import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxPlaceholder} が持つ状態です。
 */
export type ComboboxPlaceholderState = {};

export namespace ComboboxPlaceholderProps {
  export type Render = RenderProps<ComboboxPlaceholderState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxPlaceholder} に渡す props です。
 */
export type ComboboxPlaceholderProps = ComboboxPlaceholderProps.Render &
  ComboboxPlaceholderProps.SuruUI &
  ComboboxPlaceholderProps.BaseUI &
  ComboboxPlaceholderProps.HTML;

/**
 * 値未選択時に代替文字列を表示する要素です。
 *
 * 入力欄をポップアップの外に置く構成では {@link ComboboxInput} の `placeholder` が代替表示を担うため、このパーツは主に入力欄をポップアップの中に置く構成のトリガー内で使います。
 */
export const ComboboxPlaceholder: IComponent<ComboboxPlaceholderProps> =
  function SuiComboboxPlaceholder(props) {
    const { children, ...otherSpanProps } = props;

    return useRender({
      props: [
        otherSpanProps,
        {
          children,
          className: "sui_combobox_placeholder",
        },
      ],
      defaultTagName: "span",
    });
  };

export { ComboboxPlaceholder as Placeholder };

export namespace Placeholder {
  export type State = ComboboxPlaceholderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxPlaceholderProps.Render;

    export type SuruUI = ComboboxPlaceholderProps.SuruUI;

    export type BaseUI = ComboboxPlaceholderProps.BaseUI;

    export type HTML = ComboboxPlaceholderProps.HTML;
  }
}
