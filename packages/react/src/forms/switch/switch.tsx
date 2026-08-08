import type { Component } from "../../types.js";
import * as SwitchParts from "./switch.parts.jsx";

/**
 * {@link Switch} コンポーネントのプロパティーです。
 *
 * `checked` が指定されている場合は `defaultChecked` より優先され、状態の変更は `onCheckedChange` に通知されます。
 */
export type SwitchProps = SwitchParts.Root.Props & {
  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 指定したプロパティーは対応するパーツへそのまま渡され、パーツ側の既定値より優先されます。
   * {@link SwitchSlotProps} を参照してください。
   */
  slotProps?: SwitchSlotProps | undefined;
};

/**
 * {@link Switch} の各パーツに渡すプロパティーです。
 */
export type SwitchSlotProps = {
  /**
   * {@link SwitchParts.Thumb} に渡すプロパティーです。
   */
  readonly thumb?: SwitchParts.Thumb.Props | undefined;
};

/**
 * スイッチを表示するコンポーネントです。
 *
 * {@link SwitchParts.Thumb} はチェック状態を表示するために常に生成されます。
 * `defaultChecked` は初期状態だけを指定し、`checked` を指定すると制御された状態になります。
 * `disabled` のときはユーザー操作による状態変更が無効になります。
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
  const { slotProps, ...rootProps } = props;
  const thumbProps = slotProps?.thumb;

  return (
    <SwitchParts.Root {...rootProps}>
      <SwitchParts.Thumb {...thumbProps} />
    </SwitchParts.Root>
  );
};
