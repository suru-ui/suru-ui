import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ButtonRoot } from "../../../src/button/root/button.root.jsx";
import "../_locators.js";

describe("ButtonRoot", () => {
  test("指定した大きさと配色と角丸と外観のクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ButtonRoot color="blue" size="lg" variant="naked" />);

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.classList.contains("sui_button-size_lg")).toBe(true);
    expect(button.classList.contains("sui_button-color_blue")).toBe(true);
    expect(button.classList.contains("sui_button-radius_md")).toBe(true);
    expect(button.classList.contains("sui_button-variant_naked")).toBe(true);
  });

  test("角丸を指定しないときは大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <ButtonRoot id="sm" size="sm" />
        <ButtonRoot id="full" radius="full" size="lg" />
      </>,
    );

    // 検証
    const sm = screen.container.querySelector<HTMLElement>("#sm")!;
    expect(sm.classList.contains("sui_button-radius_sm")).toBe(true);
    const full = screen.container.querySelector<HTMLElement>("#full")!;
    expect(full.classList.contains("sui_button-radius_full")).toBe(true);
  });

  test("修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ButtonRoot item muted outlined squared />);

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.classList.contains("sui_button-item")).toBe(true);
    expect(button.classList.contains("sui_button-muted")).toBe(true);
    expect(button.classList.contains("sui_button-outlined")).toBe(true);
    expect(button.classList.contains("sui_button-squared")).toBe(true);
  });

  test("スコープの始点になる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ButtonRoot />);

    // 検証
    expect(screen.getByClassName("sui_button").element().getAttribute("data-scope")).toBe("");
  });

  test("無効時は無効の状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ButtonRoot disabled />);

    // 検証
    expect(
      screen.getByClassName("sui_button").element().classList.contains("sui_button-disabled"),
    ).toBe(true);
  });

  test("保留中は pending の状態クラスだけを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ButtonRoot pending />);

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.classList.contains("sui_button-pending")).toBe(true);
    expect(button.classList.contains("sui_button-disabled")).toBe(false);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ButtonRoot nativeButton={false} render={<a aria-label="ドキュメント" href="/docs" />}>
        ドキュメント
      </ButtonRoot>,
    );

    // 検証
    const link = screen.getByClassName("sui_button").element();
    expect(link.tagName).toBe("A");
    expect(link.classList.contains("sui_button")).toBe(true);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ButtonRoot
        item
        outlined
        pending
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
              String(state.item),
              String(state.muted),
              String(state.outlined),
              String(state.pending),
              String(state.squared),
              String(state.disabled),
            ].join("/")}
          />
        )}
      />,
    );

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("data-probe")).toBe(
      "lg/blue/full/naked/true/false/true/true/true/true",
    );
  });

  test("className の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ButtonRoot
        color="blue"
        pending
        size="lg"
        className={(state) => `probe-pending_${String(state.pending)} probe-size_${state.size}`}
      />,
    );

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.classList.contains("probe-pending_true")).toBe(true);
    expect(button.classList.contains("probe-size_lg")).toBe(true);
  });
});
