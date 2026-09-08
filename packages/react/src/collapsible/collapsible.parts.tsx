import { Collapsible } from "@base-ui/react/collapsible";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ChevronRightIcon } from "../_icons.jsx";
import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./collapsible.css";

// Root
// ----

/**
 * コラプシブルの開閉状態が変更されるイベントの詳細です。
 */
export type CollapsibleRootChangeEventDetails = Collapsible.Root.ChangeEventDetails;

/**
 * コラプシブルの開閉状態が変更される理由です。
 */
export type CollapsibleRootChangeEventReason = Collapsible.Root.ChangeEventReason;

/**
 * コラプシブルの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type CollapsibleRootSize = Size;

/**
 * {@link CollapsibleRoot} が持つ状態です。
 */
export type CollapsibleRootState = Collapsible.Root.State;

/**
 * {@link CollapsibleRoot} に渡す props です。
 */
export type CollapsibleRootProps = React.ComponentProps<typeof Collapsible.Root> & {
  /**
   * コラプシブルの大きさを指定します。
   *
   * @default "md"
   */
  size?: CollapsibleRootSize | undefined;
};

/**
 * コラプシブルのルートコンポーネントです。
 */
export const CollapsibleRoot: IComponent<CollapsibleRootProps> = function SuiCollapsibleRoot(
  props,
) {
  const { size = "md", className, ...otherProps } = props;

  return (
    <Collapsible.Root
      {...otherProps}
      className={cn(
        className,
        "sui_collapsible",
        `sui_collapsible-size_${size}`,
        (state) => state.open && "sui_collapsible-open",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_collapsible-transition_status_${state.transitionStatus}`,
        (state) => state.disabled && "sui_collapsible-disabled",
      )}
      data-scope=""
    />
  );
};

export { CollapsibleRoot as Root };

export namespace Root {
  /**
   * {@link CollapsibleRootState}
   */
  export type State = CollapsibleRootState;

  /**
   * {@link CollapsibleRootProps}
   */
  export type Props = CollapsibleRootProps;

  /**
   * {@link CollapsibleRootChangeEventDetails}
   */
  export type ChangeEventDetails = CollapsibleRootChangeEventDetails;

  /**
   * {@link CollapsibleRootChangeEventReason}
   */
  export type ChangeEventReason = CollapsibleRootChangeEventReason;

  /**
   * {@link CollapsibleRootSize}
   */
  export type Size = CollapsibleRootSize;
}

// Trigger
// -------

/**
 * {@link CollapsibleTrigger} が持つ状態です。
 */
export type CollapsibleTriggerState = Collapsible.Trigger.State;

/**
 * {@link CollapsibleTrigger} に渡す props です。
 */
export type CollapsibleTriggerProps = Omit<
  React.ComponentProps<typeof Collapsible.Trigger>,
  "children" | "render"
> & {
  /**
   * ボタンとして描画する内容です。
   *
   * {@link Collapsible.Trigger} の `render` と同じ型で、そのまま渡されます。
   */
  children: NonNullable<React.ComponentProps<typeof Collapsible.Trigger>["render"]>;
};

/**
 * コラプシブルの開閉ボタンコンポーネントです。
 *
 * 子要素は何にもラップされず、そのまま {@link Collapsible.Trigger} の `render` に渡されます。
 */
export const CollapsibleTrigger: IComponent<CollapsibleTriggerProps> =
  function SuiCollapsibleTrigger(props) {
    const { children, className, ...otherProps } = props;

    return (
      <Collapsible.Trigger
        {...otherProps}
        render={children}
        className={cn(className, "sui_collapsible_trigger")}
      />
    );
  };

export { CollapsibleTrigger as Trigger };

export namespace Trigger {
  /**
   * {@link CollapsibleTriggerState}
   */
  export type State = CollapsibleTriggerState;

  /**
   * {@link CollapsibleTriggerProps}
   */
  export type Props = CollapsibleTriggerProps;
}

// Indicator
// ---------

/**
 * {@link CollapsibleIndicator} が持つ状態です。
 */
export type CollapsibleIndicatorState = {};

/**
 * {@link CollapsibleIndicator} に渡す props です。
 */
export type CollapsibleIndicatorProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<CollapsibleIndicatorState>;

/**
 * コラプシブルの展開状態を示すアイコンを表示するコンポーネントです。
 */
export const CollapsibleIndicator: IComponent<CollapsibleIndicatorProps> =
  function SuiCollapsibleIndicator(props) {
    const { children = <ChevronRightIcon />, ...otherSpanProps } = props;

    return useRender({
      defaultTagName: "span",
      props: [
        otherSpanProps,
        {
          children,
          className: "sui_collapsible_indicator",
        },
      ],
    });
  };

export { CollapsibleIndicator as Indicator };

export namespace Indicator {
  /**
   * {@link CollapsibleIndicatorState}
   */
  export type State = CollapsibleIndicatorState;

  /**
   * {@link CollapsibleIndicatorProps}
   */
  export type Props = CollapsibleIndicatorProps;
}

// Content
// -------

/**
 * {@link CollapsibleContent} が持つ状態です。
 */
export type CollapsibleContentState = Collapsible.Panel.State;

/**
 * {@link CollapsibleContent} に渡す props です。
 */
export type CollapsibleContentProps = React.ComponentProps<typeof Collapsible.Panel>;

/**
 * コラプシブルのコンテンツコンポーネントです。
 */
export const CollapsibleContent: IComponent<CollapsibleContentProps> =
  function SuiCollapsibleContent(props) {
    const { className, ...otherProps } = props;

    return (
      <Collapsible.Panel {...otherProps} className={cn(className, "sui_collapsible_content")} />
    );
  };

export { CollapsibleContent as Content };

export namespace Content {
  /**
   * {@link CollapsibleContentState}
   */
  export type State = CollapsibleContentState;

  /**
   * {@link CollapsibleContentProps}
   */
  export type Props = CollapsibleContentProps;
}
