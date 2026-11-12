import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { PaginationRoot } from "../root/pagination.root.jsx";
import { PaginationNextButton } from "./pagination.next-button.jsx";
import "../../../tests/src/_locators.js";

describe("PaginationNextButton", () => {
  test("次のページへ移動するボタンを表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PaginationRoot totalPages={5} defaultPage={2}>
        <PaginationNextButton />
      </PaginationRoot>,
    );

    // 検証。
    const button = screen.getByRole("button", { name: "次のページへ" }).element();
    expect(button.tagName).toBe("BUTTON");
    expect(screen.getByClassName("sui_pagination_next").query()).not.toBe(null);
    expect(button.querySelector("svg")).not.toBe(null);
  });

  test("最後のページでは無効にする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PaginationRoot totalPages={5} defaultPage={5}>
        <PaginationNextButton />
      </PaginationRoot>,
    );

    // 検証。
    expect(
      screen
        .getByRole("button", { name: "次のページへ" })
        .element()
        .classList.contains("sui_button-disabled"),
    ).toBe(true);
  });

  test("総ページ数が小数のときも最後のページでは無効にする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PaginationRoot totalPages={5.9} defaultPage={5}>
        <PaginationNextButton />
      </PaginationRoot>,
    );

    // 検証。
    expect(
      screen
        .getByRole("button", { name: "次のページへ" })
        .element()
        .classList.contains("sui_button-disabled"),
    ).toBe(true);
  });

  test("無効を指定できる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PaginationRoot totalPages={5} defaultPage={3}>
        <PaginationNextButton disabled />
      </PaginationRoot>,
    );

    // 検証。
    expect(
      screen
        .getByRole("button", { name: "次のページへ" })
        .element()
        .classList.contains("sui_button-disabled"),
    ).toBe(true);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PaginationRoot size="lg" color="blue" radius="full" totalPages={5} defaultPage={5}>
        <PaginationNextButton
          render={(props, state) => (
            <button
              {...props}
              data-probe={`${state.size}/${state.color}/${state.radius}/${state.page}/${state.totalPages}/${String(state.disabled)}`}
            />
          )}
        />
      </PaginationRoot>,
    );

    // 検証。
    expect(
      screen.getByRole("button", { name: "次のページへ" }).element().getAttribute("data-probe"),
    ).toBe("lg/blue/full/5/5/true");
  });
});
