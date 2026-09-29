import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { useDialogPopupContext } from "../../../src/dialog/dialog.popup.context.js";
import { type DialogPopupProps, DialogPopup } from "../../../src/dialog/dialog.popup.jsx";
import { DialogPortal } from "../../../src/dialog/dialog.portal.jsx";
import { DialogRoot } from "../../../src/dialog/dialog.root.jsx";
import { DialogViewport } from "../../../src/dialog/dialog.viewport.jsx";
import "../../../src/dialog/dialog.parts.js";
import "../_locators.js";

/**
 * ダイアログのルートツリーの中でポップアップを描画します。
 * ポップアップは Base UI のルートコンテキストを必要とするため、単体では描画できません。
 */
function renderPopup(children: React.ReactNode, props?: DialogPopupProps) {
  return render(
    <DialogRoot defaultOpen>
      <DialogPortal>
        <DialogViewport>
          <DialogPopup {...props}>{children}</DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </DialogRoot>,
  );
}

describe("DialogPopup", () => {
  test("既定の修飾で描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopup("内容");

    // 検証
    const popup = screen.getByClassName("sui_dialog_popup").element();
    expect(popup.tagName).toBe("DIV");
    expect(popup.classList.contains("sui_dialog_popup-radius_md")).toBe(true);
    expect(popup.classList.contains("sui_dialog_popup-variant_default")).toBe(true);
    expect(popup.classList.contains("sui_dialog_popup-outlined")).toBe(false);
  });

  test("指定した角丸と外観と枠線をクラスにする", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopup("内容", {
      radius: "lg",
      variant: "stacked",
      outlined: true,
    });

    // 検証
    const popup = screen.getByClassName("sui_dialog_popup").element();
    expect(popup.classList.contains("sui_dialog_popup-radius_lg")).toBe(true);
    expect(popup.classList.contains("sui_dialog_popup-variant_stacked")).toBe(true);
    expect(popup.classList.contains("sui_dialog_popup-outlined")).toBe(true);
  });

  test("子パーツへ角丸を伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useDialogPopupContext();

      return <span>{ctx.radius}</span>;
    }

    // 実行
    const screen = await renderPopup(<Probe />, { radius: "sm" });

    // 検証
    expect(screen.getByText("sm").query()?.textContent).toBe("sm");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopup("内容", { className: "custom" });

    // 検証
    const popup = screen.getByClassName("sui_dialog_popup").element();
    expect(popup.classList.contains("custom")).toBe(true);
    expect(popup.classList.contains("sui_dialog_popup")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopup("内容", { render: <section /> });

    // 検証
    expect(screen.getByClassName("sui_dialog_popup").element().tagName).toBe("SECTION");
  });
});
