import "@suru-ui/theme/suru.css";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { FieldRoot } from "../field/root/field.root.jsx";
import "./textarea.parts.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";
import "../../tests/src/_locators.js";
import { TextareaRoot } from "./root/textarea.root.jsx";

describe("TextareaRoot の配置", () => {
  test("外部の余白を持たず親の幅いっぱいに広がる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div style={{ width: "320px" }}>
        <TextareaRoot aria-label="問い合わせ内容" />
      </div>,
    );

    // 検証
    const root = screen.getByRole("textbox", { name: "問い合わせ内容" }).element();
    const style = getComputedStyle(root);
    expect(style.marginTop).toBe("0px");
    expect(style.marginInlineStart).toBe("0px");
    expect(style.display).toBe("block");
    expect(style.resize).toBe("vertical");
    expect(root.getBoundingClientRect().width).toBeCloseTo(320, 0);
  });

  test("大きさに応じた最小高さを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <TextareaRoot size="sm" aria-label="小" />
        <TextareaRoot size="md" aria-label="中" />
        <TextareaRoot size="lg" aria-label="大" />
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
        <span id="expected-sm" style={{ display: "block", paddingInline: "--sui-space(1.5)" }} />
        <span id="expected-md" style={{ display: "block", paddingInline: "--sui-space(2.5)" }} />
        <span id="expected-lg" style={{ display: "block", paddingInline: "--sui-space(3.5)" }} />
        <TextareaRoot size="sm" aria-label="小" />
        <TextareaRoot size="md" aria-label="中" />
        <TextareaRoot size="lg" aria-label="大" />
      </>,
    );

    // 検証
    for (const [name, id] of [
      ["小", "expected-sm"],
      ["中", "expected-md"],
      ["大", "expected-lg"],
    ] as const) {
      const expected = getComputedStyle(
        screen.container.querySelector<HTMLElement>(`#${id}`)!,
      ).paddingInlineStart;
      const root = getComputedStyle(screen.getByRole("textbox", { name }).element());
      expect(root.paddingInlineStart).toBe(expected);
    }
  });

  test("大きさに応じた活字と行の高さを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="expected-sm" style={{ fontSize: "12px", lineHeight: "1.7" }} />
        <span id="expected-md" style={{ fontSize: "14px", lineHeight: "1.7" }} />
        <span id="expected-lg" style={{ fontSize: "17px", lineHeight: "1.7" }} />
        <TextareaRoot size="sm" aria-label="小" />
        <TextareaRoot size="md" aria-label="中" />
        <TextareaRoot size="lg" aria-label="大" />
      </>,
    );

    // 検証
    for (const [name, id] of [
      ["小", "expected-sm"],
      ["中", "expected-md"],
      ["大", "expected-lg"],
    ] as const) {
      const expected = getComputedStyle(screen.container.querySelector<HTMLElement>(`#${id}`)!);
      const root = getComputedStyle(screen.getByRole("textbox", { name }).element());
      expect(root.fontSize).toBe(expected.fontSize);
      expect(root.lineHeight).toBe(expected.lineHeight);
    }
  });

  test("指定した角丸で切り抜く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="expected-sm" style={{ borderTopLeftRadius: "4px" }} />
        <span id="expected-md" style={{ borderTopLeftRadius: "8px" }} />
        <span id="expected-lg" style={{ borderTopLeftRadius: "12px" }} />
        <TextareaRoot radius="none" aria-label="なし" />
        <TextareaRoot radius="sm" aria-label="小" />
        <TextareaRoot radius="md" aria-label="中" />
        <TextareaRoot radius="lg" aria-label="大" />
      </>,
    );

    // 検証
    expect(
      getComputedStyle(screen.getByRole("textbox", { name: "なし" }).element()).borderTopLeftRadius,
    ).toBe("0px");
    for (const [name, id] of [
      ["小", "expected-sm"],
      ["中", "expected-md"],
      ["大", "expected-lg"],
    ] as const) {
      const expected = getComputedStyle(
        screen.container.querySelector<HTMLElement>(`#${id}`)!,
      ).borderTopLeftRadius;
      const root = getComputedStyle(screen.getByRole("textbox", { name }).element());
      expect(root.borderTopLeftRadius).toBe(expected);
    }
  });

  test("外観に応じた背景色を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          id="expected-naked"
          style={{ backgroundColor: "var(--sui-grey-naked-canvas-normal)" }}
        />
        <span
          id="expected-liquid"
          style={{ backgroundColor: "var(--sui-grey-liquid-canvas-normal)" }}
        />
        <TextareaRoot variant="naked" aria-label="背景なし" />
        <TextareaRoot variant="liquid" aria-label="薄い塗り" />
      </>,
    );

    // 検証
    const nakedExpected = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#expected-naked")!,
    ).backgroundColor;
    const naked = getComputedStyle(screen.getByRole("textbox", { name: "背景なし" }).element());
    expect(naked.backgroundColor).toBe(nakedExpected);
    const liquidExpected = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#expected-liquid")!,
    ).backgroundColor;
    const liquid = getComputedStyle(screen.getByRole("textbox", { name: "薄い塗り" }).element());
    expect(liquid.backgroundColor).toBe(liquidExpected);
    expect(naked.backgroundColor).not.toBe(liquid.backgroundColor);
  });

  test.skipIf(!supportsCustomFunctions())("outlined で枠線を描く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          id="expected"
          style={{
            borderColor: "var(--sui-grey-naked-border-normal)",
            borderStyle: "solid",
            borderWidth: "--sui-border_width(1)",
          }}
        />
        <TextareaRoot outlined aria-label="問い合わせ内容" />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.container.querySelector<HTMLElement>("#expected")!);
    const root = getComputedStyle(
      screen.getByRole("textbox", { name: "問い合わせ内容" }).element(),
    );
    expect(Number.parseFloat(root.borderTopWidth)).toBeGreaterThan(0.5);
    expect(Number.parseFloat(root.borderTopWidth)).toBeLessThan(1.5);
    expect(root.borderTopColor).toBe(expected.borderTopColor);
  });

  test("公開変数で outline の枠線色を上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TextareaRoot id="custom" outlined aria-label="問い合わせ内容" />);
    const root = screen.container.querySelector<HTMLElement>("#custom")!;
    const idle = getComputedStyle(root).borderTopColor;
    root.style.setProperty("--sui_textarea-border_color-idle", "rgb(1, 2, 3)");

    // 検証
    expect(getComputedStyle(root).borderTopColor).toBe("rgb(1, 2, 3)");
    expect(idle).not.toBe("rgb(1, 2, 3)");
  });

  test("outlined では hover で枠線色を変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <TextareaRoot outlined aria-label="問い合わせ内容" />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const root = screen.getByRole("textbox", { name: "問い合わせ内容" });
    await screen.getByText("待避").hover();
    const idle = getComputedStyle(root.element()).borderTopColor;

    // 実行
    await root.hover();

    // 検証
    expect(getComputedStyle(root.element()).borderTopColor).not.toBe(idle);
  });

  test("outlined では focus-visible で枠線色とフォーカスリングを変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <TextareaRoot outlined aria-label="問い合わせ内容" />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const root = screen.getByRole("textbox", { name: "問い合わせ内容" }).element();
    await screen.getByText("待避").hover();
    const idle = getComputedStyle(root).borderTopColor;

    // 実行
    root.focus({ focusVisible: true });

    // 検証
    expect(getComputedStyle(root).borderTopColor).not.toBe(idle);
    expect(Number.parseFloat(getComputedStyle(root).outlineWidth)).toBeGreaterThan(0);
  });

  test("不正な入力欄では枠線色を赤へ変える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          id="expected"
          style={{
            borderColor: "var(--sui-red-naked-canvas_text-normal)",
            borderStyle: "solid",
          }}
        />
        <FieldRoot invalid>
          <TextareaRoot outlined aria-label="問い合わせ内容" />
        </FieldRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.container.querySelector<HTMLElement>("#expected")!);
    const root = getComputedStyle(
      screen.getByRole("textbox", { name: "問い合わせ内容" }).element(),
    );
    expect(root.borderTopColor).toBe(expected.borderTopColor);
  });

  test("無効時は hover しても枠線色を変えずリサイズもできない", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <span
          id="expected"
          style={{ borderColor: "var(--sui-disabled-naked-border)", borderStyle: "solid" }}
        />
        <TextareaRoot variant="naked" disabled outlined aria-label="問い合わせ内容" />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const root = screen.getByRole("textbox", { name: "問い合わせ内容" });
    await screen.getByText("待避").hover();
    const idle = getComputedStyle(root.element()).borderTopColor;

    // 実行
    await root.hover();

    // 検証
    expect(idle).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected")!).borderTopColor,
    );
    expect(getComputedStyle(root.element()).borderTopColor).toBe(idle);
    expect(getComputedStyle(root.element()).resize).toBe("none");
    expect(getComputedStyle(root.element()).cursor).toBe("not-allowed");
  });

  test("無効時は配色を変える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          id="expected-naked"
          style={{
            color: "var(--sui-disabled-naked-canvas_text)",
            backgroundColor: "var(--sui-disabled-naked-canvas)",
          }}
        />
        <span
          id="expected-liquid"
          style={{
            color: "var(--sui-disabled-liquid-canvas_text)",
            backgroundColor: "var(--sui-disabled-liquid-canvas)",
          }}
        />
        <TextareaRoot variant="naked" disabled aria-label="無効な背景なし" />
        <TextareaRoot variant="liquid" disabled aria-label="無効な薄い塗り" />
      </>,
    );

    // 検証
    for (const [name, id] of [
      ["無効な背景なし", "expected-naked"],
      ["無効な薄い塗り", "expected-liquid"],
    ] as const) {
      const expected = getComputedStyle(screen.container.querySelector<HTMLElement>(`#${id}`)!);
      const root = getComputedStyle(screen.getByRole("textbox", { name }).element());
      expect(root.color).toBe(expected.color);
      expect(root.backgroundColor).toBe(expected.backgroundColor);
    }
  });

  test("公開変数で最小高さと水平余白を上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TextareaRoot id="custom" aria-label="問い合わせ内容" />);
    const root = screen.container.querySelector<HTMLElement>("#custom")!;
    root.style.setProperty("--sui_textarea-min_height", "48px");
    root.style.setProperty("--sui_textarea-padding_inline", "20px");

    // 検証
    expect(getComputedStyle(root).minHeight).toBe("48px");
    expect(getComputedStyle(root).paddingInlineStart).toBe("20px");
  });
});
