import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SelectLabel} が持つ状態です。
 */
export type SelectLabelState = BaseSelect.Label.State;

export namespace SelectLabelProps {
  export type Render = RenderProps<SelectLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Label>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Label>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectLabel} に渡す props です。
 */
export type SelectLabelProps = SelectLabelProps.Render &
  SelectLabelProps.SuruUI &
  SelectLabelProps.BaseUI &
  SelectLabelProps.HTML;

/**
 * 選択欄に対応する表示ラベルです。
 */
export const SelectLabel: IComponent<SelectLabelProps> = function SuiSelectLabel(props) {
  const { className, ...otherProps } = props;

  return <BaseSelect.Label {...otherProps} className={cn(className, "sui_select_label")} />;
};

export { SelectLabel as Label };

/**
 * {@link SelectLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Label {
  export type State = SelectLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectLabelProps.Render;

    export type SuruUI = SelectLabelProps.SuruUI;

    export type BaseUI = SelectLabelProps.BaseUI;

    export type HTML = SelectLabelProps.HTML;
  }
}
