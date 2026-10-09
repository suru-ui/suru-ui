import { Collapsible } from "@base-ui/react/collapsible";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useCollapsibleContext } from "../root/collapsible.root.context.js";
import { CollapsibleTriggerContext } from "./collapsible.trigger.context.js";

/**
 * {@link CollapsibleTrigger} が持つ状態です。
 */
export type CollapsibleTriggerState = CollapsibleTriggerContext;

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

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Collapsible.Trigger>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NativeButtonProps より:
      | keyof NativeButtonProps
      // CollapsibleTriggerProps より:
      | never
    >,
    keyof Render | keyof SuruUI
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
          render: (htmlProps, state) => (
            <CollapsibleTriggerContext value={state}>
              <RenderElement
                state={state}
                render={children}
                htmlProps={htmlProps}
                defaultTagName="button"
              />
            </CollapsibleTriggerContext>
          ),
          className: cn<CollapsibleTriggerState>(
            className,
            "sui_collapsible_trigger",
            (state) => `sui_collapsible_trigger-size_${state.size}`,
            (state) => state.open && "sui_collapsible_trigger-open",
            (state) => state.disabled && "sui_collapsible_trigger-disabled",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_collapsible_trigger-transition_status_${state.transitionStatus}`,
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
