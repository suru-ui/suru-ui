import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { API, useAPI, MenubarAPI, useMenubarAPI } from "./menubar.jsx";

describe("getMenuProps", () => {
  test("項目を指定しないときは slotProps を返す", ({ expect }) => {
    // 準備と実行
    const api = new MenubarAPI({ slotProps: { menu: { id: "menu" } } });

    // 検証
    expect(api.getMenuProps()).toStrictEqual({ id: "menu" });
  });

  test("slotProps と項目の指定を結合する", ({ expect }) => {
    // 準備と実行
    const api = new MenubarAPI({ slotProps: { menu: { size: "lg" } } });
    const props = api.getMenuProps({
      items: [{ label: "新規作成" }],
      trigger: <button>ファイル</button>,
    });

    // 検証
    expect(props.size).toBe("lg");
    expect(props.items).toStrictEqual([{ label: "新規作成" }]);
    expect(props.trigger).not.toBe(undefined);
  });

  test("項目の指定を slotProps より優先する", ({ expect }) => {
    // 準備と実行
    const api = new MenubarAPI({ slotProps: { menu: { id: "slot" } } });
    const props = api.getMenuProps({
      id: "item",
      items: [],
      trigger: <button>ファイル</button>,
    });

    // 検証
    expect(props.id).toBe("item");
  });
});

describe("getRootProps", () => {
  test("内容を指定しないときは既定のレンダラーを返す", ({ expect }) => {
    // 準備と実行
    const api = new MenubarAPI({});

    // 検証
    expect(typeof api.getRootProps().children).toBe("function");
  });

  test("指定した値をそのまま返す", ({ expect }) => {
    // 準備と実行
    const api = new MenubarAPI({
      items: [{ items: [], trigger: <button>ファイル</button> }],
      disabled: true,
      orientation: "vertical",
    });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.disabled).toBe(true);
    expect(rootProps.orientation).toBe("vertical");
    expect(rootProps.items).toStrictEqual([{ items: [], trigger: expect.anything() }]);
  });

  test("内容を指定したときはその内容を返す", ({ expect }) => {
    // 準備と実行
    const api = new MenubarAPI({ children: <span>内容</span> });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.children).not.toBe(undefined);
    expect(typeof rootProps.children).not.toBe("function");
  });
});

describe("useMenubarAPI", () => {
  test("MenubarAPI を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useMenubarAPI({});

      return <span>{api instanceof MenubarAPI ? "API" : "別物"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("API").query()?.textContent).toBe("API");
  });
});

describe("短名の再輸出", () => {
  test("API がクラスを指す", ({ expect }) => {
    // 準備と実行と検証
    expect(API).toBe(MenubarAPI);
    expect(useAPI).toBe(useMenubarAPI);
  });
});
