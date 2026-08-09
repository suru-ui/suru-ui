import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import "@suru-ui/theme/suru.css";
import { Toast, useToastManager } from "../../src/overlays/toast/index.js";
import * as ToastParts from "../../src/overlays/toast/index.js";
import { clickElement } from "../_click.js";

function CreateToastButton() {
  const toastManager = useToastManager();

  return (
    <button
      type="button"
      onClick={() =>
        toastManager.add({
          title: "保存しました",
          description: "変更内容を保存しました。",
        })
      }
    >
      保存
    </button>
  );
}

function CreateActionToastButton() {
  const toastManager = useToastManager();

  return (
    <button
      type="button"
      onClick={() =>
        toastManager.add({
          title: "削除しました",
          actionProps: { children: "元に戻す" },
        })
      }
    >
      削除
    </button>
  );
}

describe("Toast", () => {
  test("通知を追加するとタイトルと説明を表示する", async () => {
    // 準備と実行
    const screen = await render(
      <Toast timeout={0}>
        <CreateToastButton />
      </Toast>,
    );
    clickElement(screen.getByRole("button", { name: "保存" }));

    // 検証
    const title = screen.getByRole("heading", { name: "保存しました" });
    await expect.element(title).toHaveClass("sui_toast_title");
    await expect
      .element(screen.getByText("変更内容を保存しました。"))
      .toHaveClass("sui_toast_description");
    await expect.element(screen.getByText("閉じる")).toHaveClass("sui_toast_close");
    const viewport = title.element().closest(".sui_toast_viewport");
    expect(viewport).not.toBeNull();
  });

  test("閉じるボタンで通知を削除する", async () => {
    // 準備と実行
    const screen = await render(
      <Toast timeout={0}>
        <CreateToastButton />
      </Toast>,
    );
    clickElement(screen.getByRole("button", { name: "保存" }));
    const toast = screen.getByRole("heading", { name: "保存しました" });
    await expect.element(toast).toBeInTheDocument();

    // 実行
    clickElement(screen.getByText("閉じる"));

    // 検証
    await expect.element(toast).not.toBeInTheDocument();
  });

  test("通知の actionProps からアクションボタンを表示する", async () => {
    // 準備と実行
    const screen = await render(
      <Toast timeout={0}>
        <CreateActionToastButton />
      </Toast>,
    );
    clickElement(screen.getByRole("button", { name: "削除" }));

    // 検証
    const action = screen.getByRole("button", { name: "元に戻す" });
    await expect.element(action).toHaveClass("sui_toast_action");
  });

  test("slotProps で通知一覧の各パーツにクラスを追加できる", async () => {
    // 準備と実行
    const screen = await render(
      <Toast
        timeout={0}
        slotProps={{
          portal: { className: "custom-portal" },
          viewport: { className: "custom-viewport" },
          root: { className: "custom-root" },
          content: { className: "custom-content" },
          title: { className: "custom-title" },
          description: { className: "custom-description" },
          action: { className: "custom-action" },
          close: { className: "custom-close" },
        }}
      >
        <CreateToastButton />
      </Toast>,
    );
    clickElement(screen.getByRole("button", { name: "保存" }));

    // 検証
    await expect
      .element(screen.getByRole("heading", { name: "保存しました" }))
      .toHaveClass("custom-title");
    await expect
      .element(screen.getByText("変更内容を保存しました。"))
      .toHaveClass("custom-description");
    await expect.element(screen.getByText("閉じる")).toHaveClass("custom-close");
    const toast = screen
      .getByRole("heading", { name: "保存しました" })
      .element()
      .closest(".sui_toast");
    expect(toast).not.toBeNull();
    await expect.element(toast as HTMLElement).toHaveClass("custom-root");
    await expect
      .element(toast?.querySelector(".sui_toast_content") as HTMLElement)
      .toHaveClass("custom-content");
    const viewport = toast?.closest(".sui_toast_viewport");
    expect(viewport).not.toBeNull();
    await expect.element(viewport as HTMLElement).toHaveClass("custom-viewport");
    const portal = viewport?.parentElement;
    expect(portal).not.toBeNull();
    await expect.element(portal as HTMLElement).toHaveClass("custom-portal");
  });
});

describe("ToastParts", () => {
  test("Provider とパーツを組み合わせて通知を表示できる", async () => {
    // 準備と実行
    function PartsExample() {
      const { add, toasts } = ToastParts.useToastManager();

      return (
        <>
          <button
            type="button"
            onClick={() => add({ title: "完了", description: "処理が完了しました。" })}
          >
            通知
          </button>
          <ToastParts.Portal>
            <ToastParts.Viewport>
              {toasts.map((toast) => (
                <ToastParts.Root key={toast.id} toast={toast}>
                  <ToastParts.Content>
                    <ToastParts.Title />
                    <ToastParts.Description />
                    <ToastParts.Close>閉じる</ToastParts.Close>
                  </ToastParts.Content>
                </ToastParts.Root>
              ))}
            </ToastParts.Viewport>
          </ToastParts.Portal>
        </>
      );
    }

    const screen = await render(
      <ToastParts.Provider timeout={0}>
        <PartsExample />
      </ToastParts.Provider>,
    );
    clickElement(screen.getByRole("button", { name: "通知" }));

    // 検証
    await expect
      .element(screen.getByRole("heading", { name: "完了" }))
      .toHaveClass("sui_toast_title");
    await expect.element(screen.getByText("処理が完了しました。")).toBeInTheDocument();
  });
});
