import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import { TreeContext, useTreeContext } from "./tree.root.context.js";
import { TreeRoot } from "./tree.root.jsx";

describe("useTreeContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備。
    const provided: TreeContext = {
      size: "lg",
      color: "blue",
      focus: () => {},
      muted: true,
      radius: "full",
      select: () => {},
      variant: "solid",
      activeId: "src",
      expanded: new Set(["src"]),
      outlined: true,
      selected: new Set(["index"]),
      getItemId: (itemId) => `tree-${itemId}`,
      setActive: () => {},
      toggleExpansion: () => {},
    };

    function Probe() {
      const ctx = useTreeContext();

      return (
        <span>
          {`${ctx.size}/${ctx.color}/${ctx.radius}/${ctx.variant}/${String(ctx.muted)}/${String(ctx.outlined)}/${ctx.activeId}/${ctx.expanded.size}/${ctx.selected.size}`}
        </span>
      );
    }

    // 実行。
    const screen = await render(
      <TreeContext value={provided}>
        <Probe />
      </TreeContext>,
    );

    // 検証。
    expect(screen.getByText("lg/blue/full/solid/true/true/src/1/1").query()?.textContent).toBe(
      "lg/blue/full/solid/true/true/src/1/1",
    );
  });

  test("ルートの状態を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useTreeContext();

      return (
        <span>
          {`${ctx.size}/${ctx.color}/${ctx.radius}/${ctx.variant}/${String(ctx.muted)}/${String(ctx.outlined)}/${ctx.activeId}/${ctx.expanded.size}/${ctx.selected.size}`}
        </span>
      );
    }

    // 実行。
    const screen = await render(
      <TreeRoot size="sm" color="red" muted radius="none" variant="solid" outlined>
        <Probe />
      </TreeRoot>,
    );

    // 検証。
    expect(screen.getByText("sm/red/none/solid/true/true/null/0/0").query()?.textContent).toBe(
      "sm/red/none/solid/true/true/null/0/0",
    );
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備。
    function Probe() {
      useTreeContext();

      return null;
    }

    // 実行と検証。
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useTreeContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
