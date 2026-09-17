import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxIcon} が持つ状態です。
 */
export type ComboboxIconState = Combobox.Icon.State;

export namespace ComboboxIconProps {
  export type Render = RenderProps<ComboboxIconState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Icon>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxIconProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Icon>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxIcon} に渡す props です。
 */
export type ComboboxIconProps = ComboboxIconProps.Render &
  ComboboxIconProps.SuruUI &
  ComboboxIconProps.BaseUI &
  ComboboxIconProps.HTML;

/**
 * トリガーの操作を示すアイコンのラッパー要素です。
 */
export const ComboboxIcon: IComponent<ComboboxIconProps> = function SuiComboboxIcon(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Icon {...otherProps} className={cn(className, "sui_combobox_icon")} />;
};

export { ComboboxIcon as Icon };

export namespace Icon {
  export type State = ComboboxIconState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxIconProps.Render;

    export type SuruUI = ComboboxIconProps.SuruUI;

    export type BaseUI = ComboboxIconProps.BaseUI;

    export type HTML = ComboboxIconProps.HTML;
  }
}
