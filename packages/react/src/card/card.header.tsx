import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link CardHeader} が持つ状態です。
 */
export type CardHeaderState = {};

export namespace CardHeaderProps {
  export type Render = RenderProps<CardHeaderState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link CardHeader} に渡す props です。
 */
export type CardHeaderProps = CardHeaderProps.Render &
  CardHeaderProps.SuruUI &
  CardHeaderProps.BaseUI &
  CardHeaderProps.HTML;

export type ICardHeader = IComponent<CardHeaderProps>;

/**
 * カードのタイトル・説明・アクションをまとめるコンポーネントです。
 */
export const CardHeader: ICardHeader = function SuiCardHeader(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_card_header",
      },
    ],
    defaultTagName: "div",
  });
};

export { CardHeader as Header };

export namespace Header {
  export type State = CardHeaderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = CardHeaderProps.Render;

    export type SuruUI = CardHeaderProps.SuruUI;

    export type BaseUI = CardHeaderProps.BaseUI;

    export type HTML = CardHeaderProps.HTML;
  }
}
