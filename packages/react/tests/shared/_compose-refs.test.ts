import { describe, test, vi } from "vitest";
import composeRefs from "../../src/shared/_compose-refs.js";

describe("複数の ref を結合する場合", () => {
  test("関数 ref とオブジェクト ref の両方にインスタンスが設定されるとき、すべての ref が更新される", ({ expect }) => {
    // Arrange
    const functionalRef = vi.fn();
    const objectRef = { current: null as string | null };
    const instance = "test-instance";
    const composed = composeRefs(functionalRef, objectRef);

    // Act
    composed(instance);

    // Assert
    expect(functionalRef).toHaveBeenCalledWith(instance);
    expect(objectRef.current).toBe(instance);
  });

  test("一部の ref が null の場合、有効な ref のみが更新される", ({ expect }) => {
    // Arrange
    const functionalRef = vi.fn();
    const instance = "test-instance";
    // @ts-expect-error: テストのために null を許容する。
    const composed = composeRefs(functionalRef, null, undefined);

    // Act
    composed(instance);

    // Assert
    expect(functionalRef).toHaveBeenCalledWith(instance);
  });
});

describe("クリーンアップの振る舞い", () => {
  test("関数 ref がクリーンアップ関数を返すとき、結合されたクリーンアップ関数を実行すると元のクリーンアップが呼ばれる", ({ expect }) => {
    // Arrange
    const cleanup = vi.fn();
    const functionalRef = vi.fn().mockReturnValue(cleanup);
    const composed = composeRefs(functionalRef);
    const runCleanup = composed("instance");

    // Act
    runCleanup();

    // Assert
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  test("複数のクリーンアップ関数があるとき、LIFO（後入れ先出し）の順序で実行される", ({ expect }) => {
    // Arrange
    const executionOrder: string[] = [];
    const cleanup1 = vi.fn(() => executionOrder.push("first"));
    const cleanup2 = vi.fn(() => executionOrder.push("second"));

    const ref1 = vi.fn().mockReturnValue(cleanup1);
    const ref2 = vi.fn().mockReturnValue(cleanup2);

    const composed = composeRefs(ref1, ref2);
    const runCleanup = composed("instance");

    // Act
    runCleanup();

    // Assert
    expect(executionOrder).toHaveLength(2);
    expect(executionOrder[0]).toBe("second");
    expect(executionOrder[1]).toBe("first");
  });
});

describe("例外ハンドリング", () => {
  test("1 つのクリーンアップ関数が例外を投げたとき、その例外がそのままスローされる", ({ expect }) => {
    // Arrange
    const error = new Error("Cleanup error");
    const cleanup = vi.fn(() => {
      throw error;
    });
    const ref = vi.fn().mockReturnValue(cleanup);
    const composed = composeRefs(ref);
    const runCleanup = composed("instance");

    // Act & Assert
    expect(() => runCleanup()).toThrow(error);
  });

  test("複数のクリーンアップ関数が例外を投げたとき、AggregateError として集約される", ({ expect }) => {
    // Arrange
    const error1 = new Error("Error 1");
    const error2 = new Error("Error 2");
    const ref1 = vi.fn().mockReturnValue(() => {
      throw error1;
    });
    const ref2 = vi.fn().mockReturnValue(() => {
      throw error2;
    });

    const composed = composeRefs(ref1, ref2);
    const runCleanup = composed("instance");

    // Act & Assert
    try {
      runCleanup();
      expect.fail("AggregateError が投げられているべき");
    } catch (e) {
      expect(e).toBeInstanceOf(AggregateError);
      const aggregateError = e as AggregateError;
      expect(aggregateError.errors).toHaveLength(2);
      // LIFO なので ref2 のエラーが先に来る。
      expect(aggregateError.errors[0]).toBe(error2);
      expect(aggregateError.errors[1]).toBe(error1);
    }
  });
});
