import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { TabsIndicator } from "../../../src/tabs/tabs.indicator.jsx";
import { TabsList } from "../../../src/tabs/tabs.list.jsx";
import { TabsRoot } from "../../../src/tabs/tabs.root.jsx";
import { TabsTab } from "../../../src/tabs/tabs.tab.jsx";
import "../_locators.js";

describe("TabsIndicator", () => {
  test("インジケーターとして描画する", async ({ expect }) => {
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

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TabsRoot defaultValue="overview" size="lg" variant="segments">
        <TabsList>
          <TabsTab value="overview">概要</TabsTab>
          <TabsIndicator
            render={(props, state) => (
              <span {...props} data-probe={`${state.size}/${state.variant}/${state.orientation}`} />
            )}
          />
        </TabsList>
      </TabsRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_tabs_indicator").element().getAttribute("data-probe")).toBe(
      "lg/segments/horizontal",
    );
  });
});
