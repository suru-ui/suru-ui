import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { AlertDialog } from "./alert-dialog.jsx";
import "../../tests/src/_locators.js";

const cancelButton = <button type="button">キャンセル</button>;

const confirmButton = <button type="button">削除する</button>;

const triggerButton = <button type="button">削除</button>;
describe("AlertDialog", () => {
  test("既定では閉じている", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<AlertDialog title="見出し" trigger={triggerButton} />);

    // 検証。
    expect(screen.getByRole("alertdialog").query()).toBe(null);
  });

  test("描画関数の中止ボタンを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <AlertDialog
        title="見出し"
        cancel={(props) => (
          <button type="button" {...props}>
            キャンセル
          </button>
        )}
        defaultOpen
      />,
    );

    // 検証。
    const button = screen.getByRole("button", { name: "キャンセル" }).element();
    expect(button.classList.contains("sui_alert_dialog_close")).toBe(true);
  });

  test("アイコンと本文と操作を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <AlertDialog icon={<span>!</span>} title="見出し" action="操作" defaultOpen>
        本文
      </AlertDialog>,
    );

    // 検証。
    expect(screen.getByClassName("sui_alert_dialog_icon").query()).not.toBe(null);
    expect(screen.getByText("本文").query()?.textContent).toBe("本文");
    expect(screen.getByText("操作").query()?.textContent).toBe("操作");
  });

  test("フッターと中止ボタンと確認ボタンを表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <AlertDialog
        title="見出し"
        cancel={cancelButton}
        footer="補足"
        confirm={confirmButton}
        defaultOpen
        showCancelIconButton={false}
      />,
    );

    // 検証。
    const footer = screen.getByClassName("sui_alert_dialog_footer").element();
    expect(footer.textContent).toContain("補足");
    expect(footer.textContent).toContain("キャンセル");
    expect(footer.textContent).toContain("削除する");
  });

  test("積み上げ式では操作をヘッダーの外に置く", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <AlertDialog
        title="見出し"
        action="操作"
        cancel={cancelButton}
        confirm={confirmButton}
        variant="stacked"
        defaultOpen
      />,
    );

    // 検証 (操作はヘッダー内に描画し、見た目だけ絶対配置で外へ重ねます)
    const action = screen.getByClassName("sui_alert_dialog_action").element();
    expect(action.closest(".sui_alert_dialog_popup")).not.toBe(null);
    expect(getComputedStyle(action).position).toBe("absolute");
    expect(action.closest(".sui_alert_dialog_footer")).toBe(null);
  });

  test("積み上げ式で操作だけのときもヘッダーを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<AlertDialog action="操作" variant="stacked" defaultOpen />);

    // 検証 (ヘッダーは空でも描画しますが、操作が絶対配置のため高さを持ちません)
    const header = screen.getByClassName("sui_alert_dialog_header").element();
    const action = screen.getByClassName("sui_alert_dialog_action").element();
    expect(action.closest(".sui_alert_dialog_header")).not.toBe(null);
    expect(header.getBoundingClientRect().height).toBe(0);
  });

  test("slotProps で各パーツに props を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <AlertDialog
        title="見出し"
        action="操作"
        slotProps={{
          action: { id: "action" },
          header: { id: "header" },
          content: { id: "content" },
        }}
        defaultOpen
      >
        本文
      </AlertDialog>,
    );

    // 検証。
    expect(screen.getByClassName("sui_alert_dialog_action").element().id).toBe("action");
    expect(screen.getByClassName("sui_alert_dialog_content").element().id).toBe("content");
    expect(screen.getByClassName("sui_alert_dialog_header").element().id).toBe("header");
  });

  test("render へポップアップとアイコンの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <AlertDialog
        icon="!"
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
        slotProps={{
          icon: {
            size: "sm",
            radius: "full",
            render: (props, state) => (
              <div {...props} data-probe={`${state.size}/${state.radius}/${state.variant}`} />
            ),
            variant: "solid",
          },
        }}
        defaultOpen
      />,
    );

    // 検証。
    const popup = screen.getByClassName("sui_alert_dialog_popup").element();
    expect(popup.tagName).toBe("SECTION");
    expect(popup.getAttribute("data-probe")).toBe("sm/lg/stacked/true");
    expect(
      screen.getByClassName("sui_alert_dialog_icon").element().getAttribute("data-probe"),
    ).toBe("sm/full/solid");
  });

  test("usePopupContext で角丸を読み取る", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = AlertDialog.usePopupContext();

      return <span>{ctx.radius}</span>;
    }

    // 実行。
    const screen = await render(
      <AlertDialog title="見出し" radius="lg" defaultOpen>
        <Probe />
      </AlertDialog>,
    );

    // 検証。
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});
