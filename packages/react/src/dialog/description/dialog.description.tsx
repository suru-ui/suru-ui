import { Dialog } from "@base-ui/react/dialog";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Card from "../../card/card.parts.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { useDialogPopupContext } from "../popup/dialog.popup.context.js";
import { DialogDescriptionContext } from "./dialog.description.context.js";

/**
 * {@link DialogDescription} が持つ状態です。
 */
export type DialogDescriptionState = DialogDescriptionContext;

export namespace DialogDescriptionProps {
  export type Render = RenderProps<DialogDescriptionState>;

  export type SuruUI = Card.Description.Props.SuruUI;

  export type BaseUI = Override<
    Card.Description.Props.BaseUI,
    Omit<
      Pick<
        React.ComponentProps<typeof Dialog.Description>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // DialogDescriptionProps より :
        never
      >,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Dialog.Description>,
    keyof Render | keyof SuruUI
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
export const DialogDescription: IDialogDescription = (props) => {
  const ctx = useDialogPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Dialog.Description
      {...otherProps}
      render={(htmlProps: {}) => (
        <Card.Description
          {...mergeProps<typeof Card.Description>([
            htmlProps,
            proxyRenderProps<Card.Description.State, DialogDescriptionState>(
              (state) => ({
                ...ctx,
                ...state,
              }),
              {
                style,
                render: (currentHtmlProps, state) => (
                  <DialogDescriptionContext value={state}>
                    <RenderElement
                      state={state}
                      render={render}
                      htmlProps={currentHtmlProps}
                      defaultTagName="p"
                    />
                  </DialogDescriptionContext>
                ),
                className: cn<DialogDescriptionState>(
                  className,
                  "sui_dialog_description",
                  (state) => `sui_dialog_description-size_${state.size}`,
                  (state) => `sui_dialog_description-radius_${state.radius}`,
                  (state) => `sui_dialog_description-variant_${state.variant}`,
                  (state) => state.outlined && "sui_dialog_description-outlined",
                  (state) => state.open && "sui_dialog_description-open",
                  (state) => state.nested && "sui_dialog_description-nested",
                  (state) => state.nestedDialogOpen && "sui_dialog_description-nested_dialog_open",
                  (state) =>
                    state.transitionStatus !== undefined &&
                    `sui_dialog_description-transition_status_${state.transitionStatus}`,
                ),
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
