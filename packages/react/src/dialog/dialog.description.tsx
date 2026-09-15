import { Dialog } from "@base-ui/react/dialog";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DialogDescription} が持つ状態です。
 */
export type DialogDescriptionState = Dialog.Description.State;

export namespace DialogDescriptionProps {
  export type Render = RenderProps<DialogDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Dialog.Description>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DialogDescriptionProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Dialog.Description>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DialogDescription} に渡す props です。
 */
export type DialogDescriptionProps = DialogDescriptionProps.Render &
  DialogDescriptionProps.SuruUI &
  DialogDescriptionProps.BaseUI &
  DialogDescriptionProps.HTML;

/**
 * ダイアログの内容を表示するコンポーネントです。
 */
export const DialogDescription: IComponent<DialogDescriptionProps> = function SuiDialogDescription(
  props,
) {
  const { className, ...otherProps } = props;

  return <Dialog.Description {...otherProps} className={cn(className, "sui_dialog_description")} />;
};

export { DialogDescription as Description };

export namespace Description {
  export type State = DialogDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogDescriptionProps.Render;

    export type SuruUI = DialogDescriptionProps.SuruUI;

    export type BaseUI = DialogDescriptionProps.BaseUI;

    export type HTML = DialogDescriptionProps.HTML;
  }
}
