import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useStatContext } from "../root/stat.root.context.js";
import type { StatRootState } from "../root/stat.root.jsx";

/**
 * {@link StatValueUnit} が持つ状態です。
 */
export type StatValueUnitState = StatRootState;

export namespace StatValueUnitProps {
  export type Render = RenderProps<StatValueUnitState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<BaseUIComponentProps<"span", never, never>, keyof Render | keyof SuruUI>;
}

/**
 * {@link StatValueUnit} に渡す props です。
 */
export type StatValueUnitProps = StatValueUnitProps.Render &
  StatValueUnitProps.SuruUI &
  StatValueUnitProps.BaseUI &
  StatValueUnitProps.HTML;

export type IStatValueUnit = IComponent<StatValueUnitProps>;

/**
 * 統計の値の単位を表すコンポーネントです。
 *
 * `span` 要素を描画し、{@link StatValue} の子として使用します。
 */
export const StatValueUnit: IStatValueUnit = (props) => {
  const ctx = useStatContext();

  return useRender({
    props: [
      props,
      {
        className: cn<StatValueUnitState>(
          "sui_stat_value_unit",
          (state) => `sui_stat_value_unit-size_${state.size}`,
        ),
      },
    ],
    state: ctx,
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
