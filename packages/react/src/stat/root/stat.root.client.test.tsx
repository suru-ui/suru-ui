import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../stat.parts.js";
import { StatRoot } from "./stat.root.jsx";
import "../../../tests/src/_locators.js";

describe("StatRoot", () => {
  test("dl として既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<StatRoot />);

    // 検証
    const root = screen.getByClassName("sui_stat").element();
    expect(root.tagName).toBe("DL");
    expect(root.classList.contains("sui_stat")).toBe(true);
    expect(root.classList.contains("sui_stat-size_md")).toBe(true);
  });

  test("指定した大きさの修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <StatRoot id="sm" size="sm" />
        <StatRoot id="md" size="md" />
        <StatRoot id="lg" size="lg" />
      </>,
    );

    // 検証
    expect(screen.container.querySelector("#sm")?.classList.contains("sui_stat-size_sm")).toBe(
      true,
    );
    expect(screen.container.querySelector("#md")?.classList.contains("sui_stat-size_md")).toBe(
      true,
    );
    expect(screen.container.querySelector("#lg")?.classList.contains("sui_stat-size_lg")).toBe(
      true,
    );
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<StatRoot />);

    // 検証
    expect(screen.getByClassName("sui_stat").element().getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<StatRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_stat").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_stat")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<StatRoot render={<section />} />);

    // 検証
    expect(screen.getByClassName("sui_stat").element().tagName).toBe("SECTION");
  });
});
