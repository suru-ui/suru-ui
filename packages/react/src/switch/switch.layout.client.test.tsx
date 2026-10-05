import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./switch.parts.js";
import { Switch } from "./switch.jsx";
import "../../tests/src/_locators.js";

describe("Switch の配置", () => {
  test("公開パーツをすべて描画して余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Switch defaultChecked />);

    // 検証
    expect(screen.getByClassName("sui_switch_thumb").query()).not.toBe(null);
    for (const element of screen.container.querySelectorAll<HTMLElement>(
      ".sui_switch, .sui_switch *",
    )) {
      const style = getComputedStyle(element);
      expect(style.marginTop).toBe("0px");
      expect(style.marginInlineStart).toBe("0px");
    }
  });

  test("大きさに応じた幅と高さを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          style={{
            width:
              "calc(var(--sui-text-oln-sm-m-font_size) * var(--sui-text-oln-sm-m-line_height) * 1.2)",
            display: "block",
          }}
          data-testid="sm-reference"
        />
        <span
          style={{
            width:
              "calc(var(--sui-text-oln-md-m-font_size) * var(--sui-text-oln-md-m-line_height) * 1.2)",
            display: "block",
          }}
          data-testid="md-reference"
        />
        <span
          style={{
            width:
              "calc(var(--sui-text-oln-lg-m-font_size) * var(--sui-text-oln-lg-m-line_height) * 1.2)",
            display: "block",
          }}
          data-testid="lg-reference"
        />
        <Switch size="sm" data-testid="sm" />
        <Switch size="md" data-testid="md" />
        <Switch size="lg" data-testid="lg" />
      </>,
    );

    // 検証
    const sm = screen.getByTestId("sm").element().getBoundingClientRect();
    const smReference = screen.getByTestId("sm-reference").element().getBoundingClientRect().width;
    expect(sm.height).toBeCloseTo(smReference, 1);
    expect(sm.width).toBeCloseTo(smReference * 1.75, 1);
    const md = screen.getByTestId("md").element().getBoundingClientRect();
    const mdReference = screen.getByTestId("md-reference").element().getBoundingClientRect().width;
    expect(md.height).toBeCloseTo(mdReference, 1);
    expect(md.width).toBeCloseTo(mdReference * 1.75, 1);
    const lg = screen.getByTestId("lg").element().getBoundingClientRect();
    const lgReference = screen.getByTestId("lg-reference").element().getBoundingClientRect().width;
    expect(lg.height).toBeCloseTo(lgReference, 1);
    expect(lg.width).toBeCloseTo(lgReference * 1.75, 1);
  });

  test("つまみを中央に配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Switch data-testid="root" />);

    // 検証
    const rootElement = screen.getByTestId("root").element();
    const root = rootElement.getBoundingClientRect();
    const padding = Number.parseFloat(getComputedStyle(rootElement).paddingTop);
    const thumb = rootElement
      .querySelector<HTMLElement>(".sui_switch_thumb")!
      .getBoundingClientRect();
    expect(thumb.width).toBeCloseTo(root.height - padding * 2, 1);
    expect(thumb.height).toBeCloseTo(root.height - padding * 2, 1);
    expect(thumb.top + thumb.height / 2).toBeCloseTo(root.top + root.height / 2, 1);
    expect(thumb.left).toBeCloseTo(root.left + padding, 1);
  });

  test("チェック時はつまみを右端へ移動する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Switch data-testid="unchecked" />
        <Switch defaultChecked data-testid="checked" />
      </>,
    );

    // 検証
    const uncheckedElement = screen.getByTestId("unchecked").element();
    const padding = Number.parseFloat(getComputedStyle(uncheckedElement).paddingTop);
    const uncheckedRoot = uncheckedElement.getBoundingClientRect();
    const uncheckedThumb = uncheckedElement
      .querySelector<HTMLElement>(".sui_switch_thumb")!
      .getBoundingClientRect();
    expect(uncheckedThumb.left).toBeCloseTo(uncheckedRoot.left + padding, 1);
    const checkedRoot = screen.getByTestId("checked").element().getBoundingClientRect();
    const checkedThumb = screen
      .getByTestId("checked")
      .element()
      .querySelector<HTMLElement>(".sui_switch_thumb")!
      .getBoundingClientRect();
    expect(checkedThumb.right).toBeCloseTo(checkedRoot.right - padding, 1);
  });

  test("角丸 full は高さの半分にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Switch size="lg" radius="full" data-testid="full" />);

    // 検証
    const root = screen.getByTestId("full").element();
    expect(Number.parseFloat(getComputedStyle(root).borderTopLeftRadius)).toBeCloseTo(
      root.getBoundingClientRect().height / 2,
      1,
    );
  });

  test("枠線を表示しても大きさを変えない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ outline: "1px solid transparent" }} data-testid="reference" />
        <Switch data-testid="plain" />
        <Switch outlined data-testid="outlined" />
      </>,
    );

    // 検証
    const plain = screen.getByTestId("plain").element();
    const outlined = screen.getByTestId("outlined").element();
    expect(getComputedStyle(plain, "::after").outlineWidth).toBe("0px");
    expect(getComputedStyle(outlined, "::after").outlineStyle).toBe("solid");
    expect(Number.parseFloat(getComputedStyle(outlined, "::after").outlineWidth)).toBe(
      Number.parseFloat(getComputedStyle(screen.getByTestId("reference").element()).outlineWidth),
    );
    expect(outlined.getBoundingClientRect().width).toBeCloseTo(
      plain.getBoundingClientRect().width,
      1,
    );
  });

  test("フォーカス時に焦点リングを表示する", async ({ expect }) => {
    // 準備
    const screen = await render(<Switch />);
    const root = screen.getByClassName("sui_switch").element() as HTMLElement;

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
        <Switch color="blue" defaultChecked />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element()).backgroundColor;
    expect(getComputedStyle(screen.getByClassName("sui_switch").element()).backgroundColor).toBe(
      expected,
    );
  });

  test("チェック状態でつまみの配色を切り替える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ backgroundColor: "var(--sui-canvas_text-1)" }}>未チェック</span>
        <span style={{ backgroundColor: "var(--sui-canvas-1)" }}>チェック済み</span>
        <Switch data-testid="unchecked" />
        <Switch defaultChecked data-testid="checked" />
      </>,
    );

    // 検証
    const unchecked = screen
      .getByTestId("unchecked")
      .element()
      .querySelector<HTMLElement>(".sui_switch_thumb")!;
    expect(getComputedStyle(unchecked).backgroundColor).toBe(
      getComputedStyle(screen.getByText("未チェック").element()).backgroundColor,
    );
    const checked = screen
      .getByTestId("checked")
      .element()
      .querySelector<HTMLElement>(".sui_switch_thumb")!;
    expect(getComputedStyle(checked).backgroundColor).toBe(
      getComputedStyle(screen.getByText("チェック済み").element()).backgroundColor,
    );
  });

  test("未チェックの hover で配色を変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <span style={{ display: "block", backgroundColor: "var(--sui-grey-liquid-canvas-subtle)" }}>
          基準
        </span>
        <Switch />
      </>,
    );
    const root = screen.getByClassName("sui_switch");

    // 実行
    await root.hover();

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element()).backgroundColor;
    await expect.poll(() => getComputedStyle(root.element()).backgroundColor).toBe(expected);
  });

  test("チェック済みの hover で配色を変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <span style={{ display: "block", backgroundColor: "var(--sui-blue-solid-canvas-subtle)" }}>
          基準
        </span>
        <Switch color="blue" defaultChecked />
      </>,
    );
    const root = screen.getByClassName("sui_switch");

    // 実行
    await root.hover();

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element()).backgroundColor;
    await expect.poll(() => getComputedStyle(root.element()).backgroundColor).toBe(expected);
  });

  test("無効時は操作不能な配色にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ backgroundColor: "var(--sui-disabled-liquid-canvas)" }}>
          無効な未チェック
        </span>
        <span style={{ backgroundColor: "var(--sui-disabled-solid-canvas)" }}>
          無効なチェック済み
        </span>
        <Switch disabled data-testid="disabled" />
        <Switch disabled defaultChecked data-testid="disabled-checked" />
      </>,
    );

    // 検証
    const unchecked = getComputedStyle(screen.getByTestId("disabled").element());
    expect(unchecked.backgroundColor).toBe(
      getComputedStyle(screen.getByText("無効な未チェック").element()).backgroundColor,
    );
    expect(unchecked.cursor).toBe("not-allowed");
    const checked = getComputedStyle(screen.getByTestId("disabled-checked").element());
    expect(checked.backgroundColor).toBe(
      getComputedStyle(screen.getByText("無効なチェック済み").element()).backgroundColor,
    );
  });

  test("無効時は hover で配色を変えない", async ({ expect }) => {
    // 準備
    const screen = await render(<Switch disabled data-testid="disabled" />);
    const root = screen.getByTestId("disabled");
    const before = getComputedStyle(root.element()).backgroundColor;

    // 実行
    await root.hover();

    // 検証
    expect(getComputedStyle(root.element()).backgroundColor).toBe(before);
  });

  test("無効かつ outlined は variant に対応する枠線色にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          style={{ outline: "1px solid var(--sui-disabled-naked-border)" }}
          data-testid="naked-reference"
        />
        <span
          style={{ outline: "1px solid var(--sui-disabled-liquid-border)" }}
          data-testid="liquid-reference"
        />
        <Switch variant="naked" disabled outlined data-testid="naked" />
        <Switch variant="liquid" disabled outlined data-testid="liquid" />
      </>,
    );

    // 検証
    const naked = getComputedStyle(screen.getByTestId("naked").element(), "::after");
    expect(naked.outlineColor).toBe(
      getComputedStyle(screen.getByTestId("naked-reference").element()).outlineColor,
    );
    expect(Number.parseFloat(naked.outlineWidth)).toBeGreaterThan(0);
    const liquid = getComputedStyle(screen.getByTestId("liquid").element(), "::after");
    expect(liquid.outlineColor).toBe(
      getComputedStyle(screen.getByTestId("liquid-reference").element()).outlineColor,
    );
    expect(Number.parseFloat(liquid.outlineWidth)).toBeGreaterThan(0);
  });

  test("無効かつチェック済みの outlined は無効用の枠線色にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          style={{ outline: "1px solid var(--sui-disabled-solid-border)" }}
          data-testid="reference"
        />
        <Switch color="blue" disabled outlined defaultChecked data-testid="outlined" />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByTestId("reference").element()).outlineColor;
    const root = getComputedStyle(screen.getByTestId("outlined").element(), "::after");
    expect(root.outlineColor).toBe(expected);
    expect(Number.parseFloat(root.outlineWidth)).toBeGreaterThan(0);
  });

  test("無効かつ outlined でないチェック済みは枠線を表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Switch disabled defaultChecked data-testid="checked" />);

    // 検証
    expect(getComputedStyle(screen.getByTestId("checked").element(), "::after").outlineWidth).toBe(
      "0px",
    );
  });
});
