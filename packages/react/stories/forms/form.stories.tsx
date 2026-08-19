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
        className="flex w-80 flex-col items-start gap-4"
        onFormSubmit={(formValues) => {
          setErrors(validateUrl(formValues["url"]));
        }}
      >
        <Field name="url" label="ホームページ">
          <Input
            type="url"
            pattern="https?://.*"
            required
            className="w-full"
            placeholder="https://example.com"
            defaultValue="https://example.com"
          />
        </Field>
        <Button type="submit">送信</Button>
      </Form>
    );
  },
});

function validateUrl(value: unknown): React.ComponentProps<typeof Form>["errors"] {
  const stringValue = typeof value === "string" ? value : "";

  try {
    const url = new URL(stringValue);

    if (url.hostname.endsWith("example.com")) {
      return { url: "example.com ドメインは使用できません" };
    }
  } catch {
    return { url: "有効な URL ではありません" };
  }

  return {};
}
