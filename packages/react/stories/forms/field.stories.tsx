import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../../src/buttons/button/index.js";
import { Field } from "../../src/forms/field/index.js";
import { Form } from "../../src/forms/form/index.js";
import { TextField } from "../../src/forms/text-field/index.js";

const VALIDATION_MODES = ["onSubmit", "onBlur", "onChange"] as const;

const meta = preview.meta({
  title: "Forms / Field",
  component: Field,
});

export default meta;

const ctrl = controls(Field, {
  description: {
    control: "text",
  },
  disabled: {
    control: "boolean",
  },
  label: {
    control: "text",
  },
  validationMode: {
    options: VALIDATION_MODES,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    label: "名前",
    description: "プロフィールに表示されます。",
    validationMode: "onSubmit",
    disabled: false,
  }),
  render(props) {
    return (
      <Form onSubmit={(evt) => evt.preventDefault()} className="grid grid-rows-[100px_auto]">
        <Field
          {...props}
          name="sui:email"
          errorMatches={{
            typeMismatch: "有効なメールアドレスを入力してください。",
            valueMissing: "メールアドレスを入力してください。",
          }}
        >
          <TextField type="email" required className="w-[320px]" placeholder="you@example.com" />
        </Field>
        <div className="flex">
          <Button type="submit" className="ml-auto">
            送信
          </Button>
        </div>
      </Form>
    );
  },
});

export const Error = meta.story({
  name: "エラー",
  ...ctrl({
    label: "名前",
    description: "プロフィールに表示されます。",
    validationMode: "onSubmit",
    disabled: false,
  }),
  render(props) {
    const actionsRef = React.useRef<Form.Actions>(null);

    React.useEffect(() => {
      actionsRef.current?.validate("sui:name");
    }, []);

    return (
      <Form className="grid grid-rows-[100px_auto]" actionsRef={actionsRef}>
        <Field
          {...props}
          name="sui:name"
          errorMatches={{
            valueMissing: "名前を入力してください。",
          }}
        >
          <TextField required className="w-[320px]" placeholder="田中 太郎" />
        </Field>
      </Form>
    );
  },
});
