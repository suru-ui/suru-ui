import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link CardAction} が持つ状態です。
 */
export type CardActionState = {};

export namespace CardActionProps {
  export type Render = RenderProps<CardActionState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link CardAction} に渡す props です。
 */
export type CardActionProps = CardActionProps.Render &
  CardActionProps.SuruUI &
  CardActionProps.BaseUI &
  CardActionProps.HTML;

export type ICardAction = IComponent<CardActionProps>;

/**
 * カードのヘッダー右上に操作要素を配置するコンポーネントです。
 */
export const CardAction: ICardAction = function SuiCardAction(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_card_action",
      },
    ],
    defaultTagName: "div",
  });
};

export { CardAction as Action };

export namespace Action {
  export type State = CardActionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = CardActionProps.Render;

    export type SuruUI = CardActionProps.SuruUI;

    export type BaseUI = CardActionProps.BaseUI;

    export type HTML = CardActionProps.HTML;
  }
}
