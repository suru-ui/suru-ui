import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/progress/progress.parts.js";
import { ProgressRoot } from "../../../src/progress/root/progress.root.jsx";
import { ProgressValue } from "../../../src/progress/value/progress.value.jsx";
import "../_locators.js";

describe("ProgressValue", () => {
  test("既定の書式で現在値を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ProgressRoot value={25}>
        <ProgressValue />
      </ProgressRoot>,
    );

    // 検証
    const value = screen.getByText("25%").element();
    expect(value.tagName).toBe("SPAN");
    expect(value.textContent).toBe("25%");
    expect(value.classList.contains("sui_progress_value")).toBe(true);
  });

  test("書式化された値と現在値を描画関数へ渡す", async ({ expect }) => {
    // 準備
    let receivedFormattedValue: unknown = null;
    let receivedValue: unknown = null;

    // 実行
    await render(
      <ProgressRoot value={36.5} min={0} max={50}>
        <ProgressValue>
          {(formattedValue, value) => {
            receivedFormattedValue = formattedValue;
            receivedValue = value;
            return null;
          }}
        </ProgressValue>
      </ProgressRoot>,
    );

    // 検証
    expect(receivedFormattedValue).toBe("73%");
    expect(receivedValue).toBe(36.5);
  });

  test("不確定状態では indeterminate と null を描画関数へ渡す", async ({ expect }) => {
    // 準備
    let receivedFormattedValue: unknown = null;
    let receivedValue: unknown = null;

    // 実行
    await render(
      <ProgressRoot value={null}>
        <ProgressValue>
          {(formattedValue, value) => {
            receivedFormattedValue = formattedValue;
            receivedValue = value;
            return null;
          }}
        </ProgressValue>
      </ProgressRoot>,
    );

    // 検証
    expect(receivedFormattedValue).toBe("indeterminate");
    expect(receivedValue).toBe(null);
  });

  test("固定内容をそのまま表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ProgressRoot value={25}>
        <ProgressValue>
          <span>固定表示</span>
        </ProgressValue>
      </ProgressRoot>,
    );

    // 検証
    expect(screen.getByText("固定表示").element().textContent).toBe("固定表示");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ProgressRoot value={25}>
        <ProgressValue className="custom" />
      </ProgressRoot>,
    );

    // 検証
    const value = screen.getByText("25%").element();
    expect(value.classList.contains("custom")).toBe(true);
    expect(value.classList.contains("sui_progress_value")).toBe(true);
  });
});
