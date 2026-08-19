import { Collapsible } from "@base-ui/react/collapsible";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./collapsible.css";

// Root
// ----

/**
 * コラプシブルの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 */
export type CollapsibleRootRadius = "none" | Size;

/**
 * コラプシブルの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type CollapsibleRootSize = Size;

/**
 * {@link CollapsibleRootState} です。
 */
export type CollapsibleRootState = Collapsible.Root.State;

/**
 * {@link CollapsibleRootProps} です。
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
   * @default "md"
   */
  radius?: CollapsibleRootRadius | undefined;

  /**
   * パネルのサイズを指定します。
   *
   * @default "md"
   */
  size?: CollapsibleRootSize | undefined;
};

/**
 * コラプシブルのルート要素です。
 */
export const CollapsibleRoot: IComponent<CollapsibleRootProps> = function SuiCollapsibleRoot(
  props,
) {
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

/**
 * {@link CollapsibleRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link CollapsibleRootState} です。
   */
  export type State = CollapsibleRootState;

  /**
   * {@link CollapsibleRootProps} です。
   */
  export type Props = CollapsibleRootProps;

  /**
   * {@link CollapsibleRootRadius} です。
   */
  export type Radius = CollapsibleRootRadius;

  /**
   * {@link CollapsibleRootSize} です。
   */
  export type Size = CollapsibleRootSize;
}

/**
 * {@link CollapsibleRoot} です。
 */
export const Root: IComponent<Root.Props> = CollapsibleRoot;

// Trigger
// -------

/**
 * {@link CollapsibleTriggerState} です。
 */
export type CollapsibleTriggerState = Collapsible.Trigger.State;

/**
 * {@link CollapsibleTriggerProps} です。
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
 */
export const CollapsibleTrigger: IComponent<CollapsibleTriggerProps> =
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

/**
 * {@link CollapsibleTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link CollapsibleTriggerState} です。
   */
  export type State = CollapsibleTriggerState;

  /**
   * {@link CollapsibleTriggerProps} です。
   */
  export type Props = CollapsibleTriggerProps;
}

/**
 * {@link CollapsibleTrigger} です。
 */
export const Trigger: IComponent<Trigger.Props> = CollapsibleTrigger;

// Indicator
// ---------

/**
 * {@link CollapsibleIndicatorState} です。
 */
export type CollapsibleIndicatorState = {};

/**
 * {@link CollapsibleIndicatorProps} です。
 */
export type CollapsibleIndicatorProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<CollapsibleIndicatorState>;

/**
 * コラプシブルの展開状態を示すアイコンのラッパー要素です。
 */
export const CollapsibleIndicator: IComponent<CollapsibleIndicatorProps> =
  function SuiCollapsibleIndicator(props) {
    return useRender({
      defaultTagName: "span",
      props: [
        props,
        {
          className: "sui_collapsible_indicator",
        },
      ],
    });
  };

/**
 * {@link CollapsibleIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link CollapsibleIndicatorState} です。
   */
  export type State = CollapsibleIndicatorState;

  /**
   * {@link CollapsibleIndicatorProps} です。
   */
  export type Props = CollapsibleIndicatorProps;
}

/**
 * {@link CollapsibleIndicator} です。
 */
export const Indicator: IComponent<Indicator.Props> = CollapsibleIndicator;

// Panel
// -----

/**
 * {@link CollapsiblePanelState} です。
 */
export type CollapsiblePanelState = Collapsible.Panel.State;

/**
 * {@link CollapsiblePanelProps} です。
 */
export type CollapsiblePanelProps = React.ComponentProps<typeof Collapsible.Panel>;

/**
 * コラプシブルのコンテンツを表示するパネル要素です。
 */
export const CollapsiblePanel: IComponent<CollapsiblePanelProps> = function SuiCollapsiblePanel(
  props,
) {
  const { className, ...otherProps } = props;

  return <Collapsible.Panel {...otherProps} className={cn(className, "sui_collapsible_panel")} />;
};

/**
 * {@link CollapsiblePanel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Panel {
  /**
   * {@link CollapsiblePanelState} です。
   */
  export type State = CollapsiblePanelState;

  /**
   * {@link CollapsiblePanelProps} です。
   */
  export type Props = CollapsiblePanelProps;
}

/**
 * {@link CollapsiblePanel} です。
 */
export const Panel: IComponent<Panel.Props> = CollapsiblePanel;
