import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { TreeRoot } from "../root/tree.root.jsx";
import { TreeItem } from "./tree.item.jsx";
import "../../../tests/src/_locators.js";

describe("TreeItem", () => {
  test("ツリー項目として描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TreeRoot>
        <TreeItem id="src" level={1} setSize={1} hasItems posInSet={1}>
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証。
    const item = screen.getByRole("treeitem").element();
    expect(item.tagName).toBe("DIV");
    expect(item.classList.contains("sui_tree_item")).toBe(true);
    expect(item.getAttribute("aria-level")).toBe("1");
    expect(item.getAttribute("aria-posinset")).toBe("1");
    expect(item.getAttribute("aria-setsize")).toBe("1");
    expect(item.getAttribute("data-id")).toBe("src");
    expect(item.tabIndex).toBe(-1);
  });

  test("無効な項目に状態クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TreeRoot>
        <TreeItem id="src" level={1} disabled hasItems>
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証。
    const item = screen.getByRole("treeitem").element();
    expect(item.classList.contains("sui_tree_item-disabled")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TreeRoot>
        <TreeItem id="src" level={1} render={<span />}>
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証。
    expect(screen.getByRole("treeitem").element().tagName).toBe("SPAN");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TreeRoot>
        <TreeItem id="src" level={1} className="custom">
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証。
    expect(screen.getByRole("treeitem").element().classList.contains("custom")).toBe(true);
  });

  test("render と className の関数へスタイル情報と項目の状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TreeRoot size="lg" radius="full" defaultValue={["src"]} defaultExpandedValue={["src"]}>
        <TreeItem
          id="src"
          level={1}
          render={(props, state) => (
            <div
              {...props}
              data-probe={`${state.size}/${state.radius}/${String(state.expanded)}/${String(state.selected)}/${String(state.disabled)}`}
            />
          )}
          hasItems
          className={(state) => (state.selected ? "probe-selected" : undefined)}
        >
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証。
    const item = screen.getByRole("treeitem").element();
    expect(item.tagName).toBe("DIV");
    expect(item.getAttribute("data-probe")).toBe("lg/full/true/true/false");
    expect(item.classList.contains("probe-selected")).toBe(true);
  });
});
