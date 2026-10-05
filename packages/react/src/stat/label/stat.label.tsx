import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useStatContext } from "../root/stat.root.context.js";
import type { StatRootState } from "../root/stat.root.jsx";

/**
 * {@link StatLabel} が持つ状態です。
 */
export type StatLabelState = StatRootState;

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

export type IStatLabel = IComponent<StatLabelProps>;

/**
 * 統計のラベルを表すコンポーネントです。
 *
 * `dt` 要素を描画します。
 */
export const StatLabel: IStatLabel = function SuiStatLabel(props) {
  const ctx = useStatContext();

  return useRender({
    props: [
      props,
      {
        className: cn<StatLabelState>(
          "sui_stat_label",
          (state) => `sui_stat_label-size_${state.size}`,
        ),
      },
    ],
    state: ctx,
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
