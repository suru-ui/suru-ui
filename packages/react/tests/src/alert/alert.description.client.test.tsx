import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { AlertDescription } from "../../../src/alert/alert.description.jsx";
import { AlertRoot } from "../../../src/alert/alert.root.jsx";
import "../_locators.js";

describe("AlertDescription", () => {
  test("説明文として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot>
        <AlertDescription>プロフィールを更新しました。</AlertDescription>
      </AlertRoot>,
    );

    // 検証
    const description = screen.getByClassName("sui_alert_description").element();
    expect(description.tagName).toBe("DIV");
    expect(description.textContent).toBe("プロフィールを更新しました。");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot>
        <AlertDescription className="custom">説明文</AlertDescription>
      </AlertRoot>,
    );

    // 検証
    const description = screen.getByClassName("sui_alert_description").element();
    expect(description.classList.contains("custom")).toBe(true);
    expect(description.classList.contains("sui_alert_description")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot>
        <AlertDescription render={<p />}>説明文</AlertDescription>
      </AlertRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_alert_description").element().tagName).toBe("P");
  });
});
