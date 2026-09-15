import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxGroup} が持つ状態です。
 */
export type ComboboxGroupState = Combobox.Group.State;

export namespace ComboboxGroupProps {
  export type Render = RenderProps<ComboboxGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Group>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxGroupProps:
      "items",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxGroup} に渡す props です。
 */
export type ComboboxGroupProps = ComboboxGroupProps.Render &
  ComboboxGroupProps.SuruUI &
  ComboboxGroupProps.BaseUI &
  ComboboxGroupProps.HTML;

/**
 * 関連する候補項目をまとめるグループ要素です。
 */
export const ComboboxGroup: IComponent<ComboboxGroupProps> = function SuiComboboxGroup(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Group {...otherProps} className={cn(className, "sui_combobox_group")} />;
};

export { ComboboxGroup as Group };

/**
 * {@link ComboboxGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Group {
  export type State = ComboboxGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxGroupProps.Render;

    export type SuruUI = ComboboxGroupProps.SuruUI;

    export type BaseUI = ComboboxGroupProps.BaseUI;

    export type HTML = ComboboxGroupProps.HTML;
  }
}
