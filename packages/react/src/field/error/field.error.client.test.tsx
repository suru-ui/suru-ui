import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../field.parts.js";
import { FieldRoot } from "../root/field.root.jsx";
import { FieldError } from "./field.error.jsx";
import "../../../tests/src/_locators.js";

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
