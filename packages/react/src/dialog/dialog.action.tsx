import type { RenderProps } from "../_use-render.js";
import * as Card from "../card/card.parts.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DialogAction} が持つ状態です。
 */
export type DialogActionState = Card.CardActionState;

export namespace DialogActionProps {
  export type Render = RenderProps<DialogActionState>;

  export type SuruUI = Card.CardActionProps.SuruUI;

  export type BaseUI = Card.CardActionProps.BaseUI;

  export type HTML = Card.CardActionProps.HTML;
}

/**
 * {@link DialogAction} に渡す props です。
 */
export type DialogActionProps = DialogActionProps.Render &
  DialogActionProps.SuruUI &
  DialogActionProps.BaseUI &
  DialogActionProps.HTML;

/**
 * ダイアログのヘッダー右上に操作要素を配置するコンポーネントです。
 *
 * 積み上げ式では右上へ重ねて配置します。
 */
export const DialogAction: IComponent<DialogActionProps> = function SuiDialogAction(props) {
  return <Card.Action {...props} className={cn(props.className, "sui_dialog_action")} />;
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
