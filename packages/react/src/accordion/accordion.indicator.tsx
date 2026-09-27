import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import { ChevronIcon } from "../_icons.jsx";
import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { useAccordionItemContext, type AccordionItemContext } from "./accordion.item.context.js";

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

/**
 * アコーディオンの展開状態を示すアイコンを表示するコンポーネントです。
 */
export const AccordionIndicator: IComponent<AccordionIndicatorProps> =
  function SuiAccordionIndicator(props) {
    const ctx = useAccordionItemContext();
    const { children = <ChevronIcon />, ...otherSpanProps } = props;

    return useRender({
      state: ctx,
      props: [
        otherSpanProps,
        {
          children,
          className: "sui_accordion_indicator",
        },
      ],
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
