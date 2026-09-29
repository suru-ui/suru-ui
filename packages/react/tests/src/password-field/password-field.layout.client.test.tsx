import "@suru-ui/theme/suru.css";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/password-field/password-field.parts.js";
import { PasswordField } from "../../../src/password-field/password-field.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

describe("PasswordField の配置", () => {
  test("外部の余白を持たずルート幅いっぱいに広がる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<PasswordField style={{ width: "320px" }} />);

    // 検証
    const root = screen.getByClassName("sui_password_field").element();
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
        <PasswordField size="sm" />
        <PasswordField size="md" />
        <PasswordField size="lg" />
      </>,
    );

    // 検証
    const roots = screen.container.querySelectorAll<HTMLElement>(".sui_password_field");
    expect(getComputedStyle(roots[0]!).minHeight).toBe("20px");
    expect(getComputedStyle(roots[1]!).minHeight).toBe("28px");
    expect(getComputedStyle(roots[2]!).minHeight).toBe("36px");
  });

  test.skipIf(!supportsCustomFunctions())("大きさに応じた水平余白を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="expected-sm" style={{ display: "block", paddingInline: "--sui-space(3)" }} />
        <span id="expected-md" style={{ display: "block", paddingInline: "--sui-space(4)" }} />
        <span id="expected-lg" style={{ display: "block", paddingInline: "--sui-space(5)" }} />
        <PasswordField size="sm" />
        <PasswordField size="md" />
        <PasswordField size="lg" />
      </>,
    );

    // 検証
    const roots = screen.container.querySelectorAll<HTMLElement>(".sui_password_field");
    for (const [index, id] of (["expected-sm", "expected-md", "expected-lg"] as const).entries()) {
      const expected = getComputedStyle(
        screen.container.querySelector<HTMLElement>(`#${id}`)!,
      ).paddingInlineStart;
      expect(getComputedStyle(roots[index]!).paddingInlineStart).toBe(expected);
    }
  });

  test("大きさに応じた活字を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <PasswordField endAddons={["🔒"]} size="sm" visibilityToggle={false} />
        <PasswordField endAddons={["🔒"]} size="md" visibilityToggle={false} />
        <PasswordField endAddons={["🔒"]} size="lg" visibilityToggle={false} />
      </>,
    );

    // 検証
    const inputs = screen.container.querySelectorAll<HTMLElement>(".sui_text_field_input");
    const addons = screen.container.querySelectorAll<HTMLElement>(".sui_password_field_addon");
    for (const [index, fontSize] of (["12px", "14px", "17px"] as const).entries()) {
      expect(getComputedStyle(inputs[index]!).fontSize).toBe(fontSize);
      expect(getComputedStyle(addons[index]!).fontSize).toBe(fontSize);
    }
  });

  test("入力欄と Addon と表示切替ボタンを横一列に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordField endAddons={["8 文字以上"]} startAddons={["🔒"]} style={{ width: "320px" }} />,
    );

    // 検証
    const root = screen.getByClassName("sui_password_field").element();
    const rootRect = root.getBoundingClientRect();
    const addons = screen.container.querySelectorAll<HTMLElement>(".sui_password_field_addon");
    const inputRect = screen
      .getByClassName("sui_text_field_input")
      .element()
      .getBoundingClientRect();
    const toggleRect = screen
      .getByClassName("sui_password_field_toggle")
      .element()
      .getBoundingClientRect();
    const startAddonRect = addons[0]!.getBoundingClientRect();
    const endAddonRect = addons[1]!.getBoundingClientRect();
    expect(startAddonRect.right).toBeLessThanOrEqual(inputRect.left + 0.5);
    expect(inputRect.right).toBeLessThanOrEqual(endAddonRect.left + 0.5);
    expect(endAddonRect.right).toBeLessThanOrEqual(toggleRect.left + 0.5);
    expect(toggleRect.right).toBeLessThanOrEqual(rootRect.right + 0.5);
    for (const rect of [startAddonRect, inputRect, endAddonRect, toggleRect]) {
      expect(rect.top + rect.height / 2).toBeCloseTo(rootRect.top + rootRect.height / 2, 0);
    }
  });

  test("大きさに応じた切替ボタンを正方形に揃える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <PasswordField size="sm" />
        <PasswordField size="md" />
        <PasswordField size="lg" />
      </>,
    );

    // 検証
    const toggles = screen.container.querySelectorAll<HTMLElement>(".sui_password_field_toggle");
    const widths = [...toggles].map((toggle) => toggle.getBoundingClientRect().width);
    for (const [index, toggle] of [...toggles].entries()) {
      const rect = toggle.getBoundingClientRect();
      expect(rect.width).toBeCloseTo(rect.height, 1);
      if (index > 0) {
        expect(widths[index]!).toBeGreaterThan(widths[index - 1]!);
      }
    }
  });

  test("指定した角丸でルートを切り抜く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="expected-sm" style={{ borderTopLeftRadius: "4px" }} />
        <span id="expected-lg" style={{ borderTopLeftRadius: "12px" }} />
        <PasswordField radius="none" />
        <PasswordField radius="sm" />
        <PasswordField radius="lg" />
        <PasswordField radius="full" />
      </>,
    );

    // 検証
    const roots = screen.container.querySelectorAll<HTMLElement>(".sui_password_field");
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

  test.skipIf(!supportsCustomFunctions())(
    "指定した角丸で切替ボタンを切り抜く",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <>
          <span id="expected-sm" style={{ borderTopLeftRadius: "4px" }} />
          <PasswordField radius="sm" />
          <PasswordField radius="full" />
        </>,
      );

      // 検証
      const toggles = screen.container.querySelectorAll<HTMLElement>(".sui_password_field_toggle");
      expect(getComputedStyle(toggles[0]!).borderTopLeftRadius).toBe(
        getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-sm")!)
          .borderTopLeftRadius,
      );
      const fullToggle = toggles[1]!.getBoundingClientRect();
      expect(Number.parseFloat(getComputedStyle(toggles[1]!).borderTopLeftRadius)).toBeCloseTo(
        fullToggle.width / 2,
        1,
      );
    },
  );

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
        <PasswordField variant="naked" />
        <PasswordField variant="liquid" />
      </>,
    );

    // 検証
    const roots = screen.container.querySelectorAll<HTMLElement>(".sui_password_field");
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
        <PasswordField outlined />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.container.querySelector<HTMLElement>("#expected")!);
    const after = getComputedStyle(
      screen.getByClassName("sui_password_field").element(),
      "::after",
    );
    expect(Number.parseFloat(after.borderTopWidth)).toBeGreaterThan(0.5);
    expect(Number.parseFloat(after.borderTopWidth)).toBeLessThan(1.5);
    expect(after.borderTopColor).toBe(expected.borderTopColor);
  });

  test("outlined では入力中の枠線とフォーカスリングを変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <PasswordField outlined />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const root = screen.getByClassName("sui_password_field").element();
    const input = screen.getByRole("textbox").element() as HTMLInputElement;
    await screen.getByText("待避").hover();
    const idleColor = getComputedStyle(root, "::after").borderTopColor;

    // 実行
    input.focus({ focusVisible: true });

    // 検証
    expect(getComputedStyle(root, "::after").borderTopColor).not.toBe(idleColor);
    expect(Number.parseFloat(getComputedStyle(root).outlineWidth)).toBeGreaterThan(0);
  });

  test("無効時は配色を変える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          id="expected"
          style={{
            color: "var(--sui-disabled-liquid-canvas_text)",
            backgroundColor: "var(--sui-disabled-liquid-canvas)",
          }}
        >
          無効の基準
        </span>
        <PasswordField disabled defaultValue="secret" />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.container.querySelector<HTMLElement>("#expected")!);
    const root = screen.getByClassName("sui_password_field").element();
    expect(getComputedStyle(root).backgroundColor).toBe(expected.backgroundColor);
    expect(getComputedStyle(screen.getByClassName("sui_text_field_input").element()).color).toBe(
      expected.color,
    );
    const toggle = screen.getByClassName("sui_password_field_toggle").element();
    expect(getComputedStyle(toggle).color).toBe(expected.color);
    expect(getComputedStyle(toggle).backgroundColor).toBe("rgba(0, 0, 0, 0)");
    expect(getComputedStyle(toggle).cursor).toBe("not-allowed");
  });

  test("公開変数で切替ボタンの大きさを上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<PasswordField />);
    const root = screen.getByClassName("sui_password_field").element();
    root.style.setProperty("--sui_password_field_toggle-size", "40px");

    // 検証
    expect(
      screen.getByClassName("sui_password_field_toggle").element().getBoundingClientRect().width,
    ).toBeCloseTo(40, 1);
  });
});
