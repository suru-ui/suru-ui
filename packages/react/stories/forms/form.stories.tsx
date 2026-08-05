import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../../src/buttons/button/index.js";
import { Field } from "../../src/forms/field/index.js";
import { Form } from "../../src/forms/form/index.js";
import { Input } from "../../src/forms/input/index.js";

const meta = preview.meta({
  title: "Forms / Form",
  component: Form,
});

export default meta;

const ctrl = controls(Form, {
  validationMode: {
    options: ["onSubmit", "onBlur", "onChange"],
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    validationMode: "onSubmit",
  }),
  render(props) {
    const [errors, setErrors] = React.useState<React.ComponentProps<typeof Form>["errors"]>({});

    return (
      <Form
        {...props}
        errors={errors}
        onFormSubmit={(formValues) => {
          setErrors(validateUrl(formValues["url"]));
        }}
        className="flex w-80 flex-col items-start gap-4"
      >
        <Field.Root name="url">
          <Field.Label>Homepage</Field.Label>
          <Input
            type="url"
            required
            defaultValue="https://example.com"
            placeholder="https://example.com"
            pattern="https?://.*"
            className="w-full"
          />
          <Field.Error />
        </Field.Root>
        <Button type="submit">送信</Button>
      </Form>
    );
  },
});

function validateUrl(value: string): React.ComponentProps<typeof Form>["errors"] {
  try {
    const url = new URL(value);

    if (url.hostname.endsWith("example.com")) {
      return { url: "example.com ドメインは使用できません" };
    }
  } catch {
    return { url: "有効な URL ではありません" };
  }

  return {};
}
