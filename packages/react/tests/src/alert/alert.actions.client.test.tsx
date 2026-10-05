import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { AlertActions } from "../../../src/alert/actions/alert.actions.jsx";
import { AlertRoot } from "../../../src/alert/root/alert.root.jsx";
import { Button } from "../../../src/button/button.jsx";
import "../_locators.js";

describe("AlertActions", () => {
  test("操作ボタンをまとめて描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot>
        <AlertActions>
          <Button>再試行</Button>
        </AlertActions>
      </AlertRoot>,
    );

    // 検証
    const actions = screen.getByClassName("sui_alert_actions").element();
    expect(actions.tagName).toBe("DIV");
    expect(screen.getByRole("button", { name: "再試行" }).query()).not.toBe(null);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot>
        <AlertActions className="custom" />
      </AlertRoot>,
    );

    // 検証
    const actions = screen.getByClassName("sui_alert_actions").element();
    expect(actions.classList.contains("custom")).toBe(true);
    expect(actions.classList.contains("sui_alert_actions")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot>
        <AlertActions render={<footer />} />
      </AlertRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_alert_actions").element().tagName).toBe("FOOTER");
  });
});
