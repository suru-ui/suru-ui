import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe, expectTypeOf } from "vitest";
import { render } from "vitest-browser-react";

import "../field/field.parts.js";
import { Field } from "../field/field.jsx";
import "./form.parts.js";
import { Input } from "../input/input.jsx";
import "../input/input.parts.js";
import { Form, FormAPI, useFormAPI } from "./form.jsx";
import "../../tests/src/_locators.js";

describe("FormAPI", () => {
  test("getRootProps は渡した props を返す", ({ expect }) => {
    // 準備と実行
    const api = new FormAPI({ name: "sui:form", validationMode: "onBlur" });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.name).toBe("sui:form");
    expect(rootProps.validationMode).toBe("onBlur");
  });

  test("onFormSubmit から入力値の型を推論する", () => {
    // 準備と実行
    const api = new FormAPI({
      onFormSubmit: (values: { url: string }) => {
        expectTypeOf(values).toEqualTypeOf<{ url: string }>();
      },
    });

    // 検証
    expectTypeOf(api).toEqualTypeOf<FormAPI<{ url: string }>>();
  });
});

describe("useFormAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useFormAPI({ name: "sui:form" });
      return <span>{api.getRootProps().name}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("sui:form").query()?.textContent).toBe("sui:form");
  });
});

describe("Form", () => {
  test("フォームとフィールドと入力欄を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Form aria-label="お問い合わせ">
        <Field name="url" label="ホームページ">
          <Input />
        </Field>
      </Form>,
    );

    // 検証
    const form = screen.getByClassName("sui_form").element();
    expect(form.classList.contains("sui_form")).toBe(true);
    expect(screen.getByText("ホームページ").query()).not.toBe(null);
    expect(screen.getByClassName("sui_input").query()).not.toBe(null);
  });
});
