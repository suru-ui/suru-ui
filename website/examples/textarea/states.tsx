import { Field, Textarea } from "@suru-ui/react";
import * as React from "react";

export default function StateTextareaExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        display: "grid",
        maxWidth: "24rem",
      }}
    >
      <Textarea rows={3} disabled defaultValue="編集できません" aria-label="無効な入力欄" />
      <Textarea
        rows={3}
        readOnly
        defaultValue="読み取り専用の値"
        aria-label="読み取り専用の入力欄"
      />
      <Field label="問い合わせ内容" invalid description="10 文字以上で入力します。">
        <Textarea rows={3} defaultValue="短い" />
      </Field>
    </div>
  );
}
