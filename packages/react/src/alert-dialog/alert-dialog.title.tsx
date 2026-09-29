import { AlertDialog } from "@base-ui/react/alert-dialog";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Card from "../card/card.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";

/**
 * {@link AlertDialogTitle} が持つ状態です。
 */
export type AlertDialogTitleState = Override<Card.Title.State, AlertDialog.Title.State>;

export namespace AlertDialogTitleProps {
  export type Render = RenderProps<AlertDialogTitleState>;

  export type SuruUI = Card.Title.Props.SuruUI;

  export type BaseUI = Override<
    Card.Title.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof AlertDialog.Title>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // AlertDialogTitleProps:
        never,
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof AlertDialog.Title>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogTitle} に渡す props です。
 */
export type AlertDialogTitleProps = AlertDialogTitleProps.Render &
  AlertDialogTitleProps.SuruUI &
  AlertDialogTitleProps.BaseUI &
  AlertDialogTitleProps.HTML;

export type IAlertDialogTitle = IComponent<AlertDialogTitleProps>;

/**
 * アラートダイアログの見出しを表示するコンポーネントです。
 *
 * 見た目はカードの見出しとして描画され、ポップアップのラベルに関連付けます。
 */
export const AlertDialogTitle: IAlertDialogTitle = function SuiAlertDialogTitle(props) {
  const {
    style,
    // oxlint-disable-next-line jsx-a11y/heading-has-content
    render = <h2 />,
    className,
    ...otherProps
  } = props;

  return (
    <AlertDialog.Title
      {...otherProps}
      render={(htmlProps: {}, titleState) => (
        <Card.Title
          {...mergeProps<typeof Card.Title>([
            htmlProps,
            proxyRenderProps(titleState, {
              style,
              render,
              className: cn(className, "sui_alert_dialog_title"),
            }),
          ])}
        />
      )}
    />
  );
};

export { AlertDialogTitle as Title };

export namespace Title {
  export type State = AlertDialogTitleState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogTitleProps.Render;

    export type SuruUI = AlertDialogTitleProps.SuruUI;

    export type BaseUI = AlertDialogTitleProps.BaseUI;

    export type HTML = AlertDialogTitleProps.HTML;
  }
}
