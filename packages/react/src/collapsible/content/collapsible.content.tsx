import { Collapsible } from "@base-ui/react/collapsible";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useCollapsibleContext } from "../root/collapsible.root.context.js";
import { CollapsibleContentContext } from "./collapsible.content.context.js";

/**
 * {@link CollapsibleContent} が持つ状態です。
 */
export type CollapsibleContentState = CollapsibleContentContext;

export namespace CollapsibleContentProps {
  export type Render = RenderProps<CollapsibleContentState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Collapsible.Panel>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // CollapsiblePanelProps より:
      "hiddenUntilFound" | "keepMounted"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Collapsible.Panel>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link CollapsibleContent} に渡す props です。
 */
export type CollapsibleContentProps = CollapsibleContentProps.Render &
  CollapsibleContentProps.SuruUI &
  CollapsibleContentProps.BaseUI &
  CollapsibleContentProps.HTML;

export type ICollapsibleContent = IComponent<CollapsibleContentProps>;

/**
 * コラプシブルのコンテンツコンポーネントです。
 */
export const CollapsibleContent: ICollapsibleContent = function SuiCollapsibleContent(props) {
  const ctx = useCollapsibleContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Collapsible.Panel
      {...otherProps}
      {...proxyRenderProps<Collapsible.Panel.State, CollapsibleContentState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <CollapsibleContentContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </CollapsibleContentContext>
          ),
          className: cn<CollapsibleContentState>(
            className,
            "sui_collapsible_content",
            (state) => `sui_collapsible_content-size_${state.size}`,
            (state) => state.open && "sui_collapsible_content-open",
            (state) => state.disabled && "sui_collapsible_content-disabled",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_collapsible_content-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    />
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
