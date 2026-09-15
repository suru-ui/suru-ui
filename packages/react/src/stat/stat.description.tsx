import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link StatDescription} が持つ状態です。
 */
export type StatDescriptionState = {};

export namespace StatDescriptionProps {
  export type Render = RenderProps<StatDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"dd", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link StatDescription} に渡す props です。
 */
export type StatDescriptionProps = StatDescriptionProps.Render &
  StatDescriptionProps.SuruUI &
  StatDescriptionProps.BaseUI &
  StatDescriptionProps.HTML;

/**
 * 統計の補足説明を表すコンポーネントです。
 *
 * `dd` 要素を描画します。
 */
export const StatDescription: IComponent<StatDescriptionProps> = function SuiStatDescription(
  props,
) {
  return useRender({
    props: [
      props,
      {
        className: "sui_stat_description",
      },
    ],
    defaultTagName: "dd",
  });
};

export { StatDescription as Description };

export namespace Description {
  export type State = StatDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = StatDescriptionProps.Render;

    export type SuruUI = StatDescriptionProps.SuruUI;

    export type BaseUI = StatDescriptionProps.BaseUI;

    export type HTML = StatDescriptionProps.HTML;
  }
}
