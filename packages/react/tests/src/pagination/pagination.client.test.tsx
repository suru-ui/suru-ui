import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import {
  type PaginationAPI,
  type PaginationChangeEventDetails,
  type PaginationProps,
  Pagination,
  usePaginationAPI,
} from "../../../src/pagination/pagination.jsx";
import "../_locators.js";

/**
 * usePaginationAPI はフックのため、描画を経由して API を取り出すために使用します。
 */
async function renderAPI(props: PaginationProps): Promise<PaginationAPI> {
  let api: PaginationAPI | undefined;

  function Probe() {
    const value = usePaginationAPI(props);

    React.useEffect(() => {
      api = value;
    }, [value]);

    return null;
  }

  await render(<Probe />);

  return api!;
}

describe("PaginationAPI", () => {
  test("getItems は先頭末尾と現在の前後のページを組み立てる", async ({ expect }) => {
    // 準備と実行
    const api = await renderAPI({
      boundaryCount: 1,
      defaultPage: 5,
      siblingCount: 1,
      totalPages: 20,
    });

    // 検証
    expect(api.getItems()).toStrictEqual([
      { page: 1, type: "item" },
      { end: 3, start: 2, type: "ellipsis" },
      { page: 4, type: "item" },
      { page: 5, type: "item" },
      { page: 6, type: "item" },
      { end: 19, start: 7, type: "ellipsis" },
      { page: 20, type: "item" },
    ]);
  });

  test("getItems は範囲が地続きのときは省略記号を挟まない", async ({ expect }) => {
    // 準備と実行
    const api = await renderAPI({
      boundaryCount: 3,
      defaultPage: 5,
      siblingCount: 3,
      totalPages: 10,
    });

    // 検証
    expect(api.getItems()).toStrictEqual([
      { page: 1, type: "item" },
      { page: 2, type: "item" },
      { page: 3, type: "item" },
      { page: 4, type: "item" },
      { page: 5, type: "item" },
      { page: 6, type: "item" },
      { page: 7, type: "item" },
      { page: 8, type: "item" },
      { page: 9, type: "item" },
      { page: 10, type: "item" },
    ]);
  });

  test("getItemProps は選択状態とラベルを付ける", async ({ expect }) => {
    // 準備と実行
    const api = await renderAPI({ defaultPage: 3, totalPages: 5 });

    // 検証
    expect(api.getItemProps(3)).toStrictEqual({ page: 3, children: 3, selected: true });
    expect(api.getItemProps(4)).toStrictEqual({ page: 4, children: 4, selected: false });
  });

  test("getItemProps は slotProps を重ねる", async ({ expect }) => {
    // 準備と実行
    const api = await renderAPI({
      defaultPage: 3,
      slotProps: { item: { className: "custom-item", "aria-label": "ページ" } },
      totalPages: 5,
    });

    // 検証
    expect(api.getItemProps(4)).toStrictEqual({
      "aria-label": "ページ",
      className: "custom-item",
      page: 4,
      children: 4,
      selected: false,
    });
  });

  test("getEllipsisProps は範囲を渡す", async ({ expect }) => {
    // 準備と実行
    const api = await renderAPI({ slotProps: { ellipsis: { id: "ellipsis" } }, totalPages: 20 });

    // 検証
    expect(api.getEllipsisProps(2, 4)).toStrictEqual({ id: "ellipsis", end: 4, start: 2 });
  });

  test("getNextButtonProps と getPreviousButtonProps は slotProps を返す", async ({ expect }) => {
    // 準備と実行
    const api = await renderAPI({
      slotProps: { nextButton: { id: "next" }, previousButton: { id: "previous" } },
      totalPages: 20,
    });

    // 検証
    expect(api.getNextButtonProps()).toStrictEqual({ id: "next" });
    expect(api.getPreviousButtonProps()).toStrictEqual({ id: "previous" });
  });

  test("getRootProps は固有の props を除いてページ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const api = await renderAPI({
      boundaryCount: 2,
      defaultPage: 3,
      siblingCount: 2,
      slotProps: {},
      totalPages: 20,
    });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps).not.toHaveProperty("boundaryCount");
    expect(rootProps).not.toHaveProperty("siblingCount");
    expect(rootProps).not.toHaveProperty("slotProps");
    expect(rootProps.page).toBe(3);
    expect(rootProps.totalPages).toBe(20);
    expect(rootProps.disabled).toBe(false);
    expect(rootProps.onPageChange).toBeTypeOf("function");
  });
});

describe("Pagination", () => {
  test("前後の移動ボタンとページ番号を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Pagination defaultPage={5} totalPages={20} />);

    // 検証
    expect(screen.getByRole("button", { name: "前のページへ" }).query()).not.toBe(null);
    expect(screen.getByRole("button", { name: "次のページへ" }).query()).not.toBe(null);
    expect(screen.getByRole("button", { name: "1", exact: true }).query()).not.toBe(null);
    expect(screen.getByRole("button", { name: "4", exact: true }).query()).not.toBe(null);
    expect(screen.getByRole("button", { name: "5", exact: true }).query()).not.toBe(null);
    expect(screen.getByRole("button", { name: "6", exact: true }).query()).not.toBe(null);
    expect(screen.getByRole("button", { name: "20", exact: true }).query()).not.toBe(null);
    expect(screen.container.querySelectorAll(".sui_pagination_ellipsis").length).toBe(2);
  });

  test("現在のページを選択状態にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Pagination defaultPage={5} totalPages={20} />);

    // 検証
    const current = screen.getByRole("button", { name: "5", exact: true }).element();
    expect(current.getAttribute("aria-current")).toBe("page");
    expect(
      screen.getByRole("button", { name: "4", exact: true }).element().getAttribute("aria-current"),
    ).toBe(null);
  });

  test("ページ番号を押すと選択が移動する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Pagination defaultPage={5} totalPages={20} />);
    await screen.getByRole("button", { name: "6", exact: true }).click();

    // 検証
    expect(
      screen.getByRole("button", { name: "6", exact: true }).element().getAttribute("aria-current"),
    ).toBe("page");
    expect(
      screen.getByRole("button", { name: "5", exact: true }).element().getAttribute("aria-current"),
    ).toBe(null);
  });

  test("省略記号からページを指定する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Pagination defaultPage={5} totalPages={20} />);
    (
      screen.getByRole("button", { name: "2〜3ページへ移動" }).element() as HTMLButtonElement
    ).click();
    // React の状態更新を待ちます。
    await Promise.resolve();
    const input = screen
      .getByRole("textbox", { name: "2〜3ページへ移動" })
      .element() as HTMLInputElement;
    input.value = "3";
    input.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Enter" }));
    await Promise.resolve();

    // 検証
    expect(
      screen.getByRole("button", { name: "3", exact: true }).element().getAttribute("aria-current"),
    ).toBe("page");
  });

  test("ページ変更の理由を伝える", async ({ expect }) => {
    // 準備
    const onPageChange = vi.fn<(page: number, details: PaginationChangeEventDetails) => void>();

    // 実行
    const screen = await render(
      <Pagination defaultPage={5} totalPages={20} onPageChange={onPageChange} />,
    );
    await screen.getByRole("button", { name: "次のページへ" }).click();

    // 検証
    expect(onPageChange).toHaveBeenCalledWith(6, expect.objectContaining({ reason: "next" }));
  });

  test("無効なときは操作できない", async ({ expect }) => {
    // 準備
    const onPageChange = vi.fn<(page: number, details: PaginationChangeEventDetails) => void>();

    // 実行
    const screen = await render(
      <Pagination defaultPage={5} disabled totalPages={20} onPageChange={onPageChange} />,
    );
    (screen.getByRole("button", { name: "6" }).element() as HTMLButtonElement).click();
    (screen.getByRole("button", { name: "次のページへ" }).element() as HTMLButtonElement).click();

    // 検証
    expect(onPageChange).not.toHaveBeenCalled();
    expect(screen.getByClassName("sui_pagination-disabled").query()).not.toBe(null);
  });

  test("1ページだけのときは省略記号を表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Pagination totalPages={1} />);

    // 検証
    expect(screen.container.querySelectorAll(".sui_pagination_ellipsis").length).toBe(0);
    expect(
      (screen.getByRole("button", { name: "前のページへ" }).element() as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    expect(
      (screen.getByRole("button", { name: "次のページへ" }).element() as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });

  test("slotProps を各パーツへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Pagination
        totalPages={20}
        slotProps={{
          ellipsis: { className: "custom-ellipsis" },
          item: { className: "custom-item" },
          nextButton: { "aria-label": "次" },
          previousButton: { "aria-label": "前" },
        }}
      />,
    );

    // 検証
    expect(screen.getByRole("button", { name: "前" }).query()).not.toBe(null);
    expect(screen.getByRole("button", { name: "次" }).query()).not.toBe(null);
    expect(screen.container.querySelectorAll(".custom-item").length).toBeGreaterThan(0);
    expect(screen.container.querySelectorAll(".custom-ellipsis").length).toBeGreaterThan(0);
  });

  test("大きさと配色と角丸のクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Pagination color="blue" radius="full" size="lg" totalPages={20} />,
    );

    // 検証
    const root = screen.getByRole("navigation").element();
    expect(root.classList.contains("sui_pagination-size_lg")).toBe(true);
    expect(root.classList.contains("sui_pagination-color_blue")).toBe(true);
    expect(root.classList.contains("sui_pagination-radius_full")).toBe(true);
  });

  test("slotProps の render へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Pagination
        color="blue"
        defaultPage={3}
        size="lg"
        slotProps={{
          item: {
            render: (props, state) => (
              <button {...props} data-probe={`${state.size}/${state.color}`} />
            ),
          },
        }}
        totalPages={5}
      />,
    );

    // 検証
    expect(
      screen.getByRole("button", { name: "3", exact: true }).element().getAttribute("data-probe"),
    ).toBe("lg/blue");
  });
});
