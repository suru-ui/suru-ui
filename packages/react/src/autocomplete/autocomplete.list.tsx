import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import {
  type IAutocompleteCollectionItemRenderer,
  AutocompleteCollection,
} from "./autocomplete.collection.jsx";
import { type AutocompleteContext, useAutocompleteContext } from "./autocomplete.context.js";

export type IAutocompleteListItemRenderer<TItem = any> = IAutocompleteCollectionItemRenderer<TItem>;

/**
 * {@link AutocompleteList} の状態です。
 */
export type AutocompleteListState = Override<AutocompleteContext, Autocomplete.List.State>;

export namespace AutocompleteListProps {
  export type Render = RenderProps<AutocompleteListState>;

  export type SuruUI = {};

  export type BaseUI<TItem = any> = Override<
    Pick<
      React.ComponentProps<typeof Autocomplete.List>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // AutocompleteListProps:
        "children",
        keyof Render | keyof SuruUI
      >
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
 */
export type AutocompleteListProps<TItem = any> = AutocompleteListProps.Render &
  AutocompleteListProps.SuruUI &
  AutocompleteListProps.BaseUI<TItem> &
  AutocompleteListProps.HTML;

export interface IAutocompleteList extends IComponent<AutocompleteListProps> {
  /**
   * @template TItem 項目の値の型です。
   */
  <TItem = any>(props: AutocompleteListProps<TItem>): IComponent.Return;
}

/**
 * 検索結果のリストを表示するコンテナー要素です。
 */
export const AutocompleteList: IAutocompleteList = function SuiAutocompleteList(
  props: AutocompleteListProps,
) {
  const ctx = useAutocompleteContext();
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
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<AutocompleteListState>(className, "sui_autocomplete_list"),
        },
      )}
    >
      {children}
    </Autocomplete.List>
  );
};

export { AutocompleteList as List };

export namespace List {
  export type State = AutocompleteListState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI & Props.BaseUI<TItem> & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteListProps.Render;

    export type SuruUI = AutocompleteListProps.SuruUI;

    export type BaseUI<TItem = any> = AutocompleteListProps.BaseUI<TItem>;

    export type HTML = AutocompleteListProps.HTML;
  }

  export type IItemRenderer<TItem = any> = IAutocompleteListItemRenderer<TItem>;
}
