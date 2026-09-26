import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/switch/switch.parts.js";
import { SwitchRoot } from "../../../src/switch/switch.root.jsx";
import "../_locators.js";

describe("SwitchRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SwitchRoot />);

    // 検証
    const root = screen.getByClassName("sui_switch").element();
    expect(root.classList.contains("sui_switch")).toBe(true);
    expect(root.classList.contains("sui_switch-size_md")).toBe(true);
    expect(root.classList.contains("sui_switch-color_grey")).toBe(true);
    expect(root.classList.contains("sui_switch-radius_full")).toBe(true);
    expect(root.classList.contains("sui_switch-variant_liquid")).toBe(true);
    expect(root.classList.contains("sui_switch-outlined")).toBe(false);
  });

  test("指定した修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SwitchRoot outlined color="blue" radius="lg" size="sm" variant="naked" />,
    );

    // 検証
    const root = screen.getByClassName("sui_switch").element();
    expect(root.classList.contains("sui_switch-size_sm")).toBe(true);
    expect(root.classList.contains("sui_switch-color_blue")).toBe(true);
    expect(root.classList.contains("sui_switch-radius_lg")).toBe(true);
    expect(root.classList.contains("sui_switch-variant_naked")).toBe(true);
    expect(root.classList.contains("sui_switch-outlined")).toBe(true);
  });

  test("スコープの始点になる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SwitchRoot />);

    // 検証
    expect(screen.getByClassName("sui_switch").element().getAttribute("data-scope")).toBe("");
  });

  test("チェック状態を状態クラスと aria 属性へ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SwitchRoot defaultChecked />);

    // 検証
    const root = screen.getByClassName("sui_switch").element();
    expect(root.classList.contains("sui_switch-checked")).toBe(true);
    expect(root.getAttribute("aria-checked")).toBe("true");
  });

  test("読み取り専用と必須の状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <SwitchRoot data-testid="readonly" readOnly />
        <SwitchRoot data-testid="required" required />
      </>,
    );

    // 検証
    expect(screen.getByTestId("readonly").element().classList.contains("sui_switch-readonly")).toBe(
      true,
    );
    expect(screen.getByTestId("required").element().classList.contains("sui_switch-required")).toBe(
      true,
    );
  });

  test("クリックで状態を変更して onCheckedChange を受け取る", async ({ expect }) => {
    // 準備
    const onCheckedChange = vi.fn<(checked: boolean) => void>();
    const screen = await render(<SwitchRoot onCheckedChange={onCheckedChange} />);

    // 実行
    await screen.getByRole("switch").click();

    // 検証
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
    expect(screen.getByRole("switch").element().getAttribute("aria-checked")).toBe("true");
  });

  test("label のクリックで状態を変更する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <label>
        <SwitchRoot />
        通知を受け取る
      </label>,
    );
    await screen.getByText("通知を受け取る").click();

    // 検証
    expect(screen.getByRole("switch").element().getAttribute("aria-checked")).toBe("true");
  });

  test("無効時は状態クラスを付け操作を受け付けない", async ({ expect }) => {
    // 準備
    const onCheckedChange = vi.fn<(checked: boolean) => void>();
    const screen = await render(<SwitchRoot disabled onCheckedChange={onCheckedChange} />);

    // 実行
    await screen.getByRole("switch").click({ force: true });

    // 検証
    const root = screen.getByClassName("sui_switch").element();
    expect(root.classList.contains("sui_switch-disabled")).toBe(true);
    expect(root.getAttribute("aria-disabled")).toBe("true");
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SwitchRoot render={<div />} />);

    // 検証
    expect(screen.getByClassName("sui_switch").element().tagName).toBe("DIV");
  });

  test("フォームへ値を送信する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <form>
        <SwitchRoot defaultChecked name="notify" value="yes" />
      </form>,
    );

    // 検証
    const form = screen.container.querySelector("form")!;
    expect(new FormData(form).get("notify")).toBe("yes");
  });

  test("未チェックではフォームへ値を送信しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <form>
        <SwitchRoot name="notify" value="yes" />
      </form>,
    );

    // 検証
    const form = screen.container.querySelector("form")!;
    expect(new FormData(form).get("notify")).toBe(null);
  });
});
