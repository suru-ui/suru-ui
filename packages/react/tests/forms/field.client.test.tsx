import type { ReactElement, ReactNode } from "react";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Button } from "../../src/buttons/button/index.js";
import { Field } from "../../src/forms/field/index.js";
import { Form } from "../../src/forms/form/index.js";

function Wrapper(props: { children: ReactNode }): ReactElement {
  return (
    <Form onFormSubmit={() => {}}>
      {props.children}
      <Button type="submit">送信</Button>
    </Form>
  );
}

function errorElement(screen: Awaited<ReturnType<typeof render>>): HTMLElement | null {
  return screen.container.querySelector<HTMLElement>(".sui_field_error");
}

describe("Field", () => {
  test("ラベルを入力欄に関連付ける", async () => {
    // 実行
    const screen = await render(
      <Wrapper>
        <Field.Root name="name">
          <Field.Label>名前</Field.Label>
          <Field.Control placeholder="例: 田中 太郎" />
        </Field.Root>
      </Wrapper>,
    );

    // 検証
    const label = screen.getByText("名前");
    const input = screen.getByLabelText("名前");

    expect(label.element().tagName).toBe("LABEL");
    await expect.element(input).toHaveClass("sui_input");
  });

  test("説明文を表示する", async () => {
    // 実行
    const screen = await render(
      <Wrapper>
        <Field.Root name="name">
          <Field.Control />
          <Field.Description>プロフィールに表示されます</Field.Description>
        </Field.Root>
      </Wrapper>,
    );

    // 検証
    await expect
      .element(screen.getByText("プロフィールに表示されます"))
      .toHaveClass("sui_field_description");
  });

  test("Validity で検証状態に応じたメッセージを表示する", async () => {
    // 実行
    const screen = await render(
      <Wrapper>
        <Field.Root name="name" validationMode="onSubmit">
          <Field.Control required />
          <Field.Validity>
            {({ validity }) => (validity.valueMissing ? "名前を入力してください" : null)}
          </Field.Validity>
        </Field.Root>
      </Wrapper>,
    );

    // 検証
    expect(screen.getByText("名前を入力してください")).not.toBeInTheDocument();

    // 実行
    await screen.getByRole("button", { name: "送信" }).click();

    // 検証
    await expect.element(screen.getByText("名前を入力してください")).toBeInTheDocument();
  });

  test("必須項目を空のまま送信するとエラーが表示される", async () => {
    // 実行
    const screen = await render(
      <Wrapper>
        <Field.Root name="name" validationMode="onSubmit">
          <Field.Control required />
          <Field.Error match="valueMissing" />
        </Field.Root>
      </Wrapper>,
    );

    // 検証
    expect(errorElement(screen)).toBeNull();

    // 実行
    await screen.getByRole("button", { name: "送信" }).click();

    // 検証
    await expect.element(errorElement(screen)).toBeInTheDocument();
  });

  test("必須項目に入力するとエラーが表示されない", async () => {
    // 実行
    const screen = await render(
      <Wrapper>
        <Field.Root name="name" validationMode="onSubmit">
          <Field.Control required />
          <Field.Error match="valueMissing" />
        </Field.Root>
      </Wrapper>,
    );

    // 実行
    await screen.getByRole("textbox").fill("山田太郎");
    await screen.getByRole("button", { name: "送信" }).click();

    // 検証
    expect(errorElement(screen)).toBeNull();
  });

  test("validate で独自の検証を実行できる", async () => {
    // 実行
    const screen = await render(
      <Wrapper>
        <Field.Root
          name="username"
          validationMode="onSubmit"
          validate={(value: unknown) => (value ? null : "ユーザー名を入力してください")}
        >
          <Field.Control required />
          <Field.Error match="customError" />
        </Field.Root>
      </Wrapper>,
    );

    // 実行
    await screen.getByRole("button", { name: "送信" }).click();

    // 検証
    const error = errorElement(screen);

    await expect.element(error).toBeInTheDocument();
    await expect.element(error).toHaveTextContent("ユーザー名を入力してください");
  });
});
