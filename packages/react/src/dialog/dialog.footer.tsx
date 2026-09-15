import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link DialogFooter} が持つ状態です。
 */
export type DialogFooterState = {};

export namespace DialogFooterProps {
  export type Render = RenderProps<DialogFooterState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DialogFooter} に渡す props です。
 */
export type DialogFooterProps = DialogFooterProps.Render &
  DialogFooterProps.SuruUI &
  DialogFooterProps.BaseUI &
  DialogFooterProps.HTML;

/**
 * ダイアログのフッターコンポーネントです。
 */
export const DialogFooter: IComponent<DialogFooterProps> = function SuiDialogFooter(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_dialog_footer",
      },
    ],
    defaultTagName: "div",
  });
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
