import * as React from "react";
import { describe, test, vi } from "vitest";

import { type ToastRootToastObject } from "../../../src/toast/root/toast.root.jsx";
import { type IToastListRenderer, ToastAPI, ToastListAPI } from "../../../src/toast/toast.jsx";

const toast: ToastRootToastObject = { id: "toast-1", title: "見出し" };

const toasts: readonly ToastRootToastObject[] = [{ id: "a" }, { id: "b" }];

describe("ToastAPI", () => {
  test("Root の props に通知オブジェクトを含める", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({ toast });

    // 検証
    expect(api.getRootProps().toast).toBe(toast);
  });

  test("Root の props から構成用の props を除く", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({
      toast,
      action: "再試行",
      close: "閉じる",
      slotProps: {},
      description: "説明",
      size: "lg",
      title: "見出し",
    });
    const props = api.getRootProps();

    // 検証
    expect(props).not.toHaveProperty("action");
    expect(props).not.toHaveProperty("close");
    expect(props).not.toHaveProperty("description");
    expect(props).not.toHaveProperty("size");
    expect(props).not.toHaveProperty("slotProps");
    expect(props).not.toHaveProperty("title");
  });

  test("見出しは通知オブジェクトを優先する", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({
      toast: { ...toast, title: "オブジェクトの見出し" },
      title: "props の見出し",
    });

    // 検証
    expect(api.getTitleProps()).toStrictEqual({ children: "オブジェクトの見出し" });
  });

  test("見出しの props を代替にする", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({ toast: { id: "toast-1" }, title: "props の見出し" });

    // 検証
    expect(api.getTitleProps()).toStrictEqual({ children: "props の見出し" });
  });

  test("見出しがないときは表示しない", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({ toast: { id: "toast-1" } });

    // 検証
    expect(api.getTitleProps()).toBe(null);
  });

  test("slotProps の見出しを引き継ぐ", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({ toast, slotProps: { title: { id: "title" } } });

    // 検証
    expect(api.getTitleProps()).toStrictEqual({ id: "title", children: "見出し" });
  });

  test("説明は通知オブジェクトを優先する", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({
      toast: { ...toast, description: "オブジェクトの説明" },
      description: "props の説明",
    });

    // 検証
    expect(api.getDescriptionProps()).toStrictEqual({ children: "オブジェクトの説明" });
  });

  test("説明がないときは表示しない", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({ toast });

    // 検証
    expect(api.getDescriptionProps()).toBe(null);
  });

  test("閉じるボタンの既定の文言を返す", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({ toast });

    // 検証
    expect(api.getCloseProps()).toStrictEqual({ children: "閉じる", size: undefined });
  });

  test("閉じるボタンに大きさを引き継ぐ", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({ toast, size: "lg" });

    // 検証
    expect(api.getCloseProps()?.size).toBe("lg");
  });

  test("閉じるボタンを消せる", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({ toast, close: null });

    // 検証
    expect(api.getCloseProps()).toBe(null);
  });

  test("アクションがないときは表示しない", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({ toast });

    // 検証
    expect(api.getActionProps()).toBe(null);
  });

  test("通知オブジェクトのアクションでは文言を重ねない", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({
      toast: { ...toast, actionProps: { children: "元に戻す" } },
      action: "再試行",
    });

    // 検証
    expect(api.getActionProps()).toStrictEqual({ size: undefined });
  });

  test("アクションの props を代替にする", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({ toast, action: "再試行" });

    // 検証
    expect(api.getActionProps()).toStrictEqual({ children: "再試行", size: undefined });
  });

  test("アクション欄をアクションと閉じるボタンの有無で決める", ({ expect }) => {
    // 準備と実行
    const visible = new ToastAPI({ toast, action: "再試行" });
    const onlyClose = new ToastAPI({ toast });
    const hidden = new ToastAPI({ toast, close: null });

    // 検証
    expect(visible.getActionsProps()).toStrictEqual({});
    expect(onlyClose.getActionsProps()).toStrictEqual({});
    expect(hidden.getActionsProps()).toBe(null);
  });

  test("内容へ外観を渡す", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({
      toast,
      size: "lg",
      color: "blue",
      radius: "sm",
      variant: "naked",
      outlined: true,
    });

    // 検証
    expect(api.getContentProps()).toStrictEqual({
      size: "lg",
      color: "blue",
      radius: "sm",
      variant: "naked",
      outlined: true,
    });
  });

  for (const [type, color] of [
    ["success", "green"],
    ["warning", "yellow"],
    ["error", "red"],
    ["info", "blue"],
    ["unknown", "grey"],
    [undefined, "grey"],
  ] as const) {
    test(`通知の種類 ${type ?? "未指定"} を配色 ${color} に変換する`, ({ expect }) => {
      // 準備と実行
      const api = new ToastAPI({ toast: { id: "toast-1", type } });

      // 検証
      expect(api.getContentProps().color).toBe(color);
    });
  }

  test("slotProps の内容を引き継ぐ", ({ expect }) => {
    // 準備と実行
    const api = new ToastAPI({ toast, slotProps: { content: { id: "content" } } });

    // 検証
    expect(api.getContentProps().id).toBe("content");
  });
});

describe("ToastListAPI", () => {
  test("Portal の props から一覧固有の props を除く", ({ expect }) => {
    // 準備と実行
    const api = new ToastListAPI(
      { children: "内容", slotProps: {}, container: document.body },
      toasts,
    );
    const props = api.getPortalProps();

    // 検証
    expect(props.container).toBe(document.body);
    expect(props).not.toHaveProperty("children");
    expect(props).not.toHaveProperty("slotProps");
  });

  test("既定では各通知をトーストとして描画する", ({ expect }) => {
    // 準備と実行
    const api = new ToastListAPI({}, toasts);

    // 検証
    expect(React.Children.count(api.getViewportProps().children)).toBe(2);
  });

  test("描画関数で各通知を描画する", ({ expect }) => {
    // 準備
    const renderer = vi.fn<IToastListRenderer>((item) => <span>{item.id}</span>);
    const api = new ToastListAPI({ children: renderer }, toasts);

    // 実行
    const children = api.getViewportProps().children;

    // 検証
    expect(renderer).toHaveBeenCalledTimes(2);
    expect(React.Children.count(children)).toBe(2);
  });

  test("内容を指定するとその内容を描画する", ({ expect }) => {
    // 準備と実行
    const api = new ToastListAPI({ children: "カスタム一覧" }, toasts);

    // 検証
    expect(api.getViewportProps().children).toBe("カスタム一覧");
  });

  test("slotProps の表示領域を引き継ぐ", ({ expect }) => {
    // 準備と実行
    const api = new ToastListAPI({ slotProps: { viewport: { id: "viewport" } } }, toasts);
    const props = api.getViewportProps();

    // 検証
    expect(props.id).toBe("viewport");
    expect(React.Children.count(props.children)).toBe(2);
  });
});
