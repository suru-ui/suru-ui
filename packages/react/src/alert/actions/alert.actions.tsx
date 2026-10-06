import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAlertContext } from "../root/alert.root.context.js";
import type { AlertRootState } from "../root/alert.root.jsx";

/**
 * {@link AlertActions} が持つ状態です。
 */
export type AlertActionsState = AlertRootState;

export namespace AlertActionsProps {
  export type Render = RenderProps<AlertActionsState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertActions} に渡す props です。
 */
export type AlertActionsProps = AlertActionsProps.Render &
  AlertActionsProps.SuruUI &
  AlertActionsProps.BaseUI &
  AlertActionsProps.HTML;

export type IAlertActions = IComponent<AlertActionsProps>;

/**
 * アラートの操作ボタンを右寄せでまとめるコンポーネントです。
 */
export const AlertActions: IAlertActions = function SuiAlertActions(props) {
  const ctx = useAlertContext();

  return useRender({
    props: [
      props,
      {
        className: cn<AlertActionsState>(
          "sui_alert_actions",
          (state) => `sui_alert_actions-actions_position_${state.actionsPosition}`,
          (state) =>
            `sui_alert_actions-description_position_${state.descriptionPosition.replaceAll("-", "_")}`,
          (state) => `sui_alert_actions-size_${state.size}`,
          (state) => `sui_alert_actions-color_${state.color}`,
          (state) => `sui_alert_actions-radius_${state.radius}`,
          (state) => `sui_alert_actions-variant_${state.variant}`,
          (state) => state.outlined && "sui_alert_actions-outlined",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });
};

export { AlertActions as Actions };

export namespace Actions {
  export type State = AlertActionsState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertActionsProps.Render;

    export type SuruUI = AlertActionsProps.SuruUI;

    export type BaseUI = AlertActionsProps.BaseUI;

    export type HTML = AlertActionsProps.HTML;
  }
}
