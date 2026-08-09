import { Collapsible } from "@base-ui/react/collapsible";
import {
  useRenderElement,
  type UseRenderElementComponentProps,
} from "@base-ui/react/internals/useRenderElement";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import splitRenderProps from "../../_split-render-props.js";
import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./collapsible.css";

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type CollapsibleRootState = Collapsible.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type CollapsibleRootProps = React.ComponentProps<typeof Collapsible.Root> & {
  /**
   * パネルの枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * パネルの角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"sm"`: 小さい角丸
   * - `"md"`: 標準的な角丸
   * - `"lg"`: 大きい角丸
   *
   * @default "md"
   */
  radius?: "none" | "sm" | "md" | "lg" | undefined;

  /**
   * パネルのサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;
};

/**
 * コラプシブルのルート要素です。
 *
 * @example
 * ```tsx
 * <CollapsibleParts.Root>
 *   <CollapsibleParts.Trigger>
 *     {(props) => <button type="button" {...props}>見出し</button>}
 *   </CollapsibleParts.Trigger>
 *   <CollapsibleParts.Panel>コンテンツ</CollapsibleParts.Panel>
 * </CollapsibleParts.Root>
 * ```
 */
export const CollapsibleRoot: Component<CollapsibleRootProps> = function SuiCollapsibleRoot(props) {
  const { className, outlined = false, radius = "md", size = "md", ...otherProps } = props;

  return (
    <Collapsible.Root
      {...otherProps}
      className={cn(
        className,
        "sui_collapsible",
        outlined && "sui_collapsible-outlined",
        `sui_collapsible-radius_${radius}`,
        `sui_collapsible-size_${size}`,
      )}
    />
  );
};

export namespace Root {
  export type State = CollapsibleRootState;
  export type Props = CollapsibleRootProps;
}

export const Root: Component<Root.Props> = CollapsibleRoot;

// Trigger
// -------

/**
 * {@link Trigger} の状態です。
 */
export type CollapsibleTriggerState = Collapsible.Trigger.State;

/**
 * {@link Trigger} に渡すプロパティーです。
 */
export type CollapsibleTriggerProps = Omit<
  React.ComponentProps<typeof Collapsible.Trigger>,
  "children" | "render"
> & {
  /**
   * ボタンとしてレンダリングする要素です。
   *
   * {@link Collapsible.Trigger} の `render` プロパティーと同じ型で、そのまま渡されます。
   */
  children: NonNullable<React.ComponentProps<typeof Collapsible.Trigger>["render"]>;
};

/**
 * コラプシブルを開閉するボタン要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link Collapsible.Trigger} の `render` プロパティーに
 * 渡されます。
 *
 * @example
 * ```tsx
 * <CollapsibleParts.Trigger>
 *   {(props) => <button type="button" {...props}>見出し</button>}
 * </CollapsibleParts.Trigger>
 * ```
 */
export const CollapsibleTrigger: Component<CollapsibleTriggerProps> =
  function SuiCollapsibleTrigger(props) {
    const { className, children, ...otherProps } = props;

    return (
      <Collapsible.Trigger
        {...otherProps}
        className={cn(className, "sui_collapsible_trigger")}
        render={children}
      />
    );
  };

export namespace Trigger {
  export type State = CollapsibleTriggerState;
  export type Props = CollapsibleTriggerProps;
}

export const Trigger: Component<Trigger.Props> = CollapsibleTrigger;

// Indicator
// ---------

/**
 * {@link Indicator} の状態です。
 */
export type CollapsibleIndicatorState = {};

/**
 * {@link Indicator} に渡すプロパティーです。
 */
export type CollapsibleIndicatorProps = Omit<
  React.ComponentProps<"span">,
  keyof UseRenderElementComponentProps<{}>
> &
  UseRenderElementComponentProps<CollapsibleIndicatorState>;

/**
 * コラプシブルの展開状態を示すアイコンのラッパー要素です。
 *
 * @example
 * ```tsx
 * <CollapsibleParts.Indicator>▼</CollapsibleParts.Indicator>
 * ```
 */
export const CollapsibleIndicator: Component<CollapsibleIndicatorProps> =
  function SuiCollapsibleIndicator(props) {
    const [renderProps, componentProps] = splitRenderProps(props);
    const { ref, ...elementProps } = componentProps;

    return useRenderElement("span", renderProps, {
      ref,
      props: [
        elementProps,
        {
          className: "sui_collapsible_indicator",
        },
      ],
    });
  };

export namespace Indicator {
  export type State = CollapsibleIndicatorState;
  export type Props = CollapsibleIndicatorProps;
}

export const Indicator: Component<Indicator.Props> = CollapsibleIndicator;

// Panel
// -----

/**
 * {@link Panel} の状態です。
 */
export type CollapsiblePanelState = Collapsible.Panel.State;

/**
 * {@link Panel} に渡すプロパティーです。
 */
export type CollapsiblePanelProps = React.ComponentProps<typeof Collapsible.Panel>;

/**
 * コラプシブルのコンテンツを表示するパネル要素です。
 *
 * @example
 * ```tsx
 * <CollapsibleParts.Panel>コンテンツ</CollapsibleParts.Panel>
 * ```
 */
export const CollapsiblePanel: Component<CollapsiblePanelProps> = function SuiCollapsiblePanel(
  props,
) {
  const { className, ...otherProps } = props;

  return <Collapsible.Panel {...otherProps} className={cn(className, "sui_collapsible_panel")} />;
};

export namespace Panel {
  export type State = CollapsiblePanelState;
  export type Props = CollapsiblePanelProps;
}

export const Panel: Component<Panel.Props> = CollapsiblePanel;
