import { Switch } from "@suru-ui/react";
import * as React from "react";

export default function ControlledSwitchExample(): React.ReactNode {
  const [checked, setChecked] = React.useState(true);

  return (
    <div
      style={{
        gap: "0.5rem",
        display: "grid",
      }}
    >
      <label
        style={{
          gap: "0.5rem",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <Switch checked={checked} onCheckedChange={setChecked} />
        自動保存
      </label>
      <span
        style={{
          color: "#666",
          fontSize: "0.875rem",
        }}
      >
        現在の状態: {checked ? "オン" : "オフ"}
      </span>
    </div>
  );
}
