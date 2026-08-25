import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import "@suru-ui/theme/suru.css";
import {
  Breadcrumb,
  Link as BreadcrumbPartsLink,
  List as BreadcrumbPartsList,
  Root as BreadcrumbPartsRoot,
  Separator as BreadcrumbPartsSeparator,
} from "../src/breadcrumb/index.js";

const items = [
  { label: "ホーム", href: "#home" },
  { label: "製品", href: "#products" },
  { label: "Suru UI", href: "#suru-ui" },
  { label: "パンくずリスト" },
];

function getRoot(screen: { container: HTMLElement }): HTMLElement | null {
  return screen.container.querySelector<HTMLElement>("nav.sui_breadcrumb");
}

describe("Breadcrumb", () => {
  test("nav 要素を描画する", async () => {
    // 実行
    const screen = await render(<Breadcrumb items={items} />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.tagName).toBe("NAV");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Breadcrumb items={items} />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_breadcrumb-size_md");
    await expect.element(root).toHaveClass("sui_breadcrumb-color_grey");
  });

  test("スタイルプロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(<Breadcrumb items={items} size="lg" color="blue" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_breadcrumb-size_lg");
    await expect.element(root).toHaveClass("sui_breadcrumb-color_blue");
  });

  test("利用者のクラス名を合成する", async () => {
    // 実行
    const screen = await render(<Breadcrumb items={items} className="my-breadcrumb" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("my-breadcrumb");
    await expect.element(root).toHaveClass("sui_breadcrumb");
  });

  test("項目の間にセパレーターを挿入する", async () => {
    // 実行
    const screen = await render(<Breadcrumb items={items} />);

    // 検証
    const separators = screen.container.querySelectorAll(".sui_breadcrumb_separator");

    expect(separators.length).toBe(items.length - 1);
  });

  test("最後の項目を現在位置として描画する", async () => {
    // 実行
    const screen = await render(<Breadcrumb items={items} />);

    // 検証
    const current = screen.container.querySelector<HTMLElement>(".sui_breadcrumb_link-current");

    expect(current).not.toBeNull();
    expect(current!.tagName).toBe("SPAN");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current!.textContent).toBe("パンくずリスト");
  });

  test("href を持つ項目をリンクとして描画する", async () => {
    // 実行
    const screen = await render(<Breadcrumb items={items} />);

    // 検証
    const links = screen.container.querySelectorAll("a.sui_breadcrumb_link");

    expect(links.length).toBe(items.length - 1);
    expect(links[0]).toHaveAttribute("href", "#home");
  });

  test("current を指定した項目を現在位置として描画する", async () => {
    // 準備
    const currentItems = [
      { label: "ホーム", href: "#home" },
      { label: "製品", href: "#products" },
      { label: "Suru UI", current: true },
    ];

    // 実行
    const screen = await render(<Breadcrumb items={currentItems} />);

    // 検証
    const currents = screen.container.querySelectorAll(".sui_breadcrumb_link-current");

    expect(currents.length).toBe(1);
    expect(currents[0]!.textContent).toBe("Suru UI");
  });

  test("slotProps のクラス名を各パーツへ適用できる", async () => {
    // 実行
    const screen = await render(
      <Breadcrumb
        items={items}
        slotProps={{
          list: { className: "my-list" },
          item: { className: "my-item" },
          link: { className: "my-link" },
          separator: { className: "my-separator" },
        }}
      />,
    );

    // 検証
    const list = screen.container.querySelector<HTMLElement>(".sui_breadcrumb_list");
    const item = screen.container.querySelector<HTMLElement>(".sui_breadcrumb_item");
    const link = screen.container.querySelector<HTMLElement>(".sui_breadcrumb_link");
    const separator = screen.container.querySelector<HTMLElement>(".sui_breadcrumb_separator");

    await expect.element(list).toHaveClass("my-list");
    await expect.element(item).toHaveClass("my-item");
    await expect.element(link).toHaveClass("my-link");
    await expect.element(separator).toHaveClass("my-separator");
  });
});

describe("BreadcrumbParts.Root", () => {
  test("既定の aria-label を適用する", async () => {
    // 実行
    const screen = await render(
      <BreadcrumbPartsRoot>
        <BreadcrumbPartsList />
      </BreadcrumbPartsRoot>,
    );

    // 検証
    const root = getRoot(screen);

    expect(root).toHaveAttribute("aria-label", "パンくずリスト");
  });
});

describe("BreadcrumbParts.Link", () => {
  test("グループ外ではアンカーとして描画される", async () => {
    // 実行
    const screen = await render(<BreadcrumbPartsLink href="#home">ホーム</BreadcrumbPartsLink>);

    // 検証
    const link = screen.container.querySelector<HTMLElement>(".sui_breadcrumb_link");

    expect(link!.tagName).toBe("A");
    expect(link).not.toHaveAttribute("aria-current");
  });

  test("current を指定すると現在位置として描画される", async () => {
    // 実行
    const screen = await render(<BreadcrumbPartsLink current>ホーム</BreadcrumbPartsLink>);

    // 検証
    const link = screen.container.querySelector<HTMLElement>(".sui_breadcrumb_link-current");

    expect(link!.tagName).toBe("SPAN");
    expect(link).toHaveAttribute("aria-current", "page");
  });
});

describe("BreadcrumbParts.Separator", () => {
  test("装飾要素として隠す", async () => {
    // 実行
    const screen = await render(<BreadcrumbPartsSeparator />);

    // 検証
    const separator = screen.container.querySelector<HTMLElement>(".sui_breadcrumb_separator");

    expect(separator).toHaveAttribute("aria-hidden", "true");
  });

  test("子要素でアイコンを上書きできる", async () => {
    // 実行
    const screen = await render(<BreadcrumbPartsSeparator>／</BreadcrumbPartsSeparator>);

    // 検証
    const separator = screen.container.querySelector<HTMLElement>(".sui_breadcrumb_separator");

    expect(separator!.textContent).toBe("／");
  });
});
