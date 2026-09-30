import "@suru-ui/theme/suru.css";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { type PaginationChangeEventDetails } from "../../../src/pagination/pagination.jsx";
import { PaginationNextButton } from "../../../src/pagination/pagination.next-button.jsx";
import { PaginationRoot } from "../../../src/pagination/pagination.root.jsx";
import "../_locators.js";

describe("PaginationNextButton", () => {
  test("次のページへ移動するボタンを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot defaultPage={2} totalPages={5}>
        <PaginationNextButton />
      </PaginationRoot>,
    );

    // 検証
    const button = screen.getByRole("button", { name: "次のページへ" }).element();
    expect(button.tagName).toBe("BUTTON");
    expect(screen.getByClassName("sui_pagination_next").query()).not.toBe(null);
    expect(button.querySelector("svg")).not.toBe(null);
  });

  test("最後のページでは無効にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot defaultPage={5} totalPages={5}>
        <PaginationNextButton />
      </PaginationRoot>,
    );

    // 検証
    expect(
      (screen.getByRole("button", { name: "次のページへ" }).element() as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });

  test("総ページ数が小数のときも最後のページでは無効にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot defaultPage={5} totalPages={5.9}>
        <PaginationNextButton />
      </PaginationRoot>,
    );

    // 検証
    expect(
      (screen.getByRole("button", { name: "次のページへ" }).element() as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });

  test("押すと次のページへ移動する", async ({ expect }) => {
    // 準備
    const onPageChange = vi.fn<(page: number, details: PaginationChangeEventDetails) => void>();

    // 実行
    const screen = await render(
      <PaginationRoot defaultPage={3} totalPages={5} onPageChange={onPageChange}>
        <PaginationNextButton />
      </PaginationRoot>,
    );
    await screen.getByRole("button", { name: "次のページへ" }).click();

    // 検証
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(4, expect.objectContaining({ reason: "next" }));
  });

  test("無効なときは移動しない", async ({ expect }) => {
    // 準備
    const onPageChange = vi.fn<(page: number, details: PaginationChangeEventDetails) => void>();

    // 実行
    const screen = await render(
      <PaginationRoot defaultPage={3} disabled totalPages={5} onPageChange={onPageChange}>
        <PaginationNextButton />
      </PaginationRoot>,
    );
    (screen.getByRole("button", { name: "次のページへ" }).element() as HTMLButtonElement).click();

    // 検証
    expect(onPageChange).not.toHaveBeenCalled();
  });

  test("無効を指定できる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot defaultPage={3} totalPages={5}>
        <PaginationNextButton disabled />
      </PaginationRoot>,
    );

    // 検証
    expect(
      (screen.getByRole("button", { name: "次のページへ" }).element() as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot color="blue" defaultPage={5} radius="full" size="lg" totalPages={5}>
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

    // 検証
    expect(
      screen.getByRole("button", { name: "次のページへ" }).element().getAttribute("data-probe"),
    ).toBe("lg/blue/full/5/5/true");
  });
});
