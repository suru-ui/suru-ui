import { test, vi } from "vitest";
import { renderHook } from "vitest-browser-react";
import useSingleton from "../../src/shared/use-singleton.js";

test("初回レンダリング時、初期化関数によって生成された値を返す", async ({ expect }) => {
  // Arrange
  const expectedValue = "initial value";
  const initFn = () => expectedValue;

  // Act
  const { result } = await renderHook(() => useSingleton(initFn));

  // Assert
  expect(result.current).toBe(expectedValue);
});

test("再レンダリングされても、最初に生成された値を返し続ける", async ({ expect }) => {
  // Arrange
  let count = 0;
  const initFn = () => {
    count += 1;
    return `value-${count}`;
  };

  // Act
  const { result, rerender } = await renderHook(() => useSingleton(initFn));
  const firstValue = result.current;

  await rerender();

  // Assert
  expect(result.current).toBe(firstValue);
});

test("再レンダリングが発生した際、初期化関数は 2 回目以降呼び出されない", async ({ expect }) => {
  // Arrange
  const initFn = vi.fn(() => ({ id: Math.random() }));

  // Act
  const { rerender } = await renderHook(() => useSingleton(initFn));

  // 初回レンダリング後の状態を確認
  expect(initFn).toHaveBeenCalledTimes(1);

  await rerender();
  await rerender();

  // Assert
  expect(initFn).toHaveBeenCalledTimes(1);
});

test("初期化関数が undefined を返す場合でも、再レンダリング時に再評価されない", async ({ expect }) => {
  // Arrange
  const initFn = vi.fn(() => undefined);

  // Act
  const { result, rerender } = await renderHook(() => useSingleton(initFn));

  // 初回レンダリング
  expect(result.current).toBeUndefined();
  expect(initFn).toHaveBeenCalledTimes(1);

  await rerender();

  // Assert
  expect(result.current).toBeUndefined();
  expect(initFn).toHaveBeenCalledTimes(1);
});

test("初期化関数が null を返す場合でも、再レンダリング時に再評価されない", async ({ expect }) => {
  // Arrange
  const initFn = vi.fn(() => null);

  // Act
  const { result, rerender } = await renderHook(() => useSingleton(initFn));

  // 初回レンダリング
  expect(result.current).toBeNull();
  expect(initFn).toHaveBeenCalledTimes(1);

  await rerender();

  // Assert
  expect(result.current).toBeNull();
  expect(initFn).toHaveBeenCalledTimes(1);
});
