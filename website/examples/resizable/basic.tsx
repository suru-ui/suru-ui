import { Resizable } from "@suru-ui/react";
import * as React from "react";

const panelStyle = {
  gap: "0.5rem",
  color: "var(--sui-canvas_text-2)",
  display: "flex",
  padding: "1rem",
  flexDirection: "column",
} as const;

export default function BasicResizableExample(): React.ReactNode {
  return (
    <div
      style={{
        width: "34rem",
        border: "1px solid var(--sui-border-1)",
        height: "13rem",
        maxWidth: "100%",
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
          minSize={25}
          defaultSize={50}
        >
          <strong style={{ color: "var(--sui-canvas_text-1)" }}>サイドバー</strong>
          <span>境界をドラッグして幅を変更できます。</span>
        </Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel style={panelStyle} defaultSize={50}>
          <strong style={{ color: "var(--sui-canvas_text-1)" }}>コンテンツ</strong>
          <span>矢印キーでもサイズを変更できます。</span>
        </Resizable.Panel>
      </Resizable>
    </div>
  );
}
