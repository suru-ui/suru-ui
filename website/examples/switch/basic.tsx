import { Switch } from "@suru-ui/react";
import * as React from "react";

const labelStyle: React.CSSProperties = {
  gap: "0.5rem",
  display: "inline-flex",
  alignItems: "center",
};

export default function BasicSwitchExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
      }}
    >
      <label style={labelStyle}>
        <Switch defaultChecked />
        通知を受け取る
      </label>
      <label style={labelStyle}>
        <Switch />
        メールでも受け取る
      </label>
      <label
        style={{
          ...labelStyle,
          opacity: 0.5,
        }}
      >
        <Switch disabled defaultChecked />
        無効なスイッチ
      </label>
    </div>
  );
}
