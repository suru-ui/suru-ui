import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { AutocompleteContext, useAutocompleteContext } from "./autocomplete.context.js";

/**
 * {@link AutocompleteGroup} の状態です。
 */
export type AutocompleteGroupState = Override<AutocompleteContext, Autocomplete.Group.State>;

export namespace AutocompleteGroupProps {
  export type Render = RenderProps<AutocompleteGroupState>;

  export type SuruUI<TItem = any> = {
    /**
     * グループに含まれる項目です。
     */
    items?: readonly TItem[] | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Group>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AutocompleteGroupProps:
      "items",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteGroup} に渡す props です。
 */
export type AutocompleteGroupProps<TItem = any> = AutocompleteGroupProps.Render &
  AutocompleteGroupProps.SuruUI<TItem> &
  AutocompleteGroupProps.BaseUI &
  AutocompleteGroupProps.HTML;

export type IAutocompleteGroup = IComponent<AutocompleteGroupProps>;

/**
 * 関連する項目をまとめるグループ要素です。
 *
 * {@link Root} の `items` にグループの配列を渡したときに使います。
 */
export const AutocompleteGroup: IAutocompleteGroup = function SuiAutocompleteGroup(props) {
  const ctx = useAutocompleteContext();
  const { items, style, render, className, ...otherProps } = props;
  // items が未指定であっても上位の items が透過しないように、必ず新しい items を子要素に伝搬します。
  const groupCtx = React.useMemo<AutocompleteContext>(() => ({ ...ctx, items }), [ctx, items]);

  return (
    <AutocompleteContext value={groupCtx}>
      <Autocomplete.Group
        {...otherProps}
        items={items}
        {...proxyRenderProps<Autocomplete.Group.State, AutocompleteGroupState>(
          (state) => ({ ...groupCtx, ...state }),
          {
            style,
            render,
            className: cn<AutocompleteGroupState>(className, "sui_autocomplete_group"),
          },
        )}
      />
    </AutocompleteContext>
  );
};

export { AutocompleteGroup as Group };

export namespace Group {
  export type State = AutocompleteGroupState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteGroupProps.Render;

    export type SuruUI<TItem = any> = AutocompleteGroupProps.SuruUI<TItem>;

    export type BaseUI = AutocompleteGroupProps.BaseUI;

    export type HTML = AutocompleteGroupProps.HTML;
  }
}
