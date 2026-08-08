import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Button } from "../../src/buttons/button/index.js";
import { Field } from "../../src/forms/field/index.js";
import { Form } from "../../src/forms/form/index.js";

function formElement(screen: Awaited<ReturnType<typeof render>>): HTMLElement | null {
  return screen.container.querySelector<HTMLElement>("form.sui_form");
}

describe("Form", () => {
  test("フォーム要素をレンダリングする", async () => {
    // 実行
    const screen = await render(<Form />);

    // 検証
    await expect.element(formElement(screen)).toBeInTheDocument();
  });

  test("指定したクラスを標準クラスと併用する", async () => {
    const screen = await render(<Form className="custom-form" />);
    const form = screen.container.querySelector("form");

    expect(form).toHaveClass("sui_form");
    expect(form).toHaveClass("custom-form");
  });

  test("送信時に onFormSubmit が値を通知する", async () => {
    // 準備
    let submitted: Record<string, string> | undefined;

    // 実行
    const screen = await render(
      <Form
        onFormSubmit={(values) => {
          submitted = values;
        }}
      >
        <Field.Root name="url">
          <Field.Control placeholder="https://example.com" />
        </Field.Root>
        <Button type="submit">送信</Button>
      </Form>,
    );
    await screen.getByRole("textbox").fill("https://example.com");
    await screen.getByRole("button", { name: "送信" }).click();

    // 検証
    expect(submitted).toStrictEqual({ url: "https://example.com" });
  });

  test("検証に失敗すると onFormSubmit が呼ばれずエラーが表示される", async () => {
    // 準備
    let submitted = false;

    // 実行
    const screen = await render(
      <Form
        onFormSubmit={() => {
          submitted = true;
        }}
      >
        <Field.Root name="url" validationMode="onSubmit">
          <Field.Control required />
          <Field.Error match="valueMissing" />
        </Field.Root>
        <Button type="submit">送信</Button>
      </Form>,
    );
    await screen.getByRole("button", { name: "送信" }).click();

    // 検証
    expect(submitted).toBe(false);
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_field_error"))
      .toBeInTheDocument();
  });

  test("errors プロパティーを渡すとエラーが表示される", async () => {
    // 実行
    const screen = await render(
      <Form errors={{ url: "有効な URL ではありません" }}>
        <Field.Root name="url">
          <Field.Control />
          <Field.Error />
        </Field.Root>
      </Form>,
    );

    // 検証
    const error = screen.container.querySelector<HTMLElement>(".sui_field_error");

    await expect.element(error).toBeInTheDocument();
    await expect.element(error).toHaveTextContent("有効な URL ではありません");
  });

  test("errors プロパティーが空ならエラーが表示されない", async () => {
    // 実行
    const screen = await render(
      <Form errors={{}}>
        <Field.Root name="url">
          <Field.Control />
          <Field.Error />
        </Field.Root>
      </Form>,
    );

    // 検証
    expect(screen.container.querySelector<HTMLElement>(".sui_field_error")).toBeNull();
  });
});
