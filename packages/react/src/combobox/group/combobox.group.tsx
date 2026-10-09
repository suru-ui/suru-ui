import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useComboboxListContext } from "../list/combobox.list.context.js";
import { ComboboxGroupContext } from "./combobox.group.context.js";

/**
 * {@link ComboboxGroup} の状態です。
 */
export type ComboboxGroupState = ComboboxGroupContext;

export namespace ComboboxGroupProps {
  export type Render = RenderProps<ComboboxGroupState>;

  export type SuruUI<TItem = any> = {
    /**
     * グループに含まれる項目です。
     */
    items?: readonly TItem[] | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.Group>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ComboboxGroupProps より:
      "items"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxGroup} に渡す props です。
 */
export type ComboboxGroupProps<TItem = any> = ComboboxGroupProps.Render &
  ComboboxGroupProps.SuruUI<TItem> &
  ComboboxGroupProps.BaseUI &
  ComboboxGroupProps.HTML;

export type IComboboxGroup = IComponent<ComboboxGroupProps>;

/**
 * 関連する候補項目をまとめるグループ要素です。
 */
export const ComboboxGroup: IComboboxGroup = function SuiComboboxGroup(props) {
  const ctx = useComboboxListContext();
  const { items, style, render, className, ...otherProps } = props;

  return (
    <Combobox.Group
      {...otherProps}
      {...proxyRenderProps<Combobox.Group.State, ComboboxGroupState>(
        (state) => ({ ...ctx, items, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ComboboxGroupContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ComboboxGroupContext>
          ),
          className: cn<ComboboxGroupState>(
            className,
            "sui_combobox_group",
            (state) => `sui_combobox_group-size_${state.size}`,
            (state) => `sui_combobox_group-color_${state.color}`,
            (state) => `sui_combobox_group-radius_${state.radius}`,
            (state) => `sui_combobox_group-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_group-outlined",
            (state) => state.multiple && "sui_combobox_group-multiple",
          ),
        },
      )}
      items={items}
    />
  );
};

export { ComboboxGroup as Group };

export namespace Group {
  export type State = ComboboxGroupState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxGroupProps.Render;

    export type SuruUI<TItem = any> = ComboboxGroupProps.SuruUI<TItem>;

    export type BaseUI = ComboboxGroupProps.BaseUI;

    export type HTML = ComboboxGroupProps.HTML;
  }
}
