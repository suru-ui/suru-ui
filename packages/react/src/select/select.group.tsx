import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SelectGroup} が持つ状態です。
 */
export type SelectGroupState = BaseSelect.Group.State;

export namespace SelectGroupProps {
  export type Render = RenderProps<SelectGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Group>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectGroupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectGroup} に渡す props です。
 */
export type SelectGroupProps = SelectGroupProps.Render &
  SelectGroupProps.SuruUI &
  SelectGroupProps.BaseUI &
  SelectGroupProps.HTML;

/**
 * 関連する選択肢をまとめるグループ要素です。
 */
export const SelectGroup: IComponent<SelectGroupProps> = function SuiSelectGroup(props) {
  const { className, ...otherProps } = props;

  return <BaseSelect.Group {...otherProps} className={cn(className, "sui_select_group")} />;
};

export { SelectGroup as Group };

/**
 * {@link SelectGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Group {
  export type State = SelectGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectGroupProps.Render;

    export type SuruUI = SelectGroupProps.SuruUI;

    export type BaseUI = SelectGroupProps.BaseUI;

    export type HTML = SelectGroupProps.HTML;
  }
}
