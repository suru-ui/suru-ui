import { Avatar } from "@base-ui/react/avatar";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AvatarImage} が持つ状態です。
 */
export type AvatarImageState = Avatar.Image.State;

export namespace AvatarImageProps {
  export type Render = RenderProps<AvatarImageState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Avatar.Image>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AvatarImageProps:
      "onLoadingStatusChange",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Avatar.Image>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AvatarImage} に渡す props です。
 */
export type AvatarImageProps = AvatarImageProps.Render &
  AvatarImageProps.SuruUI &
  AvatarImageProps.BaseUI &
  AvatarImageProps.HTML;

export type IAvatarImage = IComponent<AvatarImageProps>;

/**
 * アバターの画像コンポーネントです。
 *
 * 画像の読み込みに失敗すると、{@link AvatarFallback} を表示します。
 */
export const AvatarImage: IAvatarImage = function SuiAvatarImage(props) {
  const { className, ...otherProps } = props;

  return (
    <Avatar.Image
      {...otherProps}
      className={cn<AvatarImageState>(
        className,
        "sui_avatar_image",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_avatar_image-transition_status_${state.transitionStatus}`,
        (state) => `sui_avatar_image-image_loading_status_${state.imageLoadingStatus}`,
      )}
    />
  );
};

export { AvatarImage as Image };

export namespace Image {
  export type State = AvatarImageState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AvatarImageProps.Render;

    export type SuruUI = AvatarImageProps.SuruUI;

    export type BaseUI = AvatarImageProps.BaseUI;

    export type HTML = AvatarImageProps.HTML;
  }
}
