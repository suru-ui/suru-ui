import { Accordion } from "@base-ui/react/accordion";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AccordionTrigger} が持つ状態です。
 */
export type AccordionTriggerState = Accordion.Trigger.State;

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
  const { unstyled = false, className, ...otherProps } = props;

  return (
    <Accordion.Trigger
      {...otherProps}
      className={cn(
        className,
        "sui_accordion_trigger",
        unstyled && "sui_accordion_trigger-unstyled",
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
