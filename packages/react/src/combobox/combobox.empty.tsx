import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxEmpty} が持つ状態です。
 */
export type ComboboxEmptyState = Combobox.Empty.State;

export namespace ComboboxEmptyProps {
  export type Render = RenderProps<ComboboxEmptyState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Empty>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxEmptyProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Empty>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxEmpty} に渡す props です。
 */
export type ComboboxEmptyProps = ComboboxEmptyProps.Render &
  ComboboxEmptyProps.SuruUI &
  ComboboxEmptyProps.BaseUI &
  ComboboxEmptyProps.HTML;

/**
 * 候補リストが空のときに内容を表示する要素です。
 */
export const ComboboxEmpty: IComponent<ComboboxEmptyProps> = function SuiComboboxEmpty(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Empty {...otherProps} className={cn(className, "sui_combobox_empty")} />;
};

export { ComboboxEmpty as Empty };

export namespace Empty {
  export type State = ComboboxEmptyState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxEmptyProps.Render;

    export type SuruUI = ComboboxEmptyProps.SuruUI;

    export type BaseUI = ComboboxEmptyProps.BaseUI;

    export type HTML = ComboboxEmptyProps.HTML;
  }
}
