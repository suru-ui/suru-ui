import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import type { IComboboxCollectionItemRenderer } from "./combobox.collection.jsx";

export type IComboboxListItemRenderer<TItem = any> = IComboboxCollectionItemRenderer<TItem>;

/**
 * {@link ComboboxList} が持つ状態です。
 */
export type ComboboxListState = Combobox.List.State;

export namespace ComboboxListProps {
  export type Render = RenderProps<ComboboxListState>;

  export type SuruUI = {};

  export type BaseUI<TItem = any> = Override<
    Pick<
      React.ComponentProps<typeof Combobox.List>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // ComboboxListProps:
        "children",
        keyof Render | keyof SuruUI
      >
    >,
    // Base UI の型を強化します。
    {
      children?: React.ReactNode | IComboboxListItemRenderer<TItem>;
    }
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.List>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxList} に渡す props です。
 */
export type ComboboxListProps<TItem = any> = ComboboxListProps.Render &
  ComboboxListProps.SuruUI &
  ComboboxListProps.BaseUI<TItem> &
  ComboboxListProps.HTML;

export interface IComboboxList extends IComponent<ComboboxListProps> {
  <TItem = any>(props: ComboboxListProps<TItem>): IComponent.Return;
}

/**
 * 候補項目のリストを表示するコンテナー要素です。
 */
export const ComboboxList: IComboboxList = function SuiComboboxList(props: ComboboxListProps) {
  const { className, ...otherProps } = props;

  return <Combobox.List {...otherProps} className={cn(className, "sui_combobox_list")} />;
};

export { ComboboxList as List };

export namespace List {
  export type State = ComboboxListState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI & Props.BaseUI<TItem> & Props.HTML;

  export namespace Props {
    export type Render = ComboboxListProps.Render;

    export type SuruUI = ComboboxListProps.SuruUI;

    export type BaseUI<TItem = any> = ComboboxListProps.BaseUI<TItem>;

    export type HTML = ComboboxListProps.HTML;
  }

  export type IItemRenderer<TItem = any> = IComboboxListItemRenderer<TItem>;
}
