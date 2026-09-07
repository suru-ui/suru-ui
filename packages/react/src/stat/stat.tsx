import type { IComponent } from "../types.js";
import {
  type StatRootSize,
  type StatRootProps,
  type StatRootState,
  type StatLabelProps,
  type StatValueProps,
  type StatChangeProps,
  type StatDescriptionProps,
  StatRoot,
  StatLabel,
  StatValue,
  StatChange,
  StatDescription,
} from "./stat.parts.jsx";

// Types
// -----

/**
 * {@link StatRootSize}
 */
export type StatSize = StatRootSize;

/**
 * {@link Stat} が持つ状態です。
 */
export type StatState = StatRootState;

/**
 * {@link Stat} に渡す props です。
 */
export type StatProps = StatRootProps;

// API
// ---

/**
 * {@link Stat} を構成する各パーツの props を作成するための API です。
 */
export interface StatAPI {
  /**
   * {@link StatRoot} に渡す props を取得します。
   */
  getRootProps(): StatRootProps;
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
  return {
    getRootProps() {
      return props;
    },
  };
};

export { type StatAPI as API, useStatAPI as useAPI };

// Component
// ---------

interface IStat extends IComponent<StatProps> {
  /**
   * {@link StatChange} です。
   */
  readonly Change: IComponent<StatChangeProps>;

  /**
   * {@link StatDescription} です。
   */
  readonly Description: IComponent<StatDescriptionProps>;

  /**
   * {@link StatLabel} です。
   */
  readonly Label: IComponent<StatLabelProps>;

  /**
   * {@link StatRoot} です。
   */
  readonly Root: IComponent<StatRootProps>;

  /**
   * {@link StatValue} です。
   */
  readonly Value: IComponent<StatValueProps>;
}

/**
 * ラベルと値の組で統計を表示するコンポーネントです。
 *
 * {@link Stat.Label} でラベルを、{@link Stat.Value} で値を、{@link Stat.Description} で補足説明を指定します。値の増減を示すときは {@link Stat.Value} の内側に {@link Stat.Change} を配置します。
 */
export const Stat: IStat = /*#__PURE__*/ Object.assign(
  function SuiStat(props: StatProps) {
    const api = useStatAPI(props);

    return <StatRoot {...api.getRootProps()} />;
  },
  {
    Change: StatChange,
    Description: StatDescription,
    Label: StatLabel,
    Root: StatRoot,
    Value: StatValue,
  },
);

export namespace Stat {
  /**
   * {@link StatState}
   */
  export type State = StatState;

  /**
   * {@link StatProps}
   */
  export type Props = StatProps;

  /**
   * {@link StatSize}
   */
  export type Size = StatSize;
}
