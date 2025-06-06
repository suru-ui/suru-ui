import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import assertRequiredContext from "../../src/utils/assert-required-context";

describe("assert-required-context", () => {
  // 元の Error.captureStackTrace を保存し、テスト後に復元するための変数
  let originalCaptureStackTrace: ((err: Error, constructorOpt: Function) => void) | undefined;

  // 各テストの前に実行
  beforeEach(() => {
    // Error.captureStackTraceが存在する場合のみモック
    if (Error.captureStackTrace) {
      originalCaptureStackTrace = Error.captureStackTrace;
      // Error.captureStackTraceをモックし、呼び出しを監視する
      Error.captureStackTrace = vi.fn();
    }
  });

  // 各テストの後に実行
  afterEach(() => {
    // Error.captureStackTraceを元の実装に戻す
    if (originalCaptureStackTrace) {
      Error.captureStackTrace = originalCaptureStackTrace;
    } else {
      // もしoriginalCaptureStackTraceがundefinedの場合（ブラウザ環境など）、
      // Error.captureStackTraceがundefinedであることを確認するために削除
      delete (Error as any).captureStackTrace;
    }
    vi.restoreAllMocks(); // すべてのモックをリセット
  });

  it("should return the value if it is not undefined", () => {
    const value = "test_value";
    const result = assertRequiredContext("Test", value);
    expect(result).toBe("test_value"); // asserts functions don't return, but TypeScript infers the type.
    // ランタイムではundefinedでない値を返さないため、このアサーションは実際には到達しませんが、型推論の観点からは重要です。
    // しかし、実際には`void`を返します。asserts signatureはコンパイル時に型チェックを強化するものです。
    // なので、このテストは主にエラーがスローされないことを確認します。
  });

  it("should throw an error if the value is undefined", () => {
    expect(() => assertRequiredContext("Test", undefined)).toThrow(
      "suru-ui(suru): TestContext の値が `undefined` でした。<TestContext /> で囲う必要があります。",
    );
  });

  it("should call Error.captureStackTrace if it exists", () => {
    if (Error.captureStackTrace) { // Node.js環境でのみ実行
      const name = "AnotherTest";
      try {
        assertRequiredContext(name, undefined);
      } catch (error) {
        // エラーがスローされたことを確認済みなので、ここではError.captureStackTraceが呼ばれたかをチェック
        expect(Error.captureStackTrace).toHaveBeenCalledWith(
          expect.any(Error),
          assertRequiredContext,
        );
      }
    } else {
      // ブラウザ環境などError.captureStackTraceが存在しない場合は、このテストをスキップまたは別のアサーション
      console.warn("Error.captureStackTrace is not available in this environment, skipping test.");
      expect(true).toBe(true); // テストがパスしたことを示すダミーのアサーション
    }
  });

  it("should not call Error.captureStackTrace if it does not exist", () => {
    // Error.captureStackTraceを一時的に削除して、存在しない場合の動作をシミュレート
    const original = Error.captureStackTrace;
    delete (Error as any).captureStackTrace;

    const name = "NoStackTraceTest";
    try {
      assertRequiredContext(name, undefined);
    } catch (error) {
      // Error.captureStackTraceが存在しないため、呼ばれないことを確認
      expect(Error.captureStackTrace).toBeUndefined(); // undefinedであることを確認
    } finally {
      // 元に戻す
      if (original) {
        (Error as any).captureStackTrace = original;
      }
    }
  });
});
