import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { AlertRoot } from "../../../src/alert/alert.root.jsx";
import { AlertTitle } from "../../../src/alert/alert.title.jsx";
import "../_locators.js";

describe("AlertTitle", () => {
  test("タイトルとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot>
        <AlertTitle>更新完了</AlertTitle>
      </AlertRoot>,
    );

    // 検証
    const title = screen.getByClassName("sui_alert_title").element();
    expect(title.tagName).toBe("DIV");
    expect(title.textContent).toBe("更新完了");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot>
        <AlertTitle className="custom">更新完了</AlertTitle>
      </AlertRoot>,
    );

    // 検証
    const title = screen.getByClassName("sui_alert_title").element();
    expect(title.classList.contains("custom")).toBe(true);
    expect(title.classList.contains("sui_alert_title")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot>
        <AlertTitle render={<span />}>更新完了</AlertTitle>
      </AlertRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_alert_title").element().tagName).toBe("SPAN");
  });
});
