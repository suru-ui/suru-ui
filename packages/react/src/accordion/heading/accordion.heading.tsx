import { Accordion } from "@base-ui/react/accordion";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import type { AccordionItemContext } from "../item/accordion.item.context.js";
import { useAccordionContext } from "../root/accordion.root.context.js";

/**
 * {@link AccordionHeading} が持つ状態です。
 */
export type AccordionHeadingState = Override<AccordionItemContext, Accordion.Header.State>;

export namespace AccordionHeadingProps {
  export type Render = RenderProps<AccordionHeadingState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Accordion.Header>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AccordionHeaderProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Accordion.Header>,
    keyof Render | keyof SuruUI | keyof BaseUI
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

/**
 * アコーディオンの見出しコンポーネントです。
 */
export const AccordionHeading: IAccordionHeading = function SuiAccordionHeading(props) {
  const ctx = useAccordionContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Accordion.Header
      {...otherProps}
      {...proxyRenderProps<Accordion.Header.State, AccordionHeadingState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<AccordionHeadingState>(
            className,
            "sui_accordion_heading",
            (state) => `sui_accordion_heading-size_${state.size}`,
            (state) => `sui_accordion_heading-radius_${state.radius}`,
            (state) => state.separator && "sui_accordion_heading-separator",
            (state) => state.disabled && "sui_accordion_heading-disabled",
            (state) => state.open && "sui_accordion_heading-open",
            (state) => state.hidden && "sui_accordion_heading-hidden",
            (state) => `sui_accordion_heading-index_${state.index}`,
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
