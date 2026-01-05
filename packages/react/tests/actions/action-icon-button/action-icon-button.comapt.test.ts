import type { Button } from "@base-ui/react";
import type * as React from "react";
import { expectTypeOf, test } from "vitest";
import type { ActionIconButtonState } from "../../../src/actions/action-icon-button/index.js";
import type { $PickBaseUiProps, HtmlProps } from "../../_type-utils.js";

// https://base-ui.com/react/components/button#api-reference
test("Button.Props が期待する型である", () => {
  type Props = $PickBaseUiProps<Button.Props>;

  expectTypeOf<keyof Props>()
    .toEqualTypeOf<
      | "focusableWhenDisabled"
      | "nativeButton"
      | "disabled"
      | "className"
      | "style"
      | "render"
    >();
  expectTypeOf<Props>()
    .toEqualTypeOf<{
      focusableWhenDisabled?: boolean;
      nativeButton?: boolean;
      disabled?: boolean;
      className?:
        | string
        | ((state: Button.State) => string | undefined);
      style?:
        | React.CSSProperties
        | (React.CSSProperties & ((state: Button.State) => React.CSSProperties | undefined));
      render?:
        | React.ReactElement
        | ((props: HtmlProps, state: Button.State) => React.ReactElement);
    }>();
});

test("Button.State が期待する型である", () => {
  expectTypeOf<Button.State>()
    .toEqualTypeOf<{
      disabled: boolean;
    }>();
});

test("Button.State と ActionIconButtonState が一致する", () => {
  expectTypeOf<Button.State>()
    .toEqualTypeOf<ActionIconButtonState>();
});
