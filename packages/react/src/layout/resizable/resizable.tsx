import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type ResizableRootProps,
  type ResizableRootState,
  ResizableRoot,
} from "./resizable.parts.jsx";

/**
 * {@link ResizablePanelGroup} の状態です。
 */
export type ResizablePanelGroupState = ResizableRootState;

/**
 * {@link ResizablePanelGroup} コンポーネントのプロパティーです。
 */
export type ResizablePanelGroupProps = ResizableRootProps;

/**
 * {@link Resizable} の状態です。
 */
export type ResizableState = ResizableRootState;

/**
 * {@link Resizable} コンポーネントのプロパティーです。
 */
export type ResizableProps = ResizableRootProps & {
  /**
   * リサイズ可能なパネルとハンドルです。
   */
  readonly children?: React.ReactNode | undefined;
};

/**
 * パネル群を表示するルートコンポーネントです。
 *
 * `ResizablePanel` と `ResizableHandle` は、パーツ API として直接組み合わせて使用します。
 */
export const ResizablePanelGroup: IComponent<ResizablePanelGroupProps> = ResizableRoot;

/**
 * {@link ResizablePanelGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ResizablePanelGroup {
  /**
   * {@link ResizablePanelGroupState} です。
   */
  export type State = ResizablePanelGroupState;

  /**
   * {@link ResizablePanelGroupProps} です。
   */
  export type Props = ResizablePanelGroupProps;
}

/**
 * リサイズ可能なパネル群を表示するコンポーネントです。
 */
export const Resizable: IComponent<ResizableProps> = function SuiResizable(props) {
  return <ResizableRoot {...props} />;
};

/**
 * {@link Resizable} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Resizable {
  /**
   * {@link ResizableState} です。
   */
  export type State = ResizableState;

  /**
   * {@link ResizableProps} です。
   */
  export type Props = ResizableProps;
}
