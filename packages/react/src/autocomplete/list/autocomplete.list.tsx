import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type IAutocompleteCollectionItemRenderer,
  AutocompleteCollection,
} from "../collection/autocomplete.collection.jsx";
import { useAutocompletePopupContext } from "../popup/autocomplete.popup.context.js";
import { AutocompleteListContext } from "./autocomplete.list.context.js";

/**
 * {@link AutocompleteList} の各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export type IAutocompleteListItemRenderer<TItem = any> = IAutocompleteCollectionItemRenderer<TItem>;

/**
 * {@link AutocompleteList} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompleteListState<TItem = any> = AutocompleteListContext<TItem>;

export namespace AutocompleteListProps {
  export type Render<TItem = any> = RenderProps<AutocompleteListState<TItem>>;

  export type SuruUI = {};

  export type BaseUI<TItem = any> = Override<
    Omit<
      Pick<
        React.ComponentProps<typeof Autocomplete.List>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // AutocompleteListProps より :
        "children"
      >,
      keyof Render | keyof SuruUI
    >,
    // Base UI の型を強化します。
    {
      children?: React.ReactNode | IAutocompleteListItemRenderer<TItem>;
    }
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.List>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteList} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompleteListProps<TItem = any> = AutocompleteListProps.Render<TItem> &
  AutocompleteListProps.SuruUI &
  AutocompleteListProps.BaseUI<TItem> &
  AutocompleteListProps.HTML;

export interface IAutocompleteList extends IComponent<AutocompleteListProps> {
  /**
   * @template TItem 項目の値の型です。
   */
  <TItem = any>(props: AutocompleteListProps<TItem>): IComponent.Return;
}

/** 検索結果のリストを表示するコンテナー要素です。 */
export const AutocompleteList: IAutocompleteList = (props: AutocompleteListProps) => {
  const ctx = useAutocompletePopupContext();
  const {
    style,
    render,
    // children の既定値は、AutocompleteCollection の defaultItemRenderer とします。
    children = <AutocompleteCollection />,
    className,
    ...otherProps
  } = props;

  return (
    <Autocomplete.List
      {...otherProps}
      {...proxyRenderProps<Autocomplete.List.State, AutocompleteListState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <AutocompleteListContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AutocompleteListContext>
          ),
          className: cn<AutocompleteListState>(
            className,
            "sui_autocomplete_list",
            (state) => `sui_autocomplete_list-size_${state.size}`,
            (state) => `sui_autocomplete_list-color_${state.color}`,
            (state) => `sui_autocomplete_list-radius_${state.radius}`,
            (state) => `sui_autocomplete_list-variant_${state.variant}`,
            (state) => state.outlined && "sui_autocomplete_list-outlined",
            (state) => state.empty && "sui_autocomplete_list-empty",
            (state) => state.open && "sui_autocomplete_list-open",
            (state) => state.anchorHidden && "sui_autocomplete_list-anchor_hidden",
            (state) => `sui_autocomplete_list-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_autocomplete_list-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_autocomplete_list-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    >
      {children}
    </Autocomplete.List>
  );
};

export { AutocompleteList as List };
export namespace List {
  export type State<TItem = any> = AutocompleteListState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> &
    Props.SuruUI &
    Props.BaseUI<TItem> &
    Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = AutocompleteListProps.Render<TItem>;

    export type SuruUI = AutocompleteListProps.SuruUI;

    export type BaseUI<TItem = any> = AutocompleteListProps.BaseUI<TItem>;

    export type HTML = AutocompleteListProps.HTML;
  }

  export type IItemRenderer<TItem = any> = IAutocompleteListItemRenderer<TItem>;
}
