import type { Field, Form } from "@base-ui/react";
import type * as React from "react";
import { expectTypeOf, test } from "vitest";
import type { $PickBaseUiProps, HtmlProps } from "../../_type-utils.js";

// https://base-ui.com/react/components/field#root
test("Field.Root.Props が期待する型である", () => {
  type Props = $PickBaseUiProps<Field.Root.Props>;

  expectTypeOf<keyof Props>()
    .toEqualTypeOf<
      | "name"
      | "dirty"
      | "touched"
      | "disabled"
      | "invalid"
      | "validate"
      | "validationMode"
      | "validationDebounceTime"
      | "className"
      | "style"
      | "render"
    >();
  expectTypeOf<Props>()
    .toEqualTypeOf<{
      name?: string;
      dirty?: boolean;
      touched?: boolean;
      disabled?: boolean;
      invalid?: boolean;
      validate?: (
        value: unknown,
        formValues: Form.Values,
      ) => string | string[] | null | Promise<string | string[] | null>;
      validationMode?: "onBlur" | "onChange" | "onSubmit";
      validationDebounceTime?: number;
      className?:
        | string
        | ((state: Field.Root.State) => string | undefined);
      style?:
        | React.CSSProperties
        | (React.CSSProperties & ((state: Field.Root.State) => React.CSSProperties | undefined));
      render?:
        | React.ReactElement
        | ((props: HtmlProps, state: Field.Root.State) => React.ReactElement);
    }>();
});
