import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { IComponent } from "../types.js";
import {
  type StatRootSize,
  type StatRootProps,
  type StatRootState,
  type StatLabelProps,
  type StatValueProps,
  type StatChangeProps,
  type StatChangeDirection,
  type StatDescriptionProps,
  StatRoot,
  StatLabel,
  StatValue,
  StatChange,
  StatDescription,
} from "./stat.parts.jsx";

// Types
// -----

export type StatSize = StatRootSize;

export type StatDirection = StatChangeDirection;

/**
 * {@link Stat} の各パーツに渡す props です。
 */
export type StatSlotProps = {
  /**
   * {@link StatChange} に渡す props です。
   */
  readonly change?: Omit<StatChangeProps, "children"> | undefined;

  /**
   * {@link StatDescription} に渡す props です。
   */
  readonly description?: Omit<StatDescriptionProps, "children"> | undefined;

  /**
   * {@link StatLabel} に渡す props です。
   */
  readonly label?: Omit<StatLabelProps, "children"> | undefined;

  /**
   * {@link StatValue} に渡す props です。
   */
  readonly value?: Omit<StatValueProps, "children"> | undefined;
};

/**
 * {@link Stat} が持つ状態です。
 */
export type StatState = StatRootState;

/**
 * {@link Stat} に渡す props です。
 */
export type StatProps = Omit<StatRootProps, "children"> & {
  /**
   * 値の増減を示す内容です。
   */
  change?: StatChangeProps["children"] | undefined;

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
   * 統計の値です。
   */
  value?: StatValueProps["children"] | undefined;
};

// API
// ---

/**
 * {@link Stat} を構成する各パーツの props を作成するための API です。
 */
export interface StatAPI {
  /**
   * {@link StatChange} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getChangeProps(): StatChangeProps | null;

  /**
   * {@link StatDescription} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getDescriptionProps(): StatDescriptionProps | null;

  /**
   * {@link StatLabel} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getLabelProps(): StatLabelProps | null;

  /**
   * {@link StatRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<StatRootProps, "children">;

  /**
   * {@link StatValue} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getValueProps(): StatValueProps | null;
}

interface IUseStatAPI {
  /**
   * {@link StatAPI} を作成します。
   *
   * @param props {@link Stat} の props です。
   * @returns 統計の API です
   */
  (props: StatProps): StatAPI;
}

/**
 * {@link StatAPI} を作成するフックです。
 */
export const useStatAPI: IUseStatAPI = function useSuiStatAPI(props) {
  const {
    label,
    value,
    change,
    slotProps: {
      label: labelProps = {},
      value: valueProps = {},
      change: changeProps = {},
      description: descriptionProps = {},
    } = {},
    description,
    ...otherRootProps
  } = props;

  return {
    getRootProps() {
      return otherRootProps;
    },
    getLabelProps() {
      return isLikelyVisibleNode(label) ? { ...labelProps, children: label } : null;
    },
    getValueProps() {
      return isLikelyVisibleNode(value) ? { ...valueProps, children: value } : null;
    },
    getChangeProps() {
      return isLikelyVisibleNode(change) ? { ...changeProps, children: change } : null;
    },
    getDescriptionProps() {
      return isLikelyVisibleNode(description)
        ? { ...descriptionProps, children: description }
        : null;
    },
  };
};

export { type StatAPI as API, useStatAPI as useAPI };

// Component
// ---------

/**
 * ラベルと値の組で統計を表示するコンポーネントです。
 */
export const Stat: IComponent<StatProps> = function SuiStat(props: StatProps) {
  const api = useStatAPI(props);
  const labelProps = api.getLabelProps();
  const valueProps = api.getValueProps();
  const changeProps = api.getChangeProps();
  const descriptionProps = api.getDescriptionProps();

  return (
    <StatRoot {...api.getRootProps()}>
      {labelProps && <StatLabel {...labelProps} />}
      {valueProps && <StatValue {...valueProps} />}
      {changeProps && <StatChange {...changeProps} />}
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
