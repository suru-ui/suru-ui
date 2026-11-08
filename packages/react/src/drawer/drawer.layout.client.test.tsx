import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../../tests/src/_locators.js";
import { Drawer } from "./drawer.jsx";

describe("Drawer の配置", () => {
  test("ポップアップを画面下端に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer title="見出し" defaultOpen>
        本文
      </Drawer>,
    );

    // 検証
    const popup = screen.getByClassName("sui_drawer_popup").element();
    const rect = popup.getBoundingClientRect();
    expect(rect.bottom).toBeCloseTo(window.innerHeight, 0);
    expect(rect.left).toBeCloseTo(0, 0);
    expect(rect.width).toBeCloseTo(window.innerWidth, 0);
  });

  test("ポップアップを画面幅まで広げる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer title="見出し" defaultOpen>
        本文
      </Drawer>,
    );

    // 検証
    const popup = screen.getByClassName("sui_drawer_popup").element();
    const content = screen.getByClassName("sui_drawer_content").element();
    expect(getComputedStyle(popup).maxWidth).toBe("none");
    expect(getComputedStyle(content).maxWidth).toBe("none");
    expect(content.getBoundingClientRect().width).toBeCloseTo(window.innerWidth, 0);
  });

  test("上方向では上端に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer title="見出し" defaultOpen swipeDirection="up">
        本文
      </Drawer>,
    );

    // 検証
    const popup = screen.getByClassName("sui_drawer_popup").element();
    const style = getComputedStyle(popup);
    expect(popup.getBoundingClientRect().top).toBeCloseTo(0, 0);
    expect(style.borderTopLeftRadius).toBe("0px");
    expect(style.borderBottomLeftRadius).toBe("12px");
    expect(style.borderBottomRightRadius).toBe("12px");
  });

  test("左方向では左端に幅を絞って置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer title="見出し" defaultOpen swipeDirection="left">
        本文
      </Drawer>,
    );

    // 検証
    const popup = screen.getByClassName("sui_drawer_popup").element();
    const style = getComputedStyle(popup);
    const rect = popup.getBoundingClientRect();
    expect(rect.left).toBeCloseTo(0, 0);
    expect(rect.width).toBeCloseTo(window.innerWidth * 0.75, 0);
    expect(style.borderLeftWidth).toBe("0px");
    expect(style.borderRightWidth).toBe("1px");
    expect(style.borderTopLeftRadius).toBe("0px");
    expect(style.borderTopRightRadius).toBe("12px");
    expect(style.borderBottomRightRadius).toBe("12px");
  });

  test("右方向では右端に幅を絞って置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer title="見出し" defaultOpen swipeDirection="right">
        本文
      </Drawer>,
    );

    // 検証
    const popup = screen.getByClassName("sui_drawer_popup").element();
    const style = getComputedStyle(popup);
    const rect = popup.getBoundingClientRect();
    expect(rect.right).toBeCloseTo(window.innerWidth, 0);
    expect(rect.width).toBeCloseTo(window.innerWidth * 0.75, 0);
    expect(style.borderLeftWidth).toBe("1px");
    expect(style.borderRightWidth).toBe("0px");
    expect(style.borderTopLeftRadius).toBe("12px");
    expect(style.borderTopRightRadius).toBe("0px");
    expect(style.borderBottomLeftRadius).toBe("12px");
  });

  test("縦方向では画面の高さいっぱいまで広げない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer title="見出し" defaultOpen>
        本文
      </Drawer>,
    );

    // 検証
    const popup = screen.getByClassName("sui_drawer_popup").element();
    expect(Number.parseFloat(getComputedStyle(popup).maxHeight)).toBeCloseTo(
      window.innerHeight - 96,
      0,
    );
  });

  test("既定ではスワイプ領域を下端に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer title="見出し" slotProps={{ swipeArea: {} }} defaultOpen>
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
      <Drawer title="見出し" slotProps={{ swipeArea: {} }} defaultOpen swipeDirection="right">
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

  test("ヘッダーと本文とフッターの余白を揃える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer
        title="見出し"
        footer={<button type="button">保存</button>}
        defaultOpen
        description="説明"
      >
        本文
      </Drawer>,
    );

    // 検証
    const headerStyle = getComputedStyle(screen.getByClassName("sui_drawer_header").element());
    expect(Number.parseFloat(headerStyle.paddingBlockStart)).toBeCloseTo(16, 2);
    expect(Number.parseFloat(headerStyle.paddingBlockEnd)).toBeCloseTo(0, 2);
    expect(Number.parseFloat(headerStyle.paddingInlineStart)).toBeCloseTo(16, 2);
    expect(Number.parseFloat(headerStyle.rowGap)).toBeCloseTo(window.innerWidth >= 768 ? 6 : 2, 2);
    const bodyStyle = getComputedStyle(screen.getByClassName("sui_drawer_body").element());
    expect(Number.parseFloat(bodyStyle.paddingBlockStart)).toBeCloseTo(16, 2);
    expect(Number.parseFloat(bodyStyle.paddingInlineStart)).toBeCloseTo(16, 2);
    const footerStyle = getComputedStyle(screen.getByClassName("sui_drawer_footer").element());
    expect(Number.parseFloat(footerStyle.paddingBlockStart)).toBeCloseTo(0, 2);
    expect(Number.parseFloat(footerStyle.paddingBlockEnd)).toBeCloseTo(16, 2);
    expect(Number.parseFloat(footerStyle.paddingInlineStart)).toBeCloseTo(16, 2);
    expect(Number.parseFloat(footerStyle.gap)).toBeCloseTo(8, 2);
    expect(footerStyle.flexDirection).toBe("column");
  });

  test("見出しの下に説明を並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer title="見出し" defaultOpen description="説明">
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

  test("閉じるアイコンボタンを右上に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer title="見出し" defaultOpen>
        本文
      </Drawer>,
    );

    // 検証
    const controls = screen.getByClassName("sui_drawer_controls").element();
    expect(getComputedStyle(controls).position).toBe("absolute");
    expect(getComputedStyle(controls).justifyContent).toBe("flex-end");
    expect(getComputedStyle(controls).gap).toBe("8px");
    const headerRect = screen.getByClassName("sui_drawer_header").element().getBoundingClientRect();
    const buttonRect = screen
      .getByRole("button", { name: "閉じる" })
      .element()
      .getBoundingClientRect();
    expect(buttonRect.right).toBeCloseTo(headerRect.right - 16, 1);
    expect(buttonRect.top).toBeCloseTo(headerRect.top + 16, 1);
  });

  test("操作が相対配置でも閉じるアイコンボタンを右端へ寄せる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer controls="操作" slotProps={{ controls: { absolute: false } }} defaultOpen>
        本文
      </Drawer>,
    );

    // 検証
    const controls = screen.getByClassName("sui_drawer_controls").element();
    expect(getComputedStyle(controls).position).toBe("relative");
    expect(getComputedStyle(controls).justifyContent).toBe("flex-end");
    const headerRect = screen.getByClassName("sui_drawer_header").element().getBoundingClientRect();
    const buttonRect = screen
      .getByRole("button", { name: "閉じる" })
      .element()
      .getBoundingClientRect();
    expect(buttonRect.right).toBeCloseTo(headerRect.right - 16, 1);
  });

  test("本文だけのときはヘッダーを描画しない", async ({ expect }) => {
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
  });

  test("insetで画面端から浮かせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer
        title="見出し"
        slotProps={{
          popup: { style: { "--sui_drawer_popup-inset": "16px" } as React.CSSProperties },
        }}
        defaultOpen
      >
        本文
      </Drawer>,
    );

    // 検証
    const popup = screen.getByClassName("sui_drawer_popup").element();
    expect(getComputedStyle(popup).marginBottom).toBe("16px");
  });

  test("--drawer-inset でも画面端から浮かせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer
        title="見出し"
        slotProps={{
          popup: { style: { "--drawer-inset": "16px" } as React.CSSProperties },
        }}
        defaultOpen
      >
        本文
      </Drawer>,
    );

    // 検証
    const popup = screen.getByClassName("sui_drawer_popup").element();
    expect(getComputedStyle(popup).marginBottom).toBe("16px");
  });

  test("下端のドロワーにスワイプハンドルを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer title="見出し" defaultOpen showSwipeHandle>
        本文
      </Drawer>,
    );

    // 検証
    const swipeHandle = screen.getByClassName("sui_drawer_swipe_handle").element();
    const rect = swipeHandle.getBoundingClientRect();
    expect(getComputedStyle(swipeHandle).height).toBe("12px");
    const popupTop = screen
      .getByClassName("sui_drawer_popup")
      .element()
      .getBoundingClientRect().top;
    expect(Math.abs(rect.top - popupTop)).toBeLessThan(2);
  });

  test("縦方向ではヘッダーを中央に寄せる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer title="見出し" defaultOpen>
        本文
      </Drawer>,
    );

    // 検証
    const header = screen.getByClassName("sui_drawer_header").element();
    expect(getComputedStyle(header).textAlign).toBe("center");
  });
});
