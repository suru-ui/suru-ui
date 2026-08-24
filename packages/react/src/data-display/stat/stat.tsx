import type { IComponent } from "../../types.js";
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

/**
 * {@link StatRootSize} です。
 */
export type StatSize = StatRootSize;

/**
 * {@link Stat} の各パーツに渡すプロパティーです。
 */
export type StatPartsProps = {
  /**
   * {@link StatRoot} に渡すプロパティーです。
   */
  readonly root: StatRootProps;
};

/**
 * {@link Stat} の状態です。
 */
export type StatState = StatRootState;

/**
 * {@link Stat} コンポーネントのプロパティーです。
 */
export type StatProps = StatRootProps;

/**
 * {@link Stat} の各パーツに渡すプロパティーを作るフックです。
 */
export function useStat(props: StatProps): StatPartsProps {
  return {
    root: props,
  };
}

interface StatComponentType extends IComponent<StatProps> {
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
export const Stat: StatComponentType = /*#__PURE__*/ Object.assign(
  function SuiStat(props: StatProps) {
    const partsProps = useStat(props);

    return <StatRoot {...partsProps.root} />;
  },
  {
    Change: StatChange,
    Description: StatDescription,
    Label: StatLabel,
    Root: StatRoot,
    Value: StatValue,
  },
);

/**
 * {@link Stat} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Stat {
  /**
   * {@link StatState} です。
   */
  export type State = StatState;

  /**
   * {@link StatProps} です。
   */
  export type Props = StatProps;

  /**
   * {@link StatSize} です。
   */
  export type Size = StatSize;
}
