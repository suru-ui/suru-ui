import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { CollapsibleRoot } from "./collapsible.root.jsx";
import "../../../tests/src/_locators.js";

describe("CollapsibleRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<CollapsibleRoot />);

    // 検証。
    const root = screen.getByClassName("sui_collapsible").element();
    expect(root.tagName).toBe("DIV");
    expect(root.classList.contains("sui_collapsible-size_md")).toBe(true);
    expect(root.classList.contains("sui_collapsible-open")).toBe(false);
    expect(root.classList.contains("sui_collapsible-disabled")).toBe(false);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<CollapsibleRoot />);

    // 検証。
    expect(screen.getByClassName("sui_collapsible").element().getAttribute("data-scope")).toBe("");
  });

  test("指定した大きさの修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <CollapsibleRoot size="sm" />
        <CollapsibleRoot size="md" />
        <CollapsibleRoot size="lg" />
      </>,
    );

    // 検証。
    expect(screen.getByClassName("sui_collapsible-size_sm").query()).not.toBe(null);
    expect(screen.getByClassName("sui_collapsible-size_md").query()).not.toBe(null);
    expect(screen.getByClassName("sui_collapsible-size_lg").query()).not.toBe(null);
  });

  test("開いた状態の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <CollapsibleRoot id="closed" />
        <CollapsibleRoot id="open" defaultOpen />
      </>,
    );

    // 検証。
    expect(screen.container.querySelector("#closed")?.classList.contains("sui_collapsible")).toBe(
      true,
    );
    expect(
      screen.container.querySelector("#closed")?.classList.contains("sui_collapsible-open"),
    ).toBe(false);
    expect(
      screen.container.querySelector("#open")?.classList.contains("sui_collapsible-open"),
    ).toBe(true);
  });

  test("無効状態の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <CollapsibleRoot id="enabled" />
        <CollapsibleRoot id="disabled" disabled />
      </>,
    );

    // 検証。
    expect(
      screen.container.querySelector("#enabled")?.classList.contains("sui_collapsible-disabled"),
    ).toBe(false);
    expect(
      screen.container.querySelector("#disabled")?.classList.contains("sui_collapsible-disabled"),
    ).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<CollapsibleRoot className="custom" />);

    // 検証。
    const root = screen.getByClassName("sui_collapsible").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_collapsible")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<CollapsibleRoot render={<section />} />);

    // 検証。
    expect(screen.getByClassName("sui_collapsible").element().tagName).toBe("SECTION");
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <CollapsibleRoot
        size="lg"
        render={(props, state) => (
          <section {...props} data-probe={`${state.size}/${String(state.open)}`} />
        )}
        defaultOpen
      />,
    );

    // 検証。
    const root = screen.getByClassName("sui_collapsible").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-probe")).toBe("lg/true");
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <CollapsibleRoot>
        <span>内容</span>
      </CollapsibleRoot>,
    );

    // 検証。
    expect(screen.getByText("内容").query()).not.toBe(null);
  });
});
