import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { Dialog, type DialogProps } from "../../../src/dialog/dialog.jsx";
import "../_locators.js";

const closeButton = <button type="button">閉じる</button>;

const triggerButton = <button type="button">開く</button>;

describe("Dialog", () => {
  test("既定では閉じている", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Dialog title="見出し" trigger={triggerButton} />);

    // 検証
    expect(screen.getByRole("dialog").query()).toBe(null);
  });

  test("トリガーを押すと開く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog description="説明文です。" title="見出し" trigger={triggerButton} />,
    );
    await screen.getByRole("button", { name: "開く" }).click();

    // 検証
    expect(screen.getByRole("dialog", { name: "見出し" }).query()).not.toBe(null);
  });

  test("見出しと説明を関連付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Dialog defaultOpen description="説明文です。" title="見出し" />);

    // 検証
    const dialog = screen.getByRole("dialog", { name: "見出し" }).element();
    expect(dialog.getAttribute("aria-describedby")).toBeDefined();
  });

  test("閉じるボタンで閉じてコールバックを呼ぶ", async ({ expect }) => {
    // 準備
    const onClose = vi.fn<React.MouseEventHandler<HTMLButtonElement>>();
    const screen = await render(
      <Dialog
        defaultOpen
        showCloseIconButton={false}
        title="見出し"
        close={closeButton}
        onClose={onClose}
      />,
    );

    // 実行
    await screen.getByRole("button", { name: "閉じる" }).click();

    // 検証
    expect(onClose).toHaveBeenCalledTimes(1);
    await vi.waitFor(() => {
      expect(screen.getByRole("dialog").query()).toBe(null);
    });
  });

  test("既定を防ぐとコールバックを呼ばない", async ({ expect }) => {
    // 準備
    const onClose = vi.fn<React.MouseEventHandler<HTMLButtonElement>>();
    const screen = await render(
      <Dialog
        defaultOpen
        showCloseIconButton={false}
        title="見出し"
        close={closeButton}
        onClose={onClose}
        slotProps={{ closeTrigger: { onClick: (evt) => evt.preventDefault() } }}
      />,
    );

    // 実行
    await screen.getByRole("button", { name: "閉じる" }).click();

    // 検証
    expect(onClose).not.toHaveBeenCalled();
  });

  test("描画関数の閉じるボタンを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog
        defaultOpen
        showCloseIconButton={false}
        title="見出し"
        close={(props) => (
          <button type="button" {...props}>
            閉じる
          </button>
        )}
      />,
    );

    // 検証
    const button = screen.getByRole("button", { name: "閉じる" }).element();
    expect(button.classList.contains("sui_dialog_close")).toBe(true);
  });

  test("閉じるアイコンボタンで閉じる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Dialog defaultOpen title="見出し" />);
    await screen.getByRole("button", { name: "閉じる" }).click();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("dialog").query()).toBe(null);
    });
  });

  test("閉じるアイコンボタンを表示しない指定ができる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Dialog defaultOpen showCloseIconButton={false} title="見出し" />);

    // 検証
    expect(screen.getByRole("button", { name: "閉じる" }).query()).toBe(null);
  });

  test("本文と操作を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog defaultOpen action="操作" title="見出し">
        本文
      </Dialog>,
    );

    // 検証
    expect(screen.getByText("本文").query()?.textContent).toBe("本文");
    expect(screen.getByText("操作").query()?.textContent).toBe("操作");
  });

  test("フッターと閉じるボタンを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog
        defaultOpen
        showCloseIconButton={false}
        title="見出し"
        close={closeButton}
        footer="補足"
      />,
    );

    // 検証
    const footer = screen.getByClassName("sui_dialog_footer").element();
    expect(footer.textContent).toContain("補足");
    expect(footer.textContent).toContain("閉じる");
  });

  test("積み上げ式では操作をヘッダーの外に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog defaultOpen action="操作" title="見出し" variant="stacked" close={closeButton} />,
    );

    // 検証
    const action = screen.getByClassName("sui_dialog_action").element();
    expect(action.closest(".sui_dialog_popup")).not.toBe(null);
    expect(action.closest(".sui_dialog_header")).toBe(null);
    expect(action.closest(".sui_dialog_footer")).toBe(null);
  });

  test("積み上げ式で操作だけのときヘッダーを描画しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Dialog defaultOpen variant="stacked" />);

    // 検証
    expect(screen.getByClassName("sui_dialog_header").query()).toBe(null);
    expect(screen.getByClassName("sui_dialog_action").query()).not.toBe(null);
  });

  test("slotProps で各パーツに props を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog
        defaultOpen
        showCloseIconButton={false}
        title="見出し"
        action="操作"
        close={closeButton}
        description="説明"
        slotProps={{
          action: { id: "action" },
          content: { id: "content" },
          closeTrigger: { id: "close" },
          popup: { id: "popup" },
          description: { id: "description" },
          footer: { id: "footer" },
          header: { id: "header" },
          title: { id: "title" },
        }}
      >
        本文
      </Dialog>,
    );

    // 検証
    expect(screen.getByClassName("sui_dialog_action").element().id).toBe("action");
    expect(screen.getByClassName("sui_dialog_content").element().id).toBe("content");
    expect(screen.getByClassName("sui_dialog_close").element().id).toBe("close");
    expect(screen.getByClassName("sui_dialog_popup").element().id).toBe("popup");
    expect(screen.getByClassName("sui_card_description").element().id).toBe("description");
    expect(screen.getByClassName("sui_dialog_footer").element().id).toBe("footer");
    expect(screen.getByClassName("sui_dialog_header").element().id).toBe("header");
    expect(screen.getByClassName("sui_card_title").element().id).toBe("title");
  });

  test("外側を押すと閉じる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Dialog defaultOpen title="見出し" />);
    await screen.getByClassName("sui_dialog_backdrop").click({ position: { x: 4, y: 4 } });

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("dialog").query()).toBe(null);
    });
  });

  test("外側を押しても閉じない指定ができる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Dialog defaultOpen disablePointerDismissal title="見出し" />);
    screen
      .getByClassName("sui_dialog_backdrop")
      .element()
      .dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true }));

    // 検証
    expect(screen.getByRole("dialog").query()).not.toBe(null);
  });

  test("Escape を押すと閉じる", async ({ expect }) => {
    // 準備
    const onOpenChange = vi.fn<NonNullable<DialogProps["onOpenChange"]>>();
    const screen = await render(<Dialog defaultOpen title="見出し" onOpenChange={onOpenChange} />);

    // 実行
    await userEvent.keyboard("{Escape}");

    // 検証
    await vi.waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledTimes(1);
    });
    expect(onOpenChange.mock.calls[0]?.[0]).toBe(false);
    expect(onOpenChange.mock.calls[0]?.[1].reason).toBe("escape-key");
    await vi.waitFor(() => {
      expect(screen.getByRole("dialog").query()).toBe(null);
    });
  });

  test("ハンドルで開閉する", async ({ expect }) => {
    // 準備
    const handle = Dialog.createHandle();
    const screen = await render(
      <>
        <button type="button" onClick={() => handle.open(null)}>
          開く
        </button>
        <button type="button" onClick={() => handle.close()}>
          閉じる
        </button>
        <Dialog handle={handle} title="見出し" />
      </>,
    );

    // 実行と検証
    await screen.getByRole("button", { name: "開く" }).click();
    await vi.waitFor(() => {
      expect(screen.getByRole("dialog").query()).not.toBe(null);
    });
    await screen.getByRole("button", { name: "閉じる" }).click();
    await vi.waitFor(() => {
      expect(screen.getByRole("dialog").query()).toBe(null);
    });
  });

  test("usePopupContext で角丸を読み取る", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = Dialog.usePopupContext();

      return <span>{ctx.radius}</span>;
    }

    // 実行
    const screen = await render(
      <Dialog defaultOpen radius="lg" title="見出し">
        <Probe />
      </Dialog>,
    );

    // 検証
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});
