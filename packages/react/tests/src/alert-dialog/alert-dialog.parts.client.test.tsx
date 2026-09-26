import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { AlertDialogBackdrop } from "../../../src/alert-dialog/alert-dialog.backdrop.jsx";
import { AlertDialogBody } from "../../../src/alert-dialog/alert-dialog.body.jsx";
import { AlertDialogCloseTrigger } from "../../../src/alert-dialog/alert-dialog.close-trigger.jsx";
import { AlertDialogContent } from "../../../src/alert-dialog/alert-dialog.content.jsx";
import { AlertDialogControls } from "../../../src/alert-dialog/alert-dialog.controls.jsx";
import { AlertDialogDescription } from "../../../src/alert-dialog/alert-dialog.description.jsx";
import { AlertDialogFooter } from "../../../src/alert-dialog/alert-dialog.footer.jsx";
import { AlertDialogHeader } from "../../../src/alert-dialog/alert-dialog.header.jsx";
import { AlertDialogPortal } from "../../../src/alert-dialog/alert-dialog.portal.jsx";
import { AlertDialogRoot } from "../../../src/alert-dialog/alert-dialog.root.jsx";
import { AlertDialogTitle } from "../../../src/alert-dialog/alert-dialog.title.jsx";
import { AlertDialogToggleTrigger } from "../../../src/alert-dialog/alert-dialog.toggle-trigger.jsx";
import { AlertDialogViewport } from "../../../src/alert-dialog/alert-dialog.viewport.jsx";
import "../../../src/alert-dialog/alert-dialog.parts.js";
import "../_locators.js";

/**
 * 開いた状態のアラートダイアログを組み立てます。
 * ポップアップ系のパーツは Base UI のルートコンテキストを必要とするため、単体では描画できません。
 */
function renderDialog(children: React.ReactNode) {
  return render(
    <AlertDialogRoot defaultOpen>
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogViewport>
          <AlertDialogContent>{children}</AlertDialogContent>
        </AlertDialogViewport>
      </AlertDialogPortal>
    </AlertDialogRoot>,
  );
}

describe("AlertDialogPortal", () => {
  test("ポップアップを別の場所へ配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogTitle>見出し</AlertDialogTitle>);

    // 検証
    const portal = screen.getByClassName("sui_alert_dialog_portal").element();
    expect(portal.tagName).toBe("DIV");
    expect(portal.getAttribute("data-scope")).toBe("");
  });
});

describe("AlertDialogBackdrop", () => {
  test("オーバーレイを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogTitle>見出し</AlertDialogTitle>);

    // 検証
    const backdrop = screen.getByClassName("sui_alert_dialog_backdrop").element();
    expect(backdrop.tagName).toBe("DIV");
  });
});

describe("AlertDialogViewport", () => {
  test("配置コンテナーを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogTitle>見出し</AlertDialogTitle>);

    // 検証
    const viewport = screen.getByClassName("sui_alert_dialog_viewport").element();
    expect(viewport.tagName).toBe("DIV");
    expect(viewport.getAttribute("role")).toBe("presentation");
  });
});

describe("AlertDialogHeader", () => {
  test("ヘッダーを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <AlertDialogHeader>
        <span>内容</span>
      </AlertDialogHeader>,
    );

    // 検証
    const header = screen.getByClassName("sui_alert_dialog_header").element();
    expect(header.tagName).toBe("DIV");
    expect(header.textContent).toBe("内容");
  });
});

describe("AlertDialogTitle", () => {
  test("見出しとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogTitle>見出し</AlertDialogTitle>);

    // 検証
    const title = screen.getByRole("heading", { name: "見出し" }).element();
    expect(title.tagName).toBe("H2");
    expect(title.classList.contains("sui_alert_dialog_title")).toBe(true);
  });

  test("ポップアップのラベルに関連付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogTitle>見出し</AlertDialogTitle>);

    // 検証
    const content = screen.getByRole("alertdialog").element();
    const title = screen.getByRole("heading", { name: "見出し" }).element();
    expect(content.getAttribute("aria-labelledby")).toBe(title.id);
  });
});

describe("AlertDialogDescription", () => {
  test("説明文として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogDescription>説明</AlertDialogDescription>);

    // 検証
    const description = screen.getByText("説明").element();
    expect(description.tagName).toBe("P");
    expect(description.classList.contains("sui_alert_dialog_description")).toBe(true);
  });

  test("ポップアップの説明に関連付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogDescription>説明</AlertDialogDescription>);

    // 検証
    const content = screen.getByRole("alertdialog").element();
    const description = screen.getByText("説明").element();
    expect(content.getAttribute("aria-describedby")).toBe(description.id);
  });
});

describe("AlertDialogBody", () => {
  test("本文を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogBody title="説明">本文</AlertDialogBody>);

    // 検証
    const body = screen.getByClassName("sui_alert_dialog_body").element();
    expect(body.tagName).toBe("DIV");
    expect(body.textContent).toBe("本文");
    expect(body.getAttribute("title")).toBe("説明");
  });
});

describe("AlertDialogFooter", () => {
  test("フッターを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <AlertDialogFooter>
        <span>操作</span>
      </AlertDialogFooter>,
    );

    // 検証
    const footer = screen.getByClassName("sui_alert_dialog_footer").element();
    expect(footer.tagName).toBe("DIV");
    expect(footer.textContent).toBe("操作");
  });
});

describe("AlertDialogControls", () => {
  test("既定では相対配置にする", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogControls>操作</AlertDialogControls>);

    // 検証
    const controls = screen.getByClassName("sui_alert_dialog_controls").element();
    expect(controls.classList.contains("sui_alert_dialog_controls-relative")).toBe(true);
    expect(controls.classList.contains("sui_alert_dialog_controls-absolute")).toBe(false);
  });

  test("指定すると絶対配置にする", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogControls absolute>操作</AlertDialogControls>);

    // 検証
    const controls = screen.getByClassName("sui_alert_dialog_controls").element();
    expect(controls.classList.contains("sui_alert_dialog_controls-absolute")).toBe(true);
  });
});

describe("AlertDialogToggleTrigger", () => {
  test("描画関数の要素にクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialogRoot>
        <AlertDialogToggleTrigger>
          {(props) => (
            <button type="button" {...props}>
              削除
            </button>
          )}
        </AlertDialogToggleTrigger>
      </AlertDialogRoot>,
    );

    // 検証
    const trigger = screen.getByRole("button", { name: "削除" }).element();
    expect(trigger.classList.contains("sui_alert_dialog_trigger")).toBe(true);
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
  });
});

describe("AlertDialogCloseTrigger", () => {
  test("描画関数の要素にクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <AlertDialogCloseTrigger>
        {(props) => (
          <button type="button" {...props}>
            閉じる
          </button>
        )}
      </AlertDialogCloseTrigger>,
    );

    // 検証
    const close = screen.getByRole("button", { name: "閉じる" }).element();
    expect(close.classList.contains("sui_alert_dialog_close")).toBe(true);
  });

  test("押すとアラートダイアログを閉じる", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <AlertDialogCloseTrigger>
        {(props) => (
          <button type="button" {...props}>
            閉じる
          </button>
        )}
      </AlertDialogCloseTrigger>,
    );
    await screen.getByRole("button", { name: "閉じる" }).click();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("alertdialog").query()).toBe(null);
    });
  });
});
