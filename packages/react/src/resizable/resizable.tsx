import * as React from "react";

import type { IComponent, IUseContext } from "../types.js";
import {
  type ResizableContext,
  type ResizablePanelSize,
  type ResizableRootProps,
  type ResizableRootState,
  type ResizablePanelProps,
  type ResizablePanelState,
  type ResizableHandleProps,
  type ResizableHandleState,
  type ResizableRootDirection,
  type ResizableRootOrientation,
  ResizableRoot,
  ResizablePanel,
  ResizableHandle,
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
 * リサイズ可能なパネル群を表示するコンポーネントです。
 */
interface ResizableType extends IComponent<ResizableProps> {
  /**
   * 隣接するパネルのサイズを変更するハンドルです。
   */
  readonly Handle: IComponent<ResizableHandleProps>;

  /**
   * サイズを変更できるパネル要素です。
   */
  readonly Panel: IComponent<ResizablePanelProps>;

  /**
   * パネル群のルート要素です。
   */
  readonly PanelGroup: IComponent<ResizableRootProps>;

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
    Panel: ResizablePanel,
    Handle: ResizableHandle,
    PanelGroup: ResizableRoot,
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
   * {@link ResizableDirection} です。
   */
  export type Direction = ResizableDirection;

  /**
   * {@link ResizableOrientation} です。
   */
  export type Orientation = ResizableOrientation;

  /**
   * ハンドルの状態やプロパティーをまとめた型名前空間です。
   */
  export namespace Handle {
    /**
     * {@link ResizableHandleState} です。
     */
    export type State = ResizableHandleState;

    /**
     * {@link ResizableHandleProps} です。
     */
    export type Props = ResizableHandleProps;
  }

  /**
   * パネルの状態やプロパティーをまとめた型名前空間です。
   */
  export namespace Panel {
    /**
     * {@link ResizablePanelState} です。
     */
    export type State = ResizablePanelState;

    /**
     * {@link ResizablePanelProps} です。
     */
    export type Props = ResizablePanelProps;

    /**
     * {@link ResizablePanelSize} です。
     */
    export type Size = ResizablePanelSize;
  }

  /**
   * パネル群のルート要素の状態やプロパティーをまとめた型名前空間です。
   */
  export namespace PanelGroup {
    /**
     * {@link ResizableRootState} です。
     */
    export type State = ResizableRootState;

    /**
     * {@link ResizableRootProps} です。
     */
    export type Props = ResizableRootProps;
  }
}
