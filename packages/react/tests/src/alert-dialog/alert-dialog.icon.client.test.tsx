import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  type AlertDialogIconProps,
  AlertDialogIcon,
} from "../../../src/alert-dialog/icon/alert-dialog.icon.jsx";
import { AlertDialogPopupContext } from "../../../src/alert-dialog/popup/alert-dialog.popup.context.js";
import "../_locators.js";

const mockPopupContext = {
  size: "md",
  radius: "md",
  variant: "default",
  outlined: false,
  open: true,
  nested: false,
  nestedDialogOpen: false,
  transitionStatus: undefined,
} as const;

/**
 * ポップアップのコンテキスト内でアイコンを描画します。
 */
function renderIcon(props?: AlertDialogIconProps) {
  return render(
    <AlertDialogPopupContext value={mockPopupContext}>
      <AlertDialogIcon {...props} />
    </AlertDialogPopupContext>,
  );
}

describe("AlertDialogIcon", () => {
  test("既定の修飾で描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderIcon();

    // 検証
    const icon = screen.getByClassName("sui_alert_dialog_icon").element();
    expect(icon.tagName).toBe("DIV");
    expect(icon.classList.contains("sui_alert_dialog_icon-size_md")).toBe(true);
    expect(icon.classList.contains("sui_alert_dialog_icon-color_red")).toBe(true);
    expect(icon.classList.contains("sui_alert_dialog_icon-radius_md")).toBe(true);
    expect(icon.classList.contains("sui_alert_dialog_icon-variant_liquid")).toBe(true);
  });

  test("指定した修飾をクラスにする", async ({ expect }) => {
    // 準備と実行
    const screen = await renderIcon({
      color: "blue",
      muted: true,
      outlined: true,
      radius: "full",
      size: "lg",
      variant: "solid",
    });

    // 検証
    const icon = screen.getByClassName("sui_alert_dialog_icon").element();
    expect(icon.classList.contains("sui_alert_dialog_icon-size_lg")).toBe(true);
    expect(icon.classList.contains("sui_alert_dialog_icon-color_blue")).toBe(true);
    expect(icon.classList.contains("sui_alert_dialog_icon-radius_full")).toBe(true);
    expect(icon.classList.contains("sui_alert_dialog_icon-variant_solid")).toBe(true);
    expect(icon.classList.contains("sui_alert_dialog_icon-muted")).toBe(true);
    expect(icon.classList.contains("sui_alert_dialog_icon-outlined")).toBe(true);
  });

  test("角丸は大きさに追従する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderIcon({ size: "sm" });

    // 検証
    expect(
      screen
        .getByClassName("sui_alert_dialog_icon")
        .element()
        .classList.contains("sui_alert_dialog_icon-radius_sm"),
    ).toBe(true);
  });

  test("装飾として読み上げから隠す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderIcon();

    // 検証
    expect(
      screen.getByClassName("sui_alert_dialog_icon").element().getAttribute("aria-hidden"),
    ).toBe("true");
  });

  test("指定すると読み上げ対象にする", async ({ expect }) => {
    // 準備と実行
    const screen = await renderIcon({ "aria-hidden": false });

    // 検証
    expect(
      screen.getByClassName("sui_alert_dialog_icon").element().getAttribute("aria-hidden"),
    ).toBe("false");
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderIcon({ children: <svg viewBox="0 0 16 16" /> });

    // 検証
    expect(screen.getByClassName("sui_alert_dialog_icon").element().querySelector("svg")).not.toBe(
      null,
    );
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderIcon({ className: "custom" });

    // 検証
    const icon = screen.getByClassName("sui_alert_dialog_icon").element();
    expect(icon.classList.contains("custom")).toBe(true);
    expect(icon.classList.contains("sui_alert_dialog_icon")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderIcon({ render: <span /> });

    // 検証
    expect(screen.getByClassName("sui_alert_dialog_icon").element().tagName).toBe("SPAN");
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderIcon({
      color: "blue",
      muted: true,
      outlined: true,
      radius: "full",
      size: "lg",
      variant: "solid",
      render: (props, state) => (
        <div
          {...props}
          data-probe={`${state.size}/${state.color}/${state.radius}/${state.variant}/${state.muted}/${state.outlined}`}
        />
      ),
    });

    // 検証
    expect(
      screen.getByClassName("sui_alert_dialog_icon").element().getAttribute("data-probe"),
    ).toBe("lg/blue/full/solid/true/true");
  });

  test("className と style の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderIcon({
      muted: true,
      variant: "solid",
      className: (state) => `probe-variant_${state.variant}`,
      style: (state) => ({ opacity: state.muted ? "0.5" : "1" }),
    });

    // 検証
    const icon = screen.getByClassName("sui_alert_dialog_icon").element();
    expect(icon.classList.contains("probe-variant_solid")).toBe(true);
    expect(icon.style.opacity).toBe("0.5");
  });
});
