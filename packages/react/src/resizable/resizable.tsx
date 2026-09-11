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

// Types
// -----

export type ResizableDirection = ResizableRootDirection;

export type ResizableOrientation = ResizableRootOrientation;

/**
 * {@link Resizable} が持つ状態です。
 */
export type ResizableState = ResizableRootState;

/**
 * {@link Resizable} の各パーツに渡す props です。
 */
export type ResizableSlotProps = {
  /**
   * {@link ResizableRoot} に渡す props です。
   */
  readonly root?: Omit<ResizableRootProps, "children"> | undefined;
};

/**
 * {@link Resizable} に渡す props です。
 */
export type ResizableProps = Omit<ResizableRootProps, "children"> & {
  /**
   * リサイズ可能なパネルとハンドルです。
   *
   * {@link ResizablePanel} と {@link ResizableHandle} を交互に配置します。
   */
  readonly children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  readonly slotProps?: ResizableSlotProps | undefined;
};

// API
// ---

/**
 * {@link Resizable} を構成する各パーツの props を作成するための API です。
 */
export interface ResizableAPI {
  /**
   * {@link ResizableRoot} に渡す props を取得します。
   */
  getRootProps(): ResizableRootProps;
}

interface IUseResizableAPI {
  /**
   * {@link ResizableAPI} を作成します。
   *
   * @param props {@link Resizable} の props です。
   * @returns リサイズ可能なパネル群の API です
   */
  (props: ResizableProps): ResizableAPI;
}

/**
 * {@link ResizableAPI} を作成するフックです。
 */
export const useResizableAPI: IUseResizableAPI = function useSuiResizableAPI(props) {
  const { children, slotProps: { root: rootProps = {} } = {}, ...otherRootProps } = props;

  return {
    getRootProps() {
      const {
        onLayout: onSlotLayout,
        onLayoutChange: onSlotLayoutChange,
        ...otherSlotRootProps
      } = rootProps;
      const { onLayout: onRootLayout, onLayoutChange: onRootLayoutChange } = otherRootProps;

      return {
        ...otherRootProps,
        ...otherSlotRootProps,
        children,
        onLayout: (...args) => {
          onSlotLayout?.(...args);
          onRootLayout?.(...args);
        },
        onLayoutChange: (...args) => {
          onSlotLayoutChange?.(...args);
          onRootLayoutChange?.(...args);
        },
      };
    },
  };
};

export { type ResizableAPI as API, useResizableAPI as useAPI };

// Component
// ---------

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
   * パネル群のルート要素です。
   */
  readonly Root: IComponent<ResizableRootProps>;

  /**
   * {@link useResizableContext} です。
   */
  readonly useContext: IUseContext<ResizableContext>;
}

/**
 * リサイズ可能なパネル群を表示するコンポーネントです。
 *
 * 子要素には {@link ResizablePanel} と {@link ResizableHandle} を交互に配置します。
 * ハンドルはポインター操作と矢印キーによる操作に対応します。
 */
export const Resizable: ResizableType = /*#__PURE__*/ Object.assign(
  function SuiResizable(props: ResizableProps) {
    const api = useResizableAPI(props);

    return <ResizableRoot {...api.getRootProps()} />;
  },
  {
    Root: ResizableRoot,
    Panel: ResizablePanel,
    Handle: ResizableHandle,
    PanelGroup: ResizableRoot,
    useContext: useResizableContext,
  },
);

export namespace Resizable {
  export type State = ResizableState;

  export type Props = ResizableProps;

  export type SlotProps = ResizableSlotProps;

  export type Context = ResizableContext;

  export type Direction = ResizableDirection;

  export type Orientation = ResizableOrientation;

  /**
   * ハンドルの状態やプロパティーをまとめた型名前空間です。
   */
  export namespace Handle {
    export type State = ResizableHandleState;

    export type Props = ResizableHandleProps;
  }

  /**
   * パネルの状態やプロパティーをまとめた型名前空間です。
   */
  export namespace Panel {
    export type State = ResizablePanelState;

    export type Props = ResizablePanelProps;

    export type Size = ResizablePanelSize;
  }

  /**
   * パネル群のルート要素の状態やプロパティーをまとめた型名前空間です。
   */
  export namespace PanelGroup {
    export type State = ResizableRootState;

    export type Props = ResizableRootProps;
  }

  /**
   * パネル群のルート要素の状態やプロパティーをまとめた型名前空間です。
   */
  export namespace Root {
    export type State = ResizableRootState;

    export type Props = ResizableRootProps;
  }
}
