import { Dialog } from "@base-ui/react/dialog";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { DialogContentContext } from "./dialog.context.js";

/**
 * ダイアログの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type DialogContentRadius = "none" | Size;

/**
 * ダイアログの主な外観です。
 *
 * - `"default"`: 規定のスタイル
 * - `"stacked"`: 積み重なっているスタイル
 */
export type DialogContentVariant = "default" | "stacked";

/**
 * {@link DialogContent} が持つ状態です。
 */
export type DialogContentState = Dialog.Popup.State;

export namespace DialogContentProps {
  export type Render = RenderProps<DialogContentState>;

  export type SuruUI = {
    /**
     * ダイアログに枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * ダイアログの角丸の大きさを指定します。
     *
     * @default "md"
     */
    radius?: DialogContentRadius | undefined;

    /**
     * ダイアログの主な外観を指定します。
     *
     * @default "default"
     */
    variant?: DialogContentVariant | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Dialog.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DialogPopupProps:
      "initialFocus" | "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Dialog.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DialogContent} に渡す props です。
 */
export type DialogContentProps = DialogContentProps.Render &
  DialogContentProps.SuruUI &
  DialogContentProps.BaseUI &
  DialogContentProps.HTML;

/**
 * ダイアログを表示するコンポーネントです。
 */
export const DialogContent: IComponent<DialogContentProps> = function SuiDialogContent(props) {
  const { radius = "md", variant = "default", outlined = false, className, ...otherProps } = props;
  const ctx = React.useMemo<DialogContentContext>(() => ({ radius }), [radius]);

  return (
    <DialogContentContext value={ctx}>
      <Dialog.Popup
        {...otherProps}
        className={cn(
          className,
          "sui_dialog_content",
          `sui_dialog_content-radius_${radius}`,
          `sui_dialog_content-variant_${variant}`,
          outlined && "sui_dialog_content-outlined",
        )}
      />
    </DialogContentContext>
  );
};

export { DialogContent as Content };

export namespace Content {
  export type State = DialogContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogContentProps.Render;

    export type SuruUI = DialogContentProps.SuruUI;

    export type BaseUI = DialogContentProps.BaseUI;

    export type HTML = DialogContentProps.HTML;
  }

  export type Radius = DialogContentRadius;

  export type Variant = DialogContentVariant;
}
