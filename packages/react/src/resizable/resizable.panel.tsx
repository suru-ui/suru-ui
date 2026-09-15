import { useControlled } from "@base-ui/utils/useControlled";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import * as React from "react";
import {
  type PanelProps,
  type PanelImperativeHandle,
  Panel as ExternalPanel,
} from "react-resizable-panels";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { useResizableContext } from "./resizable.context.js";
import type { ResizableRootOrientation } from "./resizable.root.jsx";

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
