import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type CardContext, useCardContext } from "../root/card.root.context.js";

/**
 * {@link CardAction} が持つ状態です。
 */
export type CardActionState = Override<
  CardContext,
  {
    /**
     * 絶対位置に配置されているかどうかです。
     */
    absolute: boolean;
  }
>;

export namespace CardActionProps {
  export type Render = RenderProps<CardActionState>;

  export type SuruUI = {
    /**
     * 絶対位置で配置します。
     */
    absolute?: boolean | undefined;
  };

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
  const ctx = useCardContext();
  const { absolute = false, ...otherDivProps } = props;

  return useRender({
    props: [
      otherDivProps,
      {
        className: cn<CardActionState>(
          "sui_card_action",
          (state) => `sui_card_action-size_${state.size}`,
          (state) => `sui_card_action-radius_${state.radius}`,
          (state) => state.absolute && "sui_card_action-absolute",
          (state) => state.outlined && "sui_card_action-outlined",
        ),
      },
    ],
    state: { ...ctx, absolute },
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
