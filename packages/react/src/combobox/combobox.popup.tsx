import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { ComboboxContext, useComboboxContext } from "./combobox.context.js";

/**
 * {@link ComboboxPopup} が持つ状態です。
 */
export type ComboboxPopupState = Combobox.Popup.State;

/**
 * ポップアップ内の入力欄の配置です。
 *
 * - `"top"`: リストの上に固定します。
 * - `"bottom"`: リストの下に固定します。
 * - `"start"`: 入力欄に近いほうに置きます。ポップアップが反転したときはリストの下に来ます。
 * - `"end"`: 入力欄から遠いほうに置きます。ポップアップが反転したときはリストの上に来ます。
 */
export type ComboboxPopupInputPosition = "top" | "bottom" | "start" | "end";

export namespace ComboboxPopupProps {
  export type Render = RenderProps<ComboboxPopupState>;

  export type SuruUI = {
    /**
     * ポップアップ内の入力欄の配置を指定します。
     *
     * 入力欄を内包しないポップアップでは無視されます。
     *
     * @default "start"
     */
    inputPosition?: ComboboxPopupInputPosition | undefined;

    /**
     * ポップアップに枠線を表示するかどうかを指定します。
     *
     * 省略時はコンテキストの `outlined` を使います。
     */
    outlined?: boolean | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxPopupProps:
      "initialFocus" | "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxPopup} に渡す props です。
 */
export type ComboboxPopupProps = ComboboxPopupProps.Render &
  ComboboxPopupProps.SuruUI &
  ComboboxPopupProps.BaseUI &
  ComboboxPopupProps.HTML;

export type IComboboxPopup = IComponent<ComboboxPopupProps>;

/**
 * 候補項目を表示するポップアップ要素です。
 */
export const ComboboxPopup: IComboboxPopup = function SuiComboboxPopup(props) {
  const ctx = useComboboxContext();
  const { outlined = ctx.outlined, className, inputPosition = "start", ...otherProps } = props;
  const childCtx = React.useMemo<ComboboxContext>(() => ({ ...ctx, outlined }), [ctx, outlined]);

  return (
    <ComboboxContext value={childCtx}>
      <Combobox.Popup
        {...otherProps}
        className={cn(
          className,
          "sui_combobox_popup",
          outlined && "sui_combobox_popup-outlined",
          `sui_combobox_popup-inputposition_${inputPosition}`,
        )}
      />
    </ComboboxContext>
  );
};

export { ComboboxPopup as Popup };

export namespace Popup {
  export type State = ComboboxPopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxPopupProps.Render;

    export type SuruUI = ComboboxPopupProps.SuruUI;

    export type BaseUI = ComboboxPopupProps.BaseUI;

    export type HTML = ComboboxPopupProps.HTML;
  }

  export type InputPosition = ComboboxPopupInputPosition;
}
