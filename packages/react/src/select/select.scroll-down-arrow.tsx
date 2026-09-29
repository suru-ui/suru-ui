import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SelectScrollDownArrow} が持つ状態です。
 */
export type SelectScrollDownArrowState = BaseSelect.ScrollDownArrow.State;

export namespace SelectScrollDownArrowProps {
  export type Render = RenderProps<SelectScrollDownArrowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.ScrollDownArrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectScrollDownArrowProps:
      "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.ScrollDownArrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectScrollDownArrow} に渡す props です。
 */
export type SelectScrollDownArrowProps = SelectScrollDownArrowProps.Render &
  SelectScrollDownArrowProps.SuruUI &
  SelectScrollDownArrowProps.BaseUI &
  SelectScrollDownArrowProps.HTML;

export type ISelectScrollDownArrow = IComponent<SelectScrollDownArrowProps>;

/**
 * 下方向へスクロールできることを示す要素です。
 */
export const SelectScrollDownArrow: ISelectScrollDownArrow = function SuiSelectScrollDownArrow(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <BaseSelect.ScrollDownArrow
      {...otherProps}
      className={cn(className, "sui_select_scroll_down_arrow")}
    />
  );
};

export { SelectScrollDownArrow as ScrollDownArrow };

export namespace ScrollDownArrow {
  export type State = SelectScrollDownArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectScrollDownArrowProps.Render;

    export type SuruUI = SelectScrollDownArrowProps.SuruUI;

    export type BaseUI = SelectScrollDownArrowProps.BaseUI;

    export type HTML = SelectScrollDownArrowProps.HTML;
  }
}
