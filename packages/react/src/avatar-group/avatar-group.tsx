import * as React from "react";

import type { IComponent, IUseContext } from "../types.js";
import {
  type AvatarGroupContext,
  type AvatarGroupRootSize,
  type AvatarGroupRootColor,
  type AvatarGroupRootProps,
  type AvatarGroupRootState,
  type AvatarGroupRootRadius,
  type AvatarGroupSurplusProps,
  AvatarGroupRoot,
  AvatarGroupSurplus,
  useAvatarGroupContext,
} from "./avatar-group.parts.jsx";

/**
 * {@link AvatarGroupRootColor} です。
 */
export type AvatarGroupColor = AvatarGroupRootColor;

/**
 * {@link AvatarGroupRootRadius} です。
 */
export type AvatarGroupRadius = AvatarGroupRootRadius;

/**
 * {@link AvatarGroupRootSize} です。
 */
export type AvatarGroupSize = AvatarGroupRootSize;

/**
 * {@link AvatarGroupRootState} です。
 */
export type AvatarGroupState = AvatarGroupRootState;

/**
 * {@link AvatarGroup} コンポーネントのプロパティーです。
 */
export type AvatarGroupProps = AvatarGroupRootProps & {
  /**
   * 表示するアバターの最大数です。
   *
   * 省略アバターもこの数に含まれます。
   *
   * @default 4
   */
  max?: number | undefined;
};

/**
 * {@link AvatarGroup} の各パーツに渡すプロパティーです。
 */
export type AvatarGroupPartsProps = {
  /**
   * {@link AvatarGroupRoot} に渡すプロパティーです。
   */
  readonly root: AvatarGroupRootProps;

  /**
   * {@link AvatarGroupSurplus} に渡すプロパティーです。
   *
   * これを表示しないときは null になります。
   */
  readonly surplus: AvatarGroupSurplusProps | null;
};

/**
 * {@link AvatarGroup} の各パーツに渡すプロパティーを作るフックです。
 */
export function useAvatarGroup(props: AvatarGroupProps): AvatarGroupPartsProps {
  const { max = 4, children, ...otherRootProps } = props;
  const childArray = React.Children.toArray(children);
  const hasSurplus = childArray.length > max;
  const renderedChildArray = childArray.slice(0, hasSurplus ? max - 1 : max);

  return {
    root: {
      ...otherRootProps,
      children: renderedChildArray,
    },
    surplus: hasSurplus
      ? { children: `+${Math.max(0, childArray.length - renderedChildArray.length)}` }
      : null,
  };
}

interface AvatarGroupType extends IComponent<AvatarGroupProps> {
  /**
   * {@link useAvatarGroupContext} です。
   */
  readonly useContext: IUseContext<AvatarGroupContext>;
}

/**
 * 複数のアバターを重ねて表示するコンポーネントです。
 */
export const AvatarGroup: AvatarGroupType = /*#__PURE__*/ Object.assign(
  function SuiAvatarGroup(props: AvatarGroupProps) {
    const partsProps = useAvatarGroup(props);

    return (
      <AvatarGroupRoot {...partsProps.root}>
        {partsProps.root.children}
        {partsProps.surplus && <AvatarGroupSurplus {...partsProps.surplus} />}
      </AvatarGroupRoot>
    );
  },
  {
    useContext: useAvatarGroupContext,
  },
);

/**
 * {@link AvatarGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace AvatarGroup {
  /**
   * {@link AvatarGroupState} です。
   */
  export type State = AvatarGroupState;

  /**
   * {@link AvatarGroupProps} です。
   */
  export type Props = AvatarGroupProps;

  /**
   * {@link AvatarGroupContext} です。
   */
  export type Context = AvatarGroupContext;

  /**
   * {@link AvatarGroupColor} です。
   */
  export type Color = AvatarGroupColor;

  /**
   * {@link AvatarGroupRadius} です。
   */
  export type Radius = AvatarGroupRadius;

  /**
   * {@link AvatarGroupSize} です。
   */
  export type Size = AvatarGroupSize;
}
