// TODO(tai-kun): いつか複合コンポーネントの方に組み込む

import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxSeparator} が持つ状態です。
 */
export type ComboboxSeparatorState = Combobox.Separator.State;

export namespace ComboboxSeparatorProps {
  export type Render = RenderProps<ComboboxSeparatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Separator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxSeparatorProps:
      "orientation",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Separator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxSeparator} に渡す props です。
 */
export type ComboboxSeparatorProps = ComboboxSeparatorProps.Render &
  ComboboxSeparatorProps.SuruUI &
  ComboboxSeparatorProps.BaseUI &
  ComboboxSeparatorProps.HTML;

/**
 * 項目やグループを区切る要素です。
 */
export const ComboboxSeparator: IComponent<ComboboxSeparatorProps> = function SuiComboboxSeparator(
  props,
) {
  const { className, ...otherProps } = props;

  return <Combobox.Separator {...otherProps} className={cn(className, "sui_combobox_separator")} />;
};

export { ComboboxSeparator as Separator };

export namespace Separator {
  export type State = ComboboxSeparatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxSeparatorProps.Render;

    export type SuruUI = ComboboxSeparatorProps.SuruUI;

    export type BaseUI = ComboboxSeparatorProps.BaseUI;

    export type HTML = ComboboxSeparatorProps.HTML;
  }
}
