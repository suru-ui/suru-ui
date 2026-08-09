import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { Button } from "../../src/buttons/button/index.js";
import { Dialog } from "../../src/overlays/dialog/index.js";
import * as DialogParts from "../../src/overlays/dialog/index.js";
import { clickElement } from "../_click.js";

describe("Dialog", () => {
  test("トリガーをクリックするとダイアログが開く", async () => {
    // 実行
    const screen = await render(
      <Dialog
        trigger={<Button>通知を見る</Button>}
        title="通知"
        description="新しい通知はありません。"
        close={<Button variant="naked">閉じる</Button>}
      />,
    );
    const trigger = screen.getByRole("button", { name: "通知を見る" });

    // 検証
    await expect.element(trigger).toHaveClass("sui_dialog_trigger");
    await expect.element(screen.getByRole("dialog")).not.toBeInTheDocument();

    // 実行
    clickElement(trigger);

    // 検証
    const dialog = screen.getByRole("dialog");
    await expect.element(dialog).toHaveClass("sui_dialog_popup");
    await expect.element(screen.getByRole("heading", { name: "通知" })).toBeInTheDocument();
    await expect.element(screen.getByText("新しい通知はありません。")).toBeInTheDocument();
    await expect.element(screen.getByLabelText("閉じる")).toBeInTheDocument();
    await expect.element(screen.getByText("閉じる")).toBeInTheDocument();
  });

  test("右上の閉じるボタンで onClose が呼ばれて閉じる", async () => {
    // 準備
    const results: string[] = [];

    // 実行
    const screen = await render(
      <Dialog
        defaultOpen
        title="通知"
        onClose={(event) => {
          results.push(event.type);
        }}
      />,
    );
    const dialog = screen.getByRole("dialog");
    const closeButton = screen.getByLabelText("閉じる");

    // 検証
    await expect.element(closeButton).toHaveClass("sui_dialog_close_button");
    await expect.element(closeButton).toHaveAttribute("aria-label", "閉じる");

    // 実行
    clickElement(closeButton);

    // 検証
    await expect.element(dialog).not.toBeInTheDocument();
    expect(results).toStrictEqual(["click"]);
  });

  test("フッターの閉じるボタンでダイアログが閉じる", async () => {
    // 実行
    const screen = await render(
      <Dialog
        defaultOpen
        title="通知"
        close={(props) => (
          <button type="button" {...props}>
            閉じる
          </button>
        )}
      />,
    );
    const dialog = screen.getByRole("dialog");
    const close = screen.getByText("閉じる");

    // 実行
    clickElement(close);

    // 検証
    await expect.element(dialog).not.toBeInTheDocument();
  });

  test("slotProps で各パーツにプロパティーを適用できる", async () => {
    // 実行
    const screen = await render(
      <Dialog
        trigger={<Button>開く</Button>}
        title="通知"
        description="説明"
        slotProps={{
          trigger: { className: "custom-trigger" },
          popup: { className: "custom-popup" },
          title: { className: "custom-title" },
          description: { className: "custom-description" },
          backdrop: { className: "custom-backdrop" },
        }}
      />,
    );
    clickElement(screen.getByRole("button", { name: "開く" }));

    // 検証
    await expect.element(screen.getByRole("dialog")).toHaveClass("custom-popup");
    await expect.element(screen.getByRole("heading", { name: "通知" })).toHaveClass("custom-title");
    await expect.element(screen.getByText("説明")).toHaveClass("custom-description");
    const backdrop = screen
      .getByRole("dialog")
      .element()
      .ownerDocument.querySelector<HTMLElement>(".sui_dialog_backdrop");

    expect(backdrop).not.toBeNull();
    await expect.element(backdrop as HTMLElement).toHaveClass("custom-backdrop");
  });

  test("Esc キーでダイアログが閉じる", async () => {
    // 実行
    const screen = await render(<Dialog defaultOpen title="通知" />);
    const dialog = screen.getByRole("dialog");

    await userEvent.keyboard("{Escape}");

    // 検証
    await expect.element(dialog).not.toBeInTheDocument();
  });
});

describe("DialogParts", () => {
  test("Base UI のパーツを組み合わせて開閉できる", async () => {
    // 実行
    const handle = DialogParts.createHandle();
    const screen = await render(
      <DialogParts.Root handle={handle}>
        <DialogParts.Trigger handle={handle}>
          {(props) => (
            <button type="button" {...props}>
              開く
            </button>
          )}
        </DialogParts.Trigger>
        <DialogParts.Portal>
          <DialogParts.Backdrop />
          <DialogParts.Viewport>
            <DialogParts.Popup>
              <DialogParts.Title>確認</DialogParts.Title>
              <DialogParts.Description>説明</DialogParts.Description>
              <DialogParts.Close>
                {(props) => (
                  <button type="button" {...props}>
                    閉じる
                  </button>
                )}
              </DialogParts.Close>
            </DialogParts.Popup>
          </DialogParts.Viewport>
        </DialogParts.Portal>
      </DialogParts.Root>,
    );
    const trigger = screen.getByRole("button", { name: "開く" });

    // 検証
    await expect.element(trigger).toHaveClass("sui_dialog_trigger");

    // 実行
    clickElement(trigger);

    // 検証
    const dialog = screen.getByRole("dialog");
    await expect.element(dialog).toHaveClass("sui_dialog_popup");
    await expect
      .element(screen.getByRole("heading", { name: "確認" }))
      .toHaveClass("sui_dialog_title");
    await expect
      .element(screen.getByRole("button", { name: "閉じる" }))
      .toHaveClass("sui_dialog_close");

    // 実行
    clickElement(screen.getByRole("button", { name: "閉じる" }));

    // 検証
    await expect.element(dialog).not.toBeInTheDocument();
  });

  test("ハンドルを共有したトリガーから開ける", async () => {
    // 準備
    const handle = DialogParts.createHandle();

    // 実行
    const screen = await render(
      <>
        <DialogParts.Trigger handle={handle}>
          {(props) => (
            <button type="button" {...props}>
              開く
            </button>
          )}
        </DialogParts.Trigger>
        <DialogParts.Root handle={handle}>
          <DialogParts.Portal>
            <DialogParts.Popup>
              <DialogParts.Title>通知</DialogParts.Title>
            </DialogParts.Popup>
          </DialogParts.Portal>
        </DialogParts.Root>
      </>,
    );

    // 実行
    clickElement(screen.getByRole("button", { name: "開く" }));

    // 検証
    await expect.element(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
