import { Form, Field, Input, Button, Fieldset } from "@suru-ui/react";
import * as React from "react";

export default function BasicFieldsetExample(): React.ReactNode {
  return (
    <Form
      style={{ maxWidth: 360 }}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Fieldset legend="お支払い情報">
        <Field name="company" label="会社名">
          <Input required placeholder="例: Suru UI 株式会社" />
        </Field>
        <Field name="taxId" label="法人番号">
          <Input placeholder="例: 1234567890123" />
        </Field>
        <Button type="submit">送信する</Button>
      </Fieldset>
    </Form>
  );
}
