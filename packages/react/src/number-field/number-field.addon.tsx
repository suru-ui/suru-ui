import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { DISABLE_FOCUS_ON_CLICK_DATA } from "./_number-field.jsx";

/**
 * {@link NumberFieldAddon} が持つ状態です。
 */
export type NumberFieldAddonState = {};

export namespace NumberFieldAddonProps {
  export type Render = RenderProps<NumberFieldAddonState>;

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
 * {@link NumberFieldAddon} に渡す props です。
 */
export type NumberFieldAddonProps = NumberFieldAddonProps.Render &
  NumberFieldAddonProps.SuruUI &
  NumberFieldAddonProps.BaseUI &
  NumberFieldAddonProps.HTML;

/**
 * 入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const NumberFieldAddon: IComponent<NumberFieldAddonProps> = function SuiNumberFieldAddon(
  props,
) {
  const { disableFocusOnClick = false, ...otherSpanProps } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        className: "sui_number_field_addon",
        [DISABLE_FOCUS_ON_CLICK_DATA]: disableFocusOnClick ? "true" : undefined,
      },
    ],
    defaultTagName: "span",
  });
};

export { NumberFieldAddon as Addon };

export namespace Addon {
  export type State = NumberFieldAddonState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldAddonProps.Render;

    export type SuruUI = NumberFieldAddonProps.SuruUI;

    export type BaseUI = NumberFieldAddonProps.BaseUI;

    export type HTML = NumberFieldAddonProps.HTML;
  }
}
