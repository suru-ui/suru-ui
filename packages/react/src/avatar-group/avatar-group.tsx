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
} from "./avatar-group.parts.js";

// Types
// -----

export type AvatarGroupColor = AvatarGroupRootColor;

export type AvatarGroupRadius = AvatarGroupRootRadius;

export type AvatarGroupSize = AvatarGroupRootSize;

/**
 * {@link AvatarGroup} の各パーツに渡す props です。
 */
export type AvatarGroupSlotProps = {
  /**
   * {@link AvatarGroupRoot} に渡す props です。
   */
  readonly root?: Omit<AvatarGroupRootProps, "children"> | undefined;

  /**
   * {@link AvatarGroupSurplus} に渡す props です。
   */
  readonly surplus?: Omit<AvatarGroupSurplusProps, "children"> | undefined;
};

/**
 * {@link AvatarGroup} が持つ状態です。
 */
export type AvatarGroupState = AvatarGroupRootState;

/**
 * {@link AvatarGroup} に渡す props です。
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

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  slotProps?: AvatarGroupSlotProps | undefined;
};

// API
// ---

/**
 * {@link AvatarGroup} を構成する各パーツの props を作成するための API です。
 */
export interface AvatarGroupAPI {
  /**
   * {@link AvatarGroupRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<AvatarGroupRootProps, "children"> & {
    children: React.ReactNode;
  };

  /**
   * {@link AvatarGroupSurplus} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getSurplusProps(): AvatarGroupSurplusProps | null;
}

interface IUseAvatarGroupAPI {
  /**
   * {@link AvatarGroupAPI} を作成します。
   *
   * @param props {@link AvatarGroup} の props です。
   * @returns アバターグループの API です
   */
  (props: AvatarGroupProps): AvatarGroupAPI;
}

/**
 * {@link AvatarGroupAPI} を作成するフックです。
 */
export const useAvatarGroupAPI: IUseAvatarGroupAPI = function useSuiAvatarGroupAPI(props) {
  const {
    max = 4,
    children,
    slotProps: { root: rootProps = {}, surplus: surplusProps = {} } = {},
    ...otherRootProps
  } = props;
  const childArray = React.Children.toArray(children);
  const hasSurplus = childArray.length > max;
  const visibleCount = hasSurplus ? Math.max(0, max - 1) : Math.max(0, max);
  const renderedChildArray = childArray.slice(0, visibleCount);

  return {
    getRootProps() {
      return {
        ...otherRootProps,
        ...rootProps,
        children: renderedChildArray,
      };
    },
    getSurplusProps() {
      if (!hasSurplus) {
        return null;
      }

      return {
        ...surplusProps,
        children: `+${Math.max(0, childArray.length - renderedChildArray.length)}`,
      };
    },
  };
};

export { type AvatarGroupAPI as API, useAvatarGroupAPI as useAPI };

// Component
// ---------

interface IAvatarGroup extends IComponent<AvatarGroupProps> {
  /**
   * {@link AvatarGroupContext} を読み取るフックです。
   */
  readonly useContext: IUseContext<AvatarGroupContext>;
}

/**
 * 複数のアバターを重ねて表示するコンポーネントです。
 */
export const AvatarGroup: IAvatarGroup = /*#__PURE__*/ Object.assign(
  function SuiAvatarGroup(props: AvatarGroupProps) {
    const api = useAvatarGroupAPI(props);
    const { children, ...otherRootProps } = api.getRootProps();
    const surplusProps = api.getSurplusProps();

    return (
      <AvatarGroupRoot {...otherRootProps}>
        {children}
        {surplusProps && <AvatarGroupSurplus {...surplusProps} />}
      </AvatarGroupRoot>
    );
  },
  {
    useContext: useAvatarGroupContext,
  },
);

export namespace AvatarGroup {
  export type State = AvatarGroupState;

  export type Props = AvatarGroupProps;

  export type SlotProps = AvatarGroupSlotProps;

  export type Context = AvatarGroupContext;

  export type Color = AvatarGroupColor;

  export type Radius = AvatarGroupRadius;

  export type Size = AvatarGroupSize;
}
