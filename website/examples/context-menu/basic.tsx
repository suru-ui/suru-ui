import { ContextMenu } from "@suru-ui/react";
import { CopyIcon, PencilIcon, Trash2Icon } from "lucide-react";
import * as React from "react";

const areaStyle: React.CSSProperties = {
  color: "#525252",
  width: "20rem",
  border: "1px dashed #a3a3a3",
  height: "10rem",
  display: "flex",
  fontSize: "0.875rem",
  alignItems: "center",
  background: "#f5f5f5",
  borderRadius: "0.75rem",
  justifyContent: "center",
};

const labelStyle: React.CSSProperties = {
  gap: "0.5rem",
  display: "flex",
  alignItems: "center",
};

export default function BasicContextMenuExample(): React.ReactNode {
  return (
    <ContextMenu
      items={[
        {
          label: (
            <span style={labelStyle}>
              <PencilIcon size={16} aria-hidden="true" />
              名前を変更
            </span>
          ),
        },
        {
          label: (
            <span style={labelStyle}>
              <CopyIcon size={16} aria-hidden="true" />
              複製
            </span>
          ),
        },
        {
          color: "red",
          label: (
            <span style={labelStyle}>
              <Trash2Icon size={16} aria-hidden="true" />
              削除
            </span>
          ),
        },
      ]}
      trigger={<div style={areaStyle}>ここを右クリックしてください</div>}
    />
  );
}
