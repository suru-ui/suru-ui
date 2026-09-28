import { createGenerator } from "@unocss/core";
import { describe, expect, test } from "vitest";

import { SUI_UTILITIES_LAYER, presetSuruUI } from "../src/index.js";

const preset = presetSuruUI();

async function generate(utilities: string | string[]): Promise<string> {
  // 準備
  const uno = await createGenerator({ presets: [preset] });

  // 実行
  const { css } = await uno.generate(utilities, { preflights: false });

  return css;
}

describe("presetSuruUI", () => {
  test("プリセット名とレイヤーを提供する", () => {
    // 検証
    expect(preset.name).toBe("@suru-ui/unocss");
    expect(preset.layer).toBe(SUI_UTILITIES_LAYER);
  });
});

describe("色トークン", () => {
  test("スケールの色をユーティリティーとして生成する", async () => {
    // 実行
    const css = await generate([
      "bg-sui-blue-60",
      "text-sui-grey-0",
      "border-sui-red-alpha-20",
      "fill-sui-green-40",
    ]);

    // 検証
    expect(css).toContain(".bg-sui-blue-60{background-color:var(--sui-blue-60);}");
    expect(css).toContain(".text-sui-grey-0{color:var(--sui-grey-0);}");
    expect(css).toContain(".border-sui-red-alpha-20{border-color:var(--sui-red-alpha-20);}");
    expect(css).toContain(".fill-sui-green-40{fill:var(--sui-green-40);}");
  });

  test("意味を持つ色をユーティリティーとして生成する", async () => {
    // 実行
    const css = await generate([
      "bg-sui-canvas-1",
      "text-sui-canvas_text-2",
      "border-sui-border-3",
      "bg-sui-tooltip-canvas",
      "text-sui-tooltip-canvas_text",
      "outline-sui-focusring_color",
      "bg-sui-disabled-naked-canvas",
    ]);

    // 検証
    expect(css).toContain(".bg-sui-canvas-1{background-color:var(--sui-canvas-1);}");
    expect(css).toContain(".text-sui-canvas_text-2{color:var(--sui-canvas_text-2);}");
    expect(css).toContain(".border-sui-border-3{border-color:var(--sui-border-3);}");
    expect(css).toContain(".bg-sui-tooltip-canvas{background-color:var(--sui-tooltip-canvas);}");
    expect(css).toContain(".text-sui-tooltip-canvas_text{color:var(--sui-tooltip-canvas_text);}");
    expect(css).toContain(
      ".outline-sui-focusring_color{outline-color:var(--sui-focusring_color);}",
    );
    expect(css).toContain(
      ".bg-sui-disabled-naked-canvas{background-color:var(--sui-disabled-naked-canvas);}",
    );
  });

  test("配色テンプレートの色をユーティリティーとして生成する", async () => {
    // 実行
    const css = await generate([
      "bg-sui-green-liquid-canvas-strong",
      "text-sui-green-liquid-canvas_text-normal",
      "border-sui-grey-solid-border-subtle",
    ]);

    // 検証
    expect(css).toContain(
      ".bg-sui-green-liquid-canvas-strong{background-color:var(--sui-green-liquid-canvas-strong);}",
    );
    expect(css).toContain(
      ".text-sui-green-liquid-canvas_text-normal{color:var(--sui-green-liquid-canvas_text-normal);}",
    );
    expect(css).toContain(
      ".border-sui-grey-solid-border-subtle{border-color:var(--sui-grey-solid-border-subtle);}",
    );
  });

  test("不透明度を受け付ける", async () => {
    // 実行
    const css = await generate(["bg-sui-blue-60/50", "text-sui-canvas_text-1/25"]);

    // 検証
    expect(css).toContain(
      ".bg-sui-blue-60\\/50{background-color:color-mix(in oklab, var(--sui-blue-60) 50%, transparent);}",
    );
    expect(css).toContain(
      ".text-sui-canvas_text-1\\/25{color:color-mix(in oklab, var(--sui-canvas_text-1) 25%, transparent);}",
    );
  });

  test("存在しない色トークンと範囲外の不透明度を無視する", async () => {
    // 実行
    const css = await generate(["bg-sui-blue-1", "bg-sui-unknown", "bg-sui-blue-60/101"]);

    // 検証
    expect(css).toBe("");
  });
});

describe("余白", () => {
  test("パディングとマージンを --sui-space() で生成する", async () => {
    // 実行
    const css = await generate(["p-sui-2", "mt-sui-3", "px-sui-1"]);

    // 検証
    expect(css).toContain(".p-sui-2{padding:--sui-space(2);}");
    expect(css).toContain(".mt-sui-3{margin-top:--sui-space(3);}");
    expect(css).toContain(".px-sui-1{padding-inline:--sui-space(1);}");
  });

  test("マージンの負の値を生成する", async () => {
    // 実行
    const css = await generate(["-m-sui-2"]);

    // 検証
    expect(css).toContain(".-m-sui-2{margin:--sui-space(-2);}");
  });

  test("パディングの負の値を無視する", async () => {
    // 実行
    const css = await generate(["-p-sui-2"]);

    // 検証
    expect(css).toBe("");
  });

  test("ギャップを --sui-gap() で生成する", async () => {
    // 実行
    const css = await generate(["gap-sui-4", "gap-x-sui-2", "gap-y-sui-1.5"]);

    // 検証
    expect(css).toContain(".gap-sui-4{gap:--sui-gap(4);}");
    expect(css).toContain(".gap-x-sui-2{column-gap:--sui-gap(2);}");
    expect(css).toContain(".gap-y-sui-1\\.5{row-gap:--sui-gap(1.5);}");
  });
});

describe("大きさ", () => {
  test("数値の大きさを --sui-space() で生成する", async () => {
    // 実行
    const css = await generate(["w-sui-8", "h-sui-4", "size-sui-2", "min-w-sui-10"]);

    // 検証
    expect(css).toContain(".w-sui-8{width:--sui-space(8);}");
    expect(css).toContain(".h-sui-4{height:--sui-space(4);}");
    expect(css).toContain(".size-sui-2{width:--sui-space(2);height:--sui-space(2);}");
    expect(css).toContain(".min-w-sui-10{min-width:--sui-space(10);}");
  });

  test("名前付きの大きさをトークンで生成する", async () => {
    // 実行
    const css = await generate(["w-sui-sm", "h-sui-md", "size-sui-lg"]);

    // 検証
    expect(css).toContain(".w-sui-sm{width:var(--sui-size-sm);}");
    expect(css).toContain(".h-sui-md{height:var(--sui-size-md);}");
    expect(css).toContain(".size-sui-lg{width:var(--sui-size-lg);height:var(--sui-size-lg);}");
  });
});

describe("位置", () => {
  test("位置を --sui-space() で生成する", async () => {
    // 実行
    const css = await generate(["top-sui-2", "inset-x-sui-1", "-inset-sui-3"]);

    // 検証
    expect(css).toContain(".top-sui-2{top:--sui-space(2);}");
    expect(css).toContain(".inset-x-sui-1{inset-inline:--sui-space(1);}");
    expect(css).toContain(".-inset-sui-3{inset:--sui-space(-3);}");
  });
});

describe("枠線と角丸", () => {
  test("枠線の幅を --sui-border_width() で生成する", async () => {
    // 実行
    const css = await generate(["border-sui-2", "border-t-sui-1", "outline-sui-3"]);

    // 検証
    expect(css).toContain(".border-sui-2{border-width:--sui-border_width(2);}");
    expect(css).toContain(".border-t-sui-1{border-top-width:--sui-border_width(1);}");
    expect(css).toContain(".outline-sui-3{outline-width:--sui-border_width(3);}");
  });

  test("角丸を --sui-corner_radius() で生成する", async () => {
    // 実行
    const css = await generate(["rounded-sui-2", "rounded-t-sui-1"]);

    // 検証
    expect(css).toContain(".rounded-sui-2{border-radius:--sui-corner_radius(2);}");
    expect(css).toContain(
      ".rounded-t-sui-1{border-top-left-radius:--sui-corner_radius(1);border-top-right-radius:--sui-corner_radius(1);}",
    );
  });

  test("色トークンと幅のユーティリティーを区別する", async () => {
    // 実行
    const css = await generate(["border-sui-blue-60", "border-sui-2"]);

    // 検証
    expect(css).toContain(".border-sui-blue-60{border-color:var(--sui-blue-60);}");
    expect(css).toContain(".border-sui-2{border-width:--sui-border_width(2);}");
  });
});

describe("フォント", () => {
  test("フォントファミリーをトークンで生成する", async () => {
    // 実行
    const css = await generate(["font-sui-sans", "font-sui-mono"]);

    // 検証
    expect(css).toContain(".font-sui-sans{font-family:var(--sui-font-sans);}");
    expect(css).toContain(".font-sui-mono{font-family:var(--sui-font-mono);}");
  });

  test("存在しないフォントファミリーを無視する", async () => {
    // 実行
    const css = await generate(["font-sui-serif"]);

    // 検証
    expect(css).toBe("");
  });

  test("文字スタイルをトークンで生成する", async () => {
    // 実行
    const css = await generate(["text-sui-oln-md-m"]);

    // 検証
    expect(css).toContain(
      ".text-sui-oln-md-m{font-size:var(--sui-text-oln-md-m-font_size);font-weight:var(--sui-text-oln-md-m-font_weight);letter-spacing:var(--sui-text-oln-md-m-letter_spacing);line-height:var(--sui-text-oln-md-m-line_height);}",
    );
  });

  test("存在しない文字スタイルを無視する", async () => {
    // 実行
    const css = await generate(["text-sui-dns-md-m", "text-sui-oln-5xl-n"]);

    // 検証
    expect(css).toBe("");
  });
});

describe("CSS カスケードレイヤー", () => {
  test("sui.utilities レイヤーに出力する", async () => {
    // 準備
    const uno = await createGenerator({
      outputToCssLayers: true,
      presets: [preset],
    });

    // 実行
    const { css } = await uno.generate(["p-sui-2"], { preflights: false });

    // 検証
    expect(css).toContain(`@layer ${SUI_UTILITIES_LAYER}`);
  });
});
