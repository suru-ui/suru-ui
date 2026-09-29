import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { type ButtonContext, useButtonContext } from "./button.context.js";

/**
 * {@link ButtonContent} が持つ状態です。
 */
export type ButtonContentState = ButtonContext;

export namespace ButtonContentProps {
  export type Render = RenderProps<ButtonContentState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ButtonContent} に渡す props です。
 */
export type ButtonContentProps = ButtonContentProps.Render &
  ButtonContentProps.SuruUI &
  ButtonContentProps.BaseUI &
  ButtonContentProps.HTML;

export type IButtonContent = IComponent<ButtonContentProps>;

/**
 * ボタンのコンテンツを表示するコンポーネントです。
 */
export const ButtonContent: IButtonContent = function SuiButtonContent(props) {
  const ctx = useButtonContext();

  return useRender({
    props: [
      props,
      {
        className: "sui_button_content",
      },
    ],
    state: ctx,
    defaultTagName: "span",
  });
};

export { ButtonContent as Content };

export namespace Content {
  export type State = ButtonContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ButtonContentProps.Render;

    export type SuruUI = ButtonContentProps.SuruUI;

    export type BaseUI = ButtonContentProps.BaseUI;

    export type HTML = ButtonContentProps.HTML;
  }
}
