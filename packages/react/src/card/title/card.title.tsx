import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import type { CardHeaderState } from "../header/card.header.jsx";
import { useCardContext } from "../root/card.root.context.js";

/**
 * {@link CardTitle} が持つ状態です。
 */
export type CardTitleState = CardHeaderState;

export namespace CardTitleProps {
  export type Render = RenderProps<CardTitleState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link CardTitle} に渡す props です。
 */
export type CardTitleProps = CardTitleProps.Render &
  CardTitleProps.SuruUI &
  CardTitleProps.BaseUI &
  CardTitleProps.HTML;

export type ICardTitle = IComponent<CardTitleProps>;

/**
 * カードのタイトルを表示するコンポーネントです。
 */
export const CardTitle: ICardTitle = function SuiCardTitle(props) {
  const ctx = useCardContext();

  return useRender({
    props: [
      props,
      {
        className: cn<CardTitleState>(
          "sui_card_title",
          (state) => `sui_card_title-size_${state.size}`,
          (state) => `sui_card_title-radius_${state.radius}`,
          (state) => state.outlined && "sui_card_title-outlined",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });
};

export { CardTitle as Title };

export namespace Title {
  export type State = CardTitleState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = CardTitleProps.Render;

    export type SuruUI = CardTitleProps.SuruUI;

    export type BaseUI = CardTitleProps.BaseUI;

    export type HTML = CardTitleProps.HTML;
  }
}
