import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link AlertDescription} が持つ状態です。
 */
export type AlertDescriptionState = {};

export namespace AlertDescriptionProps {
  export type Render = RenderProps<AlertDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDescription} に渡す props です。
 */
export type AlertDescriptionProps = AlertDescriptionProps.Render &
  AlertDescriptionProps.SuruUI &
  AlertDescriptionProps.BaseUI &
  AlertDescriptionProps.HTML;

export type IAlertDescription = IComponent<AlertDescriptionProps>;

/**
 * アラートの説明文を表示するコンポーネントです。
 */
export const AlertDescription: IAlertDescription = function SuiAlertDescription(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_alert_description",
      },
    ],
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
