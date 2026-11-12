import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { TabsRoot } from "../root/tabs.root.jsx";
import { TabsList } from "./tabs.list.jsx";
import "../../../tests/src/_locators.js";

const items = [
  {
    label: "概要",
    value: "overview",
  },
  {
    label: "プロジェクト",
    value: "projects",
  },
  {
    label: "アカウント",
    value: "account",
  },
] as const;
describe("TabsList", () => {
  test("項目をタブとして並べる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TabsRoot items={[...items]}>
        <TabsList />
      </TabsRoot>,
    );

    // 検証。
    const list = screen.getByRole("tablist").element();
    expect(list.classList.contains("sui_tabs_list")).toBe(true);
    expect(list.getAttribute("aria-label")).toBe("タブ");

    const tabs = screen.getByRole("tab").elements();
    expect(tabs.map((tab) => tab.textContent)).toStrictEqual([
      "概要",
      "プロジェクト",
      "アカウント",
    ]);
  });

  test("プリミティブな項目もタブにする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TabsRoot items={["overview", "projects"]}>
        <TabsList />
      </TabsRoot>,
    );

    // 検証。
    const tabs = screen.getByRole("tab").elements();
    expect(tabs.map((tab) => tab.textContent)).toStrictEqual(["overview", "projects"]);
    expect(
      screen.getByRole("tab", { name: "overview" }).element().classList.contains("sui_tabs_tab"),
    ).toBe(true);
  });

  test("項目ごとの props をタブへ渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TabsRoot
        items={[
          {
            label: "プロジェクト",
            value: "projects",
            disabled: true,
          },
        ]}
      >
        <TabsList />
      </TabsRoot>,
    );

    // 検証。
    const tab = screen.getByRole("tab", { name: "プロジェクト" }).element();
    expect(tab.classList.contains("sui_tabs_tab-disabled")).toBe(true);
  });

  test("利用者の aria-label を優先する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TabsRoot items={[...items]}>
        <TabsList aria-label="表示切り替え" />
      </TabsRoot>,
    );

    // 検証。
    expect(screen.getByRole("tablist", { name: "表示切り替え" }).query()).not.toBe(null);
  });

  test("render と className の関数へスタイル情報と項目を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TabsRoot size="lg" items={[...items]}>
        <TabsList
          render={(props, state) => (
            <div {...props} data-probe={`${state.size}/${state.items.length}`} />
          )}
          className={(state) => `probe-size_${state.size}`}
        />
      </TabsRoot>,
    );

    // 検証。
    const list = screen.getByRole("tablist").element();
    expect(list.tagName).toBe("DIV");
    expect(list.getAttribute("data-probe")).toBe("lg/3");
    expect(list.classList.contains("probe-size_lg")).toBe(true);
  });

  test("関数の children に項目とインデックスと項目一覧を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TabsRoot items={[...items]}>
        <TabsList>
          {(item, index, allItems) => (
            <span key={index}>
              {index}:{item.label}:{allItems.length}
            </span>
          )}
        </TabsList>
      </TabsRoot>,
    );

    // 検証。
    expect(screen.getByText("0:概要:3").query()).not.toBe(null);
    expect(screen.getByText("2:アカウント:3").query()).not.toBe(null);
  });

  test("関数でない children を渡すと children だけを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TabsRoot items={[...items]}>
        <TabsList>
          <span>単独</span>
        </TabsList>
      </TabsRoot>,
    );

    // 検証。
    expect(screen.getByText("単独").query()).not.toBe(null);
    expect(screen.getByRole("tab").query()).toBe(null);
  });

  test("項目がないときは空のリストにする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TabsRoot>
        <TabsList />
      </TabsRoot>,
    );

    // 検証。
    expect(screen.getByRole("tablist").element().childElementCount).toBe(0);
  });
});
