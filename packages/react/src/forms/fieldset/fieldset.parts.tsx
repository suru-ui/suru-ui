import { Fieldset } from "@base-ui/react/fieldset";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./fieldset.css";

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type FieldsetRootState = Fieldset.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type FieldsetRootProps = React.ComponentProps<typeof Fieldset.Root>;

/**
 * フィールドセットのルート要素です。
 *
 * 共通の凡例と関連するコントロールをグループ化します。
 * `disabled` を指定すると、グループ内のコントロールも無効になります。
 *
 * @example
 * ```tsx
 * <FieldsetParts.Root disabled>
 *   <FieldsetParts.Legend>お支払い情報</FieldsetParts.Legend>
 * </FieldsetParts.Root>
 * ```
 */
export const FieldsetRoot: Component<FieldsetRootProps> = function SuiFieldsetRoot(props) {
  const { className, ...otherProps } = props;

  return (
    <Fieldset.Root
      {...otherProps}
      className={cn(className, (state) => state.disabled && "sui_fieldset-disabled")}
    />
  );
};

export namespace Root {
  export type State = FieldsetRootState;
  export type Props = FieldsetRootProps;
}

export const Root: Component<Root.Props> = FieldsetRoot;

// Legend
// ------

/**
 * {@link Legend} の状態です。
 */
export type FieldsetLegendState = Fieldset.Legend.State;

/**
 * {@link Legend} に渡すプロパティーです。
 */
export type FieldsetLegendProps = React.ComponentProps<typeof Fieldset.Legend>;

/**
 * フィールドセットの凡例要素です。
 *
 * フィールドセットの説明ラベルを表示し、グループと自動的に関連付けられます。
 *
 * @example
 * ```tsx
 * <FieldsetParts.Legend>配送先情報</FieldsetParts.Legend>
 * ```
 */
export const FieldsetLegend: Component<FieldsetLegendProps> = function SuiFieldsetLegend(props) {
  const { className, ...otherProps } = props;

  return (
    <Fieldset.Legend
      {...otherProps}
      className={cn(className, (state) => state.disabled && "sui_fieldset_legend-disabled")}
    />
  );
};

export namespace Legend {
  export type State = FieldsetLegendState;
  export type Props = FieldsetLegendProps;
}

export const Legend: Component<Legend.Props> = FieldsetLegend;
