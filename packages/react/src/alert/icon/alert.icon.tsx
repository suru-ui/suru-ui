import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAlertContext } from "../root/alert.root.context.js";
import type { AlertRootState } from "../root/alert.root.jsx";

/**
 * {@link AlertIcon} が持つ状態です。
 */
export type AlertIconState = AlertRootState;

export namespace AlertIconProps {
  export type Render = RenderProps<AlertIconState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertIcon} に渡す props です。
 */
export type AlertIconProps = AlertIconProps.Render &
  AlertIconProps.SuruUI &
  AlertIconProps.BaseUI &
  AlertIconProps.HTML;

export type IAlertIcon = IComponent<AlertIconProps>;

/**
 * アラートの状態を視覚的に示すインジケーターコンポーネントです。
 *
 * 子要素を省略すると、状態色の丸いインジケーターを表示します。
 */
export const AlertIcon: IAlertIcon = function SuiAlertIcon(props) {
  const ctx = useAlertContext();
  const { "aria-hidden": ariaHidden = true, ...otherDivProps } = props;

  return useRender({
    props: [
      otherDivProps,
      {
        className: cn<AlertIconState>(
          "sui_alert_icon",
          (state) => `sui_alert_icon-actions_position_${state.actionsPosition}`,
          (state) =>
            `sui_alert_icon-description_position_${state.descriptionPosition.replaceAll("-", "_")}`,
          (state) => `sui_alert_icon-size_${state.size}`,
          (state) => `sui_alert_icon-color_${state.color}`,
          (state) => `sui_alert_icon-radius_${state.radius}`,
          (state) => `sui_alert_icon-variant_${state.variant}`,
          (state) => state.outlined && "sui_alert_icon-outlined",
        ),
        "aria-hidden": ariaHidden,
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });
};

export { AlertIcon as Icon };

export namespace Icon {
  export type State = AlertIconState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertIconProps.Render;

    export type SuruUI = AlertIconProps.SuruUI;

    export type BaseUI = AlertIconProps.BaseUI;

    export type HTML = AlertIconProps.HTML;
  }
}
