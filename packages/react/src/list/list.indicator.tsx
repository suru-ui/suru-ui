import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link ListItemIndicator} が持つ状態です。
 */
export type ListItemIndicatorState = {};

export namespace ListItemIndicatorProps {
  export type Render = RenderProps<ListItemIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ListItemIndicator} に渡す props です。
 */
export type ListItemIndicatorProps = ListItemIndicatorProps.Render &
  ListItemIndicatorProps.SuruUI &
  ListItemIndicatorProps.BaseUI &
  ListItemIndicatorProps.HTML;

/**
 * リストの項目の先頭に表示するマーカーやアイコンのコンテナーです。
 */
export const ListItemIndicator: IComponent<ListItemIndicatorProps> = function SuiListItemIndicator(
  props,
) {
  return useRender({
    props: [
      props,
      {
        className: "sui_list_item_indicator",
      },
    ],
    defaultTagName: "span",
  });
};

export { ListItemIndicator as Indicator };

export namespace Indicator {
  export type State = ListItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ListItemIndicatorProps.Render;

    export type SuruUI = ListItemIndicatorProps.SuruUI;

    export type BaseUI = ListItemIndicatorProps.BaseUI;

    export type HTML = ListItemIndicatorProps.HTML;
  }
}
