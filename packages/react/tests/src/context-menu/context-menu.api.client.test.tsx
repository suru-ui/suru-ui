import { describe, test } from "vitest";

import { ContextMenuAPI } from "../../../src/context-menu/context-menu.jsx";

describe("getRootProps", () => {
  test("既定値を補完する", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({});
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.size).toBe(undefined);
    expect(rootProps.radius).toBe(undefined);
    expect(rootProps.variant).toBe(undefined);
    expect(rootProps.items).toBe(undefined);
  });

  test("指定した値をそのまま返す", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({
      size: "lg",
      radius: "sm",
      variant: "liquid",
      outlined: true,
      disabled: true,
      items: [{ label: "編集" }],
    });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.size).toBe("lg");
    expect(rootProps.radius).toBe("sm");
    expect(rootProps.variant).toBe("liquid");
    expect(rootProps.outlined).toBe(true);
    expect(rootProps.disabled).toBe(true);
    expect(rootProps.items).toStrictEqual([{ label: "編集" }]);
  });
});

describe("getContentProps", () => {
  test("内容を指定しないときは既定のレンダラーを返す", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({ items: [{ label: "編集" }] });
    const contentProps = api.getContentProps();

    // 検証
    expect(typeof contentProps.children).toBe("function");
  });

  test("内容を指定したときはその内容を返す", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({ children: <span>内容</span> });
    const contentProps = api.getContentProps();

    // 検証
    expect(contentProps.children).not.toBe(undefined);
    expect(typeof contentProps.children).not.toBe("function");
  });
});

describe("getTriggerProps", () => {
  test("対象を指定しないときは表示しない", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({});

    // 検証
    expect(api.getTriggerProps()).toBe(null);
  });

  test("対象を指定したときは子要素にする", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({ trigger: <div>右クリック領域</div> });

    // 検証
    expect(api.getTriggerProps()?.children).not.toBe(undefined);
  });
});

describe("getItemProps", () => {
  test("項目を指定しないときは slotProps を返す", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({ slotProps: { item: { id: "item" } } });

    // 検証
    expect(api.getItemProps()).toStrictEqual({ id: "item" });
  });

  test("ラベルを子要素にして種類を除く", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({});
    const props = api.getItemProps({ type: "item", label: "編集", id: "edit" });

    // 検証
    expect(props.children).toBe("編集");
    expect(props.id).toBe("edit");
    expect(props).not.toHaveProperty("label");
    expect(props).not.toHaveProperty("type");
  });

  test("slotProps と項目の指定を結合する", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({ slotProps: { item: { id: "slot" } } });
    const props = api.getItemProps({ label: "編集", color: "red" });

    // 検証
    expect(props).toStrictEqual({ id: "slot", color: "red", children: "編集" });
  });
});

describe("getLinkItemProps", () => {
  test("ラベルを子要素にして種類を除く", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({});
    const props = api.getLinkItemProps({ type: "link", label: "ドキュメント", href: "/docs" });

    // 検証
    expect(props.children).toBe("ドキュメント");
    expect(props.href).toBe("/docs");
    expect(props).not.toHaveProperty("type");
  });
});

describe("getCheckboxItemProps", () => {
  test("ラベルを子要素にして種類を除く", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({});
    const props = api.getCheckboxItemProps({
      type: "checkbox",
      label: "サイドバー",
      defaultChecked: true,
    });

    // 検証
    expect(props.children).toBe("サイドバー");
    expect(props.defaultChecked).toBe(true);
    expect(props).not.toHaveProperty("type");
  });
});

describe("getRadioGroupProps", () => {
  test("項目を除いて種類を除く", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({});
    const props = api.getRadioGroupProps({
      type: "radio-group",
      value: "name",
      items: [{ label: "名前", value: "name" }],
    });

    // 検証
    expect(props.value).toBe("name");
    expect(props).not.toHaveProperty("type");
  });
});

describe("getRadioItemProps", () => {
  test("ラベルを子要素にして種類を除く", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({});
    const props = api.getRadioItemProps({ type: "radio", label: "名前", value: "name" });

    // 検証
    expect(props.children).toBe("名前");
    expect(props.value).toBe("name");
    expect(props).not.toHaveProperty("type");
  });

  test("項目を指定しないときは slotProps を返す", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({ slotProps: { radioItem: { id: "radio" } } });

    // 検証
    expect(api.getRadioItemProps()).toStrictEqual({ id: "radio" });
  });
});

describe("getGroupProps", () => {
  test("ラベルと項目を除く", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({});
    const props = api.getGroupProps({
      type: "group",
      label: "果物",
      items: [{ label: "りんご" }],
      id: "fruits",
    });

    // 検証
    expect(props).toStrictEqual({ id: "fruits" });
  });
});

describe("getGroupLabelProps", () => {
  test("ラベルがあるときは子要素にする", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({});
    const props = api.getGroupLabelProps({ label: "果物", items: [] });

    // 検証
    expect(props?.children).toBe("果物");
  });

  test("表示できないラベルでは null を返す", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({});

    // 検証
    expect(api.getGroupLabelProps({ label: null, items: [] })).toBe(null);
  });
});

describe("getSubmenuRootProps", () => {
  test("ラベルと種類を除いて項目を残す", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({});
    const props = api.getSubmenuRootProps({
      type: "submenu",
      label: "共有",
      items: [{ label: "リンクをコピー" }],
    });

    // 検証
    expect(props.items).toStrictEqual([{ label: "リンクをコピー" }]);
    expect(props).not.toHaveProperty("type");
    expect(props).not.toHaveProperty("label");
  });
});

describe("getSubmenuTriggerProps", () => {
  test("ラベルを子要素にする", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({});
    const props = api.getSubmenuTriggerProps({
      type: "submenu",
      label: "共有",
      items: [],
    });

    // 検証
    expect(props.children).toBe("共有");
    expect(props).not.toHaveProperty("type");
  });
});

describe("getRadioItemIndicatorProps", () => {
  test("既定の表示内容を子要素にする", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({});

    // 検証
    expect(api.getRadioItemIndicatorProps().children).not.toBe(undefined);
  });

  test("指定した表示内容を優先する", ({ expect }) => {
    // 準備と実行
    const api = new ContextMenuAPI({ radioIndicator: <span>選択</span> });
    const props = api.getRadioItemIndicatorProps();

    // 検証
    expect(typeof props.children).not.toBe("string");
  });
});
