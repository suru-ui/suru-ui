import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link AlertDialogBody} が持つ状態です。
 */
export type AlertDialogBodyState = {};

export namespace AlertDialogBodyProps {
  export type Render = RenderProps<AlertDialogBodyState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogBody} に渡す props です。
 */
export type AlertDialogBodyProps = AlertDialogBodyProps.Render &
  AlertDialogBodyProps.SuruUI &
  AlertDialogBodyProps.BaseUI &
  AlertDialogBodyProps.HTML;

/**
 * アラートダイアログのボディーコンポーネントです。
 */
export const AlertDialogBody: IComponent<AlertDialogBodyProps> = function SuiAlertDialogBody(
  props,
) {
  return useRender({
    props: [
      props,
      {
        className: "sui_alert_dialog_body",
      },
    ],
    defaultTagName: "div",
  });
};

export { AlertDialogBody as Body };

export namespace Body {
  export type State = AlertDialogBodyState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogBodyProps.Render;

    export type SuruUI = AlertDialogBodyProps.SuruUI;

    export type BaseUI = AlertDialogBodyProps.BaseUI;

    export type HTML = AlertDialogBodyProps.HTML;
  }
}
