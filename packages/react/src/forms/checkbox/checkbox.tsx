import type { Component } from "../../types.js";
import * as CheckboxParts from "./checkbox.parts.jsx";

/**
 * {@link Checkbox} コンポーネントのプロパティーです。
 */
export type CheckboxProps = CheckboxParts.Root.Props & {
  /**
   * Indicator 内に表示するコンテンツ（チェックアイコンなど）です。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
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
  const { children, slotProps: { indicator: indicatorProps } = {}, ...rootProps } = props;

  return (
    <CheckboxParts.Root {...rootProps}>
      <CheckboxParts.Indicator {...indicatorProps}>{children}</CheckboxParts.Indicator>
    </CheckboxParts.Root>
  );
};
