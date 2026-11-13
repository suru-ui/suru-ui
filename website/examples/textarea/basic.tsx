import { Textarea } from "@suru-ui/react";
import * as React from "react";

export default function BasicTextareaExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
        maxWidth: "24rem",
      }}
    >
      <Textarea rows={4} placeholder="問い合わせ内容" aria-label="問い合わせ内容" />
      <Textarea rows={2} defaultValue="短いメモ" aria-label="短いメモ" />
    </div>
  );
}
