import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link StatValueUnit} が持つ状態です。
 */
export type StatValueUnitState = {};

export namespace StatValueUnitProps {
  export type Render = RenderProps<StatValueUnitState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link StatValueUnit} に渡す props です。
 */
export type StatValueUnitProps = StatValueUnitProps.Render &
  StatValueUnitProps.SuruUI &
  StatValueUnitProps.BaseUI &
  StatValueUnitProps.HTML;

/**
 * 統計の値の単位を表すコンポーネントです。
 *
 * `span` 要素を描画し、{@link StatValue} の子として使用します。
 */
export const StatValueUnit: IComponent<StatValueUnitProps> = function SuiStatValueUnit(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_stat_value_unit",
      },
    ],
    defaultTagName: "span",
  });
};

export { StatValueUnit as ValueUnit };

export namespace ValueUnit {
  export type State = StatValueUnitState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = StatValueUnitProps.Render;

    export type SuruUI = StatValueUnitProps.SuruUI;

    export type BaseUI = StatValueUnitProps.BaseUI;

    export type HTML = StatValueUnitProps.HTML;
  }
}
