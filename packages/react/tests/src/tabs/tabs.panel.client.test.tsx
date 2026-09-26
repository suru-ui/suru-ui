import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { TabsList } from "../../../src/tabs/tabs.list.jsx";
import { TabsPanel } from "../../../src/tabs/tabs.panel.jsx";
import { TabsRoot } from "../../../src/tabs/tabs.root.jsx";
import { TabsTab } from "../../../src/tabs/tabs.tab.jsx";
import "../_locators.js";

describe("TabsPanel", () => {
  test("選択中のタブに対応するパネルだけを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TabsRoot defaultValue="overview">
        <TabsList>
          <TabsTab value="overview">概要</TabsTab>
          <TabsTab value="projects">プロジェクト</TabsTab>
        </TabsList>
        <TabsPanel value="overview">概要の内容</TabsPanel>
        <TabsPanel value="projects">プロジェクトの内容</TabsPanel>
      </TabsRoot>,
    );

    // 検証
    const panel = screen.getByRole("tabpanel").element();
    expect(panel.classList.contains("sui_tabs_panel")).toBe(true);
    expect(panel.textContent).toBe("概要の内容");
    expect(screen.getByText("プロジェクトの内容").query()).toBe(null);
  });

  test("タブを選ぶと表示するパネルを切り替える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <TabsRoot defaultValue="overview">
        <TabsList>
          <TabsTab value="overview">概要</TabsTab>
          <TabsTab value="projects">プロジェクト</TabsTab>
        </TabsList>
        <TabsPanel value="overview">概要の内容</TabsPanel>
        <TabsPanel value="projects">プロジェクトの内容</TabsPanel>
      </TabsRoot>,
    );

    // 実行
    await screen.getByRole("tab", { name: "プロジェクト" }).click();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("tabpanel", { name: "プロジェクト" }).element().textContent).toBe(
        "プロジェクトの内容",
      );
    });
  });

  test("keepMounted を指定すると非表示のパネルを残す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TabsRoot defaultValue="overview">
        <TabsList>
          <TabsTab value="overview">概要</TabsTab>
          <TabsTab value="projects">プロジェクト</TabsTab>
        </TabsList>
        <TabsPanel keepMounted value="overview">
          概要の内容
        </TabsPanel>
        <TabsPanel keepMounted value="projects">
          プロジェクトの内容
        </TabsPanel>
      </TabsRoot>,
    );

    // 検証
    const panels = screen.getByClassName("sui_tabs_panel").elements();
    expect(panels.length).toBe(2);
    expect(panels.at(1)?.hasAttribute("hidden")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TabsRoot defaultValue="overview">
        <TabsList>
          <TabsTab value="overview">概要</TabsTab>
        </TabsList>
        <TabsPanel className="custom" value="overview">
          概要の内容
        </TabsPanel>
      </TabsRoot>,
    );

    // 検証
    expect(screen.getByRole("tabpanel").element().classList.contains("custom")).toBe(true);
  });
});
