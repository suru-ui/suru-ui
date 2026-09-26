import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { AlertContent } from "../../../src/alert/alert.content.jsx";
import "../_locators.js";

describe("AlertContent", () => {
  test("本文として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertContent>プロフィールを更新しました。</AlertContent>);

    // 検証
    const content = screen.getByClassName("sui_alert_content").element();
    expect(content.tagName).toBe("DIV");
    expect(content.textContent).toBe("プロフィールを更新しました。");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertContent className="custom">本文</AlertContent>);

    // 検証
    const content = screen.getByClassName("sui_alert_content").element();
    expect(content.classList.contains("custom")).toBe(true);
    expect(content.classList.contains("sui_alert_content")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertContent render={<p />}>本文</AlertContent>);

    // 検証
    expect(screen.getByClassName("sui_alert_content").element().tagName).toBe("P");
  });
});
