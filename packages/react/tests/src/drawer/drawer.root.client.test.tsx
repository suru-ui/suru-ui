import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { type DrawerCloseProps, DrawerClose } from "../../../src/drawer/close/drawer.close.jsx";
import { DrawerContent } from "../../../src/drawer/content/drawer.content.jsx";
import { DrawerAPI, useDrawerAPI } from "../../../src/drawer/drawer.jsx";
import { createDrawerHandle } from "../../../src/drawer/handle/drawer.handle.js";
import { DrawerPopup } from "../../../src/drawer/popup/drawer.popup.jsx";
import { DrawerPortal } from "../../../src/drawer/portal/drawer.portal.jsx";
import { DrawerRoot } from "../../../src/drawer/root/drawer.root.jsx";
import { DrawerViewport } from "../../../src/drawer/viewport/drawer.viewport.jsx";
import "../_locators.js";

const closeButton = <button type="button">閉じる</button>;

const triggerButton = (props: React.ComponentProps<"button">) => (
  <button type="button" {...props}>
    開く
  </button>
);

/**
 * 開いた状態のドロワーの中に閉じるボタンを配置します。
 * 閉じるボタンは Base UI のルートコンテキストとポップアップを必要とするため、単体では操作できません。
 */
function renderCloseButton(props: DrawerCloseProps) {
  return render(
    <DrawerRoot defaultOpen>
      <DrawerPortal>
        <DrawerViewport>
          <DrawerPopup>
            <DrawerContent>
              <DrawerClose {...props} />
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </DrawerRoot>,
  );
}

describe("DrawerAPI", () => {
  test("getBackdropProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ slotProps: { backdrop: { id: "backdrop" } } });

    // 検証
    expect(api.getBackdropProps()).toStrictEqual({ id: "backdrop" });
  });

  test("getBodyProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({});

    // 検証
    expect(api.getBodyProps()).toBe(null);
  });

  test("getBodyProps は空文字を表示対象にする", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ children: "" });

    // 検証
    expect(api.getBodyProps()).toStrictEqual({ children: "" });
  });

  test("getBodyProps は slotProps の指定を重ねる", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({
      children: "本文",
      slotProps: { body: { id: "body" } },
    });

    // 検証
    expect(api.getBodyProps()).toStrictEqual({ id: "body", children: "本文" });
  });

  test("getCloseProps は指定しないと null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ showCloseIconButton: false });

    // 検証
    expect(api.getCloseProps()).toBe(null);
  });

  test("getCloseProps は閉じるアイコンボタンを返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({});

    // 検証
    expect(React.isValidElement(api.getCloseProps()?.children)).toBe(true);
  });

  test("getCloseProps は slotProps の onClick を重ねて onClose を呼ぶ", async ({ expect }) => {
    // 準備
    const calls: string[] = [];
    const api = new DrawerAPI({
      onClose: () => calls.push("onClose"),
      slotProps: { close: { onClick: () => calls.push("onClick") } },
    });
    const closeProps = api.getCloseProps();
    if (closeProps === null) {
      throw new Error("閉じるボタンの props を取得できませんでした。");
    }

    const screen = await renderCloseButton(closeProps);

    // 実行
    await screen.getByRole("button", { name: "閉じる" }).click();

    // 検証
    expect(calls).toStrictEqual(["onClick", "onClose"]);
  });

  test("getCloseProps は既定を防ぐと onClose を呼ばない", async ({ expect }) => {
    // 準備
    const calls: string[] = [];
    const api = new DrawerAPI({
      onClose: () => calls.push("onClose"),
      slotProps: {
        close: {
          onClick: (evt) => {
            evt.preventDefault();
            calls.push("onClick");
          },
        },
      },
    });
    const closeProps = api.getCloseProps();
    if (closeProps === null) {
      throw new Error("閉じるボタンの props を取得できませんでした。");
    }

    const screen = await renderCloseButton(closeProps);

    // 実行
    await screen.getByRole("button", { name: "閉じる" }).click();

    // 検証
    expect(calls).toStrictEqual(["onClick"]);
  });

  test("getContentProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ slotProps: { content: { id: "content" } } });

    // 検証
    expect(api.getContentProps()).toStrictEqual({ id: "content" });
  });

  test("getControlsProps は操作も閉じるアイコンもないとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ showCloseIconButton: false });

    // 検証
    expect(api.getControlsProps()).toBe(null);
  });

  test("getControlsProps は既定で閉じるアイコンボタンを表示する", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({});

    // 検証
    expect(React.isValidElement(api.getControlsProps()?.children)).toBe(true);
  });

  test("getDescriptionProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({});

    // 検証
    expect(api.getDescriptionProps()).toBe(null);
  });

  test("getDescriptionProps は子要素を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ description: "説明" });

    // 検証
    expect(api.getDescriptionProps()).toStrictEqual({ children: "説明" });
  });

  test("getFooterProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({});

    // 検証
    expect(api.getFooterProps()).toBe(null);
  });

  test("getFooterProps は子要素を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ footer: closeButton });

    // 検証
    expect(api.getFooterProps()).toStrictEqual({ children: closeButton });
  });

  test("getHeaderProps は slotProps だけでも表示する", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({
      showCloseIconButton: false,
      slotProps: { header: { id: "header" } },
    });

    // 検証
    expect(api.getHeaderProps()).toStrictEqual({ id: "header" });
  });

  test("getHeaderProps は内容がないとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ children: "本文", showCloseIconButton: false });

    // 検証
    expect(api.getHeaderProps()).toBe(null);
  });

  test("getHeaderProps は見出しだけで表示する", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ title: "見出し", showCloseIconButton: false });

    // 検証
    expect(api.getHeaderProps()).toStrictEqual({});
  });

  test("getHeaderProps は閉じるアイコンボタンだけで表示する", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({});

    // 検証
    expect(api.getHeaderProps()).toStrictEqual({});
  });

  test("getPopupProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ slotProps: { popup: { id: "popup" } } });

    // 検証
    expect(api.getPopupProps()).toStrictEqual({ id: "popup" });
  });

  test("getPortalProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ slotProps: { portal: { id: "portal" } } });

    // 検証
    expect(api.getPortalProps()).toStrictEqual({ id: "portal" });
  });

  test("getRootProps はスナップポイントを引き継ぐ", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ snapPoints: [0.5, 1], defaultSnapPoint: 0.5 });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.snapPoints).toStrictEqual([0.5, 1]);
    expect(rootProps.defaultSnapPoint).toBe(0.5);
  });

  test("getRootProps はハンドルを補完する", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ title: "見出し" });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.handle).toBeDefined();
    expect(rootProps).not.toHaveProperty("title");
    expect(rootProps).not.toHaveProperty("close");
  });

  test("getRootProps は指定したハンドルを使う", ({ expect }) => {
    // 準備
    const handle = createDrawerHandle();

    // 実行
    const api = new DrawerAPI({ handle });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.handle).toBe(handle);
  });

  test("getSwipeAreaProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({});

    // 検証
    expect(api.getSwipeAreaProps()).toBe(null);
  });

  test("getSwipeAreaProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ slotProps: { swipeArea: { id: "swipe-area" } } });

    // 検証
    expect(api.getSwipeAreaProps()).toStrictEqual({ id: "swipe-area" });
  });

  test("getTitleProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({});

    // 検証
    expect(api.getTitleProps()).toBe(null);
  });

  test("getTitleProps は子要素を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ title: "見出し" });

    // 検証
    expect(api.getTitleProps()).toStrictEqual({ children: "見出し" });
  });

  test("getTriggerProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({});

    // 検証
    expect(api.getTriggerProps()).toBe(null);
  });

  test("getTriggerProps は描画関数にハンドルを添えて返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ trigger: triggerButton });
    const props = api.getTriggerProps();

    // 検証
    expect(props?.children).toBe(triggerButton);
    expect(props?.handle).toBeDefined();
  });

  test("getViewportProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({ slotProps: { viewport: { id: "viewport" } } });

    // 検証
    expect(api.getViewportProps()).toStrictEqual({ id: "viewport" });
  });

  test("getVirtualKeyboardProviderProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({});

    // 検証
    expect(api.getVirtualKeyboardProviderProps()).toBe(null);
  });

  test("getVirtualKeyboardProviderProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new DrawerAPI({
      slotProps: { virtualKeyboardProvider: { id: "virtual-keyboard-provider" } },
    });

    // 検証
    expect(api.getVirtualKeyboardProviderProps()).toStrictEqual({
      id: "virtual-keyboard-provider",
    });
  });
});

describe("useDrawerAPI", () => {
  test("API のインスタンスを返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useDrawerAPI({});

      return <span>{api instanceof DrawerAPI ? "API" : "別物"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("API").query()?.textContent).toBe("API");
  });
});

describe("DrawerRoot", () => {
  test("自身の DOM 要素を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <DrawerRoot>
        <span>内容</span>
      </DrawerRoot>,
    );

    // 検証
    expect(screen.container.querySelector("[data-scope]")).toBe(null);
  });

  test("ハンドルを省略しても内容を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <DrawerRoot defaultOpen>
        <span>内容</span>
      </DrawerRoot>,
    );

    // 検証
    expect(screen.getByText("内容").query()?.textContent).toBe("内容");
  });
});
