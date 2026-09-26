import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { useSegmentsContext } from "../../../src/segments/segments.context.js";
import { SegmentsRoot } from "../../../src/segments/segments.root.jsx";
import "../_locators.js";

describe("SegmentsRoot", () => {
  test("既定の修飾を付けた要素を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SegmentsRoot />);

    // 検証
    const root = screen.getByClassName("sui_segments").element();
    expect(root.tagName).toBe("DIV");
    expect(root.classList.contains("sui_segments-size_md")).toBe(true);
    expect(root.classList.contains("sui_segments-color_grey")).toBe(true);
    expect(root.classList.contains("sui_segments-radius_md")).toBe(true);
    expect(root.classList.contains("sui_segments-active_variant_solid")).toBe(true);
    expect(root.classList.contains("sui_segments-orientation_horizontal")).toBe(true);
    expect(root.getAttribute("data-scope")).toBe("");
  });

  test("大きさと配色と角丸と外観を修飾へ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SegmentsRoot activeVariant="liquid" color="blue" radius="full" size="lg" />,
    );

    // 検証
    const root = screen.getByClassName("sui_segments").element();
    expect(root.classList.contains("sui_segments-size_lg")).toBe(true);
    expect(root.classList.contains("sui_segments-color_blue")).toBe(true);
    expect(root.classList.contains("sui_segments-radius_full")).toBe(true);
    expect(root.classList.contains("sui_segments-active_variant_liquid")).toBe(true);
  });

  test("角丸を省略すると大きさに追従する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SegmentsRoot size="lg" />);

    // 検証
    expect(screen.getByClassName("sui_segments-radius_lg").query()).not.toBe(null);
  });

  test("縦方向を指定すると方向の修飾を切り替える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SegmentsRoot orientation="vertical" />);

    // 検証
    const root = screen.getByClassName("sui_segments").element();
    expect(root.classList.contains("sui_segments-orientation_vertical")).toBe(true);
    expect(root.classList.contains("sui_segments-orientation_horizontal")).toBe(false);
  });

  test("項目を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useSegmentsContext();
      return <span>{String(ctx.items.length)}</span>;
    }

    // 実行
    const screen = await render(
      <SegmentsRoot items={["day", "week"]}>
        <Probe />
      </SegmentsRoot>,
    );

    // 検証
    expect(screen.getByText("2").query()?.textContent).toBe("2");
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SegmentsRoot render={<section />} />);

    // 検証
    expect(screen.getByClassName("sui_segments").element().tagName).toBe("SECTION");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SegmentsRoot className="custom" />);

    // 検証
    expect(screen.getByClassName("sui_segments").element().classList.contains("custom")).toBe(true);
  });
});
