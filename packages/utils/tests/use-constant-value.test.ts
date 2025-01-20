import { renderHook } from "@testing-library/react";
import { expect, test } from "vitest";
import useConstantValue from "../src/use-constant-value";

test("常に同じ値を返す", () => {
  const obj = {};
  const { result, rerender } = renderHook(() => useConstantValue(obj));

  expect(result.current).toBe(obj);

  rerender();

  expect(result.current).toBe(obj);
});
