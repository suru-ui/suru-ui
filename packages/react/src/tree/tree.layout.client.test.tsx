import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./tree.parts.js";
import { TreeRoot } from "./root/tree.root.jsx";
import { Tree } from "./tree.jsx";
import "../../tests/src/_locators.js";

const items = [
  {
    id: "src",
    items: [
      { id: "components", items: [{ id: "button", label: "Button.tsx" }], label: "components" },
      { id: "index", label: "index.ts" },
    ],
    label: "src",
  },
  { id: "package", label: "package.json" },
] as const;

describe("Tree の配置", () => {
  test("公開パーツをすべて描画して余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TreeRoot items={[...items]} defaultExpandedValue={["src"]} />);

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
    const screen = await render(<Tree items={[...items]} defaultExpandedValue={["src"]} />);

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
      <Tree items={[...items]} defaultExpandedValue={["src", "components"]} />,
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

  test("大きさごとの活字と薄型の最小高さを反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Tree id="sm" size="sm" items={[...items]} />
        <Tree id="md" size="md" items={[...items]} />
        <Tree id="lg" size="lg" items={[...items]} />
      </>,
    );

    // 検証
    const sm = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#sm [role=treeitem]")!,
    );
    expect(sm.fontSize).toBe("12px");
    // 項目は薄型のボタンなので、最小高さはサイズの下限と行の高さの中間になります。
    expect(Number.parseFloat(sm.minHeight)).toBeCloseTo(19.6, 1);
    const md = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#md [role=treeitem]")!,
    );
    expect(md.fontSize).toBe("14px");
    expect(Number.parseFloat(md.minHeight)).toBeCloseTo(23.7, 1);
    const lg = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#lg [role=treeitem]")!,
    );
    expect(lg.fontSize).toBe("17px");
    expect(Number.parseFloat(lg.minHeight)).toBeCloseTo(27.35, 1);
  });

  test("角丸を大きさに合わせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Tree id="sm" size="sm" items={[...items]} />
        <Tree id="md" size="md" items={[...items]} />
        <Tree id="lg" size="lg" items={[...items]} />
      </>,
    );

    // 検証
    const sm = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#sm [role=treeitem]")!,
    );
    expect(sm.borderTopLeftRadius).toBe("8px");
    const md = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#md [role=treeitem]")!,
    );
    expect(md.borderTopLeftRadius).toBe("12px");
    const lg = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#lg [role=treeitem]")!,
    );
    expect(lg.borderTopLeftRadius).toBe("16px");
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
        <Tree items={[...items]} defaultValue={["package"]} defaultExpandedValue={["src"]} />
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
          items={[...items]}
          defaultValue={["package"]}
          defaultExpandedValue={["src"]}
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
            { id: "package", label: "package.json", disabled: true },
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
        <Tree items={[...items]} defaultExpandedValue={["src"]} />
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
    const screen = await render(<Tree items={[...items]} defaultExpandedValue={["src"]} />);

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
