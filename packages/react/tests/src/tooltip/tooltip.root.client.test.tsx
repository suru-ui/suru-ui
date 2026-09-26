import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { TooltipContent } from "../../../src/tooltip/tooltip.content.jsx";
import { useTooltipContext } from "../../../src/tooltip/tooltip.context.js";
import { Tooltip } from "../../../src/tooltip/tooltip.jsx";
import { TooltipPortal } from "../../../src/tooltip/tooltip.portal.jsx";
import { TooltipPositioner } from "../../../src/tooltip/tooltip.positioner.jsx";
import { TooltipRoot } from "../../../src/tooltip/tooltip.root.jsx";
import "../_locators.js";

type Member = {
  name: string;
};

describe("TooltipRoot", () => {
  test("自身の見た目を持つ要素を表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TooltipRoot>
        <span>内容</span>
      </TooltipRoot>,
    );

    // 検証
    expect(screen.getByText("内容").query()?.textContent).toBe("内容");
    expect(screen.getByClassName("sui_tooltip_portal").query()).toBe(null);
  });

  test("大きさと角丸と枠線を子パーツへ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useTooltipContext();

      return <span>{`${ctx.size}/${ctx.radius}/${ctx.outlined}`}</span>;
    }

    // 実行
    const screen = await render(
      <TooltipRoot size="lg" radius="sm" outlined>
        <Probe />
      </TooltipRoot>,
    );

    // 検証
    expect(screen.getByText("lg/sm/true").query()?.textContent).toBe("lg/sm/true");
  });

  test("角丸の既定値は大きさにする", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useTooltipContext();

      return <span>{ctx.radius}</span>;
    }

    // 実行
    const screen = await render(
      <TooltipRoot size="sm">
        <Probe />
      </TooltipRoot>,
    );

    // 検証
    expect(screen.getByText("sm").query()?.textContent).toBe("sm");
  });
});

describe("Tooltip", () => {
  test("閉じているときは内容を表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Tooltip trigger={<button>保存</button>}>保存します</Tooltip>);

    // 検証
    expect(screen.getByRole("button", { name: "保存" }).query()?.textContent).toBe("保存");
    expect(screen.getByText("保存します").query()).toBe(null);
  });

  test("既定で開いた状態では内容を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Tooltip defaultOpen trigger={<button>保存</button>}>
        保存します
      </Tooltip>,
    );

    // 検証
    const content = screen.getByClassName("sui_tooltip_content").element();
    expect(content.textContent).toBe("保存します");
  });

  test("トリガーの payload を内容へ渡す", async ({ expect }) => {
    // 準備
    const handle = Tooltip.createHandle<Member>();

    // 実行
    const screen = await render(
      <>
        <Tooltip.Trigger handle={handle} delay={0} payload={{ name: "田中" }}>
          {(props) => <button {...props}>作成者</button>}
        </Tooltip.Trigger>
        <TooltipRoot handle={handle}>
          {({ payload }) => (
            <TooltipPortal>
              <TooltipPositioner>
                <TooltipContent>作成者: {payload?.name ?? "なし"}</TooltipContent>
              </TooltipPositioner>
            </TooltipPortal>
          )}
        </TooltipRoot>
      </>,
    );
    await screen.getByRole("button", { name: "作成者" }).hover();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByText("作成者: 田中").query()?.textContent).toBe("作成者: 田中");
    });
  });

  test("内容用の props をポップアップへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Tooltip
        className="custom-content"
        data-testid="tooltip"
        defaultOpen
        trigger={<button>開く</button>}
      >
        内容
      </Tooltip>,
    );

    // 検証
    const content = screen.getByClassName("sui_tooltip_content").element();
    expect(content.classList.contains("custom-content")).toBe(true);
    expect(content.dataset["testid"]).toBe("tooltip");
  });
});
