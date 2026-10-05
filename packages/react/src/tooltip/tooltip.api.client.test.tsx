import * as React from "react";
import { test, describe } from "vitest";

import { TooltipAPI } from "./tooltip.jsx";

describe("getRootProps", () => {
  test("指定した値をそのまま返す", ({ expect }) => {
    // 準備と実行
    const api = new TooltipAPI({
      open: true,
      size: "lg",
      radius: "sm",
      outlined: true,
      defaultTriggerId: "trigger",
    });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.open).toBe(true);
    expect(rootProps.size).toBe("lg");
    expect(rootProps.radius).toBe("sm");
    expect(rootProps.outlined).toBe(true);
    expect(rootProps.defaultTriggerId).toBe("trigger");
  });

  test("合成専用の props を除外する", ({ expect }) => {
    // 準備と実行
    const api = new TooltipAPI({
      trigger: <button>開く</button>,
      showArrow: true,
      slotProps: { arrow: { id: "arrow" } },
    });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps).not.toHaveProperty("showArrow");
    expect(rootProps).not.toHaveProperty("slotProps");
    expect(rootProps).not.toHaveProperty("trigger");
  });

  test("内容用の props を表示要素へ渡さない", ({ expect }) => {
    // 準備と実行
    const api = new TooltipAPI({ id: "tooltip", className: "custom" });
    const rootProps = api.getRootProps();
    const contentProps = api.getContentProps();

    // 検証
    expect(rootProps).not.toHaveProperty("className");
    expect(rootProps).not.toHaveProperty("id");
    expect(contentProps.className).toBe("custom");
    expect(contentProps.id).toBe("tooltip");
  });
});

describe("getTriggerProps", () => {
  test("対象を指定しないときは表示しない", ({ expect }) => {
    // 準備と実行
    const api = new TooltipAPI({});

    // 検証
    expect(api.getTriggerProps()).toBe(null);
  });

  test("対象を指定したときは子要素と待ち時間にする", ({ expect }) => {
    // 準備と実行
    const trigger = <button>開く</button>;
    const api = new TooltipAPI({ delay: 600, trigger, closeDelay: 300, keepOpenOnClick: true });
    const props = api.getTriggerProps();

    // 検証
    expect(props?.children).toBe(trigger);
    expect(props?.delay).toBe(600);
    expect(props?.closeDelay).toBe(300);
    expect(props?.keepOpenOnClick).toBe(true);
  });

  test("slotProps と指定内容を結合する", ({ expect }) => {
    // 準備と実行
    const api = new TooltipAPI({
      trigger: <button>開く</button>,
      slotProps: { trigger: { id: "trigger" } },
    });
    const props = api.getTriggerProps();

    // 検証
    expect(props?.id).toBe("trigger");
    expect(props?.children).not.toBe(undefined);
  });
});

describe("getArrowProps", () => {
  test("指定しないときは表示しない", ({ expect }) => {
    // 準備と実行
    const api = new TooltipAPI({});

    // 検証
    expect(api.getArrowProps()).toBe(null);
  });

  test("有効にすると props を返す", ({ expect }) => {
    // 準備と実行
    const api = new TooltipAPI({ showArrow: true });

    // 検証
    expect(api.getArrowProps()).toStrictEqual({});
  });

  test("slotProps だけでも表示する", ({ expect }) => {
    // 準備と実行
    const api = new TooltipAPI({ slotProps: { arrow: { id: "arrow" } } });

    // 検証
    expect(api.getArrowProps()).toStrictEqual({ id: "arrow" });
  });
});

describe("getPortalProps", () => {
  test("slotProps を返す", ({ expect }) => {
    // 準備と実行
    const api = new TooltipAPI({ slotProps: { portal: { id: "portal" } } });

    // 検証
    expect(api.getPortalProps()).toStrictEqual({ id: "portal" });
  });
});

describe("getPositionerProps", () => {
  test("slotProps を返す", ({ expect }) => {
    // 準備と実行
    const api = new TooltipAPI({ slotProps: { positioner: { className: "custom" } } });
    const props = api.getPositionerProps();

    // 検証
    expect(props.className).toBe("custom");
  });

  test("既定では上側に余白を空けて配置する", ({ expect }) => {
    // 準備と実行
    const api = new TooltipAPI({});
    const props = api.getPositionerProps();

    // 検証
    expect(props.side).toBe("top");
    expect(props.sideOffset).toBe(8);
  });

  test("指定位置と slotProps を合わせて返す", ({ expect }) => {
    // 準備と実行
    const api = new TooltipAPI({
      side: "bottom",
      slotProps: { positioner: { className: "custom" } },
    });
    const props = api.getPositionerProps();

    // 検証
    expect(props.side).toBe("bottom");
    expect(props.className).toBe("custom");
  });
});

describe("getContentChildren", () => {
  test("指定した内容を返す", ({ expect }) => {
    // 準備と実行
    const api = new TooltipAPI({ children: "内容" });

    // 検証
    expect(api.getContentChildren()).toBe("内容");
  });
});
