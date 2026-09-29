import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link StatValue} が持つ状態です。
 */
export type StatValueState = {};

export namespace StatValueProps {
  export type Render = RenderProps<StatValueState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"dd", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link StatValue} に渡す props です。
 */
export type StatValueProps = StatValueProps.Render &
  StatValueProps.SuruUI &
  StatValueProps.BaseUI &
  StatValueProps.HTML;

export type IStatValue = IComponent<StatValueProps>;

/**
 * 統計の値を表すコンポーネントです。
 *
 * `dd` 要素を描画します。
 */
export const StatValue: IStatValue = function SuiStatValue(props) {
  return useRender({
    props: [
      props,
      {
        className: "sui_stat_value",
      },
    ],
    defaultTagName: "dd",
  });
};

export { StatValue as Value };

export namespace Value {
  export type State = StatValueState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = StatValueProps.Render;

    export type SuruUI = StatValueProps.SuruUI;

    export type BaseUI = StatValueProps.BaseUI;

    export type HTML = StatValueProps.HTML;
  }
}
