import type { Component } from "../../types.js";
import * as SwitchParts from "./switch.parts.jsx";

/**
 * {@link Switch} コンポーネントのプロパティーです。
 */
export type SwitchProps = SwitchParts.Root.Props & {
  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?:
    | {
        readonly thumb?: SwitchParts.Thumb.Props | undefined;
      }
    | undefined;
};

/**
 * スイッチを表示するコンポーネントです。
 *
 * @example 基本
 * ```tsx
 * <Switch defaultChecked />
 * ```
 *
 * @example ラベル付き
 * ```tsx
 * <label>
 *   <Switch color="blue" />
 *   通知を受け取る
 * </label>
 * ```
 */
export const Switch: Component<SwitchProps> = function SuiSwitch(props) {
  const { slotProps: { thumb: thumbProps } = {}, ...rootProps } = props;

  return (
    <SwitchParts.Root {...rootProps}>
      <SwitchParts.Thumb {...thumbProps} />
    </SwitchParts.Root>
  );
};
