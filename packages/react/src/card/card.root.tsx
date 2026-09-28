import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import Config from "../_config.jsx";
import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * カードの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type CardRootRadius = "none" | Size;

/**
 * カードの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type CardRootSize = Size;

/**
 * {@link CardRoot} が持つ状態です。
 */
export type CardRootState = {};

export namespace CardRootProps {
  export type Render = RenderProps<CardRootState>;

  export type SuruUI = {
    /**
     * カードに枠線を表示するかどうかを指定します。
     */
    outlined?: boolean | undefined;

    /**
     * カードの角丸を指定します。
     *
     * 既定値は {@link CardRootProps.size|size} です。
     */
    radius?: CardRootRadius | undefined;

    /**
     * カードの大きさを指定します。
     *
     * @default "md"
     */
    size?: CardRootSize | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link CardRoot} に渡す props です。
 */
export type CardRootProps = CardRootProps.Render &
  CardRootProps.SuruUI &
  CardRootProps.BaseUI &
  CardRootProps.HTML;

export type ICardRoot = IComponent<CardRootProps>;

/**
 * カードの各パーツをまとめるルートコンポーネントです。
 */
export const CardRoot: ICardRoot = function SuiCardRoot(props) {
  const config = React.use(Config);
  const {
    size = "md",
    radius = size,
    outlined = false,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherDivProps
  } = props;
  const element = useRender({
    props: [
      otherDivProps,
      {
        className: cn(
          "sui_card",
          `sui_card-size_${size}`,
          `sui_card-radius_${radius}`,
          outlined && "sui_card-outlined",
        ),
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "div",
  });

  return (
    <config.Context size={size} radius={radius}>
      {element}
    </config.Context>
  );
};

export { CardRoot as Root };

export namespace Root {
  export type State = CardRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = CardRootProps.Render;

    export type SuruUI = CardRootProps.SuruUI;

    export type BaseUI = CardRootProps.BaseUI;

    export type HTML = CardRootProps.HTML;
  }

  export type Radius = CardRootRadius;

  export type Size = CardRootSize;
}
