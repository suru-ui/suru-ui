import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link AlertActions} が持つ状態です。
 */
export type AlertActionsState = {};

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
  return useRender({
    props: [
      props,
      {
        className: "sui_alert_actions",
      },
    ],
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
