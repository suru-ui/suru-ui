import { vi, test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { DrawerIndentBackground } from "../indent-background/drawer.indent-background.jsx";
import { DrawerIndent } from "../indent/drawer.indent.jsx";
import { DrawerPortal } from "../portal/drawer.portal.jsx";
import { DrawerRoot } from "../root/drawer.root.jsx";
import { DrawerVirtualKeyboardProvider } from "../virtual-keyboard-provider/drawer.virtual-keyboard-provider.jsx";
import { DrawerProvider } from "./drawer.provider.jsx";
import "../drawer.parts.js";
import "../../../tests/src/_locators.js";

describe("DrawerProvider", () => {
  test("DOM 要素を持たずに内容を描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <DrawerProvider>
        <span>内容</span>
      </DrawerProvider>,
    );

    // 検証。
    expect(screen.getByText("内容").query()?.textContent).toBe("内容");
    expect(screen.container.querySelector("[data-scope]")).toBe(null);
  });
});

describe("DrawerIndent", () => {
  test("ドロワーが開くと active のクラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <DrawerProvider>
        <DrawerIndent>
          <DrawerRoot defaultOpen>
            <DrawerPortal />
          </DrawerRoot>
        </DrawerIndent>
      </DrawerProvider>,
    );

    // 検証。
    const indent = screen.getByClassName("sui_drawer_indent").element();
    await vi.waitFor(() => {
      expect(indent.classList.contains("sui_drawer_indent-active")).toBe(true);
    });
  });

  test("ドロワーが閉じているとき active のクラスを付けない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <DrawerProvider>
        <DrawerIndent>
          <DrawerRoot />
        </DrawerIndent>
      </DrawerProvider>,
    );

    // 検証。
    const indent = screen.getByClassName("sui_drawer_indent").element();
    expect(indent.classList.contains("sui_drawer_indent-active")).toBe(false);
  });

  test("インデントの縮小と移動をアニメーション対象にする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <DrawerProvider>
        <DrawerIndent>
          <DrawerRoot />
        </DrawerIndent>
      </DrawerProvider>,
    );

    // 検証。
    const indent = screen.getByClassName("sui_drawer_indent").element();
    const style = getComputedStyle(indent);
    expect(style.transitionProperty).not.toContain("transform");
    expect(style.transitionProperty).toContain("scale");
    expect(style.transitionProperty).toContain("translate");
    expect(style.willChange).toBe("scale, translate");
  });
});

describe("DrawerIndentBackground", () => {
  test("背景レイヤーを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <DrawerProvider>
        <DrawerIndentBackground />
        <DrawerIndent>
          <DrawerRoot />
        </DrawerIndent>
      </DrawerProvider>,
    );

    // 検証。
    const indentBackground = screen.getByClassName("sui_drawer_indent_background").element();
    expect(indentBackground.tagName).toBe("DIV");
  });
});

describe("DrawerVirtualKeyboardProvider", () => {
  test("DOM 要素を持たずに内容を描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <DrawerRoot>
        <DrawerVirtualKeyboardProvider>
          <span>内容</span>
        </DrawerVirtualKeyboardProvider>
      </DrawerRoot>,
    );

    // 検証。
    expect(screen.getByText("内容").query()?.textContent).toBe("内容");
    expect(screen.container.querySelector("[data-scope]")).toBe(null);
  });
});
