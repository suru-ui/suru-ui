import { AlertDialog } from "@base-ui/react/alert-dialog";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AlertDialogViewport} が持つ状態です。
 */
export type AlertDialogViewportState = AlertDialog.Viewport.State;

export namespace AlertDialogViewportProps {
  export type Render = RenderProps<AlertDialogViewportState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof AlertDialog.Viewport>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DialogViewportProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof AlertDialog.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogViewport} に渡す props です。
 */
export type AlertDialogViewportProps = AlertDialogViewportProps.Render &
  AlertDialogViewportProps.SuruUI &
  AlertDialogViewportProps.BaseUI &
  AlertDialogViewportProps.HTML;

/**
 * ポップアップの配置コンテナーコンポーネントです。
 *
 * スクロール可能なオーバーレイを作り、ポップアップを中央に配置します。
 */
export const AlertDialogViewport: IComponent<AlertDialogViewportProps> =
  function SuiAlertDialogViewport(props) {
    const { className, ...otherProps } = props;

    return (
      <AlertDialog.Viewport
        {...otherProps}
        className={cn(className, "sui_alert_dialog_viewport")}
      />
    );
  };

export { AlertDialogViewport as Viewport };

export namespace Viewport {
  export type State = AlertDialogViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogViewportProps.Render;

    export type SuruUI = AlertDialogViewportProps.SuruUI;

    export type BaseUI = AlertDialogViewportProps.BaseUI;

    export type HTML = AlertDialogViewportProps.HTML;
  }
}
