import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../stat.parts.js";
import { StatRoot } from "../root/stat.root.jsx";
import { StatValue } from "./stat.value.jsx";
import "../../../tests/src/_locators.js";

describe("StatValue", () => {
  test("dd として値を描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <StatRoot>
        <StatValue>1,200</StatValue>
      </StatRoot>,
    );

    // 検証。
    const value = screen.getByText("1,200").element();
    expect(value.tagName).toBe("DD");
    expect(value.textContent).toBe("1,200");
    expect(value.classList.contains("sui_stat_value")).toBe(true);
  });

  test("要素を持つ値も描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <StatRoot>
        <StatValue>
          <span>1,200</span>
        </StatValue>
      </StatRoot>,
    );

    // 検証。
    expect(screen.getByText("1,200").element().tagName).toBe("SPAN");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <StatRoot>
        <StatValue className="custom">1,200</StatValue>
      </StatRoot>,
    );

    // 検証。
    const value = screen.getByText("1,200").element();
    expect(value.classList.contains("custom")).toBe(true);
    expect(value.classList.contains("sui_stat_value")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <StatRoot>
        <StatValue render={<p />}>1,200</StatValue>
      </StatRoot>,
    );

    // 検証。
    expect(screen.getByText("1,200").element().tagName).toBe("P");
  });
});
