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
    expect(popup.classList.contains("sui_card")).toBe(true);
    expect(popup.classList.contains("sui_card-size_md")).toBe(true);
    expect(popup.classList.contains("sui_card-radius_md")).toBe(true);
    expect(popup.classList.contains("sui_dialog_popup-variant_default")).toBe(true);
    expect(popup.classList.contains("sui_card-outlined")).toBe(false);
  });

  test("指定した大きさと角丸と外観と枠線をクラスにする", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopup("内容", {
      size: "sm",
      radius: "lg",
      variant: "stacked",
      outlined: true,
    });

    // 検証
    const popup = screen.getByClassName("sui_dialog_popup").element();
    expect(popup.classList.contains("sui_card-size_sm")).toBe(true);
    expect(popup.classList.contains("sui_card-radius_lg")).toBe(true);
    expect(popup.classList.contains("sui_dialog_popup-variant_stacked")).toBe(true);
    expect(popup.classList.contains("sui_card-outlined")).toBe(true);
  });

  test("子パーツへ修飾を伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useDialogPopupContext();

      return (
        <span>
          {ctx.size}/{ctx.radius}/{ctx.variant}
        </span>
      );
    }

    // 実行
    const screen = await renderPopup(<Probe />, { size: "sm", radius: "lg", variant: "stacked" });

    // 検証
    expect(screen.getByText("sm/lg/stacked").query()?.textContent).toBe("sm/lg/stacked");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopup("内容", { className: "custom" });

    // 検証
    const popup = screen.getByClassName("sui_dialog_popup").element();
    expect(popup.classList.contains("custom")).toBe(true);
    expect(popup.classList.contains("sui_dialog_popup")).toBe(true);
    expect(popup.classList.contains("sui_card")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopup("内容", { render: <section /> });

    // 検証
    const popup = screen.getByClassName("sui_dialog_popup").element();
    expect(popup.tagName).toBe("SECTION");
    expect(popup.classList.contains("sui_card")).toBe(true);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopup("内容", {
      size: "sm",
      radius: "lg",
      variant: "stacked",
      outlined: true,
      render: (props, state) => (
        <section
          {...props}
          data-probe={`${state.size}/${state.radius}/${state.variant}/${state.outlined}/${String(state.open)}`}
        />
      ),
    });

    // 検証
    const popup = screen.getByClassName("sui_dialog_popup").element();
    expect(popup.tagName).toBe("SECTION");
    expect(popup.getAttribute("data-probe")).toBe("sm/lg/stacked/true/true");
  });

  test("className と style の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopup("内容", {
      size: "sm",
      variant: "stacked",
      className: (state) => `probe-size_${state.size}`,
      style: (state) => ({ opacity: state.variant === "stacked" ? "0.5" : "1" }),
    });

    // 検証
    const popup = screen.getByClassName("sui_dialog_popup").element();
    expect(popup.classList.contains("probe-size_sm")).toBe(true);
    expect(popup.style.opacity).toBe("0.5");
  });
});
