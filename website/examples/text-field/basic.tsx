import { TextField } from "@suru-ui/react";
import * as React from "react";

export default function BasicTextFieldExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
        maxWidth: "22rem",
      }}
    >
      <TextField slotProps={{ input: { "aria-label": "名前" } }} placeholder="田中 太郎" />
      <TextField
        type="email"
        slotProps={{ input: { "aria-label": "メールアドレス" } }}
        placeholder="you@example.com"
      />
      <TextField
        type="password"
        slotProps={{ input: { "aria-label": "パスワード" } }}
        defaultValue="password"
      />
    </div>
  );
}
