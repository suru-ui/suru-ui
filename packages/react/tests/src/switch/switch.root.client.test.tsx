import "@suru-ui/theme/suru.css";
import { describe, test } from "vitest";
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

  test("チェック状態を状態クラスへ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SwitchRoot defaultChecked />);

    // 検証
    const root = screen.getByClassName("sui_switch").element();
    expect(root.classList.contains("sui_switch-checked")).toBe(true);
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

  test("無効時は状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SwitchRoot disabled />);

    // 検証
    const root = screen.getByClassName("sui_switch").element();
    expect(root.classList.contains("sui_switch-disabled")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SwitchRoot render={<div />} />);

    // 検証
    expect(screen.getByClassName("sui_switch").element().tagName).toBe("DIV");
  });
});
