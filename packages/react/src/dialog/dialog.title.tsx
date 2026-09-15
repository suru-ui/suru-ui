import { Dialog } from "@base-ui/react/dialog";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DialogTitle} が持つ状態です。
 */
export type DialogTitleState = Dialog.Title.State;

export namespace DialogTitleProps {
  export type Render = RenderProps<DialogTitleState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Dialog.Title>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DialogTitleProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Dialog.Title>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DialogTitle} に渡す props です。
 */
export type DialogTitleProps = DialogTitleProps.Render &
  DialogTitleProps.SuruUI &
  DialogTitleProps.BaseUI &
  DialogTitleProps.HTML;

/**
 * ダイアログの見出しを表示するコンポーネントです。
 */
export const DialogTitle: IComponent<DialogTitleProps> = function SuiDialogTitle(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Title {...otherProps} className={cn(className, "sui_dialog_title")} />;
};

export { DialogTitle as Title };

export namespace Title {
  export type State = DialogTitleState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogTitleProps.Render;

    export type SuruUI = DialogTitleProps.SuruUI;

    export type BaseUI = DialogTitleProps.BaseUI;

    export type HTML = DialogTitleProps.HTML;
  }
}
