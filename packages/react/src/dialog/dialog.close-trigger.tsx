import { Dialog } from "@base-ui/react/dialog";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DialogCloseTrigger} が持つ状態です。
 */
export type DialogCloseTriggerState = Dialog.Close.State;

export namespace DialogCloseTriggerProps {
  export type Render = Omit<RenderProps<DialogCloseTriggerState>, "render">;

  export type SuruUI = {
    /**
     * ボタンとして描画する関数です。
     */
    children: NonNullable<RenderProps<DialogCloseTriggerState>["render"]>;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Dialog.Close>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // DialogCloseProps:
      | never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Dialog.Close>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DialogCloseTrigger} に渡す props です。
 */
export type DialogCloseTriggerProps = DialogCloseTriggerProps.Render &
  DialogCloseTriggerProps.SuruUI &
  DialogCloseTriggerProps.BaseUI &
  DialogCloseTriggerProps.HTML;

/**
 * ダイアログを閉じるボタンコンポーネントです。
 */
export const DialogCloseTrigger: IComponent<DialogCloseTriggerProps> =
  function SuiDialogCloseTrigger(props) {
    const { children, className, ...otherProps } = props;

    return (
      <Dialog.Close
        {...otherProps}
        render={children}
        className={cn(className, "sui_dialog_close")}
      />
    );
  };

export { DialogCloseTrigger as CloseTrigger };

export namespace CloseTrigger {
  export type State = DialogCloseTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogCloseTriggerProps.Render;

    export type SuruUI = DialogCloseTriggerProps.SuruUI;

    export type BaseUI = DialogCloseTriggerProps.BaseUI;

    export type HTML = DialogCloseTriggerProps.HTML;
  }
}
