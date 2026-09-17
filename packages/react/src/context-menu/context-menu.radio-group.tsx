import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { CheckIcon } from "../_icons.jsx";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { isRadioItem } from "./_context-menu.utils.jsx";
import { ContextMenuRadioItemIndicator } from "./context-menu.radio-item-indicator.jsx";
import { ContextMenuRadioItem } from "./context-menu.radio-item.jsx";

/**
 * {@link ContextMenuRadioGroup} の選択状態を変更されるイベントの詳細です。
 */
export type ContextMenuRadioGroupChangeEventDetails = ContextMenu.RadioGroup.ChangeEventDetails;

/**
 * {@link ContextMenuRadioGroup} の選択状態が変更される理由です。
 */
export type ContextMenuRadioGroupChangeEventReason = ContextMenu.RadioGroup.ChangeEventReason;

/**
 * ラジオ項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IContextMenuRadioGroupItemRenderer<TItem = any> {
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
 * {@link ContextMenuRadioGroup} が持つ状態です。
 */
export type ContextMenuRadioGroupState = ContextMenu.RadioGroup.State;

export namespace ContextMenuRadioGroupProps {
  export type Render = RenderProps<ContextMenuRadioGroupState>;

  export type SuruUI<TItem = any> = {
    /**
     * ポップアップの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link ContextMenuRadioGroupProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IContextMenuRadioGroupItemRenderer<TItem>;

    /**
     * ラジオ項目です。
     */
    items?: readonly TItem[] | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.RadioGroup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuRadioGroupProps:
      "value" | "defaultValue" | "onValueChange" | "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.RadioGroup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuRadioGroup} に渡す props です。
 */
export type ContextMenuRadioGroupProps<TItem = any> = ContextMenuRadioGroupProps.Render &
  ContextMenuRadioGroupProps.SuruUI<TItem> &
  ContextMenuRadioGroupProps.BaseUI &
  ContextMenuRadioGroupProps.HTML;

interface IContextMenuRadioGroup extends IComponent<ContextMenuRadioGroupProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: ContextMenuRadioGroupProps<TItem>): IComponent.Return;
}

/**
 * ラジオ項目をまとめるグループ要素です。
 */
export const ContextMenuRadioGroup: IContextMenuRadioGroup = function SuiContextMenuRadioGroup(
  props: ContextMenuRadioGroupProps,
) {
  const { items, children = defaultItemRenderer, className, ...otherProps } = props;

  return (
    <ContextMenu.RadioGroup
      {...otherProps}
      className={cn(
        className,
        "sui_context_menu_radio_group",
        (state) => state.disabled && "sui_context_menu_radio_group-disabled",
      )}
    >
      {typeof children === "function" ? items?.map(children) : children}
    </ContextMenu.RadioGroup>
  );
};

export { ContextMenuRadioGroup as RadioGroup };

export namespace RadioGroup {
  export type State = ContextMenuRadioGroupState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuRadioGroupProps.Render;

    export type SuruUI<TItem = any> = ContextMenuRadioGroupProps.SuruUI<TItem>;

    export type BaseUI = ContextMenuRadioGroupProps.BaseUI;

    export type HTML = ContextMenuRadioGroupProps.HTML;
  }

  export type ChangeEventDetails = ContextMenuRadioGroupChangeEventDetails;

  export type ChangeEventReason = ContextMenuRadioGroupChangeEventReason;

  export interface IItemRenderer<TItem = any> extends IContextMenuRadioGroupItemRenderer<TItem> {}
}

const defaultItemRenderer: IContextMenuRadioGroupItemRenderer = (item, index) => {
  switch (true) {
    case isRadioItem(item): {
      const { label, ...props } = item;

      return (
        <ContextMenuRadioItem {...props} key={index}>
          {label}
          <ContextMenuRadioItemIndicator>
            <CheckIcon />
          </ContextMenuRadioItemIndicator>
        </ContextMenuRadioItem>
      );
    }

    default:
      return item;
  }
};
