import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { AlertRoot } from "./alert.root.jsx";

describe("AlertRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertRoot aria-label="通知" />);

    // 検証
    const root = screen.getByRole("alert", { name: "通知" }).element();
    expect(root.classList.contains("sui_alert")).toBe(true);
    expect(root.classList.contains("sui_alert-actionsposition_side")).toBe(true);
    expect(root.classList.contains("sui_alert-descriptionposition_bottom")).toBe(true);
    expect(root.classList.contains("sui_alert-size_md")).toBe(true);
    expect(root.classList.contains("sui_alert-color_grey")).toBe(true);
    expect(root.classList.contains("sui_alert-radius_md")).toBe(true);
    expect(root.classList.contains("sui_alert-variant_muted")).toBe(true);
    expect(root.classList.contains("sui_alert-outlined")).toBe(false);
  });

  test("指定した修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot
        size="lg"
        color="red"
        radius="none"
        variant="naked"
        outlined
        actionsPosition="bottom"
        descriptionPosition="side-end"
        aria-label="通知"
      />,
    );

    // 検証
    const root = screen.getByRole("alert", { name: "通知" }).element();
    expect(root.classList.contains("sui_alert-actionsposition_bottom")).toBe(true);
    expect(root.classList.contains("sui_alert-descriptionposition_side_end")).toBe(true);
    expect(root.classList.contains("sui_alert-size_lg")).toBe(true);
    expect(root.classList.contains("sui_alert-color_red")).toBe(true);
    expect(root.classList.contains("sui_alert-radius_none")).toBe(true);
    expect(root.classList.contains("sui_alert-variant_naked")).toBe(true);
    expect(root.classList.contains("sui_alert-outlined")).toBe(true);
  });

  test("角丸は大きさに追従する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AlertRoot size="lg" aria-label="追従" />
        <AlertRoot size="lg" radius="sm" aria-label="優先" />
      </>,
    );

    // 検証
    const followed = screen.getByRole("alert", { name: "追従" }).element();
    const prioritized = screen.getByRole("alert", { name: "優先" }).element();
    expect(followed.classList.contains("sui_alert-radius_lg")).toBe(true);
    expect(prioritized.classList.contains("sui_alert-radius_sm")).toBe(true);
  });

  test("通知としての役割を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertRoot aria-label="通知" />);

    // 検証
    expect(screen.getByRole("alert", { name: "通知" }).query()).not.toBe(null);
  });

  test("役割を上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertRoot role="note" aria-label="補足" />);

    // 検証
    expect(screen.getByRole("note", { name: "補足" }).query()).not.toBe(null);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertRoot className="custom" aria-label="通知" />);

    // 検証
    const root = screen.getByRole("alert", { name: "通知" }).element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_alert")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertRoot render={<section />} aria-label="通知" />);

    // 検証
    const root = screen.getByRole("alert", { name: "通知" }).element();
    expect(root.tagName).toBe("SECTION");
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AlertRoot aria-label="通知" />);

    // 検証
    const root = screen.getByRole("alert", { name: "通知" }).element();
    expect(root.getAttribute("data-scope")).toBe("");
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertRoot aria-label="通知">
        <span>説明文</span>
      </AlertRoot>,
    );

    // 検証
    expect(screen.getByText("説明文").query()).not.toBe(null);
  });
});
