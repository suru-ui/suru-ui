import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { useCardContext } from "./card.context.js";
import type { CardRootState } from "./card.root.jsx";

/**
 * {@link CardContent} が持つ状態です。
 */
export type CardContentState = CardRootState;

export namespace CardContentProps {
  export type Render = RenderProps<CardContentState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link CardContent} に渡す props です。
 */
export type CardContentProps = CardContentProps.Render &
  CardContentProps.SuruUI &
  CardContentProps.BaseUI &
  CardContentProps.HTML;

export type ICardContent = IComponent<CardContentProps>;

/**
 * カードの本文を表示するコンポーネントです。
 */
export const CardContent: ICardContent = function SuiCardContent(props) {
  const ctx = useCardContext();

  return useRender({
    props: [
      props,
      {
        className: "sui_card_content",
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });
};

export { CardContent as Content };

export namespace Content {
  export type State = CardContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = CardContentProps.Render;

    export type SuruUI = CardContentProps.SuruUI;

    export type BaseUI = CardContentProps.BaseUI;

    export type HTML = CardContentProps.HTML;
  }
}
