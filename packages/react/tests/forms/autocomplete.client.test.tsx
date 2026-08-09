import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { Autocomplete } from "../../src/forms/autocomplete/index.js";

const items = ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"];

describe("Autocomplete", () => {
  test("入力欄とポップアップをレンダリングする", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} placeholder="検索" />);

    // 検証
    const input = screen.getByPlaceholder("検索");
    const trigger = screen.getByRole("button", { name: "選択肢を選択" });

    await expect.element(input).toHaveRole("combobox");
    await expect.element(trigger).toBeVisible();
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} />);

    // 検証
    const group = screen
      .getByRole("combobox")
      .element()
      .closest(".sui_autocomplete") as HTMLElement | null;

    expect(group).not.toBeNull();
    await expect.element(group).toHaveClass("sui_autocomplete-size_md");
    await expect.element(group).toHaveClass("sui_autocomplete-variant_naked");
    await expect.element(group).toHaveClass("sui_autocomplete-radius_rounded");
    await expect.element(group).toHaveClass("sui_autocomplete-accent_color_grey");
    await expect.element(group).toHaveClass("sui_autocomplete-outlined");
  });

  test("size をリスト項目に適用する", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} size="lg" />);
    await userEvent.click(screen.getByRole("combobox"));

    // 検証
    await expect
      .element(screen.getByRole("option", { name: "りんご" }))
      .toHaveClass("sui_autocomplete-size_lg");
  });

  test("項目が多いリストをスクロールできる", async () => {
    // 実行
    const manyItems = Array.from({ length: 20 }, (_, index) => `候補 ${index + 1}`);
    const screen = await render(<Autocomplete items={manyItems} />);
    await userEvent.click(screen.getByRole("combobox"));

    // 検証
    const list = screen.getByRole("listbox").element();
    const scrollArea = list.closest(".sui_autocomplete_scroll_area");
    const viewport = scrollArea?.querySelector<HTMLElement>(".sui_scroll_area_viewport");

    expect(scrollArea).not.toBeNull();
    expect(viewport).not.toBeNull();
    expect(viewport?.scrollHeight).toBeGreaterThan(viewport?.clientHeight ?? 0);
  });

  test("文字を入力すると項目が絞り込まれる", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} />);
    await userEvent.type(screen.getByRole("combobox"), "いち");

    // 検証
    const option = screen.getByRole("option", { name: "いちご" });

    await expect.element(option).toBeVisible();
    await expect.element(screen.getByRole("option", { name: "りんご" })).not.toBeInTheDocument();
  });

  test("項目を選択すると入力欄に反映される", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: "バナナ" }));

    // 検証
    await expect.element(screen.getByRole("combobox")).toHaveValue("バナナ");
  });

  test("クリアボタンで入力値を消去する", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} defaultValue="りんご" />);
    await userEvent.click(screen.getByRole("button", { name: "クリア" }));

    // 検証
    await expect.element(screen.getByRole("combobox")).toHaveValue("");
  });

  test("トリガーボタンでポップアップを開閉する", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} />);
    const trigger = screen.getByRole("button", { name: "選択肢を選択" });
    await userEvent.click(trigger);

    // 検証
    await expect.element(screen.getByRole("listbox")).toBeVisible();

    // 実行
    // 開いている間は Base UI によりトリガーが `aria-hidden` になるため、
    // CSS セレクターで取得し、実際のポインター操作と同じ一連のイベントを発火する
    const triggerElement = document.querySelector("button.sui_autocomplete_trigger") as HTMLElement;
    for (const type of ["pointerdown", "mousedown", "mouseup", "click"]) {
      triggerElement.dispatchEvent(
        new PointerEvent(type, {
          bubbles: true,
          cancelable: true,
          pointerType: "mouse",
          button: 0,
        }),
      );
    }

    // 検証
    await expect.element(screen.getByRole("listbox")).not.toBeInTheDocument();
  });

  test("キーボードで項目を選択できる", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} />);
    const input = screen.getByRole("combobox");
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");

    // 検証
    await expect.element(input).toHaveValue("バナナ");
  });

  test("Escape キーでポップアップを閉じる", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.keyboard("{Escape}");

    // 検証
    await expect.element(screen.getByRole("listbox")).not.toBeInTheDocument();
  });

  test("children 関数で項目の見た目を変えられる", async () => {
    // 実行
    const screen = await render(
      <Autocomplete items={items} placeholder="検索">
        {(item) => <span data-testid="item-label">{item}</span>}
      </Autocomplete>,
    );
    await userEvent.type(screen.getByRole("combobox"), "みか");

    // 検証
    const label = screen.getByTestId("item-label");

    await expect.element(label).toHaveTextContent("みかん");
  });

  test("グループ項目を表示できる", async () => {
    const screen = await render(
      <Autocomplete items={[{ label: "果物", items: ["りんご", "みかん"] }]} />,
    );
    await userEvent.click(screen.getByRole("combobox"));

    await expect.element(screen.getByText("果物")).toBeVisible();
    await expect.element(screen.getByRole("option", { name: "りんご" })).toBeVisible();
  });

  test("placeholder は input slot より優先される", async () => {
    const screen = await render(
      <Autocomplete placeholder="優先" slotProps={{ input: { placeholder: "slot" } }} />,
    );

    await expect.element(screen.getByPlaceholder("優先")).toBeVisible();
  });

  test("disabled を指定すると無効化される", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} disabled />);

    // 検証
    const input = screen.getByRole("combobox");
    const group = input.element().closest(".sui_autocomplete") as HTMLElement | null;

    await expect.element(input).toBeDisabled();
    await expect.element(group).toHaveClass("sui_autocomplete-disabled");

    const groupElement = group as HTMLElement;
    const borderColor = getComputedStyle(groupElement).borderColor;
    await userEvent.hover(input);

    expect(getComputedStyle(groupElement).cursor).toBe("not-allowed");
    expect(getComputedStyle(groupElement).borderColor).toBe(borderColor);
  });
});
