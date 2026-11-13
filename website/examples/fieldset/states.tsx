import { Form, Field, Input, Fieldset } from "@suru-ui/react";
import * as React from "react";

export default function FieldsetStatesExample(): React.ReactNode {
  return (
    <Form
      style={{
        gap: "2rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        flexDirection: "row",
      }}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Fieldset
        style={{ width: 260 }}
        legend="配送先"
        slotProps={{ legend: { style: { color: "#1d4ed8" } } }}
      >
        <Field name="shippingName" label="氏名">
          <Input defaultValue="山田 太郎" />
        </Field>
        <Field name="shippingAddress" label="住所">
          <Input defaultValue="東京都千代田区" />
        </Field>
      </Fieldset>
      <Fieldset style={{ width: 260 }} legend="請求先（無効）" disabled>
        <Field name="billingName" label="氏名">
          <Input defaultValue="山田 太郎" />
        </Field>
        <Field name="billingAddress" label="住所">
          <Input defaultValue="東京都千代田区" />
        </Field>
      </Fieldset>
    </Form>
  );
}
