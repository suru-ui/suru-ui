import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../tree.parts.js";
import { TreeItem } from "../item/tree.item.jsx";
import { TreeRoot } from "../root/tree.root.jsx";
import { TreeItemIndicator } from "./tree.indicator.jsx";
import "../../../tests/src/_locators.js";

const items = [
  {
    id: "src",
    items: [
      {
        id: "index",
        label: "index.ts",
      },
    ],
    label: "src",
  },
  {
    id: "package",
    label: "package.json",
  },
] as const;
describe("TreeItemIndicator", () => {
  test("既定では右向きのシェブロンを表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TreeRoot>
        <TreeItem id="src" level={1}>
          <TreeItemIndicator />
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証。
    const indicator = screen.getByClassName("sui_tree_item_indicator").element();
    expect(indicator.tagName).toBe("SPAN");
    expect(indicator.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
  });

  test("展開状態に応じて回転する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<TreeRoot items={[...items]} defaultExpandedValue={["src"]} />);

    // 検証。
    const expanded = screen
      .getByRole("treeitem", { name: "src" })
      .element()
      .querySelector(".sui_tree_item_indicator");
    expect(getComputedStyle(expanded!).rotate).toBe("90deg");

    const collapsed = screen
      .getByRole("treeitem", { name: "package.json" })
      .element()
      .querySelector(".sui_tree_item_indicator");
    expect(["0deg", "none"]).toContain(getComputedStyle(collapsed!).rotate);
  });

  test("visible が false のときは場所だけ確保する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TreeRoot>
        <TreeItem id="src" level={1} hasItems>
          <TreeItemIndicator visible={false} />
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証。
    const indicator = screen.getByClassName("sui_tree_item_indicator").element();
    expect(indicator.classList.contains("sui_tree_item_indicator-hidden")).toBe(true);
    expect(getComputedStyle(indicator).visibility).toBe("hidden");
  });

  test("既定のアイコンを差し替えられる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TreeRoot>
        <TreeItem id="src" level={1}>
          <TreeItemIndicator>
            <span>▼</span>
          </TreeItemIndicator>
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証。
    expect(screen.getByText("▼").query()).not.toBe(null);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TreeRoot>
        <TreeItem id="src" level={1}>
          <TreeItemIndicator className="custom" />
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証。
    expect(
      screen.getByClassName("sui_tree_item_indicator").element().classList.contains("custom"),
    ).toBe(true);
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TreeRoot size="lg" radius="full">
        <TreeItem id="src" level={1}>
          <TreeItemIndicator
            render={(props, state) => (
              <span
                {...props}
                data-probe={`${state.size}/${state.radius}/${String(state.activeId)}`}
              />
            )}
          />
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証。
    expect(
      screen.getByClassName("sui_tree_item_indicator").element().getAttribute("data-probe"),
    ).toBe("lg/full/null");
  });
});
