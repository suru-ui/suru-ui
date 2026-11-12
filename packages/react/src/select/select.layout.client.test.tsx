import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "./select.parts.js";
import "../../tests/src/_locators.js";
import { Select } from "./select.jsx";

describe("Select の配置", () => {
  test("外部の余白を持たずインライン要素として並ぶ", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Select items={["りんご"]} aria-label="果物" />);

    // 検証。
    const style = getComputedStyle(screen.getByRole("combobox", { name: "果物" }).element());
    expect(style.marginTop).toBe("0px");
    expect(style.marginInlineStart).toBe("0px");
    expect(style.display).toBe("inline-flex");
  });

  test("大きさに応じた最小高さを持つ", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <Select size="sm" items={["りんご"]} aria-label="小" />
        <Select size="md" items={["りんご"]} aria-label="中" />
        <Select size="lg" items={["りんご"]} aria-label="大" />
      </>,
    );

    // 検証。
    const sm = getComputedStyle(screen.getByRole("combobox", { name: "小" }).element());
    expect(sm.minHeight).toBe("26px");

    const md = getComputedStyle(screen.getByRole("combobox", { name: "中" }).element());
    expect(md.minHeight).toBe("32px");

    const lg = getComputedStyle(screen.getByRole("combobox", { name: "大" }).element());
    expect(lg.minHeight).toBe("36px");
  });

  test("指定した角丸で切り抜く", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <Select items={["りんご"]} radius="none" aria-label="なし" />
        <Select items={["りんご"]} radius="sm" aria-label="小" />
        <Select items={["りんご"]} radius="md" aria-label="中" />
        <Select items={["りんご"]} radius="lg" aria-label="大" />
        <Select items={["りんご"]} radius="full" aria-label="丸" />
      </>,
    );

    // 検証。
    const none = getComputedStyle(screen.getByRole("combobox", { name: "なし" }).element());
    expect(none.borderTopLeftRadius).toBe("0px");

    const sm = getComputedStyle(screen.getByRole("combobox", { name: "小" }).element());
    expect(sm.borderTopLeftRadius).toBe("4px");

    const md = getComputedStyle(screen.getByRole("combobox", { name: "中" }).element());
    expect(md.borderTopLeftRadius).toBe("8px");

    const lg = getComputedStyle(screen.getByRole("combobox", { name: "大" }).element());
    expect(lg.borderTopLeftRadius).toBe("12px");

    const full = getComputedStyle(screen.getByRole("combobox", { name: "丸" }).element());
    expect(full.borderTopLeftRadius).toBe("16px");
  });

  test("枠線の有無を切り替える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span
          style={{
            borderColor: "var(--sui-grey-naked-border-normal)",
            borderStyle: "solid",
          }}
        >
          枠線の基準
        </span>
        <Select items={["りんご"]} outlined={false} aria-label="なし" />
        <Select items={["りんご"]} outlined aria-label="あり" />
      </>,
    );

    // 検証。
    const expected = getComputedStyle(screen.getByText("枠線の基準").element());
    const plain = getComputedStyle(screen.getByRole("combobox", { name: "なし" }).element());
    expect(plain.borderTopWidth).toBe("0px");

    const outlined = getComputedStyle(screen.getByRole("combobox", { name: "あり" }).element());
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeGreaterThan(0.5);
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeLessThan(1.5);
    expect(outlined.borderTopColor).toBe(expected.borderTopColor);
  });

  test("outlined では hover で枠線色を変える", async ({ expect }) => {
    // 準備。
    const screen = await render(
      <>
        <Select items={["りんご"]} outlined aria-label="果物" />
        <span
          style={{
            display: "block",
            marginBlockStart: "48px",
          }}
        >
          待避
        </span>
      </>,
    );
    const trigger = screen.getByRole("combobox", { name: "果物" });
    await screen.getByText("待避").hover();

    const idle = getComputedStyle(trigger.element()).borderTopColor;

    // 実行。
    await trigger.hover();

    // 検証。
    expect(getComputedStyle(trigger.element()).borderTopColor).not.toBe(idle);
  });

  test("focus-visible でフォーカスリングを表示する", async ({ expect }) => {
    // 準備。
    const screen = await render(<Select items={["りんご"]} aria-label="果物" />);
    const trigger = screen.getByRole("combobox", { name: "果物" }).element();
    const idle = Number.parseFloat(getComputedStyle(trigger).outlineWidth);

    // 実行。
    trigger.focus({ focusVisible: true });

    // 検証。
    expect(Number.parseFloat(getComputedStyle(trigger).outlineWidth)).toBeGreaterThan(idle);
  });

  test("外観に応じた背景色を持つ", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span style={{ backgroundColor: "var(--sui-grey-naked-canvas-normal)" }}>
          背景なしの基準
        </span>
        <span style={{ backgroundColor: "var(--sui-grey-liquid-canvas-normal)" }}>
          薄い塗りの基準
        </span>
        <Select items={["りんご"]} variant="naked" aria-label="背景なし" />
        <Select items={["りんご"]} variant="liquid" aria-label="薄い塗り" />
      </>,
    );

    // 検証。
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

  test("ポップアップの枠線の色を Menu や ContextMenu と同じにする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span
          style={{
            borderColor: "var(--sui-border-1)",
            borderStyle: "solid",
          }}
        >
          枠線の基準
        </span>
        <Select items={["りんご"]} defaultOpen aria-label="果物" />
      </>,
    );

    // 検証。
    expect(
      getComputedStyle(screen.getByClassName("sui_select_popup").element()).borderTopColor,
    ).toBe(getComputedStyle(screen.getByText("枠線の基準").element()).borderTopColor);
  });

  test("無効時は配色とカーソルを変える", async ({ expect }) => {
    // 準備と実行。
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
        <Select items={["りんご"]} variant="naked" disabled aria-label="無効な背景なし" />
        <Select items={["りんご"]} variant="liquid" disabled aria-label="無効な薄い塗り" />
      </>,
    );

    // 検証。
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
    // 準備と実行。
    const screen = await render(
      <Select items={["りんご", "ばなな"]} defaultOpen defaultValue="りんご" aria-label="果物" />,
    );

    // 検証。
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
    // 準備と実行。
    const screen = await render(<Select id="custom" items={["りんご"]} aria-label="果物" />);
    const trigger = screen.container.querySelector<HTMLElement>("#custom")!;
    trigger.style.setProperty("--sui_select-min_height", "48px");
    trigger.style.setProperty("--sui_select-padding_inline", "20px");

    // 検証。
    expect(getComputedStyle(trigger).minHeight).toBe("48px");
    expect(getComputedStyle(trigger).paddingInlineStart).toBe("20px");
  });
});
