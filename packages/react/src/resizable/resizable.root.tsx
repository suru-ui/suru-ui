import * as React from "react";
import { Group as ExternalGroup } from "react-resizable-panels";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { type ResizableContextOrientation, ResizableContext } from "./resizable.context.js";

/**
 * リサイズ可能なパネル群の向きです。
 *
 * - `"horizontal"`: 水平方向にパネルを並べます。
 * - `"vertical"`: 垂直方向にパネルを並べます。
 */
export type ResizableRootOrientation = ResizableContextOrientation;

/**
 * {@link ResizableRoot} が持つ状態です。
 */
export type ResizableRootState = ResizableContext;

export namespace ResizableRootProps {
  export type Render = RenderProps<ResizableRootState>;

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

export type IResizableRoot = IComponent<ResizableRootProps>;

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
export const ResizableRoot: IResizableRoot = function SuiResizableRoot(props) {
  const {
    render = <ExternalGroup />,
    orientation = "horizontal",
    resizeTargetMinimumSize = DEFAULT_RESIZE_TARGET_MINIMUM_SIZE,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const ctx = React.useMemo<ResizableContext>(() => ({ orientation }), [orientation]);
  const element = useRender({
    props: [
      { ...otherProps, render },
      {
        className: cn<ResizableRootState>(
          "sui_resizable",
          (state) => `sui_resizable-orientation_${state.orientation}`,
        ),
        orientation,
        resizeTargetMinimumSize,
        "data-scope": dataScope,
      },
    ],
    state: ctx,
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
