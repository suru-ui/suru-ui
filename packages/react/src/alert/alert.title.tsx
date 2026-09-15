import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link AlertTitle} が持つ状態です。
 */
export type AlertTitleState = {};

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

/**
 * アラートのタイトルを表示するコンポーネントです。
 */
export const AlertTitle: IComponent<AlertTitleProps> = function SuiAlertTitle(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_alert_title",
      },
    ],
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
