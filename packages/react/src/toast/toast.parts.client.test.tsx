import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { useToastClient } from "./client/toast.client.js";
import { Toast } from "./toast.jsx";
import "./toast.parts.js";
import "../../tests/src/_locators.js";

/**
 * 通知を追加するボタンを描画します。
 * Provider の配下で各パーツを描画するために通知を追加する目的で使用します。
 */
function AddButton(props: { description?: string | undefined; title?: string | undefined }) {
  const client = useToastClient();

  return (
    <button
      type="button"
      onClick={() => {
        client.add({ title: props.title ?? "見出し", description: props.description });
      }}
    >
      追加
    </button>
  );
}

describe("ToastProvider", () => {
  test("要素を描画せず子要素を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Toast.Provider>
        <span>子要素</span>
      </Toast.Provider>,
    );

    // 検証
    expect(screen.getByText("子要素").query()).not.toBe(null);
  });
});

describe("ToastPortal", () => {
  test("表示領域を DOM の別の場所へ移動する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List />
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const portal = screen.getByClassName("sui_toast_portal").element();
    expect(portal.tagName).toBe("DIV");
    expect(portal.getAttribute("data-scope")).toBe("");
  });
});

describe("ToastViewport", () => {
  test("通知の表示領域として描画する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List />
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const viewport = screen.getByRole("region", { name: "通知" }).element();
    expect(viewport.classList.contains("sui_toast_viewport")).toBe(true);
  });

  test("表示領域のラベルを変更する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List slotProps={{ viewport: { "aria-label": "お知らせ" } }} />
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    expect(screen.getByRole("region", { name: "お知らせ" }).query()).not.toBe(null);
    expect(screen.getByRole("region", { name: "通知" }).query()).toBe(null);
  });
});

describe("ToastRoot", () => {
  test("通知のルートとして描画する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List />
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const root = screen.getByRole("dialog").element();
    expect(root.classList.contains("sui_toast")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List>
          {(toast) => <Toast key={toast.id} toast={toast} className="custom" />}
        </Toast.List>
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const root = screen.getByClassName("sui_toast").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_toast")).toBe(true);
  });
});

describe("ToastContent", () => {
  test("通知の内容をアラートとして描画する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List />
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const content = screen.getByClassName("sui_toast_content").element();
    expect(content.getAttribute("role")).toBe("alert");
    expect(content.getAttribute("data-scope")).toBe("");
    expect(content.classList.contains("sui_alert")).toBe(true);
  });

  test("指定した外観をクラスにする", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List>
          {(toast) => (
            <Toast
              key={toast.id}
              size="lg"
              color="blue"
              toast={toast}
              radius="sm"
              variant="naked"
              outlined
            />
          )}
        </Toast.List>
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const content = screen.getByClassName("sui_toast_content").element();
    expect(content.classList.contains("sui_alert-size_lg")).toBe(true);
    expect(content.classList.contains("sui_alert-color_blue")).toBe(true);
    expect(content.classList.contains("sui_alert-radius_sm")).toBe(true);
    expect(content.classList.contains("sui_alert-variant_naked")).toBe(true);
    expect(content.classList.contains("sui_alert-outlined")).toBe(true);
  });

  test("slotProps の内容を引き継ぐ", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List>
          {(toast) => (
            <Toast key={toast.id} toast={toast} slotProps={{ content: { id: "content" } }} />
          )}
        </Toast.List>
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    expect(screen.getByClassName("sui_toast_content").element().id).toBe("content");
  });
});

describe("ToastTitle", () => {
  test("見出しとして描画する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton title="更新完了" />
        <Toast.List />
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const title = screen.getByRole("heading", { name: "更新完了" }).element();
    expect(title.tagName).toBe("H2");
    expect(title.classList.contains("sui_alert_title")).toBe(true);
  });

  test("slotProps の見出しを引き継ぐ", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton title="更新完了" />
        <Toast.List>
          {(toast) => (
            <Toast
              key={toast.id}
              toast={toast}
              slotProps={{ title: { className: "custom-title" } }}
            />
          )}
        </Toast.List>
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    expect(
      screen
        .getByRole("heading", { name: "更新完了" })
        .element()
        .classList.contains("custom-title"),
    ).toBe(true);
  });
});

describe("ToastDescription", () => {
  test("説明文として描画する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton description="プロフィールを更新しました。" />
        <Toast.List />
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const description = screen.getByText("プロフィールを更新しました。").element();
    expect(description.tagName).toBe("P");
    expect(description.classList.contains("sui_alert_description")).toBe(true);
  });
});

describe("ToastActions", () => {
  test("操作ボタンをまとめる", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List />
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    expect(screen.getByClassName("sui_alert_actions").element().tagName).toBe("DIV");
  });
});

describe("ToastAction", () => {
  test("アクションのボタンとして描画する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List>
          {(toast) => (
            <Toast
              key={toast.id}
              toast={toast}
              action="再試行"
              slotProps={{ action: { id: "action" } }}
            />
          )}
        </Toast.List>
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const action = screen.getByText("再試行").element();
    expect(action.tagName).toBe("BUTTON");
    expect(action.classList.contains("sui_button")).toBe(true);
  });
});

describe("ToastClose", () => {
  test("閉じるボタンとして描画する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <Toast.Provider timeout={0}>
        <AddButton />
        <Toast.List />
      </Toast.Provider>,
    );

    // 実行
    await screen.getByRole("button", { name: "追加" }).click();

    // 検証
    const close = screen.getByText("閉じる").element();
    expect(close.tagName).toBe("BUTTON");
    expect(close.classList.contains("sui_button")).toBe(true);
  });
});

describe("useToastClient", () => {
  test("通知を操作する関数を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const client = useToastClient();
      const available =
        typeof client.add === "function" &&
        typeof client.close === "function" &&
        typeof client.update === "function" &&
        typeof client.promise === "function";

      return <span>{available ? "あり" : "なし"}</span>;
    }

    // 実行
    const screen = await render(
      <Toast.Provider timeout={0}>
        <Probe />
      </Toast.Provider>,
    );

    // 検証
    expect(screen.getByText("あり").query()).not.toBe(null);
  });
});
