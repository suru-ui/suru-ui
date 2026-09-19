import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import isReactNode from "../_is-react-node.js";
import { isItemGroup, isLabeledItem, isPrimitiveItem } from "../_item.js";
import type { Override, IComponent } from "../types.js";
import { useComboboxContext } from "./combobox.context.js";
import { ComboboxGroupLabel } from "./combobox.group-label.jsx";
import { ComboboxGroup } from "./combobox.group.jsx";
import { ComboboxItemIndicator } from "./combobox.item-indicator.jsx";
import { ComboboxItem } from "./combobox.item.jsx";
import type { ComboboxRootItemGroup, ComboboxRootItemLabeledValue } from "./combobox.root.jsx";

export interface IComboboxCollectionItemRenderer<TItem = any> {
  (item: TItem, index: number): React.ReactNode;
}

/**
 * {@link ComboboxCollection} が持つ状態です。
 */
export type ComboboxCollectionState = {};

export namespace ComboboxCollectionProps {
  export type Render = {};

  export type SuruUI = {};

  export type BaseUI<TItem = any> = Override<
    Pick<
      React.ComponentProps<typeof Combobox.Collection>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // ComboboxCollectionProps:
        "children",
        keyof Render | keyof SuruUI
      >
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
 */
export type ComboboxCollectionProps<TItem = any> = ComboboxCollectionProps.Render &
  ComboboxCollectionProps.SuruUI &
  ComboboxCollectionProps.BaseUI<TItem> &
  ComboboxCollectionProps.HTML;

interface IComboboxCollection extends IComponent<ComboboxCollectionProps> {
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
      case isItemGroup<ComboboxRootItemGroup>(item): {
        const { label, ...otherProps } = item;

        return (
          <ComboboxGroup {...otherProps} key={index}>
            {isLikelyVisibleNode(label) && <ComboboxGroupLabel>{label}</ComboboxGroupLabel>}
            <ComboboxCollection>{defaultItemRenderer}</ComboboxCollection>
          </ComboboxGroup>
        );
      }

      case isLabeledItem<ComboboxRootItemLabeledValue>(item): {
        const { label, ...otherProps } = item;

        return (
          <ComboboxItem {...otherProps} key={index}>
            {label}
            <ComboboxItemIndicator />
          </ComboboxItem>
        );
      }

      case isPrimitiveItem(item):
      case !isReactNode(item):
        return (
          <ComboboxItem key={index} value={item}>
            {ctx.itemToStringLabel(item)}
            <ComboboxItemIndicator />
          </ComboboxItem>
        );

      default:
        return <React.Fragment key={index}>{item}</React.Fragment>;
    }
  };

  const { children = defaultItemRenderer } = props;

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

  export interface IItemRenderer<TItem = any> extends IComboboxCollectionItemRenderer<TItem> {}
}
