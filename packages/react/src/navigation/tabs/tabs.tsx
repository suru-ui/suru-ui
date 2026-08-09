import type { Component } from "../../types.js";
import * as TabsParts from "./tabs.parts.jsx";

/**
 * {@link Tabs} コンポーネントのプロパティーです。
 */
export type TabsProps = TabsParts.Root.Props;

/**
 * Tab とパネルを切り替えるコンポーネントです。
 *
 * Tab の構成を細かく制御する場合は、{@link TabsParts.Root|Root} と各パーツを直接組み立てます。
 *
 * @example 基本
 * ```tsx
 * <Tabs defaultValue="overview">
 *   <TabsParts.List>
 *     <TabsParts.Tab value="overview">概要</TabsParts.Tab>
 *     <TabsParts.Tab value="projects">プロジェクト</TabsParts.Tab>
 *     <TabsParts.Indicator />
 *   </TabsParts.List>
 *   <TabsParts.Panel value="overview">概要の内容</TabsParts.Panel>
 *   <TabsParts.Panel value="projects">プロジェクトの内容</TabsParts.Panel>
 * </Tabs>
 * ```
 */
export const Tabs: Component<TabsProps> = function SuiTabs(props) {
  return <TabsParts.Root {...props} />;
};
