import { Checkbox } from "@suru-ui/react";
import * as React from "react";

const rowStyle = {
  gap: "0.5rem",
  display: "inline-flex",
  alignItems: "center",
} as const;

export default function CheckboxStatesExample(): React.ReactNode {
  const [checked, setChecked] = React.useState(true);

  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
      }}
    >
      <label style={rowStyle}>
        <Checkbox
          checked={checked}
          onCheckedChange={(next) => {
            setChecked(next);
          }}
        />
        制御されたチェックボックス: {checked ? "オン" : "オフ"}
      </label>
      <label style={rowStyle}>
        <Checkbox disabled defaultChecked />
        無効（チェック済み）
      </label>
      <label style={rowStyle}>
        <Checkbox readOnly defaultChecked />
        読み取り専用
      </label>
    </div>
  );
}
