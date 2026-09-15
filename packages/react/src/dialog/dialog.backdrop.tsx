import { Dialog } from "@base-ui/react/dialog";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DialogBackdrop} が持つ状態です。
 */
export type DialogBackdropState = Dialog.Backdrop.State;

export namespace DialogBackdropProps {
  export type Render = RenderProps<DialogBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Dialog.Backdrop>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DialogBackdropProps:
      "forceRender",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Dialog.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DialogBackdrop} に渡す props です。
 */
export type DialogBackdropProps = DialogBackdropProps.Render &
  DialogBackdropProps.SuruUI &
  DialogBackdropProps.BaseUI &
  DialogBackdropProps.HTML;

/**
 * ポップアップの背後に表示されるオーバーレイコンポーネントです。
 */
export const DialogBackdrop: IComponent<DialogBackdropProps> = function SuiDialogBackdrop(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Backdrop {...otherProps} className={cn(className, "sui_dialog_backdrop")} />;
};

export { DialogBackdrop as Backdrop };

export namespace Backdrop {
  export type State = DialogBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogBackdropProps.Render;

    export type SuruUI = DialogBackdropProps.SuruUI;

    export type BaseUI = DialogBackdropProps.BaseUI;

    export type HTML = DialogBackdropProps.HTML;
  }
}
