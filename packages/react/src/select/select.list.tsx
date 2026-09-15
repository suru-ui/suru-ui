import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { CheckIcon } from "../_icons.jsx";
import toReactNode from "../_to-react-node.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { isItemGroup, isLabeledItem } from "./_select.jsx";
import { useSelectContext } from "./select.context.js";
import { SelectGroupLabel } from "./select.group-label.jsx";
import { SelectGroup } from "./select.group.jsx";
import { SelectItemIndicator } from "./select.item-indicator.jsx";
import { SelectItemText } from "./select.item-text.jsx";
import { SelectItem } from "./select.item.jsx";
import {
  type SelectRootItems,
  type SelectRootItemGroup,
  type SelectRootLabeledItem,
} from "./select.root.jsx";
import { SelectSeparator } from "./select.separator.jsx";

/**
 * ラベルと値を持つ、リストの項目です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectListLabeledItem<TValue = any> = SelectRootLabeledItem<TValue>;

/**
 * ラベルと値を持つ項目をまとめる、リストのグループです。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectListItemGroup<TValue = any> = Override<
  SelectRootItemGroup<TValue>,
  {
    readonly items: readonly SelectListLabeledItem<TValue>[];
  }
>;

/**
 * リストに表示する項目です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectListItem<TValue = any> =
  | SelectListLabeledItem<TValue>
  | SelectListItemGroup<TValue>;

/**
 * リストの各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TValue 項目の値の型です。
 */
export interface ISelectListItemRenderer<TValue = any> {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   * @returns レンダリングする内容です。
   */
  (
    item: SelectListLabeledItem<TValue>,
    index: number,
    items: readonly SelectListLabeledItem<TValue>[],
  ): React.ReactNode;
  (
    item: SelectListItemGroup<TValue>,
    index: number,
    items: readonly SelectListItemGroup<TValue>[],
  ): React.ReactNode;
}

interface IAnySelectListItemRenderer {
  (item: SelectListItem, index: number, items: readonly SelectListItem[]): React.ReactNode;
}

/**
 * {@link SelectList} が持つ状態です。
 */
export type SelectListState = BaseSelect.List.State;

export namespace SelectListProps {
  export type Render = RenderProps<SelectListState>;

  export type SuruUI<TValue = any> = {
    /**
     * リストの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link SelectRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | ISelectListItemRenderer<TValue>;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.List>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectListProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.List>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectList} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectListProps<TValue = any> = SelectListProps.Render &
  SelectListProps.SuruUI<TValue> &
  SelectListProps.BaseUI &
  SelectListProps.HTML;

/**
 * 選択項目を列挙するリスト要素です。
 *
 * {@link SelectRoot} の `items` を読み取り、関数子を受け取った場合は各項目に適用します。
 */
export const SelectList: IComponent<SelectListProps> = function SuiSelectList(props) {
  const ctx = useSelectContext();
  const { children = defaultListItemRenderer, className, ...otherProps } = props;

  return (
    <BaseSelect.List {...otherProps} className={cn(className, "sui_select_list")}>
      {typeof children === "function" ? renderListItems(ctx.items ?? [], children) : children}
    </BaseSelect.List>
  );
};

function renderListItems(
  items: SelectRootItems,
  renderer: ISelectListItemRenderer,
): React.ReactNode {
  if (Array.isArray(items)) {
    return items
      .map((item): SelectListItem => {
        if (isLabeledItem(item)) {
          return item;
        }

        if (isItemGroup(item)) {
          if (Array.isArray(item.items)) {
            return {
              ...item,
              items: item.items.map((item) => {
                if (isLabeledItem(item)) {
                  return item;
                }

                return {
                  label: undefined,
                  value: item,
                };
              }),
            };
          } else {
            return {
              ...item,
              items: Object.entries(item.items).map(([value, label]) => ({
                label,
                value,
              })),
            };
          }
        }

        return {
          label: undefined,
          value: item,
        };
      })
      .map(renderer as IAnySelectListItemRenderer);
  }

  return Object.entries(items)
    .map(([value, label]): SelectListLabeledItem => ({ label, value }))
    .map(renderer);
}

const defaultListItemRenderer: ISelectListItemRenderer = (item, index, items) => {
  if ("items" in item) {
    const { items: groupItems, label, ...otherGroupProps } = item;
    const labelNode = toReactNode(label);

    return (
      <React.Fragment key={index}>
        <SelectGroup {...otherGroupProps}>
          {labelNode && <SelectGroupLabel>{labelNode}</SelectGroupLabel>}
          {groupItems.map(defaultListItemRenderer)}
        </SelectGroup>
        {index < items.length - 1 && <SelectSeparator />}
      </React.Fragment>
    );
  }

  const { label, value, ...otherItemProps } = item;

  return (
    <SelectItem {...otherItemProps} key={index} value={value}>
      <SelectItemText>{toReactNode(label, String(value))}</SelectItemText>
      <SelectItemIndicator>
        <CheckIcon />
      </SelectItemIndicator>
    </SelectItem>
  );
};

export { SelectList as List };

/**
 * {@link SelectList} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace List {
  export type State = SelectListState;

  export type Props<TValue = any> = Props.Render & Props.SuruUI<TValue> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectListProps.Render;

    export type SuruUI<TValue = any> = SelectListProps.SuruUI<TValue>;

    export type BaseUI = SelectListProps.BaseUI;

    export type HTML = SelectListProps.HTML;
  }

  export type ItemGroup<TValue = any> = SelectListItemGroup<TValue>;

  export interface IItemRenderer<TValue = any> extends ISelectListItemRenderer<TValue> {}
}
