import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../../tests/src/_locators.js";
import { Dialog } from "./dialog.jsx";

const closeButton = <button type="button">閉じる</button>;

describe("Dialog の配置", () => {
  test("ポップアップを画面の中央に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog close={closeButton} title="見出し" defaultOpen description="説明">
        本文
      </Dialog>,
    );

    // 検証
    const content = screen.getByClassName("sui_dialog_popup").element();
    const rect = content.getBoundingClientRect();
    expect(rect.left).toBeCloseTo((window.innerWidth - rect.width) / 2, 0);
    expect(rect.top).toBeCloseTo((window.innerHeight - rect.height) / 2, 0);
  });

  test("オーバーレイを画面全体に広げる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog title="見出し" defaultOpen>
        本文
      </Dialog>,
    );

    // 検証
    const backdrop = screen.getByClassName("sui_dialog_backdrop").element();
    const rect = backdrop.getBoundingClientRect();
    expect(rect.width).toBe(window.innerWidth);
    expect(rect.height).toBe(window.innerHeight);
  });

  test("カードと同じ余白と行間と角丸を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog title="見出し" defaultOpen>
        本文
      </Dialog>,
    );

    // 検証
    const popup = screen.getByClassName("sui_dialog_popup").element();
    const style = getComputedStyle(popup);
    expect(style.paddingBlockStart).toBe("16px");
    expect(style.paddingInlineStart).toBe("0px");
    expect(style.rowGap).toBe("16px");
    expect(style.borderRadius).toBe("12px");
  });

  test("見出しの下に説明を並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog title="見出し" defaultOpen description="説明">
        本文
      </Dialog>,
    );

    // 検証
    const titleRect = screen
      .getByRole("heading", { name: "見出し" })
      .element()
      .getBoundingClientRect();
    const descriptionRect = screen.getByText("説明").element().getBoundingClientRect();
    expect(descriptionRect.top).toBeGreaterThan(titleRect.bottom);
    expect(descriptionRect.left).toBe(titleRect.left);
  });

  test("閉じるボタンをフッターの右端へ寄せる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog close={closeButton} title="見出し" defaultOpen showCloseIconButton={false}>
        本文
      </Dialog>,
    );

    // 検証
    const content = screen.getByClassName("sui_dialog_popup").element();
    const footer = screen.getByClassName("sui_dialog_footer").element();
    expect(getComputedStyle(footer).justifyContent).toBe("flex-end");
    expect(getComputedStyle(footer).gap).toBe("8px");
    const buttonRect = screen
      .getByRole("button", { name: "閉じる" })
      .element()
      .getBoundingClientRect();
    // ポップアップは Card 継承で枠線を持つため、rect (border box) から枠線幅を除いて比べます。
    const borderRight = Number.parseFloat(getComputedStyle(content).borderRightWidth);
    expect(buttonRect.right).toBeCloseTo(
      content.getBoundingClientRect().right - borderRight - 16,
      1,
    );
  });

  test("積み上げ式では内容を中央に寄せる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog
        close={closeButton}
        title="見出し"
        footer={<button type="button">保存</button>}
        variant="stacked"
        defaultOpen
        description="説明"
      >
        本文
      </Dialog>,
    );

    // 検証
    const titleRect = screen
      .getByRole("heading", { name: "見出し" })
      .element()
      .getBoundingClientRect();
    const descriptionRect = screen.getByText("説明").element().getBoundingClientRect();
    expect(descriptionRect.top).toBeGreaterThan(titleRect.bottom);
    expect(getComputedStyle(screen.getByText("説明").element()).textAlign).toBe("center");
    const popupRect = screen.getByClassName("sui_dialog_popup").element().getBoundingClientRect();
    expect(titleRect.left + titleRect.width / 2).toBeCloseTo(
      popupRect.left + popupRect.width / 2,
      0,
    );
    const footer = screen.getByClassName("sui_dialog_footer").element();
    expect(getComputedStyle(footer).display).toBe("grid");
    const columns = getComputedStyle(footer).gridTemplateColumns.split(" ");
    expect(columns).toHaveLength(2);
    expect(Number.parseFloat(columns[0]!)).toBeCloseTo(Number.parseFloat(columns[1]!), 0);
  });

  test("積み上げ式では操作を右上へ絶対配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog title="見出し" variant="stacked" defaultOpen showCloseIconButton>
        本文
      </Dialog>,
    );

    // 検証
    const content = screen.getByClassName("sui_dialog_popup").element();
    const action = screen.getByClassName("sui_dialog_action").element();
    expect(getComputedStyle(action).position).toBe("absolute");
    const contentRect = content.getBoundingClientRect();
    const actionRect = action.getBoundingClientRect();
    // ポップアップは Card 継承で枠線を持つため、rect (border box) から枠線幅を除いて比べます。
    const borderRight = Number.parseFloat(getComputedStyle(content).borderRightWidth);
    const borderTop = Number.parseFloat(getComputedStyle(content).borderTopWidth);
    expect(actionRect.right).toBeCloseTo(contentRect.right - borderRight - 16, 1);
    expect(actionRect.top).toBeCloseTo(contentRect.top + borderTop + 16, 1);
  });

  test("枠線を内側に引く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog title="見出し" outlined defaultOpen>
        本文
      </Dialog>,
    );

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_dialog_popup").element());
    expect(style.borderTopStyle).toBe("solid");
    expect(Number.parseFloat(style.borderTopWidth)).toBeGreaterThan(0.5);
  });

  test("角丸なしでは直角にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog title="見出し" radius="none" defaultOpen>
        本文
      </Dialog>,
    );

    // 検証
    expect(getComputedStyle(screen.getByClassName("sui_dialog_popup").element()).borderRadius).toBe(
      "0px",
    );
  });

  test("閉じるアイコンボタンを右上に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog title="見出し" defaultOpen showCloseIconButton>
        本文
      </Dialog>,
    );

    // 検証
    const button = screen.getByRole("button", { name: "閉じる" }).element();
    expect(button.classList.contains("sui_dialog_close")).toBe(true);
    const headerRect = screen.getByClassName("sui_dialog_header").element().getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    expect(buttonRect.right).toBeCloseTo(headerRect.right - 16, 0);
    expect(buttonRect.top).toBeCloseTo(headerRect.top, 0);
  });

  test("見出しがなくても閉じるアイコンボタンを右上に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog defaultOpen showCloseIconButton>
        本文
      </Dialog>,
    );

    // 検証
    const action = screen.getByClassName("sui_dialog_action").element();
    expect(getComputedStyle(action).justifySelf).toBe("end");
    const headerRect = screen.getByClassName("sui_dialog_header").element().getBoundingClientRect();
    const buttonRect = screen
      .getByRole("button", { name: "閉じる" })
      .element()
      .getBoundingClientRect();
    expect(buttonRect.right).toBeCloseTo(headerRect.right - 16, 0);
    expect(buttonRect.top).toBeCloseTo(headerRect.top, 0);
  });

  test("本文だけのときはヘッダーを描画しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog defaultOpen showCloseIconButton={false}>
        本文
      </Dialog>,
    );

    // 検証
    expect(screen.getByClassName("sui_dialog_header").query()).toBe(null);
    const content = screen.getByClassName("sui_dialog_popup").element();
    const body = screen.getByClassName("sui_dialog_content").element();
    const contentRect = content.getBoundingClientRect();
    const bodyRect = body.getBoundingClientRect();
    // ポップアップは Card 継承で枠線を持つため、rect (border box) から枠線幅を除いて比べます。
    const borderTop = Number.parseFloat(getComputedStyle(content).borderTopWidth);
    expect(bodyRect.top - contentRect.top - borderTop).toBeCloseTo(16, 1);
  });
});
