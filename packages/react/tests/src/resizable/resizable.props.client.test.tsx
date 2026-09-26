import { describe, expectTypeOf, test } from "vitest";

import type {
  ResizableHandleProps,
  ResizablePanelProps,
  ResizableRootProps,
} from "../../../src/resizable/resizable.parts.js";

describe("Resizable の公開 props", () => {
  test("render を公開しない", () => {
    expectTypeOf<ResizableRootProps>().not.toHaveProperty("render");
    expectTypeOf<ResizablePanelProps>().not.toHaveProperty("render");
    expectTypeOf<ResizableHandleProps>().not.toHaveProperty("render");
  });
});
