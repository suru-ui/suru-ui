import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../../src/buttons/button/index.js";
import { Field } from "../../src/forms/field/index.js";

const meta = preview.meta({
  title: "Forms / Field",
  component: Field.Root,
});

export default meta;

const ctrl = controls(Field.Root, {
  disabled: {
    control: "boolean",
  },
  validationMode: {
    options: ["onSubmit", "onBlur", "onChange"],
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    validationMode: "onSubmit",
    disabled: false,
  }),
  render(props) {
    return (
      <form
        className="flex w-80 flex-col items-start gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <Field.Root {...props} name="name" className="w-full">
          <Field.Label>名前</Field.Label>
          <Field.Control required placeholder="例: 田中 太郎" />
          <Field.Error match="valueMissing">名前を入力してください</Field.Error>
          <Field.Description>プロフィールに表示されます</Field.Description>
        </Field.Root>
        <Button type="submit">送信</Button>
      </form>
    );
  },
});

export const Error = meta.story({
  name: "エラー",
  ...ctrl({
    validationMode: "onSubmit",
    disabled: false,
  }),
  render(props) {
    return (
      <form
        className="flex w-80 flex-col items-start gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <Field.Root {...props} name="email" className="w-full">
          <Field.Label>メールアドレス</Field.Label>
          <Field.Control required type="email" placeholder="you@example.com" />
          <Field.Error match="valueMissing">メールアドレスを入力してください</Field.Error>
          <Field.Error match="typeMismatch">有効なメールアドレスを入力してください</Field.Error>
        </Field.Root>
        <Button type="submit">送信</Button>
      </form>
    );
  },
});

export const CustomValidation = meta.story({
  name: "独自検証",
  ...ctrl({
    validationMode: "onBlur",
    disabled: false,
  }),
  render(props) {
    const [value, setValue] = React.useState("");

    return (
      <Field.Root
        {...props}
        name="username"
        className="flex w-80 flex-col items-start gap-1"
        validate={(currentValue: unknown) => (currentValue ? null : "ユーザー名を入力してください")}
      >
        <Field.Label>ユーザー名</Field.Label>
        <Field.Control
          required
          className="w-full"
          value={value}
          onValueChange={(currentValue) => setValue(currentValue)}
          placeholder="例: tai-kun"
        />
        <Field.Error match />
      </Field.Root>
    );
  },
});
