import { Fieldset } from "@base-ui/react/fieldset";
import * as React from "react";

import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./fieldset.css";

// Root
// ----

/**
 * {@link FieldsetRoot} が持つ状態です。
 */
export type FieldsetRootState = Fieldset.Root.State;

/**
 * {@link FieldsetRoot} に渡す props です。
 */
export type FieldsetRootProps = React.ComponentProps<typeof Fieldset.Root>;

/**
 * フィールドセットのルートコンポーネントです。
 *
 * 関連するコントロールを凡例とともにグループ化します。
 */
export const FieldsetRoot: IComponent<FieldsetRootProps> = function SuiFieldsetRoot(props) {
  const {
    // @ts-expect-error
    "data-scope": dataScope = "",
    className,
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
  /**
   * {@link FieldsetRootState}
   */
  export type State = FieldsetRootState;

  /**
   * {@link FieldsetRootProps}
   */
  export type Props = FieldsetRootProps;
}

// Legend
// ------

/**
 * {@link FieldsetLegend} が持つ状態です。
 */
export type FieldsetLegendState = Fieldset.Legend.State;

/**
 * {@link FieldsetLegend} に渡す props です。
 */
export type FieldsetLegendProps = React.ComponentProps<typeof Fieldset.Legend>;

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
  /**
   * {@link FieldsetLegendState}
   */
  export type State = FieldsetLegendState;

  /**
   * {@link FieldsetLegendProps}
   */
  export type Props = FieldsetLegendProps;
}
