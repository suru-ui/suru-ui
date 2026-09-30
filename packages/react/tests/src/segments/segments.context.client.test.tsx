import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../../src/errors.js";
import { SegmentsContext, useSegmentsContext } from "../../../src/segments/segments.context.js";
import { SegmentsRoot } from "../../../src/segments/segments.root.jsx";

describe("useSegmentsContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    const provided = {
      activeVariant: "solid",
      color: "blue",
      items: ["day", "week"],
      radius: "full",
      size: "lg",
    } as const;
    function Probe() {
      const ctx = useSegmentsContext();

      return (
        <span>
          {`${ctx.size}/${ctx.color}/${ctx.radius}/${ctx.activeVariant}/${ctx.items.length}`}
        </span>
      );
    }

    // 実行
    const screen = await render(
      <SegmentsContext value={provided}>
        <Probe />
      </SegmentsContext>,
    );

    // 検証
    expect(screen.getByText("lg/blue/full/solid/2").query()?.textContent).toBe(
      "lg/blue/full/solid/2",
    );
  });

  test("ルートの状態を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useSegmentsContext();

      return (
        <span>
          {`${ctx.size}/${ctx.color}/${ctx.radius}/${ctx.activeVariant}/${ctx.items.length}`}
        </span>
      );
    }

    // 実行
    const screen = await render(
      <SegmentsRoot
        activeVariant="naked"
        color="red"
        items={["day", "week"]}
        radius="none"
        size="sm"
      >
        <Probe />
      </SegmentsRoot>,
    );

    // 検証
    expect(screen.getByText("sm/red/none/naked/2").query()?.textContent).toBe(
      "sm/red/none/naked/2",
    );
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useSegmentsContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useSegmentsContext(true);
      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
