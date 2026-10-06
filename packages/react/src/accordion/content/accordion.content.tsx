import { Accordion } from "@base-ui/react/accordion";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAccordionContext } from "../root/accordion.root.context.js";
import { AccordionContentContext } from "./accordion.content.context.js";

/**
 * {@link AccordionContent} が持つ状態です。
 */
export type AccordionContentState = AccordionContentContext;

export namespace AccordionContentProps {
  export type Render = RenderProps<AccordionContentState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Accordion.Panel>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // Pick<AccordionRoot.Props, 'hiddenUntilFound' | 'keepMounted'> より:
      | "hiddenUntilFound"
      | "keepMounted"
      // AccordionPanelProps より:
      | never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Accordion.Panel>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AccordionContent} に渡す props です。
 */
export type AccordionContentProps = AccordionContentProps.Render &
  AccordionContentProps.SuruUI &
  AccordionContentProps.BaseUI &
  AccordionContentProps.HTML;

export type IAccordionContent = IComponent<AccordionContentProps>;

/**
 * アコーディオンのパネルコンポーネントです。
 */
export const AccordionContent: IAccordionContent = function SuiAccordionContent(props) {
  const ctx = useAccordionContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Accordion.Panel
      {...otherProps}
      {...proxyRenderProps<Accordion.Panel.State, AccordionContentState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <AccordionContentContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AccordionContentContext>
          ),
          className: cn<AccordionContentState>(
            className,
            "sui_accordion_content",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_accordion_content-transition_status_${state.transitionStatus}`,
            (state) => `sui_accordion_content-size_${state.size}`,
            (state) => `sui_accordion_content-radius_${state.radius}`,
            (state) => state.separator && "sui_accordion_content-separator",
            (state) => state.disabled && "sui_accordion_content-disabled",
            (state) => state.open && "sui_accordion_content-open",
            (state) => state.hidden && "sui_accordion_content-hidden",
            (state) => `sui_accordion_content-index_${state.index}`,
          ),
        },
      )}
    />
  );
};

export { AccordionContent as Content };

export namespace Content {
  export type State = AccordionContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AccordionContentProps.Render;

    export type SuruUI = AccordionContentProps.SuruUI;

    export type BaseUI = AccordionContentProps.BaseUI;

    export type HTML = AccordionContentProps.HTML;
  }
}
