import type { Component } from "../../types.js";
import * as CheckboxParts from "./checkbox.parts.jsx";

/**
 * {@link Checkbox} コンポーネントのプロパティーです。
 *
 * スタイルに関するプロパティーは、{@link CheckboxGroup} 内ではグループの指定が優先されます。
 * 指定後に値を変更すると、チェックボックスのスタイルも更新されます。
 */
export type CheckboxProps = CheckboxParts.Root.Props & {
  /**
   * Indicator 内に表示するコンテンツ（チェックアイコンなど）です。
   *
   * 未指定の場合、子要素の `Indicator` は生成されません。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * `indicator` を指定した場合、子要素がなくても {@link CheckboxParts.Indicator} を生成します。
   */
  slotProps?:
    | {
        readonly indicator?: CheckboxParts.Indicator.Props | undefined;
      }
    | undefined;
};

/**
 * チェックボックスを表示するコンポーネントです。
 *
 * @example 基本
 * ```tsx
 * <Checkbox>
 *   <CheckIcon />
 * </Checkbox>
 * ```
 *
 * @example ラベル付き
 * ```tsx
 * <label>
 *   <Checkbox variant="liquid" color="blue">
 *     <CheckIcon />
 *   </Checkbox>
 *   同意する
 * </label>
 * ```
 */
export const Checkbox: Component<CheckboxProps> = function SuiCheckbox(props) {
  const { children, slotProps, ...rootProps } = props;
  const indicatorProps = slotProps?.indicator;

  return (
    <CheckboxParts.Root {...rootProps}>
      {children !== undefined || indicatorProps !== undefined ? (
        <CheckboxParts.Indicator {...indicatorProps}>{children}</CheckboxParts.Indicator>
      ) : null}
    </CheckboxParts.Root>
  );
};
