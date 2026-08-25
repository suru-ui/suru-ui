import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { Autocomplete, Root as AutocompletePartsRoot } from "../src/autocomplete/index.js";

const items = ["りんご", "ばなな", "ぶどう", "みかん"];

function getGroup(screen: { container: HTMLElement }): HTMLElement | null {
  return screen.container.querySelector<HTMLElement>(".sui_autocomplete");
}

describe("Autocomplete", () => {
  test("プレースホルダーを入力欄に表示する", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} placeholder="検索" />);

    // 検証
    await expect.element(screen.getByPlaceholder("検索")).toBeInTheDocument();
  });

  test("既定のスタイルクラスを入力グループへ適用する", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} />);

    // 検証
    const group = getGroup(screen);

    expect(group).not.toBeNull();
    await expect.element(group).toHaveClass("sui_autocomplete-size_md");
    await expect.element(group).toHaveClass("sui_autocomplete-color_grey");
    await expect.element(group).toHaveClass("sui_autocomplete-radius_md");
    await expect.element(group).toHaveClass("sui_autocomplete-variant_liquid");
    expect(group!.classList.contains("sui_autocomplete-outlined")).toBe(false);
  });

  test("スタイルプロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(
      <Autocomplete items={items} size="lg" color="red" radius="full" variant="naked" outlined />,
    );

    // 検証
    const group = getGroup(screen);

    expect(group).not.toBeNull();
    await expect.element(group).toHaveClass("sui_autocomplete-size_lg");
    await expect.element(group).toHaveClass("sui_autocomplete-color_red");
    await expect.element(group).toHaveClass("sui_autocomplete-radius_full");
    await expect.element(group).toHaveClass("sui_autocomplete-variant_naked");
    await expect.element(group).toHaveClass("sui_autocomplete-outlined");
  });

  test("入力欄をクリックすると項目のリストを表示する", async () => {
    // 準備
    const screen = await render(<Autocomplete items={items} />);

    // 実行
    await userEvent.click(screen.getByRole("combobox"));

    // 検証
    await expect.element(screen.getByRole("option", { name: "りんご" })).toBeVisible();
    await expect.element(screen.getByRole("option", { name: "ばなな" })).toBeVisible();
  });

  test("label を持つ項目は label を表示する", async () => {
    // 準備
    const screen = await render(<Autocomplete items={[{ label: "りんご", value: "apple" }]} />);

    // 実行
    await userEvent.click(screen.getByRole("combobox"));

    // 検証
    await expect.element(screen.getByRole("option", { name: "りんご" })).toBeVisible();
  });

  test("関数 children で項目を描画できる", async () => {
    // 準備
    const screen = await render(
      <Autocomplete items={items} itemToRenderedValue={(item) => `候補: ${item as string}`} />,
    );

    // 実行
    await userEvent.click(screen.getByRole("combobox"));

    // 検証
    await expect.element(screen.getByRole("option", { name: "候補: りんご" })).toBeVisible();
  });

  test("グループ項目をラベル付きで表示する", async () => {
    // 準備
    const screen = await render(
      <Autocomplete items={[{ label: "果物", items: ["りんご", "みかん"] }]} />,
    );

    // 実行
    await userEvent.click(screen.getByRole("combobox"));

    // 検証
    await expect.element(screen.getByText("果物")).toBeVisible();
    await expect.element(screen.getByRole("option", { name: "りんご" })).toBeVisible();
    await expect.element(screen.getByRole("option", { name: "みかん" })).toBeVisible();
  });

  test("ラベルのないグループはラベル要素を表示しない", async () => {
    // 準備
    const screen = await render(<Autocomplete items={[{ items: ["りんご"] }]} />);

    // 実行
    await userEvent.click(screen.getByRole("combobox"));

    // 検証
    expect(screen.container.querySelector(".sui_autocomplete_group_label")).toBeNull();
    await expect.element(screen.getByRole("option", { name: "りんご" })).toBeVisible();
  });

  test("一致する項目がないときに empty を表示する", async () => {
    // 準備
    const screen = await render(<Autocomplete items={items} empty="見つかりません" />);
    await userEvent.click(screen.getByRole("combobox"));
    await expect.element(screen.getByRole("option", { name: "りんご" })).toBeVisible();

    // 実行と検証
    const empty = document.querySelector(".sui_autocomplete_empty");

    expect(empty).not.toBeNull();
    expect(empty!.textContent).toBe("");

    await userEvent.type(screen.getByRole("combobox"), "存在しない項目");

    await expect.element(screen.getByText("見つかりません")).toBeVisible();
  });

  test("startAddons と endAddons をアドオンとして表示する", async () => {
    // 実行
    const screen = await render(
      <Autocomplete items={items} startAddons={["先頭"]} endAddons={["末尾"]} />,
    );

    // 検証
    const input = screen.getByRole("combobox").element();
    const start = screen.getByText("先頭").element().closest(".sui_autocomplete_addon");
    const end = screen.getByText("末尾").element().closest(".sui_autocomplete_addon");

    expect(start).not.toBeNull();
    expect(end).not.toBeNull();
    expect(input.compareDocumentPosition(start!) & Node.DOCUMENT_POSITION_PRECEDING).not.toBe(0);
    expect(input.compareDocumentPosition(end!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
  });

  test("クリアボタンに既定のラベルを付ける", async () => {
    // 準備
    const screen = await render(<Autocomplete items={items} />);

    // 実行
    await userEvent.type(screen.getByRole("combobox"), "り");

    // 検証
    const clear = screen.container.querySelector(".sui_autocomplete_clear");

    expect(clear).not.toBeNull();
    expect(clear!.getAttribute("aria-label")).toBe("クリア");
  });

  test("slotProps.clear でクリアボタンのラベルを上書きできる", async () => {
    // 準備
    const screen = await render(
      <Autocomplete items={items} slotProps={{ clear: { "aria-label": "消去する" } }} />,
    );

    // 実行
    await userEvent.type(screen.getByRole("combobox"), "り");

    // 検証
    const clear = screen.container.querySelector(".sui_autocomplete_clear");

    expect(clear).not.toBeNull();
    expect(clear!.getAttribute("aria-label")).toBe("消去する");
  });

  test("slotProps を各パーツに適用する", async () => {
    // 準備
    const screen = await render(
      <Autocomplete
        items={items}
        slotProps={{
          input: { className: "my-input" },
          item: { className: "my-item" },
          list: { className: "my-list" },
          popup: { className: "my-popup" },
        }}
      />,
    );

    // 実行
    await userEvent.click(screen.getByRole("combobox"));
    await expect.element(screen.getByRole("option", { name: "りんご" })).toBeVisible();

    // 検証
    await expect
      .element(screen.container.querySelector<HTMLElement>(".my-input"))
      .toBeInTheDocument();
    expect(document.querySelector(".my-list")).not.toBeNull();
    expect(document.querySelector(".my-popup")).not.toBeNull();
    await expect.element(screen.getByRole("option", { name: "りんご" })).toHaveClass("my-item");
  });

  test("disabled を指定すると入力欄が無効になる", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} disabled />);

    // 検証
    const group = getGroup(screen);

    await expect.element(screen.getByRole("combobox")).toBeDisabled();
    await expect.element(group).toHaveClass("sui_autocomplete-disabled");
  });
});

describe("AutocompleteParts.Root", () => {
  let captured: Autocomplete.Context | null | undefined;

  function ContextProbe() {
    captured = Autocomplete.useContext(true);
    return null;
  }

  test("Root の外では useContext が null を返す", async () => {
    // 実行
    await render(<ContextProbe />);

    // 検証
    expect(captured).toBeNull();
  });

  test("Root のスタイルプロパティーをコンテキストへ伝える", async () => {
    // 実行
    await render(
      <AutocompletePartsRoot size="lg" color="red" radius="full" variant="naked" outlined>
        <ContextProbe />
      </AutocompletePartsRoot>,
    );

    // 検証
    expect(captured).toStrictEqual({
      size: "lg",
      color: "red",
      radius: "full",
      variant: "naked",
      outlined: true,
    });
  });
});
