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

/**
 * {@link ResizableRootDirection}
 */
export type ResizableDirection = ResizableRootDirection;

/**
 * {@link ResizableRootOrientation}
 */
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
   *
   * 各パーツの props が優先されます。
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
    Panel: ResizablePanel,
    Handle: ResizableHandle,
    PanelGroup: ResizableRoot,
    Root: ResizableRoot,
    useContext: useResizableContext,
  },
);

export namespace Resizable {
  /**
   * {@link ResizableState}
   */
  export type State = ResizableState;

  /**
   * {@link ResizableProps}
   */
  export type Props = ResizableProps;

  /**
   * {@link ResizableContext}
   */
  export type Context = ResizableContext;

  /**
   * {@link ResizableSlotProps}
   */
  export type SlotProps = ResizableSlotProps;

  /**
   * {@link ResizableDirection}
   */
  export type Direction = ResizableDirection;

  /**
   * {@link ResizableOrientation}
   */
  export type Orientation = ResizableOrientation;

  /**
   * ハンドルの状態やプロパティーをまとめた型名前空間です。
   */
  export namespace Handle {
    /**
     * {@link ResizableHandleState}
     */
    export type State = ResizableHandleState;

    /**
     * {@link ResizableHandleProps}
     */
    export type Props = ResizableHandleProps;
  }

  /**
   * パネルの状態やプロパティーをまとめた型名前空間です。
   */
  export namespace Panel {
    /**
     * {@link ResizablePanelState}
     */
    export type State = ResizablePanelState;

    /**
     * {@link ResizablePanelProps}
     */
    export type Props = ResizablePanelProps;

    /**
     * {@link ResizablePanelSize}
     */
    export type Size = ResizablePanelSize;
  }

  /**
   * パネル群のルート要素の状態やプロパティーをまとめた型名前空間です。
   */
  export namespace PanelGroup {
    /**
     * {@link ResizableRootState}
     */
    export type State = ResizableRootState;

    /**
     * {@link ResizableRootProps}
     */
    export type Props = ResizableRootProps;
  }

  /**
   * パネル群のルート要素の状態やプロパティーをまとめた型名前空間です。
   */
  export namespace Root {
    /**
     * {@link ResizableRootState}
     */
    export type State = ResizableRootState;

    /**
     * {@link ResizableRootProps}
     */
    export type Props = ResizableRootProps;
  }
}
