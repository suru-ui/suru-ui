import { useControlled } from "@base-ui/utils/useControlled";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import * as React from "react";
import {
  type PanelProps,
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
export type ResizableContextOrientation = "horizontal" | "vertical";

/**
 * {@link ResizableRoot} が子パーツへ提供するコンテキストの型です。
 */
export type ResizableContext = {
  /**
   * パネル群の向きです。
   */
  readonly orientation: ResizableContextOrientation;
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
  export type Orientation = ResizableContextOrientation;
}

// Root
// ----

/**
 * リサイズ可能なパネル群の向きです。
 *
 * - `"horizontal"`: 水平方向にパネルを並べます。
 * - `"vertical"`: 垂直方向にパネルを並べます。
 */
export type ResizableRootOrientation = "horizontal" | "vertical";

/**
 * {@link ResizableRoot} が持つ状態です。
 */
export type ResizableRootState = {
  /**
   * パネル群の向きです。
   */
  readonly orientation: ResizableRootOrientation;
};

export namespace ResizableRootProps {
  export type Render = Omit<RenderProps<ResizableRootState>, "render">;

  export type SuruUI = {
    /**
     * パネルを並べる向きです。
     *
     * @default "horizontal"
     */
    orientation?: ResizableRootOrientation | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof ExternalGroup>,
    Exclude<
      // react-resizable-panels の型を確認して取り出すプロパティーを決めます。
      // GroupProps:
      | "defaultLayout"
      | "disableCursor"
      | "disabled"
      | "elementRef"
      | "groupRef"
      | "id"
      | "onLayoutChange"
      | "onLayoutChanged"
      | "resizeTargetMinimumSize",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ExternalGroup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ResizableRoot} に渡す props です。
 */
export type ResizableRootProps = ResizableRootProps.Render &
  ResizableRootProps.SuruUI &
  ResizableRootProps.BaseUI &
  ResizableRootProps.HTML;

// resizeTargetMinimumSize は、ポインターでリサイズを始められる当たり判定の最小サイズ (px) です。
// 対象はパネル群内の各ハンドルとパネルの端で、要素の見た目やレイアウトには影響しません。
// 判定領域が最小サイズより小さい場合は、中心から上下左右へ対称に広げて補われます。
// fine はマウスやペン、coarse はタッチに使われ、`(pointer: coarse)` に一致するかで自動的に切り替わります。
// 大きくすると掴みやすくなる代わりに、隣り合う判定領域が重なって狙ったハンドルを掴みにくくなることがあります。
const DEFAULT_RESIZE_TARGET_MINIMUM_SIZE = {
  // fine はマウスやペンなど精度の高いポインターに使われます。
  fine: 8,
  // coarse はタッチなど精度の低いポインターに使われます。
  coarse: 20,
};

/**
 * リサイズ可能なパネル群のルート要素です。
 *
 * 子要素には {@link ResizablePanel} と {@link ResizableHandle} を交互に配置します。
 */
export const ResizableRoot: IComponent<ResizableRootProps> = function SuiResizableRoot(props) {
  const {
    orientation = "horizontal",
    resizeTargetMinimumSize = DEFAULT_RESIZE_TARGET_MINIMUM_SIZE,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const ctx = React.useMemo<ResizableContext>(() => ({ orientation }), [orientation]);
  const element = useRender({
    props: [
      otherProps,
      {
        render: <ExternalGroup />,
        className: cn<ResizableRootState>(
          "sui_resizable",
          (state) => `sui_resizable-orientation_${state.orientation}`,
        ),
        orientation,
        resizeTargetMinimumSize,
        "data-scope": dataScope,
      },
    ],
    state: {
      orientation,
    },
    defaultTagName: "div",
  });

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
  readonly orientation: ResizableRootOrientation;
};

export namespace ResizablePanelProps {
  export type Render = Omit<RenderProps<ResizablePanelState>, "render">;

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
     * パネルのサイズを制御します。
     *
     * 数値はパーセントとして扱われます。
     */
    size?: ResizablePanelSize | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof ExternalPanel>,
    Exclude<
      // react-resizable-panels の型を確認して取り出すプロパティーを決めます。
      // PanelProps:
      | "collapsedSize"
      | "collapsible"
      | "disabled"
      | "elementRef"
      | "groupResizeBehavior"
      | "id"
      | "panelRef",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ExternalPanel>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ResizablePanel} に渡す props です。
 */
export type ResizablePanelProps = ResizablePanelProps.Render &
  ResizablePanelProps.SuruUI &
  ResizablePanelProps.BaseUI &
  ResizablePanelProps.HTML;

function normalizePanelSize(value: ResizablePanelSize | undefined): ResizablePanelSize | undefined {
  return typeof value === "number" ? value + "%" : value;
}

/**
 * サイズを変更できるパネル要素です。
 *
 * `size` を指定すると、外部ライブラリーの命令型 API を使ってサイズを更新します。
 * 数値のサイズはパーセントとして扱います。
 */
export const ResizablePanel: IComponent<ResizablePanelProps> = function SuiResizablePanel(props) {
  const ctx = useResizableContext();
  const {
    size: sizeProp,
    maxSize,
    minSize,
    children,
    onResize,
    panelRef: panelRefProp,
    defaultSize,
    onSizeChange,
    ...otherProps
  } = props;
  const internalPanelRef = React.useRef<PanelImperativeHandle>(null);
  const panelRef = useMergedRefs(internalPanelRef, panelRefProp);
  const [size, setSize] = useControlled({
    name: "ResizablePanel",
    state: "size",
    default: defaultSize,
    controlled: sizeProp,
  });
  const handleResize: PanelProps["onResize"] = (nextSize, id, previousSize) => {
    setSize(nextSize.asPercentage);
    onResize?.(nextSize, id, previousSize);
    onSizeChange?.(nextSize.asPercentage);
  };

  React.useEffect(() => {
    if (size !== undefined) {
      const nextSize = normalizePanelSize(size);
      if (nextSize !== undefined) {
        internalPanelRef.current?.resize(nextSize);
      }
    }
  }, [size]);

  return useRender({
    props: [
      otherProps,
      {
        render: <ExternalPanel />,
        maxSize: normalizePanelSize(maxSize),
        minSize: normalizePanelSize(minSize),
        children,
        onResize: handleResize,
        panelRef,
        className: cn<ResizablePanelState>("sui_resizable_panel"),
      },
    ],
    state: {
      orientation: ctx.orientation,
    },
    defaultTagName: "div",
  });
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
 * ハンドルの向きです。
 *
 * - `"horizontal"`: 水平方向のハンドルです。
 * - `"vertical"`: 垂直方向のハンドルです。
 */
export type ResizableHandleDirection = "horizontal" | "vertical";

/**
 * {@link ResizableHandle} が持つ状態です。
 */
export type ResizableHandleState = {
  /**
   * ハンドルの向きです。
   */
  readonly direction: ResizableHandleDirection;

  /**
   * ハンドルが無効かどうかです。
   */
  readonly disabled: boolean;

  /**
   * ハンドルを非表示にするかどうかです。
   */
  readonly invisible: boolean;
};

export namespace ResizableHandleProps {
  export type Render = Omit<RenderProps<ResizableHandleState>, "render">;

  export type SuruUI = {
    /**
     * ハンドルを非表示にするかどうかです。
     *
     * 非表示にすると太さが 0 になりますが、判定領域は残るためリサイズは引き続き可能です。
     *
     * @default false
     */
    invisible?: boolean | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Separator>,
    Exclude<
      // react-resizable-panels の型を確認して取り出すプロパティーを決めます。
      // SeparatorProps:
      "disabled" | "disableDoubleClick" | "elementRef" | "id",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Separator>,
    keyof Render | keyof SuruUI | keyof BaseUI
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
  const ctx = useResizableContext();
  const { disabled = false, invisible = false, ...otherProps } = props;
  // ハンドルはパネル群と直交するため、ルートの orientation とは逆の向きになります。
  const direction = ctx.orientation === "horizontal" ? "vertical" : "horizontal";

  return useRender({
    props: [
      otherProps,
      {
        render: <Separator />,
        disabled,
        className: cn<ResizableHandleState>(
          "sui_resizable_handle",
          `sui_resizable_handle-direction_${direction}`,
          (state) => state.invisible && "sui_resizable_handle-invisible",
          (state) => state.disabled && "sui_resizable_handle-disabled",
        ),
        "aria-orientation": direction,
      },
    ],
    state: {
      disabled,
      direction,
      invisible,
    },
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

  export type Direction = ResizableHandleDirection;
}
