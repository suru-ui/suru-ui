import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxArrow} が持つ状態です。
 */
export type ComboboxArrowState = Combobox.Arrow.State;

export namespace ComboboxArrowProps {
  export type Render = RenderProps<ComboboxArrowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Arrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxArrowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxArrow} に渡す props です。
 */
export type ComboboxArrowProps = ComboboxArrowProps.Render &
  ComboboxArrowProps.SuruUI &
  ComboboxArrowProps.BaseUI &
  ComboboxArrowProps.HTML;

/**
 * ポップアップと入力欄をつなぐ矢印要素です。
 */
export const ComboboxArrow: IComponent<ComboboxArrowProps> = function SuiComboboxArrow(props) {
  const { className, ...otherProps } = props;

  return (
    <Combobox.Arrow
      {...otherProps}
      className={cn(
        className,
        "sui_combobox_arrow",
        (state) => `sui_combobox_arrow-side_${state.side}`,
      )}
    />
  );
};

export { ComboboxArrow as Arrow };

export namespace Arrow {
  export type State = ComboboxArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxArrowProps.Render;

    export type SuruUI = ComboboxArrowProps.SuruUI;

    export type BaseUI = ComboboxArrowProps.BaseUI;

    export type HTML = ComboboxArrowProps.HTML;
  }
}
