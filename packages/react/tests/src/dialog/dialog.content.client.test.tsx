import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { useDialogContentContext } from "../../../src/dialog/dialog.content.context.js";
import { type DialogContentProps, DialogContent } from "../../../src/dialog/dialog.content.jsx";
import { DialogPortal } from "../../../src/dialog/dialog.portal.jsx";
import { DialogRoot } from "../../../src/dialog/dialog.root.jsx";
import { DialogViewport } from "../../../src/dialog/dialog.viewport.jsx";
import "../../../src/dialog/dialog.parts.js";
import "../_locators.js";

/**
 * ダイアログのルートツリーの中でコンテンツを描画します。
 * コンテンツは Base UI のルートコンテキストを必要とするため、単体では描画できません。
 */
function renderContent(children: React.ReactNode, props?: DialogContentProps) {
  return render(
    <DialogRoot defaultOpen>
      <DialogPortal>
        <DialogViewport>
          <DialogContent {...props}>{children}</DialogContent>
        </DialogViewport>
      </DialogPortal>
    </DialogRoot>,
  );
}

describe("DialogContent", () => {
  test("既定の修飾で描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderContent("内容");

    // 検証
    const content = screen.getByClassName("sui_dialog_content").element();
    expect(content.tagName).toBe("DIV");
    expect(content.classList.contains("sui_dialog_content-radius_md")).toBe(true);
    expect(content.classList.contains("sui_dialog_content-variant_default")).toBe(true);
    expect(content.classList.contains("sui_dialog_content-outlined")).toBe(false);
  });

  test("指定した角丸と外観と枠線をクラスにする", async ({ expect }) => {
    // 準備と実行
    const screen = await renderContent("内容", {
      radius: "lg",
      variant: "stacked",
      outlined: true,
    });

    // 検証
    const content = screen.getByClassName("sui_dialog_content").element();
    expect(content.classList.contains("sui_dialog_content-radius_lg")).toBe(true);
    expect(content.classList.contains("sui_dialog_content-variant_stacked")).toBe(true);
    expect(content.classList.contains("sui_dialog_content-outlined")).toBe(true);
  });

  test("子パーツへ角丸を伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useDialogContentContext();

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
    const content = screen.getByClassName("sui_dialog_content").element();
    expect(content.classList.contains("custom")).toBe(true);
    expect(content.classList.contains("sui_dialog_content")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderContent("内容", { render: <section /> });

    // 検証
    expect(screen.getByClassName("sui_dialog_content").element().tagName).toBe("SECTION");
  });
});
