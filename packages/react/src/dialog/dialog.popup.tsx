import { Dialog } from "@base-ui/react/dialog";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { DialogPopupContext } from "./dialog.popup.context.js";

/**
 * ダイアログの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type DialogPopupRadius = "none" | Size;

/**
 * ダイアログの主な外観です。
 *
 * - `"default"`: 規定のスタイル
 * - `"stacked"`: 積み重なっているスタイル
 */
export type DialogPopupVariant = "default" | "stacked";

/**
 * {@link DialogPopup} が持つ状態です。
 */
export type DialogPopupState = Dialog.Popup.State;

export namespace DialogPopupProps {
  export type Render = RenderProps<DialogPopupState>;

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
    radius?: DialogPopupRadius | undefined;

    /**
     * ダイアログの主な外観を指定します。
     *
     * @default "default"
     */
    variant?: DialogPopupVariant | undefined;
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
 * {@link DialogPopup} に渡す props です。
 */
export type DialogPopupProps = DialogPopupProps.Render &
  DialogPopupProps.SuruUI &
  DialogPopupProps.BaseUI &
  DialogPopupProps.HTML;

/**
 * ダイアログのポップアップ要素です。
 */
export const DialogPopup: IComponent<DialogPopupProps> = function SuiDialogPopup(props) {
  const { radius = "md", variant = "default", outlined = false, className, ...otherProps } = props;
  const ctx = React.useMemo<DialogPopupContext>(() => ({ radius }), [radius]);

  return (
    <DialogPopupContext value={ctx}>
      <Dialog.Popup
        {...otherProps}
        className={cn(
          className,
          "sui_dialog_popup",
          `sui_dialog_popup-radius_${radius}`,
          `sui_dialog_popup-variant_${variant}`,
          outlined && "sui_dialog_popup-outlined",
        )}
      />
    </DialogPopupContext>
  );
};

export { DialogPopup as Popup };

export namespace Popup {
  export type State = DialogPopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = DialogPopupProps.Render;

    export type SuruUI = DialogPopupProps.SuruUI;

    export type BaseUI = DialogPopupProps.BaseUI;

    export type HTML = DialogPopupProps.HTML;
  }

  export type Radius = DialogPopupRadius;

  export type Variant = DialogPopupVariant;
}
