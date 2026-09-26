import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/tree/tree.parts.js";
import { TreeItemIndicator } from "../../../src/tree/tree.indicator.jsx";
import { TreeItem } from "../../../src/tree/tree.item.jsx";
import { TreeRoot } from "../../../src/tree/tree.root.jsx";
import "../_locators.js";

const items = [
  { id: "src", label: "src", items: [{ id: "index", label: "index.ts" }] },
  { id: "package", label: "package.json" },
] as const;

describe("TreeItemIndicator", () => {
  test("既定では右向きのシェブロンを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TreeRoot>
        <TreeItem id="src" level={1}>
          <TreeItemIndicator />
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_tree_item_indicator").element();
    expect(indicator.tagName).toBe("SPAN");
    expect(indicator.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
  });

  test("展開状態に応じて回転する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TreeRoot defaultExpandedValue={["src"]} items={[...items]} />);

    // 検証
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
    // 準備と実行
    const screen = await render(
      <TreeRoot>
        <TreeItem hasItems id="src" level={1}>
          <TreeItemIndicator visible={false} />
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_tree_item_indicator").element();
    expect(indicator.classList.contains("sui_tree_item_indicator-hidden")).toBe(true);
    expect(getComputedStyle(indicator).visibility).toBe("hidden");
  });

  test("既定のアイコンを差し替えられる", async ({ expect }) => {
    // 準備と実行
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

    // 検証
    expect(screen.getByText("▼").query()).not.toBe(null);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TreeRoot>
        <TreeItem id="src" level={1}>
          <TreeItemIndicator className="custom" />
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_tree_item_indicator").element().classList.contains("custom"),
    ).toBe(true);
  });
});
