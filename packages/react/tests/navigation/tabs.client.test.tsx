import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Tabs } from "../../src/navigation/tabs/index.js";
import * as TabsParts from "../../src/navigation/tabs/index.js";
import { clickElement } from "../_click.js";

function tabs() {
  return (
    <>
      <TabsParts.List>
        <TabsParts.Tab value="overview">概要</TabsParts.Tab>
        <TabsParts.Tab value="projects">プロジェクト</TabsParts.Tab>
        <TabsParts.Indicator />
      </TabsParts.List>
      <TabsParts.Panel value="overview">概要の内容</TabsParts.Panel>
      <TabsParts.Panel value="projects">プロジェクトの内容</TabsParts.Panel>
    </>
  );
}

describe("Tabs", () => {
  test("Tab と対応するパネルをレンダリングする", async () => {
    // 実行
    const screen = await render(<Tabs defaultValue="overview">{tabs()}</Tabs>);

    // 検証
    await expect
      .element(screen.getByRole("tab", { name: "概要" }))
      .toHaveAttribute("aria-selected", "true");
    await expect.element(screen.getByRole("tabpanel")).toHaveTextContent("概要の内容");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_tabs_indicator"))
      .toBeInTheDocument();
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Tabs>{tabs()}</Tabs>);

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_tabs");

    await expect.element(root).toHaveClass("sui_tabs");
    await expect.element(root).toHaveClass("sui_tabs-orientation_horizontal");
    await expect.element(root).toHaveClass("sui_tabs-radius_md");
    await expect.element(root).toHaveClass("sui_tabs-size_md");
    await expect.element(root).not.toHaveClass("sui_tabs-outlined");
  });

  test("size・radius・outlined・orientation を指定できる", async () => {
    // 実行
    const screen = await render(
      <Tabs size="lg" radius="none" outlined orientation="vertical">
        {tabs()}
      </Tabs>,
    );

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_tabs");

    await expect.element(root).toHaveClass("sui_tabs-size_lg");
    await expect.element(root).toHaveClass("sui_tabs-radius_none");
    await expect.element(root).toHaveClass("sui_tabs-outlined");
    await expect.element(root).toHaveClass("sui_tabs-orientation_vertical");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_tabs_list"))
      .toHaveAttribute("data-orientation", "vertical");
  });

  test("Tab をクリックすると対応するパネルへ切り替わる", async () => {
    // 実行
    const screen = await render(<Tabs defaultValue="overview">{tabs()}</Tabs>);
    const projects = screen.getByRole("tab", { name: "プロジェクト" });
    clickElement(projects);

    // 検証
    await expect.element(projects).toHaveAttribute("aria-selected", "true");
    await expect.element(screen.getByRole("tabpanel")).toHaveTextContent("プロジェクトの内容");
  });

  test("disabled の Tab は選択できない", async () => {
    // 実行
    const screen = await render(
      <Tabs defaultValue="overview">
        <TabsParts.List>
          <TabsParts.Tab value="overview">概要</TabsParts.Tab>
          <TabsParts.Tab value="projects" disabled>
            プロジェクト
          </TabsParts.Tab>
          <TabsParts.Indicator />
        </TabsParts.List>
        <TabsParts.Panel value="overview">概要の内容</TabsParts.Panel>
        <TabsParts.Panel value="projects">プロジェクトの内容</TabsParts.Panel>
      </Tabs>,
    );
    const projects = screen.getByRole("tab", { name: "プロジェクト" });

    // 検証
    await expect.element(projects).toBeDisabled();
    await expect.element(projects).toHaveAttribute("data-disabled", "");

    // 実行
    clickElement(projects);

    // 検証
    await expect.element(projects).toHaveAttribute("aria-selected", "false");
  });
});

describe("TabsParts", () => {
  test("各パーツのクラス名を適用する", async () => {
    // 実行
    const screen = await render(
      <TabsParts.Root>
        <TabsParts.List>
          <TabsParts.Tab value="a">項目 A</TabsParts.Tab>
          <TabsParts.Indicator />
        </TabsParts.List>
        <TabsParts.Panel value="a">内容 A</TabsParts.Panel>
      </TabsParts.Root>,
    );

    // 検証
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_tabs_list"))
      .toBeInTheDocument();
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_tabs_tab"))
      .toHaveClass("sui_tabs_tab");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_tabs_panel"))
      .toHaveClass("sui_tabs_panel");
  });
});
