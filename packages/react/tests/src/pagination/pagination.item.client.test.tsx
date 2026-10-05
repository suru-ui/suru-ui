import "@suru-ui/theme/suru.css";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { PaginationItem } from "../../../src/pagination/item/pagination.item.jsx";
import { PaginationRoot } from "../../../src/pagination/root/pagination.root.jsx";
import "../_locators.js";

describe("PaginationItem", () => {
  test("ページ番号をラベルにしたボタンを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={5}>
        <PaginationItem page={3} />
      </PaginationRoot>,
    );

    // 検証
    const button = screen.getByRole("button", { name: "3" }).element();
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("type")).toBe("button");
    expect(screen.getByClassName("sui_pagination_item").query()).not.toBe(null);
    expect(button.classList.contains("sui_button-squared")).toBe(true);
    expect(button.classList.contains("sui_button-variant_naked")).toBe(true);
    // 焦点リングを抑止するリストアイテム用のクラスは付けません。
    expect(button.classList.contains("sui_button-item")).toBe(false);
  });

  test("大きさと角丸をルートから引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot radius="lg" size="sm" totalPages={5}>
        <PaginationItem page={1} />
      </PaginationRoot>,
    );

    // 検証
    const button = screen.getByRole("button", { name: "1" }).element();
    expect(button.classList.contains("sui_button-size_sm")).toBe(true);
    expect(button.classList.contains("sui_button-radius_lg")).toBe(true);
  });

  test("選択中は強調表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot color="blue" totalPages={5}>
        <PaginationItem page={2} selected />
      </PaginationRoot>,
    );

    // 検証
    const button = screen.getByRole("button", { name: "2" }).element();
    expect(button.classList.contains("sui_pagination_item-selected")).toBe(true);
    expect(button.classList.contains("sui_button-variant_solid")).toBe(true);
    expect(button.classList.contains("sui_button-color_blue")).toBe(true);
  });

  test("選択していないときは強調しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot color="blue" totalPages={5}>
        <PaginationItem page={2} />
      </PaginationRoot>,
    );

    // 検証
    const button = screen.getByRole("button", { name: "2" }).element();
    expect(button.classList.contains("sui_pagination_item-selected")).toBe(false);
    expect(button.classList.contains("sui_button-variant_naked")).toBe(true);
    expect(button.classList.contains("sui_button-color_grey")).toBe(true);
  });

  test("子要素でラベルを置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={5}>
        <PaginationItem page={2}>2ページ</PaginationItem>
      </PaginationRoot>,
    );

    // 検証
    expect(screen.getByRole("button", { name: "2ページ" }).query()).not.toBe(null);
  });

  test("無効なときは状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot disabled totalPages={5}>
        <PaginationItem page={4} />
      </PaginationRoot>,
    );

    // 検証
    expect(
      screen.getByRole("button", { name: "4" }).element().classList.contains("sui_button-disabled"),
    ).toBe(true);
  });

  test("無効を指定できる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={5}>
        <PaginationItem disabled page={4} />
      </PaginationRoot>,
    );

    // 検証
    expect(
      screen.getByRole("button", { name: "4" }).element().classList.contains("sui_button-disabled"),
    ).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={5}>
        <PaginationItem className="custom" page={1} />
      </PaginationRoot>,
    );

    // 検証
    expect(screen.getByRole("button", { name: "1" }).element().classList.contains("custom")).toBe(
      true,
    );
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot color="blue" defaultPage={2} radius="full" size="lg" totalPages={5}>
        <PaginationItem
          page={2}
          selected
          render={(props, state) => (
            <button
              {...props}
              data-probe={`${state.size}/${state.color}/${state.radius}/${state.page}/${String(state.selected)}`}
            />
          )}
        />
      </PaginationRoot>,
    );

    // 検証
    expect(screen.getByRole("button", { name: "2" }).element().getAttribute("data-probe")).toBe(
      "lg/blue/full/2/true",
    );
  });
});
