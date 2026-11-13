import { Textarea } from "@suru-ui/react";
import * as React from "react";

export default function ControlledTextareaExample(): React.ReactNode {
  const [value, setValue] = React.useState("初期の問い合わせ内容");

  return (
    <div
      style={{
        gap: "0.5rem",
        display: "grid",
        maxWidth: "24rem",
      }}
    >
      <Textarea rows={4} value={value} onValueChange={setValue} aria-label="問い合わせ内容" />
      <span
        style={{
          color: "#666",
          fontSize: "0.875rem",
        }}
      >
        {value.length} 文字
      </span>
    </div>
  );
}
