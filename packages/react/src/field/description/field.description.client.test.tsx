import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../field.parts.js";
import { FieldControl } from "../control/field.control.jsx";
import { FieldRoot } from "../root/field.root.jsx";
import { FieldDescription } from "./field.description.jsx";
import "../../../tests/src/_locators.js";

describe("FieldDescription", () => {
  test("説明文を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldControl aria-label="名前" />
        <FieldDescription>プロフィールに表示されます。</FieldDescription>
      </FieldRoot>,
    );

    // 検証
    const description = screen.getByText("プロフィールに表示されます。").element();
    expect(description.tagName).toBe("P");
    expect(description.classList.contains("sui_field_description")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldDescription render={<span />}>プロフィールに表示されます。</FieldDescription>
      </FieldRoot>,
    );

    // 検証
    const description = screen.getByText("プロフィールに表示されます。").element();
    expect(description.tagName).toBe("SPAN");
    expect(description.classList.contains("sui_field_description")).toBe(true);
  });
});
