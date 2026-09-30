import "@suru-ui/theme/suru.css";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { PaginationEllipsis } from "../../../src/pagination/pagination.ellipsis.jsx";
import { type PaginationChangeEventDetails } from "../../../src/pagination/pagination.jsx";
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

  test("押すと入力欄を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={10}>
        <PaginationEllipsis end={5} start={2} />
      </PaginationRoot>,
    );
    (
      screen.getByRole("button", { name: "2〜5ページへ移動" }).element() as HTMLButtonElement
    ).click();
    // React の状態更新を待ちます。
    await Promise.resolve();

    // 検証
    const input = screen
      .getByRole("textbox", { name: "2〜5ページへ移動" })
      .element() as HTMLInputElement;
    expect(input.tagName).toBe("INPUT");
    expect(input.getAttribute("inputmode")).toBe("numeric");
    expect(input.placeholder).toBe("2");
    expect(screen.getByRole("button", { name: "2〜5ページへ移動" }).query()).toBe(null);
  });

  test("入力したページへ移動する", async ({ expect }) => {
    // 準備
    const onPageChange = vi.fn<(page: number, details: PaginationChangeEventDetails) => void>();

    // 実行
    const screen = await render(
      <PaginationRoot totalPages={10} onPageChange={onPageChange}>
        <PaginationEllipsis end={5} start={2} />
      </PaginationRoot>,
    );
    (
      screen.getByRole("button", { name: "2〜5ページへ移動" }).element() as HTMLButtonElement
    ).click();
    // React の状態更新を待ちます。
    await Promise.resolve();
    const input = screen
      .getByRole("textbox", { name: "2〜5ページへ移動" })
      .element() as HTMLInputElement;
    input.value = "4";
    input.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Enter" }));
    await Promise.resolve();

    // 検証
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(4, expect.objectContaining({ reason: "ellipsis" }));
    expect(screen.getByRole("button", { name: "2〜5ページへ移動" }).query()).not.toBe(null);
  });

  test("範囲より大きい入力は終了ページへ丸める", async ({ expect }) => {
    // 準備
    const onPageChange = vi.fn<(page: number, details: PaginationChangeEventDetails) => void>();

    // 実行
    const screen = await render(
      <PaginationRoot totalPages={10} onPageChange={onPageChange}>
        <PaginationEllipsis end={5} start={2} />
      </PaginationRoot>,
    );
    (
      screen.getByRole("button", { name: "2〜5ページへ移動" }).element() as HTMLButtonElement
    ).click();
    // React の状態更新を待ちます。
    await Promise.resolve();
    const input = screen
      .getByRole("textbox", { name: "2〜5ページへ移動" })
      .element() as HTMLInputElement;
    input.value = "99";
    input.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Enter" }));

    // 検証
    expect(onPageChange).toHaveBeenCalledWith(5, expect.objectContaining({ reason: "ellipsis" }));
  });

  test("範囲より小さい入力は開始ページへ丸める", async ({ expect }) => {
    // 準備
    const onPageChange = vi.fn<(page: number, details: PaginationChangeEventDetails) => void>();

    // 実行
    const screen = await render(
      <PaginationRoot totalPages={10} onPageChange={onPageChange}>
        <PaginationEllipsis end={5} start={2} />
      </PaginationRoot>,
    );
    (
      screen.getByRole("button", { name: "2〜5ページへ移動" }).element() as HTMLButtonElement
    ).click();
    // React の状態更新を待ちます。
    await Promise.resolve();
    const input = screen
      .getByRole("textbox", { name: "2〜5ページへ移動" })
      .element() as HTMLInputElement;
    input.value = "0";
    input.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Enter" }));

    // 検証
    expect(onPageChange).toHaveBeenCalledWith(2, expect.objectContaining({ reason: "ellipsis" }));
  });

  test("Escape で取り消す", async ({ expect }) => {
    // 準備
    const onPageChange = vi.fn<(page: number, details: PaginationChangeEventDetails) => void>();

    // 実行
    const screen = await render(
      <PaginationRoot totalPages={10} onPageChange={onPageChange}>
        <PaginationEllipsis end={5} start={2} />
      </PaginationRoot>,
    );
    (
      screen.getByRole("button", { name: "2〜5ページへ移動" }).element() as HTMLButtonElement
    ).click();
    // React の状態更新を待ちます。
    await Promise.resolve();
    const input = screen
      .getByRole("textbox", { name: "2〜5ページへ移動" })
      .element() as HTMLInputElement;
    input.value = "4";
    input.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Escape" }));
    await Promise.resolve();

    // 検証
    expect(onPageChange).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "2〜5ページへ移動" }).query()).not.toBe(null);
  });

  test("フォーカスが外れると取り消す", async ({ expect }) => {
    // 準備
    const onPageChange = vi.fn<(page: number, details: PaginationChangeEventDetails) => void>();

    // 実行
    const screen = await render(
      <PaginationRoot totalPages={10} onPageChange={onPageChange}>
        <PaginationEllipsis end={5} start={2} />
      </PaginationRoot>,
    );
    (
      screen.getByRole("button", { name: "2〜5ページへ移動" }).element() as HTMLButtonElement
    ).click();
    // React の状態更新を待ちます。
    await Promise.resolve();
    screen.getByRole("textbox", { name: "2〜5ページへ移動" }).element().blur();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("button", { name: "2〜5ページへ移動" }).query()).not.toBe(null);
    });
    expect(onPageChange).not.toHaveBeenCalled();
  });

  test("数値でない入力では移動しない", async ({ expect }) => {
    // 準備
    const onPageChange = vi.fn<(page: number, details: PaginationChangeEventDetails) => void>();

    // 実行
    const screen = await render(
      <PaginationRoot totalPages={10} onPageChange={onPageChange}>
        <PaginationEllipsis end={5} start={2} />
      </PaginationRoot>,
    );
    (
      screen.getByRole("button", { name: "2〜5ページへ移動" }).element() as HTMLButtonElement
    ).click();
    // React の状態更新を待ちます。
    await Promise.resolve();
    const input = screen
      .getByRole("textbox", { name: "2〜5ページへ移動" })
      .element() as HTMLInputElement;
    input.value = "あ";
    input.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Enter" }));
    await Promise.resolve();

    // 検証
    expect(onPageChange).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "2〜5ページへ移動" }).query()).not.toBe(null);
  });

  test("無効なときは入力欄を表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot disabled totalPages={10}>
        <PaginationEllipsis end={5} start={2} />
      </PaginationRoot>,
    );
    (
      screen.getByRole("button", { name: "2〜5ページへ移動" }).element() as HTMLButtonElement
    ).click();

    // 検証
    expect(
      (screen.getByRole("button", { name: "2〜5ページへ移動" }).element() as HTMLButtonElement)
        .disabled,
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
      (screen.getByRole("button", { name: "2〜5ページへ移動" }).element() as HTMLButtonElement)
        .disabled,
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
