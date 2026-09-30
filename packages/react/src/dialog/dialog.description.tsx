import { Dialog } from "@base-ui/react/dialog";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Card from "../card/card.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type DialogPopupContext, useDialogPopupContext } from "./dialog.popup.context.js";

/**
 * {@link DialogDescription} が持つ状態です。
 */
export type DialogDescriptionState = Override<
  Card.Description.State & DialogPopupContext,
  Dialog.Description.State
>;

export namespace DialogDescriptionProps {
  export type Render = RenderProps<DialogDescriptionState>;

  export type SuruUI = Card.Description.Props.SuruUI;

  export type BaseUI = Override<
    Card.Description.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Dialog.Description>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // DialogDescriptionProps:
        never,
        keyof Render | keyof SuruUI
      >
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

export type IDialogDescription = IComponent<DialogDescriptionProps>;

/**
 * ダイアログの説明文を表示するコンポーネントです。
 *
 * 見た目はカードの説明文として描画され、ポップアップの説明に関連付けます。
 */
export const DialogDescription: IDialogDescription = function SuiDialogDescription(props) {
  const ctx = useDialogPopupContext();
  const { style, render = <p />, className, ...otherProps } = props;

  return (
    <Dialog.Description
      {...otherProps}
      render={(htmlProps: {}) => (
        <Card.Description
          {...mergeProps<typeof Card.Description>([
            htmlProps,
            proxyRenderProps<Card.Description.State, DialogDescriptionState>(
              (state) => ({ ...ctx, ...state }),
              {
                style,
                render,
                className: cn<DialogDescriptionState>(className, "sui_dialog_description"),
              },
            ),
          ])}
        />
      )}
    />
  );
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
