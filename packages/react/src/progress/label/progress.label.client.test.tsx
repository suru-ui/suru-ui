import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../progress.parts.js";
import { ProgressRoot } from "../root/progress.root.jsx";
import { ProgressLabel } from "./progress.label.jsx";
import "../../../tests/src/_locators.js";

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
