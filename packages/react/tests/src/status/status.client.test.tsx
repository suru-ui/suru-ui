import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/status/status.parts.js";
import { Status, StatusAPI, useStatusAPI } from "../../../src/status/status.jsx";
import "../_locators.js";

describe("StatusAPI", () => {
  test("ラベルを表示用の内容として保持する", ({ expect }) => {
    // 準備と実行
    const api = new StatusAPI({ children: "オンライン" });

    // 検証
    expect(api.getLabel()).toBe("オンライン");
  });

  test("ラベルをルートへ渡さない", ({ expect }) => {
    // 準備と実行
    const api = new StatusAPI({ children: "オンライン", id: "status" });

    // 検証
    expect(api.getRootProps()).toStrictEqual({ id: "status" });
  });

  test("インジケーターの props の既定値を空にする", ({ expect }) => {
    // 準備と実行
    const api = new StatusAPI({});

    // 検証
    expect(api.getIndicatorProps()).toStrictEqual({});
  });

  test("slotProps をインジケーターへ渡す", ({ expect }) => {
    // 準備と実行
    const api = new StatusAPI({ slotProps: { indicator: { id: "indicator" } } });

    // 検証
    expect(api.getIndicatorProps()).toStrictEqual({ id: "indicator" });
  });

  test("Suru UI 専用の props をルートへ渡さない", ({ expect }) => {
    // 準備と実行
    const api = new StatusAPI({ children: "オンライン" });

    // 検証
    expect(api.getRootProps()).not.toHaveProperty("slotProps");
  });
});

describe("useStatusAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useStatusAPI({ children: "オンライン" });
      return <span>{api.getLabel()}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("オンライン").query()?.textContent).toBe("オンライン");
  });
});

describe("Status", () => {
  test("インジケーターとラベルを順に描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Status>オンライン</Status>);

    // 検証
    const root = screen.getByClassName("sui_status").element();
    expect(root.children.length).toBe(1);
    expect(root.firstElementChild?.classList.contains("sui_status_indicator")).toBe(true);
    expect(root.textContent).toBe("オンライン");
  });

  test("ラベルを省略できる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Status />);

    // 検証
    const root = screen.getByClassName("sui_status").element();
    expect(root.children.length).toBe(1);
    expect(root.textContent).toBe("");
  });

  test("slotProps をインジケーターへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Status slotProps={{ indicator: { id: "indicator" } }}>オンライン</Status>,
    );

    // 検証
    const indicator = screen.container.querySelector<HTMLElement>("#indicator");
    expect(indicator?.classList.contains("sui_status_indicator")).toBe(true);
  });

  test("利用者の HTML 属性をルートへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Status aria-label="オンライン" data-testid="status">
        オンライン
      </Status>,
    );

    // 検証
    const root = screen.getByClassName("sui_status").element();
    expect(root.getAttribute("aria-label")).toBe("オンライン");
    expect(root.getAttribute("data-testid")).toBe("status");
  });

  test("インジケーターを読み上げから隠す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Status>オンライン</Status>);

    // 検証
    const indicator = screen.getByClassName("sui_status_indicator").element();
    expect(indicator.getAttribute("aria-hidden")).toBe("true");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Status className="custom">オンライン</Status>);

    // 検証
    const root = screen.getByClassName("sui_status").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_status")).toBe(true);
  });
});
