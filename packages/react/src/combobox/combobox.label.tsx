import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxLabel} が持つ状態です。
 */
export type ComboboxLabelState = Combobox.Label.State;

export namespace ComboboxLabelProps {
  export type Render = RenderProps<ComboboxLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Label>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Label>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxLabel} に渡す props です。
 */
export type ComboboxLabelProps = ComboboxLabelProps.Render &
  ComboboxLabelProps.SuruUI &
  ComboboxLabelProps.BaseUI &
  ComboboxLabelProps.HTML;

/**
 * トリガーに対応する表示ラベルです。
 */
export const ComboboxLabel: IComponent<ComboboxLabelProps> = function SuiComboboxLabel(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Label {...otherProps} className={cn(className, "sui_combobox_label")} />;
};

export { ComboboxLabel as Label };

/**
 * {@link ComboboxLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Label {
  export type State = ComboboxLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxLabelProps.Render;

    export type SuruUI = ComboboxLabelProps.SuruUI;

    export type BaseUI = ComboboxLabelProps.BaseUI;

    export type HTML = ComboboxLabelProps.HTML;
  }
}
