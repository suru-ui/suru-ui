import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useCardContext } from "../root/card.root.context.js";
import type { CardRootState } from "../root/card.root.jsx";

/**
 * {@link CardFooter} が持つ状態です。
 */
export type CardFooterState = CardRootState;

export namespace CardFooterProps {
  export type Render = RenderProps<CardFooterState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link CardFooter} に渡す props です。
 */
export type CardFooterProps = CardFooterProps.Render &
  CardFooterProps.SuruUI &
  CardFooterProps.BaseUI &
  CardFooterProps.HTML;

export type ICardFooter = IComponent<CardFooterProps>;

/**
 * カードの操作や補足情報を末尾に配置するコンポーネントです。
 */
export const CardFooter: ICardFooter = function SuiCardFooter(props) {
  const ctx = useCardContext();

  return useRender({
    props: [
      props,
      {
        className: cn<CardFooterState>(
          "sui_card_footer",
          (state) => `sui_card_footer-size_${state.size}`,
          (state) => `sui_card_footer-radius_${state.radius}`,
          (state) => state.outlined && "sui_card_footer-outlined",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });
};

export { CardFooter as Footer };

export namespace Footer {
  export type State = CardFooterState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = CardFooterProps.Render;

    export type SuruUI = CardFooterProps.SuruUI;

    export type BaseUI = CardFooterProps.BaseUI;

    export type HTML = CardFooterProps.HTML;
  }
}
