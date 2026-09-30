import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/select/select.parts.js";
import { Select } from "../../../src/select/select.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

describe("Select の配置", () => {
  test("外部の余白を持たずインライン要素として並ぶ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Select items={["りんご"]} aria-label="果物" />);

    // 検証
    const style = getComputedStyle(screen.getByRole("combobox", { name: "果物" }).element());
    expect(style.marginTop).toBe("0px");
    expect(style.marginInlineStart).toBe("0px");
    expect(style.display).toBe("inline-flex");
  });

  test("大きさに応じた最小高さを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Select aria-label="小" items={["りんご"]} size="sm" />
        <Select aria-label="中" items={["りんご"]} size="md" />
        <Select aria-label="大" items={["りんご"]} size="lg" />
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.getByRole("combobox", { name: "小" }).element());
    expect(sm.minHeight).toBe("22.4px");
    const md = getComputedStyle(screen.getByRole("combobox", { name: "中" }).element());
    expect(md.minHeight).toBe("28px");
    const lg = getComputedStyle(screen.getByRole("combobox", { name: "大" }).element());
    expect(lg.minHeight).toBe("33.6px");
  });

  test("指定した角丸で切り抜く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Select aria-label="なし" items={["りんご"]} radius="none" />
        <Select aria-label="小" items={["りんご"]} radius="sm" />
        <Select aria-label="中" items={["りんご"]} radius="md" />
        <Select aria-label="大" items={["りんご"]} radius="lg" />
        <Select aria-label="丸" items={["りんご"]} radius="full" />
      </>,
    );

    // 検証
    const none = getComputedStyle(screen.getByRole("combobox", { name: "なし" }).element());
    expect(none.borderTopLeftRadius).toBe("0px");
    const sm = getComputedStyle(screen.getByRole("combobox", { name: "小" }).element());
    expect(sm.borderTopLeftRadius).toBe("4px");
    const md = getComputedStyle(screen.getByRole("combobox", { name: "中" }).element());
    expect(md.borderTopLeftRadius).toBe("8px");
    const lg = getComputedStyle(screen.getByRole("combobox", { name: "大" }).element());
    expect(lg.borderTopLeftRadius).toBe("12px");
    const full = getComputedStyle(screen.getByRole("combobox", { name: "丸" }).element());
    expect(full.borderTopLeftRadius).toBe("14px");
  });

  test.skipIf(!supportsCustomFunctions())("枠線の有無を切り替える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ borderColor: "var(--sui-grey-naked-border-normal)", borderStyle: "solid" }}>
          枠線の基準
        </span>
        <Select aria-label="なし" items={["りんご"]} />
        <Select aria-label="あり" items={["りんご"]} outlined />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("枠線の基準").element());
    const plain = getComputedStyle(screen.getByRole("combobox", { name: "なし" }).element());
    expect(plain.borderTopWidth).toBe("0px");
    const outlined = getComputedStyle(screen.getByRole("combobox", { name: "あり" }).element());
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeGreaterThan(0.5);
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeLessThan(1.5);
    expect(outlined.borderTopColor).toBe(expected.borderTopColor);
  });

  test("outlined では hover で枠線色を変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <Select aria-label="果物" items={["りんご"]} outlined />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const trigger = screen.getByRole("combobox", { name: "果物" });
    await screen.getByText("待避").hover();
    const idle = getComputedStyle(trigger.element()).borderTopColor;

    // 実行
    await trigger.hover();

    // 検証
    expect(getComputedStyle(trigger.element()).borderTopColor).not.toBe(idle);
  });

  test("focus-visible でフォーカスリングを表示する", async ({ expect }) => {
    // 準備
    const screen = await render(<Select aria-label="果物" items={["りんご"]} />);
    const trigger = screen.getByRole("combobox", { name: "果物" }).element();
    const idle = Number.parseFloat(getComputedStyle(trigger).outlineWidth);

    // 実行
    trigger.focus({ focusVisible: true });

    // 検証
    expect(Number.parseFloat(getComputedStyle(trigger).outlineWidth)).toBeGreaterThan(idle);
  });

  test("外観に応じた背景色を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ backgroundColor: "var(--sui-grey-naked-canvas-normal)" }}>
          背景なしの基準
        </span>
        <span style={{ backgroundColor: "var(--sui-grey-liquid-canvas-normal)" }}>
          薄い塗りの基準
        </span>
        <Select aria-label="背景なし" items={["りんご"]} variant="naked" />
        <Select aria-label="薄い塗り" items={["りんご"]} variant="liquid" />
      </>,
    );

    // 検証
    const naked = getComputedStyle(screen.getByRole("combobox", { name: "背景なし" }).element());
    expect(naked.backgroundColor).toBe(
      getComputedStyle(screen.getByText("背景なしの基準").element()).backgroundColor,
    );
    const liquid = getComputedStyle(screen.getByRole("combobox", { name: "薄い塗り" }).element());
    expect(liquid.backgroundColor).toBe(
      getComputedStyle(screen.getByText("薄い塗りの基準").element()).backgroundColor,
    );
    expect(naked.backgroundColor).not.toBe(liquid.backgroundColor);
  });

  test("無効時は配色とカーソルを変える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          style={{
            color: "var(--sui-disabled-naked-canvas_text)",
            backgroundColor: "var(--sui-disabled-naked-canvas)",
          }}
        >
          無効な背景なしの基準
        </span>
        <span
          style={{
            color: "var(--sui-disabled-liquid-canvas_text)",
            backgroundColor: "var(--sui-disabled-liquid-canvas)",
          }}
        >
          無効な薄い塗りの基準
        </span>
        <Select aria-label="無効な背景なし" disabled items={["りんご"]} variant="naked" />
        <Select aria-label="無効な薄い塗り" disabled items={["りんご"]} variant="liquid" />
      </>,
    );

    // 検証
    const nakedExpected = getComputedStyle(screen.getByText("無効な背景なしの基準").element());
    const naked = getComputedStyle(
      screen.getByRole("combobox", { name: "無効な背景なし" }).element(),
    );
    expect(naked.color).toBe(nakedExpected.color);
    expect(naked.backgroundColor).toBe(nakedExpected.backgroundColor);
    expect(naked.cursor).toBe("not-allowed");
    const liquidExpected = getComputedStyle(screen.getByText("無効な薄い塗りの基準").element());
    const liquid = getComputedStyle(
      screen.getByRole("combobox", { name: "無効な薄い塗り" }).element(),
    );
    expect(liquid.color).toBe(liquidExpected.color);
    expect(liquid.backgroundColor).toBe(liquidExpected.backgroundColor);
  });

  test("選択されていない項目のチェックを隠す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Select aria-label="果物" defaultValue="りんご" items={["りんご", "ばなな"]} defaultOpen />,
    );

    // 検証
    const selected = screen
      .getByRole("option", { name: "りんご" })
      .element()
      .querySelector<HTMLElement>(".sui_select_item_indicator")!;
    expect(getComputedStyle(selected).opacity).toBe("1");
    const unselected = screen
      .getByRole("option", { name: "ばなな" })
      .element()
      .querySelector<HTMLElement>(".sui_select_item_indicator")!;
    expect(getComputedStyle(unselected).opacity).toBe("0");
  });

  test("公開変数で大きさと水平余白を上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Select aria-label="果物" id="custom" items={["りんご"]} />);
    const trigger = screen.container.querySelector<HTMLElement>("#custom")!;
    trigger.style.setProperty("--sui_select-min_height", "48px");
    trigger.style.setProperty("--sui_select-padding_inline", "20px");

    // 検証
    expect(getComputedStyle(trigger).minHeight).toBe("48px");
    expect(getComputedStyle(trigger).paddingInlineStart).toBe("20px");
  });
});
