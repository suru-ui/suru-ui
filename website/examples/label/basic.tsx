import { Input, Label } from "@suru-ui/react";
import * as React from "react";

export default function BasicLabelExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.5rem",
        display: "grid",
        maxWidth: 320,
      }}
    >
      <Label htmlFor="label-basic-name">お名前</Label>
      <Input id="label-basic-name" style={{ width: "100%" }} placeholder="山田 太郎" />
    </div>
  );
}
