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
    const api = new AlertDialogAPI({ slotProps: { backdrop: { id: "backdrop" } } });

    // 検証
    expect(api.getBackdropProps()).toStrictEqual({ id: "backdrop" });
  });

  test("getBodyProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({});

    // 検証
    expect(api.getBodyProps()).toBe(null);
  });

  test("getBodyProps は HTML title を本文の title にする", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ children: "本文", htmlTitle: "説明" });

    // 検証
    expect(api.getBodyProps()).toStrictEqual({ title: "説明", children: "本文" });
  });

  test("getBodyProps は slotProps の指定を重ねる", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({
      children: "本文",
      slotProps: { body: { id: "body" } },
    });

    // 検証
    expect(api.getBodyProps()).toStrictEqual({ id: "body", title: undefined, children: "本文" });
  });

  test("getCancelTriggerProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({});

    // 検証
    expect(api.getCancelTriggerProps()).toBe(null);
  });

  test("getCancelTriggerProps は中止ボタンを子要素にして返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ cancel: cancelButton, onCancel: () => {} });

    // 検証
    expect(api.getCancelTriggerProps()?.children).toBe(cancelButton);
  });

  test("getConfirmTriggerProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({});

    // 検証
    expect(api.getConfirmTriggerProps()).toBe(null);
  });

  test("getConfirmTriggerProps は確認ボタンを子要素にして返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ confirm: confirmButton, onConfirm: () => {} });

    // 検証
    expect(api.getConfirmTriggerProps()?.children).toBe(confirmButton);
  });

  test("getContentProps は角丸と外観と枠線を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ radius: "lg", variant: "stacked", outlined: true });

    // 検証
    expect(api.getContentProps()).toStrictEqual({
      radius: "lg",
      variant: "stacked",
      outlined: true,
    });
  });

  test("getContentProps は slotProps の指定を重ねる", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ slotProps: { content: { id: "content" } } });

    // 検証
    expect(api.getContentProps()).toStrictEqual({
      id: "content",
      radius: undefined,
      variant: "default",
      outlined: undefined,
    });
  });

  test("getControlsProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({});

    // 検証
    expect(api.getControlsProps()).toBe(null);
  });

  test("getControlsProps は指定した内容を子要素にして返す", async ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ controls: "操作" });
    const screen = await render(<>{api.getControlsProps()?.children}</>);

    // 検証
    expect(screen.getByText("操作").query()).not.toBe(null);
  });

  test("getControlsProps は閉じるアイコンボタンを表示できる", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ showCancelIconButton: true });

    // 検証
    expect(React.isValidElement(api.getControlsProps()?.children)).toBe(true);
  });

  test("getDescriptionProps は空文字を表示対象にする", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ description: "" });

    // 検証
    expect(api.getDescriptionProps()).toStrictEqual({ children: "" });
  });

  test("getFooterProps は中止も確認もないとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({});

    // 検証
    expect(api.getFooterProps()).toBe(null);
  });

  test("getFooterProps は中止ボタンだけで表示する", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ cancel: cancelButton });

    // 検証
    expect(api.getFooterProps()).toStrictEqual({});
  });

  test("getFooterProps は確認ボタンだけで表示する", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ confirm: confirmButton });

    // 検証
    expect(api.getFooterProps()).toStrictEqual({});
  });

  test("getHeaderProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ slotProps: { header: { id: "header" } } });

    // 検証
    expect(api.getHeaderProps()).toStrictEqual({ id: "header" });
  });

  test("getIconProps は空文字を表示対象にする", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ icon: "" });

    // 検証
    expect(api.getIconProps()).toStrictEqual({ children: "" });
  });

  test("getIconProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({});

    // 検証
    expect(api.getIconProps()).toBe(null);
  });

  test("getPortalProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ slotProps: { portal: { id: "portal" } } });

    // 検証
    expect(api.getPortalProps()).toStrictEqual({ id: "portal" });
  });

  test("getRootProps はハンドルを補完する", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ title: "見出し", cancel: cancelButton });
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
    const api = new AlertDialogAPI({});

    // 検証
    expect(api.getTitleProps()).toBe(null);
  });

  test("getToggleTriggerProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({});

    // 検証
    expect(api.getToggleTriggerProps()).toBe(null);
  });

  test("getToggleTriggerProps は描画関数にハンドルを添えて返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ trigger: triggerButton });
    const props = api.getToggleTriggerProps();

    // 検証
    expect(props?.children).toBe(triggerButton);
    expect(props?.handle).toBeDefined();
  });

  test("getViewportProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertDialogAPI({ slotProps: { viewport: { id: "viewport" } } });

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
