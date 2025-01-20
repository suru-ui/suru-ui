import * as React from "react";
import { expect, test, vi } from "vitest";
import composeRefs from "../src/compose-refs";

test("複数の ref を結合する", () => {
  const ref = React.createRef();

  const cleanupHistory: any[] = [];
  const callbackHistory: any[] = [];

  const refCleanup1 = vi.fn(() => {
    cleanupHistory.push(1);
  });
  const refCallback1 = vi.fn((_: any) => {
    callbackHistory.push(1);
    return refCleanup1;
  });

  const refCleanup2 = vi.fn(() => {
    cleanupHistory.push(2);
  });
  const refCallback2 = vi.fn((_: any) => {
    callbackHistory.push(2);
    return refCleanup2;
  });

  const composedRef = composeRefs(
    null,
    ref,
    refCallback1,
    refCallback2,
  );
  const VALUE = {};
  const cleanup = composedRef(VALUE);

  // ref
  {
    expect(ref.current).toBe(VALUE);
  }

  // callback
  {
    expect(refCallback1.mock.calls[0]?.[0]).toBe(VALUE);
    expect(refCallback2.mock.calls[0]?.[0]).toBe(VALUE);
    expect(callbackHistory).toStrictEqual([1, 2]);
  }

  // cleanup
  {
    expect(cleanupHistory).toStrictEqual([]);

    cleanup();

    expect(cleanupHistory).toStrictEqual([2, 1]);
  }
});
