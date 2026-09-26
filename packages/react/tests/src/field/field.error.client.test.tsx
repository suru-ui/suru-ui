import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/field/field.parts.js";
import { FieldControl } from "../../../src/field/field.control.jsx";
import { FieldError } from "../../../src/field/field.error.jsx";
import { FieldRoot } from "../../../src/field/field.root.jsx";
import "../_locators.js";

describe("FieldError", () => {
  test("常に表示する条件では内容を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldError match>入力内容を確認してください。</FieldError>
      </FieldRoot>,
    );

    // 検証
    const error = screen.getByText("入力内容を確認してください。").element();
    expect(error.tagName).toBe("DIV");
    expect(error.classList.contains("sui_field_error")).toBe(true);
  });

  test("検証前は条件付きの内容を表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot validationMode="onBlur">
        <FieldControl aria-label="名前" required />
        <FieldError match="valueMissing">名前を入力してください。</FieldError>
      </FieldRoot>,
    );

    // 検証
    expect(screen.getByText("名前を入力してください。").query()).toBe(null);
  });

  test("検証に失敗すると条件付きの内容を表示する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <FieldRoot validationMode="onBlur">
        <FieldControl aria-label="名前" required />
        <FieldError match="valueMissing">名前を入力してください。</FieldError>
      </FieldRoot>,
    );
    const input = screen.getByRole("textbox", { name: "名前" });

    // 実行
    // 一度入力してから消すと、未入力による検証エラーが表示対象になります。
    await input.fill("すーるー");
    await input.fill("");
    input.element().focus();
    await Promise.resolve();
    input.element().blur();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByText("名前を入力してください。").query()).not.toBe(null);
    });
  });

  test("入力欄の説明として関連付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldControl aria-label="名前" />
        <FieldError match>入力内容を確認してください。</FieldError>
      </FieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox", { name: "名前" }).element();
    const error = screen.getByText("入力内容を確認してください。").element();
    expect(input.getAttribute("aria-describedby")).toContain(error.id);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldError match render={<span />}>
          入力内容を確認してください。
        </FieldError>
      </FieldRoot>,
    );

    // 検証
    const error = screen.getByText("入力内容を確認してください。").element();
    expect(error.tagName).toBe("SPAN");
    expect(error.classList.contains("sui_field_error")).toBe(true);
  });
});
