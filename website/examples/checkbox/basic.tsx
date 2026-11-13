import { Checkbox } from "@suru-ui/react";
import * as React from "react";

const rowStyle: React.CSSProperties = {
  gap: "0.5rem",
  display: "inline-flex",
  alignItems: "center",
};

export default function BasicCheckboxExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
      }}
    >
      <label style={rowStyle}>
        <Checkbox defaultChecked />
        通知を受け取る
      </label>
      <label style={rowStyle}>
        <Checkbox />
        メールマガジンを受け取る
      </label>
      <label style={rowStyle}>
        <Checkbox indeterminate />
        一部の項目を選択
      </label>
    </div>
  );
}
