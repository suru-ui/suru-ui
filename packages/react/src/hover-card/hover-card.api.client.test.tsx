import * as React from "react";
import { test, describe } from "vitest";

import { HoverCardAPI } from "./hover-card.jsx";

describe("getRootProps", () => {
  test("指定した値をそのまま返す", ({ expect }) => {
    // 準備と実行
    const api = new HoverCardAPI({
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
    const api = new HoverCardAPI({ arrow: true, slotProps: { arrow: { id: "arrow" } } });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps).not.toHaveProperty("arrow");
    expect(rootProps).not.toHaveProperty("slotProps");
    expect(rootProps).not.toHaveProperty("trigger");
  });

  test("内容用の props を表示要素へ渡さない", ({ expect }) => {
    // 準備と実行
    const api = new HoverCardAPI({ id: "card", className: "custom" });
    const rootProps = api.getRootProps();
    const contentProps = api.getContentProps();

    // 検証
    expect(rootProps).not.toHaveProperty("className");
    expect(rootProps).not.toHaveProperty("id");
    expect(contentProps.className).toBe("custom");
    expect(contentProps.id).toBe("card");
  });
});

describe("getTriggerProps", () => {
  test("対象を指定しないときは表示しない", ({ expect }) => {
    // 準備と実行
    const api = new HoverCardAPI({});

    // 検証
    expect(api.getTriggerProps()).toBe(null);
  });

  test("対象を指定したときは子要素にする", ({ expect }) => {
    // 準備と実行
    const trigger = <a href="#terms">利用規約</a>;
    const api = new HoverCardAPI({ delay: 600, trigger, closeDelay: 300 });
    const props = api.getTriggerProps();

    // 検証
    expect(props?.children).toBe(trigger);
    expect(props?.delay).toBe(600);
    expect(props?.closeDelay).toBe(300);
  });

  test("slotProps と指定内容を結合する", ({ expect }) => {
    // 準備と実行
    const api = new HoverCardAPI({
      trigger: <a href="#terms">利用規約</a>,
      slotProps: { trigger: { id: "terms" } },
    });
    const props = api.getTriggerProps();

    // 検証
    expect(props?.id).toBe("terms");
    expect(props?.children).not.toBe(undefined);
  });
});

describe("getArrowProps", () => {
  test("指定しないときは表示しない", ({ expect }) => {
    // 準備と実行
    const api = new HoverCardAPI({});

    // 検証
    expect(api.getArrowProps()).toBe(null);
  });

  test("有効にすると props を返す", ({ expect }) => {
    // 準備と実行
    const api = new HoverCardAPI({ arrow: true });

    // 検証
    expect(api.getArrowProps()).toStrictEqual({});
  });

  test("slotProps だけでも表示する", ({ expect }) => {
    // 準備と実行
    const api = new HoverCardAPI({ slotProps: { arrow: { id: "arrow" } } });

    // 検証
    expect(api.getArrowProps()).toStrictEqual({ id: "arrow" });
  });
});

describe("getBackdropProps", () => {
  test("指定しないときは表示しない", ({ expect }) => {
    // 準備と実行
    const api = new HoverCardAPI({});

    // 検証
    expect(api.getBackdropProps()).toBe(null);
  });

  test("有効にすると props を返す", ({ expect }) => {
    // 準備と実行
    const api = new HoverCardAPI({ backdrop: true });

    // 検証
    expect(api.getBackdropProps()).toStrictEqual({});
  });

  test("slotProps だけでも表示する", ({ expect }) => {
    // 準備と実行
    const api = new HoverCardAPI({ slotProps: { backdrop: { id: "backdrop" } } });

    // 検証
    expect(api.getBackdropProps()).toStrictEqual({ id: "backdrop" });
  });
});

describe("getPortalProps", () => {
  test("slotProps を返す", ({ expect }) => {
    // 準備と実行
    const api = new HoverCardAPI({ slotProps: { portal: { id: "portal" } } });

    // 検証
    expect(api.getPortalProps()).toStrictEqual({ id: "portal" });
  });
});

describe("getPositionerProps", () => {
  test("slotProps を返す", ({ expect }) => {
    // 準備と実行
    const api = new HoverCardAPI({ slotProps: { positioner: { side: "top" } } });

    // 検証
    expect(api.getPositionerProps()).toStrictEqual({ side: "top" });
  });
});

describe("getContentChildren", () => {
  test("指定した内容を返す", ({ expect }) => {
    // 準備と実行
    const api = new HoverCardAPI({ children: "内容" });

    // 検証
    expect(api.getContentChildren()).toBe("内容");
  });

  test("関数をそのまま返す", ({ expect }) => {
    // 準備と実行
    const renderer = () => "内容";
    const api = new HoverCardAPI({ children: renderer });

    // 検証
    expect(api.getContentChildren()).toBe(renderer);
  });
});
