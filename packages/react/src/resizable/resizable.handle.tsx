import * as React from "react";
import { Separator } from "react-resizable-panels";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { useResizableContext } from "./resizable.context.js";

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
