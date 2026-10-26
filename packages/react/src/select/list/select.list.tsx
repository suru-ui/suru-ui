import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { CheckIcon } from "../../_icons.jsx";
import isLikelyVisibleNode from "../../_is-likely-visible-node.js";
import { getItemKey } from "../../_item.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import toReactNode from "../../_to-react-node.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { isItemObjectGroup, isLabeledItemObject } from "../_select.jsx";
import { SelectGroupLabel } from "../group-label/select.group-label.jsx";
import { SelectGroup } from "../group/select.group.jsx";
import { SelectItemIndicator } from "../item-indicator/select.item-indicator.jsx";
import { SelectItemText } from "../item-text/select.item-text.jsx";
import { SelectItem } from "../item/select.item.jsx";
import { useSelectPopupContext } from "../popup/select.popup.context.js";
import type {
  SelectRootItems,
  SelectRootItemObjectGroup,
  SelectRootLabeledItemObject,
} from "../root/select.root.jsx";
import { SelectSeparator } from "../separator/select.separator.jsx";
import { SelectListContext } from "./select.list.context.js";

/**
 * ラベルと値を持つ、リストの項目です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectListLabeledItemObject<TValue = any> = SelectRootLabeledItemObject<TValue>;

/**
 * ラベルと値を持つ項目をまとめる、リストのグループです。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectListItemObjectGroup<TValue = any> = Override<
  SelectRootItemObjectGroup<TValue>,
  {
    readonly items: readonly SelectListLabeledItemObject<TValue>[];
  }
>;

/**
 * リストに表示する項目です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectListItemObject<TValue = any> =
  | SelectListLabeledItemObject<TValue>
  | SelectListItemObjectGroup<TValue>;

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
    item: SelectListItemObject<TValue>,
    index: number,
    items: readonly SelectListItemObject<TValue>[],
  ): React.ReactNode;
}

/**
 * {@link SelectList} が持つ状態です。
 */
export type SelectListState<TValue = any> = SelectListContext<TValue>;

export namespace SelectListProps {
  export type Render<TValue = any> = RenderProps<SelectListState<TValue>>;

  export type SuruUI = {};

  export type BaseUI<TValue = any> = Override<
    Omit<
      Pick<
        React.ComponentProps<typeof BaseSelect.List>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // SelectListProps より:
        "children"
      >,
      keyof Render | keyof SuruUI
    >,
    // Base UI の型を強化します。
    {
      children?: React.ReactNode | ISelectListItemRenderer<TValue> | undefined;
    }
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
export type SelectListProps<TValue = any> = SelectListProps.Render<TValue> &
  SelectListProps.SuruUI &
  SelectListProps.BaseUI<TValue> &
  SelectListProps.HTML;

export interface ISelectList extends IComponent<SelectListProps> {
  /**
   * @template TValue 項目の値の型です。
   */
  <TValue = any>(props: SelectListProps<TValue>): IComponent.Return;
}

/**
 * 選択項目を列挙するリスト要素です。
 *
 * {@link SelectRoot} の `items` を読み取り、関数子を受け取った場合は各項目に適用します。
 */
export const SelectList: ISelectList = function SuiSelectList(props: SelectListProps) {
  const ctx = useSelectPopupContext();
  const { style, render, children = defaultListItemRenderer, className, ...otherProps } = props;

  return (
    <BaseSelect.List
      {...otherProps}
      {...proxyRenderProps<BaseSelect.List.State, SelectListState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectListContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SelectListContext>
          ),
          className: cn<SelectListState>(
            className,
            "sui_select_list",
            (state) => `sui_select_list-size_${state.size}`,
            (state) => `sui_select_list-radius_${state.radius}`,
            (state) => `sui_select_list-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_list-outlined",
            (state) => state.open && "sui_select_list-open",
            (state) => state.anchorHidden && "sui_select_list-anchor_hidden",
            (state) => `sui_select_list-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_select_list-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_select_list-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    >
      {typeof children === "function" ? renderListItems(ctx.items ?? [], children) : children}
    </BaseSelect.List>
  );
};

/**
 * {@link SelectRoot} の `items` を正規化し、各項目へレンダラーを適用します。
 */
function renderListItems(
  items: SelectRootItems,
  renderer: ISelectListItemRenderer,
): React.ReactNode {
  if (Array.isArray(items)) {
    return items
      .map((item): SelectListItemObject => {
        if (isLabeledItemObject(item)) {
          return item;
        }

        if (isItemObjectGroup(item)) {
          if (Array.isArray(item.items)) {
            return {
              ...item,
              items: item.items.map((item) => {
                if (isLabeledItemObject(item)) {
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
      .map(renderer);
  }

  return Object.entries(items)
    .map(([value, label]): SelectListLabeledItemObject => ({ label, value }))
    .map(renderer);
}

/**
 * 項目とグループを既定の見た目で描画するレンダラーです。
 */
const defaultListItemRenderer: ISelectListItemRenderer = (item, index, items) => {
  if ("items" in item) {
    const { items: groupItems, label, ...otherGroupProps } = item;

    return (
      <React.Fragment key={getItemKey(item) ?? index}>
        <SelectGroup {...otherGroupProps}>
          {isLikelyVisibleNode(label) && <SelectGroupLabel>{label}</SelectGroupLabel>}
          {groupItems.map(defaultListItemRenderer)}
        </SelectGroup>
        {index < items.length - 1 && <SelectSeparator />}
      </React.Fragment>
    );
  }

  const { label, value, ...otherItemProps } = item;

  return (
    <SelectItem {...otherItemProps} key={getItemKey(item) ?? index} value={value}>
      <SelectItemText>{toReactNode(label, String(value))}</SelectItemText>
      <SelectItemIndicator>
        <CheckIcon />
      </SelectItemIndicator>
    </SelectItem>
  );
};

export { SelectList as List };

export namespace List {
  export type State<TValue = any> = SelectListState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> &
    Props.SuruUI &
    Props.BaseUI<TValue> &
    Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectListProps.Render<TValue>;

    export type SuruUI = SelectListProps.SuruUI;

    export type BaseUI<TValue = any> = SelectListProps.BaseUI<TValue>;

    export type HTML = SelectListProps.HTML;
  }

  export type IItemRenderer<TValue = any> = ISelectListItemRenderer<TValue>;

  export type ItemObjectGroup<TValue = any> = SelectListItemObjectGroup<TValue>;
}
