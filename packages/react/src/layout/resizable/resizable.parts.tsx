import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import * as React from "react";
import {
  Group,
  Panel as ExternalPanel,
  Separator,
  type GroupProps,
  type PanelImperativeHandle,
  type PanelProps,
  type SeparatorProps,
} from "react-resizable-panels";

import cn from "../../cn.js";
import { ContextMissingError } from "../../errors.js";
import type { Component } from "../../types.js";

import "./resizable.css";

// Context
// -------

export type ResizableDirection = "horizontal" | "vertical";

type ResizableContextValue = {
  readonly direction: ResizableDirection;
};

const ResizableContext = React.createContext<ResizableContextValue | null>(null);

function useResizableContext(): ResizableContextValue {
  const context = React.use(ResizableContext);
  if (context === null) {
    throw new ContextMissingError({
      contextName: "ResizableContext",
      providerName: "ResizableParts.Root",
    });
  }

  return context;
}

function resolveClassName<State>(
  className: string | ((state: State) => string | undefined) | undefined,
  state: State,
  fixedClassName: string,
): string | undefined {
  const resolvedClassName = typeof className === "function" ? className(state) : className;
  return cn(resolvedClassName, fixedClassName);
}

function resolveStyle<State>(
  style: React.CSSProperties | ((state: State) => React.CSSProperties | undefined) | undefined,
  state: State,
): React.CSSProperties | undefined {
  return typeof style === "function" ? style(state) : style;
}

function normalizePanelSize(value: number | string | undefined): number | string | undefined {
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
 * {@link Root} の状態です。
 */
export type ResizableRootState = {
  /**
   * パネル群の向きです。
   */
  readonly direction: ResizableDirection;
};

/**
 * {@link Root} に渡すプロパティーです。
 */
export type ResizableRootProps = Omit<
  GroupProps,
  "children" | "className" | "orientation" | "style"
> &
  useRender.ComponentProps<"div", ResizableRootState> & {
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
 *
 * @example
 * ```tsx
 * <ResizableParts.Root direction="horizontal">
 *   <ResizableParts.Panel defaultSize={35}>サイドバー</ResizableParts.Panel>
 *   <ResizableParts.Handle />
 *   <ResizableParts.Panel>コンテンツ</ResizableParts.Panel>
 * </ResizableParts.Root>
 * ```
 */
export const ResizableRoot: Component<ResizableRootProps> = function SuiResizableRoot(props) {
  const {
    children,
    className,
    direction: directionProp,
    orientation: orientationProp,
    onLayout,
    onLayoutChange,
    render,
    ref,
    resizeTargetMinimumSize: resizeTargetMinimumSizeProp,
    style,
    ...elementProps
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
  const visualProps = mergeProps<"div">(
    {
      className: `sui_resizable sui_resizable-direction_${direction}`,
    },
    {
      className: resolveClassName(className, state, ""),
      style: resolveStyle(style, state),
    },
  );
  const handleLayoutChange = (layout: Parameters<NonNullable<GroupProps["onLayoutChange"]>>[0]) => {
    onLayoutChange?.(layout);
    onLayout?.(Object.values(layout));
  };
  const element = useRender({
    defaultTagName: "div",
    render: render ?? <Group />,
    ref,
    state,
    props: {
      ...elementProps,
      ...visualProps,
      children,
      orientation: direction,
      onLayoutChange: handleLayoutChange,
      resizeTargetMinimumSize,
      "data-direction": direction,
    },
  });

  const context = React.useMemo(() => ({ direction }), [direction]);
  return <ResizableContext value={context}>{element}</ResizableContext>;
};

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
export const Root: Component<Root.Props> = ResizableRoot;

// Panel
// -----

/**
 * {@link Panel} の状態です。
 */
export type ResizablePanelState = {
  /**
   * パネル群の向きです。
   */
  readonly direction: ResizableDirection;
};

/**
 * {@link Panel} に渡すプロパティーです。
 */
export type ResizablePanelProps = Omit<
  PanelProps,
  "children" | "className" | "defaultSize" | "maxSize" | "minSize" | "onResize" | "style"
> &
  useRender.ComponentProps<"div", ResizablePanelState> & {
    /**
     * パネルの初期サイズを指定します。
     *
     * 数値はパーセントとして扱い、単位付きの文字列はそのまま外部ライブラリーへ渡します。
     */
    defaultSize?: number | string | undefined;

    /**
     * パネルのサイズを制御します。
     */
    size?: number | string | undefined;

    /**
     * パネルが小さくなるときの最小サイズを指定します。
     */
    minSize?: number | string | undefined;

    /**
     * パネルが大きくなるときの最大サイズを指定します。
     */
    maxSize?: number | string | undefined;

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
 *
 * @example
 * ```tsx
 * <ResizableParts.Panel defaultSize={30} minSize={20}>
 *   サイドバー
 * </ResizableParts.Panel>
 * ```
 */
export const ResizablePanel: Component<ResizablePanelProps> = function SuiResizablePanel(props) {
  const { direction } = useResizableContext();
  const {
    children,
    className,
    defaultSize,
    maxSize,
    minSize,
    onResize,
    onSizeChange,
    order,
    panelRef: panelRefProp,
    render,
    ref,
    size,
    style,
    ...elementProps
  } = props;
  const state: ResizablePanelState = { direction };
  const internalPanelRef = React.useRef<PanelImperativeHandle>(null);
  const panelRef = useMergedRefs(internalPanelRef, panelRefProp);
  const panelSize = normalizePanelSize(size ?? defaultSize);
  const visualProps = mergeProps<"div">(
    {
      className: "sui_resizable_panel",
    },
    {
      className: resolveClassName(className, state, ""),
      style: resolveStyle(style, state),
    },
  );

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
    render: render ?? <ExternalPanel />,
    ref,
    state,
    props: {
      ...elementProps,
      ...visualProps,
      children,
      defaultSize: panelSize,
      minSize: normalizePanelSize(minSize),
      maxSize: normalizePanelSize(maxSize),
      onResize: handleResize,
      panelRef,
      "data-order": order === undefined ? undefined : String(order),
    },
  });

  return element;
};

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
export const Panel: Component<Panel.Props> = ResizablePanel;

// Handle
// ------

/**
 * {@link Handle} の状態です。
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
 * {@link Handle} に渡すプロパティーです。
 */
export type ResizableHandleProps = Omit<SeparatorProps, "children" | "className" | "style"> &
  useRender.ComponentProps<"div", ResizableHandleState> & {
    /**
     * 中央にグリップを表示します。
     */
    withHandle?: boolean | undefined;
  };

/**
 * 隣接するパネルのサイズを変更するハンドルです。
 *
 * マウス、タッチ、ペンのポインター操作と、矢印キーによる操作に対応します。
 *
 * @example
 * ```tsx
 * <ResizableParts.Handle withHandle />
 * ```
 */
export const ResizableHandle: Component<ResizableHandleProps> = function SuiResizableHandle(props) {
  const { direction } = useResizableContext();
  const {
    children,
    className,
    disabled = false,
    render,
    ref,
    style,
    withHandle = false,
    ...elementProps
  } = props;
  const state: ResizableHandleState = { direction, disabled };
  const visualProps = mergeProps<"div">(
    {
      className: cn(
        "sui_resizable_handle",
        disabled && "sui_resizable_handle-disabled",
        `sui_resizable_handle-direction_${direction}`,
      ),
    },
    {
      className: resolveClassName(className, state, ""),
      style: resolveStyle(style, state),
    },
  );
  const grip = useRender({
    defaultTagName: "span",
    state,
    props: {
      className: "sui_resizable_handle_grip",
      children,
    },
  });
  return useRender({
    defaultTagName: "div",
    render: render ?? <Separator />,
    ref,
    state,
    props: {
      ...elementProps,
      ...visualProps,
      children: withHandle ? grip : children,
      disabled,
      "aria-orientation": direction === "horizontal" ? "vertical" : "horizontal",
      "data-direction": direction,
    },
  });
};

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
export const Handle: Component<Handle.Props> = ResizableHandle;
