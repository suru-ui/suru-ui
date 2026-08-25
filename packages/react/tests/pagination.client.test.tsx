import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import {
  Pagination,
  Root as PaginationPartsRoot,
  PreviousButton as PaginationPartsPreviousButton,
} from "../src/pagination/index.js";

function getRoot(screen: { container: HTMLElement }): HTMLElement | null {
  return screen.container.querySelector<HTMLElement>("nav.sui_pagination");
}

describe("Pagination", () => {
  test("nav 要素を描画する", async () => {
    // 実行
    const screen = await render(<Pagination totalPages={20} />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.tagName).toBe("NAV");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Pagination totalPages={20} />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_pagination-size_md");
    await expect.element(root).toHaveClass("sui_pagination-color_grey");
    await expect.element(root).toHaveClass("sui_pagination-radius_md");
  });

  test("スタイルプロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(
      <Pagination totalPages={20} size="lg" color="blue" radius="full" />,
    );

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_pagination-size_lg");
    await expect.element(root).toHaveClass("sui_pagination-color_blue");
    await expect.element(root).toHaveClass("sui_pagination-radius_full");
  });

  test("利用者のクラス名を合成する", async () => {
    // 実行
    const screen = await render(<Pagination totalPages={20} className="my-pagination" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("my-pagination");
    await expect.element(root).toHaveClass("sui_pagination");
  });

  test("前後のページボタンと現在ページを描画する", async () => {
    // 実行
    const screen = await render(<Pagination totalPages={20} defaultPage={5} />);

    // 検証
    const current = screen.getByRole("button", { name: "5" });

    await expect.element(current).toHaveAttribute("aria-current", "page");
  });

  test("ページ番号ボタンを押すと現在ページが変わる", async () => {
    // 準備
    const screen = await render(<Pagination totalPages={20} defaultPage={5} />);

    // 実行
    await userEvent.click(screen.getByRole("button", { name: "6", exact: true }));

    // 検証
    await expect
      .element(screen.getByRole("button", { name: "6", exact: true }))
      .toHaveAttribute("aria-current", "page");
  });

  test("最初のページでは前へボタンが無効になる", async () => {
    // 実行
    const screen = await render(<Pagination totalPages={20} />);

    // 検証
    const previous = screen.getByRole("button", { name: "前のページへ" });
    const next = screen.getByRole("button", { name: "次のページへ" });

    await expect.element(previous).toBeDisabled();
    await expect.element(next).toBeEnabled();
  });

  test("最後のページでは次へボタンが無効になる", async () => {
    // 実行
    const screen = await render(<Pagination totalPages={20} defaultPage={20} />);

    // 検証
    const previous = screen.getByRole("button", { name: "前のページへ" });
    const next = screen.getByRole("button", { name: "次のページへ" });

    await expect.element(previous).toBeEnabled();
    await expect.element(next).toBeDisabled();
  });

  test("ページ変更時に理由付きで onPageChange を呼び出す", async () => {
    // 準備
    const changes: Array<{ page: number; reason: string }> = [];
    const screen = await render(
      <Pagination
        totalPages={20}
        onPageChange={(page, details) => {
          changes.push({ page, reason: details.reason });
        }}
      />,
    );

    // 実行
    await userEvent.click(screen.getByRole("button", { name: "次のページへ" }));
    await userEvent.click(screen.getByRole("button", { name: "3" }));

    // 検証
    expect(changes).toStrictEqual([
      { page: 2, reason: "next" },
      { page: 3, reason: "item" },
    ]);
  });

  test("制御されているときは親の指定が優先される", async () => {
    // 準備
    let page = 1;
    const screen = await render(
      <Pagination totalPages={20} page={page} onPageChange={(nextPage) => (page = nextPage)} />,
    );

    // 実行
    await userEvent.click(screen.getByRole("button", { name: "2", exact: true }));

    // 検証
    expect(page).toBe(2);
    await expect
      .element(screen.getByRole("button", { name: "1", exact: true }))
      .toHaveAttribute("aria-current", "page");
  });

  test("disabled のときはすべてのボタンが無効になる", async () => {
    // 実行
    const screen = await render(<Pagination totalPages={20} disabled />);

    // 検証
    const buttons = screen.container.querySelectorAll("button");

    expect(buttons.length).toBeGreaterThan(0);
    for (const button of buttons) {
      expect(button.disabled).toBe(true);
    }
  });

  test("slotProps を各パーツへ適用できる", async () => {
    // 実行
    const screen = await render(
      <Pagination
        totalPages={20}
        defaultPage={5}
        slotProps={{
          previous: { className: "my-previous" },
          item: { className: "my-item" },
        }}
      />,
    );

    // 検証
    const previous = getRoot(screen)!.querySelector<HTMLButtonElement>(".my-previous");

    expect(previous).not.toBeNull();
    expect(getRoot(screen)!.querySelectorAll(".my-item").length).toBeGreaterThan(0);
  });
});

describe("Pagination の省略記号", () => {
  test("省略記号をクリックすると入力欄が表示される", async () => {
    // 準備
    const screen = await render(<Pagination totalPages={20} defaultPage={5} />);

    // 実行
    await userEvent.click(screen.getByRole("button", { name: "2〜3ページへ移動" }));

    // 検証
    const input = screen.getByRole("textbox");

    await expect.element(input).toBeInTheDocument();
    expect(document.activeElement).toBe(input.element());
  });

  test("入力したページ番号へ移動できる", async () => {
    // 準備
    const screen = await render(<Pagination totalPages={20} defaultPage={5} />);
    await userEvent.click(screen.getByRole("button", { name: "7〜19ページへ移動" }));
    const input = screen.getByRole("textbox");
    await expect.element(input).toBeInTheDocument();

    // 実行
    await userEvent.fill(input, "12");

    // 検証
    await userEvent.keyboard("{Enter}");
    await expect
      .element(screen.getByRole("button", { name: "12", exact: true }))
      .toHaveAttribute("aria-current", "page");
  });

  test("範囲外のページ番号は範囲内に丸められる", async () => {
    // 準備
    const screen = await render(<Pagination totalPages={20} defaultPage={5} />);
    await userEvent.click(screen.getByRole("button", { name: "7〜19ページへ移動" }));
    const input = screen.getByRole("textbox");
    await expect.element(input).toBeInTheDocument();
    await userEvent.fill(input, "99");

    // 実行
    await userEvent.keyboard("{Enter}");

    // 検証
    const selected = screen.container.querySelector(".sui_pagination_item-selected");

    expect(selected).not.toBeNull();
    expect(selected!.textContent).toBe("19");
  });

  test("Escape で移動をキャンセルできる", async () => {
    // 準備
    const screen = await render(<Pagination totalPages={20} defaultPage={5} />);
    await userEvent.click(screen.getByRole("button", { name: "2〜3ページへ移動" }));
    const input = screen.getByRole("textbox");
    await expect.element(input).toBeInTheDocument();

    // 実行
    await userEvent.keyboard("{Escape}");

    // 検証
    expect(screen.container.querySelector("input")).toBeNull();
    await expect
      .element(screen.getByRole("button", { name: "5", exact: true }))
      .toHaveAttribute("aria-current", "page");
  });
});

describe("PaginationParts.Root", () => {
  test("nav 要素として描画される", async () => {
    // 実行
    const screen = await render(<PaginationPartsRoot totalPages={10} page={2} />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.getAttribute("aria-label")).toBe("ページネーション");
  });

  test("コンテキストなしで子パーツを描画してもエラーにならない", async () => {
    // 実行と検証
    const screen = await render(<PaginationPartsPreviousButton />);

    await expect.element(screen.getByRole("button", { name: "前のページへ" })).toBeDisabled();
  });
});
