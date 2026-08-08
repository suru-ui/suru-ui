import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { AlertDialog } from "../../src/overlays/alert-dialog/index.js";
import * as AlertDialogParts from "../../src/overlays/alert-dialog/index.js";
import { clickElement } from "../_click.js";

describe("AlertDialog", () => {
  test("トリガーをクリックするとダイアログが開く", async () => {
    // 準備

    // 実行
    const screen = await render(
      <AlertDialog
        trigger={(props) => (
          <button type="button" {...props}>
            下書きを破棄
          </button>
        )}
        title="下書きを破棄しますか?"
        description="この操作は元に戻せません。"
        reject={(props) => (
          <button type="button" {...props}>
            キャンセル
          </button>
        )}
        accept={(props) => (
          <button type="button" {...props}>
            破棄する
          </button>
        )}
      />,
    );
    const trigger = screen.getByRole("button", { name: "下書きを破棄" });

    await expect.element(trigger).toHaveClass("sui_alert_dialog_trigger");
    await expect.element(screen.getByRole("alertdialog")).not.toBeInTheDocument();

    // 実行
    clickElement(trigger);

    // 検証
    const dialog = screen.getByRole("alertdialog");

    await expect.element(dialog).toHaveClass("sui_alert_dialog_popup");
    await expect.element(screen.getByText("下書きを破棄しますか?")).toBeInTheDocument();
    await expect.element(screen.getByText("この操作は元に戻せません。")).toBeInTheDocument();
    await expect.element(screen.getByRole("button", { name: "キャンセル" })).toBeInTheDocument();
    await expect.element(screen.getByRole("button", { name: "破棄する" })).toBeInTheDocument();
  });

  test("拒否と承諾のボタンでダイアログが閉じる", async () => {
    // 実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="確認"
        reject={(props) => (
          <button type="button" {...props}>
            キャンセル
          </button>
        )}
        accept={(props) => (
          <button type="button" {...props}>
            破棄する
          </button>
        )}
      />,
    );
    const dialog = screen.getByRole("alertdialog");
    const reject = screen.getByRole("button", { name: "キャンセル" });
    const accept = screen.getByRole("button", { name: "破棄する" });

    await expect.element(reject).toHaveClass("sui_alert_dialog_close");
    await expect.element(accept).toHaveClass("sui_alert_dialog_close");

    // 実行
    clickElement(reject);

    // 検証
    await expect.element(dialog).not.toBeInTheDocument();
  });

  test("onReject と onAccept が呼ばれる", async () => {
    // 準備
    const results: string[] = [];

    // 実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="確認"
        reject={(props) => (
          <button type="button" {...props}>
            キャンセル
          </button>
        )}
        accept={(props) => (
          <button type="button" {...props}>
            破棄する
          </button>
        )}
        onReject={() => {
          results.push("reject");
        }}
        onAccept={() => {
          results.push("accept");
        }}
      />,
    );

    // 実行
    clickElement(screen.getByRole("button", { name: "キャンセル" }));

    // 検証
    expect(results).toStrictEqual(["reject"]);
  });

  test("onAccept が呼ばれる", async () => {
    // 準備
    const results: string[] = [];

    // 実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="確認"
        reject={(props) => (
          <button type="button" {...props}>
            キャンセル
          </button>
        )}
        accept={(props) => (
          <button type="button" {...props}>
            破棄する
          </button>
        )}
        onAccept={() => {
          results.push("accept");
        }}
      />,
    );

    // 実行
    clickElement(screen.getByRole("button", { name: "破棄する" }));

    // 検証
    expect(results).toStrictEqual(["accept"]);
  });

  test("右上の閉じるボタンで onReject が呼ばれてダイアログが閉じる", async () => {
    // 準備
    const results: string[] = [];

    // 実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="確認"
        reject={(props) => (
          <button type="button" {...props}>
            キャンセル
          </button>
        )}
        onReject={() => {
          results.push("reject");
        }}
      />,
    );
    const dialog = screen.getByRole("alertdialog");
    const closeButton = screen.getByRole("button", { name: "閉じる" });

    // 検証
    await expect.element(closeButton).toHaveClass("sui_alert_dialog_close_button");
    await expect.element(closeButton).toHaveAttribute("aria-label", "閉じる");

    // 実行
    clickElement(closeButton);

    // 検証
    await expect.element(dialog).not.toBeInTheDocument();
    expect(results).toStrictEqual(["reject"]);
  });

  test("拒否と承諾のボタンは横並びで右寄せになる", async () => {
    // 実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="確認"
        reject={(props) => (
          <button type="button" {...props}>
            キャンセル
          </button>
        )}
        accept={(props) => (
          <button type="button" {...props}>
            削除する
          </button>
        )}
      />,
    );
    const actions = screen
      .getByRole("button", { name: "キャンセル" })
      .element()
      .closest(".sui_alert_dialog_actions");
    const style = actions !== null ? getComputedStyle(actions) : null;

    // 検証
    expect(actions).not.toBeNull();
    expect(style?.display).toBe("flex");
    expect(style?.flexDirection).toBe("row");
    expect(style?.justifyContent).toBe("flex-end");
  });

  test("slotProps の onClick が preventDefault したら onReject は呼ばれない", async () => {
    // 準備
    const results: string[] = [];

    // 実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="確認"
        reject={(props) => (
          <button type="button" {...props}>
            キャンセル
          </button>
        )}
        accept={(props) => (
          <button type="button" {...props}>
            破棄する
          </button>
        )}
        slotProps={{
          reject: {
            onClick: (event) => {
              event.preventDefault();
              results.push("prevented");
            },
          },
        }}
        onReject={() => {
          results.push("reject");
        }}
      />,
    );

    // 実行
    clickElement(screen.getByRole("button", { name: "キャンセル" }));

    // 検証
    expect(results).toStrictEqual(["prevented"]);
  });

  test("slotProps の onClick が preventDefault したら onAccept は呼ばれない", async () => {
    // 準備
    const results: string[] = [];

    // 実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="確認"
        reject={(props) => (
          <button type="button" {...props}>
            キャンセル
          </button>
        )}
        accept={(props) => (
          <button type="button" {...props}>
            破棄する
          </button>
        )}
        slotProps={{
          accept: {
            onClick: (event) => {
              event.preventDefault();
              results.push("prevented");
            },
          },
        }}
        onAccept={() => {
          results.push("accept");
        }}
      />,
    );

    // 実行
    clickElement(screen.getByRole("button", { name: "破棄する" }));

    // 検証
    expect(results).toStrictEqual(["prevented"]);
  });

  test("slotProps の onClick の後に onReject が呼ばれる", async () => {
    // 準備
    const results: string[] = [];

    // 実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="確認"
        reject={(props) => (
          <button type="button" {...props}>
            キャンセル
          </button>
        )}
        slotProps={{
          reject: {
            onClick: () => {
              results.push("slot");
            },
          },
        }}
        onReject={(event) => {
          results.push(`reject:${event.type}`);
        }}
      />,
    );

    // 実行
    clickElement(screen.getByRole("button", { name: "キャンセル" }));

    // 検証
    expect(results).toStrictEqual(["slot", "reject:click"]);
  });

  test("Esc キーでダイアログが閉じる", async () => {
    // 実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="確認"
        reject={(props) => (
          <button type="button" {...props}>
            閉じる
          </button>
        )}
      />,
    );
    const dialog = screen.getByRole("alertdialog");

    // 実行
    await userEvent.keyboard("{Escape}");

    // 検証
    await expect.element(dialog).not.toBeInTheDocument();
  });

  test("バックドロップをクリックしてもダイアログは閉じない", async () => {
    // 実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="確認"
        reject={(props) => (
          <button type="button" {...props}>
            閉じる
          </button>
        )}
      />,
    );
    const dialog = screen.getByRole("alertdialog");
    const backdrop = dialog
      .element()
      .ownerDocument.querySelector<HTMLElement>(".sui_alert_dialog_backdrop");

    expect(backdrop).not.toBeNull();

    // 実行
    await userEvent.click(backdrop as HTMLElement, { position: { x: 4, y: 4 } });

    // 検証
    await expect.element(dialog).toBeInTheDocument();
  });

  test("トリガーを省略すると直接開けない", async () => {
    // 実行
    const screen = await render(
      <AlertDialog
        title="確認"
        reject={(props) => (
          <button type="button" {...props}>
            閉じる
          </button>
        )}
      />,
    );

    // 検証
    await expect.element(screen.getByRole("alertdialog")).not.toBeInTheDocument();
  });

  test("onOpenChange が開閉を通知する", async () => {
    // 準備
    const changes: boolean[] = [];

    // 実行
    const screen = await render(
      <AlertDialog
        trigger={(props) => (
          <button type="button" {...props}>
            開く
          </button>
        )}
        title="確認"
        reject={(props) => (
          <button type="button" {...props}>
            キャンセル
          </button>
        )}
        onOpenChange={(open) => {
          changes.push(open);
        }}
      />,
    );
    const trigger = screen.getByRole("button", { name: "開く" });
    clickElement(trigger);
    const dialog = screen.getByRole("alertdialog");

    await expect.element(dialog).toBeInTheDocument();
    clickElement(screen.getByRole("button", { name: "キャンセル" }));
    await expect.element(dialog).not.toBeInTheDocument();

    // 検証
    expect(changes).toStrictEqual([true, false]);
  });

  test("slotProps で各パーツにプロパティーを適用できる", async () => {
    // 実行
    const screen = await render(
      <AlertDialog
        trigger={(props) => (
          <button type="button" {...props}>
            開く
          </button>
        )}
        title="確認"
        description="説明"
        reject={(props) => (
          <button type="button" {...props}>
            閉じる
          </button>
        )}
        accept={(props) => (
          <button type="button" {...props}>
            削除する
          </button>
        )}
        slotProps={{
          trigger: { className: "custom-trigger" },
          popup: { className: "custom-popup" },
          title: { className: "custom-title" },
          description: { className: "custom-description" },
          reject: { className: "custom-reject" },
          accept: { className: "custom-accept" },
          backdrop: { className: "custom-backdrop" },
        }}
      />,
    );
    clickElement(screen.getByRole("button", { name: "開く" }));

    // 検証
    const dialog = screen.getByRole("alertdialog");

    await expect.element(dialog).toHaveClass("custom-popup");
    await expect.element(screen.getByText("確認")).toHaveClass("custom-title");
    await expect.element(screen.getByText("確認")).toHaveClass("sui_alert_dialog_title");
    await expect.element(screen.getByText("閉じる")).toHaveClass("custom-reject");
    await expect.element(screen.getByText("削除する")).toHaveClass("custom-accept");
    const backdrop = dialog
      .element()
      .ownerDocument.querySelector<HTMLElement>(".sui_alert_dialog_backdrop");

    expect(backdrop).not.toBeNull();
    await expect.element(backdrop as HTMLElement).toHaveClass("custom-backdrop");
  });

  test("disabled な Close はクリックしても閉じない", async () => {
    // 実行
    const screen = await render(
      <AlertDialog
        defaultOpen
        title="確認"
        reject={(props) => (
          <button type="button" {...props}>
            キャンセル
          </button>
        )}
        slotProps={{ reject: { disabled: true } }}
      />,
    );
    const dialog = screen.getByRole("alertdialog");
    const close = screen.getByRole("button", { name: "キャンセル" });

    // 検証
    await expect.element(close).toBeDisabled();
    await expect.element(close).toHaveAttribute("data-disabled", "");

    // 実行
    clickElement(close);

    // 検証
    await expect.element(dialog).toBeInTheDocument();
  });
});

describe("AlertDialogParts.Root", () => {
  test("複数のトリガーで同じダイアログを開ける", async () => {
    // 準備
    const handle = AlertDialogParts.createHandle();

    // 実行
    const screen = await render(
      <AlertDialogParts.Root handle={handle}>
        <AlertDialogParts.Trigger handle={handle}>
          {(props) => (
            <button type="button" {...props}>
              トリガー 1
            </button>
          )}
        </AlertDialogParts.Trigger>
        <AlertDialogParts.Trigger handle={handle}>
          {(props) => (
            <button type="button" {...props}>
              トリガー 2
            </button>
          )}
        </AlertDialogParts.Trigger>
        <AlertDialogParts.Portal>
          <AlertDialogParts.Popup>
            <AlertDialogParts.Title>確認</AlertDialogParts.Title>
          </AlertDialogParts.Popup>
        </AlertDialogParts.Portal>
      </AlertDialogParts.Root>,
    );
    const title = screen.getByText("確認");

    // 実行
    clickElement(screen.getByRole("button", { name: "トリガー 1" }));

    // 検証
    await expect.element(title).toBeVisible();

    // 実行
    await userEvent.keyboard("{Escape}");

    // 検証
    await expect.element(title).not.toBeInTheDocument();

    // 実行
    clickElement(screen.getByRole("button", { name: "トリガー 2" }));

    // 検証
    await expect.element(title).toBeVisible();
  });

  test("タイトルが見出しとしてラベル付けされる", async () => {
    // 実行
    const handle = AlertDialogParts.createHandle();
    const screen = await render(
      <AlertDialogParts.Root handle={handle}>
        <AlertDialogParts.Trigger handle={handle}>
          {(props) => (
            <button type="button" {...props}>
              開く
            </button>
          )}
        </AlertDialogParts.Trigger>
        <AlertDialogParts.Portal>
          <AlertDialogParts.Popup>
            <AlertDialogParts.Title>確認</AlertDialogParts.Title>
          </AlertDialogParts.Popup>
        </AlertDialogParts.Portal>
      </AlertDialogParts.Root>,
    );
    clickElement(screen.getByRole("button", { name: "開く" }));

    // 検証
    const dialog = screen.getByRole("alertdialog");
    const heading = screen.getByRole("heading", { level: 2, name: "確認" });

    await expect.element(heading).toHaveClass("sui_alert_dialog_title");
    await expect.element(dialog).not.toBeNull();
  });

  test("開いた状態を制御できる", async () => {
    // 準備
    const changes: boolean[] = [];
    const handle = AlertDialogParts.createHandle();

    // 実行
    const screen = await render(
      <AlertDialogParts.Root
        handle={handle}
        onOpenChange={(open) => {
          changes.push(open);
        }}
      >
        <AlertDialogParts.Trigger handle={handle}>
          {(props) => (
            <button type="button" {...props}>
              開く
            </button>
          )}
        </AlertDialogParts.Trigger>
        <AlertDialogParts.Portal>
          <AlertDialogParts.Popup>
            <AlertDialogParts.Title>確認</AlertDialogParts.Title>
            <AlertDialogParts.Close>
              {(props) => (
                <button type="button" {...props}>
                  閉じる
                </button>
              )}
            </AlertDialogParts.Close>
          </AlertDialogParts.Popup>
        </AlertDialogParts.Portal>
      </AlertDialogParts.Root>,
    );
    const dialog = screen.getByRole("alertdialog");

    // 検証
    await expect.element(dialog).not.toBeInTheDocument();

    // 実行
    clickElement(screen.getByRole("button", { name: "開く" }));

    // 検証
    await expect.element(dialog).toBeInTheDocument();

    // 実行
    clickElement(screen.getByRole("button", { name: "閉じる" }));
    await expect.element(dialog).not.toBeInTheDocument();

    // 検証
    expect(changes).toStrictEqual([true, false]);
  });
});
