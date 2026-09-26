import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { AlertDialog, type AlertDialogProps } from "../../../src/alert-dialog/alert-dialog.jsx";
import "../_locators.js";

const cancelButton = <button type="button">キャンセル</button>;

const confirmButton = <button type="button">削除する</button>;

const triggerButton = <button type="button">削除</button>;

describe("AlertDialog", () => {
  test("既定では閉じている", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertDialog title="見出し" trigger={triggerButton} />);

    // 検証
    expect(screen.getByRole("alertdialog").query()).toBe(null);
  });

  test("トリガーを押すと開く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialog
        description="この操作は取り消せません。"
        title="プロジェクトを削除しますか？"
        trigger={triggerButton}
      />,
    );
    await screen.getByRole("button", { name: "削除" }).click();

    // 検証
    expect(
      screen.getByRole("alertdialog", { name: "プロジェクトを削除しますか？" }).query(),
    ).not.toBe(null);
  });

  test("見出しと説明を関連付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        description="この操作は取り消せません。"
        title="プロジェクトを削除しますか？"
      />,
    );

    // 検証
    const dialog = screen
      .getByRole("alertdialog", { name: "プロジェクトを削除しますか？" })
      .element();
    expect(dialog.getAttribute("aria-describedby")).toBeDefined();
  });

  test("中止ボタンで閉じてコールバックを呼ぶ", async ({ expect }) => {
    // 準備
    const onCancel = vi.fn<React.MouseEventHandler<HTMLButtonElement>>();
    const screen = await render(
      <AlertDialog defaultOpen title="見出し" cancel={cancelButton} onCancel={onCancel} />,
    );

    // 実行
    await screen.getByRole("button", { name: "キャンセル" }).click();

    // 検証
    expect(onCancel).toHaveBeenCalledTimes(1);
    await vi.waitFor(() => {
      expect(screen.getByRole("alertdialog").query()).toBe(null);
    });
  });

  test("確認ボタンで閉じてコールバックを呼ぶ", async ({ expect }) => {
    // 準備
    const onConfirm = vi.fn<React.MouseEventHandler<HTMLButtonElement>>();
    const screen = await render(
      <AlertDialog defaultOpen title="見出し" confirm={confirmButton} onConfirm={onConfirm} />,
    );

    // 実行
    await screen.getByRole("button", { name: "削除する" }).click();

    // 検証
    expect(onConfirm).toHaveBeenCalledTimes(1);
    await vi.waitFor(() => {
      expect(screen.getByRole("alertdialog").query()).toBe(null);
    });
  });

  test("既定を防ぐとコールバックを呼ばない", async ({ expect }) => {
    // 準備
    const onCancel = vi.fn<React.MouseEventHandler<HTMLButtonElement>>();
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="見出し"
        cancel={cancelButton}
        onCancel={onCancel}
        slotProps={{ cancelTrigger: { onClick: (evt) => evt.preventDefault() } }}
      />,
    );

    // 実行
    await screen.getByRole("button", { name: "キャンセル" }).click();

    // 検証
    expect(onCancel).not.toHaveBeenCalled();
  });

  test("描画関数の中止ボタンを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="見出し"
        cancel={(props) => (
          <button type="button" {...props}>
            キャンセル
          </button>
        )}
      />,
    );

    // 検証
    const button = screen.getByRole("button", { name: "キャンセル" }).element();
    expect(button.classList.contains("sui_alert_dialog_close")).toBe(true);
  });

  test("閉じるアイコンボタンで閉じる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertDialog defaultOpen showCancelIconButton title="見出し" />);
    await screen.getByRole("button", { name: "閉じる" }).click();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("alertdialog").query()).toBe(null);
    });
  });

  test("アイコンと本文と操作を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialog defaultOpen controls="操作" icon={<span>!</span>} title="見出し">
        本文
      </AlertDialog>,
    );

    // 検証
    expect(screen.getByClassName("sui_alert_dialog_icon").query()).not.toBe(null);
    expect(screen.getByText("本文").query()?.textContent).toBe("本文");
    expect(screen.getByText("操作").query()?.textContent).toBe("操作");
  });

  test("積み上げ式では操作をフッターの外に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        controls="操作"
        title="見出し"
        variant="stacked"
        cancel={cancelButton}
        confirm={confirmButton}
      />,
    );

    // 検証
    const controls = screen.getByClassName("sui_alert_dialog_controls").element();
    expect(controls.classList.contains("sui_alert_dialog_controls-absolute")).toBe(true);
    expect(controls.closest(".sui_alert_dialog_footer")).toBe(null);
  });

  test("slotProps で各パーツに props を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="見出し"
        slotProps={{ body: { id: "body" }, header: { id: "header" } }}
      >
        本文
      </AlertDialog>,
    );

    // 検証
    expect(screen.getByClassName("sui_alert_dialog_body").element().id).toBe("body");
    expect(screen.getByClassName("sui_alert_dialog_header").element().id).toBe("header");
  });

  test("外側を押しても閉じない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertDialog defaultOpen title="見出し" />);
    screen
      .getByClassName("sui_alert_dialog_backdrop")
      .element()
      .dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true }));

    // 検証
    expect(screen.getByRole("alertdialog").query()).not.toBe(null);
  });

  test("Escape を押しても閉じない", async ({ expect }) => {
    // 準備
    const onOpenChange = vi.fn<NonNullable<AlertDialogProps["onOpenChange"]>>();
    const screen = await render(
      <AlertDialog defaultOpen title="見出し" onOpenChange={onOpenChange} />,
    );

    // 実行
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));

    // 検証
    await vi.waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledTimes(1);
    });
    expect(onOpenChange.mock.calls[0]?.[0]).toBe(false);
    expect(onOpenChange.mock.calls[0]?.[1].reason).toBe("escape-key");
    expect(onOpenChange.mock.calls[0]?.[1].isCanceled).toBe(true);
    expect(screen.getByRole("alertdialog").query()).not.toBe(null);
  });

  test("useContentContext で角丸を読み取る", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = AlertDialog.useContentContext();

      return <span>{ctx.radius}</span>;
    }

    // 実行
    const screen = await render(
      <AlertDialog defaultOpen radius="lg" title="見出し">
        <Probe />
      </AlertDialog>,
    );

    // 検証
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});
