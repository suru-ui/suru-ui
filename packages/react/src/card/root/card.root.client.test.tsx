import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { CardRoot } from "./card.root.jsx";
import "../../../tests/src/_locators.js";

describe("CardRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardRoot />);

    // 検証
    const root = screen.getByClassName("sui_card").element();
    expect(root.classList.contains("sui_card")).toBe(true);
    expect(root.classList.contains("sui_card-size_md")).toBe(true);
    expect(root.classList.contains("sui_card-radius_md")).toBe(true);
    expect(root.classList.contains("sui_card-outlined")).toBe(false);
  });

  test("指定した修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardRoot size="lg" radius="none" outlined={false} />);

    // 検証
    const root = screen.getByClassName("sui_card").element();
    expect(root.classList.contains("sui_card-size_lg")).toBe(true);
    expect(root.classList.contains("sui_card-radius_none")).toBe(true);
    expect(root.classList.contains("sui_card-outlined")).toBe(false);
  });

  test("角丸は大きさに追従する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <CardRoot id="followed" size="lg" />
        <CardRoot id="prioritized" size="lg" radius="sm" />
      </>,
    );

    // 検証
    const followed = screen.container.querySelector<HTMLElement>("#followed")!;
    const prioritized = screen.container.querySelector<HTMLElement>("#prioritized")!;
    expect(followed.classList.contains("sui_card-radius_lg")).toBe(true);
    expect(prioritized.classList.contains("sui_card-radius_sm")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_card").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_card")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardRoot render={<section />} />);

    // 検証
    expect(screen.getByClassName("sui_card").element().tagName).toBe("SECTION");
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot
        size="lg"
        radius="sm"
        render={(props, state) => (
          <section {...props} data-probe={`${state.size}/${state.radius}/${state.outlined}`} />
        )}
        outlined
      />,
    );

    // 検証
    const root = screen.getByClassName("sui_card").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-probe")).toBe("lg/sm/true");
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardRoot />);

    // 検証
    expect(screen.getByClassName("sui_card").element().getAttribute("data-scope")).toBe("");
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot>
        <span>本文</span>
      </CardRoot>,
    );

    // 検証
    expect(screen.getByText("本文").query()).not.toBe(null);
  });
});
