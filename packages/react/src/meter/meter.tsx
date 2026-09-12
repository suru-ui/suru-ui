import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { IComponent } from "../types.js";
import {
  type MeterRootSize,
  type MeterRootColor,
  type MeterRootProps,
  type MeterRootState,
  type MeterLabelProps,
  type MeterRootRadius,
  type MeterTrackProps,
  type MeterValueProps,
  type MeterRootVariant,
  type MeterIndicatorProps,
  MeterRoot,
  MeterLabel,
  MeterTrack,
  MeterValue,
  MeterIndicator,
} from "./meter.parts.jsx";

// Types
// -----

export type MeterColor = MeterRootColor;

export type MeterRadius = MeterRootRadius;

export type MeterSize = MeterRootSize;

export type MeterVariant = MeterRootVariant;

/**
 * {@link Meter} の各パーツに渡す props です。
 */
export type MeterSlotProps = {
  /**
   * {@link MeterIndicator} に渡す props です。
   */
  readonly indicator?: MeterIndicatorProps | undefined;

  /**
   * {@link MeterLabel} に渡す props です。
   */
  readonly label?: Omit<MeterLabelProps, "children"> | undefined;

  /**
   * {@link MeterTrack} に渡す props です。
   */
  readonly track?: Omit<MeterTrackProps, "children"> | undefined;

  /**
   * {@link MeterValue} に渡す props です。
   */
  readonly value?: MeterValueProps | undefined;
};

/**
 * {@link Meter} が持つ状態です。
 */
export type MeterState = MeterRootState;

/**
 * {@link Meter} に渡す props です。
 */
export type MeterProps = Omit<MeterRootProps, "children" | "value"> & {
  /**
   * メーターの説明ラベルです。
   *
   * 指定すると {@link MeterValue} も表示されます。
   */
  label?: MeterLabelProps["children"] | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  slotProps?: MeterSlotProps | undefined;

  /**
   * 現在値です。
   *
   * @default 0
   */
  value?: number | undefined;
};

// API
// ---

/**
 * {@link Meter} を構成する各パーツの props を作成するための API です。
 */
export interface MeterAPI {
  /**
   * {@link MeterIndicator} に渡す props を取得します。
   */
  getIndicatorProps(): MeterIndicatorProps;

  /**
   * {@link MeterLabel} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getLabelProps(): MeterLabelProps | null;

  /**
   * {@link MeterRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<MeterRootProps, "children">;

  /**
   * {@link MeterTrack} に渡す props を取得します。
   */
  getTrackProps(): Omit<MeterTrackProps, "children">;

  /**
   * {@link MeterValue} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getValueProps(): MeterValueProps | null;
}

interface IUseMeterAPI {
  /**
   * {@link MeterAPI} を作成します。
   *
   * @param props {@link Meter} の props です。
   * @returns メーターの API です
   */
  (props: MeterProps): MeterAPI;
}

/**
 * {@link MeterAPI} を作成するフックです。
 */
export const useMeterAPI: IUseMeterAPI = function useSuiMeterAPI(props) {
  const {
    label,
    value = 0,
    slotProps: {
      label: labelProps = {},
      track: trackProps = {},
      value: valueProps = {},
      indicator: indicatorProps = {},
    } = {},
    ...otherRootProps
  } = props;

  return {
    getRootProps() {
      return { value, ...otherRootProps };
    },
    getLabelProps() {
      if (isLikelyVisibleNode(label)) {
        return {
          ...labelProps,
          children: label,
        };
      }

      return null;
    },
    getTrackProps() {
      return trackProps;
    },
    getValueProps() {
      if (isLikelyVisibleNode(label)) {
        return valueProps;
      }

      return null;
    },
    getIndicatorProps() {
      return indicatorProps;
    },
  };
};

export { type MeterAPI as API, useMeterAPI as useAPI };

// Component
// ---------

/**
 * 数値の範囲内にある現在値を表示するメーターコンポーネントです。
 *
 * 測定値や使用量など、既知の範囲に対する割合を示します。ラベルを指定すると現在値もあわせて表示されます。
 */
export const Meter: IComponent<MeterProps> = function SuiMeter(props) {
  const api = useMeterAPI(props);
  const labelProps = api.getLabelProps();
  const valueProps = api.getValueProps();

  return (
    <MeterRoot {...api.getRootProps()}>
      {labelProps && <MeterLabel {...labelProps} />}
      {valueProps && <MeterValue {...valueProps} />}
      <MeterTrack {...api.getTrackProps()}>
        <MeterIndicator {...api.getIndicatorProps()} />
      </MeterTrack>
    </MeterRoot>
  );
};

export namespace Meter {
  export type State = MeterState;

  export type Props = MeterProps;

  export type SlotProps = MeterSlotProps;

  export type Color = MeterColor;

  export type Radius = MeterRadius;

  export type Size = MeterSize;

  export type Variant = MeterVariant;
}
