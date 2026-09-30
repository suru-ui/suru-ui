import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { useToastClient } from "../../../src/toast/toast.client.js";
import { Toast } from "../../../src/toast/toast.jsx";
import "../../../src/toast/toast.parts.js";
import "../_locators.js";

/**
 * 通知を追加するボタンを描画します。
 * Provider の配下で client から通知を追加する動作を検証するために使用します。
 */
function AddButton(props: {
  children?: React.ReactNode;
  description?: string | undefined;
  title?: string | undefined;
  type?: string | undefined;
}) {
  const client = useToastClient();

  return (
    <button
      type="button"
      onClick={() => {
        client.add({
          type: props.type,
          title: props.title ?? "通知",
          description: props.description,
        });
      }}
    >
      {props.children ?? "追加"}
    </button>
  );
}

describe("Toast", () => {
  test("通知を追加して見出しと説明を表示する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton title="更新完了" description="プロフィールを更新しました。" />
        <Toast.List />
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    expect(screen.getByRole("heading", { name: "更新完了" }).element().tagName).toBe("H2");
    expect(screen.getByText("プロフィールを更新しました。").element().tagName).toBe("P");
  });

  for (const [type, color] of [
    ["success", "sui_alert-color_green"],
    ["warning", "sui_alert-color_yellow"],
    ["error", "sui_alert-color_red"],
    ["info", "sui_alert-color_blue"],
  ] as const) {
    test(`通知の種類 ${type} を配色 ${color} に変換する`, async ({ expect }) => {
      // 準備
      const screen = await render(
        <Toast.Provider timeout={0}>
          <AddButton type={type} />
          <Toast.List />
        </Toast.Provider>,
      );

      // 実行
      await screen.getByRole("button", { name: "追加" }).click();

      // 検証
      expect(screen.getByClassName("sui_toast_content").element().classList.contains(color)).toBe(
        true,
      );
    });
  }

  test("アクションと閉じるボタンがないときは操作を表示しない", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List>{(toast) => <Toast key={toast.id} toast={toast} close={null} />}</Toast.List>
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    expect(screen.getByClassName("sui_alert_actions").query()).toBe(null);
  });

  test("閉じるボタンの文言を変更する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List>{(toast) => <Toast key={toast.id} toast={toast} close="消す" />}</Toast.List>
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    expect(screen.getByText("消す").query()).not.toBe(null);
    expect(screen.getByText("閉じる").query()).toBe(null);
  });

  test("一覧の描画関数で各通知をカスタマイズする", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List>
          {(toast) => <Toast key={toast.id} toast={toast} className="custom-toast" />}
        </Toast.List>
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    expect(screen.getByClassName("custom-toast").query()).not.toBe(null);
  });

  test("一覧の内容を差し替える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List>
          <span>カスタム一覧</span>
        </Toast.List>
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    expect(screen.getByText("カスタム一覧").query()).not.toBe(null);
    expect(screen.getByClassName("sui_toast").query()).toBe(null);
  });

  test("作成したマネージャーから通知を追加する", async ({ expect }) => {
    // 準備
    const manager = Toast.createManager();
    const screen = await render(
      <Toast.Provider toastManager={manager} timeout={0}>
        <button type="button" onClick={() => manager.add({ title: "マネージャー" })}>
          追加
        </button>
        <Toast.List />
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    expect(screen.getByRole("heading", { name: "マネージャー" }).query()).not.toBe(null);
  });

  test("上限を超えた通知を制限状態にする", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider limit={1} timeout={0}>
        <AddButton />
        <Toast.List />
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const limited = screen.getByClassName("sui_toast-limited").elements();
    expect(limited.length).toBe(1);
  });
});
