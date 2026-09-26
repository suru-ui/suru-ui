import { Avatar } from "@base-ui/react/avatar";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import { useAvatarGroupContext } from "../avatar-group/avatar-group.context.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * アバターの配色です。
 */
export type AvatarRootColor = Color;

/**
 * アバターの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 完全な丸形
 */
export type AvatarRootRadius = "none" | Size | "full";

/**
 * アバターの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AvatarRootSize = Size;

/**
 * {@link AvatarRoot} が持つ状態です。
 */
export type AvatarRootState = Avatar.Root.State;

export namespace AvatarRootProps {
  export type Render = RenderProps<AvatarRootState>;

  export type SuruUI = {
    /**
     * アバターの色を指定します。
     *
     * @default "grey"
     */
    color?: AvatarRootColor | undefined;

    /**
     * アバターの角丸を指定します。
     *
     * @default "full"
     */
    radius?: AvatarRootRadius | undefined;

    /**
     * アバターの大きさを指定します。
     *
     * @default "md"
     */
    size?: AvatarRootSize | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Avatar.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AvatarRootProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Avatar.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AvatarRoot} に渡す props です。
 */
export type AvatarRootProps = AvatarRootProps.Render &
  AvatarRootProps.SuruUI &
  AvatarRootProps.BaseUI &
  AvatarRootProps.HTML;

/**
 * アバターのルートコンポーネントです。
 *
 * 画像の読み込み状態を管理し、大きさ・配色・角丸を子パーツへ伝播します。
 */
export const AvatarRoot: IComponent<AvatarRootProps> = function SuiAvatarRoot(props) {
  const group = useAvatarGroupContext(true);
  const {
    size: sizeProp = "md",
    color: colorProp,
    radius: radiusProp,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const size = group?.size ?? sizeProp;
  const color = colorProp ?? group?.color ?? "grey";
  const radius = radiusProp ?? group?.radius ?? "full";

  return (
    <Avatar.Root
      {...otherProps}
      className={cn(
        className,
        "sui_avatar",
        `sui_avatar-size_${size}`,
        `sui_avatar-color_${color}`,
        `sui_avatar-radius_${radius}`,
      )}
      data-scope={dataScope}
    />
  );
};

export { AvatarRoot as Root };

export namespace Root {
  export type State = AvatarRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AvatarRootProps.Render;

    export type SuruUI = AvatarRootProps.SuruUI;

    export type BaseUI = AvatarRootProps.BaseUI;

    export type HTML = AvatarRootProps.HTML;
  }

  export type Color = AvatarRootColor;

  export type Radius = AvatarRootRadius;

  export type Size = AvatarRootSize;
}
