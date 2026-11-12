import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "./chip.parts.js";
import "../../tests/src/_locators.js";
import { ChipRoot } from "./root/chip.root.jsx";

describe("ChipRoot の配置", () => {
  test("大きさごとの最小寸法を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <ChipRoot id="sm" size="sm" />
        <ChipRoot id="md" size="md" />
        <ChipRoot id="lg" size="lg" />
      </>,
    );

    // 検証。
    const sm = screen.container.querySelector<HTMLElement>("#sm")?.getBoundingClientRect();
    expect(sm?.height).toBeCloseTo(26, 1);

    const md = screen.container.querySelector<HTMLElement>("#md")?.getBoundingClientRect();
    expect(md?.height).toBeCloseTo(32, 1);

    const lg = screen.container.querySelector<HTMLElement>("#lg")?.getBoundingClientRect();
    expect(lg?.height).toBeCloseTo(36, 1);
  });

  test("内容を中央に配置する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <ChipRoot>
        <span>新着</span>
      </ChipRoot>,
    );

    // 検証。
    const root = screen.getByClassName("sui_chip").element();
    const style = getComputedStyle(root);
    expect(style.display).toBe("inline-flex");
    expect(style.alignItems).toBe("center");
    expect(style.justifyContent).toBe("center");

    const rootRect = root.getBoundingClientRect();
    const textRect = screen.getByText("新着").element().getBoundingClientRect();
    expect(textRect.left + textRect.width / 2).toBeCloseTo(rootRect.left + rootRect.width / 2, 1);
    expect(textRect.top + textRect.height / 2).toBeCloseTo(rootRect.top + rootRect.height / 2, 1);
  });

  test("大きさごとの内側の余白を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <ChipRoot id="sm" size="sm">
          新着
        </ChipRoot>
        <ChipRoot id="md" size="md">
          新着
        </ChipRoot>
        <ChipRoot id="lg" size="lg">
          新着
        </ChipRoot>
      </>,
    );

    // 検証。
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm")!);
    expect(Number.parseFloat(sm.paddingInlineStart)).toBeCloseTo(6, 1);

    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md")!);
    expect(Number.parseFloat(md.paddingInlineStart)).toBeCloseTo(10, 1);

    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg")!);
    expect(Number.parseFloat(lg.paddingInlineStart)).toBeCloseTo(14, 1);
  });

  test("大きさごとの間隔を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <ChipRoot id="sm" size="sm">
          <span>前</span>
          <span>後</span>
        </ChipRoot>
        <ChipRoot id="md" size="md">
          <span>前</span>
          <span>後</span>
        </ChipRoot>
        <ChipRoot id="lg" size="lg">
          <span>前</span>
          <span>後</span>
        </ChipRoot>
      </>,
    );

    // 検証。
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm")!);
    expect(sm.columnGap).toBe("2px");

    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md")!);
    expect(md.columnGap).toBe("4px");

    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg")!);
    expect(lg.columnGap).toBe("6px");
  });

  test("指定した角丸で切り抜く", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <ChipRoot id="none" radius="none" />
        <ChipRoot id="sm" radius="sm" />
        <ChipRoot id="md" radius="md" />
        <ChipRoot id="lg" radius="lg" />
        <ChipRoot id="fullSm" size="sm" radius="full" />
        <ChipRoot id="fullLg" size="lg" radius="full" />
      </>,
    );

    // 検証。
    const none = getComputedStyle(screen.container.querySelector<HTMLElement>("#none")!);
    expect(none.borderTopLeftRadius).toBe("0px");

    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm")!);
    expect(sm.borderTopLeftRadius).toBe("4px");

    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md")!);
    expect(md.borderTopLeftRadius).toBe("8px");

    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg")!);
    expect(lg.borderTopLeftRadius).toBe("12px");

    const fullSm = getComputedStyle(screen.container.querySelector<HTMLElement>("#fullSm")!);
    expect(fullSm.borderTopLeftRadius).toBe("13px");

    const fullLg = getComputedStyle(screen.container.querySelector<HTMLElement>("#fullLg")!);
    expect(fullLg.borderTopLeftRadius).toBe("18px");
  });

  test("配色を背景と文字へ適用する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span
          style={{
            color: "var(--sui-blue-solid-canvas_text-normal)",
            backgroundColor: "var(--sui-blue-solid-canvas-normal)",
          }}
        >
          色の基準
        </span>
        <ChipRoot color="blue" variant="solid">
          新着
        </ChipRoot>
      </>,
    );

    // 検証。
    const expected = getComputedStyle(screen.getByText("色の基準").element());
    const root = getComputedStyle(screen.getByClassName("sui_chip").element());
    expect(root.color).toBe(expected.color);
    expect(root.backgroundColor).toBe(expected.backgroundColor);
  });

  test("枠線を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span
          style={{
            borderColor: "var(--sui-grey-liquid-border-normal)",
            borderStyle: "solid",
          }}
        >
          枠線の基準
        </span>
        <ChipRoot id="plain">新着</ChipRoot>
        <ChipRoot id="outlined" outlined>
          新着
        </ChipRoot>
      </>,
    );

    // 検証。
    const expected = getComputedStyle(screen.getByText("枠線の基準").element());
    const plain = getComputedStyle(screen.container.querySelector<HTMLElement>("#plain")!);
    expect(plain.borderTopWidth).toBe("0px");

    const outlined = getComputedStyle(screen.container.querySelector<HTMLElement>("#outlined")!);
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeGreaterThan(0.5);
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeLessThan(1.5);
    expect(outlined.borderTopColor).toBe(expected.borderTopColor);

    const plainRect = screen.container
      .querySelector<HTMLElement>("#plain")!
      .getBoundingClientRect();
    const outlinedRect = screen.container
      .querySelector<HTMLElement>("#outlined")!
      .getBoundingClientRect();
    expect(outlinedRect.height).toBeCloseTo(plainRect.height, 1);
  });

  test("アイコンを活字の高さと配色に合わせる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span
          style={{
            color:
              "--sui-icon_color(var(--sui-grey-liquid-canvas_text-normal), var(--sui-grey-liquid-canvas-normal))",
          }}
        >
          アイコンの基準
        </span>
        <ChipRoot>
          <svg viewBox="0 0 24 24" data-testid="icon" />
          新着
        </ChipRoot>
      </>,
    );

    // 検証。
    const root = getComputedStyle(screen.getByClassName("sui_chip").element());
    const textHeight = Number.parseFloat(root.lineHeight);
    const icon = getComputedStyle(screen.getByTestId("icon").element());
    expect(Number.parseFloat(icon.width)).toBeCloseTo(textHeight, 1);
    expect(Number.parseFloat(icon.height)).toBeCloseTo(textHeight, 1);
    expect(icon.color).toBe(getComputedStyle(screen.getByText("アイコンの基準").element()).color);
  });

  test("外部の余白を持たない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ChipRoot />);

    // 検証。
    const style = getComputedStyle(screen.getByClassName("sui_chip").element());
    expect(style.marginTop).toBe("0px");
    expect(style.marginInlineStart).toBe("0px");
  });

  test("公開変数で大きさを上書きできる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ChipRoot id="custom" />);
    const root = screen.container.querySelector<HTMLElement>("#custom")!;
    root.style.setProperty("--sui_chip-min_height", "48px");

    // 検証。
    const style = getComputedStyle(root);

    expect(root.getBoundingClientRect().height).toBeCloseTo(48, 1);
    expect(style.borderTopLeftRadius).toBe("24px");
  });

  test("静的なチップは hover で配色を変えない", async ({ expect }) => {
    // 準備。
    const screen = await render(
      <>
        <ChipRoot>新着</ChipRoot>
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
    const chip = screen.getByClassName("sui_chip");
    await screen.getByText("待避").hover();

    const before = getComputedStyle(chip.element()).backgroundColor;

    // 実行。
    await chip.hover();

    // 検証。
    expect(getComputedStyle(chip.element()).backgroundColor).toBe(before);
  });

  test("button として描画したチップは hover で配色を変える", async ({ expect }) => {
    // 準備。
    const screen = await render(
      <>
        <span style={{ backgroundColor: "var(--sui-grey-liquid-canvas-subtle)" }}>基準</span>
        <ChipRoot
          // oxlint-disable-next-line jsx-a11y/control-has-associated-label -- `render` 先のボタンは子要素にテキストを含む
          render={<button type="button" />}
        >
          新着
        </ChipRoot>
      </>,
    );
    const chip = screen.getByClassName("sui_chip");

    // 実行。
    await chip.hover();

    // 検証。
    const expected = getComputedStyle(screen.getByText("基準").element()).backgroundColor;
    expect(getComputedStyle(chip.element()).backgroundColor).toBe(expected);
  });

  test("無効な button チップは hover でも配色を変えない", async ({ expect }) => {
    // 準備。
    const screen = await render(
      <>
        <ChipRoot
          // oxlint-disable-next-line jsx-a11y/control-has-associated-label -- `render` 先のボタンは子要素にテキストを含む
          render={<button type="button" disabled />}
        >
          新着
        </ChipRoot>
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
    const chip = screen.getByClassName("sui_chip");
    await screen.getByText("待避").hover();

    const before = getComputedStyle(chip.element()).backgroundColor;

    // 実行。
    await chip.hover();

    // 検証。
    expect(getComputedStyle(chip.element()).backgroundColor).toBe(before);
  });
});
