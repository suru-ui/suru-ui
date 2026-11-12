import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { Dialog } from "./dialog.jsx";
import "../../tests/src/_locators.js";

const closeButton = <button type="button">閉じる</button>;

const triggerButton = <button type="button">開く</button>;
describe("Dialog", () => {
  test("既定では閉じている", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Dialog title="見出し" trigger={triggerButton} />);

    // 検証。
    expect(screen.getByRole("dialog").query()).toBe(null);
  });

  test("描画関数の閉じるボタンを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Dialog
        close={(props) => (
          <button type="button" {...props}>
            閉じる
          </button>
        )}
        title="見出し"
        defaultOpen
        showCloseIconButton={false}
      />,
    );

    // 検証。
    const button = screen.getByRole("button", { name: "閉じる" }).element();
    expect(button.classList.contains("sui_dialog_close")).toBe(true);
  });

  test("閉じるアイコンボタンを表示しない指定ができる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Dialog title="見出し" defaultOpen showCloseIconButton={false} />);

    // 検証。
    expect(screen.getByRole("button", { name: "閉じる" }).query()).toBe(null);
  });

  test("本文と操作を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Dialog title="見出し" action="操作" defaultOpen>
        本文
      </Dialog>,
    );

    // 検証。
    expect(screen.getByText("本文").query()?.textContent).toBe("本文");
    expect(screen.getByText("操作").query()?.textContent).toBe("操作");
  });

  test("フッターと閉じるボタンを表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Dialog
        close={closeButton}
        title="見出し"
        footer="補足"
        defaultOpen
        showCloseIconButton={false}
      />,
    );

    // 検証。
    const footer = screen.getByClassName("sui_dialog_footer").element();
    expect(footer.textContent).toContain("補足");
    expect(footer.textContent).toContain("閉じる");
  });

  test("積み上げ式では操作をヘッダーの外に置く", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Dialog close={closeButton} title="見出し" action="操作" variant="stacked" defaultOpen />,
    );

    // 検証 (操作はヘッダー内に描画し、見た目だけ絶対配置で外へ重ねます)
    const action = screen.getByClassName("sui_dialog_action").element();
    expect(action.closest(".sui_dialog_popup")).not.toBe(null);
    expect(getComputedStyle(action).position).toBe("absolute");
    expect(action.closest(".sui_dialog_footer")).toBe(null);
  });

  test("積み上げ式で操作だけのときもヘッダーを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Dialog variant="stacked" defaultOpen />);

    // 検証 (ヘッダーは空でも描画しますが、操作が絶対配置のため高さを持ちません)
    const header = screen.getByClassName("sui_dialog_header").element();
    const action = screen.getByClassName("sui_dialog_action").element();
    expect(action.closest(".sui_dialog_header")).not.toBe(null);
    expect(header.getBoundingClientRect().height).toBe(0);
  });

  test("slotProps で各パーツに props を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Dialog
        id="popup"
        close={closeButton}
        title="見出し"
        action="操作"
        slotProps={{
          title: { id: "title" },
          action: { id: "action" },
          footer: { id: "footer" },
          header: { id: "header" },
          content: { id: "content" },
          description: { id: "description" },
          closeTrigger: { id: "close" },
        }}
        defaultOpen
        description="説明"
        showCloseIconButton={false}
      >
        本文
      </Dialog>,
    );

    // 検証。
    expect(screen.getByClassName("sui_dialog_action").element().id).toBe("action");
    expect(screen.getByClassName("sui_dialog_content").element().id).toBe("content");
    expect(screen.getByClassName("sui_dialog_close").element().id).toBe("close");
    expect(screen.getByClassName("sui_dialog_popup").element().id).toBe("popup");
    expect(screen.getByClassName("sui_card_description").element().id).toBe("description");
    expect(screen.getByClassName("sui_dialog_footer").element().id).toBe("footer");
    expect(screen.getByClassName("sui_dialog_header").element().id).toBe("header");
    expect(screen.getByClassName("sui_card_title").element().id).toBe("title");
  });

  test("render へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Dialog
        size="sm"
        title="見出し"
        radius="lg"
        render={(props, state) => (
          <section
            {...props}
            data-probe={`${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
        variant="stacked"
        outlined
        defaultOpen
      />,
    );

    // 検証。
    const popup = screen.getByClassName("sui_dialog_popup").element();
    expect(popup.tagName).toBe("SECTION");
    expect(popup.getAttribute("data-probe")).toBe("sm/lg/stacked/true");
  });

  test("usePopupContext で角丸を読み取る", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = Dialog.usePopupContext();

      return <span>{ctx.radius}</span>;
    }

    // 実行。
    const screen = await render(
      <Dialog title="見出し" radius="lg" defaultOpen>
        <Probe />
      </Dialog>,
    );

    // 検証。
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});
