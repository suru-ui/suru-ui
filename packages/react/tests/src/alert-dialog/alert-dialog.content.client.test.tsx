import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { useAlertDialogContentContext } from "../../../src/alert-dialog/alert-dialog.content.context.js";
import {
  type AlertDialogContentProps,
  AlertDialogContent,
} from "../../../src/alert-dialog/alert-dialog.content.jsx";
import { AlertDialogPortal } from "../../../src/alert-dialog/alert-dialog.portal.jsx";
import { AlertDialogRoot } from "../../../src/alert-dialog/alert-dialog.root.jsx";
import { AlertDialogViewport } from "../../../src/alert-dialog/alert-dialog.viewport.jsx";
import "../../../src/alert-dialog/alert-dialog.parts.js";
import "../_locators.js";

/**
 * アラートダイアログのルートツリーの中でコンテンツを描画します。
 * コンテンツは Base UI のルートコンテキストを必要とするため、単体では描画できません。
 */
function renderContent(children: React.ReactNode, props?: AlertDialogContentProps) {
  return render(
    <AlertDialogRoot defaultOpen>
      <AlertDialogPortal>
        <AlertDialogViewport>
          <AlertDialogContent {...props}>{children}</AlertDialogContent>
        </AlertDialogViewport>
      </AlertDialogPortal>
    </AlertDialogRoot>,
  );
}

describe("AlertDialogContent", () => {
  test("既定の修飾で描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderContent("内容");

    // 検証
    const content = screen.getByClassName("sui_alert_dialog_content").element();
    expect(content.tagName).toBe("DIV");
    expect(content.classList.contains("sui_alert_dialog_content-radius_md")).toBe(true);
    expect(content.classList.contains("sui_alert_dialog_content-variant_default")).toBe(true);
    expect(content.classList.contains("sui_alert_dialog_content-outlined")).toBe(false);
  });

  test("指定した角丸と外観と枠線をクラスにする", async ({ expect }) => {
    // 準備と実行
    const screen = await renderContent("内容", {
      radius: "lg",
      variant: "stacked",
      outlined: true,
    });

    // 検証
    const content = screen.getByClassName("sui_alert_dialog_content").element();
    expect(content.classList.contains("sui_alert_dialog_content-radius_lg")).toBe(true);
    expect(content.classList.contains("sui_alert_dialog_content-variant_stacked")).toBe(true);
    expect(content.classList.contains("sui_alert_dialog_content-outlined")).toBe(true);
  });

  test("子パーツへ角丸を伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useAlertDialogContentContext();

      return <span>{ctx.radius}</span>;
    }

    // 実行
    const screen = await renderContent(<Probe />, { radius: "sm" });

    // 検証
    expect(screen.getByText("sm").query()?.textContent).toBe("sm");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderContent("内容", { className: "custom" });

    // 検証
    const content = screen.getByClassName("sui_alert_dialog_content").element();
    expect(content.classList.contains("custom")).toBe(true);
    expect(content.classList.contains("sui_alert_dialog_content")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderContent("内容", { render: <section /> });

    // 検証
    expect(screen.getByClassName("sui_alert_dialog_content").element().tagName).toBe("SECTION");
  });
});
