import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import isLikelyVisibleNode from "../../_is-likely-visible-node.js";
import isReactNode from "../../_is-react-node.js";
import { getItemKey, isItemGroup, isLabeledItem, isPrimitiveItem } from "../../_item.js";
import type { Override, IComponent } from "../../types.js";
import { ComboboxGroupLabel } from "../group-label/combobox.group-label.jsx";
import { ComboboxGroup } from "../group/combobox.group.jsx";
import { ComboboxItemIndicator } from "../item-indicator/combobox.item-indicator.jsx";
import { ComboboxItem } from "../item/combobox.item.jsx";
import { useComboboxContext } from "../root/combobox.root.context.js";
import type {
  ComboboxRootItemGroupObject,
  ComboboxRootLabeledItemObject,
} from "../root/combobox.root.jsx";
import { ComboboxSeparator } from "../separator/combobox.separator.jsx";

/**
 * {@link ComboboxCollection} の各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IComboboxCollectionItemRenderer<TItem = any> {
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
 * {@link ComboboxCollection} の状態です。
 */
export type ComboboxCollectionState = Combobox.Collection.State;

export namespace ComboboxCollectionProps {
  export type Render = {};

  export type SuruUI = {
    /**
     * グループの末尾に区切り線を表示するかどうかを指定します。
     *
     * 既定レンダラーを使うときにだけ適用されます。
     *
     * @default true
     */
    separator?: boolean | undefined;
  };

  export type BaseUI<TItem = any> = Override<
    Omit<
      Pick<
        React.ComponentProps<typeof Combobox.Collection>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // ComboboxCollectionProps より:
        "children"
      >,
      keyof Render | keyof SuruUI
    >,
    // Base UI の型を強化します。
    {
      children?: IComboboxCollectionItemRenderer<TItem> | undefined;
    }
  >;

  export type HTML = {};
}

/**
 * {@link ComboboxCollection} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxCollectionProps<TItem = any> = ComboboxCollectionProps.Render &
  ComboboxCollectionProps.SuruUI &
  ComboboxCollectionProps.BaseUI<TItem> &
  ComboboxCollectionProps.HTML;

export interface IComboboxCollection extends IComponent<ComboboxCollectionProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: ComboboxCollectionProps<TItem>): IComponent.Return;
}

/**
 * フィルタリングされた項目を列挙する要素です。
 *
 * これ自身は HTML 要素をレンダリングしません。
 */
export const ComboboxCollection: IComboboxCollection = function SuiComboboxCollection(
  props: ComboboxCollectionProps,
) {
  const ctx = useComboboxContext();

  const defaultItemRenderer: IComboboxCollectionItemRenderer = (item, index) => {
    switch (true) {
      case isItemGroup<ComboboxRootItemGroupObject>(item): {
        const { label, ...otherProps } = item;

        return (
          <ComboboxGroup {...otherProps} key={getItemKey(item) ?? index}>
            {isLikelyVisibleNode(label) && <ComboboxGroupLabel>{label}</ComboboxGroupLabel>}
            <ComboboxCollection>{defaultItemRenderer}</ComboboxCollection>
            {separator && <ComboboxSeparator />}
          </ComboboxGroup>
        );
      }

      case isLabeledItem<ComboboxRootLabeledItemObject>(item): {
        const { label, ...otherProps } = item;

        return (
          <ComboboxItem {...otherProps} key={getItemKey(item) ?? index} value={item}>
            {label}
            <ComboboxItemIndicator />
          </ComboboxItem>
        );
      }

      case isPrimitiveItem(item):
      case !isReactNode(item):
        return (
          <ComboboxItem key={getItemKey(item) ?? index} value={item}>
            {ctx.itemToStringLabel(item)}
            <ComboboxItemIndicator />
          </ComboboxItem>
        );

      default:
        return <React.Fragment key={getItemKey(item) ?? index}>{item}</React.Fragment>;
    }
  };

  const { children = defaultItemRenderer, separator = true } = props;

  return <Combobox.Collection>{children}</Combobox.Collection>;
};

export { ComboboxCollection as Collection };

export namespace Collection {
  export type State = ComboboxCollectionState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI & Props.BaseUI<TItem> & Props.HTML;

  export namespace Props {
    export type Render = ComboboxCollectionProps.Render;

    export type SuruUI = ComboboxCollectionProps.SuruUI;

    export type BaseUI<TItem = any> = ComboboxCollectionProps.BaseUI<TItem>;

    export type HTML = ComboboxCollectionProps.HTML;
  }

  export type IItemRenderer<TItem = any> = IComboboxCollectionItemRenderer<TItem>;
}
