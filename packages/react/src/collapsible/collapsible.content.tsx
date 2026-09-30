import { Collapsible } from "@base-ui/react/collapsible";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type CollapsibleContext, useCollapsibleContext } from "./collapsible.context.js";

/**
 * {@link CollapsibleContent} が持つ状態です。
 */
export type CollapsibleContentState = Override<CollapsibleContext, Collapsible.Panel.State>;

export namespace CollapsibleContentProps {
  export type Render = RenderProps<CollapsibleContentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Collapsible.Panel>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // CollapsiblePanelProps:
      "hiddenUntilFound" | "keepMounted",
      keyof Render | keyof SuruUI
    >
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
          render,
          className: cn(className, "sui_collapsible_content"),
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
