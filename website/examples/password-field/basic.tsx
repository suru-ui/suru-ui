import { PasswordField } from "@suru-ui/react";
import * as React from "react";

export default function BasicPasswordFieldExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.5rem",
        width: "20rem",
        display: "grid",
      }}
    >
      <span
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
        }}
      >
        パスワード
      </span>
      <PasswordField
        slotProps={{
          input: {
            "aria-label": "パスワード",
            autoComplete: "current-password",
          },
        }}
        placeholder="8 文字以上で入力"
        defaultValue="suru-ui-2026"
      />
    </div>
  );
}
