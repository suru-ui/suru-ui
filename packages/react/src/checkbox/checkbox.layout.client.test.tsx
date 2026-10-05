import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./checkbox.parts.js";
import { Checkbox } from "./checkbox.jsx";
import { CheckboxIndicator } from "./indicator/checkbox.indicator.jsx";
import { CheckboxRoot } from "./root/checkbox.root.jsx";
import "../../tests/src/_locators.js";

describe("Checkbox の配置", () => {
  test("公開パーツをすべて描画して余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Checkbox defaultChecked />);

    // 検証
    expect(screen.getByClassName("sui_checkbox_indicator").query()).not.toBe(null);
    for (const element of screen.container.querySelectorAll<HTMLElement>(
      ".sui_checkbox, .sui_checkbox *",
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
        <CheckboxRoot size="sm" data-testid="sm" />
        <CheckboxRoot size="md" data-testid="md" />
        <CheckboxRoot size="lg" data-testid="lg" />
      </>,
    );

    // 検証
    const sm = screen.getByTestId("sm").element().getBoundingClientRect();
    expect(sm.width).toBeCloseTo(13.2, 1);
    expect(sm.height).toBeCloseTo(13.2, 1);
    const md = screen.getByTestId("md").element().getBoundingClientRect();
    expect(md.width).toBeCloseTo(15.4, 1);
    expect(md.height).toBeCloseTo(15.4, 1);
    const lg = screen.getByTestId("lg").element().getBoundingClientRect();
    expect(lg.width).toBeCloseTo(18.7, 1);
    expect(lg.height).toBeCloseTo(18.7, 1);
  });

  test("インジケーターを中央に配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Checkbox defaultChecked />);

    // 検証
    const root = screen.getByClassName("sui_checkbox").element().getBoundingClientRect();
    const indicator = screen
      .getByClassName("sui_checkbox_indicator")
      .element()
      .getBoundingClientRect();
    expect(indicator.left + indicator.width / 2).toBeCloseTo(root.left + root.width / 2, 1);
    expect(indicator.top + indicator.height / 2).toBeCloseTo(root.top + root.height / 2, 1);
    expect(indicator.width).toBeCloseTo(root.width, 1);
  });

  test("角丸 full は高さの半分にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxRoot size="lg" radius="full" data-testid="full" />);

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
        <CheckboxRoot data-testid="plain" />
        <CheckboxRoot outlined data-testid="outlined" />
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
    const screen = await render(<CheckboxRoot />);
    const root = screen.getByClassName("sui_checkbox").element() as HTMLElement;

    // 実行
    root.focus({ focusVisible: true });

    // 検証
    const style = getComputedStyle(root);
    expect(style.outlineStyle).toBe("solid");
    expect(Number.parseFloat(style.outlineWidth)).toBeGreaterThan(0);
  });

  test("チェック時は配色を背景に適用する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ backgroundColor: "var(--sui-blue-solid-canvas-normal)" }}>基準</span>
        <CheckboxRoot color="blue" defaultChecked />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element()).backgroundColor;
    const root = getComputedStyle(screen.getByClassName("sui_checkbox").element());
    expect(root.backgroundColor).toBe(expected);
  });

  test("チェック状態で check と dash を切り替える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <CheckboxRoot defaultChecked data-testid="checked">
          <CheckboxIndicator />
        </CheckboxRoot>
        <CheckboxRoot indeterminate data-testid="indeterminate">
          <CheckboxIndicator />
        </CheckboxRoot>
      </>,
    );

    // 検証
    const checked = screen.getByTestId("checked").element();
    expect(getComputedStyle(checked.querySelector(".sui_checkbox_icon-check")!).display).toBe(
      "inline",
    );
    expect(getComputedStyle(checked.querySelector(".sui_checkbox_icon-dash")!).display).toBe(
      "none",
    );
    const indeterminate = screen.getByTestId("indeterminate").element();
    expect(getComputedStyle(indeterminate.querySelector(".sui_checkbox_icon-check")!).display).toBe(
      "none",
    );
    expect(getComputedStyle(indeterminate.querySelector(".sui_checkbox_icon-dash")!).display).toBe(
      "inline",
    );
  });

  test("未チェックの hover で配色を変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <span style={{ display: "block", backgroundColor: "var(--sui-grey-liquid-canvas-subtle)" }}>
          基準
        </span>
        <CheckboxRoot />
      </>,
    );
    const root = screen.getByClassName("sui_checkbox");

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
        <span style={{ backgroundColor: "var(--sui-disabled-liquid-canvas)" }}>無効な未選択</span>
        <span style={{ backgroundColor: "var(--sui-disabled-solid-canvas)" }}>無効な選択済み</span>
        <CheckboxRoot disabled data-testid="disabled" />
        <CheckboxRoot disabled defaultChecked data-testid="disabled-checked" />
      </>,
    );

    // 検証
    const unchecked = getComputedStyle(screen.getByTestId("disabled").element());
    expect(unchecked.backgroundColor).toBe(
      getComputedStyle(screen.getByText("無効な未選択").element()).backgroundColor,
    );
    expect(unchecked.cursor).toBe("not-allowed");
    const checked = getComputedStyle(screen.getByTestId("disabled-checked").element());
    expect(checked.backgroundColor).toBe(
      getComputedStyle(screen.getByText("無効な選択済み").element()).backgroundColor,
    );
  });

  test("無効時はインジケーターを淡色にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-disabled-solid-canvas_text)" }}>基準</span>
        <CheckboxRoot disabled defaultChecked>
          <CheckboxIndicator />
        </CheckboxRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element()).color;
    const indicator = screen.getByClassName("sui_checkbox_indicator").element();
    expect(getComputedStyle(indicator).color).toBe(expected);
  });
});
