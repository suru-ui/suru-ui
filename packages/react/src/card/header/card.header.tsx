import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useCardContext } from "../root/card.root.context.js";
import type { CardRootState } from "../root/card.root.jsx";

/**
 * {@link CardHeader} が持つ状態です。
 */
export type CardHeaderState = CardRootState;

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
  const ctx = useCardContext();

  return useRender({
    props: [
      props,
      {
        className: cn<CardHeaderState>(
          "sui_card_header",
          (state) => `sui_card_header-size_${state.size}`,
          (state) => `sui_card_header-radius_${state.radius}`,
          (state) => state.outlined && "sui_card_header-outlined",
        ),
      },
    ],
    state: ctx,
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
