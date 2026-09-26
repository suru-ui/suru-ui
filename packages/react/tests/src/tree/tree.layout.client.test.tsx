import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/tree/tree.parts.js";
import { Tree } from "../../../src/tree/tree.jsx";
import { TreeRoot } from "../../../src/tree/tree.root.jsx";
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

describe("Tree の配置", () => {
  test("公開パーツをすべて描画して余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TreeRoot defaultExpandedValue={["src"]} items={[...items]} />);

    // 検証
    expect(screen.getByRole("tree").element().classList.contains("sui_tree")).toBe(true);
    expect(screen.getByRole("treeitem").elements().length).toBe(4);
    expect(screen.getByClassName("sui_tree_item_indicator").elements().length).toBe(4);

    const elements = screen.container.querySelectorAll<HTMLElement>(".sui_tree, .sui_tree *");
    for (const element of elements) {
      const style = getComputedStyle(element);
      expect(style.marginTop).toBe("0px");
      expect(style.marginInlineStart).toBe("0px");
    }
  });

  test("項目を縦一列に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Tree defaultExpandedValue={["src"]} items={[...items]} />);

    // 検証
    const root = getComputedStyle(screen.getByRole("tree").element());
    expect(root.display).toBe("flex");
    expect(root.flexDirection).toBe("column");
    const src = screen.getByRole("treeitem", { name: "src" }).element().getBoundingClientRect();
    const components = screen
      .getByRole("treeitem", { name: "components" })
      .element()
      .getBoundingClientRect();
    const index = screen
      .getByRole("treeitem", { name: "index.ts" })
      .element()
      .getBoundingClientRect();
    const packageItem = screen
      .getByRole("treeitem", { name: "package.json" })
      .element()
      .getBoundingClientRect();
    expect(components.top).toBeGreaterThanOrEqual(src.bottom);
    expect(index.top).toBeGreaterThanOrEqual(components.bottom);
    expect(packageItem.top).toBeGreaterThanOrEqual(index.bottom);
    expect(src.left).toBeCloseTo(packageItem.left, 1);
  });

  test("階層の深さに応じてインデントする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Tree defaultExpandedValue={["src", "components"]} items={[...items]} />,
    );

    // 検証
    const src = screen.getByRole("treeitem", { name: "src" }).element();
    const components = screen.getByRole("treeitem", { name: "components" }).element();
    const button = screen.getByRole("treeitem", { name: "Button.tsx" }).element();
    const srcPadding = Number.parseFloat(getComputedStyle(src).paddingInlineStart);
    const componentsPadding = Number.parseFloat(getComputedStyle(components).paddingInlineStart);
    const buttonPadding = Number.parseFloat(getComputedStyle(button).paddingInlineStart);
    const step = componentsPadding - srcPadding;

    expect(step).toBeGreaterThan(0);
    expect(buttonPadding - componentsPadding).toBeCloseTo(step, 0);
    const indicator = components.querySelector(".sui_tree_item_indicator");
    // 間隔トークンを解決できないブラウザーでは `column-gap` が `normal` になり、段差はインジケーター幅だけになります。
    const columnGap = Number.parseFloat(getComputedStyle(components).columnGap);
    const expected =
      indicator!.getBoundingClientRect().width + (Number.isNaN(columnGap) ? 0 : columnGap);
    expect(step).toBeCloseTo(expected, 0);
  });

  test("大きさごとの活字と最小高さを反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Tree id="sm" items={[...items]} size="sm" />
        <Tree id="md" items={[...items]} size="md" />
        <Tree id="lg" items={[...items]} size="lg" />
      </>,
    );

    // 検証
    const sm = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#sm [role=treeitem]")!,
    );
    expect(sm.fontSize).toBe("12px");
    expect(sm.minHeight).toBe("20px");
    const md = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#md [role=treeitem]")!,
    );
    expect(md.fontSize).toBe("14px");
    expect(md.minHeight).toBe("28px");
    const lg = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#lg [role=treeitem]")!,
    );
    expect(lg.fontSize).toBe("17px");
    expect(lg.minHeight).toBe("36px");
  });

  test("角丸を大きさに合わせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Tree id="sm" items={[...items]} size="sm" />
        <Tree id="md" items={[...items]} size="md" />
        <Tree id="lg" items={[...items]} size="lg" />
      </>,
    );

    // 検証
    const sm = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#sm [role=treeitem]")!,
    );
    expect(sm.borderTopLeftRadius).toBe("4px");
    const md = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#md [role=treeitem]")!,
    );
    expect(md.borderTopLeftRadius).toBe("4px");
    const lg = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#lg [role=treeitem]")!,
    );
    expect(lg.borderTopLeftRadius).toBe("6px");
  });

  test("角丸 full では丸くする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Tree items={[...items]} radius="full" />);

    // 検証
    const item = screen.getByRole("treeitem", { name: "src" }).element();
    expect(Number.parseFloat(getComputedStyle(item).borderTopLeftRadius)).toBeCloseTo(
      item.getBoundingClientRect().height / 2,
      1,
    );
  });

  test("選択中の項目の背景を塗りつぶす", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ backgroundColor: "var(--sui-grey-liquid-canvas-normal)" }}>基準</span>
        <Tree defaultExpandedValue={["src"]} defaultValue={["package"]} items={[...items]} />
      </>,
    );
    await screen.getByText("基準").hover();

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element()).backgroundColor;
    const selected = getComputedStyle(
      screen.getByRole("treeitem", { name: "package.json" }).element(),
    );
    expect(selected.backgroundColor).toBe(expected);
    const idle = getComputedStyle(screen.getByRole("treeitem", { name: "index.ts" }).element());
    expect(idle.backgroundColor).not.toBe(expected);
  });

  test("選択中の項目の文字色を強調する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-blue-liquid-canvas_text-normal)" }}>選択中</span>
        <span style={{ color: "var(--sui-grey-naked-canvas_text-normal)" }}>非選択</span>
        <Tree
          color="blue"
          defaultExpandedValue={["src"]}
          defaultValue={["package"]}
          items={[...items]}
        />
      </>,
    );
    await screen.getByText("非選択").hover();

    // 検証
    const selected = getComputedStyle(
      screen.getByRole("treeitem", { name: "package.json" }).element(),
    );
    expect(selected.color).toBe(getComputedStyle(screen.getByText("選択中").element()).color);
    const idle = getComputedStyle(screen.getByRole("treeitem", { name: "index.ts" }).element());
    expect(idle.color).toBe(getComputedStyle(screen.getByText("非選択").element()).color);
    expect(idle.color).not.toBe(selected.color);
  });

  test("無効な項目を淡色にして操作不能にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-disabled-naked-canvas_text)" }}>基準</span>
        <Tree
          items={[
            { id: "src", label: "src" },
            { disabled: true, id: "package", label: "package.json" },
          ]}
        />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element());
    const disabled = getComputedStyle(
      screen.getByRole("treeitem", { name: "package.json" }).element(),
    );
    expect(disabled.color).toBe(expected.color);
    expect(disabled.cursor).toBe("not-allowed");
  });

  test("通常の項目は hover で色を変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <Tree defaultExpandedValue={["src"]} items={[...items]} />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const item = screen.getByRole("treeitem", { name: "index.ts" });
    await screen.getByText("待避").hover();
    const before = getComputedStyle(item.element()).color;

    // 実行
    await item.hover();

    // 検証
    expect(getComputedStyle(item.element()).color).not.toBe(before);

    // 後始末としてポインターを項目の外へ戻します。
    await screen.getByText("待避").hover();
  });

  test("インジケーターは分岐にだけ内容を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Tree defaultExpandedValue={["src"]} items={[...items]} />);

    // 検証
    const branch = screen
      .getByRole("treeitem", { name: "components" })
      .element()
      .querySelector(".sui_tree_item_indicator");
    expect(branch!.classList.contains("sui_tree_item_indicator-hidden")).toBe(false);
    const leaf = screen
      .getByRole("treeitem", { name: "index.ts" })
      .element()
      .querySelector(".sui_tree_item_indicator");
    expect(leaf!.classList.contains("sui_tree_item_indicator-hidden")).toBe(true);
  });
});
