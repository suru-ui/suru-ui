import "@suru-ui/theme/suru.css";
import { vi, test, describe } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import type { PaginationRootChangeEventDetails } from "../root/pagination.root.context.js";
import { PaginationRoot } from "../root/pagination.root.jsx";
import { PaginationEllipsis } from "./pagination.ellipsis.jsx";
import "../../../tests/src/_locators.js";

describe("PaginationEllipsis", () => {
  test("飛び先の範囲を示すボタンを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={10}>
        <PaginationEllipsis end={5} start={2} />
      </PaginationRoot>,
    );

    // 検証
    const button = screen.getByRole("combobox", { name: "2〜5ページへ移動" }).element();
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
    expect(screen.getByRole("combobox", { name: "2〜5ページへ移動" }).query()).not.toBe(null);
  });

  test("範囲を省略したときは開始ページを既定にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={10}>
        <PaginationEllipsis />
      </PaginationRoot>,
    );

    // 検証
    expect(screen.getByRole("combobox", { name: "2〜2ページへ移動" }).query()).not.toBe(null);
  });

  test("押すとポップアップに入力欄と範囲内の選択肢を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={10}>
        <PaginationEllipsis end={5} start={2} />
      </PaginationRoot>,
    );
    await screen.getByRole("combobox", { name: "2〜5ページへ移動" }).click();

    // 検証
    const popup = screen.getByClassName("sui_combobox_popup").element();
    expect(popup.querySelector("input")?.getAttribute("placeholder")).toBe("ページを検索");
    expect(
      screen
        .getByRole("option")
        .elements()
        .map((option) => option.textContent),
    ).toStrictEqual(["2", "3", "4", "5"]);
  });

  test("入力欄で選択肢を絞り込める", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={10}>
        <PaginationEllipsis end={49} start={2} />
      </PaginationRoot>,
    );
    await screen.getByRole("combobox", { name: "2〜49ページへ移動" }).click();
    await screen.getByRole("combobox", { name: "ページを検索" }).click();
    await userEvent.keyboard("4");

    // 検証
    await vi.waitFor(() => {
      expect(
        screen
          .getByRole("option")
          .elements()
          .map((option) => option.textContent),
      ).toStrictEqual([
        "4",
        "14",
        "24",
        "34",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
      ]);
    });
  });

  test("選択肢を選ぶとそのページへ移動する", async ({ expect }) => {
    // 準備
    const onPageChange = vi.fn<(page: number, details: PaginationRootChangeEventDetails) => void>();
    const screen = await render(
      <PaginationRoot totalPages={10} onPageChange={onPageChange}>
        <PaginationEllipsis end={5} start={2} />
      </PaginationRoot>,
    );

    // 実行
    await screen.getByRole("combobox", { name: "2〜5ページへ移動" }).click();
    await screen.getByRole("option", { name: "4" }).click();

    // 検証
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange.mock.calls[0]?.[0]).toBe(4);
    expect(onPageChange.mock.calls[0]?.[1].reason).toBe("ellipsis");
  });

  test("キーボードで選択肢を選べる", async ({ expect }) => {
    // 準備
    const onPageChange = vi.fn<(page: number, details: PaginationRootChangeEventDetails) => void>();
    const screen = await render(
      <PaginationRoot totalPages={10} onPageChange={onPageChange}>
        <PaginationEllipsis end={5} start={2} />
      </PaginationRoot>,
    );
    await screen.getByRole("combobox", { name: "2〜5ページへ移動" }).click();

    // 実行
    await userEvent.keyboard("{ArrowDown}{Enter}");

    // 検証
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange.mock.calls[0]?.[0]).toBe(2);
    expect(onPageChange.mock.calls[0]?.[1].reason).toBe("ellipsis");
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
        .getByRole("combobox", { name: "2〜5ページへ移動" })
        .element()
        .classList.contains("sui_button-disabled"),
    ).toBe(true);
    expect(screen.getByClassName("sui_combobox_popup").query()).toBe(null);
  });

  test("無効を指定できる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={10}>
        <PaginationEllipsis end={5} start={2} disabled />
      </PaginationRoot>,
    );

    // 検証
    expect(
      screen
        .getByRole("combobox", { name: "2〜5ページへ移動" })
        .element()
        .classList.contains("sui_button-disabled"),
    ).toBe(true);
  });

  test("利用者のラベルを優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={10}>
        <PaginationEllipsis end={5} start={2} aria-label="ページを指定" />
      </PaginationRoot>,
    );

    // 検証
    expect(screen.getByRole("combobox", { name: "ページを指定" }).query()).not.toBe(null);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot size="lg" radius="full" totalPages={10}>
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
      screen
        .getByRole("combobox", { name: "2〜5ページへ移動" })
        .element()
        .getAttribute("data-probe"),
    ).toBe("lg/full/1/10");
  });
});
