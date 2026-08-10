import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  Alert,
  AlertActions,
  AlertContent,
  AlertIndicator,
  AlertRoot,
  AlertTitle,
} from "../../src/data-display/alert/index.js";

describe("Alert", () => {
  test("メッセージと既定のインジケーターを表示する", async () => {
    const screen = await render(<Alert>プロフィールを更新しました。</Alert>);

    const alert = screen.getByRole("alert");

    await expect.element(alert).toBeVisible();
    await expect
      .element(alert)
      .toHaveClass(
        "sui_alert",
        "sui_alert-size_md",
        "sui_alert-color_blue",
        "sui_alert-radius_rounded",
        "sui_alert-variant_liquid",
      );
    await expect.element(screen.getByText("プロフィールを更新しました。")).toBeVisible();
    const indicator = screen.container.querySelector(".sui_alert_indicator");

    expect(indicator).not.toBeNull();
    await expect.element(indicator as HTMLElement).toHaveAttribute("aria-hidden", "true");
  });

  test("スタイルのプロパティーを上書きする", async () => {
    const screen = await render(
      <Alert color="green" outlined radius="full" size="lg" variant="solid">
        完了しました。
      </Alert>,
    );
    const alert = screen.getByRole("alert");

    await expect
      .element(alert)
      .toHaveClass(
        "sui_alert-color_green",
        "sui_alert-outlined",
        "sui_alert-radius_full",
        "sui_alert-size_lg",
        "sui_alert-variant_solid",
      );
  });

  test("インジケーターとコンテンツを slotProps でカスタマイズする", async () => {
    const screen = await render(
      <Alert
        slotProps={{
          content: { className: "custom-content" },
          indicator: { children: <svg data-testid="status-icon" /> },
        }}
      >
        カスタム通知
      </Alert>,
    );

    await expect.element(screen.getByTestId("status-icon")).toBeVisible();
    const content = screen.container.querySelector(".custom-content");

    expect(content).not.toBeNull();
    await expect.element(content as HTMLElement).toHaveClass("sui_alert_content", "custom-content");
  });

  test("タイトルを slotProps で表示する", async () => {
    const screen = await render(
      <Alert slotProps={{ title: { children: "更新完了" } }}>プロフィールを更新しました。</Alert>,
    );

    await expect.element(screen.getByText("更新完了")).toHaveClass("sui_alert_title");
  });

  test("Indicator を省略して表示する", async () => {
    const screen = await render(
      <Alert slotProps={{ indicator: null }}>プロフィールを更新しました。</Alert>,
    );

    await expect.element(screen.getByRole("alert")).toBeVisible();
    expect(screen.container.querySelector(".sui_alert_indicator")).toBeNull();
    await expect.element(screen.getByText("プロフィールを更新しました。")).toBeVisible();
    const content = screen.container.querySelector(".sui_alert_content");

    expect(content).not.toBeNull();
    expect(getComputedStyle(content!).gridArea).toBe("content");
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
        <AlertIndicator />
        <AlertTitle>保存完了</AlertTitle>
        <AlertContent>直接組み立てた通知</AlertContent>
        <AlertActions>操作</AlertActions>
      </AlertRoot>,
    );

    await expect.element(screen.getByRole("alert")).toBeVisible();
    await expect.element(screen.getByText("直接組み立てた通知")).toBeVisible();
    await expect.element(screen.getByText("操作")).toBeVisible();
    const title = screen.container.querySelector(".sui_alert_title");
    const content = screen.container.querySelector(".sui_alert_content");
    const actions = screen.container.querySelector(".sui_alert_actions");

    expect(title).not.toBeNull();
    expect(content).not.toBeNull();
    expect(actions).not.toBeNull();
    expect(getComputedStyle(title!).gridArea).toBe("title");
    expect(getComputedStyle(content!).gridArea).toBe("content");
    expect(getComputedStyle(actions!).gridArea).toBe("actions");
  });
});
