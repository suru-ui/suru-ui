import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type AvatarGroupContext,
  type AvatarGroupRootSize,
  type AvatarGroupRootColor,
  type AvatarGroupRootProps,
  type AvatarGroupRootState,
  type AvatarGroupRootRadius,
  type IUseAvatarGroupContext,
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

namespace AvatarGroupProps {
  export type AvatarGroup = {
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

  export type Root = Omit<AvatarGroupRootProps, keyof AvatarGroup>;
}

/**
 * {@link AvatarGroup} に渡す props です。
 */
export type AvatarGroupProps = AvatarGroupProps.AvatarGroup & AvatarGroupProps.Root;

// API
// ---

/**
 * {@link AvatarGroup} を構成する各パーツの props を作成するための API です。
 */
export class AvatarGroupAPI {
  private readonly max: number;

  private readonly rootProps: AvatarGroupRootProps;

  private readonly slotProps: AvatarGroupSlotProps;

  /**
   * @param props {@link AvatarGroup} の props です。
   * @internal
   */
  public constructor(props: AvatarGroupProps) {
    const { max = 4, slotProps = {}, ...rootProps } = props;
    this.max = max;
    this.rootProps = rootProps;
    this.slotProps = slotProps;
  }

  /**
   * {@link AvatarGroupRoot} に渡す props を取得します。
   */
  public getRootProps(): AvatarGroupRootProps {
    const { root: props = {} } = this.slotProps;
    const children = React.Children.toArray(this.rootProps.children);

    return {
      ...this.rootProps,
      ...props,
      children: children.slice(0, this.getVisibleCount(children.length)),
    };
  }

  /**
   * {@link AvatarGroupSurplus} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getSurplusProps(): AvatarGroupSurplusProps | null {
    const { surplus: props = {} } = this.slotProps;
    const children = React.Children.toArray(this.rootProps.children);

    if (children.length <= this.max) {
      return null;
    }

    return {
      ...props,
      children: `+${children.length - this.getVisibleCount(children.length)}`,
    };
  }

  private getVisibleCount(childCount: number): number {
    return childCount > this.max ? Math.max(0, this.max - 1) : Math.max(0, this.max);
  }
}

export interface IUseAvatarGroupAPI {
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
  return new AvatarGroupAPI(props);
};

export { AvatarGroupAPI as API, useAvatarGroupAPI as useAPI };

// Component
// ---------

export interface IAvatarGroup extends IComponent<AvatarGroupProps> {
  /**
   * {@link AvatarGroupContext} を読み取るフックです。
   */
  readonly useContext: IUseAvatarGroupContext;
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
