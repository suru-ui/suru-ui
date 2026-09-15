import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link AlertDialogFooter} が持つ状態です。
 */
export type AlertDialogFooterState = {};

export namespace AlertDialogFooterProps {
  export type Render = RenderProps<AlertDialogFooterState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogFooter} に渡す props です。
 */
export type AlertDialogFooterProps = AlertDialogFooterProps.Render &
  AlertDialogFooterProps.SuruUI &
  AlertDialogFooterProps.BaseUI &
  AlertDialogFooterProps.HTML;

/**
 * アラートダイアログのフッターコンポーネントです。
 */
export const AlertDialogFooter: IComponent<AlertDialogFooterProps> = function SuiAlertDialogFooter(
  props,
) {
  return useRender({
    props: [
      props,
      {
        className: "sui_alert_dialog_footer",
      },
    ],
    defaultTagName: "div",
  });
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
