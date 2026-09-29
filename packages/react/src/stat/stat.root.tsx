import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size } from "@suru-ui/theme";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * 統計の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type StatRootSize = Size;

/**
 * {@link StatRoot} が持つ状態です。
 */
export type StatRootState = {};

export namespace StatRootProps {
  export type Render = RenderProps<StatRootState>;

  export type SuruUI = {
    /**
     * 統計の大きさを指定します。
     *
     * @default "md"
     */
    size?: StatRootSize | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"dl", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link StatRoot} に渡す props です。
 */
export type StatRootProps = StatRootProps.Render &
  StatRootProps.SuruUI &
  StatRootProps.BaseUI &
  StatRootProps.HTML;

export type IStatRoot = IComponent<StatRootProps>;

/**
 * ラベルと値の組で統計を表示するルートコンポーネントです。
 *
 * `dl` 要素を描画し、大きさを修飾クラスとして子パーツのスタイルへ反映します。
 */
export const StatRoot: IStatRoot = function SuiStatRoot(props) {
  const {
    size = "md",
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherDlProps
  } = props;

  return useRender({
    props: [
      otherDlProps,
      {
        className: cn("sui_stat", `sui_stat-size_${size}`),
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "dl",
  });
};

export { StatRoot as Root };

export namespace Root {
  export type State = StatRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = StatRootProps.Render;

    export type SuruUI = StatRootProps.SuruUI;

    export type BaseUI = StatRootProps.BaseUI;

    export type HTML = StatRootProps.HTML;
  }

  export type Size = StatRootSize;
}
