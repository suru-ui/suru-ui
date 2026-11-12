import { setGlobalConfig, deleteGlobalConfig } from "valibot";
import { test, expect, describe, afterEach } from "vite-plus/test";

import { ErrorBase, setErrorMessage } from "../src/index.js";

describe("ErrorBase", () => {
  test("message に文字列を渡せる", () => {
    // 準備：
    class SampleError extends ErrorBase<undefined> {
      public constructor() {
        super("メッセージ");
      }
    }

    // 実行：
    const error = new SampleError();

    // 検証：
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("メッセージ");
  });

  test("メタデータからメッセージを生成する", () => {
    // 準備：
    class SampleError extends ErrorBase<{ code: number }> {
      public constructor() {
        super({ code: 42 }, ({ code }) => `エラーコード: ${code}`);
      }
    }

    // 実行：
    const error = new SampleError();

    // 検証：
    expect(error.message).toBe("エラーコード: 42");
  });
});

describe("setErrorMessage", () => {
  afterEach(() => {
    deleteGlobalConfig();
  });

  test("言語に応じてメッセージを切り替える", () => {
    // 準備：
    class SampleError extends ErrorBase<{ code: number }> {
      public constructor() {
        super({ code: 42 }, ({ code }) => `Error: ${code}`);
      }
    }

    setErrorMessage(SampleError, ({ code }) => `エラーコード: ${code}`, "ja");
    setGlobalConfig({ lang: "ja" });

    // 実行：
    const error = new SampleError();

    // 検証：
    expect(error.message).toBe("エラーコード: 42");
  });

  test("未登録の言語では既定のメッセージにフォールバックする", () => {
    // 準備：
    class SampleError extends ErrorBase<{ code: number }> {
      public constructor() {
        super({ code: 42 }, ({ code }) => `Error: ${code}`);
      }
    }

    setErrorMessage(SampleError, ({ code }) => `エラーコード: ${code}`, "ja");
    setGlobalConfig({ lang: "fr" });

    // 実行：
    const error = new SampleError();

    // 検証：
    expect(error.message).toBe("Error: 42");
  });
});
