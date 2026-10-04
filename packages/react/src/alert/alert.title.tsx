import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { useAlertContext } from "./alert.context.js";
import type { AlertRootState } from "./alert.root.jsx";

/**
 * {@link AlertTitle} が持つ状態です。
 */
export type AlertTitleState = AlertRootState;

export namespace AlertTitleProps {
  export type Render = RenderProps<AlertTitleState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertTitle} に渡す props です。
 */
export type AlertTitleProps = AlertTitleProps.Render &
  AlertTitleProps.SuruUI &
  AlertTitleProps.BaseUI &
  AlertTitleProps.HTML;

export type IAlertTitle = IComponent<AlertTitleProps>;

/**
 * アラートのタイトルを表示するコンポーネントです。
 */
export const AlertTitle: IAlertTitle = function SuiAlertTitle(props) {
  const ctx = useAlertContext();

  return useRender({
    props: [
      props,
      {
        className: cn<AlertTitleState>(
          "sui_alert_title",
          (state) => `sui_alert_title-actionsposition_${state.actionsPosition}`,
          (state) =>
            `sui_alert_title-descriptionposition_${state.descriptionPosition.replaceAll("-", "_")}`,
          (state) => `sui_alert_title-size_${state.size}`,
          (state) => `sui_alert_title-color_${state.color}`,
          (state) => `sui_alert_title-radius_${state.radius}`,
          (state) => `sui_alert_title-variant_${state.variant}`,
          (state) => state.outlined && "sui_alert_title-outlined",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });
};

export { AlertTitle as Title };

export namespace Title {
  export type State = AlertTitleState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertTitleProps.Render;

    export type SuruUI = AlertTitleProps.SuruUI;

    export type BaseUI = AlertTitleProps.BaseUI;

    export type HTML = AlertTitleProps.HTML;
  }
}
