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

/**
 * {@link MeterRootColor}
 */
export type MeterColor = MeterRootColor;

/**
 * {@link MeterRootRadius}
 */
export type MeterRadius = MeterRootRadius;

/**
 * {@link MeterRootSize}
 */
export type MeterSize = MeterRootSize;

/**
 * {@link MeterRootVariant}
 */
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
   * ラベルです。
   *
   * 指定すると {@link MeterValue} も表示されます。
   */
  label?: MeterLabelProps["children"] | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   *
   * 各パーツの props が優先されます。
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
      label: labelProps,
      track: trackProps = {},
      value: valueProps,
      indicator: indicatorProps = {},
    } = {},
    ...otherRootProps
  } = props;

  return {
    getIndicatorProps() {
      return indicatorProps;
    },
    getLabelProps() {
      if ("label" in props || labelProps) {
        return {
          children: label,
          ...labelProps,
        };
      }

      return null;
    },
    getRootProps() {
      return { value, ...otherRootProps };
    },
    getTrackProps() {
      return trackProps;
    },
    getValueProps() {
      if ("label" in props || labelProps || valueProps) {
        return {
          ...valueProps,
        };
      }

      return null;
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
  /**
   * {@link MeterState}
   */
  export type State = MeterState;

  /**
   * {@link MeterProps}
   */
  export type Props = MeterProps;

  /**
   * {@link MeterSlotProps}
   */
  export type SlotProps = MeterSlotProps;

  /**
   * {@link MeterColor}
   */
  export type Color = MeterColor;

  /**
   * {@link MeterRadius}
   */
  export type Radius = MeterRadius;

  /**
   * {@link MeterSize}
   */
  export type Size = MeterSize;

  /**
   * {@link MeterVariant}
   */
  export type Variant = MeterVariant;
}
