import { renderHook } from "@testing-library/react";
import { expect, test } from "vitest";
import useMergeProps from "../src/use-merge-props";

test("各プロパティが同じ値なら同じ結果を返す", () => {
  const onClickA = () => {};
  const onClickB = () => {};
  const onClickC = () => {};
  const { result, rerender } = renderHook(
    ({
      onClickA,
      onClickB,
      onClickC,
    }) =>
      useMergeProps(
        { onClick: onClickA },
        { onClick: onClickB },
        { onClick: onClickC },
      ),
    {
      initialProps: {
        onClickA,
        onClickB,
        onClickC,
      },
    },
  );
  const handler = result.current.onClick;

  rerender({
    onClickA,
    onClickB,
    onClickC,
  });

  expect(result.current.onClick).toBe(handler);
});

test("変更されパプロパティがあれば結果も変わる", () => {
  const onClickA = () => {};
  const onClickB = () => {};
  const onClickC = () => {};
  const { result, rerender } = renderHook(
    ({
      onClickA,
      onClickB,
      onClickC,
    }) =>
      useMergeProps(
        { onClick: onClickA },
        { onClick: onClickB },
        { onClick: onClickC },
      ),
    {
      initialProps: {
        onClickA,
        onClickB,
        onClickC,
      },
    },
  );
  const handler = result.current.onClick;

  rerender({
    onClickA,
    onClickB: () => {}, // 変更
    onClickC,
  });

  expect(result.current.onClick).not.toBe(handler);
});
