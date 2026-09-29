import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/alert/alert.parts.js";
import { AlertActions } from "../../../src/alert/alert.actions.jsx";
import { AlertContent } from "../../../src/alert/alert.content.jsx";
import { AlertIcon } from "../../../src/alert/alert.icon.jsx";
import { AlertRoot } from "../../../src/alert/alert.root.jsx";
import { AlertTitle } from "../../../src/alert/alert.title.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

describe("AlertRoot の配置", () => {
  test("グリッドで各パーツを配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot aria-label="通知">
        <AlertIcon />
        <AlertTitle>更新完了</AlertTitle>
        <AlertContent>プロフィールを更新しました。</AlertContent>
      </AlertRoot>,
    );

    // 検証
    const root = screen.getByRole("alert", { name: "通知" }).element();
    expect(getComputedStyle(root).display).toBe("grid");
    const icon = screen.getByClassName("sui_alert_icon").element().getBoundingClientRect();
    const title = screen.getByText("更新完了").element().getBoundingClientRect();
    const content = screen
      .getByText("プロフィールを更新しました。")
      .element()
      .getBoundingClientRect();
    expect(icon.left).toBeLessThan(title.left);
    expect(icon.top).toBeLessThan(content.top);
    expect(title.bottom).toBeLessThanOrEqual(content.top);
  });

  test("本文の下にアクションを置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot aria-label="通知">
        <AlertContent>プロフィールを更新しました。</AlertContent>
        <AlertActions>
          <button type="button">再試行</button>
        </AlertActions>
      </AlertRoot>,
    );

    // 検証
    const content = screen
      .getByText("プロフィールを更新しました。")
      .element()
      .getBoundingClientRect();
    const actions = screen.getByClassName("sui_alert_actions").element().getBoundingClientRect();
    expect(content.bottom).toBeLessThanOrEqual(actions.top);
  });

  test.skipIf(!supportsCustomFunctions())("大きさごとの余白と間隔を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AlertRoot aria-label="小" size="sm">
          <AlertContent>小の本文</AlertContent>
        </AlertRoot>
        <AlertRoot aria-label="中" size="md">
          <AlertContent>中の本文</AlertContent>
        </AlertRoot>
        <AlertRoot aria-label="大" size="lg">
          <AlertContent>大の本文</AlertContent>
        </AlertRoot>
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.getByRole("alert", { name: "小" }).element());
    expect(sm.rowGap).toBe("2px");
    expect(sm.columnGap).toBe("8px");
    expect(sm.paddingBlockStart).toBe("8px");
    expect(sm.paddingInlineStart).toBe("8px");
    const md = getComputedStyle(screen.getByRole("alert", { name: "中" }).element());
    expect(md.rowGap).toBe("4px");
    expect(md.columnGap).toBe("12px");
    expect(md.paddingBlockStart).toBe("12px");
    expect(md.paddingInlineStart).toBe("12px");
    const lg = getComputedStyle(screen.getByRole("alert", { name: "大" }).element());
    expect(lg.rowGap).toBe("6px");
    expect(lg.columnGap).toBe("16px");
    expect(lg.paddingBlockStart).toBe("16px");
    expect(lg.paddingInlineStart).toBe("16px");
  });

  test.skipIf(!supportsCustomFunctions())("枠線の幅だけ内側の余白を詰める", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AlertRoot aria-label="枠線なし">
          <AlertContent>枠線なしの本文</AlertContent>
        </AlertRoot>
        <AlertRoot aria-label="枠線あり" outlined>
          <AlertContent>枠線ありの本文</AlertContent>
        </AlertRoot>
      </>,
    );

    // 検証
    const plain = getComputedStyle(screen.getByRole("alert", { name: "枠線なし" }).element());
    expect(Number.parseFloat(plain.borderTopWidth)).toBeCloseTo(0, 1);
    expect(plain.paddingBlockStart).toBe("12px");
    expect(plain.paddingInlineStart).toBe("12px");
    const outlined = getComputedStyle(screen.getByRole("alert", { name: "枠線あり" }).element());
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeGreaterThan(0.5);
    expect(Number.parseFloat(outlined.paddingBlockStart)).toBeCloseTo(11, 1);
    expect(Number.parseFloat(outlined.paddingInlineStart)).toBeCloseTo(11, 1);
  });

  test.skipIf(!supportsCustomFunctions())(
    "アイコンとタイトルの間隔を空ける",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <AlertRoot aria-label="通知">
          <AlertIcon />
          <AlertTitle>更新完了</AlertTitle>
        </AlertRoot>,
      );

      // 検証
      const icon = screen.getByClassName("sui_alert_icon").element().getBoundingClientRect();
      const title = screen.getByText("更新完了").element().getBoundingClientRect();
      expect(title.left - icon.right).toBeCloseTo(12, 1);
    },
  );

  test.skipIf(!supportsCustomFunctions())("本文をタイトルの行間だけ下げる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot aria-label="通知">
        <AlertTitle>更新完了</AlertTitle>
        <AlertContent>プロフィールを更新しました。</AlertContent>
      </AlertRoot>,
    );

    // 検証
    const title = screen.getByText("更新完了").element().getBoundingClientRect();
    const content = screen
      .getByText("プロフィールを更新しました。")
      .element()
      .getBoundingClientRect();
    expect(content.top - title.bottom).toBeCloseTo(4, 1);
  });

  test("アイコンをタイトルの行に揃える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot aria-label="通知">
        <AlertIcon />
        <AlertTitle>更新完了</AlertTitle>
      </AlertRoot>,
    );

    // 検証
    const icon = screen.getByClassName("sui_alert_icon").element();
    const indicator = getComputedStyle(icon, "::before");
    expect(indicator.width).toBe("17.5px");
    expect(indicator.height).toBe("17.5px");
    const iconRect = icon.getBoundingClientRect();
    const titleRect = screen.getByText("更新完了").element().getBoundingClientRect();
    expect(iconRect.top - titleRect.top).toBeCloseTo(3.15, 1);
  });

  test("アイコン単独でもインジケーターを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot aria-label="通知">
        <AlertIcon />
      </AlertRoot>,
    );

    // 検証
    const indicator = getComputedStyle(
      screen.getByClassName("sui_alert_icon").element(),
      "::before",
    );
    expect(indicator.width).toBe("17.5px");
    expect(indicator.height).toBe("17.5px");
  });

  test("アイコンとアクションだけでもインジケーターを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot aria-label="通知">
        <AlertIcon />
        <AlertActions>
          <button type="button">再試行</button>
        </AlertActions>
      </AlertRoot>,
    );

    // 検証
    const indicator = getComputedStyle(
      screen.getByClassName("sui_alert_icon").element(),
      "::before",
    );
    expect(indicator.width).toBe("17.5px");
    expect(indicator.height).toBe("17.5px");
  });

  test("アイコン単独の子要素を活字の大きさに合わせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot aria-label="通知">
        <AlertIcon>
          <svg viewBox="0 0 16 16" />
        </AlertIcon>
      </AlertRoot>,
    );

    // 検証
    const svg = screen.getByClassName("sui_alert_icon").element().querySelector("svg");
    const svgRect = svg?.getBoundingClientRect();
    expect(svgRect?.width).toBeCloseTo(17.5, 1);
    expect(svgRect?.height).toBeCloseTo(17.5, 1);
  });

  test("タイトルと本文の活字を大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AlertRoot aria-label="中" size="md">
          <AlertTitle>中のタイトル</AlertTitle>
          <AlertContent>中の本文</AlertContent>
        </AlertRoot>
        <AlertRoot aria-label="大" size="lg">
          <AlertTitle>大のタイトル</AlertTitle>
          <AlertContent>大の本文</AlertContent>
        </AlertRoot>
      </>,
    );

    // 検証
    const mdTitle = getComputedStyle(screen.getByText("中のタイトル").element());
    expect(mdTitle.fontSize).toBe("14px");
    expect(mdTitle.fontWeight).toBe("700");
    const mdContent = getComputedStyle(screen.getByText("中の本文").element());
    expect(mdContent.fontSize).toBe("14px");
    expect(mdContent.fontWeight).toBe("400");
    const lgTitle = getComputedStyle(screen.getByText("大のタイトル").element());
    expect(lgTitle.fontSize).toBe("17px");
    const lgContent = getComputedStyle(screen.getByText("大の本文").element());
    expect(lgContent.fontSize).toBe("17px");
  });

  test("配色をタイトルとアイコンへ伝える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-blue-naked-canvas_text-normal)" }}>色の基準</span>
        <AlertRoot aria-label="通知" color="blue" variant="naked">
          <AlertIcon />
          <AlertTitle>更新完了</AlertTitle>
        </AlertRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("色の基準").element()).color;
    expect(getComputedStyle(screen.getByText("更新完了").element()).color).toBe(expected);
    const icon = screen.getByClassName("sui_alert_icon").element();
    expect(getComputedStyle(icon, "::before").backgroundColor).toBe(expected);
  });

  test.skipIf(!supportsCustomFunctions())("アクションを右下に寄せる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot aria-label="通知">
        <AlertTitle>更新完了</AlertTitle>
        <AlertContent>プロフィールを更新しました。</AlertContent>
        <AlertActions>
          <button type="button">再試行</button>
        </AlertActions>
      </AlertRoot>,
    );

    // 検証
    const root = screen.getByRole("alert", { name: "通知" }).element().getBoundingClientRect();
    const actions = screen.getByClassName("sui_alert_actions").element();
    const actionsStyle = getComputedStyle(actions);
    expect(actionsStyle.justifyContent).toBe("flex-end");
    expect(actionsStyle.justifySelf).toBe("end");
    expect(actionsStyle.gap).toBe("8px");
    expect(actionsStyle.paddingBlockStart).toBe("12px");
    expect(actionsStyle.paddingBlockEnd).toBe("4px");
    const actionsRect = actions.getBoundingClientRect();
    expect(actionsRect.right).toBeCloseTo(root.right - 12, 1);
    expect(actionsRect.bottom).toBeCloseTo(root.bottom - 12, 1);
  });

  test.skipIf(!supportsCustomFunctions())(
    "本文のないアクションは上下の余白を残さない",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <AlertRoot aria-label="通知">
          <AlertActions>
            <button type="button">再試行</button>
          </AlertActions>
        </AlertRoot>,
      );

      // 検証
      const actions = getComputedStyle(screen.getByClassName("sui_alert_actions").element());
      expect(actions.paddingBlockStart).toBe("0px");
      expect(actions.paddingBlockEnd).toBe("0px");
    },
  );
});
