import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { Tooltip } from "../tooltip/tooltip.jsx";
import { TooltipGroup } from "./tooltip-group.jsx";

describe("TooltipGroup", () => {
  test("ツールチップのトリガーを子として描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TooltipGroup>
        <Tooltip trigger={<button>保存</button>}>保存します</Tooltip>
        <Tooltip trigger={<button>共有</button>}>共有します</Tooltip>
      </TooltipGroup>,
    );

    // 検証。
    expect(screen.getByRole("button", { name: "保存" }).query()).not.toBe(null);
    expect(screen.getByRole("button", { name: "共有" }).query()).not.toBe(null);
  });

  test("開くまでツールチップの内容を表示しない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TooltipGroup>
        <Tooltip trigger={<button>保存</button>}>保存します</Tooltip>
      </TooltipGroup>,
    );

    // 検証。
    expect(screen.getByRole("tooltip").query()).toBe(null);
  });

  test("開いた内容をツールチップとして読み上げさせる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TooltipGroup>
        <Tooltip trigger={<button>保存</button>} defaultOpen>
          保存します
        </Tooltip>
      </TooltipGroup>,
    );

    // 検証。
    expect(screen.getByRole("tooltip").element().textContent).toBe("保存します");
  });
});
