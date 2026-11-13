import { Form, Field, Input, Button } from "@suru-ui/react";
import * as React from "react";

export default function BasicFormExample(): React.ReactNode {
  const [name, setName] = React.useState<string | null>(null);

  return (
    <Form
      style={{
        gap: "1rem",
        display: "flex",
        maxWidth: 360,
        alignItems: "flex-start",
        flexDirection: "column",
      }}
      onFormSubmit={(values) => {
        setName(typeof values["name"] === "string" ? values["name"] : "");
      }}
    >
      <Field name="name" label="お名前" style={{ width: "100%" }}>
        <Input style={{ width: "100%" }} required placeholder="山田 太郎" />
      </Field>
      <Field name="email" label="メールアドレス" style={{ width: "100%" }}>
        <Input
          type="email"
          style={{ width: "100%" }}
          required
          placeholder="you@example.com"
          autoComplete="email"
        />
      </Field>
      <Button type="submit">送信する</Button>
      {name !== null && (
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
          }}
        >
          {name} さん、送信しました。
        </p>
      )}
    </Form>
  );
}
