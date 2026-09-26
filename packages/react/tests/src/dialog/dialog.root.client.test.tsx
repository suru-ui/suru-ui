import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { createDialogHandle } from "../../../src/dialog/dialog.handle.js";
import { DialogAPI, useDialogAPI } from "../../../src/dialog/dialog.jsx";
import { DialogRoot } from "../../../src/dialog/dialog.root.jsx";
import "../_locators.js";

const closeButton = <button type="button">閉じる</button>;

const triggerButton = (props: React.ComponentProps<"button">) => (
  <button type="button" {...props}>
    開く
  </button>
);

describe("DialogAPI", () => {
  test("getBackdropProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ slotProps: { backdrop: { id: "backdrop" } } });

    // 検証
    expect(api.getBackdropProps()).toStrictEqual({ id: "backdrop" });
  });

  test("getBodyProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({});

    // 検証
    expect(api.getBodyProps()).toBe(null);
  });

  test("getBodyProps は HTML title を本文の title にする", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ children: "本文", htmlTitle: "説明" });

    // 検証
    expect(api.getBodyProps()).toStrictEqual({ title: "説明", children: "本文" });
  });

  test("getBodyProps は slotProps の指定を重ねる", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({
      children: "本文",
      slotProps: { body: { id: "body" } },
    });

    // 検証
    expect(api.getBodyProps()).toStrictEqual({ id: "body", title: undefined, children: "本文" });
  });

  test("getCloseTriggerProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({});

    // 検証
    expect(api.getCloseTriggerProps()).toBe(null);
  });

  test("getCloseTriggerProps は閉じるボタンを子要素にして返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ close: closeButton, onClose: () => {} });

    // 検証
    expect(api.getCloseTriggerProps()?.children).toBe(closeButton);
  });

  test("getCloseTriggerProps は描画関数を子要素にして返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({
      close: (props) => (
        <button type="button" {...props}>
          閉じる
        </button>
      ),
    });

    // 検証
    expect(api.getCloseTriggerProps()?.children).toBeTypeOf("function");
    expect(api.getFooterProps()).toStrictEqual({});
  });

  test("getContentProps は角丸と外観と枠線を返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ radius: "lg", variant: "stacked", outlined: true });

    // 検証
    expect(api.getContentProps()).toStrictEqual({
      radius: "lg",
      variant: "stacked",
      outlined: true,
    });
  });

  test("getContentProps は slotProps の指定を重ねる", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ slotProps: { content: { id: "content" } } });

    // 検証
    expect(api.getContentProps()).toStrictEqual({
      id: "content",
      radius: undefined,
      variant: "default",
      outlined: undefined,
    });
  });

  test("getControlsProps は閉じるアイコンも操作もないとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ showCloseIconButton: false });

    // 検証
    expect(api.getControlsProps()).toBe(null);
  });

  test("getControlsProps は指定した内容を子要素にして返す", async ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ controls: "操作", showCloseIconButton: false });
    const screen = await render(<>{api.getControlsProps()?.children}</>);

    // 検証
    expect(screen.getByText("操作").query()).not.toBe(null);
  });

  test("getControlsProps は既定で閉じるアイコンボタンを表示する", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({});

    // 検証
    expect(React.isValidElement(api.getControlsProps()?.children)).toBe(true);
  });

  test("getDescriptionProps は空文字を表示対象にする", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ description: "" });

    // 検証
    expect(api.getDescriptionProps()).toStrictEqual({ children: "" });
  });

  test("getFooterProps は閉じるボタンがないとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({});

    // 検証
    expect(api.getFooterProps()).toBe(null);
  });

  test("getFooterProps は閉じるボタンだけで表示する", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ close: closeButton });

    // 検証
    expect(api.getFooterProps()).toStrictEqual({});
  });

  test("getHeaderProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ slotProps: { header: { id: "header" } } });

    // 検証
    expect(api.getHeaderProps()).toStrictEqual({ id: "header" });
  });

  test("getHeaderProps は内容がないとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ children: "本文", showCloseIconButton: false });

    // 検証
    expect(api.getHeaderProps()).toBe(null);
  });

  test("getHeaderProps は見出しだけで表示する", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ title: "見出し", showCloseIconButton: false });

    // 検証
    expect(api.getHeaderProps()).toStrictEqual({});
  });

  test("getHeaderProps は既定の外観で閉じるアイコンボタンだけでも表示する", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({});

    // 検証
    expect(api.getHeaderProps()).toStrictEqual({});
  });

  test("getHeaderProps は積み上げ式で閉じるアイコンボタンだけのとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ variant: "stacked" });

    // 検証
    expect(api.getHeaderProps()).toBe(null);
  });

  test("getPortalProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ slotProps: { portal: { id: "portal" } } });

    // 検証
    expect(api.getPortalProps()).toStrictEqual({ id: "portal" });
  });

  test("getRootProps はハンドルを補完する", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ title: "見出し", close: closeButton });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.handle).toBeDefined();
    expect(rootProps).not.toHaveProperty("title");
    expect(rootProps).not.toHaveProperty("close");
  });

  test("getRootProps は指定したハンドルを使う", ({ expect }) => {
    // 準備
    const handle = createDialogHandle();

    // 実行
    const api = new DialogAPI({ handle });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.handle).toBe(handle);
  });

  test("getTitleProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({});

    // 検証
    expect(api.getTitleProps()).toBe(null);
  });

  test("getToggleTriggerProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({});

    // 検証
    expect(api.getToggleTriggerProps()).toBe(null);
  });

  test("getToggleTriggerProps は描画関数にハンドルを添えて返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ trigger: triggerButton });
    const props = api.getToggleTriggerProps();

    // 検証
    expect(props?.children).toBe(triggerButton);
    expect(props?.handle).toBeDefined();
  });

  test("getViewportProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new DialogAPI({ slotProps: { viewport: { id: "viewport" } } });

    // 検証
    expect(api.getViewportProps()).toStrictEqual({ id: "viewport" });
  });
});

describe("useDialogAPI", () => {
  test("API のインスタンスを返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useDialogAPI({});

      return <span>{api instanceof DialogAPI ? "API" : "別物"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("API").query()?.textContent).toBe("API");
  });
});

describe("DialogRoot", () => {
  test("自身の DOM 要素を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <DialogRoot>
        <span>内容</span>
      </DialogRoot>,
    );

    // 検証
    expect(screen.container.querySelector("[data-scope]")).toBe(null);
  });

  test("ハンドルを省略しても内容を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <DialogRoot defaultOpen>
        <span>内容</span>
      </DialogRoot>,
    );

    // 検証
    expect(screen.getByText("内容").query()?.textContent).toBe("内容");
  });
});
