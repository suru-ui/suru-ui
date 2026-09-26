import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/field/field.parts.js";
import { FieldControl } from "../../../src/field/field.control.jsx";
import { FieldLabel } from "../../../src/field/field.label.jsx";
import { FieldRoot } from "../../../src/field/field.root.jsx";
import "../_locators.js";

describe("FieldControl", () => {
  test("入力欄を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldControl aria-label="名前" />
      </FieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox", { name: "名前" }).element();
    expect(input.tagName).toBe("INPUT");
    expect(input.classList.contains("sui_field_control")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldControl aria-label="名前" className="custom" />
      </FieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox", { name: "名前" }).element();
    expect(input.classList.contains("custom")).toBe(true);
    expect(input.classList.contains("sui_field_control")).toBe(true);
  });

  test("ラベルと関連付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldLabel>名前</FieldLabel>
        <FieldControl />
      </FieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox", { name: "名前" }).element();
    expect(input.id).not.toBe("");
  });

  test("初期値を反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldControl aria-label="名前" defaultValue="すーるー" />
      </FieldRoot>,
    );

    // 検証
    expect(screen.getByRole("textbox", { name: "名前" }).element().getAttribute("value")).toBe(
      "すーるー",
    );
  });

  test("値の変更を通知する", async ({ expect }) => {
    // 準備
    const onValueChange = vi.fn<(value: string) => void>();
    const screen = await render(
      <FieldRoot>
        <FieldControl aria-label="名前" onValueChange={onValueChange} />
      </FieldRoot>,
    );

    // 実行
    await screen.getByRole("textbox", { name: "名前" }).fill("すーるー");

    // 検証
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("すーるー", expect.anything());
  });

  test("無効時は操作を受け付けない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot disabled>
        <FieldControl aria-label="名前" />
      </FieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox", { name: "名前" }).element();
    expect(input.hasAttribute("disabled")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldControl aria-label="名前" render={<textarea />} />
      </FieldRoot>,
    );

    // 検証
    const textbox = screen.getByRole("textbox", { name: "名前" }).element();
    expect(textbox.tagName).toBe("TEXTAREA");
    expect(textbox.classList.contains("sui_field_control")).toBe(true);
  });
});
