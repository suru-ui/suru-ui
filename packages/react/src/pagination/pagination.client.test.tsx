import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import {
  type PaginationAPI,
  type PaginationProps,
  Pagination,
  usePaginationAPI,
} from "./pagination.jsx";
import "../../tests/src/_locators.js";

/** usePaginationAPI はフックのため、描画を経由して API を取り出すために使用します。 */
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
    // 準備と実行。
    const api = await renderAPI({
      totalPages: 20,
      defaultPage: 5,
      siblingCount: 1,
      boundaryCount: 1,
    });

    // 検証。
    expect(api.getItems()).toStrictEqual([
      {
        page: 1,
        type: "item",
      },
      {
        end: 3,
        type: "ellipsis",
        start: 2,
      },
      {
        page: 4,
        type: "item",
      },
      {
        page: 5,
        type: "item",
      },
      {
        page: 6,
        type: "item",
      },
      {
        end: 19,
        type: "ellipsis",
        start: 7,
      },
      {
        page: 20,
        type: "item",
      },
    ]);
  });

  test("getItems は範囲が地続きのときは省略記号を挟まない", async ({ expect }) => {
    // 準備と実行。
    const api = await renderAPI({
      totalPages: 10,
      defaultPage: 5,
      siblingCount: 3,
      boundaryCount: 3,
    });

    // 検証。
    expect(api.getItems()).toStrictEqual([
      {
        page: 1,
        type: "item",
      },
      {
        page: 2,
        type: "item",
      },
      {
        page: 3,
        type: "item",
      },
      {
        page: 4,
        type: "item",
      },
      {
        page: 5,
        type: "item",
      },
      {
        page: 6,
        type: "item",
      },
      {
        page: 7,
        type: "item",
      },
      {
        page: 8,
        type: "item",
      },
      {
        page: 9,
        type: "item",
      },
      {
        page: 10,
        type: "item",
      },
    ]);
  });

  test("getItemProps は選択状態とラベルを付ける", async ({ expect }) => {
    // 準備と実行。
    const api = await renderAPI({
      totalPages: 5,
      defaultPage: 3,
    });

    // 検証。
    expect(api.getItemProps(3)).toStrictEqual({
      page: 3,
      children: 3,
      selected: true,
    });
    expect(api.getItemProps(4)).toStrictEqual({
      page: 4,
      children: 4,
      selected: false,
    });
  });

  test("getItemProps は slotProps を重ねる", async ({ expect }) => {
    // 準備と実行。
    const api = await renderAPI({
      slotProps: {
        item: {
          className: "custom-item",
          "aria-label": "ページ",
        },
      },
      totalPages: 5,
      defaultPage: 3,
    });

    // 検証。
    expect(api.getItemProps(4)).toStrictEqual({
      page: 4,
      children: 4,
      selected: false,
      className: "custom-item",
      "aria-label": "ページ",
    });
  });

  test("getEllipsisProps は範囲を渡す", async ({ expect }) => {
    // 準備と実行。
    const api = await renderAPI({
      slotProps: { ellipsis: { id: "ellipsis" } },
      totalPages: 20,
    });

    // 検証。
    expect(api.getEllipsisProps(2, 4)).toStrictEqual({
      id: "ellipsis",
      end: 4,
      start: 2,
    });
  });

  test("getNextButtonProps と getPreviousButtonProps は slotProps を返す", async ({ expect }) => {
    // 準備と実行。
    const api = await renderAPI({
      slotProps: {
        nextButton: { id: "next" },
        previousButton: { id: "previous" },
      },
      totalPages: 20,
    });

    // 検証。
    expect(api.getNextButtonProps()).toStrictEqual({ id: "next" });
    expect(api.getPreviousButtonProps()).toStrictEqual({ id: "previous" });
  });

  test("getRootProps は固有の props を除いてページ状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const api = await renderAPI({
      slotProps: {},
      totalPages: 20,
      defaultPage: 3,
      siblingCount: 2,
      boundaryCount: 2,
    });
    const rootProps = api.getRootProps();

    // 検証。
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
    // 準備と実行。
    const screen = await render(<Pagination totalPages={20} defaultPage={5} />);

    // 検証。
    expect(screen.getByRole("button", { name: "前のページへ" }).query()).not.toBe(null);
    expect(screen.getByRole("button", { name: "次のページへ" }).query()).not.toBe(null);
    expect(
      screen
        .getByRole("button", {
          name: "1",
          exact: true,
        })
        .query(),
    ).not.toBe(null);
    expect(
      screen
        .getByRole("button", {
          name: "4",
          exact: true,
        })
        .query(),
    ).not.toBe(null);
    expect(
      screen
        .getByRole("button", {
          name: "5",
          exact: true,
        })
        .query(),
    ).not.toBe(null);
    expect(
      screen
        .getByRole("button", {
          name: "6",
          exact: true,
        })
        .query(),
    ).not.toBe(null);
    expect(
      screen
        .getByRole("button", {
          name: "20",
          exact: true,
        })
        .query(),
    ).not.toBe(null);
    expect(screen.container.querySelectorAll(".sui_pagination_ellipsis").length).toBe(2);
  });

  test("無効なときは状態クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Pagination disabled totalPages={20} />);

    // 検証。
    expect(screen.getByClassName("sui_pagination-disabled").query()).not.toBe(null);
  });

  test("1ページだけのときは省略記号を表示しない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Pagination totalPages={1} />);

    // 検証。
    expect(screen.container.querySelectorAll(".sui_pagination_ellipsis").length).toBe(0);
    expect(
      screen
        .getByRole("button", { name: "前のページへ" })
        .element()
        .classList.contains("sui_button-disabled"),
    ).toBe(true);
    expect(
      screen
        .getByRole("button", { name: "次のページへ" })
        .element()
        .classList.contains("sui_button-disabled"),
    ).toBe(true);
  });

  test("slotProps を各パーツへ渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Pagination
        slotProps={{
          item: { className: "custom-item" },
          ellipsis: { className: "custom-ellipsis" },
          nextButton: { "aria-label": "次" },
          previousButton: { "aria-label": "前" },
        }}
        totalPages={20}
      />,
    );

    // 検証。
    expect(screen.getByRole("button", { name: "前" }).query()).not.toBe(null);
    expect(screen.getByRole("button", { name: "次" }).query()).not.toBe(null);
    expect(screen.container.querySelectorAll(".custom-item").length).toBeGreaterThan(0);
    expect(screen.container.querySelectorAll(".custom-ellipsis").length).toBeGreaterThan(0);
  });

  test("大きさと配色と角丸のクラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Pagination size="lg" color="blue" radius="full" totalPages={20} />,
    );

    // 検証。
    const root = screen.getByRole("navigation").element();
    expect(root.classList.contains("sui_pagination-size_lg")).toBe(true);
    expect(root.classList.contains("sui_pagination-color_blue")).toBe(true);
    expect(root.classList.contains("sui_pagination-radius_full")).toBe(true);
  });

  test("slotProps の render へ状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Pagination
        size="lg"
        color="blue"
        slotProps={{
          item: {
            render: (props, state) => (
              <button {...props} data-probe={`${state.size}/${state.color}`} />
            ),
          },
        }}
        totalPages={5}
        defaultPage={3}
      />,
    );

    // 検証。
    expect(
      screen
        .getByRole("button", {
          name: "3",
          exact: true,
        })
        .element()
        .getAttribute("data-probe"),
    ).toBe("lg/blue");
  });
});
