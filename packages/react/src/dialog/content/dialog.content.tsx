import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Card from "../../card/card.parts.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type DialogPopupContext, useDialogPopupContext } from "../popup/dialog.popup.context.js";
import { DialogContentContext } from "./dialog.content.context.js";

/**
 * {@link DialogContent} が持つ状態です。
 */
export type DialogContentState = Override<DialogPopupContext, Card.Content.State>;

export namespace DialogContentProps {
  export type Render = RenderProps<DialogContentState>;

  export type SuruUI = Card.Content.Props.SuruUI;

  export type BaseUI = Card.Content.Props.BaseUI;

  export type HTML = Card.Content.Props.HTML;
}

/**
 * {@link DialogContent} に渡す props です。
 */
export type DialogContentProps = DialogContentProps.Render &
  DialogContentProps.SuruUI &
  DialogContentProps.BaseUI &
  DialogContentProps.HTML;

export type IDialogContent = IComponent<DialogContentProps>;

/**
 * ダイアログの本文を表示するコンポーネントです。
 */
export const DialogContent: IDialogContent = function SuiDialogContent(props) {
  const ctx = useDialogPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Card.Content
      {...otherProps}
      {...proxyRenderProps<Card.Content.State, DialogContentState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <DialogContentContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </DialogContentContext>
          ),
          className: cn<DialogContentState>(
            className,
            "sui_dialog_content",
            (state) => `sui_dialog_content-size_${state.size}`,
            (state) => `sui_dialog_content-radius_${state.radius}`,
            (state) => `sui_dialog_content-variant_${state.variant}`,
            (state) => state.outlined && "sui_dialog_content-outlined",
          ),
        },
      )}
    />
  );
};

export { DialogContent as Content };

export namespace Content {
  export type State = DialogContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogContentProps.Render;

    export type SuruUI = DialogContentProps.SuruUI;

    export type BaseUI = DialogContentProps.BaseUI;

    export type HTML = DialogContentProps.HTML;
  }
}
