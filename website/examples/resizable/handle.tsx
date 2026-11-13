import { Resizable } from "@suru-ui/react";
import * as React from "react";

const panelStyle = {
  color: "var(--sui-canvas_text-2)",
  display: "grid",
  padding: "0.75rem",
  fontSize: "0.875rem",
  placeItems: "center",
} as const;

export default function ResizableHandleExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        width: "28rem",
        display: "grid",
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid var(--sui-border-1)",
          height: "6rem",
          overflow: "hidden",
          borderRadius: "0.75rem",
        }}
      >
        <Resizable style={{ height: "100%" }}>
          <Resizable.Panel
            style={{
              ...panelStyle,
              backgroundColor: "var(--sui-canvas-2)",
            }}
            defaultSize={50}
          >
            左側
          </Resizable.Panel>
          <Resizable.Handle invisible />
          <Resizable.Panel style={panelStyle} defaultSize={50}>
            右側（判定領域は残ります）
          </Resizable.Panel>
        </Resizable>
      </div>
      <div
        style={{
          border: "1px solid var(--sui-border-1)",
          height: "6rem",
          overflow: "hidden",
          borderRadius: "0.75rem",
        }}
      >
        <Resizable style={{ height: "100%" }}>
          <Resizable.Panel
            style={{
              ...panelStyle,
              backgroundColor: "var(--sui-canvas-2)",
            }}
            defaultSize={50}
          >
            左側
          </Resizable.Panel>
          <Resizable.Handle disabled />
          <Resizable.Panel style={panelStyle} defaultSize={50}>
            右側（変更できません）
          </Resizable.Panel>
        </Resizable>
      </div>
    </div>
  );
}
