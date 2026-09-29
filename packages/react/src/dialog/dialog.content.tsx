import type { RenderProps } from "../_use-render.js";
import * as Card from "../card/card.parts.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DialogContent} が持つ状態です。
 */
export type DialogContentState = Card.CardContentState;

export namespace DialogContentProps {
  export type Render = RenderProps<DialogContentState>;

  export type SuruUI = Card.CardContentProps.SuruUI;

  export type BaseUI = Card.CardContentProps.BaseUI;

  export type HTML = Card.CardContentProps.HTML;
}

/**
 * {@link DialogContent} に渡す props です。
 */
export type DialogContentProps = DialogContentProps.Render &
  DialogContentProps.SuruUI &
  DialogContentProps.BaseUI &
  DialogContentProps.HTML;

/**
 * ダイアログの本文を表示するコンポーネントです。
 */
export const DialogContent: IComponent<DialogContentProps> = function SuiDialogContent(props) {
  return <Card.Content {...props} className={cn(props.className, "sui_dialog_content")} />;
};

export { DialogContent as Content };

export namespace Content {
  export type State = DialogContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogContentProps.Render;

    export type SuruUI = DialogContentProps.SuruUI;

    export type BaseUI = DialogContentProps.BaseUI;

    export type HTML = DialogContentProps.HTML;
  }
}
