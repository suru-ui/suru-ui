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
 *
 * {@link Fieldset.Root} のプロパティーをそのまま受け取ります。`disabled` の既定値は
 * `false` で、指定した値が子孫のコントロールを無効化します。`className` と `render` は
 * Base UI の状態依存値を含めて指定でき、指定した値が Suru UI の既定値より優先されます。
 * `disabled` が変化すると、フィールドセットと子孫の状態も更新されます。
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
      className={cn(className, "sui_fieldset", (state) => state.disabled && "sui_fieldset-disabled")}
    />
  );
};

/**
 * {@link FieldsetRoot} の状態型とプロパティー型をまとめた名前空間です。
 */
export namespace Root {
  /**
   * {@link FieldsetRoot} の状態型です。
   */
  export type State = FieldsetRootState;

  /**
   * {@link FieldsetRoot} のプロパティー型です。
   *
   * {@link FieldsetRootProps} と同じで、`disabled` は既定で `false` です。
   */
  export type Props = FieldsetRootProps;
}

/**
 * {@link FieldsetRoot} の別名です。
 */
export const Root: Component<Root.Props> = FieldsetRoot;

// Legend
// ------

/**
 * {@link Legend} の状態です。
 */
export type FieldsetLegendState = Fieldset.Legend.State;

/**
 * {@link Legend} に渡すプロパティーです。
 *
 * {@link Fieldset.Legend} のプロパティーをそのまま受け取ります。既定の表示は
 * Suru UI のスタイルが適用され、`className` と `render` を指定した場合はその値が
 * 既定の値より優先されます。親の {@link Root} が無効になると状態も無効になります。
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

/**
 * {@link FieldsetLegend} の状態型とプロパティー型をまとめた名前空間です。
 */
export namespace Legend {
  /**
   * {@link FieldsetLegend} の状態型です。
   */
  export type State = FieldsetLegendState;

  /**
   * {@link FieldsetLegend} のプロパティー型です。
   *
   * {@link FieldsetLegendProps} と同じ値を指定できます。
   */
  export type Props = FieldsetLegendProps;
}

/**
 * {@link FieldsetLegend} の別名です。
 */
export const Legend: Component<Legend.Props> = FieldsetLegend;
