import type { Tooltip } from "@base-ui/react";
import type * as React from "react";
import { describe, expectTypeOf, test } from "vitest";
import type {
  Align,
  Side,
  TooltipActions,
  TooltipContentState,
  TooltipOpenChangeEventDetails,
  TooltipTriggerState,
} from "../../../src/feedback/use-tooltip/use-tooltip.jsx";
import type { Padding, Rect, VirtualElement } from "../../../src/shared/types.js";
import type { $PickBaseUiProps, HtmlProps } from "../../_type-utils.js";

// https://base-ui.com/react/components/tooltip#root
describe("Tooltip.Root", () => {
  test("Props が期待する型である", () => {
    type Props = $PickBaseUiProps<Tooltip.Root.Props>;

    expectTypeOf<keyof Props>()
      .toEqualTypeOf<
        | "defaultOpen"
        | "open"
        | "onOpenChange"
        | "actionsRef"
        | "defaultTriggerId"
        | "handle"
        | "onOpenChangeComplete"
        | "triggerId"
        | "trackCursorAxis"
        | "disabled"
        | "disableHoverablePopup"
      >();
    expectTypeOf<Props>()
      .omit<"handle">()
      .toEqualTypeOf<{
        defaultOpen?: boolean;
        open?: boolean;
        onOpenChange?: (open: boolean, eventDetails: Tooltip.Root.ChangeEventDetails) => void;
        actionsRef?: React.RefObject<Tooltip.Root.Actions>;
        defaultTriggerId?:
          | string
          | null;
        onOpenChangeComplete?: (open: boolean) => void;
        triggerId?:
          | string
          | null;
        trackCursorAxis?:
          | "none"
          | "x"
          | "y"
          | "both";
        disabled?: boolean;
        disableHoverablePopup?: boolean;
      }>();
  });

  test("Actions と TooltipActions が一致する", () => {
    expectTypeOf<Tooltip.Root.Actions>()
      .toEqualTypeOf<TooltipActions>();
  });

  test("ChangeEventDetails と TooltipOpenChangeEventDetails が一致する", () => {
    expectTypeOf<
      { [P in keyof Tooltip.Root.ChangeEventDetails]: Tooltip.Root.ChangeEventDetails[P] }
    >()
      .toEqualTypeOf<TooltipOpenChangeEventDetails>();
  });
});

// https://base-ui.com/react/components/tooltip#trigger
describe("Tooltip.Trigger", () => {
  test("Props が期待する型である", () => {
    type Props = $PickBaseUiProps<Tooltip.Trigger.Props>;

    expectTypeOf<keyof Props>()
      .toEqualTypeOf<
        | "handle"
        | "payload"
        | "delay"
        | "closeDelay"
        | "className"
        | "style"
        | "render"
        | "disabled"
        | "form"
        | "formAction"
        | "formEncType"
        | "formMethod"
        | "formNoValidate"
        | "formTarget"
        | "name"
        | "type"
        | "value"
      >();
    expectTypeOf<Props>()
      .omit<"handle">()
      .omit<"disabled">()
      .omit<"form">()
      .omit<"formAction">()
      .omit<"formEncType">()
      .omit<"formMethod">()
      .omit<"formNoValidate">()
      .omit<"formTarget">()
      .omit<"name">()
      .omit<"type">()
      .omit<"value">()
      .toEqualTypeOf<{
        payload?: unknown;
        delay?: number;
        closeDelay?: number;
        className?:
          | string
          | ((state: Tooltip.Trigger.State) => string | undefined);
        style?:
          | React.CSSProperties
          | (
            & React.CSSProperties
            & ((state: Tooltip.Trigger.State) => React.CSSProperties | undefined)
          );
        render?:
          | React.ReactElement
          | ((props: HtmlProps, state: Tooltip.Trigger.State) => React.ReactElement);
      }>();
  });

  test("Button.State と ButtonState が一致する", () => {
    expectTypeOf<Tooltip.Trigger.State>()
      .toEqualTypeOf<TooltipTriggerState>();
  });
});

// https://base-ui.com/react/components/tooltip#portal
describe("Tooltip.Portal", () => {
  test("Props が期待する型である", () => {
    type Props = $PickBaseUiProps<Tooltip.Portal.Props>;

    expectTypeOf<keyof Props>()
      .toEqualTypeOf<
        | "container"
        | "className"
        | "style"
        | "keepMounted"
        | "render"
      >();
    expectTypeOf<Props>()
      .omit<"container">()
      .omit<"className">()
      .omit<"style">()
      .omit<"render">()
      .toEqualTypeOf<{
        // container?:
        //   | HTMLElement
        //   | ShadowRoot
        //   | React.RefObject<HTMLElement | ShadowRoot | null>
        //   | null;
        // className?:
        //   | string
        //   | ((state: Tooltip.Portal.State) => string | undefined);
        // style?:
        //   | React.CSSProperties
        //   | (
        //     & React.CSSProperties
        //     & ((state: Tooltip.Portal.State) => React.CSSProperties | undefined)
        //   );
        keepMounted?: boolean;
        // render?:
        //   | React.ReactElement
        //   | ((props: HtmlProps, state: Tooltip.Portal.State) => React.ReactElement);
      }>();
  });
});

// https://base-ui.com/react/components/tooltip#positioner
describe("Tooltip.Positioner", () => {
  test("Props が期待する型である", () => {
    type Props = $PickBaseUiProps<Tooltip.Positioner.Props>;

    expectTypeOf<keyof Props>()
      .toEqualTypeOf<
        | "disableAnchorTracking"
        | "align"
        | "alignOffset"
        | "side"
        | "sideOffset"
        | "arrowPadding"
        | "anchor"
        | "collisionAvoidance"
        | "collisionBoundary"
        | "collisionPadding"
        | "sticky"
        | "positionMethod"
        | "className"
        | "style"
        | "render"
      >();
    expectTypeOf<Props>()
      .omit<"sideOffset">()
      .omit<"arrowPadding">()
      .omit<"className">()
      .omit<"style">()
      .omit<"render">()
      .toEqualTypeOf<{
        disableAnchorTracking?: boolean;
        align?: Align;
        alignOffset?:
          | number
          | ((
            data: {
              side: Side;
              align: Align;
              anchor: {
                width: number;
                height: number;
              };
              positioner: {
                width: number;
                height: number;
              };
            },
          ) => number);
        side?: Side;
        // sideOffset?:
        //   | number
        //   | ((
        //     data: {
        //       side: Side;
        //       align: Align;
        //       anchor: {
        //         width: number;
        //         height: number;
        //       };
        //       positioner: {
        //         width: number;
        //         height: number;
        //       };
        //     },
        //   ) => number);
        // arrowPadding?: number;
        anchor?:
          | Element
          | React.RefObject<Element | null>
          | VirtualElement
          | (() => Element | VirtualElement | null)
          | null;
        collisionAvoidance?:
          | {
            side?: "none" | "flip";
            align?: "none" | "flip" | "shift";
            fallbackAxisSide?: "none" | "end" | "start";
          }
          | {
            side?: "none" | "shift";
            align?: "none" | "shift";
            fallbackAxisSide?: "none" | "end" | "start";
          };
        collisionBoundary?:
          | Element
          | "clipping-ancestors"
          | Element[]
          | Rect;
        collisionPadding?: Padding | number;
        sticky?: boolean;
        positionMethod?: "fixed" | "absolute";
        // className?:
        //   | string
        //   | ((state: Tooltip.Positioner.State) => string | undefined);
        // style?:
        //   | React.CSSProperties
        //   | (
        //     & React.CSSProperties
        //     & ((state: Tooltip.Positioner.State) => React.CSSProperties | undefined)
        //   );
        // render?:
        //   | React.ReactElement
        //   | ((props: HtmlProps, state: Tooltip.Positioner.State) => React.ReactElement);
      }>();
  });
});

// https://base-ui.com/react/components/tooltip#popup
describe("Tooltip.Popup", () => {
  test("Props が期待する型である", () => {
    type Props = $PickBaseUiProps<Tooltip.Popup.Props>;

    expectTypeOf<keyof Props>()
      .toEqualTypeOf<
        | "className"
        | "style"
        | "render"
      >();
    expectTypeOf<Props>()
      .toEqualTypeOf<{
        className?:
          | string
          | ((state: Tooltip.Popup.State) => string | undefined);
        style?:
          | React.CSSProperties
          | (
            & React.CSSProperties
            & ((state: Tooltip.Popup.State) => React.CSSProperties | undefined)
          );
        render?:
          | React.ReactElement
          | ((props: HtmlProps, state: Tooltip.Popup.State) => React.ReactElement);
      }>();
  });

  test("State と TooltipContentState が一致する", () => {
    expectTypeOf<Tooltip.Popup.State>()
      .toEqualTypeOf<TooltipContentState>();
  });
});

// // https://base-ui.com/react/components/tooltip#arrow
// describe("Tooltip.Arrow", () => {});
