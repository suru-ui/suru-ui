import "@suru-ui/theme/suru.css";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { PaginationPreviousButton } from "../../../src/pagination/previous-button/pagination.previous-button.jsx";
import { PaginationRoot } from "../../../src/pagination/root/pagination.root.jsx";
import "../_locators.js";

describe("PaginationPreviousButton", () => {
  test("前のページへ移動するボタンを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot defaultPage={2} totalPages={5}>
        <PaginationPreviousButton />
      </PaginationRoot>,
    );

    // 検証
    const button = screen.getByRole("button", { name: "前のページへ" }).element();
    expect(button.tagName).toBe("BUTTON");
    expect(screen.getByClassName("sui_pagination_previous").query()).not.toBe(null);
    expect(button.querySelector("svg")).not.toBe(null);
  });

  test("最初のページでは無効にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={5}>
        <PaginationPreviousButton />
      </PaginationRoot>,
    );

    // 検証
    expect(
      screen
        .getByRole("button", { name: "前のページへ" })
        .element()
        .classList.contains("sui_button-disabled"),
    ).toBe(true);
  });

  test("2ページ目では有効にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot defaultPage={2} totalPages={5}>
        <PaginationPreviousButton />
      </PaginationRoot>,
    );

    // 検証
    expect(
      screen
        .getByRole("button", { name: "前のページへ" })
        .element()
        .classList.contains("sui_button-disabled"),
    ).toBe(false);
  });

  test("無効を指定できる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot defaultPage={3} totalPages={5}>
        <PaginationPreviousButton disabled />
      </PaginationRoot>,
    );

    // 検証
    expect(
      screen
        .getByRole("button", { name: "前のページへ" })
        .element()
        .classList.contains("sui_button-disabled"),
    ).toBe(true);
  });

  test("配色と角丸をルートから引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot color="blue" radius="full" totalPages={5}>
        <PaginationPreviousButton />
      </PaginationRoot>,
    );

    // 検証
    const button = screen.getByRole("button", { name: "前のページへ" }).element();
    expect(button.classList.contains("sui_button-color_blue")).toBe(true);
    expect(button.classList.contains("sui_button-radius_full")).toBe(true);
  });

  test("利用者のラベルを優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={5}>
        <PaginationPreviousButton aria-label="戻る" />
      </PaginationRoot>,
    );

    // 検証
    expect(screen.getByRole("button", { name: "戻る" }).query()).not.toBe(null);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot color="blue" defaultPage={3} radius="full" size="lg" totalPages={5}>
        <PaginationPreviousButton
          render={(props, state) => (
            <button
              {...props}
              data-probe={`${state.size}/${state.color}/${state.radius}/${state.page}/${state.totalPages}/${String(state.disabled)}`}
            />
          )}
        />
      </PaginationRoot>,
    );

    // 検証
    expect(
      screen.getByRole("button", { name: "前のページへ" }).element().getAttribute("data-probe"),
    ).toBe("lg/blue/full/3/5/false");
  });
});
