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
  export type Direction = ResizableContextDirection;
}

function normalizePanelSize(value: ResizablePanelSize | undefined): ResizablePanelSize | undefined {
  return typeof value === "number" ? `${value}%` : value;
}

const RESIZABLE_HANDLE_HIT_SIZE = 16;

const DEFAULT_RESIZE_TARGET_MINIMUM_SIZE = {
  fine: RESIZABLE_HANDLE_HIT_SIZE,
  coarse: 20,
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

export namespace ResizableRootProps {
  export type Render = RenderProps<ResizableRootState>;

  export type SuruUI = {
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

  export type BaseUI = Omit<GroupProps, keyof Render | keyof SuruUI | "children">;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof Omit<GroupProps, "children">
  >;
}

/**
 * {@link ResizableRoot} に渡す props です。
 */
export type ResizableRootProps = ResizableRootProps.Render &
  ResizableRootProps.SuruUI &
  ResizableRootProps.BaseUI &
  ResizableRootProps.HTML;

/**
 * リサイズ可能なパネル群のルート要素です。
 *
 * 子要素には {@link ResizablePanel} と {@link ResizableHandle} を交互に配置します。
 */
export const ResizableRoot: IComponent<ResizableRootProps> = function SuiResizableRoot(props) {
  const {
    render = <ExternalGroup />,
    children,
    onLayout,
    direction: directionProp,
    orientation: orientationProp,
    onLayoutChange,
    resizeTargetMinimumSize: resizeTargetMinimumSizeProp,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherDivProps
  } = props;
  const direction = directionProp ?? orientationProp ?? "horizontal";
  const resizeTargetMinimumSize = {
    fine:
      resizeTargetMinimumSizeProp?.fine ??
      Math.max(DEFAULT_RESIZE_TARGET_MINIMUM_SIZE.fine, RESIZABLE_HANDLE_HIT_SIZE),
    coarse:
      resizeTargetMinimumSizeProp?.coarse ??
      Math.max(DEFAULT_RESIZE_TARGET_MINIMUM_SIZE.coarse, RESIZABLE_HANDLE_HIT_SIZE),
  };
  const state: ResizableRootState = { direction };

  const handleLayoutChange = (layout: Parameters<NonNullable<GroupProps["onLayoutChange"]>>[0]) => {
    onLayoutChange?.(layout);
    onLayout?.(Object.values(layout));
  };
  const element = useRender({
    props: [
      otherDivProps,
      {
        render,
        children,
        className: "sui_resizable",
        orientation: direction,
        onLayoutChange: handleLayoutChange,
        resizeTargetMinimumSize,
        "data-scope": dataScope,
        "data-direction": direction,
      },
    ],
    state,
    defaultTagName: "div",
  });

  const ctx = React.useMemo<ResizableContext>(() => ({ direction }), [direction]);
  return <ResizableContext value={ctx}>{element}</ResizableContext>;
};

export { ResizableRoot as Root };

export namespace Root {
  export type State = ResizableRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ResizableRootProps.Render;

    export type SuruUI = ResizableRootProps.SuruUI;

    export type BaseUI = ResizableRootProps.BaseUI;

    export type HTML = ResizableRootProps.HTML;
  }

  export type Direction = ResizableRootDirection;

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

export namespace ResizablePanelProps {
  export type Render = RenderProps<ResizablePanelState>;

  export type SuruUI = {
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

  export type BaseUI = Omit<PanelProps, keyof Render | keyof SuruUI | "children">;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof Omit<PanelProps, "children">
  >;
}

/**
 * {@link ResizablePanel} に渡す props です。
 */
export type ResizablePanelProps = ResizablePanelProps.Render &
  ResizablePanelProps.SuruUI &
  ResizablePanelProps.BaseUI &
  ResizablePanelProps.HTML;

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
    props: [
      otherDivProps,
      {
        render,
        maxSize: normalizePanelSize(maxSize),
        minSize: normalizePanelSize(minSize),
        children,
        onResize: handleResize,
        panelRef,
        className: "sui_resizable_panel",
        defaultSize: panelSize,
        "data-order": order === undefined ? undefined : String(order),
      },
    ],
    state,
    defaultTagName: "div",
  });

  return element;
};

export { ResizablePanel as Panel };

export namespace Panel {
  export type State = ResizablePanelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ResizablePanelProps.Render;

    export type SuruUI = ResizablePanelProps.SuruUI;

    export type BaseUI = ResizablePanelProps.BaseUI;

    export type HTML = ResizablePanelProps.HTML;
  }

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

export namespace ResizableHandleProps {
  export type Render = RenderProps<ResizableHandleState>;

  export type SuruUI = {
    /**
     * 中央にグリップを表示するかどうかを指定します。
     *
     * @default false
     */
    withHandle?: boolean | undefined;
  };

  export type BaseUI = Omit<SeparatorProps, keyof Render | keyof SuruUI | "children">;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof Omit<SeparatorProps, "children">
  >;
}

/**
 * {@link ResizableHandle} に渡す props です。
 */
export type ResizableHandleProps = ResizableHandleProps.Render &
  ResizableHandleProps.SuruUI &
  ResizableHandleProps.BaseUI &
  ResizableHandleProps.HTML;

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
    withHandle = false,
    ...otherDivProps
  } = props;
  const state: ResizableHandleState = { disabled, direction };

  return useRender({
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
          "sui_resizable_handle",
          (state: ResizableHandleState) => state.disabled && "sui_resizable_handle-disabled",
        ),
        "aria-orientation": direction === "horizontal" ? "vertical" : "horizontal",
        "data-direction": direction,
      },
    ],
    state,
    defaultTagName: "div",
  });
};

export { ResizableHandle as Handle };

export namespace Handle {
  export type State = ResizableHandleState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ResizableHandleProps.Render;

    export type SuruUI = ResizableHandleProps.SuruUI;

    export type BaseUI = ResizableHandleProps.BaseUI;

    export type HTML = ResizableHandleProps.HTML;
  }
}
