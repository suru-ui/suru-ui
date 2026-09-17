import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxCollection} が持つ状態です。
 */
export type ComboboxCollectionState = Combobox.Collection.State;

export namespace ComboboxCollectionProps {
  export type Render = RenderProps<ComboboxCollectionState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Collection>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxCollectionProps:
      "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Collection>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxCollection} に渡す props です。
 */
export type ComboboxCollectionProps = ComboboxCollectionProps.Render &
  ComboboxCollectionProps.SuruUI &
  ComboboxCollectionProps.BaseUI &
  ComboboxCollectionProps.HTML;

/**
 * フィルタリングされた項目を列挙する要素です。
 *
 * これ自身は HTML 要素をレンダリングしません。
 */
export const ComboboxCollection: IComponent<ComboboxCollectionProps> =
  function SuiComboboxCollection(props) {
    return <Combobox.Collection {...props} />;
  };

export { ComboboxCollection as Collection };

export namespace Collection {
  export type State = ComboboxCollectionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxCollectionProps.Render;

    export type SuruUI = ComboboxCollectionProps.SuruUI;

    export type BaseUI = ComboboxCollectionProps.BaseUI;

    export type HTML = ComboboxCollectionProps.HTML;
  }
}
