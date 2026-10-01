import { AlertDialog } from "@base-ui/react/alert-dialog";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Card from "../card/card.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import {
  type AlertDialogPopupContext,
  useAlertDialogPopupContext,
} from "./alert-dialog.popup.context.js";

/**
 * {@link AlertDialogDescription} が持つ状態です。
 */
export type AlertDialogDescriptionState = Override<
  Card.Description.State & AlertDialogPopupContext,
  AlertDialog.Description.State
>;

export namespace AlertDialogDescriptionProps {
  export type Render = RenderProps<AlertDialogDescriptionState>;

  export type SuruUI = Card.Description.Props.SuruUI;

  export type BaseUI = Override<
    Card.Description.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof AlertDialog.Description>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // AlertDialogDescriptionProps:
        never,
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof AlertDialog.Description>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogDescription} に渡す props です。
 */
export type AlertDialogDescriptionProps = AlertDialogDescriptionProps.Render &
  AlertDialogDescriptionProps.SuruUI &
  AlertDialogDescriptionProps.BaseUI &
  AlertDialogDescriptionProps.HTML;

export type IAlertDialogDescription = IComponent<AlertDialogDescriptionProps>;

/**
 * アラートダイアログの説明文を表示するコンポーネントです。
 *
 * 見た目はカードの説明文として描画され、ポップアップの説明に関連付けます。
 */
export const AlertDialogDescription: IAlertDialogDescription = function SuiAlertDialogDescription(
  props,
) {
  const ctx = useAlertDialogPopupContext();
  const { style, render = <p />, className, ...otherProps } = props;

  return (
    <AlertDialog.Description
      {...otherProps}
      render={(htmlProps: {}) => (
        <Card.Description
          {...mergeProps<typeof Card.Description>([
            htmlProps,
            proxyRenderProps<Card.Description.State, AlertDialogDescriptionState>(
              (state) => ({ ...ctx, ...state }),
              {
                style,
                render,
                className: cn<AlertDialogDescriptionState>(
                  className,
                  "sui_alert_dialog_description",
                  (state) => `sui_alert_dialog_description-size_${state.size}`,
                  (state) => `sui_alert_dialog_description-radius_${state.radius}`,
                  (state) => `sui_alert_dialog_description-variant_${state.variant}`,
                  (state) => state.outlined && "sui_alert_dialog_description-outlined",
                ),
              },
            ),
          ])}
        />
      )}
    />
  );
};

export { AlertDialogDescription as Description };

export namespace Description {
  export type State = AlertDialogDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogDescriptionProps.Render;

    export type SuruUI = AlertDialogDescriptionProps.SuruUI;

    export type BaseUI = AlertDialogDescriptionProps.BaseUI;

    export type HTML = AlertDialogDescriptionProps.HTML;
  }
}
