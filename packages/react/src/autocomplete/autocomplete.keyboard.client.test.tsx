import "@suru-ui/theme/suru.css";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { Autocomplete } from "./autocomplete.js";
import "../../tests/src/_locators.js";

const fruits = ["りんご", "ばなな", "ぶどう"];

const prefectures = [
  { label: "東京都", value: "13" },
  { label: "大阪府", value: "27" },
  { label: "京都府", value: "26" },
];

describe("Autocomplete のキーボード操作", () => {
  test("方向キーで強調表示する項目を移動する", async ({ expect }) => {
    // 準備
    const screen = await render(<Autocomplete items={fruits} />);
    const input = screen.getByRole("combobox");
    await input.click();

    // 実行と検証
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("option").elements()[0]).toHaveClass(
      "sui_autocomplete_item-highlighted",
    );

    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("option").elements()[0]).not.toHaveClass(
      "sui_autocomplete_item-highlighted",
    );
    expect(screen.getByRole("option").elements()[1]).toHaveClass(
      "sui_autocomplete_item-highlighted",
    );
  });

  test("ラベル付きの項目をラベルで絞り込んで移動する", async ({ expect }) => {
    // 準備
    const screen = await render(<Autocomplete items={prefectures} />);
    const input = screen.getByRole("combobox");
    await input.click();

    // 実行
    await userEvent.keyboard("京");
    await userEvent.keyboard("{ArrowDown}");

    // 検証
    const options = screen.getByRole("option").elements();
    expect(options.map((option) => option.textContent)).toStrictEqual(["東京都", "京都府"]);
    expect(options[1]).toHaveClass("sui_autocomplete_item-highlighted");
  });

  test("強調表示する項目の背景色を変える", async ({ expect }) => {
    // 準備
    const screen = await render(<Autocomplete items={fruits} />);
    const input = screen.getByRole("combobox");
    await input.click();

    // 実行
    await userEvent.keyboard("{ArrowDown}");

    // 検証
    const [first, second] = screen.getByRole("option").elements();
    expect(first).toBeDefined();
    expect(second).toBeDefined();
    expect(getComputedStyle(first!).backgroundColor).not.toBe(
      getComputedStyle(second!).backgroundColor,
    );
  });

  test("ラベル付きの項目をキーボードで選択すると入力をラベルにする", async ({ expect }) => {
    // 準備
    const screen = await render(<Autocomplete items={prefectures} />);
    const input = screen.getByRole("combobox");
    await input.click();

    // 実行
    await userEvent.keyboard("{ArrowDown}{Enter}");

    // 検証
    expect(input.element()).toHaveValue("東京都");
  });
});
