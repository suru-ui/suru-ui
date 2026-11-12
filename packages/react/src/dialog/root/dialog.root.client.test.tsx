import * as React from "react";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { DialogAPI, useDialogAPI } from "../dialog.jsx";
import { createDialogHandle } from "../handle/dialog.handle.js";
import { DialogRoot } from "./dialog.root.jsx";
import "../../../tests/src/_locators.js";

const closeButton = <button type="button">閉じる</button>;

const triggerButton = (props: React.ComponentProps<"button">) => (
  <button type="button" {...props}>
    開く
  </button>
);
describe("DialogAPI", () => {
  test("getActionProps は閉じるアイコンも操作もないとき null を返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      handle: createDialogHandle(),
      showCloseIconButton: false,
    });

    // 検証。
    expect(api.getActionProps()).toBe(null);
  });

  test("getActionProps は指定した内容を子要素にして返す", async ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      action: "操作",
      handle: createDialogHandle(),
      showCloseIconButton: false,
    });
    const screen = await render(api.getActionProps()?.children ?? null);

    // 検証。
    expect(screen.getByText("操作").query()).not.toBe(null);
  });

  test("getActionProps は既定で閉じるアイコンボタンを表示する", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({ handle: createDialogHandle() });

    // 検証。
    expect(React.isValidElement(api.getActionProps()?.children)).toBe(true);
  });

  test("getBackdropProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      handle: createDialogHandle(),
      slotProps: { backdrop: { id: "backdrop" } },
    });

    // 検証。
    expect(api.getBackdropProps()).toStrictEqual({ id: "backdrop" });
  });

  test("getCloseTriggerProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({ handle: createDialogHandle() });

    // 検証。
    expect(api.getCloseTriggerProps()).toBe(null);
  });

  test("getCloseTriggerProps は閉じるボタンを子要素にして返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      close: closeButton,
      handle: createDialogHandle(),
      onClose: () => {},
    });

    // 検証。
    expect(api.getCloseTriggerProps()?.children).toBe(closeButton);
  });

  test("getCloseTriggerProps は描画関数を子要素にして返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      close: (props) => (
        <button type="button" {...props}>
          閉じる
        </button>
      ),
      handle: createDialogHandle(),
    });

    // 検証。
    expect(api.getCloseTriggerProps()?.children).toBeTypeOf("function");
    expect(api.getFooterProps()).toStrictEqual({ children: undefined });
  });

  test("getContentProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({ handle: createDialogHandle() });

    // 検証。
    expect(api.getContentProps()).toBe(null);
  });

  test("getContentProps は slotProps の指定を重ねる", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      handle: createDialogHandle(),
      children: "本文",
      slotProps: { content: { id: "content" } },
    });

    // 検証。
    expect(api.getContentProps()).toStrictEqual({
      id: "content",
      children: "本文",
    });
  });

  test("getDescriptionProps は空文字を表示対象にする", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      handle: createDialogHandle(),
      description: "",
    });

    // 検証。
    expect(api.getDescriptionProps()).toStrictEqual({ children: "" });
  });

  test("getFooterProps は閉じるボタンも内容もないとき null を返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({ handle: createDialogHandle() });

    // 検証。
    expect(api.getFooterProps()).toBe(null);
  });

  test("getFooterProps は閉じるボタンだけで表示する", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      close: closeButton,
      handle: createDialogHandle(),
    });

    // 検証。
    expect(api.getFooterProps()).toStrictEqual({ children: undefined });
  });

  test("getFooterProps は指定した内容を子要素にして返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      footer: "補足",
      handle: createDialogHandle(),
    });

    // 検証。
    expect(api.getFooterProps()).toStrictEqual({ children: "補足" });
  });

  test("getHeaderProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      handle: createDialogHandle(),
      slotProps: { header: { id: "header" } },
    });

    // 検証。
    expect(api.getHeaderProps()).toStrictEqual({ id: "header" });
  });

  test("getHeaderProps は内容がないとき null を返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      handle: createDialogHandle(),
      children: "本文",
      showCloseIconButton: false,
    });

    // 検証。
    expect(api.getHeaderProps()).toBe(null);
  });

  test("getHeaderProps は見出しだけで表示する", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      title: "見出し",
      handle: createDialogHandle(),
      showCloseIconButton: false,
    });

    // 検証。
    expect(api.getHeaderProps()).toStrictEqual({});
  });

  test("getHeaderProps は既定の外観で閉じるアイコンボタンだけでも表示する", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({ handle: createDialogHandle() });

    // 検証。
    expect(api.getHeaderProps()).toStrictEqual({});
  });

  test("getHeaderProps は積み上げ式でも閉じるアイコンボタンだけで表示する", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      handle: createDialogHandle(),
      variant: "stacked",
    });

    // 検証 (外観によらず、操作があるかぎりヘッダーを描画します)
    expect(api.getHeaderProps()).toStrictEqual({});
  });

  test("getPortalProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      handle: createDialogHandle(),
      slotProps: { portal: { id: "portal" } },
    });

    // 検証。
    expect(api.getPortalProps()).toStrictEqual({ id: "portal" });
  });

  test("getPopupProps は大きさと角丸と外観と枠線を返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      size: "sm",
      handle: createDialogHandle(),
      radius: "lg",
      variant: "stacked",
      outlined: true,
    });

    // 検証。
    expect(api.getPopupProps()).toStrictEqual({
      size: "sm",
      radius: "lg",
      variant: "stacked",
      outlined: true,
    });
  });

  test("getPopupProps は popup への指定をそのまま返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      id: "popup",
      handle: createDialogHandle(),
    });

    // 検証。
    expect(api.getPopupProps()).toStrictEqual({ id: "popup" });
  });

  test("getRootProps はハンドルを補完する", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      close: closeButton,
      title: "見出し",
      handle: createDialogHandle(),
    });
    const rootProps = api.getRootProps();

    // 検証。
    expect(rootProps.handle).toBeDefined();
    expect(rootProps).not.toHaveProperty("title");
    expect(rootProps).not.toHaveProperty("close");
  });

  test("getRootProps は指定したハンドルを使う", ({ expect }) => {
    // 準備。
    const handle = createDialogHandle();

    // 実行。
    const api = new DialogAPI({ handle });
    const rootProps = api.getRootProps();

    // 検証。
    expect(rootProps.handle).toBe(handle);
  });

  test("getTitleProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({ handle: createDialogHandle() });

    // 検証。
    expect(api.getTitleProps()).toBe(null);
  });

  test("getToggleTriggerProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({ handle: createDialogHandle() });

    // 検証。
    expect(api.getToggleTriggerProps()).toBe(null);
  });

  test("getToggleTriggerProps は描画関数にハンドルを添えて返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      handle: createDialogHandle(),
      trigger: triggerButton,
    });
    const props = api.getToggleTriggerProps();

    // 検証。
    expect(props?.children).toBe(triggerButton);
    expect(props?.handle).toBeDefined();
  });

  test("getViewportProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行。
    const api = new DialogAPI({
      handle: createDialogHandle(),
      slotProps: { viewport: { id: "viewport" } },
    });

    // 検証。
    expect(api.getViewportProps()).toStrictEqual({ id: "viewport" });
  });
});

describe("useDialogAPI", () => {
  test("API のインスタンスを返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const api = useDialogAPI({});

      return <span>{api instanceof DialogAPI ? "API" : "別物"}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("API").query()?.textContent).toBe("API");
  });
});

describe("DialogRoot", () => {
  test("自身の DOM 要素を持たない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <DialogRoot>
        <span>内容</span>
      </DialogRoot>,
    );

    // 検証。
    expect(screen.container.querySelector("[data-scope]")).toBe(null);
  });

  test("ハンドルを省略しても内容を描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <DialogRoot defaultOpen>
        <span>内容</span>
      </DialogRoot>,
    );

    // 検証。
    expect(screen.getByText("内容").query()?.textContent).toBe("内容");
  });
});
