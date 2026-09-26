import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { IComponent } from "../types.js";
import {
  type CollapsibleRootSize,
  type CollapsibleRootProps,
  type CollapsibleRootState,
  type CollapsibleContentProps,
  type CollapsibleTriggerProps,
  type CollapsibleRootChangeEventReason,
  type CollapsibleRootChangeEventDetails,
  CollapsibleRoot,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleIndicator,
} from "./collapsible.parts.js";

// Types
// -----

export type CollapsibleChangeEventDetails = CollapsibleRootChangeEventDetails;

export type CollapsibleChangeEventReason = CollapsibleRootChangeEventReason;

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
   * {@link CollapsibleTrigger} に渡す props です。
   */
  readonly trigger?: Omit<CollapsibleTriggerProps, "children"> | undefined;
};

/**
 * {@link Collapsible} が持つ状態です。
 */
export type CollapsibleState = CollapsibleRootState;

namespace CollapsibleProps {
  export type Collapsible = {
    /**
     * コンテンツに表示する内容です。
     */
    children?: CollapsibleContentProps["children"] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: CollapsibleSlotProps | undefined;

    /**
     * {@link CollapsibleTrigger} の子要素として描画する内容です。
     *
     * `render` と同じ型で、そのまま {@link CollapsibleTrigger} へ渡されます。
     */
    trigger?: CollapsibleTriggerProps["children"] | undefined;
  };

  export type Root = Omit<CollapsibleRootProps, keyof Collapsible>;
}

/**
 * {@link Collapsible} に渡す props です。
 */
export type CollapsibleProps = CollapsibleProps.Collapsible & CollapsibleProps.Root;

// API
// ---

/**
 * {@link Collapsible} を構成する各パーツの props などを作成するための API です。
 */
export class CollapsibleAPI {
  private readonly collapsibleProps: Required<Omit<CollapsibleProps.Collapsible, "slotProps">>;

  private readonly rootProps: Omit<CollapsibleRootProps, "children">;

  private readonly slotProps: CollapsibleSlotProps;

  /**
   * @param props {@link Collapsible} の props です。
   * @internal
   */
  public constructor(props: CollapsibleProps) {
    const { trigger, children, slotProps = {}, ...rootProps } = props;
    this.collapsibleProps = { trigger, children };
    this.rootProps = rootProps;
    this.slotProps = slotProps;
  }

  /**
   * {@link CollapsibleContent} に渡す props を取得します。
   *
   * コンテンツを表示しないときは `null` を返します。
   */
  public getContentProps(): CollapsibleContentProps | null {
    const { content: props = {} } = this.slotProps;
    const { children } = this.collapsibleProps;

    if (isLikelyVisibleNode(children)) {
      return {
        ...props,
        children,
      };
    }

    return null;
  }

  /**
   * {@link CollapsibleRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<CollapsibleRootProps, "children"> {
    return this.rootProps;
  }

  /**
   * {@link CollapsibleTrigger} に渡す props を取得します。
   *
   * トリガーを表示しないときは `null` を返します。
   */
  public getTriggerProps(): CollapsibleTriggerProps | null {
    const { trigger: props = {} } = this.slotProps;
    const { trigger } = this.collapsibleProps;

    if (!trigger) {
      return null;
    }

    return {
      ...props,
      children: trigger,
    };
  }
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
  return new CollapsibleAPI(props);
};

export { CollapsibleAPI as API, useCollapsibleAPI as useAPI };

// Component
// ---------

interface ICollapsible extends IComponent<CollapsibleProps> {
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
  export type State = CollapsibleState;

  export type Props = CollapsibleProps;

  export type SlotProps = CollapsibleSlotProps;

  export type ChangeEventDetails = CollapsibleChangeEventDetails;

  export type ChangeEventReason = CollapsibleChangeEventReason;

  export type Size = CollapsibleSize;
}
