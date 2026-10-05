import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { useSegmentsContext } from "./segments.root.context.js";
import { SegmentsRoot } from "./segments.root.jsx";
import "../../../tests/src/_locators.js";

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
      <SegmentsRoot size="lg" color="blue" radius="full" activeVariant="liquid" />,
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

  test("render と className と style の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SegmentsRoot
        size="lg"
        color="blue"
        items={["day", "week"]}
        style={(state) => ({ opacity: state.activeVariant === "naked" ? "0.5" : "1" })}
        radius="full"
        render={(props, state) => (
          <section
            {...props}
            data-probe={`${state.size}/${state.color}/${state.radius}/${state.activeVariant}/${state.items.length}`}
          />
        )}
        className={(state) => `probe-size_${state.size}`}
        activeVariant="naked"
      />,
    );

    // 検証
    const root = screen.getByClassName("sui_segments").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-probe")).toBe("lg/blue/full/naked/2");
    expect(root.classList.contains("probe-size_lg")).toBe(true);
    expect(root.style.opacity).toBe("0.5");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SegmentsRoot className="custom" />);

    // 検証
    expect(screen.getByClassName("sui_segments").element().classList.contains("custom")).toBe(true);
  });
});
