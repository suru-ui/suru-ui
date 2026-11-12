import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAutocompleteListContext } from "../list/autocomplete.list.context.js";
import { AutocompleteGroupContext } from "./autocomplete.group.context.js";

/**
 * {@link AutocompleteGroup} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompleteGroupState<TItem = any> = AutocompleteGroupContext<TItem>;

export namespace AutocompleteGroupProps {
  export type Render<TItem = any> = RenderProps<AutocompleteGroupState<TItem>>;

  export type SuruUI<TItem = any> = {
    /** グループに含まれる項目です。 */
    items?: readonly TItem[] | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Autocomplete.Group>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // AutocompleteGroupProps より :
      "items"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteGroup} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompleteGroupProps<TItem = any> = AutocompleteGroupProps.Render<TItem> &
  AutocompleteGroupProps.SuruUI<TItem> &
  AutocompleteGroupProps.BaseUI &
  AutocompleteGroupProps.HTML;

export type IAutocompleteGroup = IComponent<AutocompleteGroupProps>;

/**
 * 関連する項目をまとめるグループ要素です。
 *
 * {@link Root} の `items` にグループの配列を渡したときに使います。
 */
export const AutocompleteGroup: IAutocompleteGroup = (props) => {
  const ctx = useAutocompleteListContext();
  const { items, style, render, className, ...otherProps } = props;

  return (
    <Autocomplete.Group
      {...otherProps}
      {...proxyRenderProps<Autocomplete.Group.State, AutocompleteGroupState>(
        (state) => ({
          ...ctx,
          items,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <AutocompleteGroupContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AutocompleteGroupContext>
          ),
          className: cn<AutocompleteGroupState>(
            className,
            "sui_autocomplete_group",
            (state) => `sui_autocomplete_group-size_${state.size}`,
            (state) => `sui_autocomplete_group-color_${state.color}`,
            (state) => `sui_autocomplete_group-radius_${state.radius}`,
            (state) => `sui_autocomplete_group-variant_${state.variant}`,
            (state) => state.outlined && "sui_autocomplete_group-outlined",
            (state) => state.open && "sui_autocomplete_group-open",
            (state) => state.empty && "sui_autocomplete_group-empty",
            (state) => state.anchorHidden && "sui_autocomplete_group-anchor_hidden",
            (state) => `sui_autocomplete_group-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_autocomplete_group-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_autocomplete_group-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
      items={items}
    />
  );
};

export { AutocompleteGroup as Group };
export namespace Group {
  export type State<TItem = any> = AutocompleteGroupState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> &
    Props.SuruUI<TItem> &
    Props.BaseUI &
    Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = AutocompleteGroupProps.Render<TItem>;

    export type SuruUI<TItem = any> = AutocompleteGroupProps.SuruUI<TItem>;

    export type BaseUI = AutocompleteGroupProps.BaseUI;

    export type HTML = AutocompleteGroupProps.HTML;
  }
}
