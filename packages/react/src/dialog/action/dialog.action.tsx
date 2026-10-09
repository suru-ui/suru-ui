import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Card from "../../card/card.parts.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useDialogPopupContext } from "../popup/dialog.popup.context.js";
import { DialogActionContext } from "./dialog.action.context.js";

/**
 * {@link DialogAction} が持つ状態です。
 */
export type DialogActionState = DialogActionContext;

export namespace DialogActionProps {
  export type Render = RenderProps<DialogActionState>;

  export type SuruUI = Card.Action.Props.SuruUI;

  export type BaseUI = Card.Action.Props.BaseUI;

  export type HTML = Card.Action.Props.HTML;
}

/**
 * {@link DialogAction} に渡す props です。
 */
export type DialogActionProps = DialogActionProps.Render &
  DialogActionProps.SuruUI &
  DialogActionProps.BaseUI &
  DialogActionProps.HTML;

export type IDialogAction = IComponent<DialogActionProps>;

/**
 * ダイアログのヘッダー右上に操作要素を配置するコンポーネントです。
 *
 * 積み上げ式では右上へ重ねて配置します。
 */
export const DialogAction: IDialogAction = function SuiDialogAction(props) {
  const ctx = useDialogPopupContext();
  const { style, render, absolute = ctx.variant === "stacked", className, ...otherProps } = props;

  return (
    <Card.Action
      {...otherProps}
      {...proxyRenderProps<Card.Action.State, DialogActionState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <DialogActionContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </DialogActionContext>
          ),
          className: cn<DialogActionState>(
            className,
            "sui_dialog_action",
            (state) => `sui_dialog_action-size_${state.size}`,
            (state) => `sui_dialog_action-radius_${state.radius}`,
            (state) => `sui_dialog_action-variant_${state.variant}`,
            (state) => state.absolute && "sui_dialog_action-absolute",
            (state) => state.outlined && "sui_dialog_action-outlined",
            (state) => state.open && "sui_dialog_action-open",
            (state) => state.nested && "sui_dialog_action-nested",
            (state) => state.nestedDialogOpen && "sui_dialog_action-nested_dialog_open",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_dialog_action-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
      absolute={absolute}
    />
  );
};

export { DialogAction as Action };

export namespace Action {
  export type State = DialogActionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogActionProps.Render;

    export type SuruUI = DialogActionProps.SuruUI;

    export type BaseUI = DialogActionProps.BaseUI;

    export type HTML = DialogActionProps.HTML;
  }
}
