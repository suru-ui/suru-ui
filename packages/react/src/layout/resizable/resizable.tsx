import * as React from "react";

import type { Component } from "../../types.js";
import * as ResizableParts from "./resizable.parts.jsx";

/**
 * パネル群のルートに渡すプロパティーです。
 */
export type ResizablePanelGroupProps = ResizableParts.Root.Props;

/**
 * {@link Resizable} コンポーネントのプロパティーです。
 */
export type ResizableProps = ResizableParts.Root.Props & {
  /**
   * リサイズ可能なパネルとハンドルです。
   */
  readonly children?: React.ReactNode | undefined;
};

/**
 * パネル群を表示するルートコンポーネントです。
 *
 * `ResizablePanel` と `ResizableHandle` は、パーツ API として直接組み合わせて使用します。
 *
 * @example
 * ```tsx
 * <ResizablePanelGroup direction="horizontal">
 *   <ResizablePanel defaultSize={50}>左側</ResizablePanel>
 *   <ResizableHandle />
 *   <ResizablePanel>右側</ResizablePanel>
 * </ResizablePanelGroup>
 * ```
 */
export const ResizablePanelGroup: Component<ResizablePanelGroupProps> = ResizableParts.Root;

/**
 * リサイズ可能なパネル群を表示するコンポーネントです。
 *
 * @example
 * ```tsx
 * <Resizable>
 *   <ResizableParts.Panel defaultSize={30}>サイドバー</ResizableParts.Panel>
 *   <ResizableParts.Handle withHandle />
 *   <ResizableParts.Panel>コンテンツ</ResizableParts.Panel>
 * </Resizable>
 * ```
 */
export const Resizable: Component<ResizableProps> = function SuiResizable(props) {
  return <ResizableParts.Root {...props} />;
};
