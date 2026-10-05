import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../stat.parts.js";
import { StatRoot } from "../root/stat.root.jsx";
import { StatLabel } from "./stat.label.jsx";
import "../../../tests/src/_locators.js";

describe("StatLabel", () => {
  test("dt としてラベルを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatLabel>閲覧者数</StatLabel>
      </StatRoot>,
    );

    // 検証
    const label = screen.getByText("閲覧者数").element();
    expect(label.tagName).toBe("DT");
    expect(label.textContent).toBe("閲覧者数");
    expect(label.classList.contains("sui_stat_label")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatLabel className="custom">閲覧者数</StatLabel>
      </StatRoot>,
    );

    // 検証
    const label = screen.getByText("閲覧者数").element();
    expect(label.classList.contains("custom")).toBe(true);
    expect(label.classList.contains("sui_stat_label")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatLabel render={<span />}>閲覧者数</StatLabel>
      </StatRoot>,
    );

    // 検証
    expect(screen.getByText("閲覧者数").element().tagName).toBe("SPAN");
  });
});
