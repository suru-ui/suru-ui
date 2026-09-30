import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { useToggleButtonContext } from "../../../src/toggle-button/toggle-button.context.js";
import { ToggleButtonRoot } from "../../../src/toggle-button/toggle-button.root.jsx";
import "../_locators.js";

describe("ToggleButtonRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ToggleButtonRoot />);

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.classList.contains("sui_button")).toBe(true);
    expect(button.classList.contains("sui_button-size_md")).toBe(true);
    expect(button.classList.contains("sui_button-color_grey")).toBe(true);
    expect(button.classList.contains("sui_button-radius_md")).toBe(true);
    expect(button.classList.contains("sui_button-variant_liquid")).toBe(true);
    expect(button.classList.contains("sui_button-item")).toBe(false);
    expect(button.classList.contains("sui_button-squared")).toBe(false);
    expect(button.classList.contains("sui_button-outlined")).toBe(false);
  });

  test("押下状態では配色と外観を強調する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ToggleButtonRoot color="blue" defaultPressed />);

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.classList.contains("sui_button-color_blue")).toBe(true);
    expect(button.classList.contains("sui_button-variant_solid")).toBe(true);
  });

  test("押下状態でないときは配色を grey に固定する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ToggleButtonRoot color="blue" />);

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.classList.contains("sui_button-color_grey")).toBe(true);
    expect(button.classList.contains("sui_button-color_blue")).toBe(false);
  });

  test("指定した修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ToggleButtonRoot outlined radius="full" size="lg" squared variant="naked" />,
    );

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.classList.contains("sui_button-size_lg")).toBe(true);
    expect(button.classList.contains("sui_button-radius_full")).toBe(true);
    expect(button.classList.contains("sui_button-variant_naked")).toBe(true);
    expect(button.classList.contains("sui_button-outlined")).toBe(true);
    expect(button.classList.contains("sui_button-squared")).toBe(true);
  });

  test("スコープの始点になる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ToggleButtonRoot />);

    // 検証
    expect(screen.getByClassName("sui_button").element().getAttribute("data-scope")).toBe("");
  });

  test("無効時は状態クラスと disabled 属性を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ToggleButtonRoot disabled />);

    // 検証
    const button = screen.getByClassName("sui_button").element() as HTMLButtonElement;
    expect(button.classList.contains("sui_button-disabled")).toBe(true);
    expect(button.disabled).toBe(true);
  });

  test("保留中は無効の状態クラスを付けず無効化しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ToggleButtonRoot pending />);

    // 検証
    const button = screen.getByClassName("sui_button").element() as HTMLButtonElement;
    expect(button.classList.contains("sui_button-pending")).toBe(true);
    expect(button.classList.contains("sui_button-disabled")).toBe(false);
    expect(button.disabled).toBe(false);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ToggleButtonRoot nativeButton={false} render={<a aria-label="切り替え" href="/toggle" />}>
        切り替え
      </ToggleButtonRoot>,
    );

    // 検証
    const link = screen.getByClassName("sui_button").element();
    expect(link.tagName).toBe("A");
    expect(link.classList.contains("sui_button")).toBe(true);
  });

  test("className と style の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ToggleButtonRoot
        defaultPressed
        size="lg"
        className={(state) => `probe-pressed_${String(state.pressed)} probe-size_${state.size}`}
        style={(state) => ({ outlineWidth: state.pressed ? "3px" : "0px" })}
      />,
    );

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.classList.contains("probe-pressed_true")).toBe(true);
    expect(button.classList.contains("probe-size_lg")).toBe(true);
    expect(getComputedStyle(button).outlineWidth).toBe("3px");
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ToggleButtonRoot
        defaultPressed
        outlined
        squared
        color="blue"
        radius="full"
        size="lg"
        variant="naked"
        render={(props, state) => (
          <button
            {...props}
            data-probe={[
              state.size,
              state.color,
              state.radius,
              state.variant,
              String(state.outlined),
              String(state.pending),
              String(state.pressed),
              String(state.squared),
            ].join("/")}
          />
        )}
      />,
    );

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("data-probe")).toBe("lg/blue/full/naked/true/false/true/true");
  });

  test("コンテキストへ保留状態を提供する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useToggleButtonContext();
      return <span>{[String(ctx.pending), ctx.size, ctx.color].join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <ToggleButtonRoot color="blue" pending size="lg">
        <Probe />
      </ToggleButtonRoot>,
    );

    // 検証
    expect(screen.getByText("true,lg,blue").query()?.textContent).toBe("true,lg,blue");
  });
});
