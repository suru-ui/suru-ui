import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { FieldRoot } from "../field/root/field.root.jsx";
import "./select.parts.js";
import { Select } from "./select.jsx";
import "../../tests/src/_locators.js";

const fruits = ["りんご", "ばなな", "ぶどう"];

describe("Select", () => {
  test("ラベルと選択欄とプレースホルダーを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Select items={fruits} label="果物" placeholder="選択" />);

    // 検証
    const trigger = screen.getByRole("combobox", { name: "果物" }).element();
    expect(trigger.classList.contains("sui_select")).toBe(true);
    expect(trigger.getAttribute("data-scope")).toBe("");
    expect(screen.getByText("果物").query()?.textContent).toBe("果物");
    expect(screen.getByText("選択").query()?.textContent).toBe("選択");
  });

  test("ラベルを指定しないときはラベル要素を表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Select items={fruits} />);

    // 検証
    expect(screen.getByClassName("sui_select_label").query()).toBe(null);
  });

  test("オブジェクトの項目を値と表示に分けて扱う", async ({ expect }) => {
    // 準備と実行
    const items = { rs: "Rust", ts: "TypeScript" };
    const screen = await render(
      <Select items={items} label="言語" defaultOpen defaultValue="rs" />,
    );

    // 検証
    expect(screen.getByRole("option", { name: "Rust" }).query()).not.toBe(null);
    expect(screen.getByRole("combobox", { name: "言語" }).element().textContent).toContain("Rust");
  });

  test("項目をグループと見出しと区切り線で表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Select
        items={[
          { items: ["りんご", "ばなな"], label: "果物" },
          { items: ["にんじん"], label: "野菜" },
        ]}
        label="食材"
        defaultOpen
      />,
    );

    // 検証
    expect(screen.getByText("果物").query()?.textContent).toBe("果物");
    expect(screen.getByText("野菜").query()?.textContent).toBe("野菜");
    expect(screen.getByRole("option", { name: "にんじん" }).query()).not.toBe(null);
    expect(screen.getByClassName("sui_select_separator").elements()).toHaveLength(1);
  });

  test("項目が空のときはリストに項目を表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Select items={[]} label="果物" defaultOpen />);

    // 検証
    expect(screen.getByRole("option").query()).toBe(null);
  });

  test("関数子で各項目を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Select items={fruits} label="果物" defaultOpen>
        {(item, index) => (
          <div data-testid="custom-item">{`${index}:${"value" in item ? String(item.value) : "group"}`}</div>
        )}
      </Select>,
    );

    // 検証
    const items = screen
      .getByTestId("custom-item")
      .elements()
      .map((element) => element.textContent);
    expect(items).toStrictEqual(["0:りんご", "1:ばなな", "2:ぶどう"]);
  });

  test("利用者の className をトリガーへ加える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Select items={fruits} label="果物" className="custom" />);

    // 検証
    expect(
      screen.getByRole("combobox", { name: "果物" }).element().classList.contains("custom"),
    ).toBe(true);
  });

  test("無効時は状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Select items={fruits} label="果物" disabled />);

    // 検証
    const trigger = screen.getByRole("combobox", { name: "果物" }).element();
    expect(trigger.classList.contains("sui_select-disabled")).toBe(true);
  });

  test("Field の検証状態をクラスへ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <FieldRoot invalid>
          <Select items={fruits} aria-label="不正" />
        </FieldRoot>
        <FieldRoot>
          <Select items={fruits} aria-label="未検証" />
        </FieldRoot>
      </>,
    );

    // 検証
    const invalid = screen.getByRole("combobox", { name: "不正" }).element();
    expect(invalid.classList.contains("sui_select-invalid")).toBe(true);
    const unverified = screen.getByRole("combobox", { name: "未検証" }).element();
    expect(unverified.classList.contains("sui_select-unverified")).toBe(true);
  });

  test("slotProps で各パーツの props を変更する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Select
        items={fruits}
        label="果物"
        slotProps={{
          item: { className: "custom-item" },
          list: { id: "list" },
          itemIndicator: { id: "indicator" },
        }}
        defaultOpen
      />,
    );

    // 検証
    expect(screen.getByRole("option", { name: "りんご" }).element().classList).toContain(
      "custom-item",
    );
    expect(screen.getByClassName("sui_select_list").element().id).toBe("list");
    const indicator = screen
      .getByRole("option", { name: "りんご" })
      .element()
      .querySelector<HTMLElement>(".sui_select_item_indicator");
    expect(indicator?.id).toBe("indicator");
  });
});
