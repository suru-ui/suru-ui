import { test, describe } from "vitest";

import {
  type SelectListItemObjectGroup,
  type SelectListLabeledItemObject,
} from "./list/select.list.jsx";
import { SelectAPI } from "./select.jsx";

describe("getLabelProps", () => {
  test("指定しないときは表示しない", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({});

    // 検証
    expect(api.getLabelProps()).toBe(null);
  });

  test("指定した内容を子要素にする", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({ label: "果物" });

    // 検証
    expect(api.getLabelProps()).toStrictEqual({ children: "果物" });
  });

  test.for([null, undefined, false, true])(
    "表示できない内容は無視する (%s)",
    (label, { expect }) => {
      // 準備と実行
      const api = new SelectAPI({ label });

      // 検証
      expect(api.getLabelProps()).toBe(null);
    },
  );

  test("空文字は表示対象にする", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({ label: "" });

    // 検証
    expect(api.getLabelProps()).toStrictEqual({ children: "" });
  });
});

describe("getListProps", () => {
  test("指定しないときは既定レンダラーを使う", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({});

    // 検証
    expect(typeof api.getListProps().children).toBe("function");
  });

  test("関数子をレンダラーとして使う", ({ expect }) => {
    // 準備
    const renderer = () => null;

    // 実行
    const api = new SelectAPI({ children: renderer });

    // 検証
    expect(api.getListProps().children).toBe(renderer);
  });

  test("slotProps の内容とレンダラーを両立する", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({ slotProps: { list: { id: "list" } } });
    const props = api.getListProps();

    // 検証
    expect(props.id).toBe("list");
    expect(typeof props.children).toBe("function");
  });
});

describe("getValueProps", () => {
  test("既定のプレースホルダーを返す", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({});

    // 検証
    expect(api.getValueProps().placeholder).toBe("選択してください");
  });

  test("slotProps のプレースホルダーを優先する", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({
      slotProps: { value: { placeholder: "候補を選択" } },
      placeholder: "選択",
    });

    // 検証
    expect(api.getValueProps().placeholder).toBe("候補を選択");
  });
});

describe("getSeparatorProps", () => {
  test("末尾のグループでは表示しない", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({});

    // 検証
    expect(api.getSeparatorProps(1, ["a", "b"])).toBe(null);
  });

  test("途中のグループでは表示する", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({ slotProps: { separator: { id: "sep" } } });

    // 検証
    expect(api.getSeparatorProps(0, ["a", "b"])).toStrictEqual({ id: "sep" });
  });
});

describe("getGroupLabelProps", () => {
  test("ラベルがあるときは子要素にする", ({ expect }) => {
    // 準備
    const item: SelectListItemObjectGroup = { items: [], label: "果物" };

    // 実行
    const api = new SelectAPI({});
    const props = api.getGroupLabelProps(item);

    // 検証
    expect(props).toStrictEqual({ children: "果物" });
  });

  test("ラベルがないときは表示しない", ({ expect }) => {
    // 準備
    const item: SelectListItemObjectGroup = { items: [] };

    // 実行
    const api = new SelectAPI({});

    // 検証
    expect(api.getGroupLabelProps(item)).toBe(null);
  });
});

describe("getGroupProps", () => {
  test("項目とラベルをグループの props から除く", ({ expect }) => {
    // 準備
    const item: SelectListItemObjectGroup = { items: [], label: "果物" };

    // 実行
    const api = new SelectAPI({});
    const props = api.getGroupProps(item);

    // 検証
    expect(props).not.toHaveProperty("items");
    expect(props).not.toHaveProperty("label");
  });
});

describe("getGroupedItems", () => {
  test("グループの項目を返す", ({ expect }) => {
    // 準備
    const groupedItem: SelectListLabeledItemObject = { label: "りんご", value: "apple" };
    const item: SelectListItemObjectGroup = { items: [groupedItem] };

    // 実行
    const api = new SelectAPI({});

    // 検証
    expect(api.getGroupedItems(item)).toStrictEqual([groupedItem]);
  });
});

describe("getItemProps", () => {
  test("ラベルを除いて項目を引き継ぐ", ({ expect }) => {
    // 準備
    const item: SelectListLabeledItemObject = { label: "りんご", value: "apple" };

    // 実行
    const api = new SelectAPI({});
    const props = api.getItemProps(item);

    // 検証
    expect(props.value).toBe("apple");
    expect(props).not.toHaveProperty("label");
  });
});

describe("getItemTextProps", () => {
  test("ラベルを表示内容にする", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({});

    // 検証
    expect(api.getItemTextProps({ label: "りんご", value: "apple" }).children).toBe("りんご");
  });

  test("ラベルがないときは値を表示内容にする", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({});

    // 検証
    expect(api.getItemTextProps({ label: undefined, value: "apple" }).children).toBe("apple");
  });
});

describe("getIconProps", () => {
  test("既定のアイコンを子要素にする", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({});

    // 検証
    expect(api.getIconProps().children).not.toBe(undefined);
  });

  test("slotProps の子要素を優先する", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({ slotProps: { icon: { children: null } } });

    // 検証
    expect(api.getIconProps().children).toBe(null);
  });
});

describe("getItemIndicatorProps", () => {
  test("既定のチェックアイコンを子要素にする", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({});

    // 検証
    expect(api.getItemIndicatorProps().children).not.toBe(undefined);
  });
});

describe("getScrollUpArrowProps", () => {
  test("既定のアイコンを子要素にする", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({});

    // 検証
    expect(api.getScrollUpArrowProps().children).not.toBe(undefined);
  });
});

describe("getScrollDownArrowProps", () => {
  test("既定のアイコンを子要素にする", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({});

    // 検証
    expect(api.getScrollDownArrowProps().children).not.toBe(undefined);
  });
});

describe("getPositionerProps", () => {
  test("既定の配置を補完する", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({});
    const props = api.getPositionerProps();

    // 検証
    expect(props.side).toBe("bottom");
    expect(props.align).toBe("start");
    expect(props.sideOffset).toBe(8);
    expect(props.alignItemWithTrigger).toBe(true);
  });

  test("指定した配置を優先する", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({ slotProps: { positioner: { side: "top" } } });

    // 検証
    expect(api.getPositionerProps().side).toBe("top");
  });
});

describe("getRootProps", () => {
  test("Select 固有の props を Root へ渡さない", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({ label: "果物", slotProps: {}, placeholder: "選択" });
    const props = api.getRootProps();

    // 検証
    expect(props).not.toHaveProperty("label");
    expect(props).not.toHaveProperty("placeholder");
    expect(props).not.toHaveProperty("slotProps");
  });

  test("Root の props を引き継ぐ", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({ size: "lg", variant: "naked", outlined: true });

    // 検証
    expect(api.getRootProps().size).toBe("lg");
    expect(api.getRootProps().variant).toBe("naked");
    expect(api.getRootProps().outlined).toBe(true);
  });
});

describe("getTriggerProps", () => {
  test("トリガー固有の props を返す", ({ expect }) => {
    // 準備と実行
    const api = new SelectAPI({ className: "custom" });

    // 検証
    expect(api.getTriggerProps().className).toBe("custom");
  });
});
