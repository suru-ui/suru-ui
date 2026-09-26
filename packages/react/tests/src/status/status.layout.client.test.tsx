import "@suru-ui/theme/suru.css";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/status/status.parts.js";
import { Status } from "../../../src/status/status.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

/**
 * 指定した ID のルート配下にあるインジケーターを取得します。
 */
function getIndicator(container: HTMLElement, id: string): HTMLElement {
  return container.querySelector<HTMLElement>(`#${id} .sui_status_indicator`)!;
}

describe("Status の配置", () => {
  test("点とラベルを横に並べて中央で揃える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Status id="status">
        <span id="label">オンライン</span>
      </Status>,
    );

    // 検証
    const root = screen.container.querySelector<HTMLElement>("#status")!;
    const dotRect = getIndicator(screen.container, "status").getBoundingClientRect();
    const labelRect = screen.container
      .querySelector<HTMLElement>("#label")!
      .getBoundingClientRect();
    expect(getComputedStyle(root).display).toBe("inline-flex");
    expect(getComputedStyle(root).alignItems).toBe("center");
    expect(dotRect.right).toBeLessThanOrEqual(labelRect.left + 0.5);
    expect(dotRect.top + dotRect.height / 2).toBeCloseTo(labelRect.top + labelRect.height / 2, 1);
  });

  test("大きさごとの点の寸法を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Status id="sm" size="sm" />
        <Status id="md" size="md" />
        <Status id="lg" size="lg" />
      </>,
    );

    // 検証
    const sm = getIndicator(screen.container, "sm").getBoundingClientRect();
    expect(sm.width).toBeCloseTo(6, 1);
    expect(sm.height).toBeCloseTo(6, 1);
    const md = getIndicator(screen.container, "md").getBoundingClientRect();
    expect(md.width).toBeCloseTo(8.4, 1);
    expect(md.height).toBeCloseTo(8.4, 1);
    const lg = getIndicator(screen.container, "lg").getBoundingClientRect();
    expect(lg.width).toBeCloseTo(10.8, 1);
    expect(lg.height).toBeCloseTo(10.8, 1);
  });

  test("点を円形にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Status id="status" />);

    // 検証
    const indicator = getComputedStyle(getIndicator(screen.container, "status"));
    expect(Number.parseFloat(indicator.borderTopLeftRadius)).toBeCloseTo(
      Number.parseFloat(indicator.width) / 2,
      1,
    );
  });

  test.skipIf(!supportsCustomFunctions())("大きさごとの間隔を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="expected-sm" style={{ display: "flex", gap: "--sui-gap(2)" }} />
        <span id="expected-md" style={{ display: "flex", gap: "--sui-gap(3)" }} />
        <span id="expected-lg" style={{ display: "flex", gap: "--sui-gap(4)" }} />
        <Status id="sm" size="sm">
          <span>オンライン</span>
        </Status>
        <Status id="md" size="md">
          <span>オンライン</span>
        </Status>
        <Status id="lg" size="lg">
          <span>オンライン</span>
        </Status>
      </>,
    );

    // 検証
    for (const size of ["sm", "md", "lg"] as const) {
      const expected = getComputedStyle(
        screen.container.querySelector<HTMLElement>(`#expected-${size}`)!,
      );
      const root = getComputedStyle(screen.container.querySelector<HTMLElement>(`#${size}`)!);
      expect(root.columnGap).toBe(expected.columnGap);
      expect(root.rowGap).toBe(expected.rowGap);
    }
  });

  test("活字を大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          id="expected-sm"
          style={{
            fontSize: "var(--sui-text-oln-sm-n-font_size)",
            fontWeight: "var(--sui-text-oln-sm-n-font_weight)",
            letterSpacing: "var(--sui-text-oln-sm-n-letter_spacing)",
            lineHeight: "var(--sui-text-oln-sm-n-line_height)",
          }}
        />
        <span
          id="expected-md"
          style={{
            fontSize: "var(--sui-text-oln-md-n-font_size)",
            fontWeight: "var(--sui-text-oln-md-n-font_weight)",
            letterSpacing: "var(--sui-text-oln-md-n-letter_spacing)",
            lineHeight: "var(--sui-text-oln-md-n-line_height)",
          }}
        />
        <span
          id="expected-lg"
          style={{
            fontSize: "var(--sui-text-oln-lg-n-font_size)",
            fontWeight: "var(--sui-text-oln-lg-n-font_weight)",
            letterSpacing: "var(--sui-text-oln-lg-n-letter_spacing)",
            lineHeight: "var(--sui-text-oln-lg-n-line_height)",
          }}
        />
        <Status id="sm" size="sm" />
        <Status id="md" size="md" />
        <Status id="lg" size="lg" />
      </>,
    );

    // 検証
    for (const size of ["sm", "md", "lg"] as const) {
      const expected = getComputedStyle(
        screen.container.querySelector<HTMLElement>(`#expected-${size}`)!,
      );
      const root = getComputedStyle(screen.container.querySelector<HTMLElement>(`#${size}`)!);
      expect(root.fontSize).toBe(expected.fontSize);
      expect(root.fontWeight).toBe(expected.fontWeight);
      expect(root.letterSpacing).toBe(expected.letterSpacing);
      expect(root.lineHeight).toBe(expected.lineHeight);
    }
  });

  test("配色を点へ適用する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ backgroundColor: "var(--sui-grey-solid-canvas-normal)" }}>既定の基準</span>
        <span style={{ backgroundColor: "var(--sui-blue-solid-canvas-normal)" }}>色の基準</span>
        <Status id="grey" />
        <Status id="blue" color="blue" />
      </>,
    );

    // 検証
    expect(getComputedStyle(getIndicator(screen.container, "grey")).backgroundColor).toBe(
      getComputedStyle(screen.getByText("既定の基準").element()).backgroundColor,
    );
    expect(getComputedStyle(getIndicator(screen.container, "blue")).backgroundColor).toBe(
      getComputedStyle(screen.getByText("色の基準").element()).backgroundColor,
    );
  });

  test("ラベルの色を文字へ適用する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-canvas_text-1)" }}>基準</span>
        <Status id="status">オンライン</Status>
      </>,
    );

    // 検証
    expect(getComputedStyle(screen.container.querySelector<HTMLElement>("#status")!).color).toBe(
      getComputedStyle(screen.getByText("基準").element()).color,
    );
  });

  test("リップルのアニメーションを疑似要素へ適用する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Status id="plain" />
        <Status id="ping" ping />
      </>,
    );

    // 検証
    const plain = getComputedStyle(getIndicator(screen.container, "plain"), "::after");
    expect(plain.animationName).toBe("none");
    const ping = getComputedStyle(getIndicator(screen.container, "ping"), "::after");
    expect(ping.animationName).toBe("sui_status-ping");
    expect(ping.animationDuration).toBe("1.5s");
    expect(ping.animationIterationCount).toBe("infinite");
    expect(ping.animationTimingFunction).toBe("ease-out");
    expect(ping.position).toBe("absolute");
  });

  test("リップルを含む余白を確保する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Status id="plain" />
        <Status id="ping" ping />
        <Status id="contained" containRipple />
        <Status id="small" containRipple rippleSize="sm" />
        <Status id="large" containRipple rippleSize="lg" />
      </>,
    );

    // 検証
    const plain = getComputedStyle(getIndicator(screen.container, "plain"));
    expect(plain.marginTop).toBe("0px");
    const ping = getComputedStyle(getIndicator(screen.container, "ping"));
    expect(ping.marginTop).toBe("0px");
    const contained = getComputedStyle(getIndicator(screen.container, "contained"));
    expect(Number.parseFloat(contained.marginTop)).toBeCloseTo(5.25, 1);
    expect(contained.marginTop).toBe(contained.marginBottom);
    expect(contained.marginLeft).toBe(contained.marginRight);
    const small = getComputedStyle(getIndicator(screen.container, "small"));
    expect(Number.parseFloat(small.marginTop)).toBeCloseTo(3.15, 1);
    const large = getComputedStyle(getIndicator(screen.container, "large"));
    expect(Number.parseFloat(large.marginTop)).toBeCloseTo(7.35, 1);
  });

  test("外部と内側の余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Status />);

    // 検証
    const root = getComputedStyle(screen.getByClassName("sui_status").element());
    expect(root.marginTop).toBe("0px");
    expect(root.marginInlineStart).toBe("0px");
    expect(root.paddingBlockStart).toBe("0px");
    const indicator = getComputedStyle(screen.getByClassName("sui_status_indicator").element());
    expect(indicator.marginTop).toBe("0px");
    expect(indicator.paddingBlockStart).toBe("0px");
  });

  test("公開変数で点の大きさと間隔を上書きできる", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Status id="status">
        <span>オンライン</span>
      </Status>,
    );
    const root = screen.container.querySelector<HTMLElement>("#status")!;

    // 実行
    root.style.setProperty("--sui_status_indicator-size", "24px");
    root.style.setProperty("--sui_status-gap", "24px");

    // 検証
    expect(getIndicator(screen.container, "status").getBoundingClientRect().height).toBeCloseTo(
      24,
      1,
    );
    expect(getComputedStyle(root).columnGap).toBe("24px");
  });
});
