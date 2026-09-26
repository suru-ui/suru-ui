import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SelectValue} が持つ状態です。
 */
export type SelectValueState = BaseSelect.Value.State;

export namespace SelectValueProps {
  export type Render = RenderProps<SelectValueState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Value>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectValueProps:
      "children" | "placeholder",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Value>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectValue} に渡す props です。
 */
export type SelectValueProps = SelectValueProps.Render &
  SelectValueProps.SuruUI &
  SelectValueProps.BaseUI &
  SelectValueProps.HTML;

/**
 * 現在の選択値またはプレースホルダーを表示する要素です。
 */
export const SelectValue: IComponent<SelectValueProps> = function SuiSelectValue(props) {
  const { className, ...otherProps } = props;

  return (
    <BaseSelect.Value
      {...otherProps}
      className={cn(
        className,
        "sui_select_value",
        (state) => state.placeholder && "sui_select_value-placeholder",
      )}
    />
  );
};

export { SelectValue as Value };

export namespace Value {
  export type State = SelectValueState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectValueProps.Render;

    export type SuruUI = SelectValueProps.SuruUI;

    export type BaseUI = SelectValueProps.BaseUI;

    export type HTML = SelectValueProps.HTML;
  }
}
