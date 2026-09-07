import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import * as React from "react";
import {
  type GroupProps,
  type PanelProps,
  type SeparatorProps,
  type PanelImperativeHandle,
  Group as ExternalGroup,
  Panel as ExternalPanel,
  Separator,
} from "react-resizable-panels";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./resizable.css";

// Context
// -------

/**
 * パネル群の向きです。
 *
 * - `"horizontal"`: 水平方向にパネルを並べます。
 * - `"vertical"`: 垂直方向にパネルを並べます。
 */
export type ResizableContextDirection = "horizontal" | "vertical";

/**
 * {@link ResizableRoot} が子パーツへ提供するコンテキストの型です。
 */
export type ResizableContext = {
  /**
   * パネル群の向きです。
   */
  readonly direction: ResizableContextDirection;
};

/**
 * {@link ResizableRoot} が子パーツへ提供するコンテキストです。
 */
export const ResizableContext: React.Context<ResizableContext | null> =
  React.createContext<ResizableContext | null>(null);

function useSuiResizableContext(optional?: false): ResizableContext;
function useSuiResizableContext(optional?: boolean): ResizableContext | null;
function useSuiResizableContext(optional?: boolean): ResizableContext | null {
  const ctx = React.use(ResizableContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ResizableContext",
      providerName: "ResizableRoot",
    });
  }

  return ctx;
}

/**
 * {@link ResizableContext} を読み取るフックです。
 */
export const useResizableContext: IUseContext<ResizableContext> = useSuiResizableContext;

export { ResizableContext as Context, useResizableContext as useContext };

export namespace Context {
  /**
   * {@link ResizableContextDirection}
   */
  export type Direction = ResizableContextDirection;
}

function normalizePanelSize(value: ResizablePanelSize | undefined): ResizablePanelSize | undefined {
  return typeof value === "number" ? `${value}%` : value;
}

const RESIZABLE_HANDLE_HIT_SIZE = 16;

const DEFAULT_RESIZE_TARGET_MINIMUM_SIZE = {
  coarse: 20,
  fine: RESIZABLE_HANDLE_HIT_SIZE,
};

// Root
// ----

/**
 * リサイズ可能なパネル群の向きです。
 *
 * - `"horizontal"`: 水平方向にパネルを並べます。
 * - `"vertical"`: 垂直方向にパネルを並べます。
 */
export type ResizableRootDirection = "horizontal" | "vertical";

/**
 * {@link ResizableRootDirection} です。
 */
export type ResizableRootOrientation = ResizableRootDirection;

/**
 * {@link ResizableRoot} が持つ状態です。
 */
export type ResizableRootState = {
  /**
   * パネル群の向きです。
   */
  readonly direction: ResizableRootDirection;
};

/**
 * {@link ResizableRoot} に渡す props です。
 */
export type ResizableRootProps = Omit<
  GroupProps,
  "children" | "className" | "orientation" | "style"
> &
  Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<ResizableRootState> & {
    /**
     * パネルを並べる向きです。
     *
     * @default "horizontal"
     */
    direction?: ResizableRootDirection | undefined;

    /**
     * パネルサイズの配列が変化したときに呼び出されます。
     */
    onLayout?: ((sizes: readonly number[]) => void) | undefined;

    /**
     * {@link ResizableRootDirection} です。
     */
    orientation?: ResizableRootOrientation | undefined;
  };

/**
 * リサイズ可能なパネル群のルート要素です。
 *
 * 子要素には {@link ResizablePanel} と {@link ResizableHandle} を交互に配置します。
 */
export const ResizableRoot: IComponent<ResizableRootProps> = function SuiResizableRoot(props) {
  const {
    onLayout,
    render = <ExternalGroup />,
    children,
    direction: directionProp,
    orientation: orientationProp,
    onLayoutChange,
    className,
    resizeTargetMinimumSize: resizeTargetMinimumSizeProp,
    ...otherDivProps
  } = props;
  const direction = directionProp ?? orientationProp ?? "horizontal";
  const resizeTargetMinimumSize = {
    coarse:
      resizeTargetMinimumSizeProp?.coarse ??
      Math.max(DEFAULT_RESIZE_TARGET_MINIMUM_SIZE.coarse, RESIZABLE_HANDLE_HIT_SIZE),
    fine:
      resizeTargetMinimumSizeProp?.fine ??
      Math.max(DEFAULT_RESIZE_TARGET_MINIMUM_SIZE.fine, RESIZABLE_HANDLE_HIT_SIZE),
  };
  const state: ResizableRootState = { direction };

  const handleLayoutChange = (layout: Parameters<NonNullable<GroupProps["onLayoutChange"]>>[0]) => {
    onLayoutChange?.(layout);
    onLayout?.(Object.values(layout));
  };
  const element = useRender({
    defaultTagName: "div",
    state,
    props: [
      otherDivProps,
      {
        render,
        children,
        className: cn(className, "sui_resizable"),
        orientation: direction,
        onLayoutChange: handleLayoutChange,
        resizeTargetMinimumSize,
        "data-direction": direction,
        "data-scope": "",
      },
    ],
  });

  const ctx = React.useMemo(() => ({ direction }), [direction]);
  return <ResizableContext value={ctx}>{element}</ResizableContext>;
};

export { ResizableRoot as Root };

export namespace Root {
  /**
   * {@link ResizableRootState}
   */
  export type State = ResizableRootState;

  /**
   * {@link ResizableRootProps}
   */
  export type Props = ResizableRootProps;

  /**
   * {@link ResizableRootDirection}
   */
  export type Direction = ResizableRootDirection;

  /**
   * {@link ResizableRootOrientation}
   */
  export type Orientation = ResizableRootOrientation;
}

// Panel
// -----

/**
 * リサイズ可能なパネルのサイズです。
 *
 * 数値はパーセントとして扱われ、単位付きの文字列も指定できます。
 */
export type ResizablePanelSize = number | string;

/**
 * {@link ResizablePanel} が持つ状態です。
 */
export type ResizablePanelState = {
  /**
   * パネル群の向きです。
   */
  readonly direction: ResizableRootDirection;
};

/**
 * {@link ResizablePanel} に渡す props です。
 */
export type ResizablePanelProps = Omit<
  PanelProps,
  "children" | "className" | "defaultSize" | "maxSize" | "minSize" | "onResize" | "style"
> &
  Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<ResizablePanelState> & {
    /**
     * パネルの初期サイズを指定します。
     *
     * 数値はパーセントとして扱われます。
     */
    defaultSize?: ResizablePanelSize | undefined;

    /**
     * パネルが大きくなるときの最大サイズを指定します。
     *
     * 数値はパーセントとして扱われます。
     */
    maxSize?: ResizablePanelSize | undefined;

    /**
     * パネルが小さくなるときの最小サイズを指定します。
     *
     * 数値はパーセントとして扱われます。
     */
    minSize?: ResizablePanelSize | undefined;

    /**
     * パネルサイズが変化したときに呼び出されます。
     */
    onResize?: PanelProps["onResize"];

    /**
     * パネルサイズが変化したときに、パーセント値で呼び出されます。
     */
    onSizeChange?: ((size: number) => void) | undefined;

    /**
     * パネルの並び順を明示します。
     */
    order?: number | undefined;

    /**
     * パネルのサイズを制御します。
     *
     * 数値はパーセントとして扱われます。
     */
    size?: ResizablePanelSize | undefined;
  };

/**
 * サイズを変更できるパネル要素です。
 *
 * `size` を指定すると、外部ライブラリーの命令型 API を使ってサイズを更新します。
 * 数値のサイズはパーセントとして扱います。
 */
export const ResizablePanel: IComponent<ResizablePanelProps> = function SuiResizablePanel(props) {
  const ctx = useResizableContext(true);
  const direction = ctx?.direction ?? "horizontal";
  const {
    size,
    order,
    render = <ExternalPanel />,
    maxSize,
    minSize,
    children,
    onResize,
    panelRef: panelRefProp,
    className,
    defaultSize,
    onSizeChange,
    ...otherDivProps
  } = props;
  const state: ResizablePanelState = { direction };
  const internalPanelRef = React.useRef<PanelImperativeHandle>(null);
  const panelRef = useMergedRefs(internalPanelRef, panelRefProp);
  const panelSize = normalizePanelSize(size ?? defaultSize);

  React.useEffect(() => {
    if (size !== undefined) {
      const nextSize = normalizePanelSize(size);
      if (nextSize !== undefined) {
        internalPanelRef.current?.resize(nextSize);
      }
    }
  }, [size]);

  const handleResize: PanelProps["onResize"] = (nextSize, id, previousSize) => {
    onResize?.(nextSize, id, previousSize);
    onSizeChange?.(nextSize.asPercentage);
  };
  const element = useRender({
    defaultTagName: "div",
    state,
    props: [
      otherDivProps,
      {
        render,
        maxSize: normalizePanelSize(maxSize),
        minSize: normalizePanelSize(minSize),
        children,
        panelRef,
        onResize: handleResize,
        className: cn(className, "sui_resizable_panel"),
        defaultSize: panelSize,
        "data-order": order === undefined ? undefined : String(order),
      },
    ],
  });

  return element;
};

export { ResizablePanel as Panel };

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

// Handle
// ------

/**
 * {@link ResizableHandle} が持つ状態です。
 */
export type ResizableHandleState = {
  /**
   * パネル群の向きです。
   */
  readonly direction: ResizableRootDirection;

  /**
   * ハンドルが無効かどうかです。
   */
  readonly disabled: boolean;
};

/**
 * {@link ResizableHandle} に渡す props です。
 */
export type ResizableHandleProps = Omit<SeparatorProps, "children" | "className" | "style"> &
  Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<ResizableHandleState> & {
    /**
     * 中央にグリップを表示するかどうかを指定します。
     *
     * @default false
     */
    withHandle?: boolean | undefined;
  };

/**
 * 隣接するパネルのサイズを変更するハンドルです。
 *
 * マウス、タッチ、ペンのポインター操作と、矢印キーによる操作に対応します。
 */
export const ResizableHandle: IComponent<ResizableHandleProps> = function SuiResizableHandle(
  props,
) {
  const ctx = useResizableContext(true);
  const direction = ctx?.direction ?? "horizontal";
  const {
    render = <Separator />,
    children,
    disabled = false,
    className,
    withHandle = false,
    ...otherDivProps
  } = props;
  const state: ResizableHandleState = { direction, disabled };

  return useRender({
    defaultTagName: "div",
    state,
    props: [
      otherDivProps,
      {
        render,
        children: withHandle ? (
          <span className="sui_resizable_handle_grip">{children}</span>
        ) : (
          children
        ),
        disabled,
        className: cn(
          className,
          "sui_resizable_handle",
          disabled && "sui_resizable_handle-disabled",
        ),
        "data-direction": direction,
        "aria-orientation": direction === "horizontal" ? "vertical" : "horizontal",
      },
    ],
  });
};

export { ResizableHandle as Handle };

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
