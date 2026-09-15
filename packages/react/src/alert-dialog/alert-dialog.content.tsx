import { AlertDialog } from "@base-ui/react/alert-dialog";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { AlertDialogContentContext } from "./alert-dialog.context.js";

/**
 * アラートダイアログの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AlertDialogContentRadius = "none" | Size;

/**
 * アラートダイアログの主な外観です。
 *
 * - `"default"`: 規定のスタイル
 * - `"stacked"`: 積み重なっているスタイル
 */
export type AlertDialogContentVariant = "default" | "stacked";

/**
 * {@link AlertDialogContent} が持つ状態です。
 */
export type AlertDialogContentState = AlertDialog.Popup.State;

export namespace AlertDialogContentProps {
  export type Render = RenderProps<AlertDialogContentState>;

  export type SuruUI = {
    /**
     * アラートダイアログに枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * アラートダイアログの角丸の大きさを指定します。
     *
     * @default "md"
     */
    radius?: AlertDialogContentRadius | undefined;

    /**
     * アラートダイアログの主な外観を指定します。
     *
     * @default "default"
     */
    variant?: AlertDialogContentVariant | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof AlertDialog.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DialogPopupProps:
      "initialFocus" | "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof AlertDialog.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogContent} に渡す props です。
 */
export type AlertDialogContentProps = AlertDialogContentProps.Render &
  AlertDialogContentProps.SuruUI &
  AlertDialogContentProps.BaseUI &
  AlertDialogContentProps.HTML;

/**
 * アラートダイアログを表示するコンポーネントです。
 */
export const AlertDialogContent: IComponent<AlertDialogContentProps> =
  function SuiAlertDialogContent(props) {
    const {
      radius = "md",
      variant = "default",
      outlined = false,
      className,
      ...otherProps
    } = props;
    const ctx = React.useMemo<AlertDialogContentContext>(() => ({ radius }), [radius]);

    return (
      <AlertDialogContentContext value={ctx}>
        <AlertDialog.Popup
          {...otherProps}
          className={cn(
            className,
            "sui_alert_dialog_content",
            `sui_alert_dialog_content-radius_${radius}`,
            `sui_alert_dialog_content-variant_${variant}`,
            outlined && "sui_alert_dialog_content-outlined",
          )}
        />
      </AlertDialogContentContext>
    );
  };

export { AlertDialogContent as Content };

export namespace Content {
  export type State = AlertDialogContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogContentProps.Render;

    export type SuruUI = AlertDialogContentProps.SuruUI;

    export type BaseUI = AlertDialogContentProps.BaseUI;

    export type HTML = AlertDialogContentProps.HTML;
  }

  export type Radius = AlertDialogContentRadius;

  export type Variant = AlertDialogContentVariant;
}
