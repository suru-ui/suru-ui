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

export namespace CollapsibleRootProps {
  export type Render = RenderProps<CollapsibleRootState>;

  export type SuruUI = {
    /**
     * コラプシブルの大きさを指定します。
     *
     * @default "md"
     */
    size?: CollapsibleRootSize | undefined;
  };

  export type BaseUI = Omit<
    React.ComponentProps<typeof Collapsible.Root>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof Collapsible.Root>
  >;
}

/**
 * {@link CollapsibleRoot} に渡す props です。
 */
export type CollapsibleRootProps = CollapsibleRootProps.Render &
  CollapsibleRootProps.SuruUI &
  CollapsibleRootProps.BaseUI &
  CollapsibleRootProps.HTML;

/**
 * コラプシブルのルートコンポーネントです。
 */
export const CollapsibleRoot: IComponent<CollapsibleRootProps> = function SuiCollapsibleRoot(
  props,
) {
  const {
    size = "md",
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

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
      data-scope={dataScope}
    />
  );
};

export { CollapsibleRoot as Root };

export namespace Root {
  export type State = CollapsibleRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = CollapsibleRootProps.Render;

    export type SuruUI = CollapsibleRootProps.SuruUI;

    export type BaseUI = CollapsibleRootProps.BaseUI;

    export type HTML = CollapsibleRootProps.HTML;
  }

  export type ChangeEventDetails = CollapsibleRootChangeEventDetails;

  export type ChangeEventReason = CollapsibleRootChangeEventReason;

  export type Size = CollapsibleRootSize;
}

// Trigger
// -------

/**
 * {@link CollapsibleTrigger} が持つ状態です。
 */
export type CollapsibleTriggerState = Collapsible.Trigger.State;

export namespace CollapsibleTriggerProps {
  export type Render = RenderProps<CollapsibleTriggerState>;

  export type SuruUI = {
    /**
     * ボタンとして描画する内容です。
     *
     * {@link Collapsible.Trigger} の `render` と同じ型で、そのまま渡されます。
     */
    children: NonNullable<React.ComponentProps<typeof Collapsible.Trigger>["render"]>;
  };

  export type BaseUI = Omit<
    React.ComponentProps<typeof Collapsible.Trigger>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"button">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof Collapsible.Trigger>
  >;
}

/**
 * {@link CollapsibleTrigger} に渡す props です。
 */
export type CollapsibleTriggerProps = CollapsibleTriggerProps.Render &
  CollapsibleTriggerProps.SuruUI &
  CollapsibleTriggerProps.BaseUI &
  CollapsibleTriggerProps.HTML;

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
  export type State = CollapsibleTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = CollapsibleTriggerProps.Render;

    export type SuruUI = CollapsibleTriggerProps.SuruUI;

    export type BaseUI = CollapsibleTriggerProps.BaseUI;

    export type HTML = CollapsibleTriggerProps.HTML;
  }
}

// Indicator
// ---------

/**
 * {@link CollapsibleIndicator} が持つ状態です。
 */
export type CollapsibleIndicatorState = {};

export namespace CollapsibleIndicatorProps {
  export type Render = RenderProps<CollapsibleIndicatorState>;

  export type SuruUI = {};

  export type HTML = Omit<React.ComponentProps<"span">, keyof Render | keyof SuruUI>;
}

/**
 * {@link CollapsibleIndicator} に渡す props です。
 */
export type CollapsibleIndicatorProps = CollapsibleIndicatorProps.Render &
  CollapsibleIndicatorProps.SuruUI &
  CollapsibleIndicatorProps.HTML;

/**
 * コラプシブルの展開状態を示すアイコンを表示するコンポーネントです。
 */
export const CollapsibleIndicator: IComponent<CollapsibleIndicatorProps> =
  function SuiCollapsibleIndicator(props) {
    const { children = <ChevronRightIcon />, ...otherSpanProps } = props;

    return useRender({
      props: [
        otherSpanProps,
        {
          children,
          className: "sui_collapsible_indicator",
        },
      ],
      defaultTagName: "span",
    });
  };

export { CollapsibleIndicator as Indicator };

export namespace Indicator {
  export type State = CollapsibleIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = CollapsibleIndicatorProps.Render;

    export type SuruUI = CollapsibleIndicatorProps.SuruUI;

    export type HTML = CollapsibleIndicatorProps.HTML;
  }
}

// Content
// -------

/**
 * {@link CollapsibleContent} が持つ状態です。
 */
export type CollapsibleContentState = Collapsible.Panel.State;

export namespace CollapsibleContentProps {
  export type Render = RenderProps<CollapsibleContentState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    React.ComponentProps<typeof Collapsible.Panel>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof Collapsible.Panel>
  >;
}

/**
 * {@link CollapsibleContent} に渡す props です。
 */
export type CollapsibleContentProps = CollapsibleContentProps.Render &
  CollapsibleContentProps.SuruUI &
  CollapsibleContentProps.BaseUI &
  CollapsibleContentProps.HTML;

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
  export type State = CollapsibleContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = CollapsibleContentProps.Render;

    export type SuruUI = CollapsibleContentProps.SuruUI;

    export type BaseUI = CollapsibleContentProps.BaseUI;

    export type HTML = CollapsibleContentProps.HTML;
  }
}
