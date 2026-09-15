import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link DialogBody} が持つ状態です。
 */
export type DialogBodyState = {};

export namespace DialogBodyProps {
  export type Render = RenderProps<DialogBodyState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DialogBody} に渡す props です。
 */
export type DialogBodyProps = DialogBodyProps.Render &
  DialogBodyProps.SuruUI &
  DialogBodyProps.BaseUI &
  DialogBodyProps.HTML;

/**
 * ダイアログのボディーコンポーネントです。
 */
export const DialogBody: IComponent<DialogBodyProps> = function SuiDialogBody(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_dialog_body",
      },
    ],
    defaultTagName: "div",
  });
};

export { DialogBody as Body };

export namespace Body {
  export type State = DialogBodyState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogBodyProps.Render;

    export type SuruUI = DialogBodyProps.SuruUI;

    export type BaseUI = DialogBodyProps.BaseUI;

    export type HTML = DialogBodyProps.HTML;
  }
}
