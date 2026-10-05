import { AlertDialog } from "@base-ui/react/alert-dialog";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link AlertDialogPortal} が持つ状態です。
 */
export type AlertDialogPortalState = AlertDialog.Portal.State;

export namespace AlertDialogPortalProps {
  export type Render = RenderProps<AlertDialogPortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof AlertDialog.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DialogPortalProps:
      "keepMounted" | "container",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof AlertDialog.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogPortal} に渡す props です。
 */
export type AlertDialogPortalProps = AlertDialogPortalProps.Render &
  AlertDialogPortalProps.SuruUI &
  AlertDialogPortalProps.BaseUI &
  AlertDialogPortalProps.HTML;

export type IAlertDialogPortal = IComponent<AlertDialogPortalProps>;

/**
 * アラートダイアログを DOM の別の場所に配置するコンポーネントです。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const AlertDialogPortal: IAlertDialogPortal = function SuiAlertDialogPortal(props) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <AlertDialog.Portal
      {...otherProps}
      className={cn(className, "sui_alert_dialog_portal")}
      data-scope={dataScope}
    />
  );
};

export { AlertDialogPortal as Portal };

export namespace Portal {
  export type State = AlertDialogPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogPortalProps.Render;

    export type SuruUI = AlertDialogPortalProps.SuruUI;

    export type BaseUI = AlertDialogPortalProps.BaseUI;

    export type HTML = AlertDialogPortalProps.HTML;
  }
}
