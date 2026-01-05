import type { Input } from "@base-ui/react";
import type * as React from "react";
import { expectTypeOf, test } from "vitest";
import type { InputState } from "../../../src/inputs/input/index.js";
import type { $PickBaseUiProps, HtmlProps } from "../../_type-utils.js";

// https://base-ui.com/react/components/input#api-reference
test("Input.Props が期待する型である", () => {
  type Props = $PickBaseUiProps<Input.Props, "defaultValue">;

  expectTypeOf<keyof Props>()
    .toEqualTypeOf<
      | "defaultValue"
      | "onValueChange"
      | "className"
      | "style"
      | "render"
      // HTML 属性
      | "accept"
      | "alt"
      | "autoComplete"
      | "capture"
      | "checked"
      | "disabled"
      | "form"
      | "formAction"
      | "formEncType"
      | "formMethod"
      | "formNoValidate"
      | "formTarget"
      | "height"
      | "list"
      | "max"
      | "maxLength"
      | "min"
      | "minLength"
      | "multiple"
      | "name"
      | "pattern"
      | "placeholder"
      | "readOnly"
      | "required"
      | "size"
      | "src"
      | "step"
      | "type"
      | "value"
      | "width"
    >();
  expectTypeOf<Props>()
    .omit<
      | "accept"
      | "alt"
      | "autoComplete"
      | "capture"
      | "checked"
      | "disabled"
      | "form"
      | "formAction"
      | "formEncType"
      | "formMethod"
      | "formNoValidate"
      | "formTarget"
      | "height"
      | "list"
      | "max"
      | "maxLength"
      | "min"
      | "minLength"
      | "multiple"
      | "name"
      | "pattern"
      | "placeholder"
      | "readOnly"
      | "required"
      | "size"
      | "src"
      | "step"
      | "type"
      | "value"
      | "width"
    >()
    .toEqualTypeOf<{
      defaultValue?: string | number | readonly string[] | undefined;
      onValueChange?: (value: string, details: Input.ChangeEventDetails) => void;
      className?:
        | string
        | ((state: Input.State) => string | undefined);
      style?:
        | React.CSSProperties
        | (React.CSSProperties & ((state: Input.State) => React.CSSProperties | undefined));
      render?:
        | React.ReactElement
        | ((props: HtmlProps, state: Input.State) => React.ReactElement);
    }>();
});

test("Input.State と InputState が一致する", () => {
  expectTypeOf<Input.State>()
    .toEqualTypeOf<InputState>();
});
