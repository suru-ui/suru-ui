import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SelectIcon} が持つ状態です。
 */
export type SelectIconState = BaseSelect.Icon.State;

export namespace SelectIconProps {
  export type Render = RenderProps<SelectIconState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Icon>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectIconProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Icon>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectIcon} に渡す props です。
 */
export type SelectIconProps = SelectIconProps.Render &
  SelectIconProps.SuruUI &
  SelectIconProps.BaseUI &
  SelectIconProps.HTML;

export type ISelectIcon = IComponent<SelectIconProps>;

/**
 * ポップアップの開閉を示すアイコンのラッパー要素です。
 */
export const SelectIcon: ISelectIcon = function SuiSelectIcon(props) {
  const { className, ...otherProps } = props;

  return <BaseSelect.Icon {...otherProps} className={cn(className, "sui_select_icon")} />;
};

export { SelectIcon as Icon };

export namespace Icon {
  export type State = SelectIconState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectIconProps.Render;

    export type SuruUI = SelectIconProps.SuruUI;

    export type BaseUI = SelectIconProps.BaseUI;

    export type HTML = SelectIconProps.HTML;
  }
}
