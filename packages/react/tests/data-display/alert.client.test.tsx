import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertIcon,
  AlertRoot,
  AlertTitle,
} from "../../src/data-display/alert/index.js";

describe("Alert", () => {
  test("メッセージを表示する", async () => {
    const screen = await render(<Alert>プロフィールを更新しました。</Alert>);

    const alert = screen.getByRole("alert");

    await expect.element(alert).toBeVisible();
    await expect
      .element(alert)
      .toHaveClass(
        "sui_alert",
        "sui_alert-size_md",
        "sui_alert-color_grey",
        "sui_alert-radius_md",
        "sui_alert-variant_solid",
      );
    await expect.element(screen.getByText("プロフィールを更新しました。")).toBeVisible();
    expect(screen.container.querySelector(".sui_alert_icon")).toBeNull();
  });

  test("スタイルのプロパティーを上書きする", async () => {
    const screen = await render(
      <Alert color="green" outlined radius="lg" size="lg" variant="naked">
        完了しました。
      </Alert>,
    );
    const alert = screen.getByRole("alert");

    await expect
      .element(alert)
      .toHaveClass(
        "sui_alert-color_green",
        "sui_alert-outlined",
        "sui_alert-radius_lg",
        "sui_alert-size_lg",
        "sui_alert-variant_naked",
      );
  });

  test("インジケーターとコンテンツを slotProps でカスタマイズする", async () => {
    const screen = await render(
      <Alert
        slotProps={{
          description: { className: "custom-content" },
          icon: { children: <svg data-testid="status-icon" /> },
        }}
      >
        カスタム通知
      </Alert>,
    );

    await expect.element(screen.getByTestId("status-icon")).toBeVisible();
    const content = screen.container.querySelector(".custom-content");

    expect(content).not.toBeNull();
    await expect
      .element(content as HTMLElement)
      .toHaveClass("sui_alert_description", "custom-content");
  });

  test("タイトルを slotProps で表示する", async () => {
    const screen = await render(
      <Alert slotProps={{ title: { children: "更新完了" } }}>プロフィールを更新しました。</Alert>,
    );

    await expect.element(screen.getByText("更新完了")).toHaveClass("sui_alert_title");
  });

  test("Icon を省略して表示する", async () => {
    const screen = await render(<Alert>プロフィールを更新しました。</Alert>);

    await expect.element(screen.getByRole("alert")).toBeVisible();
    expect(screen.container.querySelector(".sui_alert_icon")).toBeNull();
    await expect.element(screen.getByText("プロフィールを更新しました。")).toBeVisible();
    const content = screen.container.querySelector(".sui_alert_description");

    expect(content).not.toBeNull();
    expect(getComputedStyle(content!).gridArea).toBe("description");
  });

  test("Actions を右寄せで表示する", async () => {
    const screen = await render(
      <Alert
        slotProps={{
          actions: {
            children: <button type="button">再試行</button>,
          },
        }}
      >
        保存できませんでした。
      </Alert>,
    );
    const actions = screen.container.querySelector(".sui_alert_actions");

    expect(actions).not.toBeNull();
    await expect.element(actions as HTMLElement).toHaveStyle({
      justifyContent: "flex-end",
    });
    await expect.element(screen.getByRole("button", { name: "再試行" })).toBeVisible();
  });

  test("render でルート要素を置き換える", async () => {
    const screen = await render(<Alert render={<aside data-testid="alert" />}>通知</Alert>);

    await expect.element(screen.getByTestId("alert")).toHaveRole("alert");
    await expect.element(screen.getByTestId("alert")).toHaveClass("sui_alert");
  });
});

describe("AlertParts", () => {
  test("パーツを組み合わせて表示する", async () => {
    const screen = await render(
      <AlertRoot>
        <AlertIcon />
        <AlertTitle>保存完了</AlertTitle>
        <AlertDescription>直接組み立てた通知</AlertDescription>
        <AlertActions>操作</AlertActions>
      </AlertRoot>,
    );

    await expect.element(screen.getByRole("alert")).toBeVisible();
    await expect.element(screen.getByText("直接組み立てた通知")).toBeVisible();
    await expect.element(screen.getByText("操作")).toBeVisible();
    const title = screen.container.querySelector(".sui_alert_title");
    const content = screen.container.querySelector(".sui_alert_description");
    const actions = screen.container.querySelector(".sui_alert_actions");

    expect(title).not.toBeNull();
    expect(content).not.toBeNull();
    expect(actions).not.toBeNull();
    expect(getComputedStyle(title!).gridArea).toBe("title");
    expect(getComputedStyle(content!).gridArea).toBe("description");
    expect(getComputedStyle(actions!).gridArea).toBe("actions");
  });
});
