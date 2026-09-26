import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { useTabsContext } from "../../../src/tabs/tabs.context.js";
import { TabsRoot } from "../../../src/tabs/tabs.root.jsx";
import "../_locators.js";

describe("TabsRoot", () => {
  test("既定の修飾を付けた要素を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TabsRoot />);

    // 検証
    const root = screen.getByClassName("sui_tabs").element();
    expect(root.tagName).toBe("DIV");
    expect(root.classList.contains("sui_tabs-size_md")).toBe(true);
    expect(root.classList.contains("sui_tabs-radius_md")).toBe(true);
    expect(root.classList.contains("sui_tabs-variant_line")).toBe(true);
    expect(root.classList.contains("sui_tabs-active_variant_liquid")).toBe(true);
    expect(root.classList.contains("sui_tabs-orientation_horizontal")).toBe(true);
    expect(root.getAttribute("data-scope")).toBe("");
  });

  test("大きさと角丸と外観を修飾へ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TabsRoot activeVariant="solid" outlined radius="lg" size="sm" variant="segments" />,
    );

    // 検証
    const root = screen.getByClassName("sui_tabs").element();
    expect(root.classList.contains("sui_tabs-size_sm")).toBe(true);
    expect(root.classList.contains("sui_tabs-radius_lg")).toBe(true);
    expect(root.classList.contains("sui_tabs-variant_segments")).toBe(true);
    expect(root.classList.contains("sui_tabs-active_variant_solid")).toBe(true);
    expect(root.classList.contains("sui_tabs-outlined")).toBe(true);
  });

  test("角丸を省略すると大きさに追従する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TabsRoot size="lg" />);

    // 検証
    expect(screen.getByClassName("sui_tabs-radius_lg").query()).not.toBe(null);
  });

  test("縦方向を指定すると方向の修飾を切り替える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TabsRoot orientation="vertical" />);

    // 検証
    const root = screen.getByClassName("sui_tabs").element();
    expect(root.classList.contains("sui_tabs-orientation_vertical")).toBe(true);
    expect(root.classList.contains("sui_tabs-orientation_horizontal")).toBe(false);
  });

  test("項目を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useTabsContext();
      return <span>{String(ctx.items.length)}</span>;
    }

    // 実行
    const screen = await render(
      <TabsRoot items={["overview", "projects"]}>
        <Probe />
      </TabsRoot>,
    );

    // 検証
    expect(screen.getByText("2").query()?.textContent).toBe("2");
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TabsRoot render={<section />} />);

    // 検証
    expect(screen.getByClassName("sui_tabs").element().tagName).toBe("SECTION");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TabsRoot className="custom" />);

    // 検証
    expect(screen.getByClassName("sui_tabs").element().classList.contains("custom")).toBe(true);
  });
});
