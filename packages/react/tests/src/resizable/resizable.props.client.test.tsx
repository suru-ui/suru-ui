import { describe, expectTypeOf, test } from "vitest";

import type {
  ResizableHandleProps,
  ResizablePanelProps,
  ResizableRootProps,
} from "../../../src/resizable/resizable.parts.js";

describe("Resizable の公開 props", () => {
  test("render を公開する", () => {
    expectTypeOf<ResizableRootProps>().toHaveProperty("render");
    expectTypeOf<ResizablePanelProps>().toHaveProperty("render");
    expectTypeOf<ResizableHandleProps>().toHaveProperty("render");
  });
});
