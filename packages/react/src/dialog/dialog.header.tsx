import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link DialogHeader} が持つ状態です。
 */
export type DialogHeaderState = {};

export namespace DialogHeaderProps {
  export type Render = RenderProps<DialogHeaderState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DialogHeader} に渡す props です。
 */
export type DialogHeaderProps = DialogHeaderProps.Render &
  DialogHeaderProps.SuruUI &
  DialogHeaderProps.BaseUI &
  DialogHeaderProps.HTML;

/**
 * ダイアログのヘッダーコンポーネントです。
 */
export const DialogHeader: IComponent<DialogHeaderProps> = function SuiDialogHeader(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_dialog_header",
      },
    ],
    defaultTagName: "div",
  });
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
