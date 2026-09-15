import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxList} が持つ状態です。
 */
export type ComboboxListState = Combobox.List.State;

export namespace ComboboxListProps {
  export type Render = RenderProps<ComboboxListState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.List>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxListProps:
      "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.List>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxList} に渡す props です。
 */
export type ComboboxListProps = ComboboxListProps.Render &
  ComboboxListProps.SuruUI &
  ComboboxListProps.BaseUI &
  ComboboxListProps.HTML;

/**
 * 候補項目のリストを表示するコンテナー要素です。
 */
export const ComboboxList: IComponent<ComboboxListProps> = function SuiComboboxList(props) {
  const { className, ...otherProps } = props;

  return <Combobox.List {...otherProps} className={cn(className, "sui_combobox_list")} />;
};

export { ComboboxList as List };

/**
 * {@link ComboboxList} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace List {
  export type State = ComboboxListState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxListProps.Render;

    export type SuruUI = ComboboxListProps.SuruUI;

    export type BaseUI = ComboboxListProps.BaseUI;

    export type HTML = ComboboxListProps.HTML;
  }
}
