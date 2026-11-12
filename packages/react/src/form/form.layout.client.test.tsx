import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../button/button.parts.js";
import { Button } from "../button/button.jsx";
import "../field/field.parts.js";
import { Field } from "../field/field.jsx";
import "./form.parts.js";
import { Input } from "../input/input.jsx";
import "../input/input.parts.js";
import "../../tests/src/_locators.js";
import { Form } from "./form.jsx";

describe("フォームの配置", () => {
  test("ルートを縦並びにする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Form>
        <Field name="name" label="名前">
          <Input />
        </Field>
        <Button type="submit">送信</Button>
      </Form>,
    );

    // 検証。
    const root = getComputedStyle(screen.getByClassName("sui_form").element());
    expect(root.display).toBe("flex");
    expect(root.flexDirection).toBe("column");
  });

  test("余白を持たない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Form>
        <Field name="name" label="名前">
          <Input />
        </Field>
        <Button type="submit">送信</Button>
      </Form>,
    );

    // 検証 Base UI が描画する非表示の input は見た目を持たないため、余白の検証から除外します。
    for (const element of screen.container.querySelectorAll<HTMLElement>(
      ".sui_form, .sui_form *:not(input)",
    )) {
      const style = getComputedStyle(element);
      expect(style.marginTop).toBe("0px");
      expect(style.marginRight).toBe("0px");
      expect(style.marginBottom).toBe("0px");
      expect(style.marginLeft).toBe("0px");
    }

    const root = getComputedStyle(screen.getByClassName("sui_form").element());
    expect(root.paddingTop).toBe("0px");
    expect(root.paddingRight).toBe("0px");
    expect(root.paddingBottom).toBe("0px");
    expect(root.paddingLeft).toBe("0px");
  });

  test("フィールドとボタンを縦に並べる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Form>
        <Field name="name" label="名前">
          <Input />
        </Field>
        <Button type="submit">送信</Button>
      </Form>,
    );

    // 検証。
    const field = screen.getByClassName("sui_field").element().getBoundingClientRect();
    const button = screen.getByRole("button", { name: "送信" }).element().getBoundingClientRect();
    expect(field.bottom).toBeLessThanOrEqual(button.top);
  });

  test("フィールドとボタンの間隔を空ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Form>
        <Field name="name" label="名前">
          <Input />
        </Field>
        <Button type="submit">送信</Button>
      </Form>,
    );

    // 検証。
    const root = screen.getByClassName("sui_form").element();
    const gap = Number.parseFloat(getComputedStyle(root).rowGap);
    expect(gap).toBeGreaterThan(0);

    const field = screen.getByClassName("sui_field").element().getBoundingClientRect();
    const button = screen.getByRole("button", { name: "送信" }).element().getBoundingClientRect();
    expect(button.top - field.bottom).toBeCloseTo(gap, 1);
  });
});
