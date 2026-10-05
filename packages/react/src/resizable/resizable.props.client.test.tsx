import { test, describe, expectTypeOf } from "vitest";

import type {
  ResizableRootProps,
  ResizablePanelProps,
  ResizableHandleProps,
} from "./resizable.parts.js";

describe("Resizable の公開 props", () => {
  test("render を公開する", () => {
    expectTypeOf<ResizableRootProps>().toHaveProperty("render");
    expectTypeOf<ResizablePanelProps>().toHaveProperty("render");
    expectTypeOf<ResizableHandleProps>().toHaveProperty("render");
  });
});
