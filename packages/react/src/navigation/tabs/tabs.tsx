import type { IComponent } from "../../types.js";
import {
  type TabsRootSize,
  type TabsRootProps,
  type TabsRootState,
  type TabsRootRadius,
  TabsRoot,
} from "./tabs.parts.jsx";

/**
 * {@link TabsRootRadius} です。
 */
export type TabsRadius = TabsRootRadius;

/**
 * {@link TabsRootSize} です。
 */
export type TabsSize = TabsRootSize;

/**
 * {@link Tabs} の状態です。
 */
export type TabsState = TabsRootState;

/**
 * {@link Tabs} コンポーネントのプロパティーです。
 */
export type TabsProps = TabsRootProps;

/**
 * Tab とパネルを切り替えるコンポーネントです。
 *
 * Tab の構成を細かく制御する場合は、{@link TabsRoot|Root} と各パーツを直接組み立てます。
 */
export const Tabs: IComponent<TabsProps> = function SuiTabs(props) {
  return <TabsRoot {...props} />;
};

/**
 * {@link Tabs} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Tabs {
  /**
   * {@link TabsState} です。
   */
  export type State = TabsState;

  /**
   * {@link TabsProps} です。
   */
  export type Props = TabsProps;

  /**
   * {@link TabsRadius} です。
   */
  export type Radius = TabsRadius;

  /**
   * {@link TabsSize} です。
   */
  export type Size = TabsSize;
}
