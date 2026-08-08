import type { ReactNode } from "react";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Accordion } from "../../src/navigation/accordion/index.js";
import * as AccordionParts from "../../src/navigation/accordion/index.js";
import { clickElement } from "../_click.js";

function accordionItems(): ReactNode[] {
  return [
    <AccordionParts.Item key="a" value="a">
      <AccordionParts.Header>
        <AccordionParts.Trigger>項目A</AccordionParts.Trigger>
      </AccordionParts.Header>
      <AccordionParts.Panel>内容A</AccordionParts.Panel>
    </AccordionParts.Item>,
    <AccordionParts.Item key="b" value="b">
      <AccordionParts.Header>
        <AccordionParts.Trigger>項目B</AccordionParts.Trigger>
      </AccordionParts.Header>
      <AccordionParts.Panel>内容B</AccordionParts.Panel>
    </AccordionParts.Item>,
  ];
}

describe("Accordion", () => {
  test("見出しをトリガーとしてレンダリングする", async () => {
    // 実行
    const screen = await render(<Accordion title="見出し">コンテンツ</Accordion>);

    // 検証
    const trigger = screen.getByRole("button", { name: "見出し" });

    await expect.element(trigger).toHaveClass("sui_accordion_trigger");
    await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Accordion title="見出し">コンテンツ</Accordion>);

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_accordion");

    await expect.element(root).toHaveClass("sui_accordion");
    await expect.element(root).toHaveClass("sui_accordion-divider");
    await expect.element(root).toHaveClass("sui_accordion-outlined");
    await expect.element(root).toHaveClass("sui_accordion-radius_md");
    await expect.element(root).toHaveClass("sui_accordion-size_md");
  });

  test("size・radius・outlined・divider を指定できる", async () => {
    // 実行
    const screen = await render(
      <Accordion title="見出し" size="lg" radius="none" outlined={false} divider={false}>
        コンテンツ
      </Accordion>,
    );

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_accordion");

    await expect.element(root).toHaveClass("sui_accordion-size_lg");
    await expect.element(root).toHaveClass("sui_accordion-radius_none");
    await expect.element(root).not.toHaveClass("sui_accordion-divider");
    await expect.element(root).not.toHaveClass("sui_accordion-outlined");
  });

  test("クリックするとパネルが開き、再クリックで閉じる", async () => {
    // 実行
    const screen = await render(<Accordion title="見出し">コンテンツ</Accordion>);
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

  test("開いたパネルは region としてラベル付けされる", async () => {
    // 実行
    const screen = await render(
      <Accordion title="見出し" defaultValue={["panel"]} slotProps={{ item: { value: "panel" } }}>
        コンテンツ
      </Accordion>,
    );

    // 検証
    const panel = screen.getByRole("region", { name: "見出し" });

    await expect.element(panel).toHaveClass("sui_accordion_panel");
  });

  test("defaultValue で初期表示を指定できる", async () => {
    // 実行
    const screen = await render(
      <Accordion title="見出し" defaultValue={["panel"]} slotProps={{ item: { value: "panel" } }}>
        コンテンツ
      </Accordion>,
    );

    // 検証
    const trigger = screen.getByRole("button", { name: "見出し" });

    await expect.element(trigger).toHaveAttribute("aria-expanded", "true");
    await expect.element(screen.getByText("コンテンツ")).toBeVisible();
  });

  test("value で開閉を制御できる", async () => {
    // 実行
    const screen = await render(
      <Accordion title="見出し" value={["panel"]} slotProps={{ item: { value: "panel" } }}>
        コンテンツ
      </Accordion>,
    );

    // 検証
    await expect.element(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");

    // 実行
    await screen.rerender(
      <Accordion title="見出し" value={[]} slotProps={{ item: { value: "panel" } }}>
        コンテンツ
      </Accordion>,
    );

    // 検証
    await expect.element(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });

  test("onValueChange が開閉状態を通知する", async () => {
    // 準備
    const changes: unknown[] = [];

    // 実行
    const screen = await render(
      <Accordion
        title="見出し"
        slotProps={{ item: { value: "panel" } }}
        onValueChange={(value) => {
          changes.push(value);
        }}
      >
        コンテンツ
      </Accordion>,
    );
    const trigger = screen.getByRole("button");
    clickElement(trigger);
    await expect.element(trigger).toHaveAttribute("aria-expanded", "true");
    clickElement(trigger);
    await expect.element(trigger).toHaveAttribute("aria-expanded", "false");

    // 検証
    expect(changes).toStrictEqual([["panel"], []]);
  });

  test("disabled を指定すると無効化される", async () => {
    // 準備
    const changes: unknown[] = [];

    // 実行
    const screen = await render(
      <Accordion
        title="見出し"
        disabled
        slotProps={{ item: { value: "panel" } }}
        onValueChange={(value) => {
          changes.push(value);
        }}
      >
        コンテンツ
      </Accordion>,
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
      <Accordion title="見出し" slotProps={{ indicator: { children: "▼" } }}>
        コンテンツ
      </Accordion>,
    );

    // 検証
    const indicator = screen.container.querySelector<HTMLElement>(".sui_accordion_indicator");

    await expect.element(indicator).toBeInTheDocument();
    await expect.element(indicator).toHaveTextContent("▼");
  });
});

describe("AccordionParts.Root", () => {
  test("既定では複数の項目を同時に開けない", async () => {
    // 実行
    const screen = await render(<AccordionParts.Root>{accordionItems()}</AccordionParts.Root>);
    const triggerA = screen.getByRole("button", { name: "項目A" });
    const triggerB = screen.getByRole("button", { name: "項目B" });
    clickElement(triggerA);
    await expect.element(triggerA).toHaveAttribute("aria-expanded", "true");
    clickElement(triggerB);

    // 検証
    await expect.element(triggerA).toHaveAttribute("aria-expanded", "false");
    await expect.element(triggerB).toHaveAttribute("aria-expanded", "true");
  });

  test("multiple を指定すると複数の項目を同時に開ける", async () => {
    // 実行
    const screen = await render(
      <AccordionParts.Root multiple>{accordionItems()}</AccordionParts.Root>,
    );
    const triggerA = screen.getByRole("button", { name: "項目A" });
    const triggerB = screen.getByRole("button", { name: "項目B" });
    clickElement(triggerA);
    await expect.element(triggerA).toHaveAttribute("aria-expanded", "true");
    clickElement(triggerB);

    // 検証
    await expect.element(triggerA).toHaveAttribute("aria-expanded", "true");
    await expect.element(triggerB).toHaveAttribute("aria-expanded", "true");
  });
});
