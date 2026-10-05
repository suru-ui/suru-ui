import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../switch.parts.js";
import { SwitchRoot } from "../root/switch.root.jsx";
import { SwitchThumb } from "./switch.thumb.jsx";
import "../../../tests/src/_locators.js";

describe("SwitchThumb", () => {
  test("ルート内につまみを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SwitchRoot>
        <SwitchThumb />
      </SwitchRoot>,
    );

    // 検証
    const thumb = screen.getByClassName("sui_switch_thumb").element();
    expect(thumb.tagName).toBe("SPAN");
    expect(screen.getByClassName("sui_switch").element().contains(thumb)).toBe(true);
  });

  test("指定した内容を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SwitchRoot defaultChecked>
        <SwitchThumb>
          <span>✓</span>
        </SwitchThumb>
      </SwitchRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_switch_thumb").element().textContent).toBe("✓");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SwitchRoot>
        <SwitchThumb className="custom" />
      </SwitchRoot>,
    );

    // 検証
    const thumb = screen.getByClassName("sui_switch_thumb").element();
    expect(thumb.classList.contains("custom")).toBe(true);
    expect(thumb.classList.contains("sui_switch_thumb")).toBe(true);
  });

  test("追加の props を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SwitchRoot>
        <SwitchThumb id="thumb" />
      </SwitchRoot>,
    );

    // 検証
    expect(screen.container.querySelector("#thumb")).not.toBe(null);
  });
});
