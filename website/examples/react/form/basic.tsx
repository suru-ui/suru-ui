import * as React from "react";

import "../../_fixture";
import { Button } from "@suru-ui/react/button";
import { Field } from "@suru-ui/react/field";
import { Form } from "@suru-ui/react/form";
import { Input } from "@suru-ui/react/input";

export default function Basic() {
  const [errors, setErrors] = React.useState<React.ComponentProps<typeof Form>["errors"]>({});

  return (
    <Form
      validationMode="onSubmit"
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
}

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
