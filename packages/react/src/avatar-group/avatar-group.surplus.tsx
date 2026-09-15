import { type RenderProps } from "../_use-render.js";
import * as Avatar from "../avatar/avatar.parts.js";
import type { IComponent } from "../types.js";

/**
 * {@link AvatarGroupSurplus} が持つ状態です。
 */
export type AvatarGroupSurplusState = Avatar.Root.State;

export namespace AvatarGroupSurplusProps {
  export type Render = RenderProps<AvatarGroupSurplusState>;

  export type SuruUI = Avatar.Root.Props.SuruUI;

  export type BaseUI = Omit<Avatar.Root.Props.BaseUI, keyof Render | keyof SuruUI>;

  export type HTML = Omit<Avatar.Root.Props, keyof Render | keyof SuruUI | keyof BaseUI>;
}

/**
 * {@link AvatarGroupSurplus} に渡す props です。
 */
export type AvatarGroupSurplusProps = AvatarGroupSurplusProps.Render &
  AvatarGroupSurplusProps.SuruUI &
  AvatarGroupSurplusProps.BaseUI &
  AvatarGroupSurplusProps.HTML;

/**
 * 余剰分のアバターの数などを表示するコンポーネントです。
 */
export const AvatarGroupSurplus: IComponent<AvatarGroupSurplusProps> =
  function SuiAvatarGroupSurplus(props) {
    const { color = "grey", className, ...otherProps } = props;

    return <Avatar.Root {...otherProps} color={color} className={className} />;
  };

export { AvatarGroupSurplus as Surplus };

export namespace Surplus {
  export type State = AvatarGroupSurplusState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AvatarGroupSurplusProps.Render;

    export type SuruUI = AvatarGroupSurplusProps.SuruUI;

    export type BaseUI = AvatarGroupSurplusProps.BaseUI;

    export type HTML = AvatarGroupSurplusProps.HTML;
  }
}
