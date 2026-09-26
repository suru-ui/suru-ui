import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/checkbox/checkbox.parts.js";
import "../../../src/field/field.parts.js";
import { Checkbox } from "../../../src/checkbox/checkbox.jsx";
import { FieldControl } from "../../../src/field/field.control.jsx";
import { FieldItem } from "../../../src/field/field.item.jsx";
import { FieldLabel } from "../../../src/field/field.label.jsx";
import { FieldRoot } from "../../../src/field/field.root.jsx";
import "../_locators.js";

describe("FieldItem", () => {
  test("項目としてグループ化する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldItem>
          <FieldControl aria-label="名前" />
        </FieldItem>
      </FieldRoot>,
    );

    // 検証
    const item = screen.getByClassName("sui_field_item").element();
    expect(item.tagName).toBe("DIV");
    expect(item.querySelector(".sui_field_control")).not.toBe(null);
  });

  test("ラベルを項目内のチェックボックスと関連付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldItem>
          <Checkbox value="design" />
          <FieldLabel>デザイン</FieldLabel>
        </FieldItem>
      </FieldRoot>,
    );

    // 検証
    expect(screen.getByRole("checkbox", { name: "デザイン" }).query()).not.toBe(null);
  });

  test("無効を項目内のチェックボックスへ伝える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldItem disabled>
          <Checkbox aria-label="デザイン" value="design" />
        </FieldItem>
      </FieldRoot>,
    );

    // 検証
    expect(
      screen.getByRole("checkbox", { name: "デザイン" }).element().getAttribute("aria-disabled"),
    ).toBe("true");
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldItem render={<section />}>
          <FieldControl aria-label="名前" />
        </FieldItem>
      </FieldRoot>,
    );

    // 検証
    const item = screen.getByClassName("sui_field_item").element();
    expect(item.tagName).toBe("SECTION");
  });
});
