import "@suru-ui/theme/suru.css";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { FieldRoot } from "../field/root/field.root.jsx";
import "./text-field.parts.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";
import "../../tests/src/_locators.js";
import { TextField } from "./text-field.jsx";

describe("TextField の配置", () => {
  test("外部の余白を持たず指定した幅になる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TextField style={{ width: "320px" }} />);

    // 検証
    const root = screen.getByClassName("sui_text_field").element();
    const rootStyle = getComputedStyle(root);
    expect(rootStyle.marginTop).toBe("0px");
    expect(rootStyle.marginInlineStart).toBe("0px");
    expect(rootStyle.display).toBe("inline-flex");
    expect(rootStyle.alignItems).toBe("stretch");
    expect(root.getBoundingClientRect().width).toBeCloseTo(320, 1);
  });

  test("大きさに応じた最小高さを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <TextField size="sm" />
        <TextField size="md" />
        <TextField size="lg" />
      </>,
    );

    // 検証
    const roots = screen.container.querySelectorAll<HTMLElement>(".sui_text_field");
    expect(getComputedStyle(roots[0]!).minHeight).toBe("26px");
    expect(getComputedStyle(roots[1]!).minHeight).toBe("32px");
    expect(getComputedStyle(roots[2]!).minHeight).toBe("36px");
  });

  test.skipIf(!supportsCustomFunctions())("大きさに応じた水平余白を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="expected-sm" style={{ display: "block", paddingInline: "--sui-space(1.5)" }} />
        <span id="expected-md" style={{ display: "block", paddingInline: "--sui-space(2.5)" }} />
        <span id="expected-lg" style={{ display: "block", paddingInline: "--sui-space(3.5)" }} />
        <TextField size="sm" />
        <TextField size="md" />
        <TextField size="lg" />
      </>,
    );

    // 検証
    const roots = screen.container.querySelectorAll<HTMLElement>(".sui_text_field");
    for (const [index, id] of (["expected-sm", "expected-md", "expected-lg"] as const).entries()) {
      const expected = getComputedStyle(
        screen.container.querySelector<HTMLElement>(`#${id}`)!,
      ).paddingInlineStart;
      expect(getComputedStyle(roots[index]!).paddingInlineStart).toBe(expected);
    }
  });

  test.skipIf(!supportsCustomFunctions())(
    "大きさに応じた間隔で入力欄と Addon を離す",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <>
          <span id="expected-sm" style={{ display: "flex", columnGap: "--sui-gap(0.5)" }} />
          <span id="expected-md" style={{ display: "flex", columnGap: "--sui-gap(1)" }} />
          <span id="expected-lg" style={{ display: "flex", columnGap: "--sui-gap(1.5)" }} />
          <TextField size="sm" endAddons={["🔒"]} />
          <TextField size="md" endAddons={["🔒"]} />
          <TextField size="lg" endAddons={["🔒"]} />
        </>,
      );

      // 検証
      const roots = screen.container.querySelectorAll<HTMLElement>(".sui_text_field");
      for (const [index, id] of (
        ["expected-sm", "expected-md", "expected-lg"] as const
      ).entries()) {
        const expected = getComputedStyle(
          screen.container.querySelector<HTMLElement>(`#${id}`)!,
        ).columnGap;
        expect(getComputedStyle(roots[index]!).columnGap).toBe(expected);
      }
    },
  );

  test("大きさに応じた活字を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <TextField size="sm" endAddons={["🔒"]} />
        <TextField size="md" endAddons={["🔒"]} />
        <TextField size="lg" endAddons={["🔒"]} />
      </>,
    );

    // 検証
    const inputs = screen.container.querySelectorAll<HTMLElement>(".sui_text_field_input");
    const addons = screen.container.querySelectorAll<HTMLElement>(".sui_text_field_addon");
    for (const [index, fontSize] of (["12px", "14px", "17px"] as const).entries()) {
      expect(getComputedStyle(inputs[index]!).fontSize).toBe(fontSize);
      expect(getComputedStyle(addons[index]!).fontSize).toBe(fontSize);
    }
  });

  test("入力欄と Addon を横一列に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextField style={{ width: "320px" }} endAddons={["8 文字以上"]} startAddons={["🔒"]} />,
    );

    // 検証
    const root = screen.getByClassName("sui_text_field").element();
    const rootRect = root.getBoundingClientRect();
    const addons = screen.container.querySelectorAll<HTMLElement>(".sui_text_field_addon");
    const inputRect = screen
      .getByClassName("sui_text_field_input")
      .element()
      .getBoundingClientRect();
    const startAddonRect = addons[0]!.getBoundingClientRect();
    const endAddonRect = addons[1]!.getBoundingClientRect();
    expect(startAddonRect.left).toBeGreaterThanOrEqual(rootRect.left - 0.5);
    expect(startAddonRect.right).toBeLessThanOrEqual(inputRect.left + 0.5);
    expect(inputRect.right).toBeLessThanOrEqual(endAddonRect.left + 0.5);
    expect(endAddonRect.right).toBeLessThanOrEqual(rootRect.right + 0.5);
    for (const rect of [startAddonRect, inputRect, endAddonRect]) {
      expect(rect.top + rect.height / 2).toBeCloseTo(rootRect.top + rootRect.height / 2, 0);
    }
  });

  test.skipIf(!supportsCustomFunctions())(
    "入力欄を残りの幅いっぱいに広げる",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(<TextField style={{ width: "320px" }} endAddons={["🔒"]} />);
      const root = screen.getByClassName("sui_text_field").element();
      const rootStyle = getComputedStyle(root);
      const addonRect = screen.getByText("🔒").element().getBoundingClientRect();

      // 検証
      const remainingWidth =
        root.getBoundingClientRect().width -
        Number.parseFloat(rootStyle.paddingInlineStart) -
        Number.parseFloat(rootStyle.paddingInlineEnd) -
        addonRect.width -
        Number.parseFloat(rootStyle.columnGap);
      const input = screen.getByClassName("sui_text_field_input").element().getBoundingClientRect();
      expect(input.width).toBeCloseTo(remainingWidth, 0);
    },
  );

  test("指定した角丸でルートを切り抜く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="expected-sm" style={{ borderTopLeftRadius: "4px" }} />
        <span id="expected-lg" style={{ borderTopLeftRadius: "12px" }} />
        <TextField radius="none" />
        <TextField radius="sm" />
        <TextField radius="lg" />
        <TextField radius="full" />
      </>,
    );

    // 検証
    const roots = screen.container.querySelectorAll<HTMLElement>(".sui_text_field");
    expect(getComputedStyle(roots[0]!).borderTopLeftRadius).toBe("0px");
    expect(getComputedStyle(roots[1]!).borderTopLeftRadius).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-sm")!)
        .borderTopLeftRadius,
    );
    expect(getComputedStyle(roots[2]!).borderTopLeftRadius).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-lg")!)
        .borderTopLeftRadius,
    );
    const fullRoot = getComputedStyle(roots[3]!);
    expect(Number.parseFloat(fullRoot.borderTopLeftRadius)).toBeCloseTo(
      Number.parseFloat(fullRoot.minHeight) / 2,
      1,
    );
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
        <TextField variant="naked" />
        <TextField variant="liquid" />
      </>,
    );

    // 検証
    const roots = screen.container.querySelectorAll<HTMLElement>(".sui_text_field");
    expect(getComputedStyle(roots[0]!).backgroundColor).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-naked")!)
        .backgroundColor,
    );
    expect(getComputedStyle(roots[1]!).backgroundColor).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-liquid")!)
        .backgroundColor,
    );
    expect(getComputedStyle(roots[0]!).backgroundColor).not.toBe(
      getComputedStyle(roots[1]!).backgroundColor,
    );
  });

  test.skipIf(!supportsCustomFunctions())("outlined でルートに枠線を描く", async ({ expect }) => {
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
        <TextField outlined />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.container.querySelector<HTMLElement>("#expected")!);
    const after = getComputedStyle(screen.getByClassName("sui_text_field").element(), "::after");
    expect(Number.parseFloat(after.borderTopWidth)).toBeGreaterThan(0.5);
    expect(Number.parseFloat(after.borderTopWidth)).toBeLessThan(1.5);
    expect(after.borderTopColor).toBe(expected.borderTopColor);
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
            borderWidth: "--sui-border_width(1)",
          }}
        />
        <FieldRoot invalid>
          <TextField outlined />
        </FieldRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.container.querySelector<HTMLElement>("#expected")!);
    const after = getComputedStyle(screen.getByClassName("sui_text_field").element(), "::after");
    expect(after.borderTopColor).toBe(expected.borderTopColor);
  });

  test("outlined では入力中の枠線とフォーカスリングを変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <TextField outlined />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const root = screen.getByClassName("sui_text_field").element();
    const input = screen.getByRole("textbox").element() as HTMLInputElement;
    await screen.getByText("待避").hover();
    const idleColor = getComputedStyle(root, "::after").borderTopColor;

    // 実行
    input.focus({ focusVisible: true });

    // 検証
    expect(getComputedStyle(root, "::after").borderTopColor).not.toBe(idleColor);
    expect(Number.parseFloat(getComputedStyle(root).outlineWidth)).toBeGreaterThan(0);
  });

  test("無効時は hover しても枠線色を変えない", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <span
          id="expected"
          style={{ borderColor: "var(--sui-disabled-naked-border)", borderStyle: "solid" }}
        />
        <TextField variant="naked" disabled outlined />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const root = screen.getByClassName("sui_text_field").element();
    await screen.getByText("待避").hover();
    const idleColor = getComputedStyle(root, "::after").borderTopColor;

    // 実行
    await screen.getByClassName("sui_text_field").hover();

    // 検証
    expect(idleColor).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected")!).borderTopColor,
    );
    expect(getComputedStyle(root, "::after").borderTopColor).toBe(idleColor);
  });

  test("無効時は配色を変える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          id="expected"
          style={{
            color: "var(--sui-disabled-naked-canvas_text)",
            backgroundColor: "var(--sui-disabled-naked-canvas)",
          }}
        >
          無効の基準
        </span>
        <TextField disabled endAddons={["🔒"]} defaultValue="入力値" />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.container.querySelector<HTMLElement>("#expected")!);
    const root = screen.getByClassName("sui_text_field").element();
    expect(getComputedStyle(root).backgroundColor).toBe(expected.backgroundColor);
    expect(getComputedStyle(screen.getByClassName("sui_text_field_input").element()).color).toBe(
      expected.color,
    );
    expect(getComputedStyle(screen.getByText("🔒").element()).color).toBe(expected.color);
  });

  test("公開変数で最小高さと水平余白を上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TextField id="custom" />);
    const root = screen.container.querySelector<HTMLElement>("#custom")!;
    root.style.setProperty("--sui_text_field-min_height", "48px");
    root.style.setProperty("--sui_text_field-padding_inline", "20px");

    // 検証
    expect(getComputedStyle(root).minHeight).toBe("48px");
    expect(getComputedStyle(root).paddingInlineStart).toBe("20px");
  });
});
