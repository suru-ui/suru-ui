import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type SelectContext, useSelectContext } from "./select.context.js";

/**
 * {@link SelectItemText} が持つ状態です。
 */
export type SelectItemTextState = Override<SelectContext, BaseSelect.ItemText.State>;

export namespace SelectItemTextProps {
  export type Render = RenderProps<SelectItemTextState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.ItemText>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectItemTextProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.ItemText>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectItemText} に渡す props です。
 */
export type SelectItemTextProps = SelectItemTextProps.Render &
  SelectItemTextProps.SuruUI &
  SelectItemTextProps.BaseUI &
  SelectItemTextProps.HTML;

export type ISelectItemText = IComponent<SelectItemTextProps>;

/**
 * 選択肢の表示テキストを包む要素です。
 */
export const SelectItemText: ISelectItemText = function SuiSelectItemText(props) {
  const ctx = useSelectContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.ItemText
      {...otherProps}
      {...proxyRenderProps<BaseSelect.ItemText.State, SelectItemTextState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn(className, "sui_select_item_text"),
        },
      )}
    />
  );
};

export { SelectItemText as ItemText };

export namespace ItemText {
  export type State = SelectItemTextState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectItemTextProps.Render;

    export type SuruUI = SelectItemTextProps.SuruUI;

    export type BaseUI = SelectItemTextProps.BaseUI;

    export type HTML = SelectItemTextProps.HTML;
  }
}
