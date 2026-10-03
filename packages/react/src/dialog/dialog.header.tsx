import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Card from "../card/card.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type DialogPopupContext, useDialogPopupContext } from "./dialog.popup.context.js";

/**
 * {@link DialogHeader} が持つ状態です。
 */
export type DialogHeaderState = Override<DialogPopupContext, Card.Header.State>;

export namespace DialogHeaderProps {
  export type Render = RenderProps<DialogHeaderState>;

  export type SuruUI = Card.Header.Props.SuruUI;

  export type BaseUI = Card.Header.Props.BaseUI;

  export type HTML = Card.Header.Props.HTML;
}

/**
 * {@link DialogHeader} に渡す props です。
 */
export type DialogHeaderProps = DialogHeaderProps.Render &
  DialogHeaderProps.SuruUI &
  DialogHeaderProps.BaseUI &
  DialogHeaderProps.HTML;

export type IDialogHeader = IComponent<DialogHeaderProps>;

/**
 * ダイアログの見出し・説明・操作をまとめるコンポーネントです。
 */
export const DialogHeader: IDialogHeader = function SuiDialogHeader(props) {
  const ctx = useDialogPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Card.Header
      {...otherProps}
      {...proxyRenderProps<Card.Header.State, DialogHeaderState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<DialogHeaderState>(
            className,
            "sui_dialog_header",
            (state) => `sui_dialog_header-size_${state.size}`,
            (state) => `sui_dialog_header-radius_${state.radius}`,
            (state) => `sui_dialog_header-variant_${state.variant}`,
            (state) => state.outlined && "sui_dialog_header-outlined",
          ),
        },
      )}
    />
  );
};

export { DialogHeader as Header };

export namespace Header {
  export type State = DialogHeaderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogHeaderProps.Render;

    export type SuruUI = DialogHeaderProps.SuruUI;

    export type BaseUI = DialogHeaderProps.BaseUI;

    export type HTML = DialogHeaderProps.HTML;
  }
}
