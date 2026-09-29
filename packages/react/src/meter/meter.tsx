import * as React from "react";

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
} from "./meter.parts.js";

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

namespace MeterProps {
  export type Meter = {
    /**
     * メーターの説明ラベルです。
     *
     * 指定すると {@link MeterValue} も表示されます。
     */
    label?: React.ReactNode | undefined;

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

  export type Root = Omit<MeterRootProps, "children" | keyof Meter>;
}

/**
 * {@link Meter} に渡す props です。
 */
export type MeterProps = MeterProps.Meter & MeterProps.Root;

export type IMeter = IComponent<MeterProps>;

// API
// ---

/**
 * {@link Meter} を構成する各パーツの props を作成するための API です。
 */
export class MeterAPI {
  private readonly meterProps: Required<Omit<MeterProps.Meter, "slotProps" | "value">> & {
    readonly value: number;
  };

  private readonly rootProps: MeterProps.Root;

  private readonly slotProps: MeterSlotProps;

  /**
   * @param props {@link Meter} の props です。
   * @internal
   */
  public constructor(props: MeterProps) {
    const { label, value, slotProps = {}, ...rootProps } = props;
    this.meterProps = { label, value: value ?? 0 };
    this.rootProps = rootProps;
    this.slotProps = slotProps;
  }

  /**
   * {@link MeterIndicator} に渡す props を取得します。
   */
  public getIndicatorProps(): MeterIndicatorProps {
    const { indicator: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link MeterLabel} に渡す props を取得します。
   *
   * ラベルを表示しないときは `null` を返します。
   */
  public getLabelProps(): MeterLabelProps | null {
    const { label: props = {} } = this.slotProps;
    const { label } = this.meterProps;

    if (isLikelyVisibleNode(label)) {
      return {
        ...props,
        children: label,
      };
    }

    return null;
  }

  /**
   * {@link MeterRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<MeterRootProps, "children"> {
    return {
      ...this.rootProps,
      value: this.meterProps.value,
    };
  }

  /**
   * {@link MeterTrack} に渡す props を取得します。
   */
  public getTrackProps(): Omit<MeterTrackProps, "children"> {
    const { track: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link MeterValue} に渡す props を取得します。
   *
   * 値を表示しないときは `null` を返します。
   */
  public getValueProps(): MeterValueProps | null {
    const { value: props = {} } = this.slotProps;
    const { label } = this.meterProps;

    if (isLikelyVisibleNode(label)) {
      return props;
    }

    return null;
  }
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
  return new MeterAPI(props);
};

export { MeterAPI as API, useMeterAPI as useAPI };

// Component
// ---------

/**
 * 数値の範囲内にある現在値を表示するメーターコンポーネントです。
 *
 * 測定値や使用量など、既知の範囲に対する割合を示します。ラベルを指定すると現在値もあわせて表示されます。
 */
export const Meter: IMeter = function SuiMeter(props) {
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
