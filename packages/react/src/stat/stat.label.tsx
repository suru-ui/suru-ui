import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link StatLabel} が持つ状態です。
 */
export type StatLabelState = {};

export namespace StatLabelProps {
  export type Render = RenderProps<StatLabelState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"dt", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link StatLabel} に渡す props です。
 */
export type StatLabelProps = StatLabelProps.Render &
  StatLabelProps.SuruUI &
  StatLabelProps.BaseUI &
  StatLabelProps.HTML;

/**
 * 統計のラベルを表すコンポーネントです。
 *
 * `dt` 要素を描画します。
 */
export const StatLabel: IComponent<StatLabelProps> = function SuiStatLabel(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_stat_label",
      },
    ],
    defaultTagName: "dt",
  });
};

export { StatLabel as Label };

export namespace Label {
  export type State = StatLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = StatLabelProps.Render;

    export type SuruUI = StatLabelProps.SuruUI;

    export type BaseUI = StatLabelProps.BaseUI;

    export type HTML = StatLabelProps.HTML;
  }
}
