import * as React from "react";
import { test, describe } from "vitest";

import { PopoverAPI } from "./popover.jsx";

describe("getRootProps", () => {
  test("指定した値をそのまま返す", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({
      open: true,
      size: "lg",
      modal: true,
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
    expect(rootProps.modal).toBe(true);
    expect(rootProps.defaultTriggerId).toBe("trigger");
  });

  test("合成専用の props を除外する", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({
      arrow: true,
      trigger: <button>開く</button>,
      backdrop: true,
      slotProps: { trigger: { id: "trigger" } },
    });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps).not.toHaveProperty("arrow");
    expect(rootProps).not.toHaveProperty("backdrop");
    expect(rootProps).not.toHaveProperty("slotProps");
    expect(rootProps).not.toHaveProperty("trigger");
  });

  test("内容用の props を表示要素へ渡さない", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({ id: "popover", className: "custom" });
    const rootProps = api.getRootProps();
    const contentProps = api.getContentProps();

    // 検証
    expect(rootProps).not.toHaveProperty("className");
    expect(rootProps).not.toHaveProperty("id");
    expect(contentProps.className).toBe("custom");
    expect(contentProps.id).toBe("popover");
  });
});

describe("getTriggerProps", () => {
  test("対象を指定しないときは表示しない", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({});

    // 検証
    expect(api.getTriggerProps()).toBe(null);
  });

  test("対象を指定したときは子要素にする", ({ expect }) => {
    // 準備と実行
    const trigger = <button>開く</button>;
    const api = new PopoverAPI({ trigger });
    const props = api.getTriggerProps();

    // 検証
    expect(props?.children).toBe(trigger);
  });

  test("slotProps と指定内容を結合する", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({
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
    const api = new PopoverAPI({});

    // 検証
    expect(api.getArrowProps()).toBe(null);
  });

  test("有効にすると props を返す", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({ arrow: true });

    // 検証
    expect(api.getArrowProps()).toStrictEqual({});
  });

  test("slotProps だけでも表示する", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({ slotProps: { arrow: { id: "arrow" } } });

    // 検証
    expect(api.getArrowProps()).toStrictEqual({ id: "arrow" });
  });
});

describe("getBackdropProps", () => {
  test("指定しないときは表示しない", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({});

    // 検証
    expect(api.getBackdropProps()).toBe(null);
  });

  test("有効にすると props を返す", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({ backdrop: true });

    // 検証
    expect(api.getBackdropProps()).toStrictEqual({});
  });

  test("slotProps だけでも表示する", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({ slotProps: { backdrop: { id: "backdrop" } } });

    // 検証
    expect(api.getBackdropProps()).toStrictEqual({ id: "backdrop" });
  });
});

describe("getPortalProps", () => {
  test("slotProps を返す", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({ slotProps: { portal: { id: "portal" } } });

    // 検証
    expect(api.getPortalProps()).toStrictEqual({ id: "portal" });
  });
});

describe("getPositionerProps", () => {
  test("既定では下端の中央に余白を空けて配置する", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({});

    // 検証
    expect(api.getPositionerProps()).toStrictEqual({
      side: "bottom",
      align: "center",
      sideOffset: 8,
    });
  });

  test("指定した値を既定値に重ねる", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({
      slotProps: { positioner: { id: "positioner", side: "top", align: "end", sideOffset: 4 } },
    });

    // 検証
    expect(api.getPositionerProps()).toStrictEqual({
      id: "positioner",
      side: "top",
      align: "end",
      sideOffset: 4,
    });
  });
});

describe("getContentProps", () => {
  test("slotProps と指定内容を結合する", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({
      className: "custom",
      slotProps: { content: { id: "content" } },
    });

    // 検証
    expect(api.getContentProps()).toStrictEqual({ id: "content", className: "custom" });
  });

  test("指定内容で slotProps を上書きする", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({
      className: "custom",
      slotProps: { content: { className: "slot" } },
    });

    // 検証
    expect(api.getContentProps().className).toBe("custom");
  });
});

describe("getContentChildren", () => {
  test("指定した内容を返す", ({ expect }) => {
    // 準備と実行
    const api = new PopoverAPI({ children: "内容" });

    // 検証
    expect(api.getContentChildren()).toBe("内容");
  });
});
