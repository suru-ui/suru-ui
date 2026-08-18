import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import * as React from "react";
import {
  Group as ExternalGroup,
  Panel as ExternalPanel,
  Separator,
  type GroupProps,
  type PanelImperativeHandle,
  type PanelProps,
  type SeparatorProps,
} from "react-resizable-panels";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { IComponent, IUseContext } from "../../types.js";

import "./resizable.css";

// Types
// -----

/**
 * リサイズ可能なパネル群の向きです。
 *
 * - `"horizontal"`: 水平方向にパネルを並べます。
 * - `"vertical"`: 垂直方向にパネルを並べます。
 */
export type ResizableDirection = "horizontal" | "vertical";

/**
 * リサイズ可能なパネルのサイズです。
 *
 * 数値はパーセントとして扱われ、単位付きの文字列も指定できます。
 */
export type ResizablePanelSize = number | string;

// Context
// -------

export type ResizableContext = {
  readonly direction: ResizableDirection;
};

export const ResizableContext: React.Context<ResizableContext | null> =
  React.createContext<ResizableContext | null>(null);

function useSuiResizableContext(optional?: false): ResizableContext;
function useSuiResizableContext(optional?: boolean): ResizableContext | null;
function useSuiResizableContext(optional?: boolean): ResizableContext | null {
  const context = React.use(ResizableContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "ResizableContext",
      providerName: "ResizableRoot",
    });
  }

  return context;
}

/**
 * {@link ResizableContext} を読み取るフックです。
 */
export const useResizableContext: IUseContext<ResizableContext> = useSuiResizableContext;

/**
 * {@link ResizableContext} です。
 */
export type Context = ResizableContext;

/**
 * {@link ResizableContext} です。
 */
export const Context: React.Context<ResizableContext | null> = ResizableContext;

/**
 * {@link useResizableContext} です。
 */
export const useContext: IUseContext<Context> = useResizableContext;

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
 * {@link ResizableRoot} の状態です。
 */
export type ResizableRootState = {
  /**
   * パネル群の向きです。
   */
  readonly direction: ResizableDirection;
};

/**
 * {@link ResizableRoot} に渡すプロパティーです。
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
    direction?: ResizableDirection | undefined;

    /**
     * {@link direction} の別名です。
     */
    orientation?: ResizableDirection | undefined;

    /**
     * パネルサイズの配列が変化したときに呼び出されます。
     */
    onLayout?: ((sizes: readonly number[]) => void) | undefined;
  };

/**
 * リサイズ可能なパネル群のルート要素です。
 *
 * 子要素には {@link Panel} と {@link Handle} を交互に配置します。
 */
export const ResizableRoot: IComponent<ResizableRootProps> = function SuiResizableRoot(props) {
  const {
    ref,
    render = <ExternalGroup />,
    children,
    onLayout,
    className,
    onLayoutChange,
    direction: directionProp,
    orientation: orientationProp,
    resizeTargetMinimumSize: resizeTargetMinimumSizeProp,
    ...otherProps
  } = props;
  const direction = directionProp ?? orientationProp ?? "horizontal";
  const resizeTargetMinimumSize = {
    coarse: Math.max(
      resizeTargetMinimumSizeProp?.coarse ?? DEFAULT_RESIZE_TARGET_MINIMUM_SIZE.coarse,
      RESIZABLE_HANDLE_HIT_SIZE,
    ),
    fine: Math.max(
      resizeTargetMinimumSizeProp?.fine ?? DEFAULT_RESIZE_TARGET_MINIMUM_SIZE.fine,
      RESIZABLE_HANDLE_HIT_SIZE,
    ),
  };
  const state: ResizableRootState = { direction };

  const handleLayoutChange = (layout: Parameters<NonNullable<GroupProps["onLayoutChange"]>>[0]) => {
    onLayoutChange?.(layout);
    onLayout?.(Object.values(layout));
  };
  const element = useRender({
    defaultTagName: "div",
    ref,
    state,
    props: {
      ...otherProps,
      render,
      children,
      className: cn(className, `sui_resizable sui_resizable-direction_${direction}`),
      orientation: direction,
      onLayoutChange: handleLayoutChange,
      resizeTargetMinimumSize,
      "data-direction": direction,
    },
  });

  const context = React.useMemo(() => ({ direction }), [direction]);
  return <Context value={context}>{element}</Context>;
};

/**
 * {@link ResizableRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link ResizableRoot} の状態型です。
   */
  export type State = ResizableRootState;

  /**
   * {@link ResizableRoot} のプロパティー型です。
   */
  export type Props = ResizableRootProps;
}

/**
 * {@link ResizableRoot} の別名です。
 */
export const Root: IComponent<Root.Props> = ResizableRoot;

// Panel
// -----

/**
 * {@link ResizablePanel} の状態です。
 */
export type ResizablePanelState = {
  /**
   * パネル群の向きです。
   */
  readonly direction: ResizableDirection;
};

/**
 * {@link ResizablePanel} に渡すプロパティーです。
 */
export type ResizablePanelProps = Omit<
  PanelProps,
  "children" | "className" | "defaultSize" | "maxSize" | "minSize" | "onResize" | "style"
> &
  Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<ResizablePanelState> & {
    /**
     * パネルの初期サイズを指定します。
     */
    defaultSize?: ResizablePanelSize | undefined;

    /**
     * パネルのサイズを制御します。
     */
    size?: ResizablePanelSize | undefined;

    /**
     * パネルが小さくなるときの最小サイズを指定します。
     */
    minSize?: ResizablePanelSize | undefined;

    /**
     * パネルが大きくなるときの最大サイズを指定します。
     */
    maxSize?: ResizablePanelSize | undefined;

    /**
     * パネルサイズが変化したときに、パーセント値で呼び出されます。
     */
    onSizeChange?: ((size: number) => void) | undefined;

    /**
     * パネルの並び順を明示します。
     */
    order?: number | undefined;

    /**
     * パネルサイズが変化したときに呼び出されます。
     */
    onResize?: PanelProps["onResize"];
  };

/**
 * サイズを変更できるパネル要素です。
 *
 * `size` を指定すると、外部ライブラリーの命令型 API を使ってサイズを更新します。
 * 数値のサイズはパーセントとして扱います。
 */
export const ResizablePanel: IComponent<ResizablePanelProps> = function SuiResizablePanel(props) {
  const { direction } = useResizableContext(true) ?? { direction: "horizontal" };
  const {
    ref,
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
    ...otherProps
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
    ref,
    state,
    props: {
      ...otherProps,
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
  });

  return element;
};

/**
 * {@link ResizablePanel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Panel {
  /**
   * {@link ResizablePanel} の状態型です。
   */
  export type State = ResizablePanelState;

  /**
   * {@link ResizablePanel} のプロパティー型です。
   */
  export type Props = ResizablePanelProps;
}

/**
 * {@link ResizablePanel} の別名です。
 */
export const Panel: IComponent<Panel.Props> = ResizablePanel;

// Handle
// ------

/**
 * {@link ResizableHandle} の状態です。
 */
export type ResizableHandleState = {
  /**
   * パネル群の向きです。
   */
  readonly direction: ResizableDirection;

  /**
   * ハンドルが無効かどうかです。
   */
  readonly disabled: boolean;
};

/**
 * {@link ResizableHandle} に渡すプロパティーです。
 */
export type ResizableHandleProps = Omit<SeparatorProps, "children" | "className" | "style"> &
  Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<ResizableHandleState> & {
    /**
     * 中央にグリップを表示します。
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
  const { direction } = useResizableContext(true) ?? { direction: "horizontal" };
  const {
    ref,
    render = <Separator />,
    children,
    disabled = false,
    className,
    withHandle = false,
    ...otherProps
  } = props;
  const state: ResizableHandleState = { direction, disabled };

  return useRender({
    defaultTagName: "div",
    ref,
    state,
    props: {
      ...otherProps,
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
        `sui_resizable_handle-direction_${direction}`,
      ),
      "data-direction": direction,
      "aria-orientation": direction === "horizontal" ? "vertical" : "horizontal",
    },
  });
};

/**
 * {@link ResizableHandle} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Handle {
  /**
   * {@link ResizableHandle} の状態型です。
   */
  export type State = ResizableHandleState;

  /**
   * {@link ResizableHandle} のプロパティー型です。
   */
  export type Props = ResizableHandleProps;
}

/**
 * {@link ResizableHandle} の別名です。
 */
export const Handle: IComponent<Handle.Props> = ResizableHandle;
