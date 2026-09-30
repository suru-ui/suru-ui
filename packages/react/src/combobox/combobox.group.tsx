import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { ComboboxContext, useComboboxContext } from "./combobox.context.js";

/**
 * {@link ComboboxGroup} の状態です。
 */
export type ComboboxGroupState = Override<ComboboxContext, Combobox.Group.State>;

export namespace ComboboxGroupProps {
  export type Render = RenderProps<ComboboxGroupState>;

  export type SuruUI<TItem = any> = {
    /**
     * グループに含まれる項目です。
     */
    items?: readonly TItem[] | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Group>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxGroupProps:
      "items",
      keyof Render | keyof SuruUI
    >
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
  const ctx = useComboboxContext();
  const { items, style, render, className, ...otherProps } = props;
  // items が未指定であっても上位の items が透過しないように、必ず新しい items を子要素に伝搬します。
  const groupCtx = React.useMemo<ComboboxContext>(() => ({ ...ctx, items }), [ctx, items]);

  return (
    <ComboboxContext value={groupCtx}>
      <Combobox.Group
        {...otherProps}
        items={items}
        {...proxyRenderProps<Combobox.Group.State, ComboboxGroupState>(
          (state) => ({ ...groupCtx, ...state }),
          {
            style,
            render,
            className: cn<ComboboxGroupState>(className, "sui_combobox_group"),
          },
        )}
      />
    </ComboboxContext>
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
