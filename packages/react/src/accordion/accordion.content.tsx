import { Accordion } from "@base-ui/react/accordion";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AccordionContent} が持つ状態です。
 */
export type AccordionContentState = Accordion.Panel.State;

export namespace AccordionContentProps {
  export type Render = RenderProps<AccordionContentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Accordion.Panel>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // Pick<AccordionRoot.Props, 'hiddenUntilFound' | 'keepMounted'>:
      | "hiddenUntilFound"
      | "keepMounted"
      // AccordionPanelProps:
      | never,
      keyof Render | keyof SuruUI
    >
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

/**
 * アコーディオンのパネルコンポーネントです。
 */
export const AccordionContent: IComponent<AccordionContentProps> = function SuiAccordionContent(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <Accordion.Panel
      {...otherProps}
      className={cn(
        className,
        "sui_accordion_content",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_accordion_content-transition_status_${state.transitionStatus}`,
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
