import { AlertDialog } from "@base-ui/react/alert-dialog";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AlertDialogTitle} が持つ状態です。
 */
export type AlertDialogTitleState = AlertDialog.Title.State;

export namespace AlertDialogTitleProps {
  export type Render = RenderProps<AlertDialogTitleState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof AlertDialog.Title>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DialogTitleProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof AlertDialog.Title>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogTitle} に渡す props です。
 */
export type AlertDialogTitleProps = AlertDialogTitleProps.Render &
  AlertDialogTitleProps.SuruUI &
  AlertDialogTitleProps.BaseUI &
  AlertDialogTitleProps.HTML;

/**
 * アラートダイアログの見出しを表示するコンポーネントです。
 */
export const AlertDialogTitle: IComponent<AlertDialogTitleProps> = function SuiAlertDialogTitle(
  props,
) {
  const { className, ...otherProps } = props;

  return <AlertDialog.Title {...otherProps} className={cn(className, "sui_alert_dialog_title")} />;
};

export { AlertDialogTitle as Title };

export namespace Title {
  export type State = AlertDialogTitleState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogTitleProps.Render;

    export type SuruUI = AlertDialogTitleProps.SuruUI;

    export type BaseUI = AlertDialogTitleProps.BaseUI;

    export type HTML = AlertDialogTitleProps.HTML;
  }
}
