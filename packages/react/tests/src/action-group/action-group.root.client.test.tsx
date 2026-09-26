import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ActionGroupRoot } from "../../../src/action-group/action-group.root.jsx";
import { Button } from "../../../src/button/button.js";

describe("ActionGroupRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ActionGroupRoot aria-label="操作" />);

    // 検証
    const root = screen.getByRole("group", { name: "操作" }).element();
    expect(root.classList.contains("sui_action_group")).toBe(true);
    expect(root.classList.contains("sui_action_group-size_md")).toBe(true);
    expect(root.classList.contains("sui_action_group-color_grey")).toBe(true);
    expect(root.classList.contains("sui_action_group-radius_md")).toBe(true);
    expect(root.classList.contains("sui_action_group-variant_solid")).toBe(true);
    expect(root.classList.contains("sui_action_group-orientation_horizontal")).toBe(true);
    expect(root.classList.contains("sui_action_group-outlined")).toBe(false);
  });

  test("指定した修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot
        aria-label="操作"
        size="lg"
        color="blue"
        radius="full"
        variant="naked"
        orientation="vertical"
        outlined
      />,
    );

    // 検証
    const root = screen.getByRole("group", { name: "操作" }).element();
    expect(root.classList.contains("sui_action_group-size_lg")).toBe(true);
    expect(root.classList.contains("sui_action_group-color_blue")).toBe(true);
    expect(root.classList.contains("sui_action_group-radius_full")).toBe(true);
    expect(root.classList.contains("sui_action_group-variant_naked")).toBe(true);
    expect(root.classList.contains("sui_action_group-orientation_vertical")).toBe(true);
    expect(root.classList.contains("sui_action_group-outlined")).toBe(true);
  });

  test("角丸は大きさに追従する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <ActionGroupRoot aria-label="追従" size="lg" />
        <ActionGroupRoot aria-label="優先" size="lg" radius="none" />
      </>,
    );

    // 検証
    const followed = screen.getByRole("group", { name: "追従" }).element();
    const prioritized = screen.getByRole("group", { name: "優先" }).element();
    expect(followed.classList.contains("sui_action_group-radius_lg")).toBe(true);
    expect(prioritized.classList.contains("sui_action_group-radius_none")).toBe(true);
  });

  test("role と aria-orientation を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <ActionGroupRoot aria-label="横" />
        <ActionGroupRoot aria-label="縦" orientation="vertical" />
        <ActionGroupRoot aria-label="上書き" aria-orientation="vertical" />
      </>,
    );

    // 検証
    const horizontal = screen.getByRole("group", { name: "横" }).element();
    const vertical = screen.getByRole("group", { name: "縦" }).element();
    const overridden = screen.getByRole("group", { name: "上書き" }).element();
    expect(horizontal.getAttribute("aria-orientation")).toBe("horizontal");
    expect(vertical.getAttribute("aria-orientation")).toBe("vertical");
    expect(overridden.getAttribute("aria-orientation")).toBe("vertical");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ActionGroupRoot aria-label="操作" className="custom" />);

    // 検証
    const root = screen.getByRole("group", { name: "操作" }).element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_action_group")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ActionGroupRoot aria-label="操作" render={<section />} />);

    // 検証
    const root = screen.getByRole("group", { name: "操作" }).element();
    expect(root.tagName).toBe("SECTION");
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ActionGroupRoot aria-label="操作" />);

    // 検証
    const root = screen.getByRole("group", { name: "操作" }).element();
    expect(root.getAttribute("data-scope")).toBe("");
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot aria-label="操作">
        <Button>実行</Button>
      </ActionGroupRoot>,
    );

    // 検証
    expect(screen.getByRole("button", { name: "実行" }).query()).not.toBe(null);
  });
});
