import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { useTreeContext } from "./tree.root.context.js";
import { TreeRoot } from "./tree.root.jsx";
import "../../../tests/src/_locators.js";

const items = [
  {
    id: "src",
    items: [
      {
        id: "components",
        items: [
          {
            id: "button",
            label: "Button.tsx",
          },
        ],
        label: "components",
      },
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
describe("TreeRoot", () => {
  test("既定の修飾を付けたツリーとして描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<TreeRoot items={[...items]} />);

    // 検証。
    const root = screen.getByRole("tree").element();
    expect(root.tagName).toBe("DIV");
    expect(root.classList.contains("sui_tree")).toBe(true);
    expect(root.classList.contains("sui_tree-size_md")).toBe(true);
    expect(root.classList.contains("sui_tree-radius_md")).toBe(true);
    expect(root.getAttribute("data-scope")).toBe("");
    expect(root.getAttribute("aria-multiselectable")).toBe("true");
    expect(root.tabIndex).toBe(0);
  });

  test("大きさと角丸を修飾へ反映する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<TreeRoot size="sm" items={[...items]} radius="lg" />);

    // 検証。
    const root = screen.getByRole("tree").element();
    expect(root.classList.contains("sui_tree-size_sm")).toBe(true);
    expect(root.classList.contains("sui_tree-radius_lg")).toBe(true);
  });

  test("角丸を省略すると大きさに追従する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<TreeRoot size="lg" items={[...items]} />);

    // 検証。
    expect(screen.getByClassName("sui_tree-radius_lg").query()).not.toBe(null);
  });

  test("初期状態で展開したノードだけを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<TreeRoot items={[...items]} defaultExpandedValue={["src"]} />);

    // 検証。
    const labels = screen
      .getByRole("treeitem")
      .elements()
      .map((item) => item.textContent);
    expect(labels).toStrictEqual(["src", "components", "index.ts", "package.json"]);
  });

  test("関数の children に表示中のノードと位置を渡す", async ({ expect }) => {
    // 準備。
    const received: [string, number, number, number][] = [];

    // 実行。
    const screen = await render(
      <TreeRoot items={[...items]} defaultExpandedValue={["src"]}>
        {(node, level, posInSet, setSize) => {
          received.push([node.id, level, posInSet, setSize]);

          return <span key={node.id}>{node.id}</span>;
        }}
      </TreeRoot>,
    );

    // 検証。
    expect(received).toStrictEqual([
      ["src", 1, 1, 2],
      ["components", 2, 1, 2],
      ["index", 2, 2, 2],
      ["package", 1, 2, 2],
    ]);
    expect(screen.getByText("components").query()?.textContent).toBe("components");
  });

  test("関数以外の内容をそのまま描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TreeRoot items={[...items]}>
        <span>独自の内容</span>
      </TreeRoot>,
    );

    // 検証。
    expect(screen.getByText("独自の内容").query()).not.toBe(null);
    expect(screen.getByRole("treeitem").query()).toBe(null);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<TreeRoot items={[...items]} render={<section />} />);

    // 検証。
    expect(screen.getByRole("tree").element().tagName).toBe("SECTION");
  });

  test("render と className と style の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TreeRoot
        size="lg"
        items={[...items]}
        style={(state) => ({ opacity: state.radius === "full" ? "0.5" : "1" })}
        radius="full"
        render={(props, state) => (
          <div
            {...props}
            data-probe={`${state.size}/${state.radius}/${state.value.join(",")}/${state.expanded.join(",")}/${String(state.activeId)}`}
          />
        )}
        className={(state) => `probe-size_${state.size}`}
        defaultValue={["index"]}
        defaultExpandedValue={["src"]}
      />,
    );

    // 検証。
    const root = screen.getByRole("tree").element();
    expect(root.getAttribute("data-probe")).toBe("lg/full/index/src/null");
    expect(root.classList.contains("probe-size_lg")).toBe(true);
    expect(root.style.opacity).toBe("0.5");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<TreeRoot items={[...items]} className="custom" />);

    // 検証。
    expect(screen.getByRole("tree").element().classList.contains("custom")).toBe(true);
  });

  test("選択状態を項目へ伝える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TreeRoot items={[...items]} defaultValue={["index"]} defaultExpandedValue={["src"]} />,
    );

    // 検証。
    expect(
      screen
        .getByRole("treeitem", { name: "index.ts" })
        .element()
        .classList.contains("sui_tree_item-selected"),
    ).toBe(true);
    expect(
      screen
        .getByRole("treeitem", { name: "src" })
        .element()
        .classList.contains("sui_tree_item-selected"),
    ).toBe(false);
  });

  test("項目を子孫へ伝える", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useTreeContext();

      return <span>{String(ctx.selected.size)}</span>;
    }

    // 実行。
    const screen = await render(
      <TreeRoot items={[...items]} defaultValue={["src"]}>
        <Probe />
      </TreeRoot>,
    );

    // 検証。
    expect(screen.getByText("1").query()?.textContent).toBe("1");
  });
});
