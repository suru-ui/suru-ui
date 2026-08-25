import type { IComponent } from "../types.js";
import {
  type SwitchRootSize,
  type SwitchRootColor,
  type SwitchRootProps,
  type SwitchRootState,
  type SwitchRootRadius,
  type SwitchThumbProps,
  type SwitchRootVariant,
  SwitchRoot,
  SwitchThumb,
} from "./switch.parts.jsx";

/**
 * {@link SwitchRootColor} です。
 */
export type SwitchColor = SwitchRootColor;

/**
 * {@link SwitchRootRadius} です。
 */
export type SwitchRadius = SwitchRootRadius;

/**
 * {@link SwitchRootSize} です。
 */
export type SwitchSize = SwitchRootSize;

/**
 * {@link SwitchRootVariant} です。
 */
export type SwitchVariant = SwitchRootVariant;

/**
 * {@link Switch} の各パーツに渡すプロパティーです。
 */
export type SwitchSlotProps = {
  /**
   * {@link SwitchThumb} に渡すプロパティーです。
   */
  readonly thumb?: SwitchThumbProps | undefined;
};

/**
 * {@link Switch} の状態です。
 */
export type SwitchState = SwitchRootState;

/**
 * {@link Switch} コンポーネントのプロパティーです。
 *
 * `checked` が指定されている場合は `defaultChecked` より優先され、状態の変更は `onCheckedChange` に通知されます。
 */
export type SwitchProps = Omit<SwitchRootProps, "children"> & {
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
export type SwitchPartsProps = {
  /**
   * {@link SwitchRoot} に渡すプロパティーです。
   */
  readonly root: SwitchRootProps;

  /**
   * {@link SwitchThumb} に渡すプロパティーです。
   */
  readonly thumb: SwitchThumbProps | undefined;
};

/**
 * {@link Switch} の各パーツに渡すプロパティーを作るフックです。
 */
export function useSwitch(props: SwitchProps): SwitchPartsProps {
  const { slotProps, ...rootProps } = props;
  const thumbProps = slotProps?.thumb;

  return {
    root: rootProps,
    thumb: thumbProps,
  };
}

/**
 * スイッチを表示するコンポーネントです。
 *
 * {@link SwitchThumb} はチェック状態を表示するために常に生成されます。
 * `defaultChecked` は初期状態だけを指定し、`checked` を指定すると制御された状態になります。
 * `disabled` のときはユーザー操作による状態変更が無効になります。
 */
export const Switch: IComponent<SwitchProps> = function SuiSwitch(props) {
  const partsProps = useSwitch(props);

  return (
    <SwitchRoot {...partsProps.root}>
      <SwitchThumb {...partsProps.thumb} />
    </SwitchRoot>
  );
};

/**
 * {@link Switch} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Switch {
  /**
   * {@link SwitchState} です。
   */
  export type State = SwitchState;

  /**
   * {@link SwitchProps} です。
   */
  export type Props = SwitchProps;

  /**
   * {@link SwitchSlotProps} です。
   */
  export type SlotProps = SwitchSlotProps;

  /**
   * {@link SwitchColor} です。
   */
  export type Color = SwitchColor;

  /**
   * {@link SwitchRadius} です。
   */
  export type Radius = SwitchRadius;

  /**
   * {@link SwitchSize} です。
   */
  export type Size = SwitchSize;

  /**
   * {@link SwitchVariant} です。
   */
  export type Variant = SwitchVariant;
}
