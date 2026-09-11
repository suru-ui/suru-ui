import { Fieldset } from "@base-ui/react/fieldset";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./fieldset.css";

// Root
// ----

/**
 * {@link FieldsetRoot} が持つ状態です。
 */
export type FieldsetRootState = Fieldset.Root.State;

export namespace FieldsetRootProps {
  export type Render = RenderProps<FieldsetRootState>;

  export type SuruUI = {};

  export type BaseUI = Omit<React.ComponentProps<typeof Fieldset.Root>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"fieldset">,
    keyof Render | keyof React.ComponentProps<typeof Fieldset.Root>
  >;
}

/**
 * {@link FieldsetRoot} に渡す props です。
 */
export type FieldsetRootProps = FieldsetRootProps.Render &
  FieldsetRootProps.SuruUI &
  FieldsetRootProps.BaseUI &
  FieldsetRootProps.HTML;

/**
 * フィールドセットのルートコンポーネントです。
 *
 * 関連するコントロールを凡例とともにグループ化します。
 */
export const FieldsetRoot: IComponent<FieldsetRootProps> = function SuiFieldsetRoot(props) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Fieldset.Root
      {...otherProps}
      className={cn(
        className,
        "sui_fieldset",
        (state) => state.disabled && "sui_fieldset-disabled",
      )}
      data-scope={dataScope}
    />
  );
};

export { FieldsetRoot as Root };

export namespace Root {
  export type State = FieldsetRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FieldsetRootProps.Render;

    export type SuruUI = FieldsetRootProps.SuruUI;

    export type BaseUI = FieldsetRootProps.BaseUI;

    export type HTML = FieldsetRootProps.HTML;
  }
}

// Legend
// ------

/**
 * {@link FieldsetLegend} が持つ状態です。
 */
export type FieldsetLegendState = Fieldset.Legend.State;

export namespace FieldsetLegendProps {
  export type Render = RenderProps<FieldsetLegendState>;

  export type SuruUI = {};

  export type BaseUI = Omit<React.ComponentProps<typeof Fieldset.Legend>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"legend">,
    keyof Render | keyof React.ComponentProps<typeof Fieldset.Legend>
  >;
}

/**
 * {@link FieldsetLegend} に渡す props です。
 */
export type FieldsetLegendProps = FieldsetLegendProps.Render &
  FieldsetLegendProps.SuruUI &
  FieldsetLegendProps.BaseUI &
  FieldsetLegendProps.HTML;

/**
 * フィールドセットの凡例コンポーネントです。
 *
 * グループの見出しを表示し、グループと自動的に関連付けられます。
 */
export const FieldsetLegend: IComponent<FieldsetLegendProps> = function SuiFieldsetLegend(props) {
  const { className, ...otherProps } = props;

  return <Fieldset.Legend {...otherProps} className={cn(className, "sui_fieldset_legend")} />;
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
