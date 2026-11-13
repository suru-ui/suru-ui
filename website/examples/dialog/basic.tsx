import { Button, Dialog } from "@suru-ui/react";
import * as React from "react";

const fieldLabelStyle: React.CSSProperties = {
  color: "#525252",
  fontSize: "0.8125rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #d4d4d4",
  padding: "0.5rem 0.625rem",
  fontSize: "0.875rem",
  boxSizing: "border-box",
  fontFamily: "inherit",
  borderRadius: "0.375rem",
};

export default function BasicDialogExample(): React.ReactNode {
  return (
    <Dialog
      close={<Button color="blue">作成する</Button>}
      title="新しいプロジェクト"
      trigger={<Button color="blue">プロジェクトを作成</Button>}
      description="あとから設定を変更できます。"
    >
      <div
        style={{
          gap: "0.375rem",
          display: "grid",
        }}
      >
        <label style={fieldLabelStyle} htmlFor="dialog-project-name">
          プロジェクト名
        </label>
        <input
          id="dialog-project-name"
          type="text"
          style={inputStyle}
          placeholder="新しいプロジェクト"
        />
      </div>
    </Dialog>
  );
}
