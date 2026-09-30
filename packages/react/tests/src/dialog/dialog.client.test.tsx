import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { Dialog } from "../../../src/dialog/dialog.jsx";
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

  test("slotProps の render へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Dialog
        defaultOpen
        outlined
        title="見出し"
        size="sm"
        radius="lg"
        variant="stacked"
        slotProps={{
          popup: {
            render: (props, state) => (
              <section
                {...props}
                data-probe={`${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
              />
            ),
          },
        }}
      />,
    );

    // 検証
    const popup = screen.getByClassName("sui_dialog_popup").element();
    expect(popup.tagName).toBe("SECTION");
    expect(popup.getAttribute("data-probe")).toBe("sm/lg/stacked/true");
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
