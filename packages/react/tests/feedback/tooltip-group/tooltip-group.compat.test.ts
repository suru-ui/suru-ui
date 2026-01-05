import type { Tooltip } from "@base-ui/react";
import { describe, expectTypeOf, test } from "vitest";
import type { $PickBaseUiProps } from "../../_type-utils.js";

// https://base-ui.com/react/components/tooltip#provider
describe("Tooltip.Provider", () => {
  test("Props が期待する型である", () => {
    type Props = $PickBaseUiProps<Tooltip.Provider.Props>;

    expectTypeOf<keyof Props>()
      .toEqualTypeOf<
        | "delay"
        | "closeDelay"
        | "timeout"
      >();
    expectTypeOf<Props>()
      .toEqualTypeOf<{
        delay?: number;
        closeDelay?: number;
        timeout?: number;
      }>();
  });
});
