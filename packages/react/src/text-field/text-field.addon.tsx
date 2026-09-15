import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { DISABLE_FOCUS_ON_CLICK_DATA } from "./_text-field.jsx";

/**
 * {@link TextFieldAddon} の状態です。
 */
export type TextFieldAddonState = {};

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

/**
 * 入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const TextFieldAddon: IComponent<TextFieldAddonProps> = function SuiTextFieldAddon(props) {
  const { disableFocusOnClick = false, ...otherSpanProps } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        className: "sui_text_field_addon",
        [DISABLE_FOCUS_ON_CLICK_DATA]: disableFocusOnClick ? "true" : undefined,
      },
    ],
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
