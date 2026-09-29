import type { RenderProps } from "../_use-render.js";
import * as Card from "../card/card.parts.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AlertDialogFooter} が持つ状態です。
 */
export type AlertDialogFooterState = Card.Footer.State;

export namespace AlertDialogFooterProps {
  export type Render = RenderProps<AlertDialogFooterState>;

  export type SuruUI = Card.Footer.Props.SuruUI;

  export type BaseUI = Card.Footer.Props.BaseUI;

  export type HTML = Card.Footer.Props.HTML;
}

/**
 * {@link AlertDialogFooter} に渡す props です。
 */
export type AlertDialogFooterProps = AlertDialogFooterProps.Render &
  AlertDialogFooterProps.SuruUI &
  AlertDialogFooterProps.BaseUI &
  AlertDialogFooterProps.HTML;

export type IAlertDialogFooter = IComponent<AlertDialogFooterProps>;

/**
 * アラートダイアログの操作や補足情報を末尾に配置するコンポーネントです。
 *
 * 積み上げ式では内容を等幅の 2 列に並べます。
 */
export const AlertDialogFooter: IAlertDialogFooter = function SuiAlertDialogFooter(props) {
  return <Card.Footer {...props} className={cn(props.className, "sui_alert_dialog_footer")} />;
};

export { AlertDialogFooter as Footer };

export namespace Footer {
  export type State = AlertDialogFooterState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogFooterProps.Render;

    export type SuruUI = AlertDialogFooterProps.SuruUI;

    export type BaseUI = AlertDialogFooterProps.BaseUI;

    export type HTML = AlertDialogFooterProps.HTML;
  }
}
