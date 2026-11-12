import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAlertContext } from "../root/alert.root.context.js";
import type { AlertRootState } from "../root/alert.root.jsx";

/**
 * {@link AlertDescription} が持つ状態です。
 */
export type AlertDescriptionState = AlertRootState;

export namespace AlertDescriptionProps {
  export type Render = RenderProps<AlertDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<BaseUIComponentProps<"div", never, never>, keyof Render | keyof SuruUI>;
}

/**
 * {@link AlertDescription} に渡す props です。
 */
export type AlertDescriptionProps = AlertDescriptionProps.Render &
  AlertDescriptionProps.SuruUI &
  AlertDescriptionProps.BaseUI &
  AlertDescriptionProps.HTML;

export type IAlertDescription = IComponent<AlertDescriptionProps>;

/** アラートの説明文を表示するコンポーネントです。 */
export const AlertDescription: IAlertDescription = (props) => {
  const ctx = useAlertContext();

  return useRender({
    props: [
      props,
      {
        className: cn<AlertDescriptionState>(
          "sui_alert_description",
          (state) => `sui_alert_description-actions_position_${state.actionsPosition}`,
          (state) =>
            `sui_alert_description-description_position_${state.descriptionPosition.replaceAll("-", "_")}`,
          (state) => `sui_alert_description-size_${state.size}`,
          (state) => `sui_alert_description-color_${state.color}`,
          (state) => `sui_alert_description-radius_${state.radius}`,
          (state) => `sui_alert_description-variant_${state.variant}`,
          (state) => state.outlined && "sui_alert_description-outlined",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });
};

export { AlertDescription as Description };
export namespace Description {
  export type State = AlertDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDescriptionProps.Render;

    export type SuruUI = AlertDescriptionProps.SuruUI;

    export type BaseUI = AlertDescriptionProps.BaseUI;

    export type HTML = AlertDescriptionProps.HTML;
  }
}
