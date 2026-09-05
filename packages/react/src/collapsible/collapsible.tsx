import * as React from "react";

import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { IComponent } from "../types.js";
import {
  type CollapsibleRootSize,
  type CollapsibleRootProps,
  type CollapsibleRootState,
  type CollapsibleContentProps,
  type CollapsibleTriggerProps,
  type CollapsibleIndicatorProps,
  CollapsibleRoot,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleIndicator,
} from "./collapsible.parts.jsx";

// Types
// -----

/**
 * {@link CollapsibleRootSize}
 */
export type CollapsibleSize = CollapsibleRootSize;

/**
 * {@link Collapsible} の各パーツに渡す props です。
 */
export type CollapsibleSlotProps = {
  /**
   * {@link CollapsibleContent} に渡す props です。
   */
  readonly content?: Omit<CollapsibleContentProps, "children"> | undefined;

  /**
   * {@link CollapsibleIndicator} に渡す props です。
   */
  readonly indicator?: CollapsibleIndicatorProps | undefined;

  /**
   * {@link CollapsibleTrigger} に渡す props です。
   */
  readonly trigger?: Omit<CollapsibleTriggerProps, "children"> | undefined;
};

/**
 * {@link Collapsible} が持つ状態です。
 */
export type CollapsibleState = CollapsibleRootState;

/**
 * {@link Collapsible} に渡す props です。
 */
export type CollapsibleProps = Omit<CollapsibleRootProps, "children" | "title"> & {
  /**
   * コンテンツに表示する内容です。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   *
   * 各パーツの props が優先されます。
   */
  slotProps?: CollapsibleSlotProps | undefined;

  /**
   * {@link CollapsibleTrigger} の子要素として描画する内容です。
   *
   * {@link Collapsible.Trigger} の `render` と同じ型で、そのまま渡されます。
   */
  trigger?: CollapsibleTriggerProps["children"] | undefined;
};

// API
// ---

/**
 * {@link Collapsible} を構成する各パーツの props などを作成するための API です。
 */
export interface CollapsibleAPI {
  /**
   * {@link CollapsibleContent} に渡す props を取得します。
   */
  getContentProps(): CollapsibleContentProps | null;

  /**
   * {@link CollapsibleIndicator} に渡す props を取得します。
   */
  getIndicatorProps(): CollapsibleIndicatorProps;

  /**
   * {@link CollapsibleRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<CollapsibleRootProps, "children">;

  /**
   * {@link CollapsibleTrigger} に渡す props を取得します。
   */
  getTriggerProps(): CollapsibleTriggerProps | null;
}

interface IUseCollapsibleAPI {
  /**
   * {@link CollapsibleAPI} を作成します。
   *
   * @param props {@link Collapsible} の props です。
   * @returns コラプシブルの API です
   */
  (props: CollapsibleProps): CollapsibleAPI;
}

/**
 * {@link CollapsibleAPI} を作成するフックです。
 */
export const useCollapsibleAPI: IUseCollapsibleAPI = function useSuiCollapsibleAPI(props) {
  const {
    trigger,
    children,
    slotProps: {
      content: contentProps = {},
      trigger: triggerProps = {},
      indicator: indicatorProps = {},
    } = {},
    ...otherRootProps
  } = props;

  return {
    getRootProps() {
      return otherRootProps;
    },
    getContentProps() {
      if (isLikelyVisibleNode(children)) {
        return {
          ...contentProps,
          children,
        };
      }

      return null;
    },
    getTriggerProps() {
      if (trigger === undefined) {
        return null;
      }

      return {
        ...triggerProps,
        children: trigger,
      };
    },
    getIndicatorProps() {
      return indicatorProps;
    },
  };
};

export { type CollapsibleAPI as API, useCollapsibleAPI as useAPI };

// Component
// ---------

interface ICollapsible extends IComponent<CollapsibleProps> {
  /**
   * {@link CollapsibleIndicator}
   */
  readonly Indicator: typeof CollapsibleIndicator;
}

/**
 * コラプシブルを表示するコンポーネントです。
 */
export const Collapsible: ICollapsible = /*#__PURE__*/ Object.assign(
  function SuiCollapsible(props: CollapsibleProps) {
    const api = useCollapsibleAPI(props);
    const triggerProps = api.getTriggerProps();
    const contentProps = api.getContentProps();

    return (
      <CollapsibleRoot {...api.getRootProps()}>
        {triggerProps && <CollapsibleTrigger {...triggerProps} />}
        {contentProps && <CollapsibleContent {...contentProps} />}
      </CollapsibleRoot>
    );
  },
  {
    Indicator: CollapsibleIndicator,
  },
);

export namespace Collapsible {
  /**
   * {@link CollapsibleState}
   */
  export type State = CollapsibleState;

  /**
   * {@link CollapsibleProps}
   */
  export type Props = CollapsibleProps;

  /**
   * {@link CollapsibleSlotProps}
   */
  export type SlotProps = CollapsibleSlotProps;

  /**
   * {@link CollapsibleSize}
   */
  export type Size = CollapsibleSize;
}
