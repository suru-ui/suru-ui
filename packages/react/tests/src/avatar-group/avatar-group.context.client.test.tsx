import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  AvatarGroupContext,
  useAvatarGroupContext,
} from "../../../src/avatar-group/avatar-group.context.js";
import { AvatarGroupRoot } from "../../../src/avatar-group/avatar-group.root.jsx";
import { ContextMissingError } from "../../../src/errors.js";

describe("useAvatarGroupContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useAvatarGroupContext();
      return <span>{[ctx.size, ctx.color, ctx.radius].join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <AvatarGroupRoot aria-label="仲間" size="lg" color="blue" radius="none">
        <Probe />
      </AvatarGroupRoot>,
    );

    // 検証
    expect(screen.getByText("lg,blue,none").query()?.textContent).toBe("lg,blue,none");
  });

  test("既定値を補完する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useAvatarGroupContext();
      return <span>{[ctx.size, ctx.color, ctx.radius].join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <AvatarGroupRoot aria-label="仲間">
        <Probe />
      </AvatarGroupRoot>,
    );

    // 検証
    expect(screen.getByText("md,blue,full").query()?.textContent).toBe("md,blue,full");
  });

  test("色を自動で割り当てる", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useAvatarGroupContext();
      return <span>{ctx.color}</span>;
    }

    // 実行
    const screen = await render(
      <AvatarGroupRoot aria-label="仲間">
        <Probe />
        <Probe />
        <Probe />
      </AvatarGroupRoot>,
    );

    // 検証
    expect(screen.getByText("blue").query()).not.toBe(null);
    expect(screen.getByText("purple").query()).not.toBe(null);
    expect(screen.getByText("magenta").query()).not.toBe(null);
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useAvatarGroupContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useAvatarGroupContext(true);
      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });

  test("直接提供した値を返す", async ({ expect }) => {
    // 準備
    const provided = { size: "sm", color: "red", radius: "sm" } as const;
    function Probe() {
      const ctx = useAvatarGroupContext();
      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行
    const screen = await render(
      <AvatarGroupContext value={provided}>
        <Probe />
      </AvatarGroupContext>,
    );

    // 検証
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});
