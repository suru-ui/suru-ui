import { Form, Field, Input, Button } from "@suru-ui/react";
import * as React from "react";

export default function FormValidationExample(): React.ReactNode {
  const [errors, setErrors] = React.useState<React.ComponentProps<typeof Form>["errors"]>({});

  return (
    <Form
      style={{
        gap: "1rem",
        display: "flex",
        maxWidth: 360,
        alignItems: "flex-start",
        flexDirection: "column",
      }}
      errors={errors}
      validationMode="onBlur"
      onFormSubmit={(values) => {
        if (values["email"] === "taken@example.com") {
          setErrors({ email: "このメールアドレスは既に使用されています。" });
        } else {
          setErrors({});
        }
      }}
    >
      <Field
        name="email"
        label="メールアドレス"
        style={{ width: "100%" }}
        errorMatches={{ valueMissing: "メールアドレスを入力してください。" }}
      >
        <Input
          type="email"
          style={{ width: "100%" }}
          required
          placeholder="taken@example.com"
          autoComplete="email"
        />
      </Field>
      <Button type="submit">登録する</Button>
      <p
        style={{
          color: "#475569",
          margin: 0,
          fontSize: "0.875rem",
        }}
      >
        サーバー側のエラーは <code>errors</code> に渡すと、該当するフィールドに表示されます。
      </p>
    </Form>
  );
}
