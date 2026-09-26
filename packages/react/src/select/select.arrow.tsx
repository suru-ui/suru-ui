import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SelectArrow} が持つ状態です。
 */
export type SelectArrowState = BaseSelect.Arrow.State;

export namespace SelectArrowProps {
  export type Render = RenderProps<SelectArrowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Arrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectArrowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectArrow} に渡す props です。
 */
export type SelectArrowProps = SelectArrowProps.Render &
  SelectArrowProps.SuruUI &
  SelectArrowProps.BaseUI &
  SelectArrowProps.HTML;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const SelectArrow: IComponent<SelectArrowProps> = function SuiSelectArrow(props) {
  const { className, ...otherProps } = props;

  return <BaseSelect.Arrow {...otherProps} className={cn(className, "sui_select_arrow")} />;
};

export { SelectArrow as Arrow };

export namespace Arrow {
  export type State = SelectArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectArrowProps.Render;

    export type SuruUI = SelectArrowProps.SuruUI;

    export type BaseUI = SelectArrowProps.BaseUI;

    export type HTML = SelectArrowProps.HTML;
  }
}
