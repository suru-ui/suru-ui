import { Dialog } from "@base-ui/react/dialog";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DialogViewport} が持つ状態です。
 */
export type DialogViewportState = Dialog.Viewport.State;

export namespace DialogViewportProps {
  export type Render = RenderProps<DialogViewportState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Dialog.Viewport>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DialogViewportProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Dialog.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DialogViewport} に渡す props です。
 */
export type DialogViewportProps = DialogViewportProps.Render &
  DialogViewportProps.SuruUI &
  DialogViewportProps.BaseUI &
  DialogViewportProps.HTML;

/**
 * ポップアップの配置コンテナーコンポーネントです。
 *
 * スクロール可能なオーバーレイを作り、ポップアップを中央に配置します。
 */
export const DialogViewport: IComponent<DialogViewportProps> = function SuiDialogViewport(props) {
  const { className, ...otherProps } = props;

  return <Dialog.Viewport {...otherProps} className={cn(className, "sui_dialog_viewport")} />;
};

export { DialogViewport as Viewport };

export namespace Viewport {
  export type State = DialogViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogViewportProps.Render;

    export type SuruUI = DialogViewportProps.SuruUI;

    export type BaseUI = DialogViewportProps.BaseUI;

    export type HTML = DialogViewportProps.HTML;
  }
}
