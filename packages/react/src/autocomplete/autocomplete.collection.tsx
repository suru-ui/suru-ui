import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { getItemLabel } from "../_get-item-label.js";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import isReactNode from "../_is-react-node.js";
import { getItemKey, isItemGroup, isLabeledItem, isPrimitiveItem } from "../_item.js";
import type { Override, IComponent } from "../types.js";
import { AutocompleteGroupLabel } from "./autocomplete.group-label.jsx";
import { AutocompleteGroup } from "./autocomplete.group.jsx";
import { AutocompleteItem } from "./autocomplete.item.jsx";
import type {
  AutocompleteRootItemGroupObject,
  AutocompleteRootLabeledItemObject,
} from "./autocomplete.root.jsx";
import { AutocompleteSeparator } from "./autocomplete.separator.jsx";

/**
 * {@link AutocompleteCollection} の各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の値の型です。
 */
export interface IAutocompleteCollectionItemRenderer<TItem = any> {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @returns レンダリングする内容です。
   */
  (item: TItem, index: number): React.ReactNode;
}

/**
 * {@link AutocompleteCollection} の状態です。
 */
export type AutocompleteCollectionState = {};

export namespace AutocompleteCollectionProps {
  export type Render = {};

  export type SuruUI = {
    /**
     * グループの末尾に区切り線を表示するかどうかを指定します。
     *
     * 既定レンダラーを使うときにだけ適用されます。
     */
    separator?: boolean | undefined;
  };

  export type BaseUI<TItem = any> = Override<
    Pick<
      React.ComponentProps<typeof Autocomplete.Collection>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // AutocompleteCollectionProps:
        "children",
        keyof Render | keyof SuruUI
      >
    >,
    // Base UI の型を強化します。
    {
      children?: IAutocompleteCollectionItemRenderer<TItem> | undefined;
    }
  >;

  export type HTML = {};
}

/**
 * {@link AutocompleteCollection} に渡す props です。
 */
export type AutocompleteCollectionProps<TItem = any> = AutocompleteCollectionProps.Render &
  AutocompleteCollectionProps.SuruUI &
  AutocompleteCollectionProps.BaseUI<TItem> &
  AutocompleteCollectionProps.HTML;

export interface IAutocompleteCollection extends IComponent<AutocompleteCollectionProps> {
  /**
   * @template TItem 項目の値の型です。
   */
  <TItem = any>(props: AutocompleteCollectionProps<TItem>): IComponent.Return;
}

/**
 * フィルタリングされた項目を列挙する要素です。
 *
 * これ自身は HTML 要素をレンダリングしません。
 */
export const AutocompleteCollection: IAutocompleteCollection = function SuiAutocompleteCollection(
  props: AutocompleteCollectionProps,
) {
  const defaultItemRenderer: IAutocompleteCollectionItemRenderer = (item, index) => {
    switch (true) {
      case isItemGroup<AutocompleteRootItemGroupObject>(item): {
        const { label, ...otherProps } = item;

        return (
          <AutocompleteGroup {...otherProps} key={getItemKey(item) ?? index}>
            {isLikelyVisibleNode(label) && <AutocompleteGroupLabel>{label}</AutocompleteGroupLabel>}
            <AutocompleteCollection>{defaultItemRenderer}</AutocompleteCollection>
            {separator && <AutocompleteSeparator />}
          </AutocompleteGroup>
        );
      }

      case isLabeledItem<AutocompleteRootLabeledItemObject>(item): {
        const { label, ...otherProps } = item;

        return (
          <AutocompleteItem {...otherProps} key={getItemKey(item) ?? index} value={item}>
            {label}
          </AutocompleteItem>
        );
      }

      case isPrimitiveItem(item):
      case !isReactNode(item):
        return (
          <AutocompleteItem key={getItemKey(item) ?? index} value={item}>
            {getItemLabel(item)}
          </AutocompleteItem>
        );

      default:
        return <React.Fragment key={getItemKey(item) ?? index}>{item}</React.Fragment>;
    }
  };

  const { children = defaultItemRenderer, separator = false } = props;

  return <Autocomplete.Collection>{children}</Autocomplete.Collection>;
};

export { AutocompleteCollection as Collection };

export namespace Collection {
  export type State = AutocompleteCollectionState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI & Props.BaseUI<TItem> & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteCollectionProps.Render;

    export type SuruUI = AutocompleteCollectionProps.SuruUI;

    export type BaseUI<TItem = any> = AutocompleteCollectionProps.BaseUI<TItem>;

    export type HTML = AutocompleteCollectionProps.HTML;
  }

  export type IItemRenderer<TItem = any> = IAutocompleteCollectionItemRenderer<TItem>;
}
