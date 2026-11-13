import { PasswordField } from "@suru-ui/react";
import * as React from "react";

export default function PasswordFieldAddonsExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        width: "22rem",
        display: "grid",
      }}
    >
      <PasswordField
        endAddons={["8 文字以上"]}
        slotProps={{ input: { "aria-label": "パスワード" } }}
        defaultValue="secret123"
      />
      <PasswordField
        endAddons={["8 文字以上"]}
        slotProps={{ input: { "aria-label": "パスワード" } }}
        defaultValue="secret123"
        visibilityToggle={false}
      />
    </div>
  );
}
