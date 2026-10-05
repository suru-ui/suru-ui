import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { TooltipGroupRoot } from "./tooltip-group.root.jsx";

describe("TooltipGroupRoot", () => {
  test("自身の要素を描画せず子だけを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TooltipGroupRoot>
        <span>内容</span>
      </TooltipGroupRoot>,
    );

    // 検証
    expect(screen.container.childElementCount).toBe(1);
    expect(screen.container.firstElementChild?.tagName).toBe("SPAN");
    expect(screen.container.textContent).toBe("内容");
  });

  test("複数の子をそのままの順序で描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TooltipGroupRoot>
        <span>保存</span>
        <span>共有</span>
      </TooltipGroupRoot>,
    );

    // 検証
    expect(screen.container.childElementCount).toBe(2);
    expect(screen.container.textContent).toBe("保存共有");
  });
});
