import { Collapsible } from "@base-ui/react/collapsible";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

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

  export type BaseUI = Pick<
    React.ComponentProps<typeof Collapsible.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // CollapsibleRootProps:
      "open" | "defaultOpen" | "onOpenChange" | "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Collapsible.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
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
