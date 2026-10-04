import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { createAlertDialogHandle } from "../../../src/alert-dialog/alert-dialog.handle.js";
import { AlertDialogAPI, useAlertDialogAPI } from "../../../src/alert-dialog/alert-dialog.jsx";
import { AlertDialogRoot } from "../../../src/alert-dialog/alert-dialog.root.jsx";
import "../_locators.js";

const cancelButton = <button type="button">キャンセル</button>;

const confirmButton = <button type="button">削除する</button>;

const triggerButton = (props: React.ComponentProps<"button">) => (
  <button type="button" {...props}>
    削除
  </button>
);

describe("AlertDialogAPI", () => {
  test("getBackdropProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({
      handle: createAlertDialogHandle(),
      slotProps: { backdrop: { id: "backdrop" } },
    });

    // 検証
    expect(api.getBackdropProps()).toStrictEqual({ id: "backdrop" });
  });

  test("getContentProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle() });

    // 検証
    expect(api.getContentProps()).toBe(null);
  });

  test("getContentProps は本文を子要素にして返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle(), children: "本文" });

    // 検証
    expect(api.getContentProps()).toStrictEqual({ children: "本文" });
  });

  test("getContentProps は slotProps の指定を重ねる", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({
      handle: createAlertDialogHandle(),
      children: "本文",
      slotProps: { content: { id: "content" } },
    });

    // 検証
    expect(api.getContentProps()).toStrictEqual({ id: "content", children: "本文" });
  });

  test("getCancelTriggerProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle() });

    // 検証
    expect(api.getCancelTriggerProps()).toBe(null);
  });

  test("getCancelTriggerProps は中止ボタンを子要素にして返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({
      handle: createAlertDialogHandle(),
      cancel: cancelButton,
      onCancel: () => {},
    });

    // 検証
    expect(api.getCancelTriggerProps()?.children).toBe(cancelButton);
  });

  test("getConfirmTriggerProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle() });

    // 検証
    expect(api.getConfirmTriggerProps()).toBe(null);
  });

  test("getConfirmTriggerProps は確認ボタンを子要素にして返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({
      handle: createAlertDialogHandle(),
      confirm: confirmButton,
      onConfirm: () => {},
    });

    // 検証
    expect(api.getConfirmTriggerProps()?.children).toBe(confirmButton);
  });

  test("getPopupProps は大きさと角丸と外観と枠線をそのまま返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({
      handle: createAlertDialogHandle(),
      radius: "lg",
      variant: "stacked",
      outlined: true,
    });

    // 検証
    expect(api.getPopupProps()).toStrictEqual({
      radius: "lg",
      variant: "stacked",
      outlined: true,
    });
  });

  test("getPopupProps は popup への指定をそのまま返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle(), id: "popup" });

    // 検証
    expect(api.getPopupProps()).toStrictEqual({ id: "popup" });
  });

  test("getActionProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle() });

    // 検証
    expect(api.getActionProps()).toBe(null);
  });

  test("getActionProps は指定した内容を子要素にして返す", async ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle(), action: "操作" });
    const screen = await render(<>{api.getActionProps()?.children}</>);

    // 検証
    expect(screen.getByText("操作").query()).not.toBe(null);
  });

  test("getActionProps は閉じるアイコンボタンを表示できる", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({
      handle: createAlertDialogHandle(),
      showCancelIconButton: true,
    });

    // 検証
    expect(React.isValidElement(api.getActionProps()?.children)).toBe(true);
  });

  test("getDescriptionProps は空文字を表示対象にする", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle(), description: "" });

    // 検証
    expect(api.getDescriptionProps()).toStrictEqual({ children: "" });
  });

  test("getFooterProps は中止も確認もないとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle() });

    // 検証
    expect(api.getFooterProps()).toBe(null);
  });

  test("getFooterProps は中止ボタンだけで表示する", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle(), cancel: cancelButton });

    // 検証
    expect(api.getFooterProps()).toStrictEqual({ children: undefined });
  });

  test("getFooterProps は確認ボタンだけで表示する", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle(), confirm: confirmButton });

    // 検証
    expect(api.getFooterProps()).toStrictEqual({ children: undefined });
  });

  test("getFooterProps は指定した内容を子要素にして返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle(), footer: "補足" });

    // 検証
    expect(api.getFooterProps()).toStrictEqual({ children: "補足" });
  });

  test("getHeaderProps は内容がないとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle(), children: "本文" });

    // 検証
    expect(api.getHeaderProps()).toBe(null);
  });

  test("getHeaderProps は見出しだけで表示する", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle(), title: "見出し" });

    // 検証
    expect(api.getHeaderProps()).toStrictEqual({});
  });

  test("getHeaderProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({
      handle: createAlertDialogHandle(),
      title: "見出し",
      slotProps: { header: { id: "header" } },
    });

    // 検証
    expect(api.getHeaderProps()).toStrictEqual({ id: "header" });
  });

  test("getIconProps は空文字を表示対象にする", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle(), icon: "" });

    // 検証
    expect(api.getIconProps()).toStrictEqual({ children: "" });
  });

  test("getIconProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle() });

    // 検証
    expect(api.getIconProps()).toBe(null);
  });

  test("getPortalProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({
      handle: createAlertDialogHandle(),
      slotProps: { portal: { id: "portal" } },
    });

    // 検証
    expect(api.getPortalProps()).toStrictEqual({ id: "portal" });
  });

  test("getRootProps はハンドルを補完する", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({
      handle: createAlertDialogHandle(),
      title: "見出し",
      cancel: cancelButton,
    });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.handle).toBeDefined();
    expect(rootProps).not.toHaveProperty("title");
    expect(rootProps).not.toHaveProperty("cancel");
  });

  test("getRootProps は指定したハンドルを使う", ({ expect }) => {
    // 準備
    const handle = createAlertDialogHandle();

    // 実行
    const api = new AlertDialogAPI({ handle });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.handle).toBe(handle);
  });

  test("getTitleProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle() });

    // 検証
    expect(api.getTitleProps()).toBe(null);
  });

  test("getToggleTriggerProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle() });

    // 検証
    expect(api.getToggleTriggerProps()).toBe(null);
  });

  test("getToggleTriggerProps は描画関数にハンドルを添えて返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ handle: createAlertDialogHandle(), trigger: triggerButton });
    const props = api.getToggleTriggerProps();

    // 検証
    expect(props?.children).toBe(triggerButton);
    expect(props?.handle).toBeDefined();
  });

  test("getViewportProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({
      handle: createAlertDialogHandle(),
      slotProps: { viewport: { id: "viewport" } },
    });

    // 検証
    expect(api.getViewportProps()).toStrictEqual({ id: "viewport" });
  });
});

describe("useAlertDialogAPI", () => {
  test("API のインスタンスを返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useAlertDialogAPI({});

      return <span>{api instanceof AlertDialogAPI ? "API" : "別物"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("API").query()?.textContent).toBe("API");
  });
});

describe("AlertDialogRoot", () => {
  test("自身の DOM 要素を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialogRoot>
        <span>内容</span>
      </AlertDialogRoot>,
    );

    // 検証
    expect(screen.container.querySelector("[data-scope]")).toBe(null);
  });

  test("ハンドルを省略しても内容を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialogRoot defaultOpen>
        <span>内容</span>
      </AlertDialogRoot>,
    );

    // 検証
    expect(screen.getByText("内容").query()?.textContent).toBe("内容");
  });
});
