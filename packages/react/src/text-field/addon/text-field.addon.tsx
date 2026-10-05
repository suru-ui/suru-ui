import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { DISABLE_FOCUS_ON_CLICK_DATA } from "../_text-field.jsx";
import { type TextFieldContext, useTextFieldContext } from "../root/text-field.root.context.js";

/**
 * {@link TextFieldAddon} の状態です。
 */
export type TextFieldAddonState = TextFieldContext;

export namespace TextFieldAddonProps {
  export type Render = RenderProps<TextFieldAddonState>;

  export type SuruUI = {
    /**
     * クリック時の入力欄への自動フォーカスを無効にするかどうかを指定します。
     *
     * @default false
     */
    disableFocusOnClick?: boolean | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TextFieldAddon} に渡す props です。
 */
export type TextFieldAddonProps = TextFieldAddonProps.Render &
  TextFieldAddonProps.SuruUI &
  TextFieldAddonProps.BaseUI &
  TextFieldAddonProps.HTML;

export type ITextFieldAddon = IComponent<TextFieldAddonProps>;

/**
 * 入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const TextFieldAddon: ITextFieldAddon = function SuiTextFieldAddon(props) {
  const ctx = useTextFieldContext();
  const { disableFocusOnClick = false, ...otherSpanProps } = props;
  const state = ctx;

  return useRender({
    props: [
      otherSpanProps,
      {
        className: cn<TextFieldAddonState>(
          "sui_text_field_addon",
          (state) => `sui_text_field_addon-size_${state.size}`,
          (state) => `sui_text_field_addon-color_${state.color}`,
          (state) => `sui_text_field_addon-radius_${state.radius}`,
          (state) => `sui_text_field_addon-variant_${state.variant}`,
          (state) => state.outlined && "sui_text_field_addon-outlined",
        ),
        [DISABLE_FOCUS_ON_CLICK_DATA]: disableFocusOnClick ? "true" : undefined,
      },
    ],
    state,
    defaultTagName: "span",
  });
};

export { TextFieldAddon as Addon };

export namespace Addon {
  export type State = TextFieldAddonState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TextFieldAddonProps.Render;

    export type SuruUI = TextFieldAddonProps.SuruUI;

    export type BaseUI = TextFieldAddonProps.BaseUI;

    export type HTML = TextFieldAddonProps.HTML;
  }
}
