import "@suru-ui/theme/suru.css";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/label/label.parts.js";
import { LabelRoot } from "../../../src/label/root/label.root.jsx";
import "../_locators.js";

describe("LabelRoot の配置", () => {
  test("外部の余白を持たずインライン要素として並ぶ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<LabelRoot id="label">ラベル</LabelRoot>);

    // 検証
    const style = getComputedStyle(screen.container.querySelector<HTMLElement>("#label")!);
    expect(style.display).toBe("inline-block");
    expect(style.marginTop).toBe("0px");
    expect(style.marginInlineStart).toBe("0px");
    expect(style.paddingBlockStart).toBe("0px");
  });

  test("大きさごとの活字を適用する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <LabelRoot id="sm" size="sm">
          ラベル
        </LabelRoot>
        <LabelRoot id="md" size="md">
          ラベル
        </LabelRoot>
        <LabelRoot id="lg" size="lg">
          ラベル
        </LabelRoot>
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm")!);
    expect(sm.fontSize).toBe("12px");
    expect(sm.fontWeight).toBe("700");
    expect(sm.fontFamily).toContain("Noto Sans JP");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md")!);
    expect(md.fontSize).toBe("14px");
    expect(md.fontWeight).toBe("700");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg")!);
    expect(lg.fontSize).toBe("17px");
    expect(lg.fontWeight).toBe("700");
  });

  test("配色を文字へ適用する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-blue-naked-canvas_text-normal)" }}>色の基準</span>
        <LabelRoot id="blue" color="blue">
          ラベル
        </LabelRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("色の基準").element());
    const root = getComputedStyle(screen.container.querySelector<HTMLElement>("#blue")!);
    expect(root.color).toBe(expected.color);
  });

  test("grey では基準の文字色を使う", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-canvas_text-1)" }}>色の基準</span>
        <LabelRoot id="grey">ラベル</LabelRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("色の基準").element());
    const root = getComputedStyle(screen.container.querySelector<HTMLElement>("#grey")!);
    expect(root.color).toBe(expected.color);
  });

  test("無効なときは無効色と禁止カーソルにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-disabled-naked-canvas_text)" }}>色の基準</span>
        <LabelRoot id="disabled" disabled>
          ラベル
        </LabelRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("色の基準").element());
    const root = getComputedStyle(screen.container.querySelector<HTMLElement>("#disabled")!);
    expect(root.color).toBe(expected.color);
    expect(root.cursor).toBe("not-allowed");
  });

  test("長い内容を幅に合わせて折り返す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div style={{ width: "80px" }}>
        <LabelRoot id="long">
          とても長いラベルテキストが折り返されて表示されることを確認します
        </LabelRoot>
      </div>,
    );

    // 検証
    const root = screen.container.querySelector<HTMLElement>("#long")!;
    expect(getComputedStyle(root).overflowWrap).toBe("break-word");
    expect(root.getBoundingClientRect().width).toBeLessThanOrEqual(80);
    expect(root.getBoundingClientRect().height).toBeGreaterThan(20);
  });

  test("公開変数で活字の大きさを上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<LabelRoot id="custom">ラベル</LabelRoot>);
    const root = screen.container.querySelector<HTMLElement>("#custom")!;
    root.style.setProperty("--sui_label-font_size", "32px");

    // 検証
    expect(getComputedStyle(root).fontSize).toBe("32px");
  });
});
