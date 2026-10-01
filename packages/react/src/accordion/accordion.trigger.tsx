import { Accordion } from "@base-ui/react/accordion";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import RenderElement from "../_render-element.jsx";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { useAccordionContext } from "./accordion.context.js";
import type { AccordionItemContext } from "./accordion.item.context.js";
import { AccordionTriggerContext } from "./accordion.trigger.context.js";

/**
 * {@link AccordionTrigger} が持つ状態です。
 */
export type AccordionTriggerState = Override<
  Override<AccordionItemContext, Accordion.Trigger.State>,
  {
    /**
     * `true` の場合、Suru UI のスタイルがついていません。
     */
    unstyled: boolean;
  }
>;

export namespace AccordionTriggerProps {
  export type Render = RenderProps<AccordionTriggerState>;

  export type SuruUI = {
    /**
     * `true` にすると Suru UI のスタイルがつかなくなります。
     *
     * これは主に、`render` prop でボタンコンポーネントを描画する際に使用されます。
     *
     * @default false
     */
    unstyled?: boolean | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Accordion.Trigger>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // AccordionTriggerProps:
      | never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Accordion.Trigger>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AccordionTrigger} に渡す props です。
 */
export type AccordionTriggerProps = AccordionTriggerProps.Render &
  AccordionTriggerProps.SuruUI &
  AccordionTriggerProps.BaseUI &
  AccordionTriggerProps.HTML;

export type IAccordionTrigger = IComponent<AccordionTriggerProps>;

/**
 * アコーディオンの開閉ボタンコンポーネントです。
 */
export const AccordionTrigger: IAccordionTrigger = function SuiAccordionTrigger(props) {
  const ctx = useAccordionContext();
  const { style, render, unstyled = false, className, ...otherProps } = props;

  return (
    <Accordion.Trigger
      {...otherProps}
      {...proxyRenderProps<Accordion.Trigger.State, AccordionTriggerState>(
        (state) => ({ ...ctx, ...state, unstyled }),
        {
          style,
          render: (htmlProps, state) => (
            <AccordionTriggerContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="button"
              />
            </AccordionTriggerContext>
          ),
          className: cn<AccordionTriggerState>(
            className,
            "sui_accordion_trigger",
            (state) => state.unstyled && "sui_accordion_trigger-unstyled",
            (state) => `sui_accordion_trigger-size_${state.size}`,
            (state) => `sui_accordion_trigger-radius_${state.radius}`,
            (state) => state.separator && "sui_accordion_trigger-separator",
            (state) => state.disabled && "sui_accordion_trigger-disabled",
            (state) => state.open && "sui_accordion_trigger-open",
            (state) => state.hidden && "sui_accordion_trigger-hidden",
            (state) => `sui_accordion_trigger-orientation_${state.orientation}`,
            (state) => `sui_accordion_trigger-index_${state.index}`,
          ),
        },
      )}
    />
  );
};

export { AccordionTrigger as Trigger };

export namespace Trigger {
  export type State = AccordionTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AccordionTriggerProps.Render;

    export type SuruUI = AccordionTriggerProps.SuruUI;

    export type BaseUI = AccordionTriggerProps.BaseUI;

    export type HTML = AccordionTriggerProps.HTML;
  }
}
