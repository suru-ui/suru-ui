import type { RenderProps } from "../_use-render.js";
import { type AvatarRootProps, type AvatarRootState, AvatarRoot } from "../avatar/avatar.root.jsx";
import type { IComponent } from "../types.js";

/**
 * {@link AvatarGroupSurplus} が持つ状態です。
 */
export type AvatarGroupSurplusState = AvatarRootState;

export namespace AvatarGroupSurplusProps {
  export type Render = RenderProps<AvatarGroupSurplusState>;

  export type SuruUI = AvatarRootProps.SuruUI;

  export type BaseUI = Omit<AvatarRootProps.BaseUI, keyof Render | keyof SuruUI>;

  export type HTML = Omit<AvatarRootProps, keyof Render | keyof SuruUI | keyof BaseUI>;
}

/**
 * {@link AvatarGroupSurplus} に渡す props です。
 */
export type AvatarGroupSurplusProps = AvatarGroupSurplusProps.Render &
  AvatarGroupSurplusProps.SuruUI &
  AvatarGroupSurplusProps.BaseUI &
  AvatarGroupSurplusProps.HTML;

export type IAvatarGroupSurplus = IComponent<AvatarGroupSurplusProps>;

/**
 * 余剰分のアバターの数などを表示するコンポーネントです。
 */
export const AvatarGroupSurplus: IAvatarGroupSurplus = function SuiAvatarGroupSurplus(props) {
  const { color = "grey", ...otherProps } = props;

  return <AvatarRoot {...otherProps} color={color} />;
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
