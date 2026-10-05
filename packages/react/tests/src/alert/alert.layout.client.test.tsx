import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/alert/alert.parts.js";
import { AlertActions } from "../../../src/alert/actions/alert.actions.jsx";
import { AlertDescription } from "../../../src/alert/description/alert.description.jsx";
import { AlertIcon } from "../../../src/alert/icon/alert.icon.jsx";
import { AlertRoot } from "../../../src/alert/root/alert.root.jsx";
import { AlertTitle } from "../../../src/alert/title/alert.title.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

describe("AlertRoot の配置", () => {
  test("グリッドで各パーツを配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot aria-label="通知" actionsPosition="bottom">
        <AlertIcon />
        <AlertTitle>更新完了</AlertTitle>
        <AlertDescription>プロフィールを更新しました。</AlertDescription>
      </AlertRoot>,
    );

    // 検証
    const root = screen.getByRole("alert", { name: "通知" }).element();
    expect(getComputedStyle(root).display).toBe("grid");
    const icon = screen.getByClassName("sui_alert_icon").element().getBoundingClientRect();
    const title = screen.getByText("更新完了").element().getBoundingClientRect();
    const description = screen
      .getByText("プロフィールを更新しました。")
      .element()
      .getBoundingClientRect();
    expect(icon.left).toBeLessThan(title.left);
    expect(icon.top).toBeLessThan(description.top);
    expect(title.bottom).toBeLessThanOrEqual(description.top);
  });

  test("アクションがなくてもタイトルと説明文を縦に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot aria-label="通知" actionsPosition="side">
        <AlertIcon />
        <AlertTitle>更新完了</AlertTitle>
        <AlertDescription>プロフィールを更新しました。</AlertDescription>
      </AlertRoot>,
    );

    // 検証
    const title = screen.getByText("更新完了").element().getBoundingClientRect();
    const description = screen
      .getByText("プロフィールを更新しました。")
      .element()
      .getBoundingClientRect();
    expect(title.bottom).toBeLessThanOrEqual(description.top);
  });

  test("タイトルと説明文を横に並べて説明文を右寄せにできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot aria-label="通知" actionsPosition="side" descriptionPosition="side-end">
        <AlertIcon />
        <AlertTitle>更新完了</AlertTitle>
        <AlertDescription>プロフィールを更新しました。</AlertDescription>
      </AlertRoot>,
    );

    // 検証
    const icon = screen.getByClassName("sui_alert_icon").element().getBoundingClientRect();
    const title = screen.getByText("更新完了").element().getBoundingClientRect();
    const description = screen
      .getByText("プロフィールを更新しました。")
      .element()
      .getBoundingClientRect();
    expect(title.left).toBeGreaterThanOrEqual(icon.right);
    expect(description.left).toBeGreaterThanOrEqual(title.right);
    expect(title.top).toBeCloseTo(description.top, 0);
    expect(
      getComputedStyle(screen.getByText("プロフィールを更新しました。").element()).textAlign,
    ).toBe("end");
  });

  test("タイトルと説明文を横に並べて説明文を左寄せにできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot aria-label="通知" actionsPosition="side" descriptionPosition="side-start">
        <AlertIcon />
        <AlertTitle>更新完了</AlertTitle>
        <AlertDescription>プロフィールを更新しました。</AlertDescription>
      </AlertRoot>,
    );

    // 検証
    const icon = screen.getByClassName("sui_alert_icon").element().getBoundingClientRect();
    const title = screen.getByText("更新完了").element().getBoundingClientRect();
    const description = screen
      .getByText("プロフィールを更新しました。")
      .element()
      .getBoundingClientRect();
    expect(title.left).toBeGreaterThanOrEqual(icon.right);
    expect(description.left).toBeGreaterThanOrEqual(title.right);
    expect(title.top).toBeCloseTo(description.top, 0);
    expect(
      getComputedStyle(screen.getByText("プロフィールを更新しました。").element()).textAlign,
    ).toBe("start");
  });

  test.skipIf(!supportsCustomFunctions())(
    "説明文を横に並べたときアクションを末尾に置く",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <AlertRoot aria-label="通知" actionsPosition="side" descriptionPosition="side-end">
          <AlertIcon />
          <AlertTitle>更新完了</AlertTitle>
          <AlertDescription>プロフィールを更新しました。</AlertDescription>
          <AlertActions>
            <button type="button">再試行</button>
          </AlertActions>
        </AlertRoot>,
      );

      // 検証
      const description = screen
        .getByText("プロフィールを更新しました。")
        .element()
        .getBoundingClientRect();
      const actions = screen.getByClassName("sui_alert_actions").element();
      expect(getComputedStyle(actions).gridColumnStart).toBe("4");
      const actionsRect = actions.getBoundingClientRect();
      expect(actionsRect.left).toBeGreaterThan(description.right);
    },
  );

  test("説明文の下にアクションを置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot aria-label="通知" actionsPosition="bottom">
        <AlertDescription>プロフィールを更新しました。</AlertDescription>
        <AlertActions>
          <button type="button">再試行</button>
        </AlertActions>
      </AlertRoot>,
    );

    // 検証
    const description = screen
      .getByText("プロフィールを更新しました。")
      .element()
      .getBoundingClientRect();
    const actions = screen.getByClassName("sui_alert_actions").element().getBoundingClientRect();
    expect(description.bottom).toBeLessThanOrEqual(actions.top);
  });

  test.skipIf(!supportsCustomFunctions())("大きさごとの余白と間隔を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AlertRoot aria-label="小" size="sm">
          <AlertDescription>小の説明文</AlertDescription>
        </AlertRoot>
        <AlertRoot aria-label="中" size="md">
          <AlertDescription>中の説明文</AlertDescription>
        </AlertRoot>
        <AlertRoot aria-label="大" size="lg">
          <AlertDescription>大の説明文</AlertDescription>
        </AlertRoot>
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.getByRole("alert", { name: "小" }).element());
    expect(sm.rowGap).toBe("2px");
    expect(sm.columnGap).toBe("6px");
    expect(sm.paddingBlockStart).toBe("4px");
    expect(sm.paddingInlineStart).toBe("8px");
    const md = getComputedStyle(screen.getByRole("alert", { name: "中" }).element());
    expect(md.rowGap).toBe("2px");
    expect(md.columnGap).toBe("8px");
    expect(md.paddingBlockStart).toBe("6px");
    expect(md.paddingInlineStart).toBe("10px");
    const lg = getComputedStyle(screen.getByRole("alert", { name: "大" }).element());
    expect(lg.rowGap).toBe("2px");
    expect(lg.columnGap).toBe("12px");
    expect(lg.paddingBlockStart).toBe("10px");
    expect(lg.paddingInlineStart).toBe("14px");
  });

  test.skipIf(!supportsCustomFunctions())("枠線の幅だけ内側の余白を詰める", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AlertRoot aria-label="枠線なし">
          <AlertDescription>枠線なしの説明文</AlertDescription>
        </AlertRoot>
        <AlertRoot aria-label="枠線あり" outlined>
          <AlertDescription>枠線ありの説明文</AlertDescription>
        </AlertRoot>
      </>,
    );

    // 検証
    const plain = getComputedStyle(screen.getByRole("alert", { name: "枠線なし" }).element());
    expect(Number.parseFloat(plain.borderTopWidth)).toBeCloseTo(0, 1);
    expect(plain.paddingBlockStart).toBe("6px");
    expect(plain.paddingInlineStart).toBe("10px");
    const outlined = getComputedStyle(screen.getByRole("alert", { name: "枠線あり" }).element());
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeGreaterThan(0.5);
    expect(Number.parseFloat(outlined.paddingBlockStart)).toBeCloseTo(5, 1);
    expect(Number.parseFloat(outlined.paddingInlineStart)).toBeCloseTo(9, 1);
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
      expect(title.left - icon.right).toBeCloseTo(8, 1);
    },
  );

  test.skipIf(!supportsCustomFunctions())(
    "説明文をタイトルの行間だけ下げる",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <AlertRoot aria-label="通知" actionsPosition="bottom">
          <AlertTitle>更新完了</AlertTitle>
          <AlertDescription>プロフィールを更新しました。</AlertDescription>
        </AlertRoot>,
      );

      // 検証
      const title = screen.getByText("更新完了").element().getBoundingClientRect();
      const description = screen
        .getByText("プロフィールを更新しました。")
        .element()
        .getBoundingClientRect();
      expect(description.top - title.bottom).toBeCloseTo(2, 1);
    },
  );

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

  test("タイトルと説明文の活字を大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AlertRoot aria-label="中" size="md">
          <AlertTitle>中のタイトル</AlertTitle>
          <AlertDescription>中の説明文</AlertDescription>
        </AlertRoot>
        <AlertRoot aria-label="大" size="lg">
          <AlertTitle>大のタイトル</AlertTitle>
          <AlertDescription>大の説明文</AlertDescription>
        </AlertRoot>
      </>,
    );

    // 検証
    const mdTitle = getComputedStyle(screen.getByText("中のタイトル").element());
    expect(mdTitle.fontSize).toBe("14px");
    expect(mdTitle.fontWeight).toBe("700");
    const mdDescription = getComputedStyle(screen.getByText("中の説明文").element());
    expect(mdDescription.fontSize).toBe("14px");
    expect(mdDescription.fontWeight).toBe("400");
    const lgTitle = getComputedStyle(screen.getByText("大のタイトル").element());
    expect(lgTitle.fontSize).toBe("17px");
    const lgDescription = getComputedStyle(screen.getByText("大の説明文").element());
    expect(lgDescription.fontSize).toBe("17px");
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
      <AlertRoot aria-label="通知" actionsPosition="bottom">
        <AlertTitle>更新完了</AlertTitle>
        <AlertDescription>プロフィールを更新しました。</AlertDescription>
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
    expect(actionsStyle.rowGap).toBe("2px");
    expect(actionsStyle.columnGap).toBe("8px");
    expect(actionsStyle.paddingBlockStart).toBe("12px");
    expect(actionsStyle.paddingBlockEnd).toBe("4px");
    expect(actionsStyle.marginBlockStart).toBe("12px");
    expect(actionsStyle.borderBlockStartStyle).toBe("solid");
    expect(actionsStyle.borderBlockStartWidth).toBe("1px");
    expect(actionsStyle.borderInlineStartWidth).toBe("0px");
    const actionsRect = actions.getBoundingClientRect();
    expect(actionsRect.left).toBeCloseTo(root.left + 10, 1);
    expect(actionsRect.right).toBeCloseTo(root.right - 10, 1);
    const buttonRect = screen
      .getByRole("button", { name: "再試行" })
      .element()
      .getBoundingClientRect();
    expect(buttonRect.right).toBeCloseTo(root.right - 10, 1);
    expect(actionsRect.bottom).toBeCloseTo(root.bottom - 6, 1);
  });

  test.skipIf(!supportsCustomFunctions())(
    "アクションをタイトルと説明文の右側に縦方向へ並べる",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <AlertRoot aria-label="通知" actionsPosition="side">
          <AlertIcon />
          <AlertTitle>更新完了</AlertTitle>
          <AlertDescription>プロフィールを更新しました。</AlertDescription>
          <AlertActions>
            <button type="button">閉じる</button>
            <button type="button">再試行</button>
          </AlertActions>
        </AlertRoot>,
      );

      // 検証
      const root = screen.getByRole("alert", { name: "通知" }).element();
      expect(root.classList.contains("sui_alert-actionsposition_side")).toBe(true);
      const rootRect = root.getBoundingClientRect();
      const titleRect = screen.getByText("更新完了").element().getBoundingClientRect();
      const descriptionRect = screen
        .getByText("プロフィールを更新しました。")
        .element()
        .getBoundingClientRect();
      const actions = screen.getByClassName("sui_alert_actions").element();
      const actionsStyle = getComputedStyle(actions);
      expect(actionsStyle.gridColumnStart).toBe("3");
      expect(actionsStyle.flexDirection).toBe("column");
      expect(actionsStyle.paddingBlockStart).toBe("0px");
      expect(actionsStyle.paddingBlockEnd).toBe("0px");
      const actionsRect = actions.getBoundingClientRect();
      expect(actionsRect.left).toBeGreaterThan(descriptionRect.right);
      expect(actionsRect.right).toBeCloseTo(rootRect.right - 10, 1);
      const actionsCenter = (actionsRect.top + actionsRect.bottom) / 2;
      const textCenter = (titleRect.top + descriptionRect.bottom) / 2;
      expect(actionsCenter).toBeCloseTo(textCenter, 0);
      const first = screen
        .getByRole("button", { name: "閉じる" })
        .element()
        .getBoundingClientRect();
      const second = screen
        .getByRole("button", { name: "再試行" })
        .element()
        .getBoundingClientRect();
      expect(second.top - first.bottom).toBeCloseTo(2, 1);
    },
  );

  test.skipIf(!supportsCustomFunctions())(
    "横配置では説明文との間に仕切り線を表示する",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <>
          <span style={{ borderInlineStartColor: "var(--sui-border-1)" }}>色の基準</span>
          <AlertRoot aria-label="通知" actionsPosition="side">
            <AlertTitle>更新完了</AlertTitle>
            <AlertDescription>プロフィールを更新しました。</AlertDescription>
            <AlertActions>
              <button type="button">再試行</button>
            </AlertActions>
          </AlertRoot>
        </>,
      );

      // 検証
      const expected = getComputedStyle(
        screen.getByText("色の基準").element(),
      ).borderInlineStartColor;
      const actions = screen.getByClassName("sui_alert_actions").element();
      const actionsStyle = getComputedStyle(actions);
      expect(actionsStyle.borderInlineStartStyle).toBe("solid");
      expect(actionsStyle.borderInlineStartWidth).toBe("1px");
      expect(actionsStyle.borderInlineStartColor).toBe(expected);
      const titleRect = screen.getByText("更新完了").element().getBoundingClientRect();
      const descriptionRect = screen
        .getByText("プロフィールを更新しました。")
        .element()
        .getBoundingClientRect();
      const actionsRect = actions.getBoundingClientRect();
      expect(actionsRect.height).toBeCloseTo(descriptionRect.bottom - titleRect.top, 0);
    },
  );

  test.skipIf(!supportsCustomFunctions())(
    "説明文のないアクションは上下の余白を残さない",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <AlertRoot aria-label="通知" actionsPosition="bottom">
          <AlertActions>
            <button type="button">再試行</button>
          </AlertActions>
        </AlertRoot>,
      );

      // 検証
      const actions = getComputedStyle(screen.getByClassName("sui_alert_actions").element());
      expect(actions.paddingBlockStart).toBe("0px");
      expect(actions.paddingBlockEnd).toBe("0px");
      expect(actions.marginBlockStart).toBe("0px");
      expect(actions.borderBlockStartWidth).toBe("0px");
    },
  );
});
