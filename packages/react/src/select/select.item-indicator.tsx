import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SelectItemIndicator} が持つ状態です。
 */
export type SelectItemIndicatorState = BaseSelect.ItemIndicator.State;

export namespace SelectItemIndicatorProps {
  export type Render = RenderProps<SelectItemIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.ItemIndicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectItemIndicatorProps:
      "children" | "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.ItemIndicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectItemIndicator} に渡す props です。
 */
export type SelectItemIndicatorProps = SelectItemIndicatorProps.Render &
  SelectItemIndicatorProps.SuruUI &
  SelectItemIndicatorProps.BaseUI &
  SelectItemIndicatorProps.HTML;

/**
 * 選択された項目を示す要素です。
 */
export const SelectItemIndicator: IComponent<SelectItemIndicatorProps> =
  function SuiSelectItemIndicator(props) {
    const { className, keepMounted = true, ...otherProps } = props;

    return (
      <BaseSelect.ItemIndicator
        {...otherProps}
        className={cn(className, "sui_select_item_indicator")}
        keepMounted={keepMounted}
      />
    );
  };

export { SelectItemIndicator as ItemIndicator };

/**
 * {@link SelectItemIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ItemIndicator {
  export type State = SelectItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectItemIndicatorProps.Render;

    export type SuruUI = SelectItemIndicatorProps.SuruUI;

    export type BaseUI = SelectItemIndicatorProps.BaseUI;

    export type HTML = SelectItemIndicatorProps.HTML;
  }
}
