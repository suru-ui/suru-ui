import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { Tabs, TabsAPI, useTabsAPI } from "../../../src/tabs/tabs.jsx";
import "../_locators.js";

const items = [
  { label: "概要", value: "overview", content: "概要の内容" },
  { label: "プロジェクト", value: "projects", content: "プロジェクトの内容" },
  { label: "アカウント", value: "account" },
] as const;

describe("Tabs", () => {
  test("項目を並べて既定の選択を反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Tabs defaultValue="projects" items={[...items]} />);

    // 検証
    expect(screen.getByRole("tablist").element().getAttribute("aria-label")).toBe("タブ");
    const tabs = screen.getByRole("tab").elements();
    expect(tabs.map((tab) => tab.textContent)).toStrictEqual([
      "概要",
      "プロジェクト",
      "アカウント",
    ]);
    expect(
      screen
        .getByRole("tab", { name: "プロジェクト" })
        .element()
        .classList.contains("sui_tabs_tab-active"),
    ).toBe(true);
    expect(screen.getByClassName("sui_tabs_indicator").query()).not.toBe(null);
    expect(screen.getByRole("tabpanel").element().textContent).toBe("プロジェクトの内容");
  });

  test("項目を押すと選択が移りイベントを呼ぶ", async ({ expect }) => {
    // 準備
    const onValueChange = vi.fn<(value: unknown, details: unknown) => void>();
    const screen = await render(
      <Tabs defaultValue="overview" items={[...items]} onValueChange={onValueChange} />,
    );

    // 実行
    await screen.getByRole("tab", { name: "アカウント" }).click();

    // 検証
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("account", expect.anything());
    expect(
      screen
        .getByRole("tab", { name: "アカウント" })
        .element()
        .classList.contains("sui_tabs_tab-active"),
    ).toBe(true);
  });

  test("制御値に追従する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Tabs items={[...items]} value="projects" />);

    // 実行
    await screen.getByRole("tab", { name: "概要" }).click();

    // 検証
    expect(
      screen.getByRole("tab", { name: "プロジェクト" }).element().getAttribute("aria-selected"),
    ).toBe("true");
  });

  test("slotProps を各パーツへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Tabs
        defaultValue="overview"
        items={[...items]}
        slotProps={{
          indicator: { className: "custom-indicator" },
          list: { "aria-label": "表示切り替え", id: "views" },
          panel: { className: "custom-panel", keepMounted: true },
          tab: { className: "custom-tab" },
        }}
      />,
    );

    // 検証
    expect(screen.getByRole("tablist", { name: "表示切り替え" }).element().id).toBe("views");
    expect(screen.container.querySelectorAll(".custom-tab").length).toBe(3);
    expect(screen.container.querySelectorAll(".custom-panel").length).toBe(2);
    expect(
      screen.getByClassName("sui_tabs_indicator").element().classList.contains("custom-indicator"),
    ).toBe(true);
  });

  test("項目ごとの disabled をタブへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Tabs
        items={[
          { label: "概要", value: "overview" },
          { disabled: true, label: "プロジェクト", value: "projects" },
        ]}
      />,
    );

    // 検証
    expect(
      screen.getByRole("tab", { name: "プロジェクト" }).element().getAttribute("aria-disabled"),
    ).toBe("true");
  });

  test("内容のない項目にはパネルを作らない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Tabs
        defaultValue="overview"
        items={[
          { label: "概要", value: "overview", content: "概要の内容" },
          { label: "アカウント", value: "account" },
        ]}
      />,
    );

    // 検証
    expect(screen.getByRole("tab").elements().length).toBe(2);
    expect(screen.getByRole("tabpanel").elements().length).toBe(1);
  });

  test("プリミティブな項目も描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Tabs items={["overview", "projects"]} />);

    // 検証
    const tabs = screen.getByRole("tab").elements();
    expect(tabs.map((tab) => tab.textContent)).toStrictEqual(["overview", "projects"]);
    expect(screen.getByRole("tabpanel").query()).toBe(null);
  });

  test("項目がないときはタブとパネルを描画しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Tabs items={[]} />);

    // 検証
    expect(screen.getByRole("tab").query()).toBe(null);
    expect(screen.getByRole("tabpanel").query()).toBe(null);
    expect(screen.getByRole("tablist").query()).not.toBe(null);
  });
});

describe("TabsAPI", () => {
  test("getRootProps は items を引き継ぎ slotProps を含めない", ({ expect }) => {
    // 準備と実行
    const api = new TabsAPI({ items: [...items], slotProps: { list: { id: "views" } } });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.items).toStrictEqual([...items]);
    expect(rootProps).not.toHaveProperty("slotProps");
  });

  test("getListProps は slotProps と既定の children を返す", ({ expect }) => {
    // 準備と実行
    const api = new TabsAPI({ items: [...items], slotProps: { list: { id: "views" } } });
    const listProps = api.getListProps();

    // 検証
    expect(listProps.id).toBe("views");
    expect(React.isValidElement(listProps.children)).toBe(true);
  });

  test("getPanelPropsList は内容のある項目のパネルだけを返す", ({ expect }) => {
    // 準備と実行
    const api = new TabsAPI({ items: [...items], slotProps: { panel: { className: "custom" } } });
    const panelPropsList = api.getPanelPropsList();

    // 検証
    expect(panelPropsList.map((panelProps) => panelProps.value)).toStrictEqual([
      "overview",
      "projects",
    ]);
    expect(panelPropsList.at(0)?.className).toBe("custom");
    expect(panelPropsList.at(0)?.children).toBe("概要の内容");
  });

  test("getTabProps は slotProps と項目の props を統合する", ({ expect }) => {
    // 準備と実行
    const api = new TabsAPI({
      items: [...items],
      slotProps: { tab: { className: "custom", id: "tab" } },
    });
    const props = api.getTabProps(items[0]);

    // 検証
    expect(props.value).toBe("overview");
    expect(props.id).toBe("tab");
    expect(props.className).toBe("custom");
    expect(props).not.toHaveProperty("label");
    expect(props).not.toHaveProperty("content");
  });

  test("getTabProps はプリミティブを値にする", ({ expect }) => {
    // 準備と実行
    const api = new TabsAPI({});

    // 検証
    expect(api.getTabProps("overview")).toStrictEqual({ value: "overview" });
  });

  test("getLabel は項目のラベルを返す", ({ expect }) => {
    // 準備と実行
    const api = new TabsAPI({ items: [...items] });

    // 検証
    expect(api.getLabel(items[2])).toBe("アカウント");
  });

  test("getIndicatorProps は slotProps を返す", ({ expect }) => {
    // 準備と実行
    const api = new TabsAPI({
      items: [...items],
      slotProps: { indicator: { id: "indicator" } },
    });

    // 検証
    expect(api.getIndicatorProps()).toStrictEqual({ id: "indicator" });
  });
});

describe("useTabsAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useTabsAPI({ items: [...items] });
      return <span>{String(api.getRootProps().items?.length)}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("3").query()?.textContent).toBe("3");
  });
});
