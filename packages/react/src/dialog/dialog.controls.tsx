import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DialogControls} が持つ状態です。
 */
export type DialogControlsState = {};

export namespace DialogControlsProps {
  export type Render = RenderProps<DialogControlsState>;

  export type SuruUI = {
    /**
     * 絶対位置として配置するかを指定します。
     *
     * @default false
     */
    absolute?: boolean | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DialogControls} に渡す props です。
 */
export type DialogControlsProps = DialogControlsProps.Render &
  DialogControlsProps.SuruUI &
  DialogControlsProps.BaseUI &
  DialogControlsProps.HTML;

/**
 * ダイアログのコントロールコンポーネントです。
 */
export const DialogControls: IComponent<DialogControlsProps> = function SuiDialogControls(props) {
  const { absolute = false, ...otherDivProps } = props;

  return useRender({
    props: [
      otherDivProps,
      {
        className: cn(
          "sui_dialog_controls",
          absolute && "sui_dialog_controls-absolute",
          !absolute && "sui_dialog_controls-relative",
        ),
      },
    ],
    defaultTagName: "div",
  });
};

export { DialogControls as Controls };

export namespace Controls {
  export type State = DialogControlsState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogControlsProps.Render;

    export type SuruUI = DialogControlsProps.SuruUI;

    export type BaseUI = DialogControlsProps.BaseUI;

    export type HTML = DialogControlsProps.HTML;
  }
}
