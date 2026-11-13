import { Input, Label } from "@suru-ui/react";
import * as React from "react";

export default function BasicInputExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.5rem",
        display: "grid",
        maxWidth: 320,
      }}
    >
      <Label htmlFor="input-basic-email">メールアドレス</Label>
      <Input
        id="input-basic-email"
        type="email"
        style={{ width: "100%" }}
        placeholder="you@example.com"
        autoComplete="email"
      />
    </div>
  );
}
