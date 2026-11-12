import { test, describe, expectTypeOf } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { type TooltipGroupProps, TooltipGroupAPI, useTooltipGroupAPI } from "./tooltip-group.jsx";

describe("TooltipGroupAPI", () => {
  test("getRootProps は渡した props を返す", ({ expect }) => {
    // 準備と実行。
    const api = new TooltipGroupAPI({
      delay: 300,
      timeout: 400,
      closeDelay: 100,
    });
    const rootProps = api.getRootProps();

    // 検証。
    expect(rootProps).toStrictEqual({
      delay: 300,
      timeout: 400,
      closeDelay: 100,
    });
  });
});

describe("useTooltipGroupAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備。
    function Probe() {
      const api = useTooltipGroupAPI({ timeout: 200 });

      return <span>{api.getRootProps().timeout}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("200").query()?.textContent).toBe("200");
  });
});

describe("TooltipGroupProps の型", () => {
  test("共有する待ち時間の props を公開する", () => {
    // 準備と実行と検証。
    expectTypeOf<TooltipGroupProps>().toHaveProperty("delay");
    expectTypeOf<TooltipGroupProps>().toHaveProperty("closeDelay");
    expectTypeOf<TooltipGroupProps>().toHaveProperty("timeout");
  });
});
