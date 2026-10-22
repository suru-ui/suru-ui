import "@suru-ui/theme/suru.css";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./input.parts.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";
import "../../tests/src/_locators.js";
import { InputRoot } from "./root/input.root.jsx";

describe("InputRoot の配置", () => {
  test("外部の余白を持たずインライン要素として並ぶ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<InputRoot aria-label="名前" />);

    // 検証
    const style = getComputedStyle(screen.getByRole("textbox", { name: "名前" }).element());
    expect(style.marginTop).toBe("0px");
    expect(style.marginInlineStart).toBe("0px");
    expect(style.display).toBe("inline-block");
  });

  test("大きさに応じた最小高さを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <InputRoot size="sm" aria-label="小" />
        <InputRoot size="md" aria-label="中" />
        <InputRoot size="lg" aria-label="大" />
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.getByRole("textbox", { name: "小" }).element());
    expect(sm.minHeight).toBe("26px");
    const md = getComputedStyle(screen.getByRole("textbox", { name: "中" }).element());
    expect(md.minHeight).toBe("32px");
    const lg = getComputedStyle(screen.getByRole("textbox", { name: "大" }).element());
    expect(lg.minHeight).toBe("36px");
  });

  test.skipIf(!supportsCustomFunctions())("大きさに応じた水平余白を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <InputRoot size="sm" outlined={false} aria-label="小" />
        <InputRoot size="md" outlined={false} aria-label="中" />
        <InputRoot size="lg" outlined={false} aria-label="大" />
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.getByRole("textbox", { name: "小" }).element());
    expect(sm.paddingInlineStart).toBe("6px");
    const md = getComputedStyle(screen.getByRole("textbox", { name: "中" }).element());
    expect(md.paddingInlineStart).toBe("10px");
    const lg = getComputedStyle(screen.getByRole("textbox", { name: "大" }).element());
    expect(lg.paddingInlineStart).toBe("14px");
  });

  test("指定した角丸で切り抜く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <InputRoot radius="none" aria-label="なし" />
        <InputRoot radius="sm" aria-label="小" />
        <InputRoot radius="md" aria-label="中" />
        <InputRoot radius="lg" aria-label="大" />
        <InputRoot radius="full" aria-label="丸" />
      </>,
    );

    // 検証
    const none = getComputedStyle(screen.getByRole("textbox", { name: "なし" }).element());
    expect(none.borderTopLeftRadius).toBe("0px");
    const sm = getComputedStyle(screen.getByRole("textbox", { name: "小" }).element());
    expect(sm.borderTopLeftRadius).toBe("4px");
    const md = getComputedStyle(screen.getByRole("textbox", { name: "中" }).element());
    expect(md.borderTopLeftRadius).toBe("8px");
    const lg = getComputedStyle(screen.getByRole("textbox", { name: "大" }).element());
    expect(lg.borderTopLeftRadius).toBe("12px");
    const full = getComputedStyle(screen.getByRole("textbox", { name: "丸" }).element());
    expect(full.borderTopLeftRadius).toBe("16px");
  });

  test.skipIf(!supportsCustomFunctions())("枠線の有無を切り替える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ borderColor: "var(--sui-grey-naked-border-normal)", borderStyle: "solid" }}>
          枠線の基準
        </span>
        <InputRoot outlined={false} aria-label="なし" />
        <InputRoot outlined aria-label="あり" />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("枠線の基準").element());
    const plain = getComputedStyle(screen.getByRole("textbox", { name: "なし" }).element());
    expect(plain.borderTopWidth).toBe("0px");
    const outlined = getComputedStyle(screen.getByRole("textbox", { name: "あり" }).element());
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeGreaterThan(0.5);
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeLessThan(1.5);
    expect(outlined.borderTopColor).toBe(expected.borderTopColor);
  });

  test("outlined では hover で枠線色を変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <InputRoot outlined aria-label="名前" />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const input = screen.getByRole("textbox", { name: "名前" });
    await screen.getByText("待避").hover();
    const idle = getComputedStyle(input.element()).borderTopColor;

    // 実行
    await input.hover();

    // 検証
    expect(getComputedStyle(input.element()).borderTopColor).not.toBe(idle);
  });

  test("outlined では focus-visible で枠線色を変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <InputRoot outlined aria-label="名前" />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const input = screen.getByRole("textbox", { name: "名前" }).element();
    await screen.getByText("待避").hover();
    const idle = getComputedStyle(input).borderTopColor;

    // 実行
    input.focus({ focusVisible: true });

    // 検証
    expect(getComputedStyle(input).borderTopColor).not.toBe(idle);
  });

  test.skipIf(!supportsCustomFunctions())(
    "outlined では focus-visible で枠線を太くする",
    async ({ expect }) => {
      // 準備
      const screen = await render(<InputRoot outlined aria-label="名前" />);
      const input = screen.getByRole("textbox", { name: "名前" }).element();
      const idle = Number.parseFloat(getComputedStyle(input).borderTopWidth);

      // 実行
      input.focus({ focusVisible: true });

      // 検証
      expect(Number.parseFloat(getComputedStyle(input).borderTopWidth)).toBeGreaterThan(idle);
    },
  );

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
        <InputRoot variant="naked" aria-label="背景なし" />
        <InputRoot variant="liquid" aria-label="薄い塗り" />
      </>,
    );

    // 検証
    const naked = getComputedStyle(screen.getByRole("textbox", { name: "背景なし" }).element());
    expect(naked.backgroundColor).toBe(
      getComputedStyle(screen.getByText("背景なしの基準").element()).backgroundColor,
    );
    const liquid = getComputedStyle(screen.getByRole("textbox", { name: "薄い塗り" }).element());
    expect(liquid.backgroundColor).toBe(
      getComputedStyle(screen.getByText("薄い塗りの基準").element()).backgroundColor,
    );
    expect(naked.backgroundColor).not.toBe(liquid.backgroundColor);
  });

  test("無効時は配色を変える", async ({ expect }) => {
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
        <InputRoot variant="naked" disabled aria-label="無効な背景なし" />
        <InputRoot variant="liquid" disabled aria-label="無効な薄い塗り" />
      </>,
    );

    // 検証
    const nakedExpected = getComputedStyle(screen.getByText("無効な背景なしの基準").element());
    const naked = getComputedStyle(
      screen.getByRole("textbox", { name: "無効な背景なし" }).element(),
    );
    expect(naked.color).toBe(nakedExpected.color);
    expect(naked.backgroundColor).toBe(nakedExpected.backgroundColor);
    const liquidExpected = getComputedStyle(screen.getByText("無効な薄い塗りの基準").element());
    const liquid = getComputedStyle(
      screen.getByRole("textbox", { name: "無効な薄い塗り" }).element(),
    );
    expect(liquid.color).toBe(liquidExpected.color);
    expect(liquid.backgroundColor).toBe(liquidExpected.backgroundColor);
  });

  test("公開変数で大きさと水平余白を上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<InputRoot id="custom" outlined={false} aria-label="名前" />);
    const root = screen.container.querySelector<HTMLElement>("#custom")!;
    root.style.setProperty("--sui_input-min_height", "48px");
    root.style.setProperty("--sui_input-padding_inline", "20px");

    // 検証
    expect(getComputedStyle(root).minHeight).toBe("48px");
    expect(getComputedStyle(root).paddingInlineStart).toBe("20px");
  });
});
