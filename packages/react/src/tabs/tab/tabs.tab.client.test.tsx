import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { TabsList } from "../list/tabs.list.jsx";
import { TabsRoot } from "../root/tabs.root.jsx";
import { TabsTab } from "./tabs.tab.jsx";
import "../../../tests/src/_locators.js";

describe("TabsTab", () => {
  test("タブとして描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TabsRoot>
        <TabsList>
          <TabsTab value="overview">概要</TabsTab>
        </TabsList>
      </TabsRoot>,
    );

    // 検証。
    const tab = screen.getByRole("tab").element();
    expect(tab.tagName).toBe("BUTTON");
    expect(tab.classList.contains("sui_tabs_tab")).toBe(true);
  });

  test("選択中のタブに状態クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TabsRoot defaultValue="projects">
        <TabsList>
          <TabsTab value="overview">概要</TabsTab>
          <TabsTab value="projects">プロジェクト</TabsTab>
        </TabsList>
      </TabsRoot>,
    );

    // 検証。
    const active = screen.getByRole("tab", { name: "プロジェクト" }).element();
    expect(active.classList.contains("sui_tabs_tab-active")).toBe(true);
    expect(
      screen.getByRole("tab", { name: "概要" }).element().classList.contains("sui_tabs_tab-active"),
    ).toBe(false);
  });

  test("無効なタブに状態クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TabsRoot>
        <TabsList>
          <TabsTab value="overview" disabled>
            概要
          </TabsTab>
        </TabsList>
      </TabsRoot>,
    );

    // 検証。
    const tab = screen.getByRole("tab", { name: "概要" }).element();
    expect(tab.classList.contains("sui_tabs_tab-disabled")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TabsRoot>
        <TabsList>
          <TabsTab value="overview" render={<span />} nativeButton={false}>
            概要
          </TabsTab>
        </TabsList>
      </TabsRoot>,
    );

    // 検証。
    expect(screen.getByRole("tab").element().tagName).toBe("SPAN");
  });

  test("render と className の関数へスタイル情報とタブの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TabsRoot size="lg" defaultValue="overview">
        <TabsList>
          <TabsTab
            value="overview"
            render={(props, state) => (
              <span {...props} data-probe={`${state.size}/${state.active}/${state.disabled}`} />
            )}
            className={(state) => (state.active ? "probe-active" : undefined)}
            nativeButton={false}
          >
            概要
          </TabsTab>
        </TabsList>
      </TabsRoot>,
    );

    // 検証。
    const tab = screen.getByRole("tab").element();
    expect(tab.tagName).toBe("SPAN");
    expect(tab.getAttribute("data-probe")).toBe("lg/true/false");
    expect(tab.classList.contains("probe-active")).toBe(true);
  });
});
