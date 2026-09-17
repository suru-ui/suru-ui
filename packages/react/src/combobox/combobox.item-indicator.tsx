import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxItemIndicator} が持つ状態です。
 */
export type ComboboxItemIndicatorState = Combobox.ItemIndicator.State;

export namespace ComboboxItemIndicatorProps {
  export type Render = RenderProps<ComboboxItemIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.ItemIndicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxItemIndicatorProps:
      "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.ItemIndicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxItemIndicator} に渡す props です。
 */
export type ComboboxItemIndicatorProps = ComboboxItemIndicatorProps.Render &
  ComboboxItemIndicatorProps.SuruUI &
  ComboboxItemIndicatorProps.BaseUI &
  ComboboxItemIndicatorProps.HTML;

/**
 * 項目が選択されていることを示す要素です。
 */
export const ComboboxItemIndicator: IComponent<ComboboxItemIndicatorProps> =
  function SuiComboboxItemIndicator(props) {
    const { className, ...otherProps } = props;

    return (
      <Combobox.ItemIndicator
        {...otherProps}
        className={cn(className, "sui_combobox_item_indicator")}
      />
    );
  };

export { ComboboxItemIndicator as ItemIndicator };

export namespace ItemIndicator {
  export type State = ComboboxItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxItemIndicatorProps.Render;

    export type SuruUI = ComboboxItemIndicatorProps.SuruUI;

    export type BaseUI = ComboboxItemIndicatorProps.BaseUI;

    export type HTML = ComboboxItemIndicatorProps.HTML;
  }
}
