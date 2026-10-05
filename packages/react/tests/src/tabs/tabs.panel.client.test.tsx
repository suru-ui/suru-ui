import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { TabsList } from "../../../src/tabs/list/tabs.list.jsx";
import { TabsPanel } from "../../../src/tabs/panel/tabs.panel.jsx";
import { TabsRoot } from "../../../src/tabs/root/tabs.root.jsx";
import { TabsTab } from "../../../src/tabs/tab/tabs.tab.jsx";
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

  test("render の関数へスタイル情報とパネルの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TabsRoot defaultValue="overview" size="lg">
        <TabsList>
          <TabsTab value="overview">概要</TabsTab>
        </TabsList>
        <TabsPanel
          value="overview"
          render={(props, state) => (
            <div {...props} data-probe={`${state.size}/${String(state.hidden)}`} />
          )}
        >
          概要の内容
        </TabsPanel>
      </TabsRoot>,
    );

    // 検証
    expect(screen.getByRole("tabpanel").element().getAttribute("data-probe")).toBe("lg/false");
  });
});
