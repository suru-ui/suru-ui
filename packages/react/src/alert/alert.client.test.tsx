import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { Button } from "../button/button.jsx";
import { Alert, AlertAPI, useAlertAPI } from "./alert.jsx";
import "../../tests/src/_locators.js";

describe("AlertAPI", () => {
  test("getRootProps はアラート固有の props を除いたルートの props を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({
      icon: "!",
      size: "lg",
      color: "blue",
      title: "更新完了",
      actions: "再試行",
      children: "プロフィールを更新しました。",
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

  test("getDescriptionProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({});

    // 検証
    expect(api.getDescriptionProps()).toBe(null);
  });

  test.for([null, undefined, false])(
    "getDescriptionProps は非表示の説明文 (%s) で null を返す",
    (children, { expect }) => {
      // 準備と実行
      const api = new AlertAPI({ children });

      // 検証
      expect(api.getDescriptionProps()).toBe(null);
    },
  );

  test("getDescriptionProps は説明文を子要素にして返す", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({ children: "プロフィールを更新しました。" });

    // 検証
    expect(api.getDescriptionProps()).toStrictEqual({ children: "プロフィールを更新しました。" });
  });

  test("getDescriptionProps は slotProps の指定を子要素に重ねる", ({ expect }) => {
    // 準備と実行
    const api = new AlertAPI({
      children: "プロフィールを更新しました。",
      slotProps: { description: { id: "description" } },
    });

    // 検証
    expect(api.getDescriptionProps()).toStrictEqual({
      id: "description",
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
        icon="!"
        color="blue"
        title="更新完了"
        actions={<Button>再試行</Button>}
        aria-label="通知"
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

  test("説明文だけでも描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Alert aria-label="通知">プロフィールを更新しました。</Alert>);

    // 検証
    expect(screen.getByRole("alert", { name: "通知" }).query()).not.toBe(null);
    expect(screen.getByText("プロフィールを更新しました。").query()).not.toBe(null);
  });

  test("指定しないパーツを描画しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Alert aria-label="通知">説明文</Alert>);

    // 検証
    expect(screen.getByClassName("sui_alert_icon").query()).toBe(null);
    expect(screen.getByClassName("sui_alert_title").query()).toBe(null);
    expect(screen.getByClassName("sui_alert_actions").query()).toBe(null);
  });

  test("slotProps を各パーツへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Alert
        icon="!"
        title="更新完了"
        actions="再試行"
        slotProps={{
          icon: { id: "icon" },
          title: { id: "title" },
          actions: { id: "actions" },
          description: { id: "description" },
        }}
        aria-label="通知"
      >
        説明文
      </Alert>,
    );

    // 検証
    expect(screen.getByClassName("sui_alert_icon").element().id).toBe("icon");
    expect(screen.getByClassName("sui_alert_title").element().id).toBe("title");
    expect(screen.getByClassName("sui_alert_description").element().id).toBe("description");
    expect(screen.getByClassName("sui_alert_actions").element().id).toBe("actions");
  });

  test("説明文が非表示のとき描画しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Alert title="更新完了" aria-label="通知">
        {null}
      </Alert>,
    );

    // 検証
    expect(screen.getByText("更新完了").query()).not.toBe(null);
    expect(screen.getByClassName("sui_alert_description").query()).toBe(null);
  });
});
