import { Input, Label, Checkbox } from "@suru-ui/react";
import * as React from "react";

export default function LabelNestedExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        display: "grid",
        maxWidth: 320,
      }}
    >
      <Label
        style={{
          gap: "0.5rem",
          display: "grid",
        }}
      >
        ニックネーム
        <Input placeholder="すーるー" />
      </Label>
      <Label
        style={{
          gap: "0.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox defaultChecked />
        利用規約に同意する
      </Label>
    </div>
  );
}
