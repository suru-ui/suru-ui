import { Field, TextField } from "@suru-ui/react";
import * as React from "react";

export default function StateTextFieldExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        display: "grid",
        maxWidth: "22rem",
      }}
    >
      <TextField
        disabled
        slotProps={{ input: { "aria-label": "無効な入力欄" } }}
        defaultValue="編集できません"
      />
      <TextField
        readOnly
        slotProps={{ input: { "aria-label": "読み取り専用の入力欄" } }}
        defaultValue="読み取り専用の値"
      />
      <Field label="メールアドレス" invalid>
        <TextField type="email" defaultValue="invalid@" />
      </Field>
    </div>
  );
}
