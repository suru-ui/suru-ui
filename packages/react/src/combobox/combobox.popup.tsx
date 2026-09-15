import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxPopup} が持つ状態です。
 */
export type ComboboxPopupState = Combobox.Popup.State;

export namespace ComboboxPopupProps {
  export type Render = RenderProps<ComboboxPopupState>;

  export type SuruUI = {};

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

/**
 * 候補項目を表示するポップアップ要素です。
 */
export const ComboboxPopup: IComponent<ComboboxPopupProps> = function SuiComboboxPopup(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Popup {...otherProps} className={cn(className, "sui_combobox_popup")} />;
};

export { ComboboxPopup as Popup };

/**
 * {@link ComboboxPopup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Popup {
  export type State = ComboboxPopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxPopupProps.Render;

    export type SuruUI = ComboboxPopupProps.SuruUI;

    export type BaseUI = ComboboxPopupProps.BaseUI;

    export type HTML = ComboboxPopupProps.HTML;
  }
}
