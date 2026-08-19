import * as React from "react";

import type { IComponent, IUseContext } from "../../types.js";
import {
  type ResizableContext,
  type ResizableRootProps,
  type ResizableRootState,
  type ResizableRootDirection,
  type ResizableRootOrientation,
  ResizableRoot,
  useResizableContext,
} from "./resizable.parts.jsx";

/**
 * {@link ResizableRootDirection} です。
 */
export type ResizableDirection = ResizableRootDirection;

/**
 * {@link ResizableRootOrientation} です。
 */
export type ResizableOrientation = ResizableRootOrientation;

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
export type ResizableProps = Omit<ResizableRootProps, "children"> & {
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
interface ResizableType extends IComponent<ResizableProps> {
  /**
   * {@link useResizableContext} です。
   */
  readonly useContext: IUseContext<ResizableContext>;
}

export const Resizable: ResizableType = /*#__PURE__*/ Object.assign(
  function SuiResizable(props: ResizableProps) {
    return <ResizableRoot {...props} />;
  },
  {
    useContext: useResizableContext,
  },
);

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

  /**
   * {@link ResizableContext} です。
   */
  export type Context = ResizableContext;

  /**
   * {@link ResizableOrientation} です。
   */
  export type Orientation = ResizableOrientation;

  /**
   * {@link ResizableDirection} です。
   */
  export type Direction = ResizableDirection;
}
