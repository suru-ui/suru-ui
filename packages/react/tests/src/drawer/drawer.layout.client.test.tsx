import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { Drawer } from "../../../src/drawer/drawer.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

describe("Drawer の配置", () => {
  test("ポップアップを画面下端に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer defaultOpen title="見出し">
        本文
      </Drawer>,
    );

    // 検証
    const viewport = screen.getByClassName("sui_drawer_viewport").element();
    const popup = screen.getByClassName("sui_drawer_popup").element();
    expect(getComputedStyle(viewport).alignItems).toBe("flex-end");
    expect(getComputedStyle(viewport).justifyContent).toBe("center");
    const rect = popup.getBoundingClientRect();
    expect(rect.bottom).toBeCloseTo(window.innerHeight, 0);
    expect(rect.left).toBeCloseTo(0, 0);
    expect(rect.width).toBeCloseTo(window.innerWidth, 0);
  });

  test("ポップアップを画面幅まで広げる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer defaultOpen title="見出し">
        本文
      </Drawer>,
    );

    // 検証
    const popup = screen.getByClassName("sui_drawer_popup").element();
    const content = screen.getByClassName("sui_drawer_content").element();
    expect(getComputedStyle(popup).maxWidth).toBe("640px");
    expect(getComputedStyle(content).maxWidth).toBe("512px");
    expect(content.getBoundingClientRect().width).toBeCloseTo(Math.min(512, window.innerWidth), 0);
  });

  test("上方向では上端に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer defaultOpen swipeDirection="up" title="見出し">
        本文
      </Drawer>,
    );

    // 検証
    const viewport = screen.getByClassName("sui_drawer_viewport").element();
    const popup = screen.getByClassName("sui_drawer_popup").element();
    expect(getComputedStyle(viewport).alignItems).toBe("flex-start");
    expect(popup.getBoundingClientRect().top).toBeCloseTo(0, 0);
    expect(getComputedStyle(popup).borderRadius).toBe("0px 0px 12px 12px");
  });

  test("左方向では左端に幅を絞って置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer defaultOpen swipeDirection="left" title="見出し">
        本文
      </Drawer>,
    );

    // 検証
    const viewport = screen.getByClassName("sui_drawer_viewport").element();
    const popup = screen.getByClassName("sui_drawer_popup").element();
    expect(getComputedStyle(viewport).justifyContent).toBe("flex-start");
    const rect = popup.getBoundingClientRect();
    expect(rect.left).toBeCloseTo(0, 0);
    expect(rect.width).toBeCloseTo(Math.min(window.innerWidth * 0.75, 384), 0);
    expect(getComputedStyle(popup).borderRadius).toBe("0px");
  });

  test("右方向では右端に幅を絞って置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer defaultOpen swipeDirection="right" title="見出し">
        本文
      </Drawer>,
    );

    // 検証
    const viewport = screen.getByClassName("sui_drawer_viewport").element();
    const popup = screen.getByClassName("sui_drawer_popup").element();
    expect(getComputedStyle(viewport).justifyContent).toBe("flex-end");
    const rect = popup.getBoundingClientRect();
    expect(rect.right).toBeCloseTo(window.innerWidth, 0);
    expect(rect.width).toBeCloseTo(Math.min(window.innerWidth * 0.75, 384), 0);
  });

  test("既定ではスワイプ領域を下端に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer defaultOpen slotProps={{ swipeArea: {} }} title="見出し">
        本文
      </Drawer>,
    );

    // 検証
    const swipeArea = screen.getByClassName("sui_drawer_swipe_area").element();
    expect(getComputedStyle(swipeArea).bottom).toBe("0px");
    const rect = swipeArea.getBoundingClientRect();
    expect(rect.bottom).toBeCloseTo(window.innerHeight, 0);
    expect(rect.top).toBeGreaterThan(window.innerHeight / 2);
  });

  test("右方向ではスワイプ領域を右端に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer defaultOpen swipeDirection="right" slotProps={{ swipeArea: {} }} title="見出し">
        本文
      </Drawer>,
    );

    // 検証
    const swipeArea = screen.getByClassName("sui_drawer_swipe_area").element();
    expect(getComputedStyle(swipeArea).right).toBe("0px");
    const rect = swipeArea.getBoundingClientRect();
    expect(rect.right).toBeCloseTo(window.innerWidth, 0);
    expect(rect.left).toBeGreaterThan(window.innerWidth / 2);
  });

  test.skipIf(!supportsCustomFunctions())(
    "ヘッダーと本文とフッターの余白を揃える",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <Drawer
          defaultOpen
          description="説明"
          footer={<button type="button">保存</button>}
          title="見出し"
        >
          本文
        </Drawer>,
      );

      // 検証
      const headerStyle = getComputedStyle(screen.getByClassName("sui_drawer_header").element());
      expect(Number.parseFloat(headerStyle.paddingBlockStart)).toBeCloseTo(16, 2);
      expect(Number.parseFloat(headerStyle.paddingInlineStart)).toBeCloseTo(16, 2);
      expect(Number.parseFloat(headerStyle.rowGap)).toBeCloseTo(4, 2);
      const bodyStyle = getComputedStyle(screen.getByClassName("sui_drawer_body").element());
      expect(Number.parseFloat(bodyStyle.paddingBlockStart)).toBeCloseTo(16, 2);
      expect(Number.parseFloat(bodyStyle.paddingInlineStart)).toBeCloseTo(16, 2);
      const footerStyle = getComputedStyle(screen.getByClassName("sui_drawer_footer").element());
      expect(Number.parseFloat(footerStyle.paddingBlockStart)).toBeCloseTo(16, 2);
      expect(Number.parseFloat(footerStyle.paddingInlineStart)).toBeCloseTo(16, 2);
      expect(Number.parseFloat(footerStyle.gap)).toBeCloseTo(8, 2);
      expect(footerStyle.justifyContent).toBe("flex-end");
    },
  );

  test.skipIf(!supportsCustomFunctions())("見出しの下に説明を並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer defaultOpen description="説明" title="見出し">
        本文
      </Drawer>,
    );

    // 検証
    const titleRect = screen
      .getByRole("heading", { name: "見出し" })
      .element()
      .getBoundingClientRect();
    const descriptionRect = screen.getByText("説明").element().getBoundingClientRect();
    expect(descriptionRect.top).toBeGreaterThan(titleRect.bottom);
    expect(descriptionRect.left).toBeCloseTo(titleRect.left, 0);
  });

  test.skipIf(!supportsCustomFunctions())(
    "閉じるアイコンボタンを右上に置く",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <Drawer defaultOpen title="見出し">
          本文
        </Drawer>,
      );

      // 検証
      const controls = screen.getByClassName("sui_drawer_controls").element();
      expect(getComputedStyle(controls).position).toBe("absolute");
      expect(getComputedStyle(controls).justifyContent).toBe("flex-end");
      expect(getComputedStyle(controls).gap).toBe("8px");
      const headerRect = screen
        .getByClassName("sui_drawer_header")
        .element()
        .getBoundingClientRect();
      const buttonRect = screen
        .getByRole("button", { name: "閉じる" })
        .element()
        .getBoundingClientRect();
      expect(buttonRect.right).toBeCloseTo(headerRect.right - 16, 1);
      expect(buttonRect.top).toBeCloseTo(headerRect.top + 16, 1);
    },
  );

  test.skipIf(!supportsCustomFunctions())(
    "操作が相対配置でも閉じるアイコンボタンを右端へ寄せる",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <Drawer defaultOpen controls="操作" slotProps={{ controls: { absolute: false } }}>
          本文
        </Drawer>,
      );

      // 検証
      const controls = screen.getByClassName("sui_drawer_controls").element();
      expect(getComputedStyle(controls).position).toBe("relative");
      expect(getComputedStyle(controls).justifyContent).toBe("flex-end");
      const headerRect = screen
        .getByClassName("sui_drawer_header")
        .element()
        .getBoundingClientRect();
      const buttonRect = screen
        .getByRole("button", { name: "閉じる" })
        .element()
        .getBoundingClientRect();
      expect(buttonRect.right).toBeCloseTo(headerRect.right - 16, 1);
    },
  );

  test.skipIf(!supportsCustomFunctions())(
    "本文だけのときはヘッダーを描画しない",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <Drawer defaultOpen showCloseIconButton={false}>
          本文
        </Drawer>,
      );

      // 検証
      expect(screen.getByClassName("sui_drawer_header").query()).toBe(null);
      const content = screen.getByClassName("sui_drawer_content").element();
      const body = screen.getByClassName("sui_drawer_body").element();
      expect(body.getBoundingClientRect().top).toBeCloseTo(content.getBoundingClientRect().top, 1);
    },
  );
});
