import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/status/status.parts.js";
import { StatusIndicator } from "../../../src/status/indicator/status.indicator.jsx";
import { StatusRoot } from "../../../src/status/root/status.root.jsx";
import "../_locators.js";

describe("StatusIndicator", () => {
  test("span として装飾用のクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatusRoot>
        <StatusIndicator />
      </StatusRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_status_indicator").element();
    expect(indicator.tagName).toBe("SPAN");
    expect(indicator.getAttribute("aria-hidden")).toBe("true");
  });

  test("aria-hidden を上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatusRoot>
        <StatusIndicator aria-hidden={false} />
      </StatusRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_status_indicator").element().getAttribute("aria-hidden"),
    ).toBe("false");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatusRoot>
        <StatusIndicator className="custom" />
      </StatusRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_status_indicator").element();
    expect(indicator.classList.contains("custom")).toBe(true);
    expect(indicator.classList.contains("sui_status_indicator")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatusRoot>
        <StatusIndicator render={<i />} />
      </StatusRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_status_indicator").element().tagName).toBe("I");
  });
});
