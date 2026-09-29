import { Dialog } from "@base-ui/react/dialog";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link DialogPortal} が持つ状態です。
 */
export type DialogPortalState = Dialog.Portal.State;

export namespace DialogPortalProps {
  export type Render = RenderProps<DialogPortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Dialog.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DialogPortalProps:
      "keepMounted" | "container",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Dialog.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DialogPortal} に渡す props です。
 */
export type DialogPortalProps = DialogPortalProps.Render &
  DialogPortalProps.SuruUI &
  DialogPortalProps.BaseUI &
  DialogPortalProps.HTML;

export type IDialogPortal = IComponent<DialogPortalProps>;

/**
 * ダイアログを DOM の別の場所に配置するコンポーネントです。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const DialogPortal: IDialogPortal = function SuiDialogPortal(props) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Dialog.Portal
      {...otherProps}
      className={cn(className, "sui_dialog_portal")}
      data-scope={dataScope}
    />
  );
};

export { DialogPortal as Portal };

export namespace Portal {
  export type State = DialogPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogPortalProps.Render;

    export type SuruUI = DialogPortalProps.SuruUI;

    export type BaseUI = DialogPortalProps.BaseUI;

    export type HTML = DialogPortalProps.HTML;
  }
}
