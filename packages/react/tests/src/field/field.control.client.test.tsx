import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/field/field.parts.js";
import { FieldControl } from "../../../src/field/field.control.jsx";
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
