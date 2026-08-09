import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { Select } from "../../src/forms/select/index.js";

const items = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

describe("Select", () => {
  test("トリガーをレンダリングする", async () => {
    // 実行
    const screen = await render(<Select items={items} placeholder="果物を選択" />);

    // 検証
    await expect.element(screen.getByRole("combobox")).toBeVisible();
    await expect.element(screen.getByRole("combobox")).toHaveTextContent("果物を選択");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Select items={items} />);

    // 検証
    const trigger = screen.getByRole("combobox");
    await expect.element(trigger).toHaveClass("sui_select-size_md");
    await expect.element(trigger).toHaveClass("sui_select-variant_naked");
    await expect.element(trigger).toHaveClass("sui_select-radius_rounded");
    await expect.element(trigger).toHaveClass("sui_select-outlined");
  });

  test("選択値と項目を左寄せにする", async () => {
    // 準備
    const screen = await render(<Select items={items} defaultOpen />);

    // 検証
    const value = screen.container.querySelector<HTMLElement>(".sui_select_value");
    const option = screen.getByRole("option", { name: "りんご" }).element();
    expect(value).not.toBeNull();
    expect(getComputedStyle(value as HTMLElement).textAlign).toBe("left");
    expect(getComputedStyle(option).textAlign).toBe("left");
  });

  test("未選択の Indicator を非表示にする", async () => {
    // 準備
    const screen = await render(<Select items={items} defaultValue="りんご" defaultOpen />);

    // 検証
    const selectedIndicator = screen
      .getByRole("option", { name: "りんご" })
      .element()
      .querySelector<HTMLElement>(".sui_select_item_indicator");
    const uncheckedIndicator = screen
      .getByRole("option", { name: "ばなな" })
      .element()
      .querySelector<HTMLElement>(".sui_select_item_indicator");
    expect(selectedIndicator).not.toBeNull();
    expect(uncheckedIndicator).not.toBeNull();
    expect(getComputedStyle(selectedIndicator as HTMLElement).opacity).toBe("1");
    expect(getComputedStyle(uncheckedIndicator as HTMLElement).opacity).toBe("0");
  });

  test("トリガーでポップアップを開閉する", async () => {
    // 準備
    const screen = await render(<Select items={items} />);

    // 実行
    await userEvent.click(screen.getByRole("combobox"));

    // 検証
    await expect.element(screen.getByRole("listbox")).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect.element(screen.getByRole("listbox")).not.toBeInTheDocument();
  });

  test("項目を選択すると値を表示する", async () => {
    // 準備
    const screen = await render(<Select items={items} placeholder="選択" />);
    await userEvent.click(screen.getByRole("combobox"));

    // 実行
    await userEvent.click(screen.getByRole("option", { name: "ばなな" }));

    // 検証
    await expect.element(screen.getByRole("combobox")).toHaveTextContent("ばなな");
  });

  test("キーボードで項目を選択できる", async () => {
    // 準備
    const screen = await render(<Select items={items} />);
    await userEvent.click(screen.getByRole("combobox"));

    // 実行
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");

    // 検証
    await expect.element(screen.getByRole("combobox")).toHaveTextContent("ばなな");
  });

  test("size をリスト項目に適用する", async () => {
    // 準備
    const screen = await render(<Select items={items} size="lg" />);
    await userEvent.click(screen.getByRole("combobox"));

    // 検証
    await expect
      .element(screen.getByRole("option", { name: "りんご" }))
      .toHaveClass("sui_select-size_lg");
  });

  test("複数の値を選択できる", async () => {
    // 準備
    const screen = await render(
      <Select items={items} multiple defaultValue={["りんご"]} placeholder="選択" />,
    );
    await userEvent.click(screen.getByRole("combobox"));

    // 実行
    await userEvent.click(screen.getByRole("option", { name: "ばなな" }));

    // 検証
    await expect.element(screen.getByRole("combobox")).toHaveTextContent("りんご, ばなな");
    await expect.element(screen.getByRole("listbox")).toBeVisible();
  });

  test("グループ項目を表示できる", async () => {
    // 準備
    const screen = await render(
      <Select items={[{ label: "果物", items: ["りんご", "みかん"] }]} />,
    );

    // 実行
    await userEvent.click(screen.getByRole("combobox"));

    // 検証
    await expect.element(screen.getByText("果物")).toBeVisible();
    await expect.element(screen.getByRole("option", { name: "りんご" })).toBeVisible();
  });

  test("項目が多いリストをスクロールできる", async () => {
    // 準備
    const manyItems = Array.from({ length: 20 }, (_, index) => `候補 ${index + 1}`);
    const screen = await render(<Select items={manyItems} defaultOpen />);

    // 検証
    const list = screen.getByRole("listbox").element();
    const scrollArea = list.closest(".sui_select_scroll_area");
    const viewport = scrollArea?.querySelector<HTMLElement>(".sui_scroll_area_viewport");
    expect(scrollArea).not.toBeNull();
    expect(viewport).not.toBeNull();
    expect(viewport?.scrollHeight).toBeGreaterThan(viewport?.clientHeight ?? 0);
  });

  test("slotProps を各パーツに適用する", async () => {
    // 実行
    const screen = await render(
      <Select
        items={items}
        slotProps={{
          trigger: { className: "my-trigger" },
          value: { className: "my-value" },
          icon: { className: "my-icon" },
        }}
      />,
    );

    // 検証
    await expect
      .element(screen.container.querySelector<HTMLElement>(".my-trigger"))
      .toBeInTheDocument();
    await expect
      .element(screen.container.querySelector<HTMLElement>(".my-value"))
      .toBeInTheDocument();
    await expect
      .element(screen.container.querySelector<HTMLElement>(".my-icon"))
      .toBeInTheDocument();
  });

  test("disabled を指定すると無効化される", async () => {
    // 実行
    const screen = await render(<Select items={items} disabled />);

    // 検証
    const trigger = screen.getByRole("combobox");
    await expect.element(trigger).toBeDisabled();
    await expect.element(trigger).toHaveClass("sui_select-disabled");
  });
});
