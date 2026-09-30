import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../../src/errors.js";
import { TabsContext, useTabsContext } from "../../../src/tabs/tabs.context.js";
import { TabsRoot } from "../../../src/tabs/tabs.root.jsx";

describe("useTabsContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    const provided = {
      activeVariant: "solid",
      items: ["overview", "projects"],
      outlined: true,
      radius: "none",
      size: "lg",
      variant: "segments",
    } as const;
    function Probe() {
      const ctx = useTabsContext();

      return (
        <span>
          {`${ctx.size}/${ctx.radius}/${ctx.variant}/${ctx.activeVariant}/${String(ctx.outlined)}/${ctx.items.length}`}
        </span>
      );
    }

    // 実行
    const screen = await render(
      <TabsContext value={provided}>
        <Probe />
      </TabsContext>,
    );

    // 検証
    expect(screen.getByText("lg/none/segments/solid/true/2").query()?.textContent).toBe(
      "lg/none/segments/solid/true/2",
    );
  });

  test("ルートの状態を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useTabsContext();

      return (
        <span>
          {`${ctx.size}/${ctx.radius}/${ctx.variant}/${ctx.activeVariant}/${String(ctx.outlined)}/${ctx.items.length}`}
        </span>
      );
    }

    // 実行
    const screen = await render(
      <TabsRoot
        activeVariant="naked"
        items={["overview", "projects"]}
        outlined
        radius="none"
        size="sm"
        variant="segments"
      >
        <Probe />
      </TabsRoot>,
    );

    // 検証
    expect(screen.getByText("sm/none/segments/naked/true/2").query()?.textContent).toBe(
      "sm/none/segments/naked/true/2",
    );
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useTabsContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useTabsContext(true);
      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
