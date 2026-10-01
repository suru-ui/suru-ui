import { Collapsible } from "@base-ui/react/collapsible";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type CollapsibleContext, useCollapsibleContext } from "./collapsible.context.js";

/**
 * {@link CollapsibleTrigger} が持つ状態です。
 */
export type CollapsibleTriggerState = Override<CollapsibleContext, Collapsible.Trigger.State>;

export namespace CollapsibleTriggerProps {
  export type Render = Omit<RenderProps<CollapsibleTriggerState>, "render">;

  export type SuruUI = {
    /**
     * ボタンとして描画する内容です。
     *
     * `render` と同じ型で、そのまま {@link CollapsibleTrigger} へ渡されます。
     */
    children: NonNullable<RenderProps<CollapsibleTriggerState>["render"]>;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Collapsible.Trigger>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // CollapsibleTriggerProps:
      | never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Collapsible.Trigger>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link CollapsibleTrigger} に渡す props です。
 */
export type CollapsibleTriggerProps = CollapsibleTriggerProps.Render &
  CollapsibleTriggerProps.SuruUI &
  CollapsibleTriggerProps.BaseUI &
  CollapsibleTriggerProps.HTML;

export type ICollapsibleTrigger = IComponent<CollapsibleTriggerProps>;

/**
 * コラプシブルの開閉ボタンコンポーネントです。
 *
 * ボタンなどの操作要素を子に渡して使います。
 */
export const CollapsibleTrigger: ICollapsibleTrigger = function SuiCollapsibleTrigger(props) {
  const ctx = useCollapsibleContext();
  const { style, children, className, ...otherProps } = props;

  return (
    <Collapsible.Trigger
      {...otherProps}
      {...proxyRenderProps<Collapsible.Trigger.State, CollapsibleTriggerState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: children,
          className: cn<CollapsibleTriggerState>(
            className,
            "sui_collapsible_trigger",
            (state) => `sui_collapsible_trigger-size_${state.size}`,
            (state) => state.disabled && "sui_collapsible_trigger-disabled",
          ),
        },
      )}
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
