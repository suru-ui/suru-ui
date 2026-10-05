import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { AlertRoot } from "../root/alert.root.jsx";
import { AlertIcon } from "./alert.icon.jsx";
import "../../../tests/src/_locators.js";

describe("AlertIcon", () => {
  test("インジケーターとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot>
        <AlertIcon />
      </AlertRoot>,
    );

    // 検証
    const icon = screen.getByClassName("sui_alert_icon").element();
    expect(icon.tagName).toBe("DIV");
  });

  test("装飾として読み上げから隠す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot>
        <AlertIcon />
      </AlertRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_alert_icon").element().getAttribute("aria-hidden")).toBe(
      "true",
    );
  });

  test("指定すると読み上げ対象にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot>
        <AlertIcon aria-hidden={false} />
      </AlertRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_alert_icon").element().getAttribute("aria-hidden")).toBe(
      "false",
    );
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot>
        <AlertIcon>
          <span>!</span>
        </AlertIcon>
      </AlertRoot>,
    );

    // 検証
    expect(screen.getByText("!").query()).not.toBe(null);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot>
        <AlertIcon className="custom" />
      </AlertRoot>,
    );

    // 検証
    const icon = screen.getByClassName("sui_alert_icon").element();
    expect(icon.classList.contains("custom")).toBe(true);
    expect(icon.classList.contains("sui_alert_icon")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot>
        <AlertIcon render={<span />} />
      </AlertRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_alert_icon").element().tagName).toBe("SPAN");
  });
});
