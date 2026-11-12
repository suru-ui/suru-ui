import { Accordion } from "@base-ui/react/accordion";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAccordionItemContext } from "../item/accordion.item.context.js";
import { AccordionHeadingContext } from "./accordion.heading.context.js";

/**
 * {@link AccordionHeading} が持つ状態です。
 */
export type AccordionHeadingState = AccordionHeadingContext;

export namespace AccordionHeadingProps {
  export type Render = RenderProps<AccordionHeadingState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Accordion.Header>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // AccordionHeaderProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Accordion.Header>,
    keyof Render | keyof SuruUI
  >;
}

/**
 * {@link AccordionHeading} に渡す props です。
 */
export type AccordionHeadingProps = AccordionHeadingProps.Render &
  AccordionHeadingProps.SuruUI &
  AccordionHeadingProps.BaseUI &
  AccordionHeadingProps.HTML;

export type IAccordionHeading = IComponent<AccordionHeadingProps>;

/** アコーディオンの見出しコンポーネントです。 */
export const AccordionHeading: IAccordionHeading = (props) => {
  const ctx = useAccordionItemContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Accordion.Header
      {...otherProps}
      {...proxyRenderProps<Accordion.Header.State, AccordionHeadingState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <AccordionHeadingContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AccordionHeadingContext>
          ),
          className: cn<AccordionHeadingState>(
            className,
            "sui_accordion_heading",
            // oxlint-disable-next-line typescript/no-deprecated -- Base UI の orientation を後方互換のため使用します。
            (state) => `sui_accordion_heading-size_${state.size}`,
            (state) => `sui_accordion_heading-radius_${state.radius}`,
            (state) => state.separator && "sui_accordion_heading-separator",
            (state) => state.disabled && "sui_accordion_heading-disabled",
            (state) => state.open && "sui_accordion_heading-open",
            (state) => state.hidden && "sui_accordion_heading-hidden",
            (state) => `sui_accordion_heading-index_${state.index}`,
            // oxlint-disable-next-line typescript/no-deprecated -- Base UI の orientation を後方互換のため使用します。
            (state) => `sui_accordion_heading-orientation_${state.orientation}`,
          ),
        },
      )}
    />
  );
};

export { AccordionHeading as Heading };
export namespace Heading {
  export type State = AccordionHeadingState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AccordionHeadingProps.Render;

    export type SuruUI = AccordionHeadingProps.SuruUI;

    export type BaseUI = AccordionHeadingProps.BaseUI;

    export type HTML = AccordionHeadingProps.HTML;
  }
}
