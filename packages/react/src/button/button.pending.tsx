import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { type ButtonContext, useButtonContext } from "./button.context.js";

/**
 * {@link ButtonPending} が持つ状態です。
 */
export type ButtonPendingState = ButtonContext;

export namespace ButtonPendingProps {
  export type Render = RenderProps<ButtonPendingState>;

  export type SuruUI = {
    /**
     * ボタンが保留状態でないときも DOM に保持するかどうかを指定します。
     *
     * @default false
     */
    keepMounted?: boolean | undefined;

    /**
     * 親要素を覆うオーバーレイとして表示するかどうかを指定します。
     *
     * @default false
     */
    overlay?: boolean | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ButtonPending} に渡す props です。
 */
export type ButtonPendingProps = ButtonPendingProps.Render &
  ButtonPendingProps.SuruUI &
  ButtonPendingProps.BaseUI &
  ButtonPendingProps.HTML;

/**
 * ボタンの保留状態を表示するコンポーネントです。
 *
 * 保留中のみ有効になります。
 */
export const ButtonPending: IComponent<ButtonPendingProps> = function SuiButtonPending(props) {
  const ctx = useButtonContext();
  const { overlay = false, keepMounted = false, ...otherSpanProps } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        className: cn(
          "sui_button_pending",
          overlay && "sui_button_pending-overlay",
          (state: ButtonPendingState) => state.pending && "sui_button_pending-enabled",
          (state: ButtonPendingState) =>
            !state.pending && keepMounted && "sui_button_pending-visibility_hidden",
        ),
      },
    ],
    state: ctx,
    enabled: ctx.pending || keepMounted,
    defaultTagName: "span",
  });
};

export { ButtonPending as Pending };

export namespace Pending {
  export type State = ButtonPendingState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ButtonPendingProps.Render;

    export type SuruUI = ButtonPendingProps.SuruUI;

    export type BaseUI = ButtonPendingProps.BaseUI;

    export type HTML = ButtonPendingProps.HTML;
  }
}
