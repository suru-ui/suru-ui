import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Card from "../../card/card.parts.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useDialogPopupContext } from "../popup/dialog.popup.context.js";
import { DialogFooterContext } from "./dialog.footer.context.js";

/**
 * {@link DialogFooter} が持つ状態です。
 */
export type DialogFooterState = DialogFooterContext;

export namespace DialogFooterProps {
  export type Render = RenderProps<DialogFooterState>;

  export type SuruUI = Card.Footer.Props.SuruUI;

  export type BaseUI = Card.Footer.Props.BaseUI;

  export type HTML = Card.Footer.Props.HTML;
}

/**
 * {@link DialogFooter} に渡す props です。
 */
export type DialogFooterProps = DialogFooterProps.Render &
  DialogFooterProps.SuruUI &
  DialogFooterProps.BaseUI &
  DialogFooterProps.HTML;

export type IDialogFooter = IComponent<DialogFooterProps>;

/**
 * ダイアログの操作や補足情報を末尾に配置するコンポーネントです。
 *
 * 積み上げ式では内容を等幅の 2 列に並べます。
 */
export const DialogFooter: IDialogFooter = function SuiDialogFooter(props) {
  const ctx = useDialogPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Card.Footer
      {...otherProps}
      {...proxyRenderProps<Card.Footer.State, DialogFooterState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <DialogFooterContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </DialogFooterContext>
          ),
          className: cn<DialogFooterState>(
            className,
            "sui_dialog_footer",
            (state) => `sui_dialog_footer-size_${state.size}`,
            (state) => `sui_dialog_footer-radius_${state.radius}`,
            (state) => `sui_dialog_footer-variant_${state.variant}`,
            (state) => state.outlined && "sui_dialog_footer-outlined",
          ),
        },
      )}
    />
  );
};

export { DialogFooter as Footer };

export namespace Footer {
  export type State = DialogFooterState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogFooterProps.Render;

    export type SuruUI = DialogFooterProps.SuruUI;

    export type BaseUI = DialogFooterProps.BaseUI;

    export type HTML = DialogFooterProps.HTML;
  }
}
