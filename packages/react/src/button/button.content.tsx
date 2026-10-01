import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
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
        className: cn<ButtonContentState>(
          "sui_button_content",
          (state) => `sui_button_content-size_${state.size}`,
          (state) => `sui_button_content-color_${state.color}`,
          (state) => `sui_button_content-radius_${state.radius}`,
          (state) => `sui_button_content-variant_${state.variant}`,
          (state) => state.item && "sui_button_content-item",
          (state) => state.muted && "sui_button_content-muted",
          (state) => state.outlined && "sui_button_content-outlined",
          (state) => state.pending && "sui_button_content-pending",
          (state) => state.squared && "sui_button_content-squared",
        ),
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
