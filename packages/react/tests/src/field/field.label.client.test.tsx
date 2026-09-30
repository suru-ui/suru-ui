import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/field/field.parts.js";
import { FieldControl } from "../../../src/field/field.control.jsx";
import { FieldLabel } from "../../../src/field/field.label.jsx";
import { FieldRoot } from "../../../src/field/field.root.jsx";
import "../_locators.js";

describe("FieldLabel", () => {
  test("ラベルを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldLabel>名前</FieldLabel>
        <FieldControl />
      </FieldRoot>,
    );

    // 検証
    const label = screen.getByText("名前").element();
    expect(label.tagName).toBe("LABEL");
    expect(label.classList.contains("sui_field_label")).toBe(true);
  });

  test("非ネイティブの要素で描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldLabel nativeLabel={false} render={<span />}>
          名前
        </FieldLabel>
        <FieldControl />
      </FieldRoot>,
    );

    // 検証
    const label = screen.getByText("名前").element();
    expect(label.tagName).toBe("SPAN");
    expect(label.classList.contains("sui_field_label")).toBe(true);
  });
});
