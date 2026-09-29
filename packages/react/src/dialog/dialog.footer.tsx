import type { RenderProps } from "../_use-render.js";
import * as Card from "../card/card.parts.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DialogFooter} が持つ状態です。
 */
export type DialogFooterState = Card.CardFooterState;

export namespace DialogFooterProps {
  export type Render = RenderProps<DialogFooterState>;

  export type SuruUI = Card.CardFooterProps.SuruUI;

  export type BaseUI = Card.CardFooterProps.BaseUI;

  export type HTML = Card.CardFooterProps.HTML;
}

/**
 * {@link DialogFooter} に渡す props です。
 */
export type DialogFooterProps = DialogFooterProps.Render &
  DialogFooterProps.SuruUI &
  DialogFooterProps.BaseUI &
  DialogFooterProps.HTML;

export type IDialogFooter = IComponent<DialogFooterProps>;

/**
 * ダイアログの操作や補足情報を末尾に配置するコンポーネントです。
 *
 * 積み上げ式では内容を等幅の 2 列に並べます。
 */
export const DialogFooter: IDialogFooter = function SuiDialogFooter(props) {
  return <Card.Footer {...props} className={cn(props.className, "sui_dialog_footer")} />;
};

export { DialogFooter as Footer };

export namespace Footer {
  export type State = DialogFooterState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogFooterProps.Render;

    export type SuruUI = DialogFooterProps.SuruUI;

    export type BaseUI = DialogFooterProps.BaseUI;

    export type HTML = DialogFooterProps.HTML;
  }
}
