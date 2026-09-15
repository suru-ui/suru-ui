import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SelectScrollUpArrow} が持つ状態です。
 */
export type SelectScrollUpArrowState = BaseSelect.ScrollUpArrow.State;

export namespace SelectScrollUpArrowProps {
  export type Render = RenderProps<SelectScrollUpArrowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.ScrollUpArrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectScrollUpArrowProps:
      "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.ScrollUpArrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectScrollUpArrow} に渡す props です。
 */
export type SelectScrollUpArrowProps = SelectScrollUpArrowProps.Render &
  SelectScrollUpArrowProps.SuruUI &
  SelectScrollUpArrowProps.BaseUI &
  SelectScrollUpArrowProps.HTML;

/**
 * 上方向へスクロールできることを示す要素です。
 */
export const SelectScrollUpArrow: IComponent<SelectScrollUpArrowProps> =
  function SuiSelectScrollUpArrow(props) {
    const { className, ...otherProps } = props;

    return (
      <BaseSelect.ScrollUpArrow
        {...otherProps}
        className={cn(className, "sui_select_scroll_up_arrow")}
      />
    );
  };

export { SelectScrollUpArrow as ScrollUpArrow };

/**
 * {@link SelectScrollUpArrow} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ScrollUpArrow {
  export type State = SelectScrollUpArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectScrollUpArrowProps.Render;

    export type SuruUI = SelectScrollUpArrowProps.SuruUI;

    export type BaseUI = SelectScrollUpArrowProps.BaseUI;

    export type HTML = SelectScrollUpArrowProps.HTML;
  }
}
