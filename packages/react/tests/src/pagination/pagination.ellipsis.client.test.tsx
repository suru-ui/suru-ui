import "@suru-ui/theme/suru.css";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { PaginationEllipsis } from "../../../src/pagination/pagination.ellipsis.jsx";
import { PaginationRoot } from "../../../src/pagination/pagination.root.jsx";
import "../_locators.js";

describe("PaginationEllipsis", () => {
  test("飛び先の範囲を示すボタンを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={10}>
        <PaginationEllipsis end={5} start={2} />
      </PaginationRoot>,
    );

    // 検証
    const button = screen.getByRole("button", { name: "2〜5ページへ移動" }).element();
    expect(button.classList.contains("sui_pagination_ellipsis")).toBe(true);
    expect(button.querySelector("svg")).not.toBe(null);
  });

  test("開始と終了が逆のときは入れ替えて示す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={10}>
        <PaginationEllipsis end={2} start={5} />
      </PaginationRoot>,
    );

    // 検証
    expect(screen.getByRole("button", { name: "2〜5ページへ移動" }).query()).not.toBe(null);
  });

  test("範囲を省略したときは開始ページを既定にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={10}>
        <PaginationEllipsis />
      </PaginationRoot>,
    );

    // 検証
    expect(screen.getByRole("button", { name: "2〜2ページへ移動" }).query()).not.toBe(null);
  });

  test("無効なときは状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot disabled totalPages={10}>
        <PaginationEllipsis end={5} start={2} />
      </PaginationRoot>,
    );

    // 検証
    expect(
      screen
        .getByRole("button", { name: "2〜5ページへ移動" })
        .element()
        .classList.contains("sui_button-disabled"),
    ).toBe(true);
    expect(screen.getByClassName("sui_pagination_ellipsis_input").query()).toBe(null);
  });

  test("無効を指定できる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={10}>
        <PaginationEllipsis disabled end={5} start={2} />
      </PaginationRoot>,
    );

    // 検証
    expect(
      screen
        .getByRole("button", { name: "2〜5ページへ移動" })
        .element()
        .classList.contains("sui_button-disabled"),
    ).toBe(true);
  });

  test("利用者のラベルを優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={10}>
        <PaginationEllipsis aria-label="ページを指定" end={5} start={2} />
      </PaginationRoot>,
    );

    // 検証
    expect(screen.getByRole("button", { name: "ページを指定" }).query()).not.toBe(null);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot radius="full" size="lg" totalPages={10}>
        <PaginationEllipsis
          end={5}
          start={2}
          render={(props, state) => (
            <button
              {...props}
              data-probe={`${state.size}/${state.radius}/${state.page}/${state.totalPages}`}
            />
          )}
        />
      </PaginationRoot>,
    );

    // 検証
    expect(
      screen.getByRole("button", { name: "2〜5ページへ移動" }).element().getAttribute("data-probe"),
    ).toBe("lg/full/1/10");
  });
});
