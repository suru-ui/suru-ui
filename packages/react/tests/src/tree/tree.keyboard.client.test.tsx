import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { Tree } from "../../../src/tree/tree.jsx";
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

describe("Tree のキーボード操作", () => {
  test("矢印キーで項目間を移動する", async ({ expect }) => {
    // 準備
    const screen = await render(<Tree defaultExpandedValue={["src"]} items={[...items]} />);
    const root = screen.getByRole("tree").element();
    const activeDescendant = () => root.getAttribute("aria-activedescendant");
    const idOf = (name: string) => screen.getByRole("treeitem", { name }).element().id;

    // 実行と検証
    root.focus();
    await vi.waitFor(() => {
      expect(activeDescendant()).toBe(idOf("src"));
    });
    await userEvent.keyboard("{ArrowDown}");
    expect(activeDescendant()).toBe(idOf("components"));
    await userEvent.keyboard("{ArrowDown}");
    expect(activeDescendant()).toBe(idOf("index.ts"));
    await userEvent.keyboard("{ArrowUp}");
    expect(activeDescendant()).toBe(idOf("components"));
    await userEvent.keyboard("{End}");
    expect(activeDescendant()).toBe(idOf("package.json"));
    await userEvent.keyboard("{Home}");
    expect(activeDescendant()).toBe(idOf("src"));
  });

  test("右向きで分岐を展開し、左向きで折りたたむ", async ({ expect }) => {
    // 準備
    const screen = await render(<Tree items={[...items]} />);
    const root = screen.getByRole("tree").element();
    const idOf = (name: string) => screen.getByRole("treeitem", { name }).element().id;
    root.focus();
    await vi.waitFor(() => {
      expect(root.getAttribute("aria-activedescendant")).toBe(idOf("src"));
    });

    // 実行と検証
    await userEvent.keyboard("{ArrowRight}");
    expect(
      screen.getByRole("treeitem", { name: "src" }).element().getAttribute("aria-expanded"),
    ).toBe("true");
    await userEvent.keyboard("{ArrowRight}");
    expect(root.getAttribute("aria-activedescendant")).toBe(idOf("components"));
    await userEvent.keyboard("{ArrowLeft}");
    expect(root.getAttribute("aria-activedescendant")).toBe(idOf("src"));
    await userEvent.keyboard("{ArrowLeft}");
    expect(
      screen.getByRole("treeitem", { name: "src" }).element().getAttribute("aria-expanded"),
    ).toBe("false");
  });

  test("無効な項目を読み飛ばす", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Tree
        defaultExpandedValue={["src"]}
        items={[
          { id: "src", items: [{ id: "index", disabled: true, label: "index.ts" }], label: "src" },
          { id: "package", label: "package.json" },
        ]}
      />,
    );
    const root = screen.getByRole("tree").element();
    const idOf = (name: string) => screen.getByRole("treeitem", { name }).element().id;
    root.focus();
    await vi.waitFor(() => {
      expect(root.getAttribute("aria-activedescendant")).toBe(idOf("src"));
    });

    // 実行と検証
    await userEvent.keyboard("{ArrowDown}");
    expect(root.getAttribute("aria-activedescendant")).toBe(idOf("package.json"));
    await userEvent.keyboard("{ArrowUp}");
    expect(root.getAttribute("aria-activedescendant")).toBe(idOf("src"));
  });

  test("Enter と Space で選択する", async ({ expect }) => {
    // 準備
    const onValueChange = vi.fn<(value: readonly string[], event: unknown) => void>();
    const screen = await render(
      <Tree defaultExpandedValue={["src"]} items={[...items]} onValueChange={onValueChange} />,
    );
    screen.getByRole("tree").element().focus();

    // 実行と検証
    await userEvent.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenLastCalledWith(["src"], expect.anything());
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard(" ");
    expect(onValueChange).toHaveBeenLastCalledWith(["components"], expect.anything());
  });

  test("アスタリスクで折りたたまれた分岐を展開する", async ({ expect }) => {
    // 準備
    const onExpandedValueChange = vi.fn<(value: readonly string[], event: unknown) => void>();
    const screen = await render(
      <Tree items={[...items]} onExpandedValueChange={onExpandedValueChange} />,
    );
    screen.getByRole("tree").element().focus();

    // 実行と検証
    await userEvent.keyboard("*");
    expect(onExpandedValueChange).toHaveBeenLastCalledWith(["src"], expect.anything());
    await userEvent.keyboard("*");
    expect(onExpandedValueChange).toHaveBeenLastCalledWith(
      ["src", "components"],
      expect.anything(),
    );
    expect(screen.getByRole("treeitem").elements().length).toBe(5);
  });
});
