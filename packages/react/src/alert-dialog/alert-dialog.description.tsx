import { AlertDialog } from "@base-ui/react/alert-dialog";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AlertDialogDescription} が持つ状態です。
 */
export type AlertDialogDescriptionState = AlertDialog.Description.State;

export namespace AlertDialogDescriptionProps {
  export type Render = RenderProps<AlertDialogDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof AlertDialog.Description>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DialogDescriptionProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof AlertDialog.Description>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogDescription} に渡す props です。
 */
export type AlertDialogDescriptionProps = AlertDialogDescriptionProps.Render &
  AlertDialogDescriptionProps.SuruUI &
  AlertDialogDescriptionProps.BaseUI &
  AlertDialogDescriptionProps.HTML;

/**
 * アラートダイアログの説明文を表示するコンポーネントです。
 */
export const AlertDialogDescription: IComponent<AlertDialogDescriptionProps> =
  function SuiAlertDialogDescription(props) {
    const { className, ...otherProps } = props;

    return (
      <AlertDialog.Description
        {...otherProps}
        className={cn(className, "sui_alert_dialog_description")}
      />
    );
  };

export { AlertDialogDescription as Description };

export namespace Description {
  export type State = AlertDialogDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogDescriptionProps.Render;

    export type SuruUI = AlertDialogDescriptionProps.SuruUI;

    export type BaseUI = AlertDialogDescriptionProps.BaseUI;

    export type HTML = AlertDialogDescriptionProps.HTML;
  }
}
