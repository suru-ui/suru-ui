import { deleteGlobalConfig, setGlobalConfig } from "valibot";
import { afterEach, describe, expect, test } from "vitest";

import { ContextMissingError, ErrorBase, setErrorMessage } from "../src/errors.js";

afterEach(() => {
  deleteGlobalConfig();
});

describe("ErrorBase", () => {
  test("message に文字列を渡せる", () => {
    // 準備
    class SampleError extends ErrorBase<undefined> {
      public constructor() {
        super("メッセージ");
      }
    }

    // 実行
    const error = new SampleError();

    // 検証
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("メッセージ");
  });
});

describe("ContextMissingError", () => {
  test("メッセージを生成する", () => {
    // 実行
    const error = new ContextMissingError({
      contextName: "ButtonContext",
      providerName: "ButtonRoot",
    });

    // 検証
    expect(error).toBeInstanceOf(ErrorBase);
    expect(error.name).toBe("SuiContextMissingError");
    expect(error.message).toBe("ButtonContext is missing. Must be placed within <ButtonRoot>");
  });

  test("providerName を省略すると contextName が使われる", () => {
    // 実行
    const error = new ContextMissingError({
      contextName: "ButtonContext",
    });

    // 検証
    expect(error.message).toBe("ButtonContext is missing. Must be placed within <ButtonContext>");
  });

  test("言語を ja に設定すると日本語のメッセージを返す", () => {
    // 準備
    setGlobalConfig({ lang: "ja" });

    // 実行
    const error = new ContextMissingError({
      contextName: "ButtonContext",
      providerName: "ButtonRoot",
    });

    // 検証
    expect(error.message).toBe("ButtonContext がありません、<ButtonRoot> 配下に配置してください");
  });
});

describe("setErrorMessage", () => {
  test("言語に応じてメッセージを切り替える", () => {
    // 準備
    class SampleError extends ErrorBase<{ code: number }> {
      public constructor() {
        super({ code: 42 }, ({ code }) => `Error: ${code}`);
      }
    }
    setErrorMessage(SampleError, ({ code }) => `エラーコード: ${code}`, "ja");
    setGlobalConfig({ lang: "ja" });

    // 実行
    const error = new SampleError();

    // 検証
    expect(error.message).toBe("エラーコード: 42");
  });

  test("未登録の言語では既定のメッセージにフォールバックする", () => {
    // 準備
    class SampleError extends ErrorBase<{ code: number }> {
      public constructor() {
        super({ code: 42 }, ({ code }) => `Error: ${code}`);
      }
    }
    setErrorMessage(SampleError, ({ code }) => `エラーコード: ${code}`, "ja");
    setGlobalConfig({ lang: "fr" });

    // 実行
    const error = new SampleError();

    // 検証
    expect(error.message).toBe("Error: 42");
  });
});
