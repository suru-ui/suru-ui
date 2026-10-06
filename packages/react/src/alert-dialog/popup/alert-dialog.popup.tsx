import { AlertDialog } from "@base-ui/react/alert-dialog";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Card from "../../card/card.parts.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type AlertDialogPopupContextSize,
  type AlertDialogPopupContextRadius,
  type AlertDialogPopupContextVariant,
  AlertDialogPopupContext,
} from "./alert-dialog.popup.context.js";

/**
 * アラートダイアログの角丸の大きさです。
 */
export type AlertDialogPopupRadius = AlertDialogPopupContextRadius;

/**
 * アラートダイアログの大きさです。
 */
export type AlertDialogPopupSize = AlertDialogPopupContextSize;

/**
 * アラートダイアログの主な外観です。
 *
 * - `"default"`: 規定のスタイル
 * - `"stacked"`: 積み重なっているスタイル
 */
export type AlertDialogPopupVariant = AlertDialogPopupContextVariant;

/**
 * {@link AlertDialogPopup} が持つ状態です。
 */
export type AlertDialogPopupState = AlertDialogPopupContext;

export namespace AlertDialogPopupProps {
  export type Render = RenderProps<AlertDialogPopupState>;

  export type SuruUI = Card.Root.Props.SuruUI & {
    /**
     * アラートダイアログの主な外観を指定します。
     *
     * `"stacked"` では見出しと説明文を中央に寄せ、操作を右上へ重ねます。
     *
     * @default "default"
     */
    variant?: AlertDialogPopupVariant | undefined;
  };

  export type BaseUI = Override<
    Card.Root.Props.BaseUI,
    Omit<
      Pick<
        React.ComponentProps<typeof AlertDialog.Popup>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // AlertDialogPopupProps より:
        "initialFocus" | "finalFocus"
      >,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof AlertDialog.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogPopup} に渡す props です。
 */
export type AlertDialogPopupProps = AlertDialogPopupProps.Render &
  AlertDialogPopupProps.SuruUI &
  AlertDialogPopupProps.BaseUI &
  AlertDialogPopupProps.HTML;

export type IAlertDialogPopup = IComponent<AlertDialogPopupProps>;

/**
 * アラートダイアログのポップアップ要素です。
 *
 * 見た目はカードとして描画され、大きさや角丸や枠線はカードのルートから引き継ぎます。
 */
export const AlertDialogPopup: IAlertDialogPopup = function SuiAlertDialogPopup(props) {
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
    <AlertDialog.Popup
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
              proxyRenderProps<Card.Root.State, AlertDialogPopupState>(
                (cardState) => ({ ...popupState, ...cardState, variant }),
                {
                  style,
                  render(htmlProps: {}, state) {
                    return (
                      <AlertDialogPopupContext value={state}>
                        <RenderElement
                          state={state}
                          render={render}
                          htmlProps={htmlProps}
                          defaultTagName="div"
                        />
                      </AlertDialogPopupContext>
                    );
                  },
                  className: cn<AlertDialogPopupState>(
                    className,
                    "sui_alert_dialog_popup",
                    (state) => `sui_alert_dialog_popup-size_${state.size}`,
                    (state) => `sui_alert_dialog_popup-radius_${state.radius}`,
                    (state) => `sui_alert_dialog_popup-variant_${state.variant}`,
                    (state) => state.outlined && "sui_alert_dialog_popup-outlined",
                    (state) => state.open && "sui_alert_dialog_popup-open",
                    (state) => state.nested && "sui_alert_dialog_popup-nested",
                    (state) =>
                      state.nestedDialogOpen && "sui_alert_dialog_popup-nested_dialog_open",
                    (state) =>
                      state.transitionStatus !== undefined &&
                      `sui_alert_dialog_popup-transition_status_${state.transitionStatus}`,
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

export { AlertDialogPopup as Popup };

export namespace Popup {
  export type State = AlertDialogPopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogPopupProps.Render;

    export type SuruUI = AlertDialogPopupProps.SuruUI;

    export type BaseUI = AlertDialogPopupProps.BaseUI;

    export type HTML = AlertDialogPopupProps.HTML;
  }

  export type Radius = AlertDialogPopupRadius;

  export type Size = AlertDialogPopupSize;

  export type Variant = AlertDialogPopupVariant;
}
