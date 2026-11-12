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
import { DialogTitleContext } from "./dialog.title.context.js";

/**
 * {@link DialogTitle} が持つ状態です。
 */
export type DialogTitleState = DialogTitleContext;

export namespace DialogTitleProps {
  export type Render = RenderProps<DialogTitleState>;

  export type SuruUI = Card.Title.Props.SuruUI;

  export type BaseUI = Override<
    Card.Title.Props.BaseUI,
    Omit<
      Pick<
        React.ComponentProps<typeof Dialog.Title>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // DialogTitleProps より :
        never
      >,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<React.ComponentProps<typeof Dialog.Title>, keyof Render | keyof SuruUI>;
}

/**
 * {@link DialogTitle} に渡す props です。
 */
export type DialogTitleProps = DialogTitleProps.Render &
  DialogTitleProps.SuruUI &
  DialogTitleProps.BaseUI &
  DialogTitleProps.HTML;

export type IDialogTitle = IComponent<DialogTitleProps>;

/**
 * ダイアログの見出しを表示するコンポーネントです。
 *
 * 見た目はカードの見出しとして描画され、ポップアップのラベルに関連付けます。
 */
export const DialogTitle: IDialogTitle = (props) => {
  const ctx = useDialogPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Dialog.Title
      {...otherProps}
      render={(htmlProps: {}) => (
        <Card.Title
          {...mergeProps<typeof Card.Title>([
            htmlProps,
            proxyRenderProps<Card.Title.State, DialogTitleState>(
              (state) => ({
                ...ctx,
                ...state,
              }),
              {
                style,
                render: (currentHtmlProps, state) => (
                  <DialogTitleContext value={state}>
                    <RenderElement
                      state={state}
                      render={render}
                      htmlProps={currentHtmlProps}
                      defaultTagName="h2"
                    />
                  </DialogTitleContext>
                ),
                className: cn<DialogTitleState>(
                  className,
                  "sui_dialog_title",
                  (state) => `sui_dialog_title-size_${state.size}`,
                  (state) => `sui_dialog_title-radius_${state.radius}`,
                  (state) => `sui_dialog_title-variant_${state.variant}`,
                  (state) => state.outlined && "sui_dialog_title-outlined",
                  (state) => state.open && "sui_dialog_title-open",
                  (state) => state.nested && "sui_dialog_title-nested",
                  (state) => state.nestedDialogOpen && "sui_dialog_title-nested_dialog_open",
                  (state) =>
                    state.transitionStatus !== undefined &&
                    `sui_dialog_title-transition_status_${state.transitionStatus}`,
                ),
              },
            ),
          ])}
        />
      )}
    />
  );
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
