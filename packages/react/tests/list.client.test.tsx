import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import "@suru-ui/theme/suru.css";
import { List, Item as ListPartsItem, Indicator as ListPartsIndicator } from "../src/list/index.js";

function getRoot(screen: { container: HTMLElement }): HTMLElement | null {
  return screen.container.querySelector<HTMLElement>(":scope > .sui_list");
}

function getItem(screen: { container: HTMLElement }): HTMLElement | null {
  return screen.container.querySelector<HTMLElement>("li.sui_list_item");
}

function getIndicator(screen: { container: HTMLElement }): HTMLElement | null {
  return screen.container.querySelector<HTMLElement>("span.sui_list_item_indicator");
}

describe("List", () => {
  test("ul 要素を描画する", async () => {
    // 実行
    const screen = await render(
      <List>
        <List.Item>項目</List.Item>
      </List>,
    );

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.tagName).toBe("UL");
  });

  test("ordered を有効にすると ol 要素を描画する", async () => {
    // 実行
    const screen = await render(
      <List ordered>
        <List.Item>項目</List.Item>
      </List>,
    );

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.tagName).toBe("OL");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(
      <List>
        <List.Item>項目</List.Item>
      </List>,
    );

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_list");
    await expect.element(root!).toHaveClass("sui_list-size_md");
    await expect.element(root!).not.toHaveClass("sui_list-ordered");
  });

  test("ordered を有効にすると順序付きリストのクラスを付ける", async () => {
    // 実行
    const screen = await render(
      <List ordered>
        <List.Item>項目</List.Item>
      </List>,
    );

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_list-ordered");
  });

  test("size プロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(
      <List size="lg">
        <List.Item>項目</List.Item>
      </List>,
    );

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_list-size_lg");
  });
});

describe("ListItemParts.Item", () => {
  test("li 要素を描画する", async () => {
    // 実行
    const screen = await render(<ListPartsItem>項目</ListPartsItem>);

    // 検証
    const item = getItem(screen);

    expect(item).not.toBeNull();
    expect(item!.tagName).toBe("LI");
    expect(item!.textContent).toBe("項目");
  });

  test("リスト外では既定のサイズクラスを適用する", async () => {
    // 実行
    const screen = await render(<ListPartsItem>項目</ListPartsItem>);

    // 検証
    const item = getItem(screen);

    expect(item).not.toBeNull();
    await expect.element(item!).toHaveClass("sui_list_item");
    await expect.element(item!).toHaveClass("sui_list_item-size_md");
  });

  test("親リストのサイズを継承する", async () => {
    // 実行
    const screen = await render(
      <List size="sm">
        <List.Item>項目</List.Item>
      </List>,
    );

    // 検証
    const item = getItem(screen);

    expect(item).not.toBeNull();
    await expect.element(item!).toHaveClass("sui_list_item-size_sm");
  });

  test("size プロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(<ListPartsItem size="lg">項目</ListPartsItem>);

    // 検証
    const item = getItem(screen);

    expect(item).not.toBeNull();
    await expect.element(item!).toHaveClass("sui_list_item-size_lg");
  });

  test("disabled を有効にすると無効状態のクラスを付ける", async () => {
    // 実行
    const screen = await render(<ListPartsItem disabled>項目</ListPartsItem>);

    // 検証
    const item = getItem(screen);

    expect(item).not.toBeNull();
    await expect.element(item!).toHaveClass("sui_list_item-disabled");
  });
});

describe("ListParts.Indicator", () => {
  test("span 要素を描画する", async () => {
    // 実行
    const screen = await render(<ListPartsIndicator>*</ListPartsIndicator>);

    // 検証
    const indicator = getIndicator(screen);

    expect(indicator).not.toBeNull();
    expect(indicator!.tagName).toBe("SPAN");
    expect(indicator!.textContent).toBe("*");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<ListPartsIndicator>*</ListPartsIndicator>);

    // 検証
    const indicator = getIndicator(screen);

    expect(indicator).not.toBeNull();
    await expect.element(indicator!).toHaveClass("sui_list_item_indicator");
  });
});

describe("List.Item", () => {
  test("静的メンバー経由でアイテムを描画できる", async () => {
    // 実行
    const screen = await render(
      <List>
        <List.Item>項目</List.Item>
      </List>,
    );

    // 検証
    const item = getItem(screen);

    expect(item).not.toBeNull();
    expect(item!.textContent).toBe("項目");
  });
});

describe("List.Indicator", () => {
  test("静的メンバー経由でインジケーターを描画できる", async () => {
    // 実行
    const screen = await render(
      <List>
        <List.Item>
          <List.Indicator>-</List.Indicator>
          項目
        </List.Item>
      </List>,
    );

    // 検証
    const item = getItem(screen);
    const indicator = getIndicator(screen);

    expect(indicator).not.toBeNull();
    expect(item!.contains(indicator!)).toBe(true);
  });
});
