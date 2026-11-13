import { Form, Field, Button } from "@suru-ui/react";
import * as React from "react";

const formStyle: React.CSSProperties = {
  gap: "0.75rem",
  width: "20rem",
  display: "grid",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #d4d4d4",
  padding: "0.5rem 0.625rem",
  fontSize: "0.875rem",
  boxSizing: "border-box",
  fontFamily: "inherit",
  borderRadius: "0.375rem",
};

export default function BasicFieldExample(): React.ReactNode {
  return (
    <Form
      style={formStyle}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Field
        label="メールアドレス"
        description="プロフィールには公開されません。"
        errorMatches={{
          typeMismatch: "有効なメールアドレスを入力してください。",
          valueMissing: "メールアドレスを入力してください。",
        }}
      >
        <Field.Control type="email" style={inputStyle} required placeholder="you@example.com" />
      </Field>
      <Button type="submit" color="blue">
        送信
      </Button>
    </Form>
  );
}
