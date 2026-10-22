import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./radio.parts.js";
import { RadioGroupRoot } from "../radio-group/root/radio-group.root.jsx";
import { RadioIndicator } from "./indicator/radio.indicator.jsx";
import { Radio } from "./radio.jsx";
import { RadioRoot } from "./root/radio.root.jsx";
import "../../tests/src/_locators.js";

describe("Radio の配置", () => {
  test("公開パーツをすべて描画して余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot defaultValue="a">
        <Radio value="a" />
      </RadioGroupRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_radio_indicator").query()).not.toBe(null);
    // Base UI が描画する非表示の input は見た目を持たないため、余白の検証から除外します。
    for (const element of screen.container.querySelectorAll<HTMLElement>(
      ".sui_radio, .sui_radio *:not(input)",
    )) {
      const style = getComputedStyle(element);
      expect(style.marginTop).toBe("0px");
      expect(style.marginInlineStart).toBe("0px");
    }
  });

  test("大きさに応じた正方形を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          style={{
            width:
              "calc(var(--sui-text-oln-sm-m-font_size) * var(--sui-text-oln-sm-m-line_height))",
            display: "block",
          }}
          data-testid="sm-reference"
        />
        <span
          style={{
            width:
              "calc(var(--sui-text-oln-md-m-font_size) * var(--sui-text-oln-md-m-line_height))",
            display: "block",
          }}
          data-testid="md-reference"
        />
        <span
          style={{
            width:
              "calc(var(--sui-text-oln-lg-m-font_size) * var(--sui-text-oln-lg-m-line_height))",
            display: "block",
          }}
          data-testid="lg-reference"
        />
        <RadioRoot size="sm" value="sm" data-testid="sm" />
        <RadioRoot size="md" value="md" data-testid="md" />
        <RadioRoot size="lg" value="lg" data-testid="lg" />
      </>,
    );

    // 検証
    const sm = screen.getByTestId("sm").element().getBoundingClientRect();
    expect(sm.width).toBeCloseTo(
      screen.getByTestId("sm-reference").element().getBoundingClientRect().width,
      1,
    );
    expect(sm.height).toBeCloseTo(sm.width, 1);
    const md = screen.getByTestId("md").element().getBoundingClientRect();
    expect(md.width).toBeCloseTo(
      screen.getByTestId("md-reference").element().getBoundingClientRect().width,
      1,
    );
    expect(md.height).toBeCloseTo(md.width, 1);
    const lg = screen.getByTestId("lg").element().getBoundingClientRect();
    expect(lg.width).toBeCloseTo(
      screen.getByTestId("lg-reference").element().getBoundingClientRect().width,
      1,
    );
    expect(lg.height).toBeCloseTo(lg.width, 1);
  });

  test("選択中インジケーターが正の大きさを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot defaultValue="a">
        <RadioRoot value="a" data-testid="checked">
          <RadioIndicator />
        </RadioRoot>
      </RadioGroupRoot>,
    );

    // 検証
    const root = screen.getByTestId("checked").element().getBoundingClientRect();
    const indicator = screen
      .getByClassName("sui_radio_indicator")
      .element()
      .getBoundingClientRect();
    expect(indicator.width).toBeGreaterThan(0);
    expect(indicator.height).toBeGreaterThan(0);
    expect(indicator.width).toBeCloseTo(root.width * 0.42, 1);
  });

  test("インジケーターを中央に配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot defaultValue="a">
        <Radio value="a" />
      </RadioGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_radio").element().getBoundingClientRect();
    const indicator = screen
      .getByClassName("sui_radio_indicator")
      .element()
      .getBoundingClientRect();
    expect(indicator.left + indicator.width / 2).toBeCloseTo(root.left + root.width / 2, 1);
    expect(indicator.top + indicator.height / 2).toBeCloseTo(root.top + root.height / 2, 1);
  });

  test("角丸 full は高さの半分にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<RadioRoot size="lg" value="a" radius="full" data-testid="full" />);

    // 検証
    const root = screen.getByTestId("full").element();
    const style = getComputedStyle(root);
    expect(Number.parseFloat(style.borderTopLeftRadius)).toBeCloseTo(
      root.getBoundingClientRect().height / 2,
      1,
    );
  });

  test("枠線を表示しても大きさを変えない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <RadioRoot value="a" outlined={false} data-testid="plain" />
        <RadioRoot value="b" outlined data-testid="outlined" />
      </>,
    );

    // 検証
    const plain = screen.getByTestId("plain").element();
    const outlined = screen.getByTestId("outlined").element();
    expect(getComputedStyle(plain).borderTopWidth).toBe("0px");
    expect(getComputedStyle(outlined).borderTopStyle).toBe("solid");
    expect(Number.parseFloat(getComputedStyle(outlined).borderTopWidth)).toBeGreaterThan(0);
    expect(outlined.getBoundingClientRect().width).toBeCloseTo(
      plain.getBoundingClientRect().width,
      1,
    );
  });

  test("フォーカス時に焦点リングを表示する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <RadioGroupRoot>
        <RadioRoot value="a" />
      </RadioGroupRoot>,
    );
    const root = screen.getByClassName("sui_radio").element() as HTMLElement;

    // 実行
    root.focus({ focusVisible: true });

    // 検証
    const style = getComputedStyle(root);
    expect(style.outlineStyle).toBe("solid");
    expect(Number.parseFloat(style.outlineWidth)).toBeGreaterThan(0);
  });

  test("選択時は配色を背景に適用する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ backgroundColor: "var(--sui-blue-solid-canvas-normal)" }}>基準</span>
        <RadioGroupRoot color="blue" defaultValue="a">
          <RadioRoot value="a" />
        </RadioGroupRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element()).backgroundColor;
    const root = getComputedStyle(screen.getByClassName("sui_radio").element());
    expect(root.backgroundColor).toBe(expected);
  });

  test("未選択の hover で配色を変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <span style={{ display: "block", backgroundColor: "var(--sui-grey-liquid-canvas-subtle)" }}>
          基準
        </span>
        <RadioGroupRoot>
          <RadioRoot value="a" />
        </RadioGroupRoot>
      </>,
    );
    const root = screen.getByClassName("sui_radio");

    // 実行
    await root.hover();

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element()).backgroundColor;
    expect(getComputedStyle(root.element()).backgroundColor).toBe(expected);
  });

  test("無効時は操作不能な配色にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ backgroundColor: "var(--sui-disabled-naked-canvas)" }}>無効な未選択</span>
        <span style={{ backgroundColor: "var(--sui-disabled-solid-canvas)" }}>無効な選択済み</span>
        <RadioGroupRoot defaultValue="a">
          <RadioRoot value="a" disabled data-testid="disabled" />
          <RadioRoot value="b" disabled data-testid="disabled-unchecked" />
        </RadioGroupRoot>
      </>,
    );

    // 検証
    const unchecked = getComputedStyle(screen.getByTestId("disabled-unchecked").element());
    expect(unchecked.backgroundColor).toBe(
      getComputedStyle(screen.getByText("無効な未選択").element()).backgroundColor,
    );
    expect(unchecked.cursor).toBe("not-allowed");
    const checked = getComputedStyle(screen.getByTestId("disabled").element());
    expect(checked.backgroundColor).toBe(
      getComputedStyle(screen.getByText("無効な選択済み").element()).backgroundColor,
    );
  });

  test("無効時は hover で配色を変えない", async ({ expect }) => {
    // 準備
    const screen = await render(
      <RadioGroupRoot>
        <RadioRoot value="a" disabled data-testid="disabled" />
      </RadioGroupRoot>,
    );
    const root = screen.getByTestId("disabled");
    const before = getComputedStyle(root.element()).backgroundColor;

    // 実行
    await root.hover();

    // 検証
    expect(getComputedStyle(root.element()).backgroundColor).toBe(before);
  });

  test("無効時はインジケーターを淡色にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-disabled-solid-canvas_text)" }}>基準</span>
        <RadioGroupRoot defaultValue="a">
          <RadioRoot value="a" disabled>
            <RadioIndicator />
          </RadioRoot>
        </RadioGroupRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element()).color;
    const indicator = screen.getByClassName("sui_radio_indicator").element();
    expect(getComputedStyle(indicator).color).toBe(expected);
    expect(getComputedStyle(indicator).backgroundColor).toBe(expected);
  });

  test("無効かつ選択済みの outlined は無効用の枠線色にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ border: "1px solid var(--sui-disabled-solid-border)" }}>基準</span>
        <RadioRoot color="blue" value="" disabled outlined data-testid="outlined" />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element()).borderTopColor;
    const root = getComputedStyle(screen.getByTestId("outlined").element());
    expect(root.borderTopColor).toBe(expected);
    expect(Number.parseFloat(root.borderTopWidth)).toBeGreaterThan(0);
  });

  test("インジケーターの svg を大きさに収める", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot defaultValue="a">
        <RadioRoot value="a">
          <RadioIndicator>
            <svg viewBox="0 0 10 10" />
          </RadioIndicator>
        </RadioRoot>
      </RadioGroupRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_radio_indicator").element();
    const svg = indicator.querySelector("svg")!;
    expect(svg.getBoundingClientRect().width).toBeCloseTo(
      indicator.getBoundingClientRect().width * 0.75,
      1,
    );
  });
});
