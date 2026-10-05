import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import type { CardHeaderState } from "../header/card.header.jsx";
import { useCardContext } from "../root/card.root.context.js";

/**
 * {@link CardDescription} が持つ状態です。
 */
export type CardDescriptionState = CardHeaderState;

export namespace CardDescriptionProps {
  export type Render = RenderProps<CardDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link CardDescription} に渡す props です。
 */
export type CardDescriptionProps = CardDescriptionProps.Render &
  CardDescriptionProps.SuruUI &
  CardDescriptionProps.BaseUI &
  CardDescriptionProps.HTML;

export type ICardDescription = IComponent<CardDescriptionProps>;

/**
 * カードのタイトルを補足する説明を表示するコンポーネントです。
 */
export const CardDescription: ICardDescription = function SuiCardDescription(props) {
  const ctx = useCardContext();

  return useRender({
    props: [
      props,
      {
        className: cn<CardDescriptionState>(
          "sui_card_description",
          (state) => `sui_card_description-size_${state.size}`,
          (state) => `sui_card_description-radius_${state.radius}`,
          (state) => state.outlined && "sui_card_description-outlined",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });
};

export { CardDescription as Description };

export namespace Description {
  export type State = CardDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = CardDescriptionProps.Render;

    export type SuruUI = CardDescriptionProps.SuruUI;

    export type BaseUI = CardDescriptionProps.BaseUI;

    export type HTML = CardDescriptionProps.HTML;
  }
}
