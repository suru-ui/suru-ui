import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../status.parts.js";
import { StatusRoot } from "./status.root.jsx";
import "../../../tests/src/_locators.js";

describe("StatusRoot", () => {
  test("span として既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<StatusRoot>オンライン</StatusRoot>);

    // 検証。
    const root = screen.getByClassName("sui_status").element();
    expect(root.tagName).toBe("SPAN");
    expect(root.classList.contains("sui_status-size_md")).toBe(true);
    expect(root.classList.contains("sui_status-color_grey")).toBe(true);
    expect(root.classList.contains("sui_status-ripple_size_md")).toBe(true);
    expect(root.classList.contains("sui_status-ping")).toBe(false);
    expect(root.classList.contains("sui_status-contain_ripple")).toBe(false);
  });

  test("指定した修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <StatusRoot id="status" ping size="lg" color="blue" rippleSize="sm" containRipple>
        オンライン
      </StatusRoot>,
    );

    // 検証。
    const root = screen.container.querySelector<HTMLElement>("#status")!;
    expect(root.classList.contains("sui_status-size_lg")).toBe(true);
    expect(root.classList.contains("sui_status-color_blue")).toBe(true);
    expect(root.classList.contains("sui_status-ripple_size_sm")).toBe(true);
    expect(root.classList.contains("sui_status-ping")).toBe(true);
    expect(root.classList.contains("sui_status-contain_ripple")).toBe(true);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<StatusRoot />);

    // 検証。
    expect(screen.getByClassName("sui_status").element().getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<StatusRoot className="custom" />);

    // 検証。
    const root = screen.getByClassName("sui_status").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_status")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<StatusRoot render={<div />} />);

    // 検証。
    expect(screen.getByClassName("sui_status").element().tagName).toBe("DIV");
  });
});
