import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { Alert, AlertAPI, useAlertAPI } from "../../../src/alert/alert.jsx";
import { Button } from "../../../src/button/button.js";
import "../_locators.js";

describe("AlertAPI", () => {
  test("getRootProps はアラート固有の props を除いたルートの props を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({
      size: "lg",
      color: "blue",
      icon: "!",
      title: "更新完了",
      children: "プロフィールを更新しました。",
      actions: "再試行",
    });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps).toStrictEqual({ size: "lg", color: "blue" });
  });

  test("getIconProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({});

    // 検証
    expect(api.getIconProps()).toBe(null);
  });

  test("getIconProps はアイコンを子要素にして返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({ icon: "!" });

    // 検証
    expect(api.getIconProps()).toStrictEqual({ children: "!" });
  });

  test("getIconProps は slotProps の指定を子要素に重ねる", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({ icon: "!", slotProps: { icon: { id: "icon" } } });

    // 検証
    expect(api.getIconProps()).toStrictEqual({ id: "icon", children: "!" });
  });

  test("getIconProps は空文字のアイコンをインジケーターとして表示する", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({ icon: "" });

    // 検証
    expect(api.getIconProps()).toStrictEqual({ children: "" });
  });

  test("getTitleProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({});

    // 検証
    expect(api.getTitleProps()).toBe(null);
  });

  test("getTitleProps はタイトルを子要素にして返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({ title: "更新完了" });

    // 検証
    expect(api.getTitleProps()).toStrictEqual({ children: "更新完了" });
  });

  test("getTitleProps は空文字のタイトルを表示対象にする", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({ title: "" });

    // 検証
    expect(api.getTitleProps()).toStrictEqual({ children: "" });
  });

  test("getContentProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({});

    // 検証
    expect(api.getContentProps()).toBe(null);
  });

  test.for([null, undefined, false])(
    "getContentProps は非表示の本文 (%s) で null を返す",
    (children, { expect }) => {
      // 準備と実行
      const api = new AlertAPI({ children });

      // 検証
      expect(api.getContentProps()).toBe(null);
    },
  );

  test("getContentProps は本文を子要素にして返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({ children: "プロフィールを更新しました。" });

    // 検証
    expect(api.getContentProps()).toStrictEqual({ children: "プロフィールを更新しました。" });
  });

  test("getContentProps は slotProps の指定を子要素に重ねる", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({
      children: "プロフィールを更新しました。",
      slotProps: { content: { id: "content" } },
    });

    // 検証
    expect(api.getContentProps()).toStrictEqual({
      id: "content",
      children: "プロフィールを更新しました。",
    });
  });

  test("getActionsProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({});

    // 検証
    expect(api.getActionsProps()).toBe(null);
  });

  test("getActionsProps は操作ボタンを子要素にして返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({ actions: "再試行" });

    // 検証
    expect(api.getActionsProps()).toStrictEqual({ children: "再試行" });
  });
});

describe("useAlertAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useAlertAPI({ title: "更新完了" });
      return <span>{api.getTitleProps()?.children}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("更新完了").query()?.textContent).toBe("更新完了");
  });
});

describe("Alert", () => {
  test("役割と修飾クラスを付けてすべてのパーツを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Alert
        aria-label="通知"
        color="blue"
        icon="!"
        title="更新完了"
        actions={<Button>再試行</Button>}
      >
        プロフィールを更新しました。
      </Alert>,
    );

    // 検証
    const root = screen.getByRole("alert", { name: "通知" }).element();
    expect(root.classList.contains("sui_alert")).toBe(true);
    expect(root.classList.contains("sui_alert-color_blue")).toBe(true);
    expect(screen.getByClassName("sui_alert_icon").query()).not.toBe(null);
    expect(screen.getByText("更新完了").query()).not.toBe(null);
    expect(screen.getByText("プロフィールを更新しました。").query()).not.toBe(null);
    expect(screen.getByRole("button", { name: "再試行" }).query()).not.toBe(null);
  });

  test("本文だけでも描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Alert aria-label="通知">プロフィールを更新しました。</Alert>);

    // 検証
    expect(screen.getByRole("alert", { name: "通知" }).query()).not.toBe(null);
    expect(screen.getByText("プロフィールを更新しました。").query()).not.toBe(null);
  });

  test("指定しないパーツを描画しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Alert aria-label="通知">本文</Alert>);

    // 検証
    expect(screen.getByClassName("sui_alert_icon").query()).toBe(null);
    expect(screen.getByClassName("sui_alert_title").query()).toBe(null);
    expect(screen.getByClassName("sui_alert_actions").query()).toBe(null);
  });

  test("slotProps を各パーツへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Alert
        aria-label="通知"
        icon="!"
        title="更新完了"
        actions="再試行"
        slotProps={{
          actions: { id: "actions" },
          content: { id: "content" },
          icon: { id: "icon" },
          title: { id: "title" },
        }}
      >
        本文
      </Alert>,
    );

    // 検証
    expect(screen.getByClassName("sui_alert_icon").element().id).toBe("icon");
    expect(screen.getByClassName("sui_alert_title").element().id).toBe("title");
    expect(screen.getByClassName("sui_alert_content").element().id).toBe("content");
    expect(screen.getByClassName("sui_alert_actions").element().id).toBe("actions");
  });

  test("本文が非表示のときコンテンツを描画しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Alert aria-label="通知" title="更新完了">
        {null}
      </Alert>,
    );

    // 検証
    expect(screen.getByText("更新完了").query()).not.toBe(null);
    expect(screen.getByClassName("sui_alert_content").query()).toBe(null);
  });
});
