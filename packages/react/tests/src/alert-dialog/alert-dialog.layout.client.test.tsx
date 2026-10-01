import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { AlertDialog } from "../../../src/alert-dialog/alert-dialog.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

const cancelButton = <button type="button">キャンセル</button>;

const confirmButton = <button type="button">削除する</button>;

describe("AlertDialog の配置", () => {
  test("ポップアップを画面の中央に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="見出し"
        description="説明"
        cancel={cancelButton}
        confirm={confirmButton}
      >
        本文
      </AlertDialog>,
    );

    // 検証
    const popup = screen.getByClassName("sui_alert_dialog_popup").element();
    const rect = popup.getBoundingClientRect();
    expect(rect.left).toBeCloseTo((window.innerWidth - rect.width) / 2, 0);
    expect(rect.top).toBeCloseTo((window.innerHeight - rect.height) / 2, 0);
  });

  test("オーバーレイを画面全体に広げる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialog defaultOpen title="見出し">
        本文
      </AlertDialog>,
    );

    // 検証
    const backdrop = screen.getByClassName("sui_alert_dialog_backdrop").element();
    const rect = backdrop.getBoundingClientRect();
    expect(rect.width).toBe(window.innerWidth);
    expect(rect.height).toBe(window.innerHeight);
  });

  test.skipIf(!supportsCustomFunctions())(
    "カードと同じ余白と行間と角丸を付ける",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <AlertDialog defaultOpen title="見出し">
          本文
        </AlertDialog>,
      );

      // 検証
      const popup = screen.getByClassName("sui_alert_dialog_popup").element();
      const style = getComputedStyle(popup);
      expect(style.paddingBlockStart).toBe("16px");
      expect(style.paddingInlineStart).toBe("0px");
      expect(style.rowGap).toBe("16px");
      expect(style.borderRadius).toBe("12px");
    },
  );

  test.skipIf(!supportsCustomFunctions())(
    "見出しと説明をアイコンの右へ並べる",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <AlertDialog defaultOpen description="説明" icon={<span>!</span>} title="見出し">
          本文
        </AlertDialog>,
      );

      // 検証
      const icon = screen.getByClassName("sui_alert_dialog_icon").element();
      const iconRect = icon.getBoundingClientRect();
      const titleRect = screen
        .getByRole("heading", { name: "見出し" })
        .element()
        .getBoundingClientRect();
      const descriptionRect = screen.getByText("説明").element().getBoundingClientRect();
      expect(titleRect.left).toBeGreaterThan(iconRect.right);
      expect(titleRect.left - iconRect.right).toBeCloseTo(16, 1);
      expect(descriptionRect.top).toBeGreaterThan(titleRect.bottom);
      expect(descriptionRect.left).toBe(titleRect.left);
      // アイコンは見出しと上端を揃え、説明の行まで伸びます。
      expect(iconRect.top).toBeCloseTo(titleRect.top, 1);
      expect(iconRect.bottom).toBeGreaterThan(descriptionRect.top);
    },
  );

  test.skipIf(!supportsCustomFunctions())(
    "説明がなければアイコンを見出しの行に収める",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <AlertDialog defaultOpen icon={<span>!</span>} title="見出し">
          本文
        </AlertDialog>,
      );

      // 検証
      const header = screen.getByClassName("sui_alert_dialog_header").element();
      const iconRect = screen
        .getByClassName("sui_alert_dialog_icon")
        .element()
        .getBoundingClientRect();
      expect(header.getBoundingClientRect().height).toBeCloseTo(iconRect.height, 0);
    },
  );

  test.skipIf(!supportsCustomFunctions())("操作をフッターの右端へ寄せる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialog defaultOpen title="見出し" cancel={cancelButton} confirm={confirmButton}>
        本文
      </AlertDialog>,
    );

    // 検証
    const popup = screen.getByClassName("sui_alert_dialog_popup").element();
    const footer = screen.getByClassName("sui_alert_dialog_footer").element();
    expect(getComputedStyle(footer).justifyContent).toBe("flex-end");
    expect(getComputedStyle(footer).gap).toBe("8px");
    const confirmRect = screen
      .getByRole("button", { name: "削除する" })
      .element()
      .getBoundingClientRect();
    const cancelRect = screen
      .getByRole("button", { name: "キャンセル" })
      .element()
      .getBoundingClientRect();
    expect(cancelRect.right).toBeLessThan(confirmRect.left);
    expect(confirmRect.right).toBeCloseTo(popup.getBoundingClientRect().right - 16, 1);
  });

  test.skipIf(!supportsCustomFunctions())(
    "積み上げ式では内容を中央に寄せる",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <AlertDialog
          defaultOpen
          description="説明"
          icon={<span>!</span>}
          title="見出し"
          variant="stacked"
          cancel={cancelButton}
          confirm={confirmButton}
        >
          本文
        </AlertDialog>,
      );

      // 検証
      const popup = screen.getByClassName("sui_alert_dialog_popup").element();
      const iconRect = screen
        .getByClassName("sui_alert_dialog_icon")
        .element()
        .getBoundingClientRect();
      const titleRect = screen
        .getByRole("heading", { name: "見出し" })
        .element()
        .getBoundingClientRect();
      const descriptionRect = screen.getByText("説明").element().getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();
      expect(iconRect.top).toBeLessThan(titleRect.top);
      expect(titleRect.top).toBeLessThan(descriptionRect.top);
      expect(iconRect.left + iconRect.width / 2).toBeCloseTo(
        popupRect.left + popupRect.width / 2,
        0,
      );
      expect(getComputedStyle(screen.getByText("説明").element()).textAlign).toBe("center");
      const footer = screen.getByClassName("sui_alert_dialog_footer").element();
      expect(getComputedStyle(footer).display).toBe("grid");
      const columns = getComputedStyle(footer).gridTemplateColumns.split(" ");
      expect(columns).toHaveLength(2);
      expect(Number.parseFloat(columns[0]!)).toBeCloseTo(Number.parseFloat(columns[1]!), 0);
    },
  );

  test.skipIf(!supportsCustomFunctions())(
    "積み上げ式では操作を右上へ絶対配置する",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <AlertDialog defaultOpen title="見出し" variant="stacked" showCancelIconButton>
          本文
        </AlertDialog>,
      );

      // 検証
      const popup = screen.getByClassName("sui_alert_dialog_popup").element();
      const action = screen.getByClassName("sui_alert_dialog_action").element();
      expect(getComputedStyle(action).position).toBe("absolute");
      const popupRect = popup.getBoundingClientRect();
      const actionRect = action.getBoundingClientRect();
      expect(actionRect.right).toBeCloseTo(popupRect.right - 16, 1);
      expect(actionRect.top).toBeCloseTo(popupRect.top + 16, 1);
    },
  );

  test.skipIf(!supportsCustomFunctions())("アイコンの大きさと角丸を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="見出し"
        icon={
          <svg viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
        }
      >
        本文
      </AlertDialog>,
    );

    // 検証
    const icon = screen.getByClassName("sui_alert_dialog_icon").element();
    const style = getComputedStyle(icon);
    expect(Number.parseFloat(style.width)).toBeCloseTo(48, 1);
    expect(style.width).toBe(style.height);
    expect(style.borderRadius).toBe("8px");
    const svgRect = icon.querySelector("svg")?.getBoundingClientRect();
    expect(svgRect?.width).toBeCloseTo(32, 1);
    expect(svgRect?.height).toBeCloseTo(32, 1);
  });

  test.skipIf(!supportsCustomFunctions())("枠線を内側に引く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialog defaultOpen outlined title="見出し">
        本文
      </AlertDialog>,
    );

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_alert_dialog_popup").element());
    expect(style.borderTopStyle).toBe("solid");
    expect(Number.parseFloat(style.borderTopWidth)).toBeGreaterThan(0.5);
  });

  test.skipIf(!supportsCustomFunctions())("角丸なしでは直角にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialog defaultOpen radius="none" title="見出し">
        本文
      </AlertDialog>,
    );

    // 検証
    expect(
      getComputedStyle(screen.getByClassName("sui_alert_dialog_popup").element()).borderRadius,
    ).toBe("0px");
  });

  test.skipIf(!supportsCustomFunctions())(
    "閉じるアイコンボタンを右上に置く",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <AlertDialog defaultOpen title="見出し" showCancelIconButton>
          本文
        </AlertDialog>,
      );

      // 検証
      const button = screen.getByRole("button", { name: "閉じる" }).element();
      expect(button.classList.contains("sui_alert_dialog_close")).toBe(true);
      const headerRect = screen
        .getByClassName("sui_alert_dialog_header")
        .element()
        .getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      expect(buttonRect.right).toBeCloseTo(headerRect.right - 16, 0);
      expect(buttonRect.top).toBeCloseTo(headerRect.top, 0);
    },
  );

  test.skipIf(!supportsCustomFunctions())(
    "見出しがなくても閉じるアイコンボタンを右上に置く",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <AlertDialog defaultOpen showCancelIconButton>
          本文
        </AlertDialog>,
      );

      // 検証
      const action = screen.getByClassName("sui_alert_dialog_action").element();
      expect(getComputedStyle(action).justifySelf).toBe("end");
      const headerRect = screen
        .getByClassName("sui_alert_dialog_header")
        .element()
        .getBoundingClientRect();
      const buttonRect = screen
        .getByRole("button", { name: "閉じる" })
        .element()
        .getBoundingClientRect();
      expect(buttonRect.right).toBeCloseTo(headerRect.right - 16, 0);
      expect(buttonRect.top).toBeCloseTo(headerRect.top, 0);
    },
  );
});
