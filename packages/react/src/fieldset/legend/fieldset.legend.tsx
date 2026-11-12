import { Fieldset } from "@base-ui/react/fieldset";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link FieldsetLegend} が持つ状態です。
 */
export type FieldsetLegendState = Fieldset.Legend.State;

export namespace FieldsetLegendProps {
  export type Render = RenderProps<FieldsetLegendState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Fieldset.Legend>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // FieldsetLegendProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Fieldset.Legend>,
    keyof Render | keyof SuruUI
  >;
}

/**
 * {@link FieldsetLegend} に渡す props です。
 */
export type FieldsetLegendProps = FieldsetLegendProps.Render &
  FieldsetLegendProps.SuruUI &
  FieldsetLegendProps.BaseUI &
  FieldsetLegendProps.HTML;

export type IFieldsetLegend = IComponent<FieldsetLegendProps>;

/**
 * フィールドセットの凡例コンポーネントです。
 *
 * グループの見出しを表示し、グループと自動的に関連付けられます。
 */
export const FieldsetLegend: IFieldsetLegend = (props) => {
  const { className, ...otherProps } = props;

  return (
    <Fieldset.Legend
      {...otherProps}
      className={cn<FieldsetLegendState>(
        className,
        "sui_fieldset_legend",
        (state) => state.disabled && "sui_fieldset_legend-disabled",
      )}
    />
  );
};

export { FieldsetLegend as Legend };
export namespace Legend {
  export type State = FieldsetLegendState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FieldsetLegendProps.Render;

    export type SuruUI = FieldsetLegendProps.SuruUI;

    export type BaseUI = FieldsetLegendProps.BaseUI;

    export type HTML = FieldsetLegendProps.HTML;
  }
}
