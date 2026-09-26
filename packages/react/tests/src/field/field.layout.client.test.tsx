import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/field/field.parts.js";
import { FieldControl } from "../../../src/field/field.control.jsx";
import { FieldDescription } from "../../../src/field/field.description.jsx";
import { FieldItem } from "../../../src/field/field.item.jsx";
import { Field } from "../../../src/field/field.jsx";
import { FieldLabel } from "../../../src/field/field.label.jsx";
import { FieldRoot } from "../../../src/field/field.root.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

describe("フィールドの配置", () => {
  test("ルートを縦並びにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldLabel>名前</FieldLabel>
        <FieldControl aria-label="名前" />
      </FieldRoot>,
    );

    // 検証
    const root = getComputedStyle(screen.getByClassName("sui_field").element());
    expect(root.display).toBe("flex");
    expect(root.flexDirection).toBe("column");
    expect(root.alignItems).toBe("flex-start");
  });

  test("各パーツに余白を付けない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldLabel>名前</FieldLabel>
        <FieldControl aria-label="名前" />
        <FieldDescription>説明</FieldDescription>
      </FieldRoot>,
    );

    // 検証
    // Base UI が描画する非表示の input は見た目を持たないため、余白の検証から除外します。
    for (const element of screen.container.querySelectorAll<HTMLElement>(
      ".sui_field, .sui_field *:not(input)",
    )) {
      const style = getComputedStyle(element);
      expect(style.marginTop).toBe("0px");
      expect(style.marginRight).toBe("0px");
      expect(style.marginBottom).toBe("0px");
      expect(style.marginLeft).toBe("0px");
    }
    const root = getComputedStyle(screen.getByClassName("sui_field").element());
    expect(root.paddingTop).toBe("0px");
    expect(root.paddingRight).toBe("0px");
    expect(root.paddingBottom).toBe("0px");
    expect(root.paddingLeft).toBe("0px");
  });

  test("ラベル・入力欄・説明文を縦に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Field label="名前" description="説明" errorMatches={false}>
        <FieldControl />
      </Field>,
    );

    // 検証
    const label = screen.getByText("名前").element().getBoundingClientRect();
    const input = screen.getByRole("textbox", { name: "名前" }).element().getBoundingClientRect();
    const description = screen.getByText("説明").element().getBoundingClientRect();
    expect(label.bottom).toBeLessThanOrEqual(input.top);
    expect(input.bottom).toBeLessThanOrEqual(description.top);
  });

  test.skipIf(!supportsCustomFunctions())(
    "ラベル・入力欄・説明文の間隔を空ける",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <FieldRoot>
          <FieldLabel>名前</FieldLabel>
          <FieldControl aria-label="名前" />
          <FieldDescription>説明</FieldDescription>
        </FieldRoot>,
      );

      // 検証
      const root = screen.getByClassName("sui_field").element();
      const gap = Number.parseFloat(getComputedStyle(root).rowGap);
      expect(gap).toBeGreaterThan(0);
      const label = screen.getByText("名前").element().getBoundingClientRect();
      const input = screen.getByRole("textbox", { name: "名前" }).element().getBoundingClientRect();
      const description = screen.getByText("説明").element().getBoundingClientRect();
      expect(input.top - label.bottom).toBeCloseTo(gap, 1);
      expect(description.top - input.bottom).toBeCloseTo(gap, 1);
    },
  );

  test("項目を縦並びにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldItem>
          <FieldLabel>名前</FieldLabel>
          <FieldControl aria-label="名前" />
        </FieldItem>
      </FieldRoot>,
    );

    // 検証
    const item = getComputedStyle(screen.getByClassName("sui_field_item").element());
    expect(item.display).toBe("flex");
    expect(item.flexDirection).toBe("column");
  });

  test.skipIf(!supportsCustomFunctions())("項目内の間隔を空ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot>
        <FieldItem>
          <FieldLabel>名前</FieldLabel>
          <FieldControl aria-label="名前" />
        </FieldItem>
      </FieldRoot>,
    );

    // 検証
    const item = screen.getByClassName("sui_field_item").element();
    const gap = Number.parseFloat(getComputedStyle(item).rowGap);
    expect(gap).toBeGreaterThan(0);
    const label = screen.getByText("名前").element().getBoundingClientRect();
    const input = screen.getByRole("textbox", { name: "名前" }).element().getBoundingClientRect();
    expect(input.top - label.bottom).toBeCloseTo(gap, 1);
  });
});
