import { Avatar } from "@base-ui/react/avatar";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AvatarFallback} が持つ状態です。
 */
export type AvatarFallbackState = Avatar.Fallback.State;

export namespace AvatarFallbackProps {
  export type Render = RenderProps<AvatarFallbackState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Avatar.Fallback>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AvatarFallbackProps:
      "delay",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Avatar.Fallback>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AvatarFallback} に渡す props です。
 */
export type AvatarFallbackProps = AvatarFallbackProps.Render &
  AvatarFallbackProps.SuruUI &
  AvatarFallbackProps.BaseUI &
  AvatarFallbackProps.HTML;

export type IAvatarFallback = IComponent<AvatarFallbackProps>;

/**
 * アバターのフォールバックを表示するコンポーネントです。
 */
export const AvatarFallback: IAvatarFallback = function SuiAvatarFallback(props) {
  const { className, ...otherProps } = props;

  return <Avatar.Fallback {...otherProps} className={cn(className, "sui_avatar_fallback")} />;
};

export { AvatarFallback as Fallback };

export namespace Fallback {
  export type State = AvatarFallbackState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AvatarFallbackProps.Render;

    export type SuruUI = AvatarFallbackProps.SuruUI;

    export type BaseUI = AvatarFallbackProps.BaseUI;

    export type HTML = AvatarFallbackProps.HTML;
  }
}
