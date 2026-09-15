import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link AlertDialogHeader} が持つ状態です。
 */
export type AlertDialogHeaderState = {};

export namespace AlertDialogHeaderProps {
  export type Render = RenderProps<AlertDialogHeaderState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogHeader} に渡す props です。
 */
export type AlertDialogHeaderProps = AlertDialogHeaderProps.Render &
  AlertDialogHeaderProps.SuruUI &
  AlertDialogHeaderProps.BaseUI &
  AlertDialogHeaderProps.HTML;

/**
 * アラートダイアログのヘッダーコンポーネントです。
 */
export const AlertDialogHeader: IComponent<AlertDialogHeaderProps> = function SuiAlertDialogHeader(
  props,
) {
  return useRender({
    props: [
      props,
      {
        className: "sui_alert_dialog_header",
      },
    ],
    defaultTagName: "div",
  });
};

export { AlertDialogHeader as Header };

export namespace Header {
  export type State = AlertDialogHeaderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogHeaderProps.Render;

    export type SuruUI = AlertDialogHeaderProps.SuruUI;

    export type BaseUI = AlertDialogHeaderProps.BaseUI;

    export type HTML = AlertDialogHeaderProps.HTML;
  }
}
