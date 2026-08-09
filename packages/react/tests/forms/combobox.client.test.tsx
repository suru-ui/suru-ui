import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { Combobox } from "../../src/forms/combobox/index.js";

const items = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

describe("Combobox", () => {
  test("入力欄とトリガーをレンダリングする", async () => {
    // 実行
    const screen = await render(<Combobox items={items} placeholder="検索" />);

    // 検証
    await expect.element(screen.getByPlaceholder("検索")).toHaveRole("combobox");
    await expect.element(screen.getByRole("button", { name: "選択肢を選択" })).toBeVisible();
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Combobox items={items} />);

    // 検証
    const group = screen
      .getByRole("combobox")
      .element()
      .closest(".sui_combobox") as HTMLElement | null;

    expect(group).not.toBeNull();
    await expect.element(group).toHaveClass("sui_combobox-size_md");
    await expect.element(group).toHaveClass("sui_combobox-variant_naked");
    await expect.element(group).toHaveClass("sui_combobox-radius_rounded");
    await expect.element(group).toHaveClass("sui_combobox-accent_color_grey");
    await expect.element(group).toHaveClass("sui_combobox-outlined");
  });

  test("size をリスト項目に適用する", async () => {
    // 実行
    const screen = await render(<Combobox items={items} size="lg" />);
    await userEvent.click(screen.getByRole("combobox"));

    // 検証
    await expect
      .element(screen.getByRole("option", { name: "りんご" }))
      .toHaveClass("sui_combobox-size_lg");
  });

  test("項目が多いリストをスクロールできる", async () => {
    // 実行
    const manyItems = Array.from({ length: 20 }, (_, index) => `候補 ${index + 1}`);
    const screen = await render(<Combobox items={manyItems} />);
    await userEvent.click(screen.getByRole("combobox"));

    // 検証
    const list = screen.getByRole("listbox").element();
    const scrollArea = list.closest(".sui_combobox_scroll_area");
    const viewport = scrollArea?.querySelector<HTMLElement>(".sui_scroll_area_viewport");

    expect(scrollArea).not.toBeNull();
    expect(viewport).not.toBeNull();
    expect(viewport?.scrollHeight).toBeGreaterThan(viewport?.clientHeight ?? 0);
  });

  test("文字を入力すると項目が絞り込まれる", async () => {
    // 実行
    const screen = await render(<Combobox items={items} />);
    await userEvent.type(screen.getByRole("combobox"), "いち");

    // 検証
    await expect.element(screen.getByRole("option", { name: "いちご" })).toBeVisible();
    await expect.element(screen.getByRole("option", { name: "りんご" })).not.toBeInTheDocument();
  });

  test("項目を選択すると入力欄に反映される", async () => {
    // 実行
    const screen = await render(<Combobox items={items} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: "ばなな" }));

    // 検証
    await expect.element(screen.getByRole("combobox")).toHaveValue("ばなな");
  });

  test("選択済み項目を表示しても候補の高さが崩れない", async () => {
    // 実行
    const screen = await render(<Combobox items={items} defaultValue="りんご" />);
    await userEvent.click(screen.getByRole("combobox"));

    // 検証
    const options = [...document.querySelectorAll<HTMLElement>('[role="option"]')];
    const selectedItem = document.querySelector<HTMLElement>(".sui_combobox_item[data-selected]");
    const indicator = selectedItem?.querySelector<HTMLElement>(".sui_combobox_item_indicator");
    const optionHeights = options.map((option) => option.getBoundingClientRect().height);

    expect(options).toHaveLength(items.length);
    expect(selectedItem).not.toBeNull();
    expect(indicator?.getBoundingClientRect().width).toBeGreaterThan(0);
    expect(indicator?.getBoundingClientRect().height).toBeLessThan(
      selectedItem?.getBoundingClientRect().height ?? 0,
    );
    expect(Math.max(...optionHeights) - Math.min(...optionHeights)).toBeLessThan(1);
  });

  test("クリアボタンで選択値を消去する", async () => {
    // 実行
    const screen = await render(<Combobox items={items} defaultValue="りんご" />);
    await userEvent.click(screen.getByRole("button", { name: "クリア" }));

    // 検証
    await expect.element(screen.getByRole("combobox")).toHaveValue("");
  });

  test("複数選択した値をチップで表示する", async () => {
    // 実行
    const screen = await render(
      <Combobox items={items} multiple defaultValue={["りんご", "ばなな"]} />,
    );

    // 検証
    await expect.element(screen.getByText("りんご")).toBeVisible();
    await expect.element(screen.getByText("ばなな")).toBeVisible();
    await expect.element(screen.getByRole("button", { name: "りんごを削除" })).toBeVisible();
  });

  test("チップを同じ行に整列して入力欄と分離する", async () => {
    // 実行
    await render(<Combobox items={items} multiple defaultValue={["りんご", "ばなな"]} />);

    // 検証
    const chips = [...document.querySelectorAll<HTMLElement>(".sui_combobox_chip")];
    const input = document.querySelector<HTMLElement>(".sui_combobox_chips .sui_combobox_input");
    const chipRects = chips.map((chip) => chip.getBoundingClientRect());
    const inputRect = input?.getBoundingClientRect();

    expect(chips).toHaveLength(2);
    expect(chipRects.every((rect) => rect.height > 0)).toBe(true);
    expect(Math.abs(chipRects[0].top - chipRects[1].top)).toBeLessThan(1);
    expect(inputRect?.height).toBeGreaterThan(0);
    expect(inputRect?.height).toBeLessThan(40);
  });

  test("ラベルを表示する", async () => {
    // 実行
    const screen = await render(<Combobox items={items} label="果物" />);

    // 検証
    await expect.element(screen.getByText("果物")).toBeVisible();
  });

  test("グループ項目を表示できる", async () => {
    // 実行
    const screen = await render(
      <Combobox items={[{ label: "果物", items: ["りんご", "みかん"] }]} />,
    );
    await userEvent.click(screen.getByRole("combobox"));

    // 検証
    await expect.element(screen.getByText("果物")).toBeVisible();
    await expect.element(screen.getByRole("option", { name: "りんご" })).toBeVisible();
  });

  test("slotProps を各パーツに適用する", async () => {
    // 実行
    const screen = await render(
      <Combobox
        items={items}
        slotProps={{
          input: { className: "my-input" },
          inputGroup: { className: "my-group" },
          trigger: { className: "my-trigger" },
        }}
      />,
    );

    // 検証
    await expect
      .element(screen.container.querySelector<HTMLElement>(".my-input"))
      .toBeInTheDocument();
    await expect
      .element(screen.container.querySelector<HTMLElement>(".my-group"))
      .toBeInTheDocument();
    await expect
      .element(screen.container.querySelector<HTMLElement>(".my-trigger"))
      .toBeInTheDocument();
  });

  test("disabled を指定すると無効化される", async () => {
    // 実行
    const screen = await render(<Combobox items={items} disabled />);

    // 検証
    const input = screen.getByRole("combobox");
    const group = input.element().closest(".sui_combobox") as HTMLElement | null;

    await expect.element(input).toBeDisabled();
    await expect.element(group).toHaveClass("sui_combobox-disabled");

    const groupElement = group as HTMLElement;
    const borderColor = getComputedStyle(groupElement).borderColor;
    await userEvent.hover(input);

    expect(getComputedStyle(groupElement).cursor).toBe("not-allowed");
    expect(getComputedStyle(groupElement).borderColor).toBe(borderColor);
  });
});
