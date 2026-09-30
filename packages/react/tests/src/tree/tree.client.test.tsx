import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { TreeItem } from "../../../src/tree/tree.item.jsx";
import { Tree, TreeAPI, useTreeAPI } from "../../../src/tree/tree.jsx";
import "../_locators.js";

const items = [
  {
    id: "src",
    label: "src",
    items: [
      { id: "components", label: "components", items: [{ id: "button", label: "Button.tsx" }] },
      { id: "index", label: "index.ts" },
    ],
  },
  { id: "package", label: "package.json" },
] as const;

describe("Tree", () => {
  test("項目を並べて既定の展開を反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Tree defaultExpandedValue={["src"]} items={[...items]} />);

    // 検証
    const treeitems = screen.getByRole("treeitem").elements();
    expect(treeitems.map((item) => item.textContent)).toStrictEqual([
      "src",
      "components",
      "index.ts",
      "package.json",
    ]);
    expect(screen.getByClassName("sui_tree_item_indicator").elements().length).toBe(4);
  });

  test("slotProps を各パーツへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Tree
        defaultExpandedValue={["src"]}
        items={[...items]}
        slotProps={{
          indicator: { id: "indicator" },
          item: { className: "custom-item" },
        }}
      />,
    );

    // 検証
    expect(screen.container.querySelectorAll(".custom-item").length).toBe(4);
    expect(screen.getByClassName("sui_tree_item_indicator").elements()[0]?.id).toBe("indicator");
  });

  test("項目ごとの disabled を項目へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Tree
        items={[
          { id: "src", label: "src" },
          { disabled: true, id: "package", label: "package.json" },
        ]}
      />,
    );

    // 検証
    const item = screen.getByRole("treeitem", { name: "package.json" }).element();
    expect(item.classList.contains("sui_tree_item-disabled")).toBe(true);
  });

  test("関数の children で項目を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Tree defaultExpandedValue={["src"]} items={[...items]}>
        {(node, level, posInSet, setSize) => (
          <TreeItem
            hasItems={node.items != null && node.items.length > 0}
            id={node.id}
            key={node.id}
            level={level}
            posInSet={posInSet}
            setSize={setSize}
          >
            「{node.label}」
          </TreeItem>
        )}
      </Tree>,
    );

    // 検証
    expect(screen.getByText("「src」").query()).not.toBe(null);
    expect(screen.getByRole("treeitem").elements().length).toBe(4);
  });

  test("項目がないときはルートだけを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Tree items={[]} />);

    // 検証
    expect(screen.getByRole("tree").query()).not.toBe(null);
    expect(screen.getByRole("treeitem").query()).toBe(null);
  });
});

describe("TreeAPI", () => {
  test("getRootProps は items を引き継ぎ slotProps を含めない", ({ expect }) => {
    // 準備と実行
    const api = new TreeAPI({ items: [...items], slotProps: { item: { className: "custom" } } });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.items).toStrictEqual([...items]);
    expect(rootProps).not.toHaveProperty("slotProps");
    expect(typeof rootProps.children).toBe("function");
  });

  test("getItemProps は slotProps と項目の props を統合する", ({ expect }) => {
    // 準備と実行
    const api = new TreeAPI({ items: [...items], slotProps: { item: { className: "custom" } } });
    const props = api.getItemProps(items[0], 1, 1, 2);

    // 検証
    expect(props.className).toBe("custom");
    expect(props.id).toBe("src");
    expect(props.level).toBe(1);
    expect(props.posInSet).toBe(1);
    expect(props.setSize).toBe(2);
    expect(props.hasItems).toBe(true);
    expect(props).not.toHaveProperty("label");
    expect(props).not.toHaveProperty("items");
  });

  test("getItemProps は項目の disabled を保持する", ({ expect }) => {
    // 準備
    const node = { disabled: true, id: "src", label: "src" } as const;
    const api = new TreeAPI({ items: [node] });

    // 実行と検証
    expect(api.getItemProps(node, 1, 1, 1).disabled).toBe(true);
  });

  test("getIndicatorProps は分岐だけ表示にする", ({ expect }) => {
    // 準備と実行
    const api = new TreeAPI({ items: [...items], slotProps: { indicator: { id: "indicator" } } });

    // 検証
    expect(api.getIndicatorProps(items[0])).toStrictEqual({ id: "indicator", visible: true });
    expect(api.getIndicatorProps(items[1])).toStrictEqual({ id: "indicator", visible: false });
  });

  test("getItemLabel は項目のラベルを返す", ({ expect }) => {
    // 準備と実行
    const api = new TreeAPI({ items: [...items] });

    // 検証
    expect(api.getItemLabel(items[0])).toBe("src");
  });
});

describe("useTreeAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useTreeAPI({ items: [...items] });
      return <span>{String(api.getRootProps().items?.length)}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("2").query()?.textContent).toBe("2");
  });
});
