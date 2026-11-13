import { Button, PasswordField } from "@suru-ui/react";
import { LockIcon } from "lucide-react";
import * as React from "react";

export default function PasswordFieldVisibilityExample(): React.ReactNode {
  const [value, setValue] = React.useState("suru-ui-2026");
  const [visible, setVisible] = React.useState(false);

  return (
    <div
      style={{
        gap: "0.75rem",
        width: "22rem",
        display: "grid",
      }}
    >
      <PasswordField
        value={value}
        visible={visible}
        slotProps={{ input: { "aria-label": "パスワード" } }}
        startAddons={[<LockIcon key="lock" size={16} aria-hidden="true" />]}
        onValueChange={setValue}
        onVisibleChange={setVisible}
      />
      <span
        style={{
          color: "#52525b",
          fontSize: "0.875rem",
        }}
      >
        パスワードは{visible ? "表示中" : "非表示中"}です。
      </span>
      <div
        style={{
          gap: "0.5rem",
          display: "flex",
        }}
      >
        <Button
          size="sm"
          variant="liquid"
          onClick={() => {
            setVisible((current) => !current);
          }}
        >
          表示を切り替える
        </Button>
        <Button
          size="sm"
          variant="naked"
          onClick={() => {
            setValue("");
          }}
        >
          クリア
        </Button>
      </div>
    </div>
  );
}
