import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/progress/progress.parts.js";
import { ProgressLabel } from "../../../src/progress/progress.label.jsx";
import { ProgressRoot } from "../../../src/progress/progress.root.jsx";
import "../_locators.js";

describe("ProgressLabel", () => {
  test("ラベルを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ProgressRoot value={25}>
        <ProgressLabel>読み込み中</ProgressLabel>
      </ProgressRoot>,
    );

    // 検証
    const label = screen.getByText("読み込み中").element();
    expect(label.tagName).toBe("SPAN");
    expect(label.textContent).toBe("読み込み中");
    expect(label.classList.contains("sui_progress_label")).toBe(true);
  });

  test("ルートから参照される識別子を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ProgressRoot value={25}>
        <ProgressLabel>読み込み中</ProgressLabel>
      </ProgressRoot>,
    );

    // 検証
    const label = screen.getByText("読み込み中").element();
    expect(label.id).not.toBe("");
    expect(screen.getByClassName("sui_progress").element().getAttribute("aria-labelledby")).toBe(
      label.id,
    );
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ProgressRoot value={25}>
        <ProgressLabel className="custom">読み込み中</ProgressLabel>
      </ProgressRoot>,
    );

    // 検証
    const label = screen.getByText("読み込み中").element();
    expect(label.classList.contains("custom")).toBe(true);
    expect(label.classList.contains("sui_progress_label")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ProgressRoot value={25}>
        <ProgressLabel render={<strong />}>読み込み中</ProgressLabel>
      </ProgressRoot>,
    );

    // 検証
    expect(screen.getByText("読み込み中").element().tagName).toBe("STRONG");
  });
});
