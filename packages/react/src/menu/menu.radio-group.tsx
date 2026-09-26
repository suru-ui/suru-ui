import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { CheckIcon } from "../_icons.jsx";
import { getItemKey } from "../_item.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { isRadioItemObject } from "./_menu.utils.jsx";
import { MenuRadioItemIndicator } from "./menu.radio-item-indicator.jsx";
import { MenuRadioItem } from "./menu.radio-item.jsx";

/**
 * {@link MenuRadioGroup} の選択状態を変更されるイベントの詳細です。
 */
export type MenuRadioGroupChangeEventDetails = Menu.RadioGroup.ChangeEventDetails;

/**
 * {@link MenuRadioGroup} の選択状態が変更される理由です。
 */
export type MenuRadioGroupChangeEventReason = Menu.RadioGroup.ChangeEventReason;

/**
 * ラジオ項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IMenuRadioGroupItemRenderer<TItem = any> {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   * @returns レンダリングする内容です。
   */
  (item: TItem, index: number, items: readonly TItem[]): React.ReactNode;
}

/**
 * {@link MenuRadioGroup} が持つ状態です。
 */
export type MenuRadioGroupState = Menu.RadioGroup.State;

export namespace MenuRadioGroupProps {
  export type Render = RenderProps<MenuRadioGroupState>;

  export type SuruUI<TItem = any> = {
    /**
     * グループの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link MenuRadioGroupProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IMenuRadioGroupItemRenderer<TItem>;

    /**
     * ラジオ項目です。
     */
    items?: readonly TItem[] | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.RadioGroup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuRadioGroupProps:
      "value" | "defaultValue" | "onValueChange" | "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.RadioGroup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuRadioGroup} に渡す props です。
 */
export type MenuRadioGroupProps<TItem = any> = MenuRadioGroupProps.Render &
  MenuRadioGroupProps.SuruUI<TItem> &
  MenuRadioGroupProps.BaseUI &
  MenuRadioGroupProps.HTML;

interface IMenuRadioGroup extends IComponent<MenuRadioGroupProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: MenuRadioGroupProps<TItem>): IComponent.Return;
}

/**
 * ラジオ項目をまとめるグループ要素です。
 */
export const MenuRadioGroup: IMenuRadioGroup = function SuiMenuRadioGroup(
  props: MenuRadioGroupProps,
) {
  const { items, children = defaultItemRenderer, className, ...otherProps } = props;

  return (
    <Menu.RadioGroup
      {...otherProps}
      className={cn(
        className,
        "sui_menu_radio_group",
        (state) => state.disabled && "sui_menu_radio_group-disabled",
      )}
    >
      {typeof children === "function" ? items?.map(children) : children}
    </Menu.RadioGroup>
  );
};

export { MenuRadioGroup as RadioGroup };

export namespace RadioGroup {
  export type State = MenuRadioGroupState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuRadioGroupProps.Render;

    export type SuruUI<TItem = any> = MenuRadioGroupProps.SuruUI<TItem>;

    export type BaseUI = MenuRadioGroupProps.BaseUI;

    export type HTML = MenuRadioGroupProps.HTML;
  }

  export type ChangeEventDetails = MenuRadioGroupChangeEventDetails;

  export type ChangeEventReason = MenuRadioGroupChangeEventReason;

  export interface IItemRenderer<TItem = any> extends IMenuRadioGroupItemRenderer<TItem> {}
}

const defaultItemRenderer: IMenuRadioGroupItemRenderer = (item, index) => {
  switch (true) {
    case isRadioItemObject(item): {
      const { type: _, label, ...props } = item;

      return (
        <MenuRadioItem {...props} key={getItemKey(item) ?? index}>
          {label}
          <MenuRadioItemIndicator>
            <CheckIcon />
          </MenuRadioItemIndicator>
        </MenuRadioItem>
      );
    }

    default:
      return item;
  }
};
