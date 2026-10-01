import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import { ChevronIcon } from "../_icons.jsx";
import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { type AccordionItemContext, useAccordionItemContext } from "./accordion.item.context.js";

/**
 * {@link AccordionIndicator} が持つ状態です。
 */
export type AccordionIndicatorState = AccordionItemContext;

export namespace AccordionIndicatorProps {
  export type Render = RenderProps<AccordionIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AccordionIndicator} に渡す props です。
 */
export type AccordionIndicatorProps = AccordionIndicatorProps.Render &
  AccordionIndicatorProps.SuruUI &
  AccordionIndicatorProps.BaseUI &
  AccordionIndicatorProps.HTML;

export type IAccordionIndicator = IComponent<AccordionIndicatorProps>;

/**
 * アコーディオンの展開状態を示すアイコンを表示するコンポーネントです。
 */
export const AccordionIndicator: IAccordionIndicator = function SuiAccordionIndicator(props) {
  const ctx = useAccordionItemContext();
  const { children = <ChevronIcon />, ...otherSpanProps } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        children,
        className: cn<AccordionIndicatorState>(
          "sui_accordion_indicator",
          (state) => `sui_accordion_indicator-size_${state.size}`,
          (state) => `sui_accordion_indicator-radius_${state.radius}`,
          (state) => state.separator && "sui_accordion_indicator-separator",
          (state) => state.disabled && "sui_accordion_indicator-disabled",
          (state) => state.open && "sui_accordion_indicator-open",
          (state) => state.hidden && "sui_accordion_indicator-hidden",
          (state) => `sui_accordion_indicator-orientation_${state.orientation}`,
          (state) => `sui_accordion_indicator-index_${state.index}`,
        ),
      },
    ],
    state: ctx,
    defaultTagName: "span",
  });
};

export { AccordionIndicator as Indicator };

export namespace Indicator {
  export type State = AccordionIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AccordionIndicatorProps.Render;

    export type SuruUI = AccordionIndicatorProps.SuruUI;

    export type BaseUI = AccordionIndicatorProps.BaseUI;

    export type HTML = AccordionIndicatorProps.HTML;
  }
}
