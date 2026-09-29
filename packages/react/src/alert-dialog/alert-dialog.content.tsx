import type { RenderProps } from "../_use-render.js";
import * as Card from "../card/card.parts.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AlertDialogContent} が持つ状態です。
 */
export type AlertDialogContentState = Card.CardContentState;

export namespace AlertDialogContentProps {
  export type Render = RenderProps<AlertDialogContentState>;

  export type SuruUI = Card.CardContentProps.SuruUI;

  export type BaseUI = Card.CardContentProps.BaseUI;

  export type HTML = Card.CardContentProps.HTML;
}

/**
 * {@link AlertDialogContent} に渡す props です。
 */
export type AlertDialogContentProps = AlertDialogContentProps.Render &
  AlertDialogContentProps.SuruUI &
  AlertDialogContentProps.BaseUI &
  AlertDialogContentProps.HTML;

export type IAlertDialogContent = IComponent<AlertDialogContentProps>;

/**
 * アラートダイアログの本文を表示するコンポーネントです。
 */
export const AlertDialogContent: IAlertDialogContent = function SuiAlertDialogContent(props) {
  return <Card.Content {...props} className={cn(props.className, "sui_alert_dialog_content")} />;
};

export { AlertDialogContent as Content };

export namespace Content {
  export type State = AlertDialogContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogContentProps.Render;

    export type SuruUI = AlertDialogContentProps.SuruUI;

    export type BaseUI = AlertDialogContentProps.BaseUI;

    export type HTML = AlertDialogContentProps.HTML;
  }
}
