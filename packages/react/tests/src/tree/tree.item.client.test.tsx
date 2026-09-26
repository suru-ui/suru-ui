import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { TreeItem } from "../../../src/tree/tree.item.jsx";
import { TreeRoot } from "../../../src/tree/tree.root.jsx";
import "../_locators.js";

describe("TreeItem", () => {
  test("ツリー項目として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TreeRoot>
        <TreeItem hasItems id="src" level={1} posInSet={1} setSize={1}>
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証
    const item = screen.getByRole("treeitem").element();
    expect(item.tagName).toBe("DIV");
    expect(item.classList.contains("sui_tree_item")).toBe(true);
    expect(item.getAttribute("aria-level")).toBe("1");
    expect(item.getAttribute("aria-posinset")).toBe("1");
    expect(item.getAttribute("aria-setsize")).toBe("1");
    expect(item.getAttribute("aria-expanded")).toBe("false");
    expect(item.getAttribute("aria-selected")).toBe("false");
    expect(item.getAttribute("data-id")).toBe("src");
    expect(item.tabIndex).toBe(-1);
  });

  test("押すと選択と展開を切り替える", async ({ expect }) => {
    // 準備
    const onValueChange = vi.fn<(value: readonly string[], event: unknown) => void>();
    const onExpandedValueChange = vi.fn<(value: readonly string[], event: unknown) => void>();
    const screen = await render(
      <TreeRoot onExpandedValueChange={onExpandedValueChange} onValueChange={onValueChange}>
        <TreeItem hasItems id="src" level={1}>
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 実行
    await screen.getByRole("treeitem").click();

    // 検証
    expect(onValueChange).toHaveBeenCalledWith(["src"], expect.anything());
    expect(onExpandedValueChange).toHaveBeenCalledWith(["src"], expect.anything());
    const item = screen.getByRole("treeitem").element();
    expect(item.classList.contains("sui_tree_item-selected")).toBe(true);
    expect(item.classList.contains("sui_tree_item-expanded")).toBe(true);
    expect(item.getAttribute("aria-selected")).toBe("true");
    expect(item.getAttribute("aria-expanded")).toBe("true");
  });

  test("無効な項目は操作を受け付けない", async ({ expect }) => {
    // 準備
    const onValueChange = vi.fn<(value: readonly string[], event: unknown) => void>();
    const screen = await render(
      <TreeRoot onValueChange={onValueChange}>
        <TreeItem disabled hasItems id="src" level={1}>
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 実行
    screen
      .getByRole("treeitem")
      .element()
      .dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

    // 検証
    expect(onValueChange).not.toHaveBeenCalled();
    const item = screen.getByRole("treeitem").element();
    expect(item.classList.contains("sui_tree_item-disabled")).toBe(true);
    expect(item.getAttribute("aria-disabled")).toBe("true");
    expect(item.getAttribute("aria-selected")).toBe("false");
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TreeRoot>
        <TreeItem id="src" level={1} render={<span />}>
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証
    expect(screen.getByRole("treeitem").element().tagName).toBe("SPAN");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TreeRoot>
        <TreeItem className="custom" id="src" level={1}>
          src
        </TreeItem>
      </TreeRoot>,
    );

    // 検証
    expect(screen.getByRole("treeitem").element().classList.contains("custom")).toBe(true);
  });
});
