import { Dialog } from "@base-ui/react/dialog";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Card from "../../card/card.parts.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type DialogPopupContextSize,
  type DialogPopupContextRadius,
  type DialogPopupContextVariant,
  DialogPopupContext,
} from "./dialog.popup.context.js";

/**
 * ダイアログの角丸の大きさです。
 */
export type DialogPopupRadius = DialogPopupContextRadius;

/**
 * ダイアログの大きさです。
 */
export type DialogPopupSize = DialogPopupContextSize;

/**
 * ダイアログの主な外観です。
 *
 * - `"default"`: 規定のスタイル
 * - `"stacked"`: 積み重なっているスタイル
 */
export type DialogPopupVariant = DialogPopupContextVariant;

/**
 * {@link DialogPopup} が持つ状態です。
 */
export type DialogPopupState = DialogPopupContext;

export namespace DialogPopupProps {
  export type Render = RenderProps<DialogPopupState>;

  export type SuruUI = Card.Root.Props.SuruUI & {
    /**
     * ダイアログの主な外観を指定します。
     *
     * `"stacked"` では見出しと説明文を中央に寄せ、操作を右上へ重ねます。
     *
     * @default "default"
     */
    variant?: DialogPopupVariant | undefined;
  };

  export type BaseUI = Override<
    Card.Root.Props.BaseUI,
    Omit<
      Pick<
        React.ComponentProps<typeof Dialog.Popup>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // DialogPopupProps より:
        "initialFocus" | "finalFocus"
      >,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Dialog.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DialogPopup} に渡す props です。
 */
export type DialogPopupProps = DialogPopupProps.Render &
  DialogPopupProps.SuruUI &
  DialogPopupProps.BaseUI &
  DialogPopupProps.HTML;

export type IDialogPopup = IComponent<DialogPopupProps>;

/**
 * ダイアログのポップアップ要素です。
 *
 * 見た目はカードとして描画され、大きさや角丸や枠線はカードのルートから引き継ぎます。
 */
export const DialogPopup: IDialogPopup = function SuiDialogPopup(props) {
  const {
    size,
    style,
    radius,
    render,
    variant = "default",
    outlined = true,
    className,
    ...otherProps
  } = props;

  return (
    <Dialog.Popup
      {...otherProps}
      render={(htmlProps: {}, popupState) => {
        const cardRootProps: Required<Card.Root.Props.SuruUI> = {
          size,
          radius,
          outlined,
        };

        return (
          <Card.Root
            {...mergeProps<typeof Card.Root>([
              htmlProps,
              cardRootProps,
              proxyRenderProps<Card.Root.State, DialogPopupState>(
                (cardState) => ({ ...popupState, ...cardState, variant }),
                {
                  style,
                  render(htmlProps: {}, state) {
                    return (
                      <DialogPopupContext value={state}>
                        <RenderElement
                          state={state}
                          render={render}
                          htmlProps={htmlProps}
                          defaultTagName="div"
                        />
                      </DialogPopupContext>
                    );
                  },
                  className: cn<DialogPopupState>(
                    className,
                    "sui_dialog_popup",
                    (state) => `sui_dialog_popup-size_${state.size}`,
                    (state) => `sui_dialog_popup-radius_${state.radius}`,
                    (state) => `sui_dialog_popup-variant_${state.variant}`,
                    (state) => state.outlined && "sui_dialog_popup-outlined",
                    (state) => state.open && "sui_dialog_popup-open",
                    (state) => state.nested && "sui_dialog_popup-nested",
                    (state) => state.nestedDialogOpen && "sui_dialog_popup-nested_dialog_open",
                    (state) =>
                      state.transitionStatus !== undefined &&
                      `sui_dialog_popup-transition_status_${state.transitionStatus}`,
                  ),
                },
              ),
            ])}
          />
        );
      }}
    />
  );
};

export { DialogPopup as Popup };

export namespace Popup {
  export type State = DialogPopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogPopupProps.Render;

    export type SuruUI = DialogPopupProps.SuruUI;

    export type BaseUI = DialogPopupProps.BaseUI;

    export type HTML = DialogPopupProps.HTML;
  }

  export type Radius = DialogPopupRadius;

  export type Size = DialogPopupSize;

  export type Variant = DialogPopupVariant;
}
