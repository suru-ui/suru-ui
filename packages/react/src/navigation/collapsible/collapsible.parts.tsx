import { Collapsible } from "@base-ui/react/collapsible";
import {
  useRenderElement,
  type UseRenderElementComponentProps,
} from "@base-ui/react/internals/useRenderElement";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import splitRenderProps from "../../_split-render-props.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./collapsible.css";

// Types
// -----

/**
 * コラプシブルの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 */
export type CollapsibleRadius = "none" | Size;

/**
 * コラプシブルの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type CollapsibleSize = Size;

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
   * @default "md"
   */
  radius?: CollapsibleRadius | undefined;

  /**
   * パネルのサイズを指定します。
   *
   * @default "md"
   */
  size?: CollapsibleSize | undefined;
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
   * {@link CollapsibleRoot} の状態型です。
   */
  export type State = CollapsibleRootState;

  /**
   * {@link CollapsibleRoot} のプロパティー型です。
   */
  export type Props = CollapsibleRootProps;
}

/**
 * {@link CollapsibleRoot} です。
 */
export const Root: IComponent<Root.Props> = CollapsibleRoot;

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
   * {@link CollapsibleTrigger} の状態型です。
   */
  export type State = CollapsibleTriggerState;

  /**
   * {@link CollapsibleTrigger} のプロパティー型です。
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
 */
export const CollapsibleIndicator: IComponent<CollapsibleIndicatorProps> =
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

/**
 * {@link CollapsibleIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link CollapsibleIndicator} の状態型です。
   */
  export type State = CollapsibleIndicatorState;

  /**
   * {@link CollapsibleIndicator} のプロパティー型です。
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
 * {@link Panel} の状態です。
 */
export type CollapsiblePanelState = Collapsible.Panel.State;

/**
 * {@link Panel} に渡すプロパティーです。
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
   * {@link CollapsiblePanel} の状態型です。
   */
  export type State = CollapsiblePanelState;

  /**
   * {@link CollapsiblePanel} のプロパティー型です。
   */
  export type Props = CollapsiblePanelProps;
}

/**
 * {@link CollapsiblePanel} です。
 */
export const Panel: IComponent<Panel.Props> = CollapsiblePanel;
