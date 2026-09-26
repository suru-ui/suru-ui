import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { TooltipGroup } from "../../../src/tooltip-group/tooltip-group.jsx";
import { Tooltip } from "../../../src/tooltip/tooltip.jsx";

describe("TooltipGroup", () => {
  test("ツールチップのトリガーを子として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TooltipGroup>
        <Tooltip trigger={<button>保存</button>}>保存します</Tooltip>
        <Tooltip trigger={<button>共有</button>}>共有します</Tooltip>
      </TooltipGroup>,
    );

    // 検証
    expect(screen.getByRole("button", { name: "保存" }).query()).not.toBe(null);
    expect(screen.getByRole("button", { name: "共有" }).query()).not.toBe(null);
  });

  test("開くまでツールチップの内容を表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TooltipGroup>
        <Tooltip trigger={<button>保存</button>}>保存します</Tooltip>
      </TooltipGroup>,
    );

    // 検証
    expect(screen.getByRole("tooltip").query()).toBe(null);
  });

  test("開いた内容をツールチップとして読み上げさせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TooltipGroup>
        <Tooltip defaultOpen trigger={<button>保存</button>}>
          保存します
        </Tooltip>
      </TooltipGroup>,
    );

    // 検証
    expect(screen.getByRole("tooltip").element().textContent).toBe("保存します");
  });

  test("閉じた後に近接するツールチップをすぐに開く", async ({ expect }) => {
    // 準備
    const screen = await render(
      <TooltipGroup delay={1000}>
        <Tooltip trigger={<button>保存</button>}>保存します</Tooltip>
        <Tooltip trigger={<button>共有</button>}>共有します</Tooltip>
      </TooltipGroup>,
    );

    // 実行
    await screen.getByRole("button", { name: "保存" }).hover();
    await vi.waitFor(
      () => {
        expect(screen.getByText("保存します").query()).not.toBe(null);
      },
      { timeout: 3000 },
    );
    await screen.getByRole("button", { name: "共有" }).hover();

    // 検証
    await vi.waitFor(
      () => {
        expect(screen.getByText("共有します").query()).not.toBe(null);
      },
      { timeout: 500 },
    );
  });
});
