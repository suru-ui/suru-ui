import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/action-group/action-group.parts.js";
import { ActionGroupRoot } from "../../../src/action-group/action-group.root.jsx";
import { ActionGroupSeparator } from "../../../src/action-group/action-group.separator.jsx";
import { Button } from "../../../src/button/button.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

describe("ActionGroupSeparator", () => {
  test("区切りとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot aria-label="操作">
        <Button>1</Button>
        <ActionGroupSeparator />
        <Button>2</Button>
      </ActionGroupRoot>,
    );

    // 検証
    const separator = screen.getByRole("separator").element();
    expect(separator.classList.contains("sui_action_group_separator")).toBe(true);
    expect(separator.classList.contains("sui_action_group_separator-orientation_horizontal")).toBe(
      true,
    );
    expect(separator.getAttribute("aria-orientation")).toBe("horizontal");
  });

  test("親グループの向きを引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot aria-label="操作" orientation="vertical">
        <Button>1</Button>
        <ActionGroupSeparator />
        <Button>2</Button>
      </ActionGroupRoot>,
    );

    // 検証
    const separator = screen.getByRole("separator").element();
    expect(separator.classList.contains("sui_action_group_separator-orientation_vertical")).toBe(
      true,
    );
    expect(separator.getAttribute("aria-orientation")).toBe("vertical");
  });

  test("指定した向きを優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot aria-label="操作" orientation="vertical">
        <Button>1</Button>
        <ActionGroupSeparator orientation="horizontal" />
        <Button>2</Button>
      </ActionGroupRoot>,
    );

    // 検証
    const separator = screen.getByRole("separator").element();
    expect(separator.classList.contains("sui_action_group_separator-orientation_horizontal")).toBe(
      true,
    );
    expect(separator.getAttribute("aria-orientation")).toBe("horizontal");
  });

  test("親がないときは横向きにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ActionGroupSeparator aria-label="区切り" />);

    // 検証
    const separator = screen.getByRole("separator").element();
    expect(separator.getAttribute("aria-orientation")).toBe("horizontal");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot aria-label="操作">
        <ActionGroupSeparator className="custom" />
      </ActionGroupRoot>,
    );

    // 検証
    const separator = screen.getByRole("separator").element();
    expect(separator.classList.contains("custom")).toBe(true);
    expect(separator.classList.contains("sui_action_group_separator")).toBe(true);
  });

  test("横並びの区切りは項目の高さに伸びる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot aria-label="操作">
        <Button>1</Button>
        <ActionGroupSeparator />
        <Button>2</Button>
      </ActionGroupRoot>,
    );

    // 検証
    const separator = screen.getByRole("separator").element().getBoundingClientRect();
    const button = screen.getByRole("button", { name: "1" }).element().getBoundingClientRect();
    expect(separator.height).toBeCloseTo(button.height, 1);
    expect(separator.width).toBeLessThan(2);
  });

  test("縦並びの区切りは幅いっぱいに広がる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot aria-label="操作" orientation="vertical">
        <Button>1</Button>
        <ActionGroupSeparator />
        <Button>2</Button>
      </ActionGroupRoot>,
    );

    // 検証
    const root = screen.getByRole("group", { name: "操作" }).element();
    const separator = screen.getByRole("separator").element().getBoundingClientRect();
    expect(separator.width).toBeCloseTo(root.getBoundingClientRect().width, 1);
    expect(separator.height).toBeLessThan(2);
  });

  test.skipIf(!supportsCustomFunctions())("横並びの区切りは枠線の幅で引く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot aria-label="操作">
        <ActionGroupSeparator />
      </ActionGroupRoot>,
    );

    // 検証
    const separator = screen.getByRole("separator").element().getBoundingClientRect();
    // `--sui-border_width(1)` の解決値です。
    expect(separator.width).toBeCloseTo(1.06, 1);
  });

  test.skipIf(!supportsCustomFunctions())("縦並びの区切りは枠線の幅で引く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot aria-label="操作" orientation="vertical">
        <ActionGroupSeparator />
      </ActionGroupRoot>,
    );

    // 検証
    const separator = screen.getByRole("separator").element().getBoundingClientRect();
    // `--sui-border_width(1)` の解決値です。
    expect(separator.height).toBeCloseTo(1.06, 1);
  });
});
