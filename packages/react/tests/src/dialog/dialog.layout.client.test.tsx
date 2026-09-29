import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { Dialog } from "../../../src/dialog/dialog.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

const closeButton = <button type="button">閉じる</button>;

describe("Dialog の配置", () => {
  test("ポップアップを画面の中央に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog defaultOpen title="見出し" description="説明" close={closeButton}>
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
      <Dialog defaultOpen title="見出し">
        本文
      </Dialog>,
    );

    // 検証
    const backdrop = screen.getByClassName("sui_dialog_backdrop").element();
    const rect = backdrop.getBoundingClientRect();
    expect(rect.width).toBe(window.innerWidth);
    expect(rect.height).toBe(window.innerHeight);
  });

  test.skipIf(!supportsCustomFunctions())("余白と行間と角丸を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog defaultOpen title="見出し">
        本文
      </Dialog>,
    );

    // 検証
    const content = screen.getByClassName("sui_dialog_popup").element();
    const style = getComputedStyle(content);
    expect(style.paddingBlockStart).toBe("16px");
    expect(style.paddingInlineStart).toBe("16px");
    expect(style.rowGap).toBe("16px");
    expect(style.borderRadius).toBe("20px");
  });

  test.skipIf(!supportsCustomFunctions())("見出しの下に説明を並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog defaultOpen description="説明" title="見出し">
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

  test.skipIf(!supportsCustomFunctions())(
    "閉じるボタンをフッターの右端へ寄せる",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <Dialog defaultOpen showCloseIconButton={false} title="見出し" close={closeButton}>
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
      expect(buttonRect.right).toBeCloseTo(content.getBoundingClientRect().right - 16, 1);
    },
  );

  test.skipIf(!supportsCustomFunctions())(
    "積み上げ式では内容を中央に寄せる",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <Dialog defaultOpen description="説明" title="見出し" variant="stacked" close={closeButton}>
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
      const footer = screen.getByClassName("sui_dialog_footer").element();
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
        <Dialog defaultOpen title="見出し" variant="stacked" showCloseIconButton>
          本文
        </Dialog>,
      );

      // 検証
      const content = screen.getByClassName("sui_dialog_popup").element();
      const controls = screen.getByClassName("sui_dialog_controls").element();
      expect(getComputedStyle(controls).position).toBe("absolute");
      const contentRect = content.getBoundingClientRect();
      const controlsRect = controls.getBoundingClientRect();
      expect(controlsRect.right).toBeCloseTo(contentRect.right - 16, 1);
      expect(controlsRect.top).toBeCloseTo(contentRect.top + 16, 1);
    },
  );

  test.skipIf(!supportsCustomFunctions())("枠線を内側に引く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog defaultOpen outlined title="見出し">
        本文
      </Dialog>,
    );

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_dialog_popup").element());
    expect(style.borderTopStyle).toBe("solid");
    expect(Number.parseFloat(style.borderTopWidth)).toBeGreaterThan(0.5);
  });

  test.skipIf(!supportsCustomFunctions())("角丸なしでは直角にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog defaultOpen radius="none" title="見出し">
        本文
      </Dialog>,
    );

    // 検証
    expect(getComputedStyle(screen.getByClassName("sui_dialog_popup").element()).borderRadius).toBe(
      "0px",
    );
  });

  test.skipIf(!supportsCustomFunctions())(
    "閉じるアイコンボタンを右上に置く",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <Dialog defaultOpen title="見出し" showCloseIconButton>
          本文
        </Dialog>,
      );

      // 検証
      const button = screen.getByRole("button", { name: "閉じる" }).element();
      expect(button.classList.contains("sui_dialog_close")).toBe(true);
      const headerRect = screen
        .getByClassName("sui_dialog_header")
        .element()
        .getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      expect(buttonRect.right).toBeCloseTo(headerRect.right, 0);
      expect(buttonRect.top).toBeCloseTo(headerRect.top, 0);
    },
  );

  test.skipIf(!supportsCustomFunctions())(
    "見出しがなくても閉じるアイコンボタンを右上に置く",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <Dialog defaultOpen showCloseIconButton>
          本文
        </Dialog>,
      );

      // 検証
      const controls = screen.getByClassName("sui_dialog_controls").element();
      expect(getComputedStyle(controls).justifyContent).toBe("flex-end");
      const headerRect = screen
        .getByClassName("sui_dialog_header")
        .element()
        .getBoundingClientRect();
      const buttonRect = screen
        .getByRole("button", { name: "閉じる" })
        .element()
        .getBoundingClientRect();
      expect(buttonRect.right).toBeCloseTo(headerRect.right, 0);
      expect(buttonRect.top).toBeCloseTo(headerRect.top, 0);
    },
  );

  test.skipIf(!supportsCustomFunctions())(
    "本文だけのときはヘッダーを描画しない",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <Dialog defaultOpen showCloseIconButton={false}>
          本文
        </Dialog>,
      );

      // 検証
      expect(screen.getByClassName("sui_dialog_header").query()).toBe(null);
      const content = screen.getByClassName("sui_dialog_popup").element();
      const body = screen.getByClassName("sui_dialog_body").element();
      const contentRect = content.getBoundingClientRect();
      const bodyRect = body.getBoundingClientRect();
      expect(bodyRect.top - contentRect.top).toBeCloseTo(16, 1);
    },
  );
});
