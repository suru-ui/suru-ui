import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AlertDialogControls} が持つ状態です。
 */
export type AlertDialogControlsState = {};

export namespace AlertDialogControlsProps {
  export type Render = RenderProps<AlertDialogControlsState>;

  export type SuruUI = {
    /**
     * 絶対位置として配置するかを指定します。
     *
     * @default false
     */
    absolute?: boolean | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogControls} に渡す props です。
 */
export type AlertDialogControlsProps = AlertDialogControlsProps.Render &
  AlertDialogControlsProps.SuruUI &
  AlertDialogControlsProps.BaseUI &
  AlertDialogControlsProps.HTML;

/**
 * アラートダイアログのコントロールコンポーネントです。
 */
export const AlertDialogControls: IComponent<AlertDialogControlsProps> =
  function SuiAlertDialogControls(props) {
    const { absolute = false, ...otherDivProps } = props;

    return useRender({
      props: [
        otherDivProps,
        {
          className: cn(
            "sui_alert_dialog_controls",
            absolute && "sui_alert_dialog_controls-absolute",
            !absolute && "sui_alert_dialog_controls-relative",
          ),
        },
      ],
      defaultTagName: "div",
    });
  };

export { AlertDialogControls as Controls };

export namespace Controls {
  export type State = AlertDialogControlsState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogControlsProps.Render;

    export type SuruUI = AlertDialogControlsProps.SuruUI;

    export type BaseUI = AlertDialogControlsProps.BaseUI;

    export type HTML = AlertDialogControlsProps.HTML;
  }
}
