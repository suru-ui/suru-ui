import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { IComponent } from "../types.js";
import {
  type StatRootSize,
  type StatRootProps,
  type StatRootState,
  type StatLabelProps,
  type StatTrendProps,
  type StatValueProps,
  type StatTrendDirection,
  type StatDescriptionProps,
  StatRoot,
  StatLabel,
  StatTrend,
  StatValue,
  StatDescription,
} from "./stat.parts.js";

// Types
// -----

export type StatDirection = StatTrendDirection;

export type StatSize = StatRootSize;

/**
 * {@link Stat} の各パーツに渡す props です。
 */
export type StatSlotProps = {
  /**
   * {@link StatDescription} に渡す props です。
   */
  readonly description?: Omit<StatDescriptionProps, "children"> | undefined;

  /**
   * {@link StatLabel} に渡す props です。
   */
  readonly label?: Omit<StatLabelProps, "children"> | undefined;

  /**
   * {@link StatTrend} に渡す props です。
   */
  readonly trend?: Omit<StatTrendProps, "children"> | undefined;

  /**
   * {@link StatValue} に渡す props です。
   */
  readonly value?: Omit<StatValueProps, "children"> | undefined;
};

/**
 * {@link Stat} が持つ状態です。
 */
export type StatState = StatRootState;

namespace StatProps {
  export type Root = Omit<StatRootProps, "children" | keyof Stat>;

  export type Stat = {
    /**
     * 統計の補足説明です。
     */
    description?: StatDescriptionProps["children"] | undefined;

    /**
     * 統計のラベルです。
     */
    label?: StatLabelProps["children"] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: StatSlotProps | undefined;

    /**
     * 値の増減を示す内容です。
     */
    trend?: StatTrendProps["children"] | undefined;

    /**
     * 統計の値です。
     */
    value?: StatValueProps["children"] | undefined;
  };
}

/**
 * {@link Stat} に渡す props です。
 */
export type StatProps = StatProps.Stat & StatProps.Root;

export type IStat = IComponent<StatProps>;

export interface IUseStatAPI {
  /**
   * {@link StatAPI} を作成します。
   *
   * @param props {@link Stat} の props です。
   * @returns 統計の API です
   */
  (props: StatProps): StatAPI;
}

// API
// ---

/**
 * {@link Stat} を構成する各パーツの props を作成するための API です。
 */
export class StatAPI {
  private readonly rootProps: StatProps.Root;

  private readonly slotProps: StatSlotProps;

  private readonly statProps: Required<Omit<StatProps.Stat, "slotProps">>;

  /**
   * @param props {@link Stat} の props です。
   * @internal
   */
  public constructor(props: StatProps) {
    const { label, trend, value, slotProps = {}, description, ...rootProps } = props;
    this.statProps = { label, trend, value, description };
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }

  /**
   * {@link StatDescription} に渡す props を取得します。
   *
   * 説明を表示しないときは `null` を返します。
   */
  public getDescriptionProps(): StatDescriptionProps | null {
    const { description: props = {} } = this.slotProps;
    const { description } = this.statProps;

    if (isLikelyVisibleNode(description)) {
      return {
        ...props,
        children: description,
      };
    }

    return null;
  }

  /**
   * {@link StatLabel} に渡す props を取得します。
   *
   * ラベルを表示しないときは `null` を返します。
   */
  public getLabelProps(): StatLabelProps | null {
    const { label: props = {} } = this.slotProps;
    const { label } = this.statProps;

    if (isLikelyVisibleNode(label)) {
      return {
        ...props,
        children: label,
      };
    }

    return null;
  }

  /**
   * {@link StatRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<StatRootProps, "children"> {
    return this.rootProps;
  }

  /**
   * {@link StatTrend} に渡す props を取得します。
   *
   * トレンドを表示しないときは `null` を返します。
   */
  public getTrendProps(): StatTrendProps | null {
    const { trend: props = {} } = this.slotProps;
    const { trend } = this.statProps;

    if (isLikelyVisibleNode(trend)) {
      return {
        ...props,
        children: trend,
      };
    }

    return null;
  }

  /**
   * {@link StatValue} に渡す props を取得します。
   *
   * 値を表示しないときは `null` を返します。
   */
  public getValueProps(): StatValueProps | null {
    const { value: props = {} } = this.slotProps;
    const { value } = this.statProps;

    if (isLikelyVisibleNode(value)) {
      return {
        ...props,
        children: value,
      };
    }

    return null;
  }
}

/**
 * {@link StatAPI} を作成するフックです。
 */
export const useStatAPI: IUseStatAPI = function useSuiStatAPI(props) {
  return new StatAPI(props);
};

export { StatAPI as API, useStatAPI as useAPI };

// Component
// ---------

/**
 * ラベルと値の組で統計を表示するコンポーネントです。
 */
export const Stat: IStat = function SuiStat(props) {
  const api = useStatAPI(props);
  const labelProps = api.getLabelProps();
  const valueProps = api.getValueProps();
  const trendProps = api.getTrendProps();
  const descriptionProps = api.getDescriptionProps();

  return (
    <StatRoot {...api.getRootProps()}>
      {labelProps && <StatLabel {...labelProps} />}
      {valueProps && <StatValue {...valueProps} />}
      {trendProps && <StatTrend {...trendProps} />}
      {descriptionProps && <StatDescription {...descriptionProps} />}
    </StatRoot>
  );
};

export namespace Stat {
  export type State = StatState;

  export type Props = StatProps;

  export type SlotProps = StatSlotProps;

  export type Direction = StatDirection;

  export type Size = StatSize;
}
