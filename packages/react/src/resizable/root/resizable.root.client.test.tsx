import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../resizable.parts.js";
import { ResizableRoot } from "./resizable.root.jsx";
import "../../../tests/src/_locators.js";

describe("ResizableRoot", () => {
  test("既定の向きの修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ResizableRoot />);

    // 検証
    const root = screen.getByClassName("sui_resizable").element();
    expect(root.classList.contains("sui_resizable")).toBe(true);
    expect(root.classList.contains("sui_resizable-orientation_horizontal")).toBe(true);
  });

  test("指定した向きの修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ResizableRoot orientation="vertical" />);

    // 検証
    const root = screen.getByClassName("sui_resizable").element();
    expect(root.classList.contains("sui_resizable-orientation_vertical")).toBe(true);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ResizableRoot />);

    // 検証
    expect(screen.getByClassName("sui_resizable").element().getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ResizableRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_resizable").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_resizable")).toBe(true);
  });

  test("className と style を状態に応じて解決する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ResizableRoot
        style={(state) => ({ opacity: state.orientation === "horizontal" ? "0.5" : "1" })}
        className={(state) => `custom-${state.orientation}`}
      />,
    );

    // 検証
    const root = screen.getByClassName("sui_resizable").element();
    expect(root.classList.contains("custom-horizontal")).toBe(true);
    expect(root.style.opacity).toBe("0.5");
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ResizableRoot
        render={(props, state) => {
          const {
            orientation: _orientation,
            resizeTargetMinimumSize: _resizeTargetMinimumSize,
            ...rest
          } = props as Record<string, unknown>;
          return <section {...rest} data-probe={state.orientation} />;
        }}
        orientation="vertical"
      />,
    );

    // 検証
    const root = screen.getByClassName("sui_resizable").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-probe")).toBe("vertical");
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ResizableRoot>
        <span>内容</span>
      </ResizableRoot>,
    );

    // 検証
    expect(screen.getByText("内容").query()).not.toBe(null);
  });
});
