import { describe, expect, test } from "vitest";

import cn from "../src/cn.js";

function call<TState>(className: unknown, state: TState): string | undefined {
  return typeof className === "function"
    ? (className as (state: TState) => string | undefined)(state)
    : undefined;
}

describe("cn", () => {
  test("文字列をスペース区切りで結合する", () => {
    // 実行
    const result = cn("foo", "bar", "baz");

    // 検証
    expect(result).toBe("foo bar baz");
  });

  test("falsy な値を無視する", () => {
    // 実行
    const result = cn("foo", null, 0, undefined);

    // 検証
    expect(result).toBe("foo");
  });

  test("値が全部 falsy の場合は undefined を返す", () => {
    // 実行
    const result = cn(false, null, undefined);

    // 検証
    expect(result).toBe(undefined);
  });

  test("引数がない場合は undefined を返す", () => {
    // 実行
    const result = cn();

    // 検証
    expect(result).toBe(undefined);
  });

  test("関数が含まれる場合は状態を受け取る関数を返す", () => {
    // 実行
    const className = cn("foo", (state: { disabled: boolean }) => state.disabled && "disabled");

    // 検証
    expect(className).toBeTypeOf("function");
    expect(call(className, { disabled: true })).toBe("foo disabled");
    expect(call(className, { disabled: false })).toBe("foo");
  });

  test("関数が falsy を返す場合はスキップする", () => {
    // 実行
    const className = cn((state: { value: number }) => state.value > 0 && "positive");

    // 検証
    expect(call(className, { value: 1 })).toBe("positive");
    expect(call(className, { value: 0 })).toBe(undefined);
  });

  test("文字列と関数を混在させられる", () => {
    // 実行
    const className = cn("a", "b", (state: { active: boolean }) => state.active && "c");

    // 検証
    expect(call(className, { active: true })).toBe("a b c");
    expect(call(className, { active: false })).toBe("a b");
  });
});
