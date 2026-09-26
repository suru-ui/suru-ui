import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { AlertDialogIcon } from "../../../src/alert-dialog/alert-dialog.icon.jsx";
import "../_locators.js";

describe("AlertDialogIcon", () => {
  test("既定の修飾で描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertDialogIcon />);

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
    const screen = await render(
      <AlertDialogIcon color="blue" muted outlined radius="full" size="lg" variant="solid" />,
    );

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
    const screen = await render(<AlertDialogIcon size="sm" />);

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
    const screen = await render(<AlertDialogIcon />);

    // 検証
    expect(
      screen.getByClassName("sui_alert_dialog_icon").element().getAttribute("aria-hidden"),
    ).toBe("true");
  });

  test("指定すると読み上げ対象にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertDialogIcon aria-hidden={false} />);

    // 検証
    expect(
      screen.getByClassName("sui_alert_dialog_icon").element().getAttribute("aria-hidden"),
    ).toBe("false");
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialogIcon>
        <svg viewBox="0 0 16 16" />
      </AlertDialogIcon>,
    );

    // 検証
    expect(screen.getByClassName("sui_alert_dialog_icon").element().querySelector("svg")).not.toBe(
      null,
    );
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertDialogIcon className="custom" />);

    // 検証
    const icon = screen.getByClassName("sui_alert_dialog_icon").element();
    expect(icon.classList.contains("custom")).toBe(true);
    expect(icon.classList.contains("sui_alert_dialog_icon")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertDialogIcon render={<span />} />);

    // 検証
    expect(screen.getByClassName("sui_alert_dialog_icon").element().tagName).toBe("SPAN");
  });
});
