import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type IComboboxCollectionItemRenderer,
  ComboboxCollection,
} from "../collection/combobox.collection.jsx";
import { useComboboxPopupContext } from "../popup/combobox.popup.context.js";
import { ComboboxListContext } from "./combobox.list.context.js";

/**
 * {@link ComboboxList} の各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export type IComboboxListItemRenderer<TItem = any> = IComboboxCollectionItemRenderer<TItem>;

/**
 * {@link ComboboxList} の状態です。
 */
export type ComboboxListState = ComboboxListContext;

export namespace ComboboxListProps {
  export type Render = RenderProps<ComboboxListState>;

  export type SuruUI = {};

  export type BaseUI<TItem = any> = Override<
    Omit<
      Pick<
        React.ComponentProps<typeof Combobox.List>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // ComboboxListProps より:
        "children"
      >,
      keyof Render | keyof SuruUI
    >,
    // Base UI の型を強化します。
    {
      children?: React.ReactNode | IComboboxListItemRenderer<TItem>;
    }
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.List>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxList} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxListProps<TItem = any> = ComboboxListProps.Render &
  ComboboxListProps.SuruUI &
  ComboboxListProps.BaseUI<TItem> &
  ComboboxListProps.HTML;

export interface IComboboxList extends IComponent<ComboboxListProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: ComboboxListProps<TItem>): IComponent.Return;
}

/**
 * 候補項目のリストを表示するコンテナー要素です。
 */
export const ComboboxList: IComboboxList = function SuiComboboxList(props: ComboboxListProps) {
  const ctx = useComboboxPopupContext();
  const {
    style,
    render,
    children = <ComboboxCollection />, // 既定値は ComboboxCollection の defaultItemRenderer になります。
    className,
    ...otherProps
  } = props;

  return (
    <Combobox.List
      {...otherProps}
      {...proxyRenderProps<Combobox.List.State, ComboboxListState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ComboboxListContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ComboboxListContext>
          ),
          className: cn<ComboboxListState>(
            className,
            "sui_combobox_list",
            (state) => `sui_combobox_list-size_${state.size}`,
            (state) => `sui_combobox_list-color_${state.color}`,
            (state) => `sui_combobox_list-radius_${state.radius}`,
            (state) => `sui_combobox_list-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_list-outlined",
            (state) => state.multiple && "sui_combobox_list-multiple",
            (state) => state.empty && "sui_combobox_list-empty",
          ),
        },
      )}
    >
      {children}
    </Combobox.List>
  );
};

export { ComboboxList as List };

export namespace List {
  export type State = ComboboxListState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI & Props.BaseUI<TItem> & Props.HTML;

  export namespace Props {
    export type Render = ComboboxListProps.Render;

    export type SuruUI = ComboboxListProps.SuruUI;

    export type BaseUI<TItem = any> = ComboboxListProps.BaseUI<TItem>;

    export type HTML = ComboboxListProps.HTML;
  }

  export type IItemRenderer<TItem = any> = IComboboxListItemRenderer<TItem>;
}
