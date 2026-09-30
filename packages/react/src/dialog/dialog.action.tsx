import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Card from "../card/card.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type DialogPopupContext, useDialogPopupContext } from "./dialog.popup.context.js";

/**
 * {@link DialogAction} が持つ状態です。
 */
export type DialogActionState = Override<Card.Action.State, DialogPopupContext>;

export namespace DialogActionProps {
  export type Render = RenderProps<DialogActionState>;

  export type SuruUI = Card.Action.Props.SuruUI;

  export type BaseUI = Card.Action.Props.BaseUI;

  export type HTML = Card.Action.Props.HTML;
}

/**
 * {@link DialogAction} に渡す props です。
 */
export type DialogActionProps = DialogActionProps.Render &
  DialogActionProps.SuruUI &
  DialogActionProps.BaseUI &
  DialogActionProps.HTML;

export type IDialogAction = IComponent<DialogActionProps>;

/**
 * ダイアログのヘッダー右上に操作要素を配置するコンポーネントです。
 *
 * 積み上げ式では右上へ重ねて配置します。
 */
export const DialogAction: IDialogAction = function SuiDialogAction(props) {
  const ctx = useDialogPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Card.Action
      {...otherProps}
      {...proxyRenderProps<Card.Action.State, DialogActionState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<DialogActionState>(className, "sui_dialog_action"),
        },
      )}
    />
  );
};

export { DialogAction as Action };

export namespace Action {
  export type State = DialogActionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogActionProps.Render;

    export type SuruUI = DialogActionProps.SuruUI;

    export type BaseUI = DialogActionProps.BaseUI;

    export type HTML = DialogActionProps.HTML;
  }
}
