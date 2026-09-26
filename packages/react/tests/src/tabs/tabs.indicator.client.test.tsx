import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { TabsIndicator } from "../../../src/tabs/tabs.indicator.jsx";
import { TabsList } from "../../../src/tabs/tabs.list.jsx";
import { TabsRoot } from "../../../src/tabs/tabs.root.jsx";
import { TabsTab } from "../../../src/tabs/tabs.tab.jsx";
import "../_locators.js";

describe("TabsIndicator", () => {
  test("選択中のタブの位置に追従する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TabsRoot defaultValue="projects">
        <TabsList>
          <TabsTab value="overview">概要</TabsTab>
          <TabsTab value="projects">プロジェクト</TabsTab>
          <TabsIndicator />
        </TabsList>
      </TabsRoot>,
    );

    // 検証
    const indicator = screen.getByRole("presentation").element();
    expect(indicator.tagName).toBe("SPAN");
    expect(indicator.classList.contains("sui_tabs_indicator")).toBe(true);
    await vi.waitFor(() => {
      expect(indicator.hasAttribute("hidden")).toBe(false);
    });
    const active = screen.getByRole("tab", { name: "プロジェクト" }).element();
    expect(Number.parseFloat(indicator.style.getPropertyValue("--active-tab-width"))).toBeCloseTo(
      active.getBoundingClientRect().width,
      1,
    );
  });

  test("選択を変えると位置を移す", async ({ expect }) => {
    // 準備
    const screen = await render(
      <TabsRoot defaultValue="overview">
        <TabsList>
          <TabsTab value="overview">概要</TabsTab>
          <TabsTab value="projects">プロジェクト</TabsTab>
          <TabsIndicator />
        </TabsList>
      </TabsRoot>,
    );
    const indicator = screen.getByRole("presentation").element();

    // 実行
    await screen.getByRole("tab", { name: "プロジェクト" }).click();

    // 検証
    const active = screen.getByRole("tab", { name: "プロジェクト" }).element();
    await vi.waitFor(() => {
      expect(Number.parseFloat(indicator.style.getPropertyValue("--active-tab-width"))).toBeCloseTo(
        active.getBoundingClientRect().width,
        1,
      );
    });
    expect(active.classList.contains("sui_tabs_tab-active")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TabsRoot defaultValue="overview">
        <TabsList>
          <TabsTab value="overview">概要</TabsTab>
          <TabsIndicator className="custom" />
        </TabsList>
      </TabsRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_tabs_indicator").element().classList.contains("custom")).toBe(
      true,
    );
  });
});
