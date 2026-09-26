import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SelectSeparator} が持つ状態です。
 */
export type SelectSeparatorState = BaseSelect.Separator.State;

export namespace SelectSeparatorProps {
  export type Render = RenderProps<SelectSeparatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Separator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectSeparatorProps:
      "orientation",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Separator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectSeparator} に渡す props です。
 */
export type SelectSeparatorProps = SelectSeparatorProps.Render &
  SelectSeparatorProps.SuruUI &
  SelectSeparatorProps.BaseUI &
  SelectSeparatorProps.HTML;

/**
 * 項目やグループを区切る要素です。
 */
export const SelectSeparator: IComponent<SelectSeparatorProps> = function SuiSelectSeparator(
  props,
) {
  const { className, ...otherProps } = props;

  return <BaseSelect.Separator {...otherProps} className={cn(className, "sui_select_separator")} />;
};

export { SelectSeparator as Separator };

export namespace Separator {
  export type State = SelectSeparatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectSeparatorProps.Render;

    export type SuruUI = SelectSeparatorProps.SuruUI;

    export type BaseUI = SelectSeparatorProps.BaseUI;

    export type HTML = SelectSeparatorProps.HTML;
  }
}
