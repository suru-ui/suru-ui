import type { RenderProps } from "../_use-render.js";
import * as Card from "../card/card.parts.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DialogHeader} が持つ状態です。
 */
export type DialogHeaderState = Card.CardHeaderState;

export namespace DialogHeaderProps {
  export type Render = RenderProps<DialogHeaderState>;

  export type SuruUI = Card.CardHeaderProps.SuruUI;

  export type BaseUI = Card.CardHeaderProps.BaseUI;

  export type HTML = Card.CardHeaderProps.HTML;
}

/**
 * {@link DialogHeader} に渡す props です。
 */
export type DialogHeaderProps = DialogHeaderProps.Render &
  DialogHeaderProps.SuruUI &
  DialogHeaderProps.BaseUI &
  DialogHeaderProps.HTML;

export type IDialogHeader = IComponent<DialogHeaderProps>;

/**
 * ダイアログの見出し・説明・操作をまとめるコンポーネントです。
 */
export const DialogHeader: IDialogHeader = function SuiDialogHeader(props) {
  return <Card.Header {...props} className={cn(props.className, "sui_dialog_header")} />;
};

export { DialogHeader as Header };

export namespace Header {
  export type State = DialogHeaderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogHeaderProps.Render;

    export type SuruUI = DialogHeaderProps.SuruUI;

    export type BaseUI = DialogHeaderProps.BaseUI;

    export type HTML = DialogHeaderProps.HTML;
  }
}
