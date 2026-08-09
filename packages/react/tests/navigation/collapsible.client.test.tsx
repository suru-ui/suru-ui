import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Collapsible } from "../../src/navigation/collapsible/index.js";
import * as CollapsibleParts from "../../src/navigation/collapsible/index.js";
import { clickElement } from "../_click.js";

describe("Collapsible", () => {
  test("見出しをトリガーとしてレンダリングする", async () => {
    // 実行
    const screen = await render(<Collapsible title="見出し">コンテンツ</Collapsible>);

    // 検証
    const trigger = screen.getByRole("button", { name: "見出し" });

    await expect.element(trigger).toHaveClass("sui_collapsible_trigger");
    await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Collapsible title="見出し">コンテンツ</Collapsible>);

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_collapsible");

    await expect.element(root).toHaveClass("sui_collapsible");
    await expect.element(root).not.toHaveClass("sui_collapsible-outlined");
    await expect.element(root).toHaveClass("sui_collapsible-radius_md");
    await expect.element(root).toHaveClass("sui_collapsible-size_md");
  });

  test("size・radius・outlined を指定できる", async () => {
    // 実行
    const screen = await render(
      <Collapsible title="見出し" size="lg" radius="none" outlined={false}>
        コンテンツ
      </Collapsible>,
    );

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_collapsible");

    await expect.element(root).toHaveClass("sui_collapsible-size_lg");
    await expect.element(root).toHaveClass("sui_collapsible-radius_none");
    await expect.element(root).not.toHaveClass("sui_collapsible-outlined");
  });

  test("クリックするとパネルが開き、再クリックで閉じる", async () => {
    // 実行
    const screen = await render(<Collapsible title="見出し">コンテンツ</Collapsible>);
    const trigger = screen.getByRole("button", { name: "見出し" });
    clickElement(trigger);

    // 検証
    await expect.element(trigger).toHaveAttribute("aria-expanded", "true");
    await expect.element(trigger).toHaveAttribute("data-panel-open", "");
    await expect.element(screen.getByText("コンテンツ")).toBeVisible();

    // 実行
    clickElement(trigger);

    // 検証
    await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
    await expect.element(screen.getByText("コンテンツ")).not.toBeInTheDocument();
  });

  test("defaultOpen で初期表示を指定できる", async () => {
    // 実行
    const screen = await render(
      <Collapsible title="見出し" defaultOpen>
        コンテンツ
      </Collapsible>,
    );

    // 検証
    await expect
      .element(screen.getByRole("button", { name: "見出し" }))
      .toHaveAttribute("aria-expanded", "true");
    await expect.element(screen.getByText("コンテンツ")).toBeVisible();
  });

  test("open で開閉を制御できる", async () => {
    // 実行
    const screen = await render(
      <Collapsible title="見出し" open>
        コンテンツ
      </Collapsible>,
    );

    // 検証
    const trigger = screen.getByRole("button", { name: "見出し" });
    await expect.element(trigger).toHaveAttribute("aria-expanded", "true");

    // 実行
    await screen.rerender(
      <Collapsible title="見出し" open={false}>
        コンテンツ
      </Collapsible>,
    );

    // 検証
    await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("onOpenChange が開閉状態を通知する", async () => {
    // 準備
    const changes: boolean[] = [];

    // 実行
    const screen = await render(
      <Collapsible
        title="見出し"
        onOpenChange={(open) => {
          changes.push(open);
        }}
      >
        コンテンツ
      </Collapsible>,
    );
    const trigger = screen.getByRole("button", { name: "見出し" });
    clickElement(trigger);
    await expect.element(trigger).toHaveAttribute("aria-expanded", "true");
    clickElement(trigger);
    await expect.element(trigger).toHaveAttribute("aria-expanded", "false");

    // 検証
    expect(changes).toStrictEqual([true, false]);
  });

  test("disabled を指定すると無効化される", async () => {
    // 準備
    const changes: boolean[] = [];

    // 実行
    const screen = await render(
      <Collapsible
        title="見出し"
        disabled
        onOpenChange={(open) => {
          changes.push(open);
        }}
      >
        コンテンツ
      </Collapsible>,
    );
    const trigger = screen.getByRole("button", { name: "見出し" });

    // 検証
    await expect.element(trigger).toBeDisabled();
    await expect.element(trigger).toHaveAttribute("data-disabled", "");

    // 実行
    clickElement(trigger);

    // 検証
    expect(changes).toStrictEqual([]);
  });

  test("slotProps で Indicator を差し替えられる", async () => {
    // 実行
    const screen = await render(
      <Collapsible title="見出し" slotProps={{ indicator: { children: "▼" } }}>
        コンテンツ
      </Collapsible>,
    );

    // 検証
    const indicator = screen.container.querySelector<HTMLElement>(".sui_collapsible_indicator");

    await expect.element(indicator).toBeInTheDocument();
    await expect.element(indicator).toHaveTextContent("▼");
  });
});

describe("CollapsibleParts.Root", () => {
  test("Root、Trigger、Panel を組み合わせて表示できる", async () => {
    // 実行
    const screen = await render(
      <CollapsibleParts.Root>
        <CollapsibleParts.Trigger>
          {(triggerProps) => <button {...triggerProps}>見出し</button>}
        </CollapsibleParts.Trigger>
        <CollapsibleParts.Panel>コンテンツ</CollapsibleParts.Panel>
      </CollapsibleParts.Root>,
    );

    // 検証
    await expect.element(screen.getByRole("button", { name: "見出し" })).toBeInTheDocument();
    await expect.element(screen.getByText("コンテンツ")).not.toBeInTheDocument();
  });
});
