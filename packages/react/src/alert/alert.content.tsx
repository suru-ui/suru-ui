import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link AlertContent} が持つ状態です。
 */
export type AlertContentState = {};

export namespace AlertContentProps {
  export type Render = RenderProps<AlertContentState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertContent} に渡す props です。
 */
export type AlertContentProps = AlertContentProps.Render &
  AlertContentProps.SuruUI &
  AlertContentProps.BaseUI &
  AlertContentProps.HTML;

/**
 * アラートのメッセージをまとめるコンテンツコンポーネントです。
 */
export const AlertContent: IComponent<AlertContentProps> = function SuiAlertContent(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_alert_content",
      },
    ],
    defaultTagName: "div",
  });
};

export { AlertContent as Content };

export namespace Content {
  export type State = AlertContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertContentProps.Render;

    export type SuruUI = AlertContentProps.SuruUI;

    export type BaseUI = AlertContentProps.BaseUI;

    export type HTML = AlertContentProps.HTML;
  }
}
